블록체인은 네트워크에 참여한 각 노드간에 하나의 상태를 공유합니다. 이 상태를 분산장부라고 하는데요. 나인 크로니클은 `Libplanet`을 사용하여 블록체인 상태를 관리하고, 이를 통해 게임 내 다양한 기능을 구현하는데, 이 구현체가 바로 `Lib9c`입니다.

::: info :bulb:
본 문서는 Libplanet `5.2.2`와 Lib9c `1.17.3`, 그리고 Bencodex `0.16.0` 버전을 기준으로 작성했습니다.
- Libplanet의 자세한 사용법은 [공식 문서](https://docs.libplanet.io/5.2.2/)를 참고하세요.
- [Lib9c 1.17.3](https://github.com/planetarium/lib9c/tree/1.17.3)
- [Bencodex 0.16.0](https://github.com/planetarium/bencodex.net/tree/0.16.0)
:::

## 주소(Address) {#address}

Libplanet에서 주소는 블록체인 상의 특정 위치를 나타내며, 주로 어카운트와 상태 또는 잔액을 식별하는 데 사용됩니다. Libplanet에서는 주소 역할을 하는 `Address` 클래스가 있고, 주로 공개 키[^public-key]에서 파생되거나 40 또는 42자리의 16진수 문자열로 생성합니다.

- [Libplanet.Action.State.Address](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Action/State/Address.cs)

```cs
PrivateKey privateKey = new PrivateKey();
PublicKey publicKey = privateKey.PublicKey;
Address addressFromPublickKey = publicKey.Address;
// or
Address addressFromPrivateKey = privateKey.Address;

Address addressViaHexString1 = new Address("1234567890abcdef1234567890abcdef12345678");
// or
Address addressViaHexString2 = new Address("0x1234567890abcdef1234567890abcdef12345678");
```

## 월드(IWorld) {#iworld}

Libplanet에서는 `IWorld` 인터페이스를 통해 블록체인 상태를 관리할 수 있는데요. 이 인터페이스는 어카운트([IAccount](#iaccount), [CurrencyAccount](#currency-account))를 조회하고 업데이트하는 메서드를 제공합니다. 여기서 어카운트는 월드 내에서 특정 주소와 연관된 상태 묶음을 의미합니다.

- [Libplanet.Action.State.IWorld](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Action/State/IWorld.cs)
- [Libplanet.Action.State.IWorldState](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Action/State/IWorldState.cs)

```cs
public IWorld Foo(IWorld world)
{
    Address address = new PrivateKey().Address;
    IAccount account = world.GetAccount(address);
    world = world.SetAccount(address, account);

    Currency currency = Currency.Uncapped("$", 0, null);
    CurrencyAccount currencyAccount = world.GetCurrencyAccount(currency);
    world = world.SetCurrencyAccount(currency, currencyAccount);

    return world;
}
```

## IAccount {#iaccount}

Libplanet에서는 `IAccount` 인터페이스를 통해 상태를 관리할 수 있습니다.

- [Libplanet.Action.State.IAccount](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Action/State/IAccount.cs)
- [Libplanet.Action.State.IAccountState](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Action/State/IAccountState.cs)

```cs
public IAccount Foo(IAccount account, Address address)
{
    IValue? value = account.GetState(address);
    if (value is null)
    {
        account = account.SetSate(address, (Bencodex.Types.Integer)1);
    }
    else
    {
        account = account.RemoveState(address);
    }

    return account;
}
```

## CurrencyAccount {#currency-account}

CurrencyAccount는 특정 통화와 연관된 어카운트를 나타내며, 주로 잔액 상태를 관리하는 데 사용됩니다.

- [Libplanet.Action.State.CurrencyAccount](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Action/State/CurrencyAccount.cs)

```cs
public CurrencyAccount Foo(
    CurrencyAccount currencyAccount,
    Address sender,
    Address recipient)
{
    Currency currency = Currency.Uncapped("$", 0, null);
    FungibleAssetValue balance = currencyAccount.GetBalance(sender, currency);
    // balance: 0.0 $

    FungibleAssetValue amount = new FungibleAssetValue(currency, 1, 0);
    currencyAccount = currencyAccount.MintAsset(sender, amount);
    balance = currencyAccount.GetBalance(sender, currency);
    // balance: 1.0 $

    currencyAccount = currencyAccount.TransferAsset(sender, recipient, amount);
    balance = currencyAccount.GetBalance(sender, currency);
    // balance: 0.0 $
    balance = currencyAccount.GetBalance(recipient, currency);
    // balance: 1.0 $

    currencyAccount = currencyAccount.BurnAsset(recipient, amount);
    balance = currencyAccount.GetBalance(recipient, currency);
    // balance: 0.0 $

    balance = currencyAccount.GetBalance(sender, currency);
}
```

## IValue

Libplanet에서는 모든 상태를 `Bencodex.Types.IValue` 인터페이스 타입으로 직렬화해서 저장하는데요. `Bencodex.Types.Binary`, `Bencodex.Types.Integer`, `Bencodex.Types.Text`, `Bencodex.Types.List`, `Bencodex.Types.Dictionary` 등의 다양한 구현들이 있습니다.

- [Bencodex.Types](https://github.com/planetarium/bencodex.net/tree/0.16.0/Bencodex/Types)
- [Bencodex.Types.IValue](https://github.com/planetarium/bencodex.net/blob/0.16.0/Bencodex/Types/IValue.cs)

```cs
public IAccount Add(IAccount account, Address address, int value)
{
    IValue? state = account.GetState(address);
    return state switch
    {
        null => account.SetState(address, (Bencodex.Types.Integer)value),
        Bencodex.Types.Null => account.SetState(address, (Bencodex.Types.Integer)value),
        Bencodex.Types.Integer i => account.SetState(address, i + value),
        _ => throw new UnexpectedTypeException();
    }
}
```

[^public-key]: 개인 키에서 파생된 공개 키. [Libplanet.Crypto.PublicKey](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Crypto/PublicKey.cs)
