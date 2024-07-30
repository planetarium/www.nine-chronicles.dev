# 트랜젝션 발행하기: `크로노`

나인크로니클 블록체인 네트워크에 트랜젝션을 발행하는 여러 방법 중에서 `크로노`를 사용하는 방법을 알아 보겠습니다. `크로노`는 `메타마스크`와 비슷한 기능을 제공하는 크롬 브라우저의 확장입니다. 사용자는 `크로노`에 개인 키를 등록하거나 네트워크를 설정할 수 있고, 웹앱으로부터 요청 받은 트랜젝션을 크로노로 서명하고 전파할 수 있습니다.

아래에서 크로노의 오픈소스 저장소를 복제해서 직접 크로노를 빌드해보고 크롬 브라우저 확장으로 등록해보겠습니다.

## `크로노` 저장소 복제

먼저, `크로노`의 [GitHub 저장소](https://github.com/planetarium/chrono)를 복제합니다.

### cli

::: code-group
```shell [git]
git clone --recursive https://github.com/planetarium/chrono.git
```

```shell [gh(GitHub)]
gh repo clone planetarium/chrono
```
:::

::: info :bulb:
본 문서에서는 `1.0.5` 태그를 기준으로 진행했습니다.
```shell
git checkout 1.0.5
```
:::

## `크로노` 빌드하기

복제한 저장소 루트에서 `크로노`를 빌드합니다. `크로노` 프로젝트는 `pnpm`을 사용해서 패키지를 관리하고 있습니다. `pnpm`을 설치하지 않았다면, 아래 링크를 참고하여 설치합니다.

- https://pnpm.io/installation

```shell
cd chrono
pnpm install
pnpm run build
```

## `크로노` 설치하기(크롬 확장)

- 크롬 브라우저를 실행하고, 주소란에 `chrome://extensions`를 입력합니다.
- 화면 우상단의 `Developer Mode`를 활성화합니다.
![Enable Developer Mode](/chrome-extensions-enable-developer-mode.png)
- 화면 좌상단의 `Load unpacked` 버튼을 클릭하고 `/build` 디렉터리를 선택합니다.
![Load unpacked button in Chrome extensions](/chrome-extensions-load-unpacked-01.png)
![Select "build" directory](/chrome-extensions-select-build-directory.png)
- `크로노`가 설치됐습니다.
!["Chrono" in Chrome extensions](/chrome-extensions-chrono.png)

## `크로노` 실행과 개인 키 등록하기

- 편의를 위해서 `크로노`를 고정하겠습니다.
![Pinning "Chrono" in Chrome extensions](/chrome-extensions-pinning-chrono.png)

- `크로노`를 처음 실행하고, 비밀번호를 설정합니다.
![Set password of "Chrono"](/chrome-extensions-chrono-set-password.png)

- `크로노`는 첫 실행시 계정을 생성하거나 등록하게 됩니다. 기존의 개인 키를 가지고 있다면, `Recover`를 선택하고 개인 키의 Seed Phrase를 입력하여 계정을 등록합니다. 새로운 계정을 생성하려면, `New`를 선택하고 자동 생성된 Seed Phrase로 계정을 등록합니다.
![Create first account of "Chrono"](/chrome-extensions-chrono-first-account.png)

### 개인 키 추가 등록하기

우리는 [앞에서](../create-network/create-a-private-key) 개인 키를 생성해봤습니다. 이제 이 개인 키를 `크로노`에 추가해보겠습니다.

::: danger :rotating_light:
여기서는 예를 들기 위해서 개인 키를 노출합니다만, 이외의 목적으로 사용하는 개인 키는 절대로 노출해서는 안 됩니다.
:::

- `크로노`를 열고, 좌상단의 `Account 1` 버튼을 선택하고, `Import` 버튼을 선택합니다.
![Select "Account 1" and "Import" button of "Chrono"](/chrome-extensions-chrono-account-import.png)

- 계정 이름을 `My private key`로 설정하고, 개인 키 평문을 입력하고 `Import` 버튼을 클릭합니다.
![Import "My private key" to "Chrono"](/chrome-extensions-chrono-import-my-private-key.png)

- 조금 기다리면, `My private key`가 성공적으로 추가됩니다.
!["My private key" on "Chrono"](/chrome-extensions-chrono-my-private-key.png)

## `크로노`에 네트워크 추가하기

이제 `크로노`가 통신할 나인크로니클 블록체인 네트워크를 등록해보겠습니다.

- `크로노`를 열고, 좌상단의 `odin` 버튼을 선택하고, `Add New` 버튼을 선택합니다.
![Add network to "Chrono"](/chrome-extensions-chrono-add-network.png)

- 아래 이미지와 같이 네트워크 정보를 입력하는 UI가 나타납니다. 여기서 네트워크 정보를 입력하고 `Import` 버튼을 클릭합니다.
![alt text](/chrome-extensions-chrono-import-network-empty.png)

### 로컬 노드를 네트워크로 추가하기

우리는 [이 글](../create-network/running-a-blockchain-node-with-dotnet-project)에서 로컬 네트워크를 만들고 실행하는 방법을 알아봤는데요. 이 네트워크 정보를 `크로노`에 추가해보겠습니다.

- [이 글](../create-network/running-a-blockchain-node-with-dotnet-project)을 참고해서 로컬 노드를 실행합니다.
- 그리고 [이 글](../get-state/get-state-with-headless-graphql)을 참고해서 GraphQL Playground에 접속합니다.
- GraphQL Playground에서 다음 정보를 입력해 제네시스 블록의 해시를 조회해보겠습니다.
```graphql
query {
  nodeStatus {
    genesis {
      hash
    }
  }
}
```
```json
{
  "data": {
    "nodeStatus": {
      "genesis": {
        "hash": "37fb1963ababf73045aa036b347971089337945c94bc4e92a694c435b80a1f17"
      }
    }
  }
}
```

- 이렇게 조합한 로컬 네트워크의 설정은 아래와 같습니다.
```
- Planet ID: 0x999999999999
- 네트워크 이름: My local
- Genesis Hash: 37fb1963ababf73045aa036b347971089337945c94bc4e92a694c435b80a1f17
- GraphQL endpoint: http://127.0.0.1:31280/graphql
- Explore endpoint:
- Is Mainnet: false
```

- 이제 위 정보를 입력하고 `Import` 버튼을 클릭합니다.
![alt text](/chrome-extensions-chrono-import-my-local-network.png)

- 잠시 기다리면, `My local` 네트워크가 성공적으로 추가됩니다. 자세히 보시면 로컬 노드에서 블록을 채굴한 보상이 3,920 NCG나 쌓여 있는 것을 확인할 수 있습니다.
![alt text](/chrome-extensions-chrono-my-local-network.png)

## `크로노` 예제 프로젝트로 트랜젝션 발행해보기

- `/examples/daily-reward-dapp` 디렉토리로 이동합니다.
```shell
cd examples/daily-reward-dapp
```
