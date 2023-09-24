import { PublicKey, Connection, Keypair } from "@solana/web3.js";
import { loadProvider, loadWallets } from "./provider";
import { WhirlpoolsConfigData } from "@renec-foundation/redex-sdk";

export class Whirlpool {
  constructor() {}

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
}
