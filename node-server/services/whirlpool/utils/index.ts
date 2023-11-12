import { PublicKey } from "@solana/web3.js";
import { loadConfig } from "../provider";
import { TokenInfo, Whirlpool } from "@renec-foundation/redex-sdk";

export const getSwapToken = (
  whirlpool: Whirlpool,
  inputToken: string
): {
  input: TokenInfo;
  output: TokenInfo;
} => {
  const tokenAInfo = whirlpool.getTokenAInfo();
  const tokenBInfo = whirlpool.getTokenBInfo();

  const inputTokenPubkey = new PublicKey(inputToken);

  let inputTokenInfo: TokenInfo;
  if (tokenAInfo.mint.equals(inputTokenPubkey)) {
    return {
      input: tokenAInfo,
      output: tokenBInfo,
    };
  } else if (tokenBInfo.mint.equals(inputTokenPubkey)) {
    return {
      input: tokenBInfo,
      output: tokenAInfo,
    };
  } else {
    throw new Error("Invalid input token");
  }
};
