Blockchains share a single state between each node participating in the network, called the distributed ledger. Nine Chronicles uses `Libplanet` to manage the blockchain state, which in turn implements many of the game's features, and `Lib9c` is the implementation.

::: info :bulb:
This document is based on Libplanet `5.2.2`, Lib9c `1.17.3`, and Bencodex `0.16.0` versions.
- For more information on how to use Libplanet, see the [official documentation](https://docs.libplanet.io/5.2.2/).
- [Lib9c 1.17.3](https://github.com/planetarium/lib9c/tree/1.17.3)
- [Bencodex 0.16.0](https://github.com/planetarium/bencodex.net/tree/0.16.0)
:::

## World(IWorld) {#iworld}

In Libplanet, a world is a blockchain state and consists of multiple [accounts] (#iaccount). In Libplanet, you can manage worlds through the `IWorld` interface, which provides methods to retrieve and update accounts.

- [Libplanet.Action.State.IWorld](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Action/State/IWorld.cs)
- [Libplanet.Action.State.IWorldState](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Action/State/IWorldState.cs)

```cs
public IWorld Foo(IWorld world)
{
    Address address = new PrivateKey().Address;
    IAccount account = world.GetAccount(address);
    world = world.SetAccount(address, account);
    return world;
}
```

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

## Account(IAccount) {#iaccount}

In Libplanet, an account represents a set of [states](#ivalue) associated with a particular address in the world. In Libplanet, accounts can be managed through the `IAccount` interface.

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

## State(IValue) {#ivalue}

In Libplanet, all state is managed through the `IValue` interface. The `IValue` means `Bencodex.Types.IValue` and contains many different types. For example, `Bencodex.Types.Binary`, `Bencodex.Types.Integer`, `Bencodex.Types.Text`, `Bencodex.Types.List`, `Bencodex.Types.Dictionary`, etc.

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
        _ => throw new UnexpactedTypeException();
    }
}
```

[^public-key]: The public key derived from the private key. [Libplanet.Crypto.PublicKey](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Crypto/PublicKey.cs)
