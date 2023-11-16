import { PublicKey, Connection, Keypair } from "@solana/web3.js";
import { loadProvider, loadWallets } from "./provider";
import {
  PDAUtil,
  PoolUtil,
  Whirlpool,
  WhirlpoolClient,
  WhirlpoolsConfigData,
  buildWhirlpoolClient,
  swapQuoteByInputToken,
} from "@renec-foundation/redex-sdk";
import { DecimalUtil, Percentage } from "@orca-so/common-sdk";
import { Decimal } from "decimal.js";
import { GetPriceResponse__Output } from "../../proto/whirlpool/GetPriceResponse";
import { getSwapToken } from "./utils";
import { ServerErrorResponse } from "@grpc/grpc-js";
import { GrpcResult, ensureError, Ok, Err, getPriceKey } from "../../common";
import { Status } from "@grpc/grpc-js/build/src/constants";
import { setCache, getCache } from "../../common";

const SLIPPAGE = Percentage.fromFraction(1, 100);

export class WhirlpoolService {
  private name: string = "whirlpool";
  private client: WhirlpoolClient;
  private configPubkey: PublicKey;
  private whirlpoolCache = new Map<string, Whirlpool>();

  constructor() {
    const wallets = loadWallets();
    if (!wallets.userKeypair) {
      throw new Error("User keypair not found");
    }

    const { ctx, config } = loadProvider(wallets.userKeypair);
    this.configPubkey = new PublicKey(config.REDEX_CONFIG_PUB);
    this.client = buildWhirlpoolClient(ctx);
  }

  async getPoolInfo(poolKey: string): Promise<WhirlpoolsConfigData> {
    const wallets = loadWallets();

    if (!wallets.userKeypair) {
      throw new Error("User keypair not found");
    }

    const { ctx } = loadProvider(wallets.userKeypair);

    let configAccount = await ctx.fetcher.getConfig(new PublicKey(poolKey));

    if (!configAccount) {
      throw new Error("Pool config not found");
    }
    return configAccount;
  }

  async getWhirlpool(tokenA: string, tokenB: string): Promise<Whirlpool> {
    const correctTokenOrder = PoolUtil.orderMints(tokenA, tokenB);

    const whirlpoolPDA = PDAUtil.getWhirlpool(
      this.client.getContext().program.programId,
      this.configPubkey,
      new PublicKey(correctTokenOrder[0]),
      new PublicKey(correctTokenOrder[1]),
      32
    );

    const whirlpoolPubkey = whirlpoolPDA.publicKey.toString();
    if (!this.whirlpoolCache.has(whirlpoolPDA.publicKey.toString())) {
      const whirlpool = await this.client.getPool(whirlpoolPDA.publicKey);
      this.whirlpoolCache.set(whirlpoolPDA.publicKey.toString(), whirlpool);
    }

    const whirlpool = this.whirlpoolCache.get(
      whirlpoolPDA.publicKey.toString()
    );

    if (!whirlpool) {
      throw new Error("Whirlpool not found");
    }

    return whirlpool;
  }

  async getPrice(
    tokenA: string,
    tokenB: string
  ): Promise<GrpcResult<GetPriceResponse__Output, ServerErrorResponse>> {
    try {
      const priceKey = getPriceKey(this.name, tokenA, tokenB);
      const cachedPrice = getCache(priceKey);
      if (cachedPrice !== undefined && typeof cachedPrice === "number") {
        return Ok({ price: cachedPrice });
      }

      const whirlpool = await this.getWhirlpool(tokenA, tokenB);
      const { input, output } = getSwapToken(whirlpool, tokenA);

      const quote = await swapQuoteByInputToken(
        whirlpool,
        input.mint,
        DecimalUtil.toU64(new Decimal(1), input.decimals),
        SLIPPAGE,
        this.client.getContext().program.programId,
        this.client.getFetcher(),
        true
      );

      const price = DecimalUtil.fromU64(
        quote.estimatedAmountOut,
        output.decimals
      );

      // set price to cache
      setCache(priceKey, price.toNumber());

      return Ok({
        price: price.toNumber(),
      });
    } catch (e) {
      const error = ensureError(e);

      return Err(error, Status.INTERNAL);
    }
  }
}
