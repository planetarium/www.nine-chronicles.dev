# 트랜젝션 발행하기: `크로노`

나인크로니클 블록체인 네트워크에 트랜젝션을 발행하는 여러 방법 중에서 `크로노`를 사용하는 방법을 알아 보겠습니다. `크로노`는 `메타마스크`와 비슷한 기능을 제공하는 크롬 브라우저의 확장입니다. 사용자는 `크로노`에 개인 키를 등록하고 원하는 네트워크를 설정할 수 있고, 웹앱으로부터 요청 받은 트랜젝션을 크로노로 서명하고 전파할 수 있습니다.

## 설치

### 1. 크롬 웹 스토어

크롬 웹 스토어의 [Chrono  페이지](https://chromewebstore.google.com/detail/chrono-development-build/gcloogpfjklfhgfddenekamfjgbcklic)에서 간단히 설치할 수 있습니다.

### 2. 직접 설치

크롬 웹 스토어 정책에 따라서 최신 버전의 `크로노`를 크롬 웹 스토어에서 설치할 수 없는 경우가 있습니다. 이럴 때에 필요한 직접 설치 방법을 알아보겠습니다.

#### 2.1 빌드 파일 확보

`크로노`를 직접 설치하기 위해서는 빌드 파일이 필요합니다. 아래의 두 방법 중에서 선택해서 빌드 파일을 확보합니다.

::: details 저장소 배포 버전을 내려받기
1. `크로노`의 [GitHub 저장소](https://github.com/planetarium/chrono)에서 배포하는 [최신 버전](https://github.com/planetarium/chrono/releases)을 내려받습니다.
    ```shell
    curl -L -o chrono_v1.0.5.zip https://github.com/planetarium/chrono/releases/download/v1.0.5/chrono-extension.zip
    ```
2. 내려받은 압축파일을 해제합니다.
3. 이제 [다음 단계](#load-unpacked-in-chrome-extensions)로 넘어갑니다.
:::

::: details `크로노` 저장소를 복제하고, 프로젝트를 빌드하기
1. `크로노`의 [GitHub 저장소](https://github.com/planetarium/chrono)를 복제합니다.

    ::: code-group
    ```shell [git]
    git clone --recursive https://github.com/planetarium/chrono.git
    ```

    ```shell [gh(GitHub)]
    gh repo clone planetarium/chrono
    ```
    :::

    ::: info :bulb:
    본 문서에서는 `v1.0.5` 태그를 기준으로 진행했습니다.
    ```shell
    git checkout v1.0.5
    ```
    :::

2. 복제한 저장소 루트에서 `크로노`를 빌드합니다.

    > `크로노` 프로젝트는 `pnpm`을 사용해서 패키지를 관리하고 있습니다. `pnpm`을 설치하지 않았다면, [이곳](https://pnpm.io/installation)을 참고하여 설치합니다.

    ```shell
    cd chrono
    ```
    ```shell
    pnpm install
    ```
    ```shell
    pnpm run build
    ```

3. 빌드가 완료되면, `/build` 디렉터리가 생성됩니다. 이제 [다음 단계](#load-unpacked-in-chrome-extensions)로 넘어갑니다.
:::

#### 2.2. 크롬 확장에서 Unpacked 불러오기 {#load-unpacked-in-chrome-extensions}

1. 크롬 브라우저를 실행하고, 주소란에 `chrome://extensions`를 입력합니다.
2. 화면 우상단의 `Developer Mode`를 활성화합니다.
![Enable Developer Mode](/images/en/guide/issue-transaction/issue-transaction-with-chrono/enable-developer-mode.png){width=240}
3. 화면 좌상단의 `Load unpacked` 버튼을 클릭하고 압축 해제한 디렉터리나 직접 빌드한 `/build` 디렉터리를 선택합니다.
![Load unpacked button in Chrome extensions](/images/en/guide/issue-transaction/issue-transaction-with-chrono/load-unpacked-01.png){width=360}
![Select "build" directory](/images/en/guide/issue-transaction/issue-transaction-with-chrono/select-build-directory.png){width=480}
4. `크로노`가 설치됐습니다.
!["Chrono" in Chrome extensions](/images/en/guide/issue-transaction/issue-transaction-with-chrono/chrome-extensions-chrono.png){width=360}

## `크로노` 첫 실행과 개인 키 등록하기

우선 사용 편의를 위해서 `크로노`를 고정하겠습니다.
![Pinning "Chrono" in Chrome extensions](/images/en/guide/issue-transaction/issue-transaction-with-chrono/pinning-chrono.png){width=360}

### 1. 첫 실행

`크로노`를 처음 실행하면 `크로노` 실행을 위한 비밀번호를 설정하게 됩니다. 비밀번호는 최소 8자 이상이어야 하며 보안에 주의해주세요.
![Set password of "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/set-password.png){width=360}

`크로노`는 첫 실행시 계정을 생성하거나 등록하게 됩니다. 기존의 개인 키를 가지고 있다면, `Recover`를 클릭하고 개인 키의 Seed Phrase를 입력하여 계정을 등록합니다. 새로운 계정을 생성하려면, `New`를 클릭하고 자동 생성된 Seed Phrase로 계정을 등록합니다.

::: danger :rotating_light:
비밀번호와 Seed Phrase는 절대 타인과 공유하지 마세요. 이를 통해 계정에 접근할 수 있습니다.
:::

![Create first account of "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/first-account.png){width=360}

> `크로노`는 위의 첫 실행 과정에서 이미 갖고 있는 개인 키의 평문으로 첫 계정을 설정하는 기능을 아직은 제공하고 있지 않습니다. 그런 경우에는 `New`를 클릭해서 진행한 후에 [아래](#register-private-key)에서 개인 키를 등록해줍니다.

### 2. 개인 키 등록하기 {#register-private-key}

우리는 [앞에서](../create-network/create-a-private-key) 개인 키를 생성해봤습니다. 이제 이 개인 키를 `크로노`에 추가해보겠습니다.

::: danger :rotating_light:
여기서는 예를 들기 위해서 개인 키를 노출합니다만, 이외의 목적으로 사용하는 개인 키는 절대로 노출해서는 안 됩니다.
:::

우선 `크로노`를 열고, 좌상단의 `Account 1` 버튼을 선택하고, `Import` 버튼을 선택합니다.
![Select "Account 1" and "Import" button of "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/account-import.png){width=360}

계정 이름을 `My private key`로 설정하고, 개인 키 평문을 입력하고 `Import` 버튼을 클릭합니다.
![Import "My private key" to "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/import-my-private-key.png){width=360}

조금 기다리면, `My private key`가 성공적으로 추가됩니다.
!["My private key" on "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/my-private-key.png){width=360}

## `크로노`에 네트워크 추가하기

이제 `크로노`가 통신할 나인크로니클 블록체인 네트워크를 등록해보겠습니다. `크로노`를 열고, 좌상단의 `odin` 버튼을 선택하고, `Add New` 버튼을 선택합니다.
![Add network to "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/add-network.png){width=360}

아래 이미지와 같이 네트워크 정보를 입력하는 UI가 나타납니다. 여기서 네트워크 정보를 입력하고 `Import` 버튼을 클릭합니다.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/import-network-empty.png){width=360}

### 로컬 노드를 네트워크로 추가하기

우리는 [이 글](../create-network/running-a-blockchain-node-with-dotnet-project)에서 로컬 네트워크를 만들고 실행하는 방법을 알아봤는데요. 이 네트워크 정보를 `크로노`에 추가해보겠습니다.

1. [이 글](../create-network/running-a-blockchain-node-with-dotnet-project)을 참고해서 로컬 노드를 실행합니다. 아래는 예시입니다.
    ```shell
    dotnet run --config=./appsettings.local.json --arena-participants-sync=false
    ```
2. [이 글](../get-state/get-state-with-headless-graphql)을 참고해서 GraphQL Playground에 접속합니다. 아래는 예시입니다.
    http://127.0.0.1:31280/ui/playground
3. GraphQL Playground에서 다음 정보를 입력해 제네시스 블록의 해시를 조회해보겠습니다.
    ::: code-group
    ```graphql [Query]
    query {
      nodeStatus {
        genesis {
          hash
        }
      }
    }
    ```
    ```json [Result]
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
    :::
    제가 실행한 로컬 네트워크의 제네시스 블록 해시는 `37fb1963ababf73045aa036b347971089337945c94bc4e92a694c435b80a1f17` 입니다.

이렇게 조합한 로컬 네트워크의 설정은 아래와 같습니다.
```
- Planet ID: 0x999999999999
- 네트워크 이름: My local
- Genesis Hash: 37fb1963ababf73045aa036b347971089337945c94bc4e92a694c435b80a1f17
- GraphQL endpoint: http://127.0.0.1:31280/graphql
- Explore endpoint:
- Is Mainnet: false
```

이제 위 정보를 `크로노`의 UI에 입력하고 `Import` 버튼을 클릭합니다.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/import-my-local-network.png){width=360}

잠시 기다리면, `My local` 네트워크가 성공적으로 추가됩니다.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/my-local-network.png){width=360}

> 위의 이미지를 다시 보면, `크로노`에서 선택되어 있는 계정에 3,920 NCG가 있는 것을 확인할 수 있습니다. 로컬 노드를 실행할 때 사용한 개인 키에 블록 채굴 보상이 꾸준히 쌓였는데, 이 개인 키와 같은 계정을 `크로노`에서 선택했기 때문에 NCG 잔액이 이렇게 표시되는 것입니다.

## `크로노` 예제 프로젝트로 트랜젝션 발행해보기

아래는 크로노를 테스트해볼 수 있는 간단한 예제 사이트입니다. 이 사이트에서 로컬 노드에 아바타를 생성하는 트랜젝션을 발행해보고, 그 결과도 조회해보겠습니다.

- https://daily-reward-example.nine-chronicles.dev/

위에서 크로노를 잘 설치했다면 아래와 같은 첫 화면을 볼 수 있습니다. `Connect` 버튼을 클릭합니다.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/image.png){width=480}

`크로노`가 실행되면서 암호 입력을 요구합니다.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/image-1.png){width=240}

암호를 입력하고 `Unlock` 버튼을 클릭합니다.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/image-2.png){width=240}

연결할 계정을 선택하고 `Approve` 버튼을 클릭합니다. 이 예제에서는 첫 계정인 `Account 1`이 아니라 개인 키 평문을 입력해서 추가한 `My private key` 계정으로 연결합니다.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/image-3.png){width=360}

잠시 기다리니 계정 연결에 성공했습니다. 이 계정에는 아직 아바타가 없어서 `Create Avatar 0` 버튼이 활성화되어 있습니다. 이 버튼을 클릭합니다.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/image-4.png){width=480}

`크로노`에서 아바타 생성 트랜젝션의 내용을 상세히 보여주는데요. 이제 `Approve` 버튼을 클릭하면 해당 트랜젝션에 서명하고 이를 연결된 네트워크로 전파합니다.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/image-5.png){width=360}

잠시 기다리면 `Avatar0`라는 이름의 아바타가 만들어진 것을 볼 수 있습니다. `(120/120)`은 게임 내에서 사용하는 `ActionPoint` 상태를 나타내는 것입니다.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/image-6.png "Title"){width=480}

### 상태 조회

마지막으로 로컬 노드의 GraphQL Playground에서 새로 추가한 아바타 정보를 조회해보겠습니다.

::: code-group
```graphql [Query]
query {
  stateQuery {
     agent(address: "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159") {
      avatarStates {
        address
        name
      }
    }
  }
}
```
```json [Result]
{
  "data": {
    "stateQuery": {
      "agent": {
        "avatarStates": [
          {
            "address": "0xD73e10DBE0184bE3284E0e5ca6A2A12ae80ca524",
            "name": "Avatar0"
          }
        ]
      }
    }
  },
  "extensions": {}
}
```
:::

이렇게 새로 생성한 아바타의 상태를 확인할 수 있습니다. 위의 GraphQL 쿼리를 통해 아바타의 주소와 이름을 조회할 수 있으며, 이를 통해 아바타가 성공적으로 생성되었음을 확인할 수 있습니다.

::: tip :tada:
수고하셨습니다! 이제 여러분은 `크로노`를 사용해서 계정과 네트워크를 설정할 수 있고, `크로노`를 사용하는 웹앱을 통해 트랜젝션을 발행하는 방법을 배웠습니다. 앞으로 다양하고 재밌는 웹앱을 만들어보세요!
:::
