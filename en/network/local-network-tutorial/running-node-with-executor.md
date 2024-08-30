# Running a Nine Chronicles Blockchain Node

A blockchain node is an individual computer or server that makes up the blockchain network. Nodes are crucial to the network, maintaining its security and integrity. For more detailed information, you can refer to the [libplanet design document](https://docs.libplanet.io/5.3.0-alpha.1/articles/design.html).

To make it easier to operate a blockchain based on libplanet, we have developed [NineChronicles.Headless](https://github.com/planetarium/NineChronicles.Headless). This tool includes various APIs for querying chain data, such as RPC and GraphQL (GQL). In this guide, we'll walk you through the process of running a blockchain node using Headless.

::: info :bulb:
This guide is based on the `v200220` tag of the `NineChronicles.Headless` repository.
:::

## Installing NineChronicles.Headless.Executor

First, let's install the NineChronicles.Headless.Executor, a CLI tool that simplifies installing and running Headless.

```sh
dotnet tool install --global NineChronicles.Headless.Executor
```

You can use it with the `9crun` command. To install `Headless`, use the `install` command and verify the installation with the `versions` command:

```sh
9crun install v200220
9crun versions
```

If successful, you should see output like this:

```
Download v200220 headless
Finish!
Installed versions:
v200220
```

The `9crun` tool includes templates with pre-configured settings for different use cases. Since we’ll be running a local node for testing purposes, we’ll use the `Single` mode:

```sh
9crun run --version=v200220 --planet=Single
```

Depending on your system, this may take some time. The node is successfully running if you see logs similar to the following:

```
[19:00:51 INF] The workstation garbage collector is running.
[19:00:52 DBG] Secp256K1CryptoBackend initialized.
[19:00:52 DBG] Migrating RocksDB.
[19:00:52 DBG] RocksDB is initialized.
[19:00:53 DBG] Number of chain ids: 1
[19:00:53 DBG] Canonical chain id: 7d43fc6c-c48b-469b-9724-712495d409d9
[19:00:53 INF] [ActionEvaluator] Evaluating actions in the block #1 pre-evaluation hash 6dc1b3d42c91c9affffe6ec3e2205978271d383c1fdbee742623e00074360f66...
[19:00:53 INF] [ActionEvaluator] Evaluating policy end block actions for block #1 6dc1b3d42c91c9affffe6ec3e2205978271d383c1fdbee742623e00074360f66
[19:00:53 DBG] [b4179Ad0d7565A6EcFA70d2a0f727461039e0159, b4179Ad0d7565A6EcFA70d2a0f727461039e0159]RewardGold exec started
[19:00:53 DBG] [b4179Ad0d7565A6EcFA70d2a0f727461039e0159, b4179Ad0d7565A6EcFA70d2a0f727461039e0159]RewardGold Total Executed Time: 00:00:00.0009670
[19:00:53 INF] [ActionEvaluator] Action Nekoyume.Action.RewardGold took 25 ms to execute, GetState called 0 times and took 0 ms
[19:00:53 INF] [ActionEvaluator] Actions in 0 transactions for block #1 pre-evaluation hash 6dc1b3d42c91c9affffe6ec3e2205978271d383c1fdbee742623e00074360f66 evaluated in 47 ms
[19:00:53 DBG] [BlockChain] Took 51 ms to evaluate block #1 hash 4e5ed98157a2783b98bf2e6e376359b0c6070ce1c8fad5d1cc11ae2a4da50d8e with 1 action evaluations
[19:00:53 INF] [NetMQTransport] Listening on 31234...
[19:00:53 INF] [NetMQTransport] Listening on 31588...
[19:00:53 DBG] Initializing Swarm. ConsensusReactor: True
[19:00:53 DBG] [HeightVoteSet] Adding round 0
[19:00:53 INF] [Context] Created Context for height #2, round #-1
[19:00:53 DBG] Trying to delete 0 obsoleted chains...
...
```

## Verifying the Blockchain Storage

Now, let's verify that the blockchain is running correctly. After launching the blockchain, a storage folder is created under `~/.planetarium/headless/store`, based on the version and template used.

If everything is set up correctly, you should see a directory like `~/.planetarium/headless/store/v200220/Single`.

```
├── block
│   ├── blockindex
│   │   └── ...
│   └── epoch19916
│       └── ...
├── blockcommit
│   └── ...
├── blockpercept
│   └── ...
├── chain
│   └── ...
├── nextstateroothash
│   └── ...
├── states
│   └── ...
├── tx
│   ├── epoch19916
│   │   └── ...
│   └── txindex
│       └── ...
├── txbindex
│   └── ...
└── txexec
    └── ...
```

This confirms that the blockchain storage was successfully created and that your Nine Chronicles blockchain node is operating correctly. All blockchain data is stored in this directory.

## Checking the Node's Status

Headless provides features to check the blockchain status via [GraphQL](https://graphql.org/). Let’s use GraphQL to query the current state of the blockchain. Open the [GQL Playground](http://127.0.0.1:31280/ui/playground) of the Headless instance you launched with `9crun`.

In the Playground, you can click the `DOCS` and `SCHEMA` buttons on the right to explore various information. To check the latest block details, use the `nodeStatus` query as shown below. Enter the GraphQL query in the left panel of the Playground, and click the :arrow_forward: button in the center.

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

Here’s an example of what the response might look like:

```json
{
  "data": {
    "nodeStatus": {
      "tip": {
        "miner": "0xb287F295d2C4e875Bde83A36F11B60d8d12b7976", // Address of the miner who mined the block
        "hash": "a88ded5a592503f2986d9288386af4c30669a8b82390fc46fa2fe29cb3b2fdc4", // Block hash
        "index": 32 // Block index
      }
    }
  },
  "extensions": {}
}
```

This allows you to check the latest block index and hash information on your locally running Nine Chronicles node.

::: tip :tada:
Congratulations! You've successfully learned how to run a Nine Chronicles blockchain node. Next, let’s explore how to query the status of the main network where the actual game is running and take a look at how the game data is structured.
:::
