# Foreword

As a programmer, I'm a great supporter of "run before you walk." So before we jump into the contents of the lib9c and formally introduce them, I thought It might be nice to just look into how one of the most simple feature in this game works, to get the basic gist of the mechanics between 9c-unity, lib9c, and libplanet, So, let's assume we pressed the daily reward bar in-game for example.

![alt text](/images/en/forum-trunk/the-structure-of-lib9c-and-its-implementations-1-event-flow-what-actually-happens-when-the-daily-reward-bar-is-pressed/image.png)

This cute little fella.

# In User Perspective

it goes like this.
`Click -> Prosperity Meter Zeros, AP bar waits -> Full AP bar appears`
Simple! isn't it?

# It isnt.

# In Program Perspective

## 9c-unity - UI Level

Then. let's start with 9c-unity's corresponding UI module code.
https://github.com/planetarium/NineChronicles/blob/development/nekoyume/Assets/_Scripts/UI/Module/DailyBonus.cs

```cs
public void RequestDailyReward()
{
  if (!_isFull)
  {
    return;
  }
  if (actionPoint != null && actionPoint.NowCharging)
  {
    OneLineSystem.Push(
      MailType.System,
      L10nManager.Localize("UI_CHARGING_AP"),
      NotificationCell.NotificationType.Information);
  }
  else if (States.Instance.CurrentAvatarState.actionPoint > 0)
  {
    var confirm = Widget.Find<ConfirmPopup>();
    confirm.Show("UI_CONFIRM", "UI_AP_REFILL_CONFIRM_CONTENT");
    confirm.CloseCallback = result =>
    {
      if (result == ConfirmResult.No)
      {
        return;
      }
      GetDailyReward();
    };
  }
  else
  {
      GetDailyReward();
  }
}
```

- We first check if Prosperity Meter is full. if not, returns.
- if AP is not null and AP is charging, system notifies "Charging AP...".
- else if current AP is larger than 0, system notifies "You still have some action points remaining. Do you really want to recharge your action points now?".
  - if user select "yes", execute `GetDailyReward()` function.
-  if AP is not charging and 0, execute `GetDailyReward()` function as well.

```cs
private void GetDailyReward()
{
  NotificationSystem.Push(
    MailType.System,
    L10nManager.Localize("UI_RECEIVING_DAILY_REWARD"),
    NotificationCell.NotificationType.Information);
  
  Game.Game.instance.ActionManager.DailyReward().Subscribe();
  var address = States.Instance.CurrentAvatarState.address;
  if (GameConfigStateSubject.ActionPointState.ContainsKey(address))
  {
    GameConfigStateSubject.ActionPointState.Remove(address);
  }
  GameConfigStateSubject.ActionPointState.Add(address, true);
  StartCoroutine(CoGetDailyRewardAnimation());
}
```

- We first notify the user "Refilling the Action Power.. Once complete, Action Power will be filled.".
- It's hard to explain how `ActionManager.DailyReward()` executes and what's up with `GameConfigStateSubject` now, so we will look into `ActionManager.DailyReward()` method.
- We will omit the daily reward animation part.

## 9c-unity - Action Level

https://github.com/planetarium/NineChronicles/blob/development/nekoyume/Assets/_Scripts/BlockChain/ActionManager.cs

```cs
public IObservable<ActionBase.ActionEvaluation<DailyReward>> DailyReward()
{
  var blockCount = Game.Game.instance.Agent.BlockIndex -
    States.Instance.CurrentAvatarState.dailyRewardReceivedIndex + 1;
  LocalLayerModifier.IncreaseAvatarDailyRewardReceivedIndex(
    States.Instance.CurrentAvatarState.address,
    blockCount);

  var action = new DailyReward
  {
    avatarAddress = States.Instance.CurrentAvatarState.address,
  };

  action.PayCost(Game.Game.instance.Agent, States.Instance, TableSheets.Instance);
  LocalLayerActions.Instance.Register(action.Id, action.PayCost, _agent.BlockIndex);
  ProcessAction(action);
  
  return _agent.ActionRenderer.EveryRender<DailyReward>()
    .Timeout(ActionTimeout)
    .Where(eval => eval.Action.Id.Equals(action.Id))
    .First()
    .ObserveOnMainThread()
    .DoOnError(e => throw HandleException(action.Id, e));
}
```

