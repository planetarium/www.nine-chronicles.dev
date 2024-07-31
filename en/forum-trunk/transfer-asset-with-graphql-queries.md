Before looking at this topic, check out [this](./create-action-and-transaction-with-graphql-api) first.

You can transfer your assets like NCG, and CRYSTAL with GraphQL queries. At first, let's send NCG to `0xCbfC996ad185c61a031f40CeeE80a055e6D83005` (**If you run this step in mainnet, it will transfer your real money without confirmation. Be careful before proceeding!**)

### [Optional] Open GraphQL playground

If you prefer to use your GraphQL client of your choice, you can use it. If you not, you can use the GraphQL playground 

### Create transfer asset action

When you ran the below query:

```graphql
query {
  actionQuery {
    transferAsset(sender: "0x2cBaDf26574756119cF705289C33710F27443767", recipient: "0xCbfC996ad185c61a031f40CeeE80a055e6D83005", currency: NCG, amount: "10")
  }
}
```

you can get the action as a hexadecimal string:

```json
{
  "data": {
    "actionQuery": {
      "transferAsset": "6475373a747970655f69647531353a7472616e736665725f61737365743275363a76616c7565736475363a616d6f756e746c647531333a646563696d616c506c61636573313a0275373a6d696e746572736c32303a2c2a05e29e8f57c4661fb8fff5e0c7a7e0f3c4fc6575363a7469636b657275333a4e4347656931303030656575393a726563697069656e7432303acbfc996ad185c61a031f40ceee80a055e6d8300575363a73656e64657232303a2cbadf26574756119cf705289c33710f274437676565"
    }
  },
  "extensions": {}
}
```

### Build unsigned transaction

You can create an unsigned transaction with the action and the transaction nonce. Let's reference the below GraphQL query:

```graphql
query {
  transaction {
    unsignedTransaction(publicKey: "0228c66126c62dde22c84cfa55a0578762c95481a81c4b4b2ccf63024b0929bb1b", plainValue: "6475373a747970655f69647531353a7472616e736665725f61737365743275363a76616c7565736475363a616d6f756e746c647531333a646563696d616c506c61636573313a0275373a6d696e746572736c32303a2c2a05e29e8f57c4661fb8fff5e0c7a7e0f3c4fc6575363a7469636b657275333a4e4347656931303030656575393a726563697069656e7432303acbfc996ad185c61a031f40ceee80a055e6d8300575363a73656e64657232303a2cbadf26574756119cf705289c33710f274437676565")
  }
}
```

Then it will return the unsigned transaction as hexadecimal string:

```json
{
  "data": {
    "transaction": {
      "unsignedTransaction": "64313a616c6475373a747970655f69647531353a7472616e736665725f61737365743275363a76616c7565736475363a616d6f756e746c647531333a646563696d616c506c61636573313a0275373a6d696e746572736c32303a2c2a05e29e8f57c4661fb8fff5e0c7a7e0f3c4fc6575363a7469636b657275333a4e4347656931303030656575393a726563697069656e7432303acbfc996ad185c61a031f40ceee80a055e6d8300575363a73656e64657232303a2cbadf26574756119cf705289c33710f27443767656565313a6733323a15e07324f162d7f28037dc2ab88439c4103602c204af9052befb8a44249ef1fb313a6e693065313a7036353a0428c66126c62dde22c84cfa55a0578762c95481a81c4b4b2ccf63024b0929bb1bc2ca84f8a4e0bbc164a204bfb86fe38a45af3b86f142585a11d6a03818abe8ca313a7332303a2cbadf26574756119cf705289c33710f27443767313a747532373a323032322d30382d33315431313a31333a34372e3530313831385a313a756c32303a2cbadf26574756119cf705289c33710f2744376732303acbfc996ad185c61a031f40ceee80a055e6d830056565"
    }
  },
  "extensions": {}
}
```

### Sign the unsigned message with `planet` command

After you've done the steps above, you should sign the unsigned transaction. The `planet` command can sign a transaction with your own private key. Before signing you should write the hexadecimal action as raw bytes to some file

```python
ACTION = "64313a616c6475373a747970655f69647531353a7472616e736665725f61737365743275363a76616c7565736475363a616d6f756e746c647531333a646563696d616c506c61636573313a0275373a6d696e746572736c32303a2c2a05e29e8f57c4661fb8fff5e0c7a7e0f3c4fc6575363a7469636b657275333a4e4347656931303030656575393a726563697069656e7432303acbfc996ad185c61a031f40ceee80a055e6d8300575363a73656e64657232303a2cbadf26574756119cf705289c33710f27443767656565313a6733323a15e07324f162d7f28037dc2ab88439c4103602c204af9052befb8a44249ef1fb313a6e693065313a7036353a0428c66126c62dde22c84cfa55a0578762c95481a81c4b4b2ccf63024b0929bb1bc2ca84f8a4e0bbc164a204bfb86fe38a45af3b86f142585a11d6a03818abe8ca313a7332303a2cbadf26574756119cf705289c33710f27443767313a747532373a323032322d30382d33315431313a31333a34372e3530313831385a313a756c32303a2cbadf26574756119cf705289c33710f2744376732303acbfc996ad185c61a031f40ceee80a055e6d830056565"

with open('action' , 'wb') as f:
  f.write(bytes.fromhex(ACTION))
```

