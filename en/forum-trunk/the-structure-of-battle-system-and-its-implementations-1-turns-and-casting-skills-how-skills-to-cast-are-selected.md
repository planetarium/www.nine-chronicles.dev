# Foreword

I originally wrote this post for both developers and players, but during writing, I found out it's very hard to not oversimplificate this for developers while being TMI for players, so I decided to write both abstract (but not super accurate) versions of mechanism with some essential codes in the big picture, and super accurate and full of source code explanation version of mechanism.

Anyway, in this post, we first define what 'turn' actually means, and how each turn is executed. then debunking some of the misconceptions about casting skills, and figuring out the REAL process of casting skills. There are a lot of eye-openers, so don't be too surprised!

# Specifications

# Turn

But first, what is Turn? Turns are very important when it comes to casting skill and calculating the cooldown and duration of the buff, basically doing anything. The basic rule of turn ordering and execution on stage is like this.

 https://github.com/planetarium/lib9c/blob/882c5ff93421e2799e3701482f9a54c8f5ced516/Lib9c/Battle/StageSimulator.cs#L103

0. You and your enemies (Characters) are spawned. (Turn number 0)
1. Enqueue characters in the priority queue, for now, let's just say the priority is based on the **100/SPD value of the entity** (we will focus on SPD later.)
2. Pop the first element from the queue, it could be you or a monster. and execute its **Act**. you can consider this as getting **Turn**.
3. In a single turn, (or act). The following functions are executed.

 https://github.com/planetarium/lib9c/blob/882c5ff93421e2799e3701482f9a54c8f5ced516/Lib9c/Model/Character/CharacterBase.cs#L475
```
if (IsAlive()) #...of course you should be alive.
    {
    ReduceDurationOfBuffs(); # Reduce all duration 1
    ReduceSkillCooldown(); # Reduce all cooldown 1
    UseSkill(); # Skill Cooldown is setted.
    RemoveBuffs(); # if duration ended.
    }
EndTurn();
```
4. Single turn has been executed. (Turn number 1)
4. Prioritize all rest of the characters in the queue by **multiplying 0.6 to priority**, to prevent a single entity with very high SPD from always getting turned.
5. Re-enqueue popped element.
6. Repeats to #2 until you or all enemies die.

So when we call buff sustains 25 turn, or skill cooldown is 7 turn, we're talking about how many times **Act** has happened. we'll talk about attack combos later, but for those who wonder, attack combos don't consume extra turns.

# Casting Skills

So let's ignore what enemies do while their turn, (it's pretty much same as yours) let's focus on our turn. especially on **Using Skill.** There's a lot of misconception on skill casting chance and 'duplicated cooldown'. let's debunk that.

So, in big picture when `UseSkill()` is Executed, there are 3 stages of skill execution.
1. Listing available skills in the current turn (skills you have which is not in cooldown)
2. Decide whether a Non-normal Skill is executed or not
3. If Decided in 2, Decide which Non-normal Skill is going to execute.

## Listing Skills

So. we first list all your 'selectable' skill. which is not currently in cooldown. you must know that **Same Skills on Different Equipment are not Distinguished,** Even if you have 2 of the same skills with the same element in different equipment, the cooldown of those 2 skills is not calculated separately, since they have the same skill ID. (i.e. BOTH ENTERS COOLDOWN) 

Then your second question will be, 'Hey, then how each skill's chances are calculated?' before answering that, **do you know what 'Chance actually means?** Quite complicated, Chance decides both **Probability of Casting Non-Normal Attack**and **Probablity Weight of Skill**. What the heck does that even means? well..

## Normal or Not

It's actually straightforward. In the second stage, the Sum of all your equipment's chances is the probability of a Non-Normal Attack to be cast. why not just say 'Probability of Skill Cast'? well, because the normal attack is also considered as a 'skill'. a default one. so it's wrong to say that way. but it's really awkward to say it every time. so let's agree to call it '[proc](https://wowwiki-archive.fandom.com/wiki/Proc)' like a normal person.

### Example

Weapon : 12%
Armor : 8%
Belt : 8%
Necklace : 8%
Ring : 9%
Ring : 9%
Chance Calculation : 12% + 8% + 8% + 8% + 9% + 9%
Proc : 54%.

Plus, if equipment's skill, let's say weapon. is under cooldown, **proc of weapon skill is considered as 0%, which makes proc 42% temporarily.**, of course, on 'duplicated cooldown' case formally explained, **Both equipment's chances are excluded**.

Now, finally. your question will be, 'Okay, proc = sum of chance. but you didn't answered how probability of each skills are calculated'. The final answer is, **That's ratio of specific skill's chance and total chance**, in short, Weighted.

## Process of Skill Choice

At Last, let's assume with former example 1. you have skills other than NormalAttack, 2. and through 54% of proc, your RNG decided to execute other than NormalAttack. 3. What skills going to proc? In the last skill choosing phase, we just simply list out the skill's proc over the total proc and randomly decide. simply put, your skill proc would be like this at this last phase.

### Example 2

Weapon:  12 / 54 = 22.222222%
Armor : 8 / 54 = 14.814814%
Belt : 8 / 54 = 14.814814%
Necklace :  8 / 54 = 14.814814%
Ring : 9 / 54 = 16.666666%
Ring : 9 / 54 = 16.666666%
Total = ...approximately 100%.

Then we have this very edge case, that when you have same skills on different equipments which have different chances, how does this apply? well, I can safely say you can consider samely as 'merged'. Say, Necklace and Ring have the same skill id, but when skill proc is calculated Necklace 'or' Ring skill could be proc-ed, so its probability is pretty much merged.

Long story short on the same skill in different equipments, it doesn't make you cast skill twice since they share a cooldown, but also they share chances too.

## Conclusion

Well, that's all for how skills are casted on Stage. it's slightly different on Arena, so we will talk about that while comparing codes. also, fact excluded because explaining why escapes the scope of this explanation, but it's fun fact to know that Non-normal skills are all guaranteed to always hit on stage when proc-ed. so, it's whether Normal attack hit or miss OR skills proc. I hope this helps you when planning your equipments. Thanks for reading, and ask any questions if you have any!
