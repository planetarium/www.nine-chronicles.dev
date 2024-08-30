# 상태 조회하기: GraphQL(Headless)

나인크로니클의 블록체인 노드 구현체인 [NineChronicles.Headless][nc-headless]에서는 GraphQL API를 통해 다양한 정보를 조회할 수 있습니다.  
이 문서는 Headless를 이용해 실제 게임이 구동되고 있는 메인 네트워크에서 블록체인 상태를 조회하는 방법을 배워보고 어떤 데이터들이 존재하는지 확인해보겠습니다.

[nc-headless]: https://github.com/planetarium/NineChronicles.Headless

### GraphQL Playground에서 해보기

[앞에서](./running-node-with-executor) 실행해봤던 쿼리를 Mainnet(Odin) GraphQL Playground URL에 접속해서 조회해보겠습니다.

- GraphQL Playground URL(Mainnet): https://9c-main-rpc-1.nine-chronicles.com/ui/playground

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
이렇게 노드의 현재 상태를 조회해볼 수 있습니다.
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
## 게임 데이터 조회하기

`libplanet`에서는 블록체인 데이터를 key-value 데이터베이스(DB)에 저장합니다. 이 DB의 주소와 조회하려는 키에 대한 정보가 있다면, 저장된 값을 확인할 수 있습니다.

Playground에서 다음과 같은 GraphQL 쿼리를 실행해보세요:

```graphql
query {
  state(
    accountAddress: "0000000000000000000000000000000000000021"
    address: "0xc106714d1bf09c37bcff24362eea5508d925f37a"
  )
}
```

아래와 비슷한 결과를 얻을 수 있을 겁니다:

```json
{
  "data": {
    "state": "6931323065"
  },
  "extensions": {}
}
```

여기서 조회된 데이터는 `ActionPoint`에 대한 정보입니다. 이 정보는 `AccountAddress` 주소에 저장된 DB에서, `0xc106714d1bf09c37bcff24362eea5508d925f37a` 유저의 데이터를 가져온 것입니다. 이 주소는 실제로 게임을 플레이하는 유저의 아바타 주소이며, [액션](https://github.com/planetarium/lib9c/blob/development/Lib9c/Action/DailyReward.cs#L83)이 실행되면서 해당 주소에 데이터가 저장됩니다. 

액션이나 상태에 대한 자세한 설명은 추후에 다루겠지만, 현재는 블록체인에서 데이터가 저장되고 이를 조회해 사용할 수 있다는 정도로 이해하시면 됩니다.

조회된 값 `6931323065`는 바로 이해하기 어려운 값인데, 이는 `hex` 값입니다. 이 값을 이해하기 위해서는 변환 과정이 필요합니다. 예를 들어, [이 변환 사이트](https://www.rapidtables.com/convert/number/hex-to-ascii.html)를 사용해 데이터를 변환할 수 있습니다.

![hex 변환 예시](/images/network/state-hex.png)

`libplanet`에서는 데이터를 [Bencodex](https://github.com/planetarium/bencodex)로 인코딩하므로, 앞뒤로 `i`와 `e`가 붙어 있으며, 변환 후 `120`이라는 데이터를 확인할 수 있습니다.

::: tip :tada:
수고하셨습니다! Headless를 사용해 실제 게임 데이터를 조회하며 블록체인 데이터 흐름을 이해해보았습니다. 어려운 개념들이 나왔지만, 모든 내용을 완벽히 이해하지 못해도 괜찮습니다. 다음으로는 private key에 대해 다루겠습니다.
:::
