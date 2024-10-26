# 인벤토리(Inventory)

인벤토리는 아바타 별로 하나씩 존재하며 다양한 아이템을 포함합니다.

- [Nekoyume.Model.Item.Inventory](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Model/Item/Inventory.cs)

## 상태

- 어카운트 주소: [Nekoyume.Addresses.Inventory](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Addresses.cs#L45)
- 상태 주소: 아바타의 주소를 그대로 사용합니다.

### 상태 조회:

```cs
public Inventory? GetInventory(IWorld world, Address address)
{
    IAccount account = world.GetAccount(Addresses.Inventory);
    if (account is null)
    {
        return null;
    }

    IValue state = account.GetState(address);
    return state switch
    {
        Bencodex.Types.List l => new Inventory(l),
        _ => null,
    };
}
```
