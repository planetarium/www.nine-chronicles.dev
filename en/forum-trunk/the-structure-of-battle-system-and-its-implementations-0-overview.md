# Preface

Before I was planning about post series on our game system, I found out that many users had different ideas about how the battle system actually works. so I thought this is one of our players' most wanted subjects to be demystified. So in this series, we will be going to talk about how our battle system is planned and designed, and try to compare it to its actual implementations. 

I don't think you have to know about programming to understand this series, but it will probably help you a lot. even better, if you know how lib9c is structured and works. so, if you haven't already, I suggest you to read my first two posts of 'The Structure of Lib9c and its implementations'. [(0)](https://devforum.nine-chronicles.com/t/the-structure-of-lib9c-and-its-implementations-0-overview/49/4) [(1)](./the-structure-of-lib9c-and-its-implementations-1-event-flow-what-actually-happens-when-the-daily-reward-bar-is-pressed)

I hope that the ultimate goal of this series is for you to fully understand the current battle system and what we tried to deliver, and furthermore then just play strategically, suggest how to improve it more interestingly, and make it happen with your contribution.

# Alright, what do we have here?

While we're going to discuss about the world stage, arena, and world boss in that order, we need to start with the definition of the underlying components of these systems. So, this overview might be looks like saying "Alright folks before you run you definitely should check your feet are still attached there" to the high-level players, but we need somewhere to begin with, don't we? I'd like to cover the basic system components (stats, wave, turn, correlation between item and stats) first, and their related tables (about how tables generally work will be written on the lib9c side), skill (and its cooldown), hit rate, damage, buff, spell. Then we will discuss how all of this works in combination.

Ah, also It seems inevitable to explain the item while talking about the battle system, but we will deal with the items as a separate series and explain them to the minimum required by the battle system. I think it'll be too long and complicated for this series if we cover that together.

# Won't you start already?

Okay, okay. 

# Overview

# Components of the Battle System

## Character

In the beginning, there's a **Player** (avatar) and an **Enemy** (monster). they actually share very same attributes together, so let's call them **Characters** from now on. character is a combination of '**Game Statistics**' and '**Skills**', which causes a series of '**Events**', which changes their '**State**'.

TL;DR, your avatar fights with the monster, and its result depends on you and your monster's stats and skills used in the process. 
 
They share following attributes:
- State
    - Enter/Exit (limited usage on boss effects)
    - Move
    - Wait
    - Attack
    - Take Attack
    - Dead
- Base Statistics.
    - HP : Health Point
    - ATK : Attack Point
    - DEF : Defense Point
    - CRI : Base Critical Probability.
    - HIT : Base Attack Success Probability.
    - SPD : **Attack 'Priority' Factor**[^1]
- Statistics Level Factor
- Skills (Including NormalAttack)
- Buffs & Debuff
- Damage Calculation
    - Skill Proc Rate
    - Crit Proc Rate
- Size
- Attack Range (only used for visual effect)
- Run Speed (only used for visual effect)

You may have been surprised to find out that monsters and players are almost the same. They even share the same datasheet. (https://github.com/planetarium/lib9c/blob/development/Lib9c/TableCSV/Character/CharacterSheet.csv) 

Of course, they have differences too. For example, monsters don't have exp or equipment data that the player has, on the other hand, despite the player having no element by default, most of the monsters have their designated elemental types used on damage calculation when you're using elemental weapons or wearing elemental armor. you can find out monster's defined elemental type on `CharacterSheet.csv`.

## World - Stage - Wave

- [Each World has n Stages.](https://github.com/planetarium/lib9c/blob/07f63aa5376bedabab8650e16744af77caa8db6e/Lib9c/TableCSV/WorldAndStage/WorldSheet.csv)
- [Each Stages has n Waves.](https://github.com/planetarium/lib9c/blob/07f63aa5376bedabab8650e16744af77caa8db6e/Lib9c/TableCSV/WorldAndStage/StageSheet.csv)
- [Each Waves has n Monsters.](https://github.com/planetarium/lib9c/blob/development/Lib9c/TableCSV/WorldAndStage/StageWaveSheet.csv)
    - Single Wave can be configured with 4 different monsters maximum.
    - Single Wave can contain multiple same monsters (non-limited)
    - For example, In a single wave,
       - O 2 monster A, 
       - O 5 monster A, 
       - O 7 monster A and 5 monster B
       - X *1 A, 1 B, 1 C, 1 D, 1 E monsters.*

## Simulator

So, now we have player, monster, stage and wave data on what monsters are going to spawn. now, what we need to is battle, isn't it? well, there are **Simulators** for that. and this might be surprising to some users, all your fight happening during the battle is pre-calculated before you enters to stage, Whether you can clear the stage is already determined the moment you finish loading the stage.

**`HackAndSlash`**, what we call this **Action**, is executed during the world stage loading, this action simulates all the skills and spells casted, Stats deviation, buff and debuff, which dealt damage to which, in which order. **Everything per Event**, and records them into **BattleStatus** model. actually, rewards are also given (or not given) during the execution of this action.

So, after loading finished, `9c-unity` just replays that already simulated battle process record into visual. quite shocking, isn't it?

WorldBoss and Arena also follow this pattern. we will discuss different simulators later.

## Summary

So the basic flow of battle is like this. 

1. You consume your AP or Ticket.
2. Loading Starts.
3. your HackAndSlash (or RankingBattle) action is sent.
4. Blockchain does Magical Blockchainy things (I already explained how Actions are executed in [here](./the-structure-of-lib9c-and-its-implementations-1-event-flow-what-actually-happens-when-the-daily-reward-bar-is-pressed))
5. During that Simulator Simulates how what will happen and records into BattleStatus.
6. `9c-unity` replays battle and it's result.

On next post, we will going to talk about how skills and it's cooldown applied to battle.

[^1]: Applying SPD calculation is actually pretty complicated rather than just simple percentage calculation/comparison. In my perspective, It's more close to priority rather than attack rate, so we define this way and move along for now.
