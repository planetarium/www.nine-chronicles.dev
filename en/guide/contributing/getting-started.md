Welcome to the starting point for making your first contribution to the Nine Chronicles ecosystem.:tada:<br>
Before you make your first contribution, We'd like to explain the basic structure of the Nine Chronicles ecosystem, followed by the broader structure.

## Blockchain network

Nine Chronicles' blockchain network has a large number of nodes participating in it. The network works in a peer-to-peer fashion, with each node sending data to and from each other to maintain the blockchain.

```mermaid
graph LR
    subgraph Network
        direction LR
        node1[Node] -- P2P <--> node2[Node]
        node2 -- P2P <--> node3[Node]
        node3 -- P2P <--> node4[Node]
    end
```

The implementation of this node is `NineChronicles.Headless`. This is a node of Nine Chronicles, a core component of the blockchain network.

```mermaid
graph BT
    subgraph headless["NineChronicles.Headless(Node)"]
        direction TB
        subgraph headless-lib9c[Lib9c]
            direction TB
            headless-lib9c-libplanet[Libplanet]
        end
        headless-grpc-server[gRPC Server]
        headless-graphql-server[GraphQL Server]
    end
```

This node uses `Lib9c` and `Libplanet` to process blockchain data, and interacts with the outside world via **gRPC** and **GraphQL** servers.

## Gameplay

The primary way to play Nine Chronicles is to use the Unity client via the launcher.

```mermaid
graph LR
    subgraph launcher[9c-launcher]
        launcher-graphql-client[GraphQL Client]
    end
    subgraph headless["NineChronicles.Headless(Node)"]
        subgraph headless-lib9c[Lib9c]
            headless-lib9c-libplanet[Libplanet]
        end
        headless-grpc-server[gRPC Server]
        headless-graphql-server[GraphQL Server]
    end
    subgraph 9c-unity["NineChronicles(UnityClient)"]
        subgraph 9c-unity-lib9c[Lib9c]
            9c-unity-lib9c-libplanet[Libplanet]
        end
        9c-unity-grpc-client[gRPC Client]
    end
    launcher-graphql-client -- GraphQL <--> headless-graphql-server
    launcher -- Execute --> 9c-unity
    launcher -- Send NCG to Odin/Heimdall --> 9c-relay-bridge
    launcher -- Send NCG to Ethereum(WNCG) --> 9c-eth-bridge
    9c-relay-bridge -- GraphQL --> headless-graphql-server
    9c-eth-bridge -- GraphQL --> headless-graphql-server
    9c-unity-grpc-client -- gRPC <--> headless-grpc-server

    9c-unity -- Fetch Market --> market-service
    market-service[Market Service] -- GraphQL --> headless-graphql-server

    9c-unity -- In App Purchase --> iap
    iap[IAP Service] -- GraphQL --> headless-graphql-server
    iap -- Send Assets to Heimdall --> 9c-relay-bridge

    9c-unity -- Fetch Arena Ranking Data --> arena-service
    arena-service[Arena Service] -- GraphQL --> headless-graphql-server

    9c-unity -- Fetch World Boss Ranking Data --> world-boss-service
    world-boss-service[World Boss Service] -- GraphQL --> headless-graphql-server

    9c-unity -- Request Patrol Reward --> patrol-reward-service
    patrol-reward-service[Patrol Reward Service] -- GraphQL --> headless-graphql-server

```

The implementations of this launcher and the Unity client are `9c-launcher` and `NineChronicles`. The `9c-launcher` interacts with `NineChronicles.Headless` via the GraphQL client, and the Unity client interacts with `NineChronicles.Headless` via the gRPC client.

## Repositories

The various components of the Nine Chronicles ecosystem are spread across several GitHub repositories. Here's a list of the main repositories:

- [9c-launcher](https://github.com/planetarium/9c-launcher)
- [NineChronicles](https://github.com/planetarium/NineChronicles)
- [NineChronicles.Headless](https://github.com/planetarium/NineChronicles.Headless)
- [Lib9c](https://github.com/planetarium/lib9c)
- [Libplanet](https://github.com/planetarium/libplanet)
