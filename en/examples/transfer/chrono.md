# Create an NCG transfer page

In this article, we will create a web application that receives the remittance destination and quantity via input and sends NCG by signing via chrono.

## 1. Clone the repository

We need to create a react project using the vite bundler via `create-vite` and install dependencies like `@planetarium/lib9c`, `@planetarium/account`, `@planetarium/tx`, and `@planetarium/chrono-sdk`.

For this purpose, we have created a template repository. You can either clone the repository with `Use this template` on GitHub, or you can clone it yourself and work with it locally. https://github.com/planetarium/chrono-webapp-template

```
gh repo clone planetarium/chrono-webapp-template
git clone https://github.com/planetarium/chrono-webapp-template
```

We'll start writing to `App.tsx`.

```tsx
function App() {
  return <p>Template</p>
}

export default App
```

## 2. Show a Connect button

If you've used a lot of dApps, you've probably seen a lot of Connect buttons that connect MetaMasks to websites. Chrono also has a process for connecting to websites to prevent them from signing just any website. To do this, let's show the Connect button.

The template repository already contains a `ConnectButton`.

```tsx
import { useConnect } from "@planetarium/chrono-sdk/hooks";

export function ConnectButton() {
    const { connectAsync, isPending } = useConnect();

    return <button onClick={() => connectAsync()} disabled={isPending}>
      Connect
    </button>
}
```

So let's import it and use it.

```tsx
import { ConnectButton } from "./ConnectButton";

function App() {
    return <ConnectButton />
}
```

Now press the Connect button, and you should see a Chrono popup prompting you to connect.

## 3. Build a `form`

The purpose of this example is to send an NCG to a specific person, so we'll create a form to set this up.

There are three elements we need to receive

- `sender`: the address to retrieve the NCG from and send it to.
- `recipient`: which address to send the NCG to.
- `amount`: How much NCG to send.

The `recipient` and `amount` are user input, so you don't need to worry too much about them, but the `sender` needs to be handled differently because it needs to show Chrono accounts. To get the accounts connected via Chrono, we can use `useAccounts`.

The `useAccounts` provides `isConnected: boolean` and `accounts: Address[]` as data types. We'll show `useAccounts` externally because we need to show the Connect button based on whether it's `isConnected` or not.

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
