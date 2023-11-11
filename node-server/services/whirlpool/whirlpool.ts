import { PublicKey, Connection, Keypair } from "@solana/web3.js";
import { loadProvider, loadWallets } from "./provider";
import {
  PDAUtil,
  PoolUtil,
  WhirlpoolClient,
  WhirlpoolsConfigData,
  buildWhirlpoolClient,
} from "@renec-foundation/redex-sdk";

export class Whirlpool {
  private client: WhirlpoolClient;
  private configPubkey: PublicKey;

  constructor() {
    const wallets = loadWallets();
    if (!wallets.userKeypair) {
      throw new Error("User keypair not found");
    }

    const { ctx } = loadProvider(wallets.userKeypair);
    this.configPubkey = new PublicKey(
      "4ERwQLtitCdCvSqjzrrVUTeZNfisLNuo3J8HVrbo6mn6"
    );

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
    const whirlpoolPDA = PDAUtil.getWhirlpool(
      this.client.getContext().program.programId,
      this.configPubkey,
      new PublicKey(correctTokenOrder[0]),
      new PublicKey(correctTokenOrder[1]),
      32
    );

    const whirlpool = await this.client.getPool(whirlpoolPDA.publicKey);
    console.log("Price: ", whirlpool.getData().sqrtPrice);
  }
}
