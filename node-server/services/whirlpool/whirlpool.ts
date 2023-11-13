import { PublicKey, Connection, Keypair } from "@solana/web3.js";
import { loadProvider, loadWallets } from "./provider";
import {
  PDAUtil,
  PoolUtil,
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
import { GrpcResult, ensureError, Ok, Err } from "../../common";
import { Status } from "@grpc/grpc-js/build/src/constants";

const SLIPPAGE = Percentage.fromFraction(1, 100);

export class Whirlpool {
  private client: WhirlpoolClient;
  private configPubkey: PublicKey;

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

  async getPrice(
    tokenA: string,
    tokenB: string
  ): Promise<GrpcResult<GetPriceResponse__Output, ServerErrorResponse>> {
    try {
      const correctTokenOrder = PoolUtil.orderMints(tokenA, tokenB);

      const whirlpoolPDA = PDAUtil.getWhirlpool(
        this.client.getContext().program.programId,
        this.configPubkey,
        new PublicKey(correctTokenOrder[0]),
        new PublicKey(correctTokenOrder[1]),
        32
      );

      const whirlpool = await this.client.getPool(whirlpoolPDA.publicKey);

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

      return Ok({
        price: price.toNumber(),
      });
    } catch (e) {
      const error = ensureError(e);

      return Err(error, Status.INTERNAL);
    }
  }
}
