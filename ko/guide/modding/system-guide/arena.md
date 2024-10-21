# 아레나

모험을 통해서 아바타를 성장시켰다면, 다른 플레이어들과 경쟁하는 아레나 컨텐츠를 이용할 수 있습니다. 자세한 설명은 [공식 문서](https://docs.nine-chronicles.com/introduction/intro/game-contents/arena-pvp-competition)를 참고하세요.

## 라운드 {#round}

아레나는 라운드 단위로 운영됩니다. 각 라운드는 일정 기간동안 시즌과 비시즌 그리고 챔피언쉽 중에 하나의 종류로 정해집니다.

- 라운드가 속하는 챔피언쉽 ID: [Nekoyume.TableData.ArenaSheet.Row.ChampionshipId](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/TableData/ArenaSheet.cs#L17)
- 챔피언쉽 ID 내에서의 라운드 번호: [Nekoyume.TableData.ArenaSheet.Row.Round](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/TableData/ArenaSheet.cs#L17)
- 라운드의 종류: [Nekoyume.TableData.ArenaSheet.Row.ArenaType](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/TableData/ArenaSheet.cs#L19)
- 라운드의 기간:
   - 시작: [Nekoyume.TableData.ArenaSheet.Row.StartBlockIndex](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/TableData/ArenaSheet.cs#L20)
   - 종료: [Nekoyume.TableData.ArenaSheet.Row.EndBlockIndex](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/TableData/ArenaSheet.cs#L21)

## 참가 {#join}

라운드 참가는 [Nekoyume.Action.JoinArena](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Action/JoinArena.cs) 액션을 사용합니다.<br>
각 라운드는 참가에 필요한 조건이나 비용이 존재하는데요. 아래의 표에서 확인해보세요.

| | 오프시즌 | 시즌 | 챔피언쉽 | 참조 |
| :---: | :---: | :---: | :---: | :---: |
| 참가 조건 | X | X | O | [Nekoyume.TableData.ArenaSheet.Row.RequiredMedalCount](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/TableData/ArenaSheet.cs#L22) |
| 참가비 | X | O | O | [Nekoyume.TableData.ArenaSheet.Row.EntranceFee](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/TableData/ArenaSheet.cs#L23) |

### 참가 조건 {#conditions-of-entry}

모든 챔피언쉽 라운드는 각각의 챔피언쉽 라운드에 참가하기 위한 메달 아이템이 각각 존재하며, 이 메달 아이템을 일정량 이상 모아야만 참가 자격이 주어집니다.

### 참가비 {#entry-fee}

시즌과 챔피언쉽 라운드는 참가하기 위해서는, 참가하는 아바타의 레벨에 비례한 참가비를 크리스탈로 지불해야 합니다.

### 상태 {#join-states}

**라운드 참가자 목록**

- 어카운트 주소: [Libplanet.Action.State.ReservedAddresses.LegacyAccount](https://github.com/planetarium/libplanet/blob/main/src/Libplanet.Action/State/ReservedAddresses.cs#L7)
- 상태 주소: 챔피언쉽 ID와 라운드에 따라서 개별 주소를 갖습니다.
    ```cs
    public Address GetArenaParticipantsAddress(int championshipId, int round)
    {
        return ArenaParticipants.DeriveAddress(championshipId, round);
    }
    ```
- 타입: [Nekoyume.Model.Arena.ArenaParticipants](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Model/Arena/ArenaParticipants.cs)

**참가자의 라운드 정보**

- 어카운트 주소: [Libplanet.Action.State.ReservedAddresses.LegacyAccount](https://github.com/planetarium/libplanet/blob/main/src/Libplanet.Action/State/ReservedAddresses.cs#L7)
- 상태 주소: 아바타 주소와 챔피언쉽 ID와 라운드에 따라서 개별 주소를 갖습니다.
    ```cs
    public Address GetArenaInformation(Address avatarAddress, int championshipId, int round)
    {
        ArenaInformation.DeriveAddress(avatarAddress, championshipId, round);
    }
    ```
- 타입: [Nekoyume.Model.Arena.ArenaInformation](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Model/Arena/ArenaInformation.cs)

**참가자의 점수**

- 어카운트 주소: [Libplanet.Action.State.ReservedAddresses.LegacyAccount](https://github.com/planetarium/libplanet/blob/main/src/Libplanet.Action/State/ReservedAddresses.cs#L7)
- 상태 주소: 아바타 주소와 챔피언쉽 ID와 라운드에 따라서 개별 주소를 갖습니다.
    ```cs
    public Address GetArenaScore(Address avatarAddress, int championshipId, int round)
    {
        ArenaScore.DeriveAddress(avatarAddress, championshipId, round);
    }
    ```
- 타입: [Nekoyume.Model.Arena.ArenaScore](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Model/Arena/ArenaScore.cs)

## 전투(ArenaSimulator) {#battle}

전투는 [Nekoyume.Action.BattleArena](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Action/BattleArena.cs) 액션을 사용하고, [Nekoyume.Arena.ArenaSimulator](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Arena/ArenaSimulator.cs) 클래스를 활용해서 전투를 진행합니다.

### 티켓 {#battle-tickets}

전투를 하기 위해서는 아레나 티켓이 필요한데요. 라운드에 처음 참가하면 자동으로 최대량의 티켓이 발급되어 있습니다. 이 티켓은 각 라운드의 티켓 초기화 주기마다 해당 라운드의 참가자에게 새롭게 발급됩니다.

- 티켓 최대량: [Nekoyume.Model.Arena.ArenaInformation.MaxTicketCount](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Model/Arena/ArenaInformation.cs#L16)
- 티켓 초기화 주기: [Nekoyume.Model.State.GameConfigState.DailyArenaInterval](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Model/State/GameConfigState.cs#L20)

**티켓 구매**

티켓이 부족한 경우에는 직접 구매해서 전투에 사용할 수 있습니다. 라운드 또는 티켓의 리셋 주기 안에 구매할 수 있는 티켓의 최대량과 가격이 정해져 있습니다.

- 라운드 내에서 구매할 수 있는 티켓의 최대량: [Nekoyume.TableData.ArenaSheet.RoundData.MaxPurchaseCount](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/TableData/ArenaSheet.cs#L26)
- 티켓 리셋 주기 내에서 구매할 수 있는 티켓의 최대량: [Nekoyume.TableData.ArenaSheet.RoundData.MaxPurchaseCountWithInterval](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/TableData/ArenaSheet.cs#L27)
- 티켓 구매 가격: 아래의 코드와 같이 티켓의 구매 가격은 각 라운드마다 정해진 가격과 이미 구매한 티켓의 수에 따라 정해집니다.
    ```cs
    public FungibleAssetValue GetTicketPrice(
        ArenaSheet.RoundData round,
        int alreadyPurchasedCount)
    {
        return GetTickgetPrice(
            round.TicketPrice,
            round.AdditionalTicketPrice,
            alreadyPurchasedCount);
    }

    public FungibleAssetValue GetTicketPrice(
        decimal price,
        decimal additionalprice,
        int alreadyPurchasedCount)
    {
        return price.DivRem(100, out _) +
            additionalprice.DivRem(100, out _) * alreadyPurchasedCount;
    }
    ```

### 전투 대상 제한 {#battle-target-limit}

아레나에서는 전투할 수 있는 대상에 제한이 있습니다. 바로 스코어 제한이 있는데요. 아래의 코드를 확인해보세요.

https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Action/BattleArena.cs#L274
```cs:line-numbers=274
if (!ArenaHelper.ValidateScoreDifference(
    ArenaHelper.ScoreLimits,
    roundData.ArenaType,
    myArenaScore.Score,
    enemyArenaScore.Score))
{
    // ...
}
```

위의 코드에서 [ArenaHelper.ValidateScoreDifference](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Arena/ArenaHelper.cs#L135) 메서드는 플레이어와 적의 스코어 차이를 검증하여 전투가 가능한지 확인합니다. 이 메서드는 [ArenaHelper.ScoreLimits](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Arena/ArenaHelper.cs#L50)와 라운드 데이터의 아레나 타입, 그리고 플레이어와 적의 스코어를 인자로 받아 스코어 차이가 허용 범위 내에 있는지 판단합니다.

현재의 스코어 제한은 아래의 표와 같습니다.

| 공격자 스코어 - 방어자 스코어 | 오프시즌 | 시즌 | 챔피언쉽 |
| :-: | :-: | :-: | :-: |
| 최소 스코어 차이 | - | -100 | -100 |
| 최대 스코어 차이 | - | 200 | 200 |

예를 들어, 오프시즌 라운드에서 전투할 때에는 점수 제한 없이 누구에게나 전투를 걸 수 있고, 시즌이나 챔피언쉽 라운드에서는 플레이어 아바타의 스코어가 2000점인 경우에 전투를 걸 수 있는 상대의 스코어는 1900점에서 2200점 사이여야 합니다.

### 규칙(모험과의 차이점) {#battle-rule}

아레나 전투는 모험과는 다르게, 플레이어 간의 전투(PvP)로 진행됩니다. 기본적인 전투 규칙은 모험과 같고, 차이가 나는 부분은 아래를 확인해주세요.

**공격 스킬의 명중**

아레나의 전투에서는 공격 스킬의 명중 여부를 판단할 때, 모험과 다른 규칙을 따릅니다.

- 참고: [모험 > 기본 공격의 명중](./adventure#battle-normal-attack-hits)
- 기본 공격 뿐만 아니라 모든 공격 스킬의 명중을 판단합니다.
- 공격자와 방어자의 레벨 차이를 고려하지 않습니다.

| 콘텐츠 | 명중 여부 적용 범위 | 변수 |
| :-: | :-: | :-: |
| 아레나 | 기본 공격을 포함한 모든 공격 스킬 | HIT 스탯 |
| 모험 | 기본 공격 | 아바타 레벨, HIT 스탯 |

아래는 아레나에서 명중 여부를 판단하는 순서입니다.

- [Nekoyume.Model.Skill.ArenaAttackSkill.ProcessDamage](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Model/Skill/Arena/ArenaAttackSkill.cs#L46) 메서드에서 공격 스킬의 명중 여부를 얻습니다: `target.IsHit(caster)`
- 위의 `IsHit` 메서드는 [Nekoyume.Model.ArenaCharacter.IsHit(ArenaCharacter)](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Model/Character/ArenaCharacter.cs#L930)를 가리킵니다.
- 아레나에서의 명중 로직을 간단하게 살펴 본다면:
   - 공격자가 집중 버프([Nekoyume.Model.Buff.Focus](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Model/Buff/Focus.cs))의 효과를 얻고 있다면 100% 명중합니다.
      - 그렇지 않다면 [Nekoyume.Battle.HitHelper.IsHitWithoutLevelCorrection](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Battle/HitHelper.cs#L46) 메서드의 결과에 따라 명중을 처리합니다.

**공격 스킬 데미지**

작성중입니다.

## 보상 {#rewards}

아레나 전투의 보상은 기본 보상과 승리 보상으로 나뉩니다.

**기본 보상**

기본 보상은 아레나 스코어에 따라 수량이 정해지고, 아바타의 레벨에 따라서 종류의 범위가 정해집니다.

- 보상 목록:
    - [Nekoyume.TableData.WeeklyArenaRewardSheet](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/TableData/WeeklyArenaRewardSheet.cs)
    - https://9c-board.nine-chronicles.dev/odin/tablesheet/WeeklyArenaRewardSheet
- 아레나 스코어 별 보상의 수: [Nekoyume.Arena.ArenaHelper.GetRewardCount](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Arena/ArenaHelper.cs#L182) 메서드를 확인하세요.
    | 스코어 | 1000 | 1001~ | 1100~ | 1200~ | 1400~ | 1800~ |
    | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
    | 보상 수 | 1 | 2 | 3 | 4 | 5 | 6 |

**승리 보상(메달)**

아레나 전투에서 승리하면 해당 라운드가 속한 챔피언쉽의 메달을 한 개 받습니다. 자세한 내용은 [Nekoyume.Action.BettleArena](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Action/BattleArena.cs#L446) 액션과 [Nekoyume.Arena.ArenaHelper.GetMedal](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Arena/ArenaHelper.cs#L60) 메서드를 참고하세요.

## 점수 {#score}

라운드에 참가하면 1000점([Nekoyume.Model.Arena.ArenaScore.ArenaScoreDefault](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Model/Arena/ArenaScore.cs#L17))의 스코어를 갖고 시작합니다.<br>
이후에는 전투를 통해서 스코어가 바뀌는데요. 이때 공격자와 방어자의 스코어 차이가 영향을 줍니다. 자세한 내용은 [Nekoyume.Action.BettleArena](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Action/BattleArena.cs#L454) 액션과 [Nekoyume.Arena.ArenaHelper.GetScores](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Arena/ArenaHelper.cs#L160) 메서드를 참고하세요.

## 랭킹 {#ranking}

랭킹은 아레나의 스코어에 따라 결정되는데요. 기억해야할 점으로는 랭킹은 블록체인 상태로 처리하지 않고 외부 서비스를 통해 처리된다는 점입니다.

**동점자 처리**

나인 크로니클의 아레나 랭킹에서는 동점자를 묶어서 낮은 등수로 처리합니다. 예를 들어, 특정 라운드의 최고 점수가 2000점인데 동점자가 세명이라면 이들 모두 3등으로 처리합니다.

## 관련 액션 {#actions}

아레나와 관련한 액션 목록:

- [JoinArena](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Action/JoinArena.cs): 아레나의 특정 라운드에 참가하는 액션입니다.
- [BattleArena](https://github.com/planetarium/lib9c/blob/1.17.3/Lib9c/Action/BattleArena.cs): 아레나의 특정 라운드에 참가한 다른 아바타와 전투하는 액션입니다.
