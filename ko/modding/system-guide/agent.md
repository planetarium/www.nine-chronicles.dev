# 에이전트(AgentState) {#agent-state}

에이전트는 플레이어의 계정에 해당하는 상태로, 소유하고 있는 아바타들의 주소 목록을 포함합니다.

- [Nekoyume.Model.State.AgentState](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Model/State/AgentState.cs)

## 상태 {#state}

- 어카운트 주소: [Nekoyume.Addresses.Agent](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Addresses.cs#L43)
- 상태 주소: 게임 플레이에 사용하는 개인 키의 주소

### 상태 조회: {#get-state}

```cs
public AgentState? GetAgentState(IWorld world, Address address)
{
    IAccount account = world.GetAccount(Addresses.Agent);
    if (account is null)
    {
        return null;
    }

    IValue state = account.GetState(address);
    return state switch
    {
        Bencodex.Types.List l => new AgentState(l),
        Bencodex.Types.Dictionary d => new AgentState(d),
        _ => null,
    };
}
```
