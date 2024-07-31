#### [GitHub repository](https://github.com/planetarium/planet-node)

# 1. Summary 

planet-node is the .NET CLI application as example for [Libplanet](https://github.com/planetarium/libplanet).

## 1.1. Expected Result

`<Demo video will be embedded>`

You'll get the running blockchain node and can query using GraphQL.

## 1.2. What you'll get

After finish this tutorial, you will know how to make an application using Libplanet.

### Key preferences

1. You can create addresses for blockchain
2. You can create genesis block to start blockchain
3. You can run node to mine blocks and continue blockchain
4. You can define your own actions for your application by implementing `IAction` interface
5. You can get blockchain status and send tx. using GraphQL

# 2. Dive Deep

You can find the detailed steps to run this application in [README.md](https://github.com/planetarium/planet-node/blob/main/README.md) and [TUTORIAL.md](https://github.com/planetarium/planet-node/blob/main/TUTORIAL.md). So in this article, I'll pass basic tutorial steps.

## 2.1. Structure of planet-node

### 2.1.1. Settings

To run planet-node server, we have to set a bunch of things. In planet-node, the `appsetting.json` file has all planet-node settings. There are so many things but just few things are enough for the first time.

- **NoMiner**: Set to run miner or not. If you set this value to `false`, there is no miner in planet-node chain and nothing happens to the blockchain.
- **MinerPrivateKeyString**: Private key of block miner. This is required to sign and create new block.
- **GraphQLServer**: Set to run GraphQL server. If you set this value to `false`, you cannot explore the blockchain other than server log.
- **GraghQLHost**: GQL listening host address.
- **GraghQLPort**: GQL listening port.
- **StorePath**: Path to store blockchain data. If you have previous blockchain data and want to continue, you can set the path to prev. blockchain data.

### 2.1.2. Blockchain Node

Basically planet-node server is full blockchain node. It saves all block data from genesis, the first block to latest block. 
Because of planet-node is single-node chain, this node also runs miner to mine new blocks.
Although blockchain has P2P network topology so we should set peer list and peer discover, you don't need to care about this because we're running single-node blockchain at this moment.

### 2.1.3. GraphQL Server

For easy access to blockchain status and submit transaction to the chain, planet-node server runs GQL server as well. You can use GQL on the auto-generated GQL playground and query things or send tokens to another address.

## 2.2. Key files to check

### 2.2.1. Action

You have to define your own actions used inside the game(in this case, planet-node).
All actions have to implement `IAction` interface which can be found at [this reference](https://docs.libplanet.io/0.41.0/api/Libplanet.Action.IAction.html).
You can see `PlanetAction` and `TransferAsset` classes at [here](https://github.com/planetarium/planet-node/tree/main/PlanetNode/Action). With this, you can transfer assets from one address to another address.
If you want to make new action to your application or game, you can achieve defining your own action like this.

### 2.2.2 GraphTypes

During tutorial, you may already used GraghQL playground to fetch blockchain status and/or send transactions to blockchain. To provide this, you should define GraphQL schema on your own.
As you can see [here](https://github.com/planetarium/planet-node/tree/main/PlanetNode/GraphTypes), all GQL schemata are defined here thus you can easily query using GQL playground.

# 3. Conclusion

With this tutorial, you would understand the very basic and core usage of libplanet.
Making your own application/game on blockchain with libplanet.
If you need to dig libplanet more, please visit [libplanet's official documentation](https://docs.libplanet.io/).
We're welcome to our [planetarium-dev discord server](https://discord.gg/qBPSw78x) for any questions or communication :wave:
