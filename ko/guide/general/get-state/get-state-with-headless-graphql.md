# 상태 조회하기: GraphQL(Headless)

GraphQL은 API용 쿼리 언어이자 데이터 형식, 즉 API를 구축하기 위한 사양입니다. 클라이언트가 필요한 데이터를 정확히 요청하여 네트워크를 통해 전송되는 데이터의 양을 줄임으로써 기존의 RESTful API에 비해 서버에서 데이터를 가져오는 더 효율적인 방법을 제공합니다.

나인크로니클의 블록체인 노드 구현체인 [NineChronicles.Headless][nc-headless]에서는 GraphQL API를 통해 다양한 정보를 조회할 수 있습니다. 이 문서는 브라우저를 사용해서 Headless에 간단한 GraphQL 요청을 보내고 블록체인 상태를 조회하는 방법을 배워보겠습니다.

[nc-headless]: https://github.com/planetarium/NineChronicles.Headless

## GraphQL Playground에 접속하기

https://9c-main-rpc-1.nine-chronicles.com/ui/playground 에 접속해보겠습니다.

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
