# QuestList

QuestList는 아바타 별로 하나씩 존재하며 아바타의 퀘스트 정보를 포함합니다.

- [QuestList](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Model/Quest/QuestList.cs)

### 상태

- 어카운트 주소: [Addresses.QuestList](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Addresses.cs#L47)
- 상태 주소: 아바타의 주소를 그대로 사용합니다.

##### 상태 조회:

```cs
public QuestList? GetQuestList(IWorld world, Address address)
{
    IAccount account = world.GetAccount(Addresses.QuestList);
    if (account is null)
    {
        return null;
    }

    IValue state = account.GetState(address);
    return state switch
    {
        Bencodex.Types.List l => new QuestList(l),
        Bencodex.Types.Dictionary d => new QuestList(d),
        _ => null,
    };
}
```
