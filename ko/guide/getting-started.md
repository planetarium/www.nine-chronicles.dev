# 시작하기

환영합니다. 나인크로니클에 관심을 가져주신 개발자 여러분 :tada:  

## 나인크로니클에 대해
[나인 크로니클](https://docs.nine-chronicles.com/introduction)은 게이머들과 함께 운영하는 분산형 게임 네트워크 위에서 돌아가는 오픈소스 온라인 RPG 입니다.  
블록체인 라이브러리 [Libplanet][libplanet]을 사용하여 나인 크로니클의 네트워크 프로토콜인 [Lib9c][lib9c]를 개발했고 이를 [GraphQL](https://graphql.org/), [gRPC](https://grpc.io/)를 통해 쉽게 접근할 수 있도록 [NineChronicles.Headless][nc-headless] 개발했습니다.  
그리고 매력적인 게임 플레이를 위해서 [Unity][unity]를 사용하여 개발한 [게임 클라이언트][nc-unity]를 제공하고 있고, 이 클라이언트의 업데이트와 실행을 담당하고 블록체인 네트워크 접속을 돕는 [런처][nc-launcher]를 제공하고 있습니다.

[nc]: https://nine-chronicles.com
[libplanet]: https://github.com/planetarium/libplanet
[unity]: https://unity.com/
[lib9c]: https://github.com/planetarium/lib9c
[nc-headless]: https://github.com/planetarium/NineChronicles.Headless
[nc-unity]: https://github.com/planetarium/NineChronicles
[nc-launcher]: https://github.com/planetarium/9c-launcher

## 오픈소스
유저들과 같이 게임을 만들고 소통하기 위해 **나인 크로니클과 관련된 모든 저장소는 전부 [오픈소스](https://github.com/planetarium)로 개발**되고 있습니다.  
게임의 백엔드, 클라이언트의 코드들 뿐만 아니라 게임을 구동하기 위한 서버 설정 또한 [9c-infra](https://github.com/planetarium/9c-infra)를 통해 확인할 수 있으며 참고하여 실행할 수 있도록 [helm chart](https://helm.sh/)를 제공하고 있습니다.  
개발자 포탈 또한 [오픈소스](https://github.com/planetarium/www.nine-chronicles.dev)입니다. 오픈소스 기여는 언제나 환영합니다 :sparkles:

## 개발자 포탈
이 개발자 포탈 사이트는 크게 3가지 분류의 개발자들을 위한 가이드와 튜토리얼을 마련해둔 사이트입니다. 위에서 언급했던 것 처럼 모더와 네트워크에 대해 알고 싶은 사람, 오픈소스 기여자 입니다.

### 모더
모딩은 게임과 관련된 웹사이트를 제작하거나 클라이언트 위에서 돌아가는 모드, 아니면 클라이언트 자체를 다시 만든 모드 등 다양하게 모딩이 이루어지고 있습니다. [awesome-9c](https://github.com/planetarium/awesome-9c)를 통해 다양한 모드들을 확인해보실 수 있습니다.

- 모딩을 하고 싶으시다면 [모딩 가이드](./modding/getting-started)에서 다양한 모딩 튜토리얼을 확인해보세요.

### 네트워크
나인 크로니클 네트워크에 참여하고 싶은 분, 네트워크 프로토콜을 수정해 본인만의 나인 크로니클을 만들어보고 싶으신 분 등 **네트워크에 관심이 있으신 분들을 위해 여러 문서**를 준비해두었습니다.  
로컬에서 네트워크를 실행해보는 튜토리얼부터 네트워크에 대한 구조 설명을 해둔 가이드들을 확인해보세요.

- 나인 크로니클 네트워크에 대해 알고 싶다면 [네트워크 가이드](./network/getting-started)에서 자세한 내용을 확인하실 수 있습니다.

### 오픈소스 기여
나인 크로니클은 10개가 넘는 레포지토리들이 서로 상호작용하며 동작하고 있습니다.  
여러 레포지토리들이 있기 때문에 복잡하고 어떤 레포가 어떤 역할을 하는지 알기 어렵습니다.  
**하지만 전체적인 레포지토리 구조와 각각의 역할을 설명하는 가이드를 준비해두었으니 어렵지 않게 시작하실 수 있을겁니다.**

- 오픈소스 기여 또는 나인 크로니클의 레포지토리 구조를 알고 싶다면 [오픈소스 가이드](./contributing/getting-started)를 확인해주세요.

## 커뮤니티

커뮤니티는 유저를 위한 디스코드와 개발자를 위한 디스코드가 따로 존재합니다.  

- [Discord (for Devs)](https://discord.gg/4CNrH7swAm)
- [Discord (for Player)](https://discord.gg/planetarium)

::: info
다음은 자동으로 모딩 가이드로 넘어가게 됩니다. 원하시는 가이드로 이동해주세요!
:::
