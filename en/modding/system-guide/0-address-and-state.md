Blockchains share a single state between each node participating in the network, called the distributed ledger. Nine Chronicles uses `Libplanet` to manage the blockchain state, which in turn implements many of the game's features, and `Lib9c` is the implementation.

::: info :bulb:
This document is based on Libplanet `5.2.2`, Lib9c `1.17.3`, and Bencodex `0.16.0` versions.
- For more information on how to use Libplanet, see the [official documentation](https://docs.libplanet.io/5.2.2/).
- [Lib9c 1.17.3](https://github.com/planetarium/lib9c/tree/1.17.3)
- [Bencodex 0.16.0](https://github.com/planetarium/bencodex.net/tree/0.16.0)
:::

## Address {#address}

In Libplanet, an address represents a specific location on the blockchain, and is primarily used to identify accounts and their [state](#ivalue). Libplanet has a class `Address` that acts as an address and is usually derived from a public key[^public-key] or generated as a hexadecimal string of 40 or 42 digits.

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


## World(IWorld) {#iworld}

In Libplanet, blockchain state can be managed through the `IWorld` interface, which provides methods to retrieve and update accounts ([IAccount](#iaccount), [CurrencyAccount](#currency-account)). In this context, an account is a bundle of states associated with a particular address in the world.

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

## Account(IAccount) {#iaccount}

In Libplanet, you can manage status through the `IAccount` interface.

- [Libplanet.Action.State.IAccount](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Action/State/IAccount.cs)
- [Libplanet.Action.State.IAccountState](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Action/State/IAccountState.cs)

```cs
public IAccount Foo(IAccount account)
{
    Address address = new PrivateKey().Address;
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

CurrencyAccount represents an account associated with a specific currency, and is primarily used to manage balance status.

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

Libplanet stores all state serialized in the `Bencodex.Types.IValue` interface type. There are many different implementations, including `Bencodex.Types.Binary`, `Bencodex.Types.Integer`, `Bencodex.Types.Text`, `Bencodex.Types.List`, and `Bencodex.Types.Dictionary`.

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

[^public-key]: The public key derived from the private key. [Libplanet.Crypto.PublicKey](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Crypto/PublicKey.cs)
