# 아바타(AvatarState)

아바타는 캐릭터에 해당하는 상태로, 이름과 레벨 등을 포함하고 있습니다.

- [Nekoyume.Model.State.AvatarState](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Model/State/AvatarState.cs)

## 상태 {#state}

- 어카운트 주소: [Nekoyume.Addresses.Avatar](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Addresses.cs#L44)
- 상태 주소: 아바타의 주소는 에이전트의 주소로부터 유도합니다.

```cs
public Address GetAvatarAddress(Address agentAddress, int index)
{
    return agentAddress.Derive($"avatar-state-{index}");
    // or
    return Addresses.GetAvatarAddress(agentAddress, index);
}
```

### 상태 조회: {#get-state}

```cs
public AvatarState? GetAvatarState(IWorld world, Address address)
{
    IAccount account = world.GetAccount(Addresses.Avatar);
    if (account is null)
    {
        return null;
    }

    IValue state = account.GetState(address);
    return state switch
    {
        Bencodex.Types.List l => new AvatarState(l),
        Bencodex.Types.Dictionary d => new AvatarState(d),
        _ => null,
    };
}
```
