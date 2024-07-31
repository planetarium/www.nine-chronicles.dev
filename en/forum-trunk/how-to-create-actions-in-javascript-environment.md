### Introduction

A long time ago, I surveyed GraphQL mutations' usage and researched a way to replace that.

https://devforum.nine-chronicles.com/t/survey-usecases-of-graphql-mutation/109/2

Even then, I tried the way, named *lib9c-wasm*, WASM library to use lib9c logics in a JavaScript environment. There was no time to develop it more but we decided to make a web reference implementation with the lib9c-wasm library in this quarter. See https://devforum.nine-chronicles.com/t/how-to-play-web9c/123 for it.

This article won't explain the web9c. It'll explain how to create actions in a JavaScript environment with the lib9c-wasm.


### Prerequisites

- [yarn](https://yarnpkg.com/getting-started/install)

### Project setup

At first, create a new directory. Like a demo

```
mkdir lib9c-wasm-demo
cd lib9c-wasm-demo
```

Then, install the necessary dependencies.

```
yarn add -D typescript ts-node @types/node
yarn add @planetarium/tx @planetarium/lib9c-wasm @planetarium/account @planetarium/bencodex
```

### Write a code to create a transaction (bridge exchange)

The below code just creates a `transfer_asset3` transaction and shows it on your console. You can replace the `<RAW_PRIVATE_KEY>` with your own private key, the `nonce: 0n` with your account's nonce, the `memo: "ETHEREUM_ADDRESS"` with your Ethereum address, and `majorUnit: "10"` with the NCG amount you want to exchange.

```typescript
import { RawPrivateKey } from "@planetarium/account";
import {
    signTx,
    encodeSignedTx,
} from "@planetarium/tx";
import { Address, Currency, transfer_asset3 } from "@planetarium/lib9c-wasm";
import { decode, encode } from "@planetarium/bencodex";

const NCG = new Currency({
    ticker: "NCG",
    decimalPlaces: 2,
    minters: [new Address("0x47d082a115c63e7b58b1532d20e631538eafadde")],
});

// Replacable with another implementations.
const account = RawPrivateKey.fromHex("<RAW_PRIVATE_KEY>");  // Test or your own private key.

async function main() {
    const signer = await account.getAddress();
    // Send 10 NCG.
    const action = transfer_asset3({
        sender: new Address(signer.toHex()),
        recipient: new Address("0x9093dd96c4bb6b44a9e0a522e2de49641f146223"),  // Example address, bridge address.
        amount: {
            currency: NCG,
            sign: 1,
            majorUnit: "10",
            minorUnit: "0",
        },
        memo: "ETHEREUM_ADDRESS",
    });

    const signedTx = await signTx({
        nonce: 10n,
        publicKey: (await account.getPublicKey()).toBytes("uncompressed"),
        signer: signer.toBytes(),
        timestamp: new Date(Date.now()),
        updatedAddresses: new Set(),
        genesisHash: Buffer.from("4582250dq0da33b06779a8475d283d5dd210c683b9b999d74d03fac4f58fa6bce", "hex"),
        customActions: [decode(action)],
        gasLimit: null,
        maxGasPrice: null
    }, account);
    const serializedSignedTx = encode(encodeSignedTx(signedTx));
    console.log(Buffer.from(serializedSignedTx).toString("hex"));
}

main().then(_ => console.log("finished.")).catch(console.error);
```

If you replace the fields and stage it with GraphQL API, the transaction will be included in mainnet blocks. Such an example is [web9c](https://github.com/planetarium/web9c). If you wonder another example or have questions, please leave them as comments or as issues in the [lib9c-wasm](https://github.com/planetarium/lib9c-wasm) repository.

### Write a code to create a transaction without lib9c-wasm (bridge exchange)

This example creates a transaction without lib9c-wasm and automatically fetches and stages the nonce. The code got so long that I made it a [separate repository](https://github.com/planetarium/9c-js-sdk-examples).

Just run the below commands:

```
git clone https://github.com/planetarium/9c-js-sdk-examples.git
cd 9c-js-sdk-examples/examples/transfer-asset-bridge-exchange
```

And follow the [README](https://github.com/planetarium/9c-js-sdk-examples/blob/main/examples/transfer-asset-bridge-exchange/README.md)
