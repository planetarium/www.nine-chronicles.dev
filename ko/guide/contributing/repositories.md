여기서는 나인 크로니클 생태계를 이루는 주요 저장소 목록을 안내합니다.

### Blockchain

- [bencodex](https://github.com/planetarium/bencodex)([bencodex.net](https://github.com/planetarium/bencodex.net)): 블록체인의 상태를 표현하는 언어입니다.
- [libplanet](https://github.com/planetarium/libplanet): 블록체인 프레임워크입니다.

### Nine Chronicles Networks

- [lib9c](https://github.com/planetarium/lib9c): `libpalnet`을 토대로 작성한 나인 크로니클의 블록체인 프로토콜입니다. 블록체인 상태 모델과 액션 등을 정의합니다.
- [NineChronicles.Headless](https://github.com/planetarium/NineChronicles.Headless): 나인 크로니클의 블록체인 노드 구현체입니다.
- [NineChronicles.RPC.Shared](https://github.com/planetarium/NineChronicles.RPC.Shared): `NineChronicles.Headless`에서 제공하는 RPC 네트워킹 인터페이스를 다룹니다.
- [9c-infra](https://github.com/planetarium/9c-infra): 나인 크로니클 네트워크의 인프라를 관리합니다.

### Nine Chronicles Playables

- [NineChronicles](https://github.com/planetarium/NineChronicles): 나인 크로니클의 유니티 클라이언트입니다. 주로 `NineChronicles.Headless`에서 제공하는 RPC 서버와 통신하며 게임을 진행합니다.
- [9c-launcher](https://github.com/planetarium/9c-launcher): 나인 크로니클 게임 실행을 위한 런처입니다. 나인 크로니클 네트워크의 주요 노드들과 통신하여 여러가지 기능을 수행합니다.

### Services

- [9c-portal](https://github.com/planetarium/9c-portal): 나인 크로니클 유저를 위한 다양한 기능을 제공하는 저장소입니다. lib9c에 정의된 액션 일부를 사용하고 있으니, 관련한 소통이 필요합니다.
- [market-service](https://github.com/planetarium/market-service): 블록체인 상태에 저장된 마켓 관련 정보를 캐시하고 이를 조회하는 API를 제공합니다.
- [NineChronicles.Arena](https://github.com/planetarium/NineChronicles.Arena)
- [NineChronicles.DataProvider](https://github.com/planetarium/NineChronicles.DataProvider): 블록체인 상태에 저장된 정보 중 일부를 캐시하고 이를 조회하는 API를 제공합니다.
- [NineChronicles.EthBridge](https://github.com/planetarium/NineChronicles.EthBridge): NCG를 다른 블록체인 네트워크로 연결해줍니다. (i.e., WNCG)
- [NineChronicles.IAP](https://github.com/planetarium/NineChronicles.IAP): 구글 플레이나 앱스토어에서 진행한 결제 건을 검증하고, 유효한 결제에 대해서 블록체인 네트워크 쪽으로 아이템 등을 지급합니다.
- [patrol-reward-service](https://github.com/planetarium/patrol-reward-service)
- [world-boss-service](https://github.com/planetarium/world-boss-service)

### Additional Resources

- [NineChronicles.LiveAssets](https://github.com/planetarium/NineChronicles.LiveAssets): 클라이언트가 참조하는 에셋 저장소입니다.
