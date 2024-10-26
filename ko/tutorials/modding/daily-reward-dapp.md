# 데일리 리워드 페이지 제작 튜토리얼 
::: danger :rotating_light:
해당 예제는 서명이 필요하기 때문에 한번이라도 Daily reward(action point refill)을 했던 아바타를 가지고 있는 나인 크로니클 계정이 있어야 진행이 가능합니다.
:::

나인크로니클의 서명 도구인 [Chrono](../../general/chrono/how-to-use-chrono)를 활용해 Daily reward를 받는 웹사이트를 제작하는 튜토리얼입니다.

본격적으로 시작하기 전에 [Chrono](../../general/chrono/how-to-use-chrono) 문서를 확인한 후 설치 및 플레이 가능한 아바타가 존재하는 private key를 import 해주세요.


# 프로젝트 세팅
프로젝트는 빠르게 프론트를 만들어볼 수 있는 [React](https://react.dev/)와 [TypeScript](https://www.typescriptlang.org/)를 사용합니다.

```sh
npx create-react-app some-app-name --template @planetarium/9c-chrono
```
먼저 [Create React APP](https://create-react-app.dev/)을 통해 기본적인 프로젝트 설정들을 받아온 후 실행해봅니다.

```sh
cd some-app-name
npm run codegen
npm run start
```

실행이 정상적으로 되었다면 준비는 끝입니다!

## Daily reward 받아보기
먼저 사이트와 지갑을 연결합니다.
![alt text](/images/modding/guide/daily-reward-dapp/connect-chrono.png)

이후 플레이가 가능한 주소를 조회해 아바타가 표시되면 완료입니다.
ReFill 버튼을 눌러 서명을 하고 실제로 Daily Reward를 받아볼 수 있습니다.
![alt text](/images/modding/guide/daily-reward-dapp/refill-buttons.png)

## 주요 코드 설명
create-react-app을 통해 템플릿을 다운받았기 때문에 Chrono를 사용하기 위한 대부분의 세팅이 되어있는 상태입니다.

### SDK 불러오기
```ts
// App.tsx
const chronoWallet = getChronoSdk();
```
이렇게 `getChronoSdk`를 통해 chrono와 통신할 수 있는 sdk를 불러올 수 있습니다.

### 각종 지갑 정보들 불러오기
```ts
// App.tsx
const {
  data: accountsData,
  isLoading: accountsLoading,
  isSuccess: accountsSuccess,
  error: accountsError,
} = useAccounts();
const { connectAsync, isPending } = useConnect();
const {
  data: networksData,
  isLoading: networksLoading,
  isSuccess: networksSuccess,
} = useNetwork();
```
각종 React Hooks를 사용해 account 정보를 받아오거나 지갑에서 연결되어있는 네트워크의 정보를 받아올 수 있습니다.

### 서명 진행하기
```ts
// RefillButton.tsx
import { DailyReward } from "@planetarium/lib9c";

function createDailyRewardAction(avatarAddress: Address): DailyReward {
  return new DailyReward({
    avatarAddress,
  });
}

...

const [stage] = useStageTransactionMutation();
const action = useMemo(() => {
  return createDailyRewardAction(avatarAddress);
}, [avatarAddress]);

...

chronoWallet
  .sign(signer, action)
  .then((tx) => {
    setProgress("Staging");
    return stage({
      variables: { tx: tx.toString("hex") },
    }).then(({ data, errors }) => {
      setProgress("Done");
      setTxId(data?.stageTransaction || null);
    });
  })
  .catch((e: unknown) => {
    setProgress("None");
  });
```
서명은 다음과 같은 순서로 진행할 수 있습니다.
1. lib9c 라이브러리를 사용해 전송할 action 내용을 생성합니다.
2. chrono를 통해 action을 transaction에 감싸 서명을 진행합니다.
3. 서명이 완료된 transaction을 headless api를 통해 전송합니다.
4. 네트워크(블록체인)이 해당 transaction을 검토하고 블록에 추가하면서 실제로 action의 요청사항이 반영됩니다.

## 마무리
Chrono를 사용해 서명이 가능하기 떄문에 송금, 아레나 전투 등 수많은 기능을 지원하는 웹사이트를 만들어볼 수 있습니다. Chrono를 활용하여 여러분만의 어플을 만들어보세요!


::: info
제작된 예제는 [9c-examples](https://github.com/planetarium/9c-examples/tree/main/daily-reward) 레포에 있으니 참고 바랍니다.
:::
