# NCG 송금 페이지 만들기

본 문서에서는 input을 통해 송금 대상과 수량을 받고 chrono를 통해 서명하여 NCG를 전송하는 웹 어플리케이션을 작성해봅니다.

## 1. 저장소 클론

`create-vite` 를 통해 vite 번들러를 사용하는 react 프로젝트를 생성하고 `@planetarium/lib9c`, `@planetarium/account`, `@planetarium/tx`, `@planetarium/chrono-sdk` 같은 의존성들을 설치해야 합니다.

이를 위해 템플릿 저장소를 만들어 놓았습니다. GitHub의 `Use this template` 으로 저장소를 생성하신 후 클론하셔도 되고 직접 클론하여 로컬에서만 작업하셔도 괜찮습니다. https://github.com/planetarium/chrono-webapp-template

```
gh repo clone planetarium/chrono-webapp-template
git clone https://github.com/planetarium/chrono-webapp-template
```

`App.tsx` 에 작성하기 시작할 것입니다.

```tsx
function App() {
  return <p>Template</p>
}

export default App
```

## 2. 연결 버튼 띄우기

dApp을 많이 사용했다면 MetaMask와 웹사이트를 연결하는 Connect 버튼을 많이 보셨을겁니다. Chrono도 아무 웹사이트나 서명을 하지 못 하도록 연결하는 과정이 있습니다. 이를 위해 Connect 버튼을 보여줍시다.

템플릿 저장소에는 `ConnectButton`이 이미 포함되어 있습니다.

```tsx
import { useConnect } from "@planetarium/chrono-sdk/hooks";

export function ConnectButton() {
    const { connectAsync, isPending } = useConnect();

    return <button onClick={() => connectAsync()} disabled={isPending}>
      Connect
    </button>
}
```

그러니 import해서 사용합시다.

```tsx
import { ConnectButton } from "./ConnectButton";

function App() {
    return <ConnectButton />
}
```

이제 Connect 버튼을 누르면 Chrono 팝업이 뜨고 연결을 진행하는 화면이 나올것입니다.

## 3. form 만들기

본 예제의 목적은 NCG를 특정 사람에게 보내는 것입니다. 때문에 이를 설정할 수 있는 form 을 만들것입니다.

받아야 하는 요소는 아래 세가지 입니다.

- `sender`: 어떤 주소에서 NCG를 꺼내서 송금할지.
- `recipient`: 어떤 주소로 NCG를 송금할 것인지.
- `amount`: 얼마나 많은 NCG를 송금할 것인지.

`recipient`와 `amount`는 사용자에게 입력받는 부분이기에 크게 신경쓰지 않아도 되지만, `sender`는 Chrono account들을 보여줘야 하기때문에 특별한 처리가 필요할 것 같습니다. Chrono를 통해 연결된 account를 가져오기 위해서는 `useAccounts` 를 쓸 수 있습니다.

`useAccounts`는 data 타입으로 `isConnected: boolean` 과 `accounts: Address[]` 를 제공해줍니다. `isConnected` 여부에 따라 Connect 버튼을 보여줘야 하니 `useAccounts` 는 바깥에서 보여줄 예정입니다.

```tsx
import { Address } from "@planetarium/account";
import { getChronoSdk } from "@planetarium/chrono-sdk";
import { useAccounts } from "@planetarium/chrono-sdk/hooks";
import { NCG, TransferAsset, fav } from "@planetarium/lib9c";
import { useState } from "react";
import { useStageTransactionMutation } from "./generated/graphql";

interface AccountSelectorProps {
  account: Address,
  accounts: Address[],
  onSelect: (value: Address) => void;
}

function AccountSelector({ account, accounts, onSelect }: AccountSelectorProps) {
  return <select value={account.toString()} onChange={e => onSelect(accounts[Number(e.target.value)])}>
    {accounts.map((acc, index) => <option key={acc.toString()} value={index}>{acc.toString()}</option>)}
  </select>
}

interface SendButtonProps {
  sender: Address,
  recipient: Address,
  amount: number,

  setTxId: (id: string | null) => void;
}

function SendButton({
  sender, recipient, amount, setTxId
}: SendButtonProps) {
  const [stage] = useStageTransactionMutation();
  const chronoSdk = getChronoSdk()!;
  function onClick() {
    chronoSdk.sign(sender, new TransferAsset({
      // @ts-ignore
      sender,
      // @ts-ignore
      recipient,
      amount: fav(NCG, amount)
    })).then(tx => {
      console.log(tx.toString("hex"))
      return stage({
        variables: {
          tx: tx.toString('hex'),
        }
      });
    }).then(({ data }) => {
      console.log(data);
      setTxId(data?.stageTransaction || null);
    }).catch(console.error);
  }

  return <button onClick={e => {
    e.preventDefault();
    onClick();
  }}>Send</button>
}

interface FormProps {
  accounts: Address[],
}

function Form({
  accounts,
}: FormProps) {
  const [sender, setSender] = useState<Address>(accounts[0]);
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [txId, setTxId] = useState<string | null>(null);
  return <form>
      <label>Sender</label>
      <AccountSelector accounts={accounts} onSelect={setSender} account={sender} />
      <br/>

      <label>Recipient</label>
      <input type='text' value={recipient} onChange={e => setRecipient(e.target.value)} />
      <br/>

      <label>Amount</label>
      <input type='number' value={amount} onChange={e => setAmount(Number(e.target.value))} />
      <br/>

      {recipient.length === 42 && <SendButton sender={sender} recipient={Address.fromHex(recipient, true)} amount={amount} setTxId={setTxId} />}
      <br/>

      {txId && <a href={`https://9cscan.com/tx/${txId}`}>9cscan link</a>}
  </form>
}

function App() {
  const { data, isSuccess, error } = useAccounts();
  if (!isSuccess) {
    return <p>Failed to run 'useAccounts' hook: {error === null ? "null" : error.message}</p>
  }

  const { accounts, isConnected } = data;
  if (!isConnected) {
    return <ConnectButton />
  }

  return <Form accounts={accounts}/>
}
```
