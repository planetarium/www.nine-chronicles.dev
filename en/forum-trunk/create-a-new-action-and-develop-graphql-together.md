> :bulb: This article was written based on NineChronicles.Headless version v100330-1.[^1]

Let's develop!

## Clone lib9c and NineChronicles.Headless repositories

NineChronicles.Headless contains lib9c as submodule so you can choose this instead of separate `lib9c` repo.

Clone `lib9c`.

```bash
git clone https://github.com/planetarium/lib9c.git
cd lib9c
git branch development
git submodule update --init --recursive
```

Clone `NineChronicles.Headless`.

```bash
git clone https://github.com/planetarium/NineChronicles.Headless.git
cd NineChronicles.Headless
git branch development
git submodule update --init --recursive
```

## Create a new action in lib9c

- Create a new branch(e.g., `feature/add-new-action`) and checkout.
- Open `lib9c` solution with your IDE(e.g., Visual Studio Code, Rider).

We will consider the `Lib9c` and `Lib9c.Tests` projects only.
![Underline Lib9c and Lib9c.Tests projects](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image.png)

First of all, I run unit tests of `Lib9c.Tests`.
![Select "Run Unit Tests" menu](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-1.png)

Create `ChangeAvatarName` script to `Lib9c/Action`.
![Select "Add > Class/Interface" menu](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-2.png)

```cs
namespace Nekoyume.Action
{
    public class ChangeAvatarName
    {
    }
}
```

Attach `Serializable` and `ActionType` attribute.

```cs
[Serializable]
[ActionType("change_avatar_name")]
public class ChangeAvatarName
{
}
```

Inherit `GameAction`.

```cs
using System.Collections.Immutable;
using Bencodex.Types;
using Libplanet.Action;

namespace Nekoyume.Action
{
    [Serializable]
    [ActionType("change_avatar_name")]
    public class ChangeAvatarName : GameAction
    {
        protected override IImmutableDictionary<string, IValue> PlainValueInternal { get; }

        protected override void LoadPlainValueInternal(
            IImmutableDictionary<string, IValue> plainValue)
        {
            throw new System.NotImplementedException();
        }

        public override IAccountStateDelta Execute(IActionContext context)
        {
            throw new System.NotImplementedException();
        }
    }
}
```

Add the required members.

```cs
...
using using Libplanet;
...

[Serializable]
[ActionType("change_avatar_name")]
public class ChangeAvatarName : GameAction
{
    public Address TargetAvatarAddr;
    public string Name;

    ...
}
```

Implement `PlainValueInternal` property and `LoadPlainValueInternal()` method.

1. (Recommended) Optimized way.
    ```cs
    ...
    using System.Collections.Generic;
    using Nekoyume.Model.State;
    ...

    [Serializable]
    [ActionType("change_avatar_name")]
    public class ChangeAvatarName : GameAction
    {
        protected override IImmutableDictionary<string, IValue> PlainValueInternal =>
            new Dictionary<string, IValue>
            {
                ["l"] = new List<IValue>
                {
                    TargetAvatarAddr.Serialize(),
                    Name.Serialize()
                }.Serialize(),
            }.ToImmutableDictionary();

        protected override void LoadPlainValueInternal(
            IImmutableDictionary<string, IValue> plainValue)
        {
            var list = (List)plainValue["l"];
            TargetAvatarAddr = list[0].ToAddress();
            Name = list[1].ToDotnetString();
        }

        ...
    }
    ```

2. Readable way.
    ```cs
    ...
    using System.Collections.Generic;
    using Nekoyume.Model.State;
    ...

    [Serializable]
    [ActionType("change_avatar_name")]
    public class ChangeAvatarName : GameAction
    {
        protected override IImmutableDictionary<string, IValue> PlainValueInternal =>
            new Dictionary<string, IValue>
            {
                ["target_avatar_address"] = TargetAvatarAddr.Serialize(),
                ["name"] = Name.Serialize(),
            }.ToImmutableDictionary();

        protected override void LoadPlainValueInternal(
            IImmutableDictionary<string, IValue> plainValue)
        {
            TargetAvatarAddr = plainValue["target_avatar_address"].ToAddress();
            Name = plainValue["name"].ToDotnetString();
        }

        ...
    }
    ```

Implement `Execute()` method.