If you have `xxd` installed you can use it to produce the action file as well: `echo "HEX HERE" | xxd -r -p > action`.

And you should sign and get the signature.

```text
# planet key sign [KEY_ID] [FILE]
$ planet key sign 05d7edd0-a9dc-4ac5-8196-4d9f52a2e8ed action
Passphrase (of 05d7edd0-a9dc-4ac5-8196-4d9f52a2e8ed): ***
30440220776695df391f67b1060d86b97daafee4c3b55e3125a6c5bbd90dc3e6a7ac96f802206725de0ffe35ced15ede5f0adf343b9ac20a7cea386ec219d9ed5493f83f6cdc
```

Then the `30440220776695df391f67b1060d86b97daafee4c3b55e3125a6c5bbd90dc3e6a7ac96f802206725de0ffe35ced15ede5f0adf343b9ac20a7cea386ec219d9ed5493f83f6cdc` is your  signature.

> If you're unsure what is your key ID, you can check it via `planet key`. More information about the `planet` tool itself can be found at: https://devforum.nine-chronicles.com/t/planet-libplanet-tools-to-help-your-libplanet-dev-life/67/2

### Complete transaction

Almost finished. You should complete the unsigned transaction with the signature. There is `query.transaction.signTransaction(unsignedTransaction: String!, signature: String!)` query to achieve it.

```graphql
query {
  transaction {
    signTransaction(unsignedTransaction: "64313a616c6475373a747970655f69647531353a7472616e736665725f61737365743275363a76616c7565736475363a616d6f756e746c647531333a646563696d616c506c61636573313a0275373a6d696e746572736c32303a2c2a05e29e8f57c4661fb8fff5e0c7a7e0f3c4fc6575363a7469636b657275333a4e4347656931303030656575393a726563697069656e7432303acbfc996ad185c61a031f40ceee80a055e6d8300575363a73656e64657232303a2cbadf26574756119cf705289c33710f27443767656565313a6733323a15e07324f162d7f28037dc2ab88439c4103602c204af9052befb8a44249ef1fb313a6e693065313a7036353a0428c66126c62dde22c84cfa55a0578762c95481a81c4b4b2ccf63024b0929bb1bc2ca84f8a4e0bbc164a204bfb86fe38a45af3b86f142585a11d6a03818abe8ca313a7332303a2cbadf26574756119cf705289c33710f27443767313a747532373a323032322d30382d33315431313a31333a34372e3530313831385a313a756c32303a2cbadf26574756119cf705289c33710f2744376732303acbfc996ad185c61a031f40ceee80a055e6d830056565", signature: "30440220776695df391f67b1060d86b97daafee4c3b55e3125a6c5bbd90dc3e6a7ac96f802206725de0ffe35ced15ede5f0adf343b9ac20a7cea386ec219d9ed5493f83f6cdc")
  }
}
```

Then it returns the complete transaction :tada: 

### Broadcast your transaction

It's the last step. You should broadcast your transaction through P2P network. There is `mutation.stageTransaction` mutation to broadcast transaction easily.

```
mutation {
  stageTransaction(payload: "64313a5337303a30440220776695df391f67b1060d86b97daafee4c3b55e3125a6c5bbd90dc3e6a7ac96f802206725de0ffe35ced15ede5f0adf343b9ac20a7cea386ec219d9ed5493f83f6cdc313a616c6475373a747970655f69647531353a7472616e736665725f61737365743275363a76616c7565736475363a616d6f756e746c647531333a646563696d616c506c61636573313a0275373a6d696e746572736c32303a2c2a05e29e8f57c4661fb8fff5e0c7a7e0f3c4fc6575363a7469636b657275333a4e4347656931303030656575393a726563697069656e7432303acbfc996ad185c61a031f40ceee80a055e6d8300575363a73656e64657232303a2cbadf26574756119cf705289c33710f27443767656565313a6733323a15e07324f162d7f28037dc2ab88439c4103602c204af9052befb8a44249ef1fb313a6e693065313a7036353a0428c66126c62dde22c84cfa55a0578762c95481a81c4b4b2ccf63024b0929bb1bc2ca84f8a4e0bbc164a204bfb86fe38a45af3b86f142585a11d6a03818abe8ca313a7332303a2cbadf26574756119cf705289c33710f27443767313a747532373a323032322d30382d33315431313a31333a34372e3530313831385a313a756c32303a2cbadf26574756119cf705289c33710f2744376732303acbfc996ad185c61a031f40ceee80a055e6d830056565")
}
```

Then it will return the transaction's id.

```json
{
  "data": {
    "stageTransaction": "415a008c5c64119a7ed64f2f6173568c76364d2f8bbd22accc7fb59357d93777"
  },
  "extensions": {}
}
```

### [Optional] Check the transaction's status

You may want to see the transaction was applied to the chain well. There is `query.transaction.transactionResult(txId: TxId!)` query to see the transaction's status.

While writing this topic, it was already applied but it will show also `STAGING` or else.

```graphql
query {
  transaction {
    transactionResult(txId: "415a008c5c64119a7ed64f2f6173568c76364d2f8bbd22accc7fb59357d93777") {
      txStatus      
    }
  }
}
```

```json
{
  "data": {
    "transaction": {
      "transactionResult": {
        "txStatus": "SUCCESS"
      }
    }
  },
  "extensions": {}
}
```
