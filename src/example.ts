import { hexToBytes } from "@noble/hashes/utils";
import { verifyInChain, validateSignature, gameResult } from "./seeding.js";

/**
 * Example usage of the seeding algorithm functions
 */

// Example 1: Verify a hash is in the chain
console.log("Example 1: Verify hash in chain");
const exampleHash = hexToBytes("70eed5c29bde5132f4e41ec8b117a31533e5b055c6c21174d932b377a1855a04");
const gameId = verifyInChain(exampleHash);
if (gameId) {
  console.log(`Hash is valid for game #${gameId}`);
}

// Example 2: Validate a signature
// Note: This is a placeholder example. In real usage, you would have actual
// values for gameSalt, prevGameHash, and vxSignature from the system
console.log("\nExample 2: Validate signature");
console.log("(Placeholder - requires actual signature data)");

// Example 3: Calculate game result
// Note: This is a placeholder example. In real usage, you would have actual
// vxSignature and gameHash values
console.log("\nExample 3: Calculate game result");
console.log("(Placeholder - requires actual signature and hash data)");

export {};
