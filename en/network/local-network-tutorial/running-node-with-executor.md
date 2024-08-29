# Running a Nine Chronicles Blockchain Node

A blockchain node is an individual computer or server that makes up the blockchain network. Nodes are essential to the network, ensuring its security and integrity. For more in-depth information, refer to the [libplanet design document](https://docs.libplanet.io/5.3.0-alpha.1/articles/design.html).

To simplify the operation of a blockchain based on libplanet, we developed [NineChronicles.Headless](https://github.com/planetarium/NineChronicles.Headless). This tool includes various APIs for querying chain data, such as RPC and GraphQL (GQL). In this guide, we will walk through the process of running a blockchain node using NineChronicles.Headless.

::: info :bulb:
This guide is based on the `v200220` tag of the `NineChronicles.Headless` repository.
:::

## Installing NineChronicles.Headless.Executor

First, install the NineChronicles.Headless.Executor, a CLI tool that simplifies the installation and execution of Headless.

```sh
dotnet tool install --global NineChronicles.Headless.Executor
```

You can use it with the `9crun` command. Verify the installation by running the following commands:

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

The `9crun` tool includes templates with pre-configured settings for different use cases. Since we'll be running a standalone node, we'll use the `Single` mode:

```sh
9crun run --version=v200220 --planet=Single
```

If you see logs similar to the following, your node is running successfully:

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

Now it's time to check whether the blockchain is running correctly. After launching the blockchain, a storage folder is created under `~/.planetarium/headless/store`, based on the version and template used.

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

Headless provides features to check the blockchain status via [GraphQL](https://graphql.org/). Let’s use GraphQL to query the current state of the blockchain. Open the [Local Headless GraphQL Playground](http://127.0.0.1:31280/ui/playground).

In the Playground, you can click the `DOCS` and `SCHEMA` buttons on the right to explore various information. To check the latest block details, use the `nodeStatus` query as shown below.  
Enter the GraphQL query in the left panel of the Playground, and click the :arrow_forward: button in the center.

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
![alt text](/images/network/nodestatus-query.png)

This allows you to check the latest block index and hash information on your locally running Nine Chronicles node.

::: tip :tada:
Congratulations! You've successfully learned how to run a Nine Chronicles blockchain node. Next, let's explore how to query the status of the main network and examine how game data is structured.
:::
