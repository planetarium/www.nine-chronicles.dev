# TypeScript 라이브러리
원활한 모딩을 위해 모딩에 필요한 TypeScript 라이브러리를 제작해두었습니다.

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
