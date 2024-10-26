# 시작하기

환영합니다. 모더 여러분 :tada:

현재 저희는 모딩의 분야를 크게 2가지로 분류하고 각 분야별로 모딩을 조금이라도 더 수월하게 할 수 있도록 각종 툴과 튜토리얼을 제공하고 있습니다.

1. **클라이언트 수정 모딩**: 실제 게임이 가동되는 유니티 클라이언트의 플러그인을 제작하거나 직접 수정하는 모딩.
2. **서드파티 어플리케이션 모딩**: 웹사이트 또는 어플리케이션 제작을 하는 모딩.

외로도 `CLI`도구나 `API` 서비스를 만들 수도 있지만 2번 항목에서 지원하는 도구와 각종 라이브러리들로 제작하실 수 있을겁니다.

## 튜토리얼

먼저 각 분야별로 자세한 튜토리얼을 제공하고 있으니 튜토리얼을 진행하고 싶으신 분은 아래의 링크를 참고하세요.

- 서명이 필요 없는 모딩을 하고 싶다면 [아바타 정보 페이지 제작 가이드](../../tutorials/modding/avatar-information-dapp-guide)를 참고하세요.
- 서명이 필요한 모딩을 하고 싶다면 [Daily Reward 페이지 제작 가이드](../../tutorials/modding/daily-reward-dapp)를 참고하세요.
- 클라이언트 모딩을 하고 싶다면 [BepInEx 가이드](../../tutorials/modding/bepinex-guide)를 참고하세요.

::: tip
서명은 유저의 허락을 받아 실행해야하는 Transaction을 만들기 위한 행위입니다.  
모드를 사용하는 유저가 Market에서 아이템을 구매하거나 모험을 돌기 위해선 서명이 필요합니다.
:::

## 서드파티 어플리케이션 모딩
웹사이트를 제작하거나 모바일 어플리케이션을 만드는 것도 저희는 모딩으로 보고 있습니다.  

쉽게 모딩을 할 수 있도록 [Mimir](https://github.com/planetarium/mimir)와 [Chrono](https://github.com/planetarium/chrono)를 개발해두었으며 각종 TypeScript 라이브러리를 사용해 웹사이트를 제작하실 수 있습니다.  

- Mimir는 GraphQL을 통해 실시간 게임 데이터를 조회할 수 있습니다. 아레나 랭킹을 조회하거나 아바타 정보를 받아보세요. [해당 가이드를 참고해주세요](../general/get-state/get-state-with-mimir-graphql.md)
- Chrono는 Chrome의 확장 프로그램입니다. [Metamask](https://metamask.io/)와 비슷하게 나인 크로니클 지갑 기능을 제공합니다. [해당 가이드를 참고해주세요](../general/how-to-use-chrono.md)

이렇게 Mimir를 통해 데이터를 읽어오고 Chrono를 통해 Transaction을 네트워크에 전송하는 방식으로 모딩이 가능합니다.  
Mimir는 GraphQL 서비스이기 때문에 비단 웹사이트 뿐만 아니라 CLI 도구나 분석 서비스에서도 사용할 수 있을겁니다.  

- 서명이 필요 없는 모딩을 하고 싶다면 [아바타 정보 페이지 제작 튜토리얼](../../tutorials/modding/avatar-information-dapp-guide)을 참고하세요.
- 서명이 필요한 모딩을 하고 싶다면 [Daily Reward 페이지 제작 튜토리얼](../../tutorials/modding/daily-reward-dapp)을 참고하세요.

또한, 여러 TypeScript 라이브러리들이 있습니다. [해당 가이드를 참고해주세요](./ts-libs)

## 클라이언트 모딩
클라이언트 모딩도 크게 2가지로 분류할 수 있습니다.

1. [나인 크로니클](https://github.com/planetarium/NineChronicles) 저장소의 클라이언트 소스코드를 받아 수정하는 모딩
2. 클라이언트를 직접 수정하진 않고 플러그인 형태로 동작하는 모딩

**저희는 1번 방법보단 2번 방법을 통한 모딩을 추천드리고 있습니다.** 게임 클라이언트 코드는 주기적으로 변경되며 계속해서 수정사항들을 업데이트 하는 일은 어렵습니다.

아직 1번 방법에 대한 가이드는 준비하지 못했으나 2번 방법에 대해서는 **[BepInEx](https://github.com/BepInEx/BepInEx)를 사용하는 것을 추천**드립니다. `BepInEx`는 클라이언트에 직접적인 수정 없이 플러그인 형태로 모딩을 할 수 있으며 다운받는 유저도 새로운 클라이언트가 아닌 플러그인을 다운받아 모드를 사용할 수 있습니다.  

두가지 방법 모두 게임 클라이언트 안에서 사용되는 [necoyume.dll](https://github.com/planetarium/NineChronicles/tree/development/nekoyume)을 중심으로 사용하게 됩니다. 따라서 `necoyume` 모듈에 존재하는 API들을 잘 알아야 합니다.  
죄송스럽게도 아직 해당 부분에 대해서는 가이드가 준비되어있지 않습니다.:sob: 대신 저희가 직접 만든 모드들이 모여있는 [Mods](https://github.com/planetarium/NineChronicles.Mods) 저장소에서 활용 방법을 확인해주세요. 좀 더 많은 활용 방법은 나인 크로니클 저장소를 직접 확인해야합니다.

BepInEx는 간단하게 necoyume 모듈의 알림창을 호출하고 설치까지하는 가이드를 준비해두었습니다. [BepInEx 튜토리얼](../../tutorials/modding/bepinex-guide)를 확인해주세요.

## awesome-9c
[awesome-9c](https://github.com/planetarium/awesome-9c)는 유저들이 만든 모드나 서비스를 모아두는 저장소입니다. 모드를 만드셨다면 PR을 올려 자신의 모드를 직접 추가해보세요!

::: info
다음 문서는 시스템 가이드 입니다. 튜토리얼을 원하시는 분들은 해당 문서의 튜토리얼 링크를 참고해주세요.  
이후로는 모딩할 때 참고할 수 있는 기본적인 가이드들이 있습니다.
:::
