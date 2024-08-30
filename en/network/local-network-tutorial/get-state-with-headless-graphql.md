# Querying Blockchain State with GraphQL (Headless)

[NineChronicles.Headless][nc-headless], the blockchain node implementation for Nine Chronicles, provides a GraphQL API that allows you to query various types of information.  
In this guide, we'll learn how to query the blockchain state on the main network using Headless and explore the available data.

[nc-headless]: https://github.com/planetarium/NineChronicles.Headless

### Trying It Out in GraphQL Playground

Let’s revisit the query we ran [earlier](./running-node-with-executor) and try it out in the Mainnet (Odin) GraphQL Playground.

- **GraphQL Playground URL (Mainnet)**: [https://9c-main-rpc-1.nine-chronicles.com/ui/playground](https://9c-main-rpc-1.nine-chronicles.com/ui/playground)

```graphql
query {
  nodeStatus {
    tip {
      miner
      hash
      index
    }
  }
}
```

This query will retrieve the current status of the node:

```json
{
  "data": {
    "nodeStatus": {
      "tip": {
        "miner": "0xb287F295d2C4e875Bde83A36F11B60d8d12b7976",
        "hash": "a88ded5a592503f2986d9288386af4c30669a8b82390fc46fa2fe29cb3b2fdc4",
        "index": 11136526
      }
    }
  },
  "extensions": {}
}
```

## Querying Game Data

In `libplanet`, blockchain data is stored in a key-value database (DB). If you have the address of the DB and the key you want to query, you can retrieve the stored value.

Try running the following GraphQL query in the Playground:

```graphql
query {
  state(
    accountAddress: "0000000000000000000000000000000000000021"
    address: "0xc106714d1bf09c37bcff24362eea5508d925f37a"
  )
}
```

You should see a result similar to this:

```json
{
  "data": {
    "state": "6931323065"
  },
  "extensions": {}
}
```

The data retrieved here pertains to `ActionPoint`. This information is stored in the DB at the `AccountAddress`, and the data fetched corresponds to the user at `0xc106714d1bf09c37bcff24362eea5508d925f37a`. This address represents an avatar of a player in the game, and data is saved here when an [action](https://github.com/planetarium/lib9c/blob/development/Lib9c/Action/DailyReward.cs#L83) is performed.

We'll delve deeper into actions and states later, but for now, it’s enough to understand that blockchain data is stored and can be retrieved for use.

The value `6931323065` might not make sense at first glance since it’s a `hex` value. To make it readable, you need to convert it. For example, you can use this [hex-to-ASCII conversion site](https://www.rapidtables.com/convert/number/hex-to-ascii.html) to decode the data.

![Hex Conversion Example](/images/network/state-hex.png)

In `libplanet`, data is encoded using [Bencodex](https://github.com/planetarium/bencodex), which is why the value is surrounded by `i` and `e`. After conversion, you’ll see that the data represents `120`.

::: tip :tada:
Well done! You’ve just learned how to query real game data using Headless and gained an understanding of how blockchain data flows. Don’t worry if some concepts seem complex; it’s okay not to grasp everything immediately. Next, we’ll cover how to work with private keys.
:::