```cs
[Serializable]
[ActionType("change_avatar_name")]
public class ChangeAvatarName : GameAction
{
    ...

    public override IAccountStateDelta Execute(IActionContext context)
    {
        // Return the previous states when the context in rehearsal.
        if (context.Rehearsal)
        {
            return context.PreviousStates;
        }

        // Validate member fields.
        if (!Regex.IsMatch(Name, GameConfig.AvatarNickNamePattern))
        {
            throw new InvalidNamePatternException(
                $"Aborted as the input name({Name}) does not follow the allowed name pattern.");
        }

        var states = context.PreviousStates;

        // Get the avatar state from the previous states.
        if (!states.TryGetAgentAvatarStatesV2(
                context.Signer,
                TargetAvatarAddr,
                out var agentState,
                out var avatarState,
                out var migrationRequired))
        {
            throw new FailedLoadStateException(
                    "Aborted as the avatar state of the signer was failed to load.");
        }

        // Set name.
        avatarState.name = Name;

        // Update the avatar state to the next states.
        return states.SetState(avatarState.address, avatarState.SerializeV2());
    }
}
```

OK. That's it! Let's write unit tests for this.

Create `ChangeAvatarNameTest` script to `Lib9c.Tests/Action`.

![Select "Add > Class/Interface" menu](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-3.png)

```cs
namespace Lib9c.Tests.Action
{
    public class ChangeAvatarNameTest
    {
    }
}
```

At first, initialize some members in constructor. This logic almost same with other action test code, so feel free to copy and paste it.

```cs
namespace Lib9c.Tests.Action
{
    using Libplanet;
    using Libplanet.Action;
    using Libplanet.Crypto;
    using Nekoyume;
    using Nekoyume.Action;
    using Nekoyume.Model.State;
    using Nekoyume.TableData;
    using static SerializeKeys;

    public class ChangeAvatarNameTest
    {
        private readonly IAccountStateDelta _initialStates;
        private readonly TableSheets _tableSheets;
        private readonly Address _agentAddress;
        private readonly Address _avatarAddress;

        public ChangeAvatarNameTest()
        {
            _initialStates = new State();
            var sheets = TableSheetsImporter.ImportSheets();
            foreach (var (key, value) in sheets)
            {
                _initialStates = _initialStates
                    .SetState(Addresses.TableSheet.Derive(key), value.Serialize());
            }

            _tableSheets = new TableSheets(sheets);

            _agentAddress = new PrivateKey().ToAddress();
            var agentState = new AgentState(_agentAddress);

            _avatarAddress = _agentAddress.Derive("avatar");
            agentState.avatarAddresses.Add(0, _avatarAddress);
            var inventoryAddr = _avatarAddress.Derive(LegacyInventoryKey);
            var worldInformationAddr = _avatarAddress.Derive(LegacyWorldInformationKey);
            var questListAddr = _avatarAddress.Derive(LegacyQuestListKey);

            var gameConfigState = new GameConfigState(sheets[nameof(GameConfigSheet)]);
            var avatarState = new AvatarState(
                _avatarAddress,
                _agentAddress,
                0,
                _tableSheets.GetAvatarSheets(),
                gameConfigState,
                new PrivateKey().ToAddress(),
                "Avatar0"
            );

            _initialStates = _initialStates
                .SetState(_agentAddress, agentState.Serialize())
                .SetState(_avatarAddress, avatarState.SerializeV2())
                .SetState(inventoryAddr, avatarState.inventory.Serialize())
                .SetState(worldInformationAddr, avatarState.worldInformation.Serialize())
                .SetState(questListAddr, avatarState.questList.Serialize())
                .SetState(gameConfigState.address, gameConfigState.Serialize());

            for (var i = 0; i < GameConfig.SlotCount; i++)
            {
                var addr = CombinationSlotState.DeriveAddress(_avatarAddress, i);
                const int unlock = GameConfig.RequireClearedStageLevel.CombinationEquipmentAction;
                _initialStates = _initialStates.SetState(
                    addr,
                    new CombinationSlotState(addr, unlock).Serialize());
            }
        }
    }
}
```

Now we test action's `Execute()` method.

```cs
public class ChangeAvatarNameTest
{
    ...

    [Fact]
    public void Execute()
    {
        // Create action.
        var action = new ChangeAvatarName
        {
            TargetAvatarAddr = _avatarAddress,
            Name = "Joy",
        };

        // Execute action.
        var nextStates = action.Execute(new ActionContext
        {
            PreviousStates = _initialStates,
            Signer = _agentAddress,
            Rehearsal = false,
        });

        // Check next states.
        Assert.Equal("Joy", nextStates.GetAvatarState(_avatarAddress).name);
    }
}
```

