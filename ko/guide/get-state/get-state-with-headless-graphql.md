# 상태 조회하기: GraphQL(Headless)

GraphQL은 API용 쿼리 언어이자 데이터 형식, 즉 API를 구축하기 위한 사양입니다. 클라이언트가 필요한 데이터를 정확히 요청하여 네트워크를 통해 전송되는 데이터의 양을 줄임으로써 기존의 RESTful API에 비해 서버에서 데이터를 가져오는 더 효율적인 방법을 제공합니다.

나인크로니클의 블록체인 노드 구현체인 [NineChronicles.Headless][nc-headless]에서는 GraphQL API를 통해 다양한 정보를 조회할 수 있습니다. 이 문서는 브라우저를 사용해서 Headless에 간단한 GraphQL 요청을 보내고 블록체인 상태를 조회하는 방법을 배워보겠습니다.

[nc-headless]: https://github.com/planetarium/NineChronicles.Headless

## 블록체인 노드 실행하기

우리는 [앞에서](../create-network/running-a-blockchain-node-with-dotnet-project) 나인크로니클의 블록체인 노드 구현체인 [NineChronicles.Headless][nc-headless]를 복제해서 블록체인 노드를 실행해보았습니다. 이번에도 같은 방법으로 블록체인 노드를 실행합니다.

```console
➜  NineChronicles.Headless.Executable & dotnet run --config=./appsettings.local.json --arena-participants-sync=false
```

## GraphQL Playground에 접속하기

GraphQL URL은 `appsettings.local.json`에서 `127.0.0.1:31280`으로 설정했습니다. 이제 http://127.0.0.1:31280/ui/playground 또는 http://localhost:31280/ui/playground 에 접속해보겠습니다.

![Empty GraphQL Playground](/graphql-playground-01.png)

Playground 우측의 `DOCS`와 `SCHEMA` 버튼을 클릭해서 다양한 정보를 확인할 수 있습니다.

## 최신 블록의 정보 조회하기

여러 쿼리들 중에서 `nodeStatus`를 사용해서 최신 블록의 정보를 조회해보겠습니다. Playground의 좌측 영역에 아래와 같이 GraphQL 쿼리를 작성하고, 화면 중앙의 :arrow_forward: 버튼을 클릭합니다.

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

그러면 화면 오른쪽에 아래와 같이 최신 블록의 정보를 확인할 수 있습니다. 이는 특정 쿼리가 여러 개의 데이터를 반환하는 경우에 사용되는 구조입니다. 각각의 데이터는 `data` 키 아래에 있는 해당 쿼리 이름으로 정렬되어 있으며, 그 안에는 다시 각각의 필드가 포함됩니다.
눈치채셨을지 모르겠지만 조회한 블록의 `miner`가 블록체인 노드에 채굴에 사용되는 개인 키의 주소와 같은 것을 확인할 수 있습니다.

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

### 메인넷의 GraphQL Playground에서 해보기

위에서 사용한 GraphQL 쿼리를 메인넷의 GraphQL Playground URL에 접속해서 조회해보겠습니다.

- GraphQL Playground URL(Mainnet): https://9c-main-rpc-1.nine-chronicles.com/ui/playground

```json
{
  "data": {
    "nodeStatus": {
      "tip": {
        "miner": "0xb287F295d2C4e875Bde83A36F11B60d8d12b7976",
        "hash": "a88ded5a592503f2986d9288386af4c30669a8b82390fc46fa2fe29cb3b2fdc4",
        "index": 11136526
      }
    }
  },
  "extensions": {}
}
```

::: tip :rotating_light:
수고하셨습니다! 이제 여러분은 블록체인 노드의 GraphQL 서버에 접속해서 원하는 상태를 조회하는 방법을 배웠습니다. 앞으로 GraphQL Schema와 문서를 보고 더 많은 상태를 조회해보세요!
다음은 트랜젝션을 발행해서 블록체인 상태를 변경해보겠습니다.
:::
