Currently, Nine Chronicles Headless provides [GraphQL] API to represents states and network, node's state.

At first, open GraphQL playground of your headless.

![alt text](/images/en/forum-trunk/create-action-and-transaction-with-graphql-api/image.png)

It provides `query.actionQuery` query, an factory query to provide actions' constructors. There are `query.actionQuery.stake`, `query.actionQuery.claimStakeReward` queries.

You can use them like the below GraphQL queries:

```graphql
query {
  actionQuery {
    stake(amount: 10)   
    claimStakeReward(avatarAddress: "YOUR_AVATAR_ADDRES")
  }
}
```

And it will response with the result consists of actions' hexadecimal string:

```json
{
  "data": {
    "actionQuery": {
      "stake": "6475373a747970655f696475363a7374616b653275363a76616c7565736475323a616d6931306575323a696431363acf82975c8fa23240b8434e89aa3f3fa66565",
      "claimStakeReward": "6475373a747970655f69647531383a636c61696d5f7374616b655f72657761726475363a76616c7565736475323a616132303a558ea927b9449c69577ed1e28a7c14ae0ce550df75323a696431363a4cbaf0ed6a96ad40ba3846ffd93727816565"
    }
  },
  "extensions": {}
}
```

Then you should make unsigned transaction with the action and you can do it with `query.transaction.unsignedTransaction` query, the unsigned transaction constructor:

```
query {
  transaction {
    // unsignedTransaction(publicKey: "YOUR_PUBLIC_KEY", plainValue: "ACTION", nonce: 0)
    // For stake action:
    unsignedTransaction(publicKey: "YOUR_PUBLIC_KEY", plainValue: "6475373a747970655f696475363a7374616b653275363a76616c7565736475323a616d6931306575323a696431363acf82975c8fa23240b8434e89aa3f3fa66565", nonce: 0)
  }
}
```

And it will return like the result:

```json
{
  "data": {
    "transaction": {
      "unsignedTransaction": "64313a616c6475373a747970655f696475363a7374616b653275363a76616c7565736475323a616d6931306575323a696431363acf82975c8fa23240b8434e89aa3f3fa6656565313a6733323a4582250d0da33b06779a8475d283d5dd210c683b9b999d74d03fac4f58fa6bce313a6e693065313a7036353a04663d6d5ea4bf4e87f66dc56a84beb738b6e61dbec925103ada5bb4163df7cc7c3bb4670065f9d7756fed61919ba8aa02daa02a5b6d48bc6310f5556f39f78b8b313a7332303acbfc996ad185c61a031f40ceee80a055e6d83005313a747532373a323032322d30392d30355430383a31333a34322e3530333337305a313a756c32303a336ac6aa132dbf3e5ae5fcf8cdbd82d3ec6b3d0532303acbfc996ad185c61a031f40ceee80a055e6d830056565"
    }
  },
  "extensions": {}
}
```

Then you should sign the transaction with your private key, KMS or wallet. If you got signature, you can build the transaction with `query.transaction.attachSignature` query.

```graphql
query {
  transaction {
    signTransaction(unsignedTransaction: "TX", signature: "SIGNATURE")
  }
}
```

Then it'll return the complete transaction and you can broadcast your transaction with `mutation.stageTransaction` mutation.

[GraphQL]: https://graphql.org/