How is it? Simple, right?
Now let's raise most exceptions that can be raised from this action, not just on success.

```cs
public class ChangeAvatarNameTest
{
    ...

    [Fact]
    public void Execute_Success()
    {
        Execute(_initialStates, _avatarAddress, "Joy");
    }

    [Fact]
    public void Execute_Throw_AgentStateNotContainsAvatarAddressException()
    {
        var invalidAddr = new PrivateKey().ToAddress();
        Assert.Throws<AgentStateNotContainsAvatarAddressException>(() =>
            Execute(_initialStates, invalidAddr, "Joy"));
    }

    [Theory]
    [InlineData("J")]
    [InlineData("Joy!")]
    [InlineData("J o y")]
    public void Execute_Throw_InvalidNamePatternException(string name)
    {
        Assert.Throws<InvalidNamePatternException>(() =>
            Execute(_initialStates, _avatarAddress, name));
    }

    private void Execute(
        IAccountStateDelta previousStates,
        Address targetAvatarAddr,
        string name)
    {
        // Create action.
        var action = new ChangeAvatarName
        {
            TargetAvatarAddr = targetAvatarAddr,
            Name = name,
        };

        // Execute action.
        var nextStates = action.Execute(new ActionContext
        {
            PreviousStates = previousStates,
            Signer = _agentAddress,
            Rehearsal = false,
        });

        // Check next states.
        var avatarState = nextStates.GetAvatarState(_avatarAddress);
        Assert.Equal(targetAvatarAddr, avatarState.address);
        Assert.Equal(name, avatarState.name);
    }
}
```

As you can see, reusing the `Execute()` method simplifies the entire code.

Finally, add the newly created action type to the action serialization/deserialization test case.
The test method is `ActionEvaluationTest.Serialize_With_MessagePack()`.
![Guide Lib9c.Tests > Action > ActionEvaluationTest](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-4.png)

And add `ChangeAvatarName` case to `ActionEvaluationTest.GetType()` method.
![Select "ChangeAvatarName" case in "ActionEvaluationTest.GetType()" method](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-5.png)

