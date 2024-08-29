# 나인크로니클 블록체인 노드 실행하기
블록체인 노드(Node)는 블록체인 네트워크를 구성하는 개별 컴퓨터나 서버를 의미합니다. 노드는 블록체인 네트워크의 핵심을 이루며, 네트워크의 보안과 무결성을 유지하는 중요한 역할을 담당합니다. 보다 자세한 내용을 알고 싶다면, [libplanet 디자인 문서](https://docs.libplanet.io/5.3.0-alpha.1/articles/design.html)를 참고하세요.  
저희는 libplanet을 기반으로 한 블록체인을 더 쉽게 운영할 수 있도록 [NineChronicles.Headless](https://github.com/planetarium/NineChronicles.Headless)를 개발했습니다. 이 Headless는 RPC, GraphQL(GQL) 등 체인 데이터를 조회하기 위한 다양한 API들을 포함하고 있으며, 이번 문서에서는 이 Headless를 활용해 블록체인 노드를 직접 실행해보는 과정을 진행할 예정입니다.

::: info :bulb:
본 문서에서는 `NineChronicles.Headless` 저장소의 `v200220` 태그를 기준으로 진행했습니다.
:::

## NineChronicles.Headless.Executor 설치
먼저 Headless를 쉽게 설치 및 실행하는 cli 도구인 NineChronicles.Headless.Executor를 설치합니다.

```sh
dotnet tool install --global NineChronicles.Headless.Executor
```

`9crun`을 통해 사용할 수 있으며 `install`명령어와 `versions` 명령어를 통해 잘 설치되었는지 확인합니다.
```sh
9crun install v200220
9crun versions
```
```
Download v200220 headless
Finish!
Installed versions:
v200220
```

`9crun`에는 실행에 필요한 설정을 미리 넣어둔 템플릿들이 존재합니다. 지금은 단독 노드를 돌릴 것이기 때문에 `Single` 모드로 실행합니다.
```sh
9crun run --version=v200220 --planet=Single
```

아래처럼 많은 로그들과 함께 노드가 실행되면 성공입니다.
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

## 생성된 블록체인 저장소 확인하기
이제 블록체인이 정상적으로 실행되고 있는지 확인할 차례입니다. 블록체인 실행 후, `~/.planetarium/headless/store` 디렉토리 아래에 실행한 버전과 템플릿에 따라 Store 폴더가 생성됩니다.  
위 과정을 성공적으로 수행했다면, `~/.planetarium/headless/store/v200220/Single` 폴더가 존재할 것입니다.

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

블록체인 저장소가 정상적으로 생성되었음을 확인할 수 있습니다. 이는 나인크로니클 블록체인 노드가 정상적으로 동작하고 있는 증거이며 해당 store에 모든 블록체인 데이터가 적재됩니다.

## 상태 확인하기
Headless에는 [Graphql](https://graphql.org/)을 통해 블록체인 상태를 확인할 수 있는 기능들이 있습니다.  
Graphql을 통해 블록체인의 상태들을 조회해보겠습니다. [Local Headless](http://127.0.0.1:31280/ui/playground) 에 접속해 playground를 실행합니다.

Playground 우측의 `DOCS`와 `SCHEMA` 버튼을 클릭해서 다양한 정보를 확인할 수 있으며 여러 쿼리들 중에서 `nodeStatus`를 사용해서 최신 블록의 정보를 조회해보겠습니다.  
Playground의 좌측 영역에 아래와 같이 GraphQL 쿼리를 작성하고, 화면 중앙의 :arrow_forward: 버튼을 클릭합니다.

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

이렇게 로컬에서 직접 나인크로니클 노드를 실행해보고 최신 block index와 hash 상태 정보를 확인해볼 수 있었습니다.

::: tip :tada:
수고하셨습니다! 이제 여러분은 나인크로니클의 블록체인 노드를 실행하는 방법을 배웠습니다. 다음으론 실제 메인네트워크의 상태를 조회해보고 게임 데이터가 어떻게 이루어져 있는지 살펴보겠습니다.
:::
