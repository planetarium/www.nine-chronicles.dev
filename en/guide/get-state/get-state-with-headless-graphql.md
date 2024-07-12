# Get State: GraphQL(Headless)

GraphQL is a query language and data format for APIs, a specification for building APIs. It provides a more efficient way to get data from a server compared to traditional RESTful APIs by allowing clients to request exactly the data they need, reducing the amount of data sent over the network.

NineChronicles' blockchain node implementation, [NineChronicles.Headless][nc-headless], allows you to query various information via the GraphQL API. In this article, you'll learn how to send a simple GraphQL request to Headless using a browser and get the blockchain status.

[nc-headless]: https://github.com/planetarium/NineChronicles.Headless

## Run a blockchain node

We tried running a blockchain node [earlier](../create-network/running-a-blockchain-node-with-dotnet-project) by cloning NineChronicles' blockchain node implementation, [NineChronicles.Headless][nc-headless]. We'll do the same thing this time.

```console
➜  NineChronicles.Headless.Executable & dotnet run --config=./appsettings.local.json --arena-participants-sync=false
```

## Access the GraphQL Playground

We've set the GraphQL URL to `127.0.0.1:31280` in `appsettings.local.json`. Now let's go to http://127.0.0.1:31280/ui/playground or http://localhost:31280/ui/playground.

![Empty GraphQL Playground](/graphql-playground-01.png)

Click the `DOCS` and `SCHEMA` buttons on the right side of the Playground to see a variety of information.

## Get information from the latest block

Among other queries, we'll use `chainQuery` to retrieve information about the latest block. Write the following GraphQL query in the left area of the Playground, and click the :arrow_forward: button in the center of the screen.

```graphql
query {
  chainQuery {
    blockQuery {
      blocks(desc: true, limit:1) {
        miner
        hash
        index
      }
    }
  }
}
```

You can then see the information from the latest block on the right side of the screen, as shown below. This is the structure used when a particular query returns multiple pieces of data, each sorted by the name of the query under the `data` key, which in turn contains the respective fields.
You may have noticed that the `miner` of the block you queried is the same as the address of the private key used to mine the blockchain node.

```json
{
  "data": {
    "chainQuery": {
      "blockQuery": {
        "blocks": [
          {
            "miner": "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159",
            "hash": "44d64ad7b644416928a410df29289c09aff14f43e74531f05f43e61b423fec23",
            "index": 9
          }
        ]
      }
    }
  },
  "extensions": {}
}
```

### Try it on the GraphQL Playground on the mainnet

Let's run the GraphQL query we used above by connecting to the GraphQL Playground URL on the mainnet.

- GraphQL Playground URL(Mainnet): https://9c-main-rpc-1.nine-chronicles.com/ui/playground

```json
{
  "data": {
    "chainQuery": {
      "blockQuery": {
        "blocks": [
          {
            "miner": "0xb287F295d2C4e875Bde83A36F11B60d8d12b7976",
            "hash": "a88ded5a592503f2986d9288386af4c30669a8b82390fc46fa2fe29cb3b2fdc4",
            "index": 11136526
          }
        ]
      }
    }
  },
  "extensions": {}
}
```

::: tip :rotating_light:
Congratulations! You've now learned how to connect to a blockchain node's GraphQL server and retrieve the state you want. Check out the GraphQL Schema and documentation to learn how to retrieve more states in the future!
Next, let's change the state of the blockchain by issuing a transaction.
:::
