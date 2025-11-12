###### The author of this project is *NOT* affiliated with, funded, or in any way associated with bustabit.com
###### The author of this project is *NOT* responsible if you lose money on bustabit.com after trusting the results of this simulator. This simulator runs on the results of previous games. Results achieved in the past don't provide any guarantee for the future. And there's no guarantee that this simulator behaves in exactly the same way as the engine on bustabit.
-------------------------------------------------------------------

# Bustabit Script Simulator
> Simulates your script on thousands of bustabit games, in a few seconds.



## Getting started
So you like to play bustabit? And you've written your own script?
You want to see if it's profitable in the long run? (it's not)

You can simulate your script on thousands of bustabit games, in a few seconds.

1. Go here: https://mtihc.github.io/bustabit-script-simulator/
2. Choose or write a script.
3. Configure the script
4. Run the script
5. View a summary of the simulation, including a line chart



## Features
- You can manage a list of scripts on the webpage, just like on bustabit.
- Stores scripts and their configurations in the browser's local storage, just like on bustabit.
- Parses the `var config = ...` object at the top of the script, into a user interface that is used to configure and drive the script, just like on bustabit. (read more about this on [bustabit's autobet repository](https://github.com/bustabit/autobet)).
- Exposes the following variables to the script, just like on bustabit:
  - `config`
  - `engine`
  - `userInfo`
  - `log(message: string)`
  - `stop(reason: string)`
  - `notify(message: string)`
- The engine behaves as much as possible like the one on bustabit.
- The engine provides much of the same interface as the one on bustabit.
    - `engine.bet(wager: number, payout: number)`
    - `engine.history`
    - `engine.on(eventName: string, callback: function)`
    - `engine.gameState`
    - `engine.next`
    - `engine._userInfo`
- The engine emits the same events as the one on bustabit.
    - `GAME_STARTING` 
    - `GAME_STARTED`
    - `GAME_ENDED`
    - `BET_PLACED`
    - `CASHED_OUT`

- Exposes an extra variable `sim` to the script. This object contains some useful values. 
  But beware that this only exists in this simulator, for your simulation pleasure. 
  The `sim` variable does not actually exist on bustabit.
  - `sim.enableChart`
  - `sim.enableLog`
  - `sim.gameAmount`
  - `sim.gameHash`
  - `sim.startingBalance`


## New Provably Fair Seeding Algorithm

This project now includes an implementation of the new bustabit seeding algorithm with:

- **Hash Chain Verification** - Verify hashes in the 100M game chain
- **BLS Signature Validation** - Validate VX signatures for fairness
- **Game Result Calculation** - Calculate crash points using HMAC-SHA256

### Quick Start with Seeding Algorithm

```bash
# Install dependencies
npm install

# Build the TypeScript code
npm run build

# Run the example
npm run test
```

For detailed documentation, see [SEEDING.md](SEEDING.md).

### Using the Seeding Functions

```typescript
import { verifyInChain, validateSignature, gameResult } from "./seeding.js";
import { hexToBytes } from "@noble/hashes/utils";

// Verify a hash is in the chain
const hash = hexToBytes("70eed5c29bde5132f4e41ec8b117a31533e5b055c6c21174d932b377a1855a04");
const gameId = verifyInChain(hash);

// Calculate game result
const crashPoint = gameResult(vxSignature, gameHash);
```

## Frequently Asked Questions

##### How are the game results generated?
Bustabit is provably fair. The new seeding algorithm uses a chain of 100,000,000 SHA256 hashes combined with BLS signatures to generate verifiable game results. See [SEEDING.md](SEEDING.md) for details.

##### So, the game results are the same as on bustabit?
Yes, as long as you use the correct hash from the chain and valid VX signatures.

##### Are the game results in the same order as on bustabit?
Yes. The game results have to be calculated backwards from the input *hash*. But the simulation runs in regular order.

##### Did you copy the engine from bustabit?
No. I didn't copy any code. I made a dumbed-down `engine` from scratch which behaves as much as possible like the one on bustabit.

##### Can I send you money?
Yes. You can [send me a tip on bustabit](https://www.bustabit.com/tip). My username is **Mtihc**. Or [via paypal](https://www.paypal.me/MitchStoffels).

##### Why would I want to send you money?
Because you're nice.

## Useful links
- bustabit.com
- [Bustabit Script Simulator](https://mtihc.github.io/bustabit-script-simulator/)
- [Bustabit Script Simulator - on Reddit](https://www.reddit.com/r/bustabit/comments/areesa/new_bustabit_script_simulator/)
- [Game Verification tool and Odds calculator](http://jsfiddle.net/Mtihc/fb3aceu4/embedded/result)
- [Seeding event](https://bitcointalk.org/index.php?topic=2807542.0)
