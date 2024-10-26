# WorldInformation

WorldInformation은 아바타 별로 하나씩 존재하며 아바타의 모험 정보를 포함합니다.

- [Nekoyume.Model.WorldInformation](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Model/WorldInformation.cs)

## 상태

- 어카운트 주소: [Nekoyume.Addresses.WorldInformation](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Addresses.cs#L46)
- 상태 주소: 아바타의 주소를 그대로 사용합니다.

### 상태 조회:

```cs
public WorldInformation? GetWorldInformation(IWorld world, Address address)
{
    IAccount account = world.GetAccount(Addresses.WorldInformation);
    if (account is null)
    {
        return null;
    }

    IValue state = account.GetState(address);
    return state switch
    {
        Bencodex.Types.Dictionary d => new WorldInformation(d),
        _ => null,
    };
}
```
