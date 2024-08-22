# 1. Summary

Nine Chronicles(a.k.a. 9c) is role-playing game on blockchain. To achieve the game on blockchain, 9c runs with multiple libraries in certain structure.  
In this document, you will understand how 9c is structured and interact each other. After that, you would know what repository you should touch for your mod/utils.

# 2. Service Structure

![alt text](/images/en/forum-trunk/nine-chronicles-service-and-repository-structure/image.png)

Nine Chronicles has 3 parts in major. "Launcher", "Headless Server", "Unity Client" are those.  
In this chapter, We'll see each part in brief.

## 2.1. Launcher

Launcher is the one you execute to play game. This checks Nine Chronicles game version and updates Launcher and Unity Client to the latest version.  
After login in Launcher, the Launcher runs Unity client to play game with your logged-in account.  
Launcher also has embedded Headless Server to read and sign blockchain-related data from the Nine Chronicles network.

## 2.2. Headless Server

Headless Server is the lightweight server that transfer Tx. data between Unity Client and remote RPC node.  
When the Unity Client does the action, the action data is sent to the Headless Server through RPC connection.  
The Headless Server wraps the client action to blockchain Transaction(Tx.) and propagate to remote RPC server to be mined inside new block.  
Headless Server also runs GraphQL server at the same time, so the Launcher can query and get the newest data.

### 2.2.1. Remark

Headless Server is embedded inside Launcher at this moment for development convenience and historical issue, and it will be moved out from the Launcher.

## 2.3. Unity Client

Unity Client is what you play actual Nine Chronicles game. All user interactions occurs in this player.  
Unity Client is connected to Headless Server using RPC protocol to send/receive data from blockchain and render new states to the screen.

# 3. Repository and Library Structure

![alt text](/images/en/forum-trunk/nine-chronicles-service-and-repository-structure/image-1.png)

Each part of Nine Chronicles has common libraries to communicate each other.  
In this chapter, We'll check the core libraries to run Nine Chronicles.  
After read this chapter, you would know where to see and touch to modify Nine Chronicles as you wish.

## 3.1. 9c-launcher

#### [GitHub repository](https://github.com/planetarium/9c-launcher)

The repository for Launcher. You can build and run your own Nine Chronicles launcher using this repository.  
9c-launcher is mostly written in TypeScript and you can easily build and run launcher following [Getting Started](https://github.com/planetarium/9c-launcher/wiki/Getting-Started).  
If you build and run your launcher with default setting, the launcher will attach to Nine Chronicles mainnet(the production server).  
Otherwise you can attach to different(maybe your own) blockchain network, you can achieve that through editing `config.json` to change target network.
You can get the `config.json` for mainnet [here](https://download.nine-chronicles.com/9c-launcher-config.json) and the detailed document at [here](./the-structure-and-location-of-config-json.md).

## 3.2. NineChronicles.Headless

#### [GitHub repository](https://github.com/planetarium/NineChronicles.Headless)

The repository for Headless Server. You can run your own blockchain node whether it is full node or not.  
Nine Chronicles.Headless is mostly written in C#. You can build and run your local headless server following [Getting Started](https://github.com/planetarium/NineChronicles.Headless/wiki/Getting-Started).
You can create and run your own blockchain network/node with this repository. Please check [Create new genesis block](https://github.com/planetarium/NineChronicles.Headless/wiki/Create-new-genesis-block) to create your own genesis block for your own network.

### 3.2.1. Remark

#### 3.2.1.1. Options for headless node

There are several functions can be run using this repository.

- Peer: save & spread available node addresses.
- RPC server: Receives transactions from client and broadcast them to peers.
- GraphQL server: Provides blockchain data and the node's status to answer incoming GQL query. You may send action data through this server.
- Miner: The actual block miner. Collects transactions from peer nodes and verify tx.s to mine a new block.

You can run one or more functionalities at the same time in one node.
See [README](https://github.com/planetarium/NineChronicles.Headless/blob/main/README.md) for all available options.

#### 3.2.1.2. Usage of MagicOnion

To make gRPC connection between Unity client and .NET server, we chose [MagicOnion](https://cysharp.github.io/MagicOnion/) as an implementation.  
This is well-made RPC framework to meet our requirements, and distributed under [MIT license](https://opensource.org/licenses/MIT).  
Although we're not using MagicOnion's feature very well inside logic, but this information we're using MagicOnion is useful for first-time viewer.

## 3.3. NineChronicles

#### [GitHub repository](https://github.com/planetarium/NineChronicles)

The unity client to play Nine Chronicles Game. You need Unity to build and run this game on your local computer.  
Following [Getting Started](https://github.com/planetarium/NineChronicles/wiki/Get-Started), you can build and run your own Nine Chronicles client on your environment.  
If you want to enhance UX/UI or any user interactive properties, this is the right repository to dig.

### 3.3.1. Remark

#### 3.3.1.1. Unity version issue

Due to prevent unintended issue, we highly recommend to use Unity version as we wrote in the document.  
If you use later version instead noted version, you can meet a bunch of errors, and we cannot help at that situation.

#### 3.3.1.2. Select blockchain to attach

If you run your game using "Play" button on your Unity editor, It will run with its own internal blockchain network, not any existing external blockchain.  
To attach your client to mainnet or other network, you have to change client configurations.

## 3.4. Lib9c

#### [GitHub repository](https://github.com/planetarium/lib9c)

This is common library used broadly among Nine Chronicles game server and client.  
This has core game logic, data models of Nine Chronicles game developed with Libplanet.
In this library, you can see Nine Chronicles' status & action definitions and all game logics.  
If you want to mod game action and/or logic, this repository is the one.

## 3.5. Libplanet

#### [GitHub repository](https://github.com/planetarium/libplanet)

This is the very core library that is the blockchain protocol. Libplanet is written in C# and you can install it using [NuGet](https://www.nuget.org/packages/Libplanet/) package.  
Everything to save and update is called `state`, and any type of state mutation is called `action`.  
You can see the library design, tools and all API references in [Libplanet Documentation](https://docs.libplanet.io/).
If you want to see the network structure, consensus algorithm and so on, you should dig this repository to meet what you seek.

### 3.5.1. Remark

#### 3.5.1.1. Difference between Libplanet and Lib9c

- Libplanet is a .NET library for creating multiplayer online game on decentralized blockchain network.
- Lib9c is a library that contains key implementations of Nine Chronicles, a decentralized RPG developed with Libplanet.
