# Get State: GraphQL(Headless)

GraphQL is a query language and data format for APIs, a specification for building APIs. It provides a more efficient way to get data from a server compared to traditional RESTful APIs by allowing clients to request exactly the data they need, reducing the amount of data sent over the network.

Nine Chronicles' blockchain node implementation, [NineChronicles.Headless][nc-headless], allows you to query various information via the GraphQL API. In this article, you'll learn how to send a simple GraphQL request to Headless using a browser and get the blockchain status.

[nc-headless]: https://github.com/planetarium/NineChronicles.Headless

## Access the GraphQL Playground

Let's go to https://9c-main-rpc-1.nine-chronicles.com/ui/playground

![Empty GraphQL Playground](/graphql-playground-01.png)

Click the `DOCS` and `SCHEMA` buttons on the right side of the Playground to see a variety of information.

## Get information from the latest block

Among other queries, we'll use `nodeStatus` query to retrieve information about the latest block. Write the following GraphQL query in the left area of the Playground, and click the :arrow_forward: button in the center of the screen.

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

You can then see the information from the latest block on the right side of the screen, as shown below. This is the structure used when a particular query returns multiple pieces of data, each sorted by the name of the query under the `data` key, which in turn contains the respective fields.

```json
{
  "data": {
    "nodeStatus": {
      "tip": {
        "miner": "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159",
        "hash": "44d64ad7b644416928a410df29289c09aff14f43e74531f05f43e61b423fec23",
        "index": 9
      }
    }
  },
  "extensions": {}
}
```