As we finish developing lib9c, I create [a pull request](https://github.com/planetarium/lib9c/pull/1569) to [the remote repository](https://github.com/planetarium/lib9c).

## Develop graphQL in NineChronicles.Headless

- Create a new branch(e.g., `feature/add-new-action-query`) and checkout.
- Open `NineChronicles.Headless.Executable` solution with your IDE.

We will consider the `NineChronicles.Headless` and `NineChronicles.Headless.Tests` projects only.
![Select projects](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-6.png)

Like `lib9c`, I run unit tests of `NineChronicles.Headless.Tests`.
![Select "Run Unit Tests" menu](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-7.png)

Write `changeAvatarName` action query to the constructor of `ActionQuery`.
![Guide writing position of "changeAvatarName" action query in "ActionQuery"](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-8.png)

Below is real code. This action query is make a `ChangeAvatarName` action. So it's name is `changeAvatarName`.

```cs
Field<NonNullGraphType<ByteStringType>>(
    "changeAvatarName",
    arguments: new QueryArguments(),
    resolve: context => throw new NotImplementedException());
```

The `ChangeAvatarName` action requires `Address TargetAvatarAddr` and `string Name` arguments. So apply it.

```cs
Field<NonNullGraphType<ByteStringType>>(
    "changeAvatarName",
    arguments: new QueryArguments(
        new QueryArgument<NonNullGraphType<AddressType>>
        {
            Name = "targetAvatarAddr",
            Description = "The avatar address to change name."
        },
        new QueryArgument<NonNullGraphType<StringGraphType>>
        {
            Name = "name",
            Description = "The name to change.(2~20 characters)"
        }),
    resolve: context => throw new NotImplementedException());
```

At last, complete the `resolve` part.

```cs
Field<NonNullGraphType<ByteStringType>>(
    "changeAvatarName",
    arguments: new QueryArguments(
        new QueryArgument<NonNullGraphType<AddressType>>
        {
            Name = "targetAvatarAddr",
            Description = "The avatar address to change name."
        },
        new QueryArgument<NonNullGraphType<StringGraphType>>
        {
            Name = "name",
            Description = "The name to change.(2~20 characters only numbers and alphabets)"
        }),
    resolve: context =>
    {
        var targetAvatarAddr = context.GetArgument<Address>("targetAvatarAddr");
        var name = context.GetArgument<string>("name");
        if (!Regex.IsMatch(name, GameConfig.AvatarNickNamePattern))
        {
            throw new ExecutionError(
                $"Invalid name({name}): 2~20 characters only numbers and alphabets.");
        }

        var action = new ChangeAvatarName
        {
            TargetAvatarAddr = targetAvatarAddr,
            Name = name,
        };
        return Encode(context, action);
    });
```

Ok.. we made a `changeAvatarName` action query. Now let's write unit tests!
Create `ChangeAvatarName()` method to `NineChronicles.Headless.Tests/GraphTypes/ActionQueryTest`.
![Guide position of test method](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-9.png)

Below is the unit test.

```cs
[Theory]
[InlineData("", false)]
[InlineData("J", false)]
[InlineData("JJ", true)]
[InlineData("J ", false)]
[InlineData("J!", false)]
[InlineData("01234567890123456789", true)]
[InlineData("012345678901234567890", false)]
public async Task ChangeAvatarName(
    string name,
    bool errorsShouldBeNull)
{
    // Make a query.
    var targetAvatarAddr = new PrivateKey().ToAddress();
    var query = $@"{{
        changeAvatarName(
            targetAvatarAddr: ""{targetAvatarAddr}"",
            name: ""{name}""
        )
    }}";

    // Execute the query.
    var queryResult = await ExecuteQueryAsync<ActionQuery>(
        query,
        standaloneContext: _standaloneContext);

    // Assert.
    if (errorsShouldBeNull)
    {
        Assert.Null(queryResult.Errors);
    }
    else
    {
        Assert.NotNull(queryResult.Errors);
        return;
    }

    var data = (Dictionary<string, object>)((ExecutionNode)queryResult.Data!).ToValue()!;
    var plainValue = _codec.Decode(ByteUtil.ParseHex((string)data["changeAvatarName"]));
    Assert.IsType<Dictionary>(plainValue);
    var polymorphicAction = DeserializeNCAction(plainValue);
    var action = Assert.IsType<ChangeAvatarName>(polymorphicAction.InnerAction);
    Assert.Equal(targetAvatarAddr, action.TargetAvatarAddr);
    Assert.Equal(name, action.Name);
}
```

I also created [a pull request](https://github.com/planetarium/NineChronicles.Headless/pull/1761) for this.

## Test the query in playground

In this article, I'll use a app settings file. There are several **appsettings.json** files in the `NineChronicles.Headless.Executable` project.
![Select the app settings files](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-10.png)

I copy the `appsettings.mainnet.json` to `appsettings.mainnet.single.json`. And I add the `StorePath` option as I want to use.
![Select the "StorePath"](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-11.png)

And I edit the "PeerStrings" to be empty.

- before
    ![Select the "PeerStrings" in "appsetgins.mainnet.single.json"](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-12.png)

- after
    ![alt text](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-13.png)

And open the terminal, and go to `NineChronicles.Headless.Executable` project. And run this project with the `appsettings.mainnet.single.json` file.

```bash
$ cd ./NineChronicles.Headless.Executable
$ pwd
~/NineChronicles.Headless/NineChronicles.Headless.Executable
$ dotnet run -- -C appsettings.mainnet.single.json
....
```

You can refer [README](https://github.com/planetarium/NineChronicles.Headless#use-appsettingsnetworkjson-to-provide-cli-options) in repo.

OK... now we can connect to graphQL playground. Open your web browser and connect to `http://localhost:31280/ui/playground`.

Click the "DOCS" button.
![Point the "DOCS" button](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-14.png)

You can search the `changeAvatarName` that we developed above.
![Search the "changeAvatarName" query](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-15.png)

Now we type the query and click the play button, the result data will be display in right side.
![Guide the querying flow](/images/en/forum-trunk/create-a-new-action-and-develop-graphql-together/image-16.png)

That's it! Thank you for follow this article. Have fun!

[^1]: [lib9c:v100330](https://www.github.com/planetarium/lib9c/tree/v100330), [NineChronicles.Headless:v100330-1](https://www.github.com/planetarium/NineChronicles.Headless/tree/v100330-1)
