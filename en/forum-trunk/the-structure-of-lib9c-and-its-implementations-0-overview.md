# Prerequisite
Hello! if you're reading this, you must be interested in our under-the-hood. this series is perfect for a basic understanding of the inner structure of Nine Chronicles and how it's programmed. but before getting into all the nooks and crannies, we're going to look into this project's source code structure, also we will focus on where's this project's position in between libplanet and Nine Chronicles Unity, and finally, we will introduce its basic data flow, to find out how lib9c interacts with other projects.

# What is Lib9c?
First, let's see our description of repository.

> Lib9c is a library that contains key implementations of [Nine Chronicles](https://nine-chronicles.com), a decentralized RPG developed with [Libplanet](https://libplanet.io). Lib9c includes Nine Chronicle's key features like in-game decisions and data models, which can be used to implement game core capabilities.

In this series, to avoid confusion, we will refer "*Nine Chronicles*" to the entire game and the blockchain attached to it, and since the repository with the name "*[NineChronicles](https://github.com/planetarium/NineChronicles)*" contains the Unity frontend *and* lib9c. we will call it "*9c-unity*" when we refer to the non-lib9c part of the game.

So, what's is lib9c? it's a library that contains fundamental in-game logic, data model, and interface with libplanet, which is handling all blockchain-related processings. so, we can say 9c-unity is a user interface. if 9c-unity decides how these data are represented to user, lib9c actually executes its logic and interacts with libplanet to access the blockchain.

It originally resided inside of 9c-unity's `Script` folder, but as the game logic gets bigger, we decided to separate them as an independent library.

We use lib9c to build the "9c-unity", and "headless node" of it. headless node usually resides inside of 9c-launcher, and the relation between these entities can be found in [Nine Chronicles service and repository structure](https://devforum.nine-chronicles.com/t/nine-chronicles-service-and-repository-structure/31).

# Project Folder Structure and Summary
---
https://github.com/planetarium/lib9c/tree/development/Lib9c

```md
Lib9c
├── **Action** // Mostly Implementations of [IAction](https://docs.libplanet.io/0.41.1/api/Libplanet.Action.IAction.html) from libplanet. Extensions and Exceptions are mixed in here.
├── **Arena** // Arena related helper/simulator logic, to be moved.
├── **Battle** // Battle related helper/simulator logic, to be moved.
├── **Exceptions** // We're planning to move and separate
├── **Extensions** // Exceptions and Extensions in Action to here.
├── **Formatters** // Data formatters
├── **Helper** // Helper logics that are difficult to categorize.
├── **Model** // **Object-oriented types, interfaces, logic implementations, data models**
│   ├── **Arena**
│   ├── **BattleStatus** // Record model of all events that happened during the battle
│   │   └── Arena // Arena-specific record model
│   ├── **Buff**  
│   ├── **Character**
│   ├── **Elemental**
│   ├── **EnumType**
│   ├── **Event**
│   ├── **Item**
│   ├── **Mail**
│   ├── **Order**
│   ├── **Quest**
│   ├── **Skill**
│   │   └── **Arena**
│   ├── **Stat**
│   └── **State**
├── **Policy** // Policies on how blockchain is going to be handled by libplanet 
├── **Renderer** // Implementations of [IActionRenderer](https://docs.libplanet.io/0.41.1/api/Libplanet.Blockchain.Renderers.IActionRenderer-1.html) and [IRenderer](https://docs.libplanet.io/0.41.1/api/Libplanet.Blockchain.Renderers.IRenderer-1.html), 
│   Used for listening state changes on a blockchain, and render it's action accordingly.
├── **TableCSV** // CSV table used in corresponding subject. in-game constants reside here.
│   ├── **Arena**
│   ├── **Character**
│   ├── **Cost**
│   ├── **Crystal**
│   ├── **Event**
│   ├── **Item**
│   ├── **Quest**
│   ├── **Skill**
│   ├── **WorldAndStage**
│   └── **WorldBoss**
└── **TableData** // Implementations of the reader of corresponding table data.
    ├── **Character**
    ├── **Cost**
    ├── **Crystal**
    ├── **Event**
    ├── **Item**
    ├── **Quest**
    ├── **Skill**
    └── **WorldAndStage**
```
---

- Currently, Lib9c codebase resides domain-centric and model-centric design together, and explicit consensus has not yet been settled between our developers, so contributors can choose any convention they want.
- In general, especially in `Action` folder, if there's a series of source codes with a suffixed number,  **NUMBERLESS ONE IS ALMOST ALWAYS LATEST, CURRENTLY USED ONE.**
**(i.e. HackAndSlash17 < HackAndSlash, ArenaSimulator2 < ArenaSimulator)**
There are several reasons for this convention, but for actions, it's related with the traits of blockchain, to put it simply, we need previous versions of actions to execute in order to validate blocks from the past.
- Most of the "pure" in-game logic which does not depend on libplanet (blockchain) or 9c-unity, is implemented in `Model`.
- Most of the in-game numeric data, are specified in `TableCSV`. we also read CSV tables from specific addresses in blockchain, but that's a story for another time.
