Sphere is a set of JavaScript libraries to help you write an application without dealing with cryptographical details and private key handling.

# Installing

Sphere consists of two types of packages: one for signing the transaction and another one which you choose for storage of the private key. In this documentation, we will focus on `@planetarium/account-local` to reuse your game keypairs, but you can choose to use anything provided by Planetarium.

To continue, run:

```bash
$ npm i @planetarium/sign @planetarium/account-local
```

Or use your favourite package manager.

# Initializing the account

Let's start by creating an account instance representing a key pair that can sign a given data. For example, in the case of `@planetarium/account-local`, you need to read the list of the accounts using `listAccounts` and get an account instance via `getAccountFrom`. 

```typescript
// Javascript
import { listAccounts, getAccountFrom } from "@planetarium/account-local";
import { getEncodedPublicKey } from "@planetarium/sign";

// default path of account-local keystore is same as 9c
// https://devforum.nine-chronicles.com/t/file-paths-used-on-nine-chronicles/57
const accounts = await listAccounts();
// Use first one appeared in the list
const account = await getAccountFrom(accounts[0], "your passphrase"); 

console.log(await getEncodedPublicKey(account))
```

Execute your script with node.js and the public key to sign your transaction should be printed.

# Crafting your first transaction

You can easily craft a transaction using the `actionTxQuery`, which creates a transaction with an action you'd like to execute. Let's try `stake` for example. you can try any working RPC node. we will use [9c-main-rpc-9](https://9c-main-rpc-9.nine-chronicles.com/ui/playground).

```graphql
query {
  actionTxQuery(publicKey: "public key printed earlier") {
    stake(amount: 10)
  }
}
```

This will give you a transaction which is hexadecimal-encoded. We can now sign this using the account we initialized earlier:

```javascript
// Javascirpt
import { signTransaction } from "@planetarium/sign";

console.log(await signTransaction("hexidecimal tx created earlier"))
```

You should get your signed transaction, which can be staged using `stageTransaction` mutation on GraphQL.

```graphql
mutation {
  stageTransaction(payload: "The signed transaction here")
}
```

After submitting this successfully, you should have your TxId. Well done!
