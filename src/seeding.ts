import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import { hmac } from "@noble/hashes/hmac";
import { bls12_381 as bls } from "@noble/curves/bls12-381";
import { concatBytes, utf8ToBytes } from "@noble/hashes/utils";

/**
 * Constants for the new seeding algorithm
 */
export const TERMINATING_HASH = "567a98370fb7545137ddb53687723cf0b8a1f5e93b1f76f4a1da29416930fa59";
export const VX_PUBKEY = "b40c94495f6e6e73619aeb54ec2fc84c5333f7a88ace82923946fc5b6c8635b08f9130888dd96e1749a1d5aab00020e4";

/**
 * Verifies if a hash is part of the chain by hashing it recursively
 * until it matches the terminating hash or reaches the maximum number of games.
 *
 * @param hash - The hash to verify (as Uint8Array)
 * @returns The game ID if the hash is in the chain, or null if not found
 */
export function verifyInChain(hash: Uint8Array): number | null {
  for (let gameId = 1; gameId < 100e6; gameId++) {
    hash = sha256(hash);
    if (bytesToHex(hash) === TERMINATING_HASH) {
      console.log("hash is in the chain. It is game: ", gameId);
      return gameId;
    }
  }
  console.error("hash is not in the chain");
  return null;
}

/**
 * Validates a VX signature using BLS signature verification.
 *
 * @param gameSalt - The hash of Bitcoin block 831500
 * @param prevGameHash - The hash of the previous game
 * @param vxSignature - The VX signature to validate
 * @returns true if the signature is valid, false otherwise
 */
export function validateSignature(
  gameSalt: string,
  prevGameHash: Uint8Array,
  vxSignature: Uint8Array
): boolean {
  const message = concatBytes(prevGameHash, utf8ToBytes(gameSalt));
  return bls.verify(vxSignature, message, VX_PUBKEY);
}

/**
 * Calculates the game result (crash point) from a VX signature and game hash.
 *
 * The algorithm:
 * 1. Compute HMAC_SHA256(key=signature, message=hash)
 * 2. Extract the 52 most significant bits as r
 * 3. Calculate X = r / 2^52 (uniformly distributed in [0, 1))
 * 4. Calculate X = 99 / (1 - X)
 * 5. Return max(1, floor(X) / 100)
 *
 * @param vxSignature - The VX signature
 * @param gameHash - The game hash
 * @returns The crash point as a decimal number (e.g., 1.00, 2.50, 10.00)
 */
export function gameResult(vxSignature: Uint8Array, gameHash: Uint8Array): number {
  const nBits = 52; // number of most significant bits to use

  // 1. HMAC_SHA256(key=signature, message=hash)
  const hash = bytesToHex(hmac(sha256, vxSignature, gameHash));

  // 2. r = 52 most significant bits
  const seed = hash.slice(0, nBits / 4);
  const r = Number.parseInt(seed, 16);

  // 3. X = r / 2^52
  let X = r / Math.pow(2, nBits); // uniformly distributed in [0; 1)

  // 4. X = 99 / (1 - X)
  X = 99 / (1 - X); // 1 - X so there's no chance of div-by-zero

  // 5. return max(trunc(X), 100)
  const result = Math.floor(X);
  return Math.max(1, result / 100);
}
