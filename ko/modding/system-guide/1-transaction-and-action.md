나인 크로니클의 블록체인 상태를 변경 하는 방법은 트랜젝션을 발행하는 것입니다.

## 트랜젝션(Transaction) {#transaction}

`Libplanet`의 트랜젝션은 블록체인 네트워크에서 상태를 변경하는 [액션](#action)을 포함하고 있으며, 나인 크로니클에서는 하나의 트랜젝션에 하나의 액션을 담아서 발행합니다.[^block-policy-1action-in-1tx]

- [Libplanet.Types.Tx.ITransaction](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Types/Tx/ITransaction.cs)
- [Libplanet.Types.Tx.Transaction](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Types/Tx/Transaction.cs)
- [Libplanet.Types.Tx.TxActionList](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Types/Tx/TxActionList.cs)

## 액션(Action) {#action}

액션은 상태를 변경하기 위해 필요한 인자들과 실제로 상태를 변경시키는 메서드를 포함하며, 나인 크로니클에는 많은 종류의 액션들이 정의되어 있습니다.[^lib9c-actions]

- [Libplanet.Action.IAction](https://github.com/planetarium/libplanet/blob/5.2.2/src/Libplanet.Action/IAction.cs)

## 꿀술(Mead) {#mead}

꿀술은 액션을 실행하기 위해서 필요한 기본적인 통화입니다. 이 통화를 얻는 방법은 바로 `서약` 시스템을 이용하는 것인데요.
자세한 내용은 [이 문서](https://docs.nine-chronicles.com/introduction/guide/nine-chronicles-portal/patron)를 확인하세요.

### 잔액 조회: {#mead-get-balance}

- 통화: [Lib9c.Currencies.Mead](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Currencies.cs#L66)
- 잔액 주소: [에이전트](./agent/0-agent)의 주소를 그대로 사용합니다.

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

## 액션 포인트(Action Point) {#action-point}

몇몇 액션을 실행하기 위해서는 액션 포인트라는 자원이 필요합니다. 이 포인트는 아바타 생성과 동시에 최대치인 120[^action-point-max]을 갖게 되고, 이후에는 [순찰 보상](https://docs.nine-chronicles.com/introduction/intro/game-contents/patrol-rewards)이나 AP 포션[^ap-potion] 등을 통해서 얻을 수 있습니다.

### 상태 조회: {#action-point-get-state}

- 어카운트 주소: [Nekoyume.Addresses.ActionPoint](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Addresses.cs#L50)
- 상태 주소: [아바타](./avatar/0-avatar)의 주소를 그대로 사용합니다.

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

[^block-policy-1action-in-1tx]: `Lib9c`의 [Nekoyume.Blockchain.Policy.BlockPolicySource.ValidateNextBlockTxRaw](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c.Policy/Policy/BlockPolicySource.cs#L165-L171) 메서드에서는 한 트랜젝션에 하나의 액션만 포함하는 것을 검사하고 있습니다.
[^lib9c-actions]: `Lib9c`의 [Nekoyume.Action](https://github.com/planetarium/lib9c/tree/1.17.3/Lib9c/Action) 네임스페이스에 정의되어 있는 액션들을 확인하세요.
[^action-point-max]: 액션 포인트의 최대치는 [Nekoyume.Action.DailyReward.ActionPointMax](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Action/DailyReward.cs#L29)에 `120`으로 정의되어 있습니다.
[^ap-potion]: AP을 최대치만큼 채워주는 아이템입니다.