- `ActionManager`'s job is basically three things.
    1. Create Specified `Action` accordingly,
    2. Put Created Action into `_agent` (we will talk about `agent` later)
    3. Return **Observable Subject** to it's 'Created Action's Render'
- in the first line of code, we update user's latest daily reward received index to current block index.
- **And finally. we created instance of `DailyReward`, which is `Action` implemented in lib9c. we're going to explain this on the lib9c side.**
- you can ignore `action.PayCost` for now. it does nothing for now.
- In the middle, we 'Processes' action through `ProcessAction(action)`. you must keep in mind action is not **'executed'** yet. we can see that from code of `ProcessAction()`

```cs
private void ProcessAction\<T>(T gameAction) where T : GameAction
{
    var actionType = gameAction.GetActionTypeAttribute();
    Debug.Log($"[{nameof(ActionManager)}] {nameof(ProcessAction)}() called. \"{actionType.TypeIdentifier}\"");
    
    _agent.EnqueueAction(gameAction); // Enqueue in Action Queue, not directly executed.
    _actionEnqueuedDateTimes[gameAction.Id] = DateTime.Now;
}
```

- At last, `DailyReward()` function returns `_agent.ActionRenderer.EveryRender<DailyReward>`, which is `IObservable<ActionBase.ActionEvaluation<DailyReward>>`, **Observable Subject that Notifies on Every DailyReward Action's Render.** and what renders the Action? YES. `ActionRenderer`. it's implemented in lib9c!
- If you know the design patterns of computer programs, simply put this is all part of the [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern) model. you know what I mean. (wink)
- ~~Also some of you might think I'm mad and just connecting nonsensical words together at ths point. but trust me. it's all connected.~~

## 9c-unity - TX, Blockchain Level

