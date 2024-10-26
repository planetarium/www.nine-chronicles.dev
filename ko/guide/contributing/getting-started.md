나인 크로니클 생태계에 첫 기여를 하기위한 출발점에 서신 것을 환영합니다.:tada:<br>
첫 기여를 하기 앞서서 나인 크로니클 생태계의 기본적인 구조를 설명하고, 이어서 좀 더 넓은 구조를 설명드리겠습니다.

## 블록체인 네트워크

나인 크로니클의 블록체인 네트워크에는 수 많은 노드가 참여하고 있습니다. 이 네트워크는 P2P 방식으로 작동하며, 각 노드는 서로 데이터를 주고받으며 블록체인을 유지합니다.

```mermaid
graph LR
    subgraph Network
        direction LR
        node1[Node] -- P2P <--> node2[Node]
        node2 -- P2P <--> node3[Node]
        node3 -- P2P <--> node4[Node]
    end
```

이 노드의 구현체가 바로 `NineChronicles.Headless` 입니다. 이는 나인 크로니클의 노드로서, 블록체인 네트워크의 핵심 구성 요소입니다.

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

이 노드는 `Lib9c`와 `Libplanet`을 사용하여 블록체인 데이터를 처리하고,  **gRPC** 및 **GraphQL** 서버를 통해 외부와 상호작용합니다.

## 게임 플레이

나인 크로니클을 플레이하는 대표적인 방법은 런처를 통해 유니티 클라이언트를 사용하는 것입니다.

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

이 런처와 유니티 클라이언트의 구현체들이 `9c-launcher`와 `NineChronicles` 입니다. `9c-launcher`는 GraphQL 클라이언트를 통해 `NineChronicles.Headless`와 상호작용하며, 유니티 클라이언트는 gRPC 클라이언트를 통해 `NineChronicles.Headless`와 상호작용합니다.

## 저장소 목록

나인 크로니클 생태계의 다양한 구성 요소들은 여러 GitHub 저장소에 나누어져 있습니다. 주요 저장소 목록은 다음과 같습니다.

- [9c-launcher](https://github.com/planetarium/9c-launcher)
- [NineChronicles](https://github.com/planetarium/NineChronicles)
- [NineChronicles.Headless](https://github.com/planetarium/NineChronicles.Headless)
- [Lib9c](https://github.com/planetarium/lib9c)
- [Libplanet](https://github.com/planetarium/libplanet)
