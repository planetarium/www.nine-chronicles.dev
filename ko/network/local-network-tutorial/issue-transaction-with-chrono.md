# 트랜젝션 발행하기: `크로노`

나인크로니클 블록체인 네트워크에 트랜젝션을 발행하는 여러 방법 중에서 `크로노`를 사용해 트랜잭션을 발행하는 방법을 알아 보겠습니다. `크로노`는 `메타마스크`와 비슷한 기능을 제공하는 크롬 브라우저의 확장입니다. 사용자는 `크로노`에 개인 키를 등록하고 원하는 네트워크를 설정할 수 있고, 웹앱으로부터 요청 받은 트랜젝션을 크로노로 서명하고 전파할 수 있습니다.

## 크로노 설치
[해당 가이드](../../general/chrono/how-to-use-chrono)를 참고해 크로노를 설치합니다.

### 로컬 노드를 네트워크로 추가하기

1. 먼저 로컬 노드를 다시 실행해주세요.
    ```sh
    9crun run --version=v200220 --planet=Single
    ```
2. [GraphQL Playground](http://127.0.0.1:31280/ui/playground)에서 다음 정보를 입력해 제네시스 블록의 해시를 조회해보겠습니다.
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

Planet ID는 식별자이며 자리수만 동일하다면 다른 값으로 넣어주어도 무방합니다.

### `크로노`에 네트워크 추가하기

이제 `크로노`에 가동했던 로컬 네트워크를 등록해보겠습니다. `크로노`를 열고, 좌상단의 `odin` 버튼을 선택하고, `Add New` 버튼을 선택합니다.
![Add network to "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/add-network.png){width=360}

아래 이미지와 같이 네트워크 정보를 입력하는 UI가 나타납니다. 여기서 네트워크 정보를 입력하고 `Import` 버튼을 클릭합니다.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/import-network-empty.png){width=360}

잠시 기다리면, `My local` 네트워크가 성공적으로 추가됩니다.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/my-local-network.png){width=360}

이후 [해당 가이드](../../general/chrono/how-to-use-chrono#register-private-key)를 참고해 생성했던 private key를 import 해옵니다.

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

마지막으로 로컬 노드의 [GraphQL Playground](http://127.0.0.1:31280/ui/playground)에서 새로 추가한 아바타 정보를 조회해보겠습니다.

::: code-group
```graphql [Query]
query {
  stateQuery {
     agent(address: "{your address}") {
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
수고하셨습니다! 이제 여러분은 `크로노`를 사용해서 계정과 네트워크를 설정할 수 있고, `크로노`를 사용하는 웹앱을 통해 트랜젝션을 발행하는 방법을 배웠습니다.  
DevForum에 있는 문서들을 참고하여 모딩, 네트워크 참여, 오픈소스 기여 등 다양한 활동을 시작해보세요!
:::
