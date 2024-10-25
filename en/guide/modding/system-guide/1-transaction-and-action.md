The way to change the state of Nine Chronicles' blockchain is to issue a transaction.

## Transaction

A transaction in `Libplanet` contains an [action](#action) that changes the state on the blockchain network, and Nine Chronicles issues one transaction with one action.[^block-policy-1action-in-1tx]

- [Libplanet.Types.Tx.ITransaction](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Types/Tx/ITransaction.cs)
- [Libplanet.Types.Tx.Transaction](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Types/Tx/Transaction.cs)
- [Libplanet.Types.Tx.TxActionList](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Types/Tx/TxActionList.cs)

## Action

Actions contain the arguments needed to change the state and the method that actually changes the state, and there are many types of actions defined in Nine Chronicles.[^lib9c-actions]

- [Libplanet.Action.IAction](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Action/IAction.cs)

## Mead

Mead is the basic currency needed to execute actions, and the way to get it is through the Pledge system.
For more information, check out [this article](https://docs.nine-chronicles.com/introduction/guide/nine-chronicles-portal/patron).

### Get Balance: {#mead-get-balance}

- Currency: [Lib9c.Currencies.Mead](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Currencies.cs#L66)
- Balance Address: Use the address of [agent](./agent/0-agent) as it is.

```cs
public FungibleAssetValue? GetMead(IWorld world, Address address)
{
    CurrencyAccount currencyAccount = world.GetCurrencyAccount(currency);
    return currencyAccount.GetBalance(address, currency);
    // or
    Currency currency = Currencies.Mead;
    return world.GetBalance(address, currency);
}
```

## Action Point

Some actions require a resource called Action Point to perform. These points are maxed out at 120 [^action-point-max] when you create your avatar, and can then be earned through [Patrol Rewards] (https://docs.nine-chronicles.com/introduction/intro/game-contents/patrol-rewards), AP Potion [^ap-potion], and more.

### Get State: {#action-point-get-state}

- Account Address: [Nekoyume.Addresses.ActionPoint](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Addresses.cs#L50)
- State Address: Use the address of your [avatar](./avatar/0-avatar) as it is.

```cs
public int? GetActionPoint(IWorld world, Address address)
{
    IAccount account = world.GetAccount(Addresses.ActionPoint);
    if (account is null)
    {
        return null;
    }

    IValue state = account.GetState(address);
    return state switch
    {
        Bencodex.Types.Integer i => i,
        _ => null,
    };
}
```

[^block-policy-1action-in-1tx]: In the [Nekoyume.Blockchain.Policy.BlockPolicySource.ValidateNextBlockTxRaw](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c.Policy/Policy/BlockPolicySource.cs#L165-L171) method of `Lib9c`, we are checking that a transaction contains only one action.
[^lib9c-actions]: Check out the actions defined in the [Nekoyume.Action](https://github.com/planetarium/lib9c/tree/1.17.3/Lib9c/Action) namespace in `Lib9c`.
[^action-point-max]: The maximum number of action points is defined as `120` in [Nekoyume.Action.DailyReward.ActionPointMax](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Action/DailyReward.cs#L29).
[^ap-potion]: An item that fills your AP to the maximum.
