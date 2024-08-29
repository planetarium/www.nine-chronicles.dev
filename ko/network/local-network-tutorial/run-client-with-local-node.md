# 로컬 노드로 나인크로니클 플레이하기

::: info
이 튜토리얼을 진행하기 위해서는 나인크로니클 클라이언트가 필요합니다. [나인크로니클 공식 웹사이트](https://nine-chronicles.com)에서 다운로드하여 설치 및 실행 준비를 완료해주세요.
:::

## 1. 클라이언트 설정 변경하기

나인크로니클 런처를 통해 클라이언트를 업데이트했다면, 아래 경로에 클라이언트 파일이 위치해 있습니다.

- **Windows**: `%appdata%\Nine Chronicles\player\main`
- **MacOS**: `~/Library/Application Support/Nine Chronicles/player/main/`

이제, 클라이언트가 로컬 네트워크에 접속할 수 있도록 설정을 변경해야 합니다. 아래 경로에 있는 `clo.json` 파일을 수정하거나 생성합니다.

- **Windows**: `%appdata%\Nine Chronicles\player\main\NineChronicles_Data\StreamingAssets\clo.json`
- **MacOS**: `~/Library/Application Support/Nine Chronicles/player/main/NineChronicles.app/Contents/Resources/Data/StreamingAssets/clo.json`

`GenesisBlockPath`는 절대 경로로 설정해야 하며, 각 운영체제에 맞게 사용자 이름을 수정하여 넣어주세요.

::: code-group
```json [clo.json (MacOS)]
{
    "RpcClient": true,
    "RpcServerHost": "127.0.0.1",
    "RpcServerPort": 31238,
    "SelectedPlanetId": "0x999999999999",
    "AppProtocolVersion": "1/b4179Ad0d7565A6EcFA70d2a0f727461039e0159/MEUCIQDvIIp8IKCpjKojE8LzgYZzeRg9fUPl.sWHrowzHhmrxgIgBhTkSRc8BHXZwwIAwBQN8J3wGlAbOD7FRyp8bA6OH6Y=",
    "GenesisBlockPath": "/Users/{username}/.planetarium/headless/genesis-block/genesis-block-for-single"
}
```

```json [clo.json (Windows)]
{
    "RpcClient": true,
    "RpcServerHost": "127.0.0.1",
    "RpcServerPort": 31238,
    "SelectedPlanetId": "0x999999999999",
    "AppProtocolVersion": "1/b4179Ad0d7565A6EcFA70d2a0f727461039e0159/MEUCIQDvIIp8IKCpjKojE8LzgYZzeRg9fUPl.sWHrowzHhmrxgIgBhTkSRc8BHXZwwIAwBQN8J3wGlAbOD7FRyp8bA6OH6Y=",
    "GenesisBlockPath": "C:\\Users\\{username}\\.planetarium\\headless\\genesis-block\\genesis-block-for-single"
}
```
:::

## 2. 로컬 노드 실행 및 접속

이제 이전에 했던 것처럼 로컬 노드를 다시 실행합니다:

```sh
9crun run --version=v200220 --planet=Single
```

노드가 정상적으로 실행되면, 런처를 통해 게임을 실행하지 말고 클라이언트를 직접 실행하여 게임에 접속합니다. 이때, 게임 플레이는 앞서 만든 private key로만 가능하므로, 다른 계정으로 플레이한 적이 있다면 새로 계정을 만들어서 접속해야 합니다.

![게임 로그인 화면 1](/images/network/login1.png)
이미 나인크로니클을 플레이한 적이 있다면 위와 같은 화면이 표시될 것입니다. `FORGOT PASSWORD?`를 눌러 넘어갑니다.

![게임 로그인 화면 2](/images/network/login2.png)
![게임 플레이 화면](/images/network/game.jpeg)

새로 생성된 계정으로 접속하면 게임을 진행할 수 있습니다. 이때, 나인크로니클의 외부 서비스(예: Market Service, DataProvider 등)를 제거하고 실행했기 때문에, 마켓이나 랭킹 정보는 조회할 수 없습니다.

::: tip :tada:
축하합니다! 로컬 네트워크에서 게임을 실행해보았습니다. DevForum에 있는 문서들을 참고하여 모딩, 네트워크 참여, 오픈소스 기여 등 다양한 활동을 시작해보세요!
:::
