# Creating an NCG Transfer Page

In this document, we will create a web application that allows users to input the recipient and amount, sign through Chrono, and transfer NCG.

## 1. Clone Repository

Create a React project that uses the Vite bundler through `create-vite` and install dependencies such as `@planetarium/lib9c`, `@planetarium/account`, `@planetarium/tx`, and `@planetarium/chrono-sdk`.

To facilitate this, a template repository has been prepared. You can create a repository using the `Use this template` button on GitHub or directly clone it and work locally: https://github.com/planetarium/chrono-webapp-template

```
gh repo clone planetarium/chrono-webapp-template
git clone https://github.com/planetarium/chrono-webapp-template
```

We will start creating `App.tsx`.

```tsx
function App() {
  return <p>Template</p>
}

export default App
```

## 2. Display Connect Button

If you've used dApps often, you're probably familiar with seeing a Connect button for linking MetaMask with a website. Chrono also requires a connection process to prevent unauthorized signing on any website. Let's display the Connect button to facilitate this.

The template repository already includes a `ConnectButton`.

```tsx
import { useConnect } from "@planetarium/chrono-sdk/hooks";

export function ConnectButton() {
    const { connectAsync, isPending } = useConnect();

    return <button onClick={() => connectAsync()} disabled={isPending}>
      Connect
    </button>
}
```

Let's import and use it.

```tsx
import { ConnectButton } from "./ConnectButton";

function App() {
    return <ConnectButton />
}
```

Now, when you click the Connect button, a Chrono popup will appear and prompt you to proceed with the connection.

## 3. Creating the Form

The purpose of this example is to send NCG to a specific person. Therefore, we will create a form that allows us to configure this.

The required elements are the following three:

- `sender`: The address from which the NCG will be withdrawn and sent.
- `recipient`: The address to which the NCG will be sent.
- `amount`: The amount of NCG to be sent.

Since `recipient` and `amount` are parts that the user inputs, you don't need to worry too much about them. However, `sender` needs special handling because it has to display Chrono accounts. To retrieve the accounts connected through Chrono, you can use `useAccounts`.

`useAccounts` provides `isConnected: boolean` and `accounts: Address[]` as its data type. Depending on whether `isConnected` is true or false, we need to show the Connect button. Therefore, `useAccounts` will be used externally to display the necessary interface.

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
