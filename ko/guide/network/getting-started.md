# 네트워크 시작하기

나인 크로니클은 게임의 모든 데이터를 블록체인에 기록하는 **온체인(fully on-chain)** 게임입니다.

일반적인 백엔드 서비스의 구조인 **Database <-> API 서비스** 구조를, 나인 크로니클에서는 **블록체인 <-> API 서비스**로 전환했다고 보시면 이해가 더 쉬울 겁니다.

[Libplanet](https://github.com/planetarium/libplanet)과 [Lib9c](https://github.com/planetarium/lib9c)를 사용해 블록체인 네트워크를 구성하여 데이터베이스와 비슷한 역할을 하며, [Nine Chronicles Headless](https://github.com/planetarium/NineChronicles.Headless)를 통해 GraphQL(GQL)과 gRPC를 API 서비스로 제공합니다.

이렇게 구성된 네트워크는 데이터 저장과 API 호출 모두 블록체인을 기반으로 동작하게 합니다.

로컬에서 직접 나인크로니클 네트워크를 돌려보고 싶으시다면 [해당 문서](../../tutorials/local-network-tutorial/getting-started)를 참고해주세요!
