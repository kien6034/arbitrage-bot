import { AnchorProvider, Wallet } from "@project-serum/anchor";
import { WhirlpoolContext } from "@renec-foundation/redex-sdk";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import path from "path";

export const loadProvider = function (payerKeypair: Keypair) {
  const wallets = loadWallets();
  const connection = new Connection(
    "https://api-testnet.renec.foundation:8899/"
  );
  const wallet = new Wallet(payerKeypair);
  const provider = new AnchorProvider(connection, wallet, {});
  const ctx = WhirlpoolContext.withProvider(
    provider,
    new PublicKey("4ERwQLtitCdCvSqjzrrVUTeZNfisLNuo3J8HVrbo6mn6")
  );

  return {
    provider,
    ctx,
    wallets,
  };
};

export type NemoswapAccounts = {
  userKeypair?: Keypair;
};

export const loadWallets = function (): NemoswapAccounts {
  let userKeypair: Keypair | undefined = undefined;

  const relativePath = ".wallets/user_wallet.json";
  const absolutePath = path.join(__dirname, relativePath);

  console.log(absolutePath);
  try {
    const userWallet = require(absolutePath);
    userKeypair = Keypair.fromSecretKey(Uint8Array.from(userWallet));
  } catch {}

  return {
    userKeypair,
  };
};