`_agent`, which is global `Agent` (Or `RPCAgent` if you're using RPC.) in `Game.Game.instance.Agent` is actually the module, sum of blockchain node-related logic, it's very, very close to libplanet side, and about a thousand lines long. so, we are not going to explain all the decentralized-blockchain thing. We will going to handle this material on its own post. On the other hand, there're somethings you have to know at this point.

- We have this `BlockChain<NCAction>` to store blocks, but since it's too big to store in memory, we use thing called local store (IStore) to save it. it could be RocksDB, or else, but It stores data in filesystem.
- **Execute** action and **Evaluate** action and **Render** action all means completely different things.
  - **Evaluation** only calculates the result of the Action, not applied.
  - **Execute** not only calculates the result of the Action, it applies to local state (store)
  - **Render** is the process of reflecting the results of the evaluated action in the view.
- You can consider `Agent` as a singleton instance through the single instance of the game.
- `Agent` handles Render and Unrender of every action with `BlockRenderHandler`, `ActionRenderHandler`, `ActionUnrenderHandler`. which owns instances of `BlockRenderer` and `ActionRenderer`.

https://github.com/planetarium/NineChronicles/blob/8a971b2fa839ce89cfb5c0ccbc9535c6c6335f37/nekoyume/Assets/_Scripts/BlockChain/Agent.cs

```cs
private IEnumerator CoTxProcessor()
{
  while (true)
  {
    yield return new WaitForSeconds(TxProcessInterval);
    var actions = new List<NCAction>();
    Debug.LogFormat("Try Dequeue Actions. Total Count: {0}", _queuedActions.Count);
    while (_queuedActions.TryDequeue(out NCAction action))
    {
      actions.Add(action);
      Debug.LogFormat("Remain Queued Actions Count: {0}", _queuedActions.Count);
    }
    Debug.LogFormat("Finish Dequeue Actions.");
    if (actions.Any())
    {
      var task = Task.Run(() => MakeTransaction(actions));
      yield return new WaitUntil(() => task.IsCompleted);
      foreach (var action in actions)
      {
        var ga = (GameAction)action.InnerAction;
        _transactions.TryAdd(ga.Id, task.Result.Id);
      }
    }
  }
}
```

1. your actions are enqueued in `ConcurrentQueue<NCAction> _queuedActions` in `Agent`.
2. In coroutine `CoTxProcessor()`, In 3 second interval, your `Agent` will try to dequeue all actions in `_queuedActions` to `List<NCAction> actions`, and give them as argument of `MakeTransaction()`.

## libplanet - Blockchain Level

From now it goes something like this.

1. [`MakeTransaction()` calls `MakeTransaction()` of libplanet's Blockchain\<T>. it receives Agent's private key and actions, and returns signed `Transaction<NCAction>` how it's signed is in libplanet level.](https://github.com/planetarium/NineChronicles/blob/8a971b2fa839ce89cfb5c0ccbc9535c6c6335f37/nekoyume/Assets/_Scripts/BlockChain/Agent.cs#L940)
2. Broadcast your `Transaction<NCAction>` to everyone. other nodes, miner, etc via Swarm. we will omit about Swarm for now.
3. [At some point, your transaction will be broadcasted to miner node, and your `TX` will be staged; listed on `Txs' to be inserted in block`](https://github.com/planetarium/libplanet/blob/52bea47f401d3f32c01b7c75acb0f1d0743a747e/Libplanet.Net/TxCompletion.cs#L98)
4. [Miner mines a new block including your transaction.](https://github.com/planetarium/libplanet/blob/964ea424cfeef60034d1c7a514a45cd8b3b39909/Libplanet/Blockchain/BlockChain.MineBlock.cs#L93)
> We're currently moving from POW(Proof of Work) to POS(Proof of Stake). so this part may be updated.
5. During the mining block ([PreEvaluationBlock](https://docs.libplanet.io/0.41.1/api/Libplanet.Blocks.PreEvaluationBlock-1.html)), miner once **Evaluates Action** through MineBlock - PreEvaluationBlock - ActionEvaluator - EvaluateBlock - EvaluateTxs - EvaluateTx - EvaluateActions
https://github.com/planetarium/libplanet/blob/964ea424cfeef60034d1c7a514a45cd8b3b39909/Libplanet/Blockchain/BlockChain.MineBlock.cs#L194
https://github.com/planetarium/libplanet/blob/964ea424cfeef60034d1c7a514a45cd8b3b39909/Libplanet/Blocks/PreEvaluationBlock.cs#L350
https://github.com/planetarium/libplanet/blob/964ea424cfeef60034d1c7a514a45cd8b3b39909/Libplanet/Action/ActionEvaluator.cs#L80
https://github.com/planetarium/libplanet/blob/964ea424cfeef60034d1c7a514a45cd8b3b39909/Libplanet/Action/ActionEvaluator.cs#L457
https://github.com/planetarium/libplanet/blob/964ea424cfeef60034d1c7a514a45cd8b3b39909/Libplanet/Action/ActionEvaluator.cs#L264
6. And finally Action got [EXECUTED](https://github.com/planetarium/libplanet/blob/964ea424cfeef60034d1c7a514a45cd8b3b39909/Libplanet/Action/ActionEvaluator.cs#L317). ~~it doesn't mean your AP meter recharged yet though.~~
7. if there's no problem, Miner save states, block, tx into local store, and appends block into its blockchain.
8. Miner broadcasts its new block in Bencodex encoded form, and you may receive it and deserialize them.
9. Now, slightly go back to our `Agent`, when `Agent` gets initialized, it gets its own `BlockChain<NCAction>` and `Swarm<NCAction>` that receives new blocks and updates blockchain automatically. these are all implemented on libplanet side. 
https://docs.libplanet.io/0.41.1/api/Libplanet.Net.Swarm-1.html
https://docs.libplanet.io/0.41.1/api/Libplanet.Blockchain.BlockChain-1.html
10. And, [after swarm gets initialized and asynchronously updating blockchain](https://github.com/planetarium/libplanet/blob/2fb6918b7dc433a7d4720a9549f9c0b40363abc4/Libplanet.Net/Swarm.cs#L329), it appends new blocks by [`ConsumeBlockCandidates()`](https://github.com/planetarium/libplanet/blob/2fb6918b7dc433a7d4720a9549f9c0b40363abc4/Libplanet.Net/Swarm.BlockCandidate.cs#L14) - [`BlockCandidateProcess()`](https://github.com/planetarium/libplanet/blob/2fb6918b7dc433a7d4720a9549f9c0b40363abc4/Libplanet.Net/Swarm.BlockCandidate.cs#L36) - [`AppendPreviousBlocks`](https://github.com/planetarium/libplanet/blob/2fb6918b7dc433a7d4720a9549f9c0b40363abc4/Libplanet.Net/Swarm.BlockCandidate.cs#L67) - [`Append()`](https://github.com/planetarium/libplanet/blob/2fb6918b7dc433a7d4720a9549f9c0b40363abc4/Libplanet.Net/Swarm.BlockCandidate.cs#L180) - [`Append() in Libplanet.BlockChain.`](https://github.com/planetarium/libplanet/blob/2fb6918b7dc433a7d4720a9549f9c0b40363abc4/Libplanet/Blockchain/BlockChain.cs#L1073)
11. and during the final append, [`Actions` are Executed.](https://github.com/planetarium/libplanet/blob/2fb6918b7dc433a7d4720a9549f9c0b40363abc4/Libplanet/Blockchain/BlockChain.cs#L1155) from here, we goes same routine as number 7, ActionEvaluator, from EvaluateBlock.   
12. as Action evaluated and if it was valid, we samely save states, block, tx into local store.
13. [And renders block and action accordingly.](https://github.com/planetarium/libplanet/blob/2fb6918b7dc433a7d4720a9549f9c0b40363abc4/Libplanet/Blockchain/BlockChain.cs#L1230) as I wrote earlier, ActionRenderer and BlockRender are scope of lib9c.

## lib9c - Action Level

But first, let's see what we just executed. you remember we were executing `DailyReward`, weren't we? Actions are essential in-game 'actions' that are recorded to blockchain in replayable, executable form. you can find documentation on libplanet's [`IAction`](https://docs.libplanet.io/0.38.0/api/Libplanet.Action.IAction.html) from here. but it's basically like a Foldable IKEA furniture with a self-assembly manual. The Action itself defines which data to hold, and has `PlainValueInternal` and `LoadPlainValueInternal` to how data should be Serialize-Deserialized into Bencodex String to Dictionary, and how it should be processed is defined in `Execute()`. and since 'how should it be processed' is defined on the game, (and everyone have the same Action code) we only have to record what action it is, and data serialized accordingly. however since the whole `daily_reward6` logic is attached with edge case handlers and such, I will provide a simplified version of it. if you want to see original code, here it is.
 https://github.com/planetarium/lib9c/blob/development/Lib9c/Action/DailyReward.cs

```cs
namespace Nekoyume.Action
{
  [Serializable]
  [ActionType("daily_reward6")]
  public class DailyReward : GameAction
  {
    public Address avatarAddress;
    public const string AvatarAddressKey = "a";
    public override IAccountStateDelta Execute(IActionContext context)
    {
      var states = context.PreviousStates;
      var inventoryAddress = avatarAddress.Derive(LegacyInventoryKey);
      var worldInformationAddress = avatarAddress.Derive(LegacyWorldInformationKey);
      var questListAddress = avatarAddress.Derive(LegacyQuestListKey);
       
      var addressesHex = GetSignerAndOtherAddressesHex(context, avatarAddress);
       
      var gameConfigState = states.GetGameConfigState();
      
       
      if (context.BlockIndex < avatarState.dailyRewardReceivedIndex + gameConfigState.DailyRewardInterval)
      {
        var sb = new StringBuilder()
          .Append($"{addressesHex}Not enough block index to receive daily rewards.")
          .Append(
            $" Expected: Equals or greater than ({avatarState.dailyRewardReceivedIndex + gameConfigState.DailyRewardInterval}).")
          .Append($" Actual: ({context.BlockIndex})");
        throw new RequiredBlockIndexException(sb.ToString());
      }
      avatarState.dailyRewardReceivedIndex = context.BlockIndex;
      avatarState.actionPoint = gameConfigState.ActionPointMax;
      
      return states
        .SetState(avatarAddress, avatarState.SerializeV2())
        .SetState(inventoryAddress, avatarState.inventory.Serialize())
        .SetState(worldInformationAddress, avatarState.worldInformation.Serialize())
        .SetState(questListAddress, avatarState.questList.Serialize());
    }
     
    protected override IImmutableDictionary<string, IValue> PlainValueInternal => new Dictionary<string, IValue>
    {
      [AvatarAddressKey] = avatarAddress.Serialize(),
    }.ToImmutableDictionary();
    
    protected override void LoadPlainValueInternal(IImmutableDictionary<string, IValue> plainValue)
    {
      avatarAddress = plainValue[AvatarAddressKey].ToAddress();
    }
  }
}
```

Let's try to break into pieces.

First, we need context. you remember we get returned with block from miner, right? so we need to know who was the miner, what was the previous hash? especially, **what was the previous state**? 
So we get them from IActionContext. every action requires its context in order to execute and change states. then what do we need to update? `your avatar's AP gauge` and `last block index you received reward`. 

To do that, we need to provide your avatar address.

```cs
    public Address avatarAddress;
    public const string AvatarAddressKey = "a";    
    protected override IImmutableDictionary<string, IValue> PlainValueInternal => new Dictionary<string, IValue>
    {
      [AvatarAddressKey] = avatarAddress.Serialize(),
    }.ToImmutableDictionary();
    
    protected override void LoadPlainValueInternal(IImmutableDictionary<string, IValue> plainValue)
    {
      avatarAddress = plainValue[AvatarAddressKey].ToAddress();
    }
```

And also to save spaces when we represent your action in Bencodex, we minimally express AvatarAddress' Key as 'a', [these key constants are defined in lib9c.](https://github.com/planetarium/lib9c/blob/development/Lib9c/SerializeKeys.cs) if it's hard to understand, I expressed this action into JSON, it looks like this.

```cs
{
    "type_id": "daily_reward6",
    "values": {
        "a": b\"8ac0dba9a0b92f855a77089eca22d3c5fa51bb09",    
        "id": b\"c5be6745d7974e4297427a71a73cd4e2",
        }
}
```

so, when we deserialize this action, we all can agree on "a" means avatarAddress data. anyway. we deserialized avatarAddress, we also have context, now, let's execute it.

```cs
public override IAccountStateDelta Execute(IActionContext context)
    {
      var states = context.PreviousStates;
      var inventoryAddress = avatarAddress.Derive(LegacyInventoryKey);
      var worldInformationAddress = avatarAddress.Derive(LegacyWorldInformationKey);
      var questListAddress = avatarAddress.Derive(LegacyQuestListKey);
       
      var addressesHex = GetSignerAndOtherAddressesHex(context, avatarAddress);
       
      var gameConfigState = states.GetGameConfigState();
```

First we get states from context, and Derive related Address too. `gameConfigState` is a [form of state that stores user's interval related values](https://github.com/planetarium/lib9c/blob/development/Lib9c/Model/State/GameConfigState.cs), including DailyRewardInterval.

```cs
if (context.BlockIndex < avatarState.dailyRewardReceivedIndex + gameConfigState.DailyRewardInterval)
      {
        var sb = new StringBuilder()
          .Append($"{addressesHex}Not enough block index to receive daily rewards.")
          .Append(
            $" Expected: Equals or greater than ({avatarState.dailyRewardReceivedIndex + gameConfigState.DailyRewardInterval}).")
          .Append($" Actual: ({context.BlockIndex})");
        throw new RequiredBlockIndexException(sb.ToString());
      }
      avatarState.dailyRewardReceivedIndex = context.BlockIndex;
      avatarState.actionPoint = gameConfigState.ActionPointMax;
```

It checks if your DailyRewardInterval has passed again in action level. so even if you surpass client and send GQL query that executes DailyReward, it won't work unless your interval has passed.
Then, simply manipulate your `avatarState`.  Update block index and fully charge your action point.

```cs
      return states
        .SetState(avatarAddress, avatarState.SerializeV2())
        .SetState(inventoryAddress, avatarState.inventory.Serialize())
        .SetState(worldInformationAddress, avatarState.worldInformation.Serialize())
        .SetState(questListAddress, avatarState.questList.Serialize());
```

and finally action manipulates previous state to current one and returns it. we call this `IAccountStateDelta`, which includes Account's state difference only.
if there was no problem, this state reflected on your local state.

## lib9c - ActionRenderer Level

State has been changed, we need to render it to represent new states. 
[Very Important thing to remember is,](https://docs.libplanet.io/0.41.1/api/Libplanet.Blockchain.Renderers.IActionRenderer-1.html)
> 
> The invocation order of methods for each [Block\<T>](https://docs.libplanet.io/0.41.1/api/Libplanet.Blocks.Block-1.html) are:
> 
> 1. [RenderReorg(Block\<T>, Block\<T>, Block\<T>)](https://docs.libplanet.io/0.41.1/api/Libplanet.Blockchain.Renderers.IRenderer-1.html#Libplanet_Blockchain_Renderers_IRenderer_1_RenderReorg_Libplanet_Blocks_Block__0__Libplanet_Blocks_Block__0__Libplanet_Blocks_Block__0__) (one time)
> 2. [UnrenderAction(IAction, IActionContext, IAccountStateDelta)](https://docs.libplanet.io/0.41.1/api/Libplanet.Blockchain.Renderers.IActionRenderer-1.html#Libplanet_Blockchain_Renderers_IActionRenderer_1_UnrenderAction_Libplanet_Action_IAction_Libplanet_Action_IActionContext_Libplanet_Action_IAccountStateDelta_) & [UnrenderActionError(IAction, IActionContext, Exception)](https://docs.libplanet.io/0.41.1/api/Libplanet.Blockchain.Renderers.IActionRenderer-1.html#Libplanet_Blockchain_Renderers_IActionRenderer_1_UnrenderActionError_Libplanet_Action_IAction_Libplanet_Action_IActionContext_Exception_) (zero or more times)
> 3. [RenderBlock(Block\<T>, Block\<T>)](https://docs.libplanet.io/0.41.1/api/Libplanet.Blockchain.Renderers.IRenderer-1.html#Libplanet_Blockchain_Renderers_IRenderer_1_RenderBlock_Libplanet_Blocks_Block__0__Libplanet_Blocks_Block__0__) (one time)
> 4. [RenderAction(IAction, IActionContext, IAccountStateDelta)](https://docs.libplanet.io/0.41.1/api/Libplanet.Blockchain.Renderers.IActionRenderer-1.html#Libplanet_Blockchain_Renderers_IActionRenderer_1_RenderAction_Libplanet_Action_IAction_Libplanet_Action_IActionContext_Libplanet_Action_IAccountStateDelta_) & [RenderActionError(IAction, IActionContext, Exception)](https://docs.libplanet.io/0.41.1/api/Libplanet.Blockchain.Renderers.IActionRenderer-1.html#Libplanet_Blockchain_Renderers_IActionRenderer_1_RenderActionError_Libplanet_Action_IAction_Libplanet_Action_IActionContext_Exception_) (zero or more times)
> 5. [RenderBlockEnd(Block\<T>, Block\<T>)](https://docs.libplanet.io/0.41.1/api/Libplanet.Blockchain.Renderers.IActionRenderer-1.html#Libplanet_Blockchain_Renderers_IActionRenderer_1_RenderBlockEnd_Libplanet_Blocks_Block__0__Libplanet_Blocks_Block__0__) (one time)
> 6. [RenderReorgEnd(Block\<T>, Block\<T>, Block\<T>)](https://docs.libplanet.io/0.41.1/api/Libplanet.Blockchain.Renderers.IRenderer-1.html#Libplanet_Blockchain_Renderers_IRenderer_1_RenderReorgEnd_Libplanet_Blocks_Block__0__Libplanet_Blocks_Block__0__Libplanet_Blocks_Block__0__) (one time)

This post is going out of hands, so I'm gonna explain about `RenderAction()` only. 

```cs
public void RenderAction(IAction action, IActionContext context, IAccountStateDelta nextStates) =>
    ActionRenderSubject.OnNext(new ActionEvaluation<ActionBase>
    {
        Action = GetActionBase(action),
        Signer = context.Signer,
        BlockIndex = context.BlockIndex,
        OutputStates = nextStates,
        PreviousStates = context.PreviousStates,
        RandomSeed = context.Random.Seed
    });
```

`RenderAction()` simply does one thing. provide updated `ActionEvaluation<ActionBase>` to Observers of ActionRenderSubject.

You know who observes ActionRenderSubject?

That's right! `ActionRenderHandler()` of `Agent` in 9c-unity!

We're finally there!

## 9c-unity - Agent Level

`ActionRenderHandler` in `Agent` first Observes to every action's render, and when specific action renders it execute responses with given `ActionEvaluation<ActionBase>`.

So, response to `DailyReward` render is like this :

```cs
private void ResponseDailyReward(ActionBase.ActionEvaluation<DailyReward> eval)
{
    if (GameConfigStateSubject.ActionPointState.ContainsKey(eval.Action.avatarAddress))
    {
        GameConfigStateSubject.ActionPointState.Remove(eval.Action.avatarAddress);
    }
    if (eval.Exception is null &&
        eval.Action.avatarAddress == States.Instance.CurrentAvatarState.address)
    {
        LocalLayer.Instance.ClearAvatarModifiers<AvatarDailyRewardReceivedIndexModifier>(
            eval.Action.avatarAddress);
        UpdateCurrentAvatarStateAsync(eval).Forget();
        UI.NotificationSystem.Push(
            MailType.System,
            L10nManager.Localize("UI_RECEIVED_DAILY_REWARD"),
            NotificationCell.NotificationType.Notification);
    }
}
```

if `DailyReward` happened, and if it's your address, update current avatar state asynchronously according to it's evaluated state, and push `Received Daily Reward!` message to UI.

## 9c-unity - UI Level, Again.

Now, We returned to `GetDailyReward()` again, and now it totally makes sense! ~~is it?~~

```cs
  Game.Game.instance.ActionManager.DailyReward().Subscribe();
  var address = States.Instance.CurrentAvatarState.address;
  if (GameConfigStateSubject.ActionPointState.ContainsKey(address))
  {
    GameConfigStateSubject.ActionPointState.Remove(address);
  }
  GameConfigStateSubject.ActionPointState.Add(address, true);
  StartCoroutine(CoGetDailyRewardAnimation());
}
```

- `ActionManager.DailyReward()` returns **Observable Subject.** so, we subscribe to it's update.
- `GameConfigState` is a **State** in lib9c, which records specific address' settings including `DailyRewardInterval`. so, `GameConfigStateSubject` is also **Observable Subject** of that **State** and finally `GameConfigStateSubject.ActionPointState` is a `Dict<Address, bool>` that reactively stores if key Address is AP recharged or not in `bool` type value.
- So, We first remove if it has any of our address, then add our address with `true` bool value. 
   - Why we remove them first is, that if we remove former state, we can simply just have to subscribe to `ObserveAdd()`, instead of `ObserveReplace()` too.

## 9c-unity - UI Level, Finally.

https://github.com/planetarium/NineChronicles/blob/development/nekoyume/Assets/_Scripts/UI/Module/ActionPoint.cs

```cs
GameConfigStateSubject.ActionPointState.ObserveAdd().Subscribe(x =>
{
  var address = States.Instance.CurrentAvatarState.address;
  if (x.Key == address)
  {
    Charger(true);
  }
  
}).AddTo(gameObject);

private void Charger(bool isCharging)
{
      loading.SetActive(isCharging);
      text.enabled = !isCharging;
}
```

we can see this `ObserveAdd()` in ActionPoint Gauge's UI module code. you can see we re-check if it's really your address. and if it's true? enable the charger spinner. also, this module subscribes `ReactiveAvatarState.ActionPoint`, which only changes when action really executed and state changes.

```cs
 ReactiveAvatarState.ActionPoint
    .Subscribe(x => SetActionPoint(x, true))
    .AddTo(_disposables);
.
.
private void SetActionPoint(int actionPoint, bool useAnimation)
{
    if (_currentActionPoint == actionPoint)
    {
        return;
    }

    _currentActionPoint = actionPoint;
    sliderAnimator.SetValue(_currentActionPoint, useAnimation);
}
```

so if your ActionPoint actually changes, UI set value to MAX.
Your AP has been recharged.
The End.

## Conclusion

So, now you basically knows how 9c-unity processes UI and every action, how lib9c is involved with action, model, renderers, and even how libplanet handles blockchain! ~~now you became employee of Planetarium~~ I hope you understand what the interaction between these systems feels like. If you have any questions, please leave on reply!

---
The explanation on this post is based on v100290.
