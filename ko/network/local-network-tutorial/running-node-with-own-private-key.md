# 자신의 Private Key로 나인크로니클 블록체인 노드 실행하기

이전 실습에서 우리는 `Headless.Executor`를 사용해 Node를 실행해보았습니다. 이번에는 자동으로 생성된 private key가 아닌, 새로 생성한 private key와 제네시스 블록을 사용해 노드를 실행하는 방법을 배워보겠습니다.

## 1. `appsettings` 수정하기

먼저, `~/.planetarium/headless/appsettings/appsettings.Single.json` 경로에 있는 Single 노드 설정 파일을 수정해야 합니다. 이 파일에서 `MinerPrivateKeyString`, `ConsensusPrivateKeyString`, `ConsensusSeedStrings` 항목을 새로 생성한 값으로 대체합니다.

```json
{
  ...
  "MinerPrivateKeyString": "9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102", // [!code --]
  "MinerPrivateKeyString": "{your private key}", // [!code ++]
  "ConsensusPrivateKeyString": "9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102", // [!code --]
  "ConsensusPrivateKeyString": "{your private key}", // [!code ++]
  "ConsensusSeedStrings": [
    "033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14,127.0.0.1,31588" // [!code --]
  ],
  "ConsensusSeedStrings": [
    "{your public key},127.0.0.1,31588" // [!code ++]
  ],
  ...
}
```

## 2. 제네시스 블록 대체하기

다음으로, `~/.planetarium/headless/genesis-block/genesis-block-for-single` 경로에 자동으로 생성된 제네시스 블록이 있습니다.  
이전 실습에서 생성한 제네시스 블록을 이 경로에 있는 `genesis-block-for-single` 파일을 삭제하고, 동일한 이름으로 새 파일을 옮겨줍니다.

## 3. 기존 스토어 삭제하기

이미 실행을 해보면서 다른 private key로 node가 설정되어있습니다. 이를 초기화해주기 위해 store 폴더를 삭제해줍니다. 
`~/.planetarium/headless/store/v200220` 해당 폴더를 삭제합니다.

## 4. 노드 실행하기

이제 노드를 실행할 차례입니다. 다음 명령어를 통해 실행합니다:

```sh
9crun run --version=v200220 --planet=Single
```

이 명령어를 실행하면, 이미 파일이 존재하는 경우에도 새로 수정한 private key와 제네시스 블록을 사용하여 노드가 실행됩니다. 실행 로그는 다음과 같습니다:

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

## 5. 자신의 Private Key로 변경되었는지 확인하기

노드가 성공적으로 실행되었는지 확인하기 위해, GraphQL을 사용해 블록체인의 상태를 조회해보겠습니다. [Local Headless](http://127.0.0.1:31280/ui/playground)에 접속해 다음 쿼리를 실행합니다:

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

![NodeStatus 쿼리 결과](/images/network/nodestatus-query.png)

쿼리 결과에서 `miner` 항목에 각자 수정해서 입력한 private key의 address가 표시되는 것을 확인할 수 있습니다.

::: tip :tada:
축하합니다! 이제 유니크한 자신의 private key로 Node를 가동하는 방법을 배웠습니다. 다음 단계에서는 로컬 네트워크로 게임 클라이언트를 실행해보겠습니다.
:::
