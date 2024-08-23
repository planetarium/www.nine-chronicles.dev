# 시작하기

본 개발자 포탈은 Nine Chronicles 관련 개발자들을 위한 공간입니다. 모드 개발자는 물론이고, 3rd-party 앱 개발자 그리고 NCIP 를 작성하고 직접 Nine Chronicles에 직접 기여하고자 하는 사람들을 모두 포함합니다.

이미 Planetarium 공동체 내의 여러 팀에서 개발한 라이브러리들이 있습니다. 하지만 그 라이브러리들을 유기적으로 연결하여 어떤 앱을 만드는 등의 예제가 없어 3rd-party 앱을 만들고자 할 때 막막한 경우가 있습니다. 그런 문제를 해결하기 위해 관련 예제를 만들어 제공할 것입니다.

1. **클라이언트 수정 모딩**: 실제 게임이 가동되는 클라이언트를 수정하는 방법.
2. **서드파티 어플리케이션 모딩**: 웹사이트 또는 어플리케이션 제작을 통해 나인크로니클의 정보를 제공하는 방법.

각 분야별로 자세한 가이드를 제공하고 있으니 아래의 링크를 참고하세요.

- 클라이언트 모딩을 하고 싶다면 [Bepenix 가이드](./guide/bepinex-guide.md)를 참고하세요.
- 서명이 필요 없는 모딩을 하고 싶다면 [아바타 정보 페이지 제작 가이드](./guide/avatar-information-dapp-guide.md)를 참고하세요.
- 서명이 필요한 모딩을 하고 싶다면 [Daily Reward 페이지 제작 가이드](./guide/daily-reward-dapp.md)를 참고하세요.

## 관련 라이브러리

### JavaScript/TypeScript

<br/>

#### `@planetarium/account`

https://www.npmjs.com/package/@planetarium/account

트랜잭션을 서명하기 위한 구현체 및 인터페이스를 제공합니다. 기본으로 제공하는 `RawPrivateKey` 구현체를 활용하여 키를 서명하거나 키를 생성할 수 있습니다.

#### `@planetarium/tx`

https://www.npmjs.com/package/@planetarium/tx

트랜잭션을 쉽게 만들기 위한 라이브러리 입니다.

#### `@planetarium/lib9c`

https://lib9c.nine-chronicles.dev/

Nine Chronicles 네트워크의 액션을 쉽게 만들기 위한 라이브러리 입니다.

#### `@planetarium/account-aws-kms`

https://www.npmjs.com/package/@planetarium/account-aws-kms

앞서 말한 `@planetarium/account`에서 제공하는 `Account` 인터페이스의 AWS KMS 구현체 입니다. AWS KMS를 활용하여 서명하고 싶다면 이 라이브러리를 활용해보세요.

## 디스코드

[![Planetarium Dev][planetarium-dev-badge]][planetarium-dev-invite-link]

Nine Chronicles 개발과 관련된 이야기를 *Planetarium Dev* 라는 디스코드 서버에서 진행하고 있습니다. 관심 혹은 질문이 있다면 언제든 들어와 `@9c-dx` 를 멘션해주세요!

[planetarium-dev-badge]: https://img.shields.io/discord/928926944937013338?color=6278DA&label=Planetarium-dev&logo=discord&logoColor=white
[planetarium-dev-invite-link]: https://discord.com/invite/RYJDyFRYY7
