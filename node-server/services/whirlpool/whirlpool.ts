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
import { DecimalUtil, Instruction, Percentage } from "@orca-so/common-sdk";
import { Decimal } from "decimal.js";

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

  async getPrice(tokenA: string, tokenB: string) {
    const correctTokenOrder = PoolUtil.orderMints(tokenA, tokenB);

    try {
      const whirlpoolPDA = PDAUtil.getWhirlpool(
        this.client.getContext().program.programId,
        this.configPubkey,
        new PublicKey(correctTokenOrder[0]),
        new PublicKey(correctTokenOrder[1]),
        32
      );

      console.log(
        "program id: ",
        this.client.getContext().program.programId.toBase58()
      );
      console.log("config pubkey: ", this.configPubkey.toBase58());
      console.log("Whirlpool PDA: ", whirlpoolPDA.publicKey.toBase58());
      console.log("Token A: ", correctTokenOrder[0]);
      console.log("Token B: ", correctTokenOrder[1]);

      const whirlpool = await this.client.getPool(whirlpoolPDA.publicKey);
      const SLIPPAGE = Percentage.fromFraction(1, 100);

      const tokenAInfo = whirlpool.getTokenAInfo();
      const quote = await swapQuoteByInputToken(
        whirlpool,
        tokenA,
        DecimalUtil.toU64(new Decimal(1), tokenAInfo.decimals),
        SLIPPAGE,
        this.client.getContext().program.programId,
        this.client.getFetcher(),
        true
      );

      console.log("Quote: ", quote);
    } catch (error) {
      console.log(error);
    }
  }
}
