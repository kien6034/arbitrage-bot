import { AnchorProvider, Wallet } from "@project-serum/anchor";
import { WhirlpoolContext } from "@renec-foundation/redex-sdk";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import path from "path";
import { env } from "./env";

export const loadConfig = () => {
  require("dotenv").config();
  const isTestnet = process.env.TESTNET === "1";
  const config = isTestnet ? env.TESTNET : env.MAINNET;
  return config;
};

export const loadProvider = function (payerKeypair: Keypair) {
  const config = loadConfig();
  const wallets = loadWallets();
  const connection = new Connection(config.RPC);
  const wallet = new Wallet(payerKeypair);
  const provider = new AnchorProvider(connection, wallet, {});
  const ctx = WhirlpoolContext.withProvider(
    provider,
    new PublicKey(config.PROGRAM_ID)
  );

  return {
    provider,
    ctx,
    wallets,
    config,
  };
};

export type NemoswapAccounts = {
  userKeypair?: Keypair;
};

export const loadWallets = function (): NemoswapAccounts {
  let userKeypair: Keypair | undefined = undefined;

  const relativePath = ".wallets/user_wallet.json";
  const absolutePath = path.join(__dirname, relativePath);

  try {
    const userWallet = require(absolutePath);
    userKeypair = Keypair.fromSecretKey(Uint8Array.from(userWallet));
  } catch {}

  return {
    userKeypair,
  };
};
