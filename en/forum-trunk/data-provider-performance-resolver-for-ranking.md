# The nature of blockchain

 As you deeply know, Nine Chronicles is the game on blockchain. All user's actions and states are stored in blockchain eternally. This can make Nine Chronicles to characteristic game. On the other hand, the blockchain has significant performance issue: the full scanning.
 The ranking, for example, needs to scan all user's latest state and sort by certain criteria. But the latest block doesn't know latest states for all users and need to seek back. How much blocks do we have to seek backward? To the genesis block eventually. Because `{N-k}th` block cannot guarantees that k blocks contain all states. This kind of operations takes longer time as time goes by.

# The data provider

 But we need all states to sort to make ranking data. To resolve this performance issue, we (planetarium) decided to copy data from blockchain to RDBMS. We can easily save, load, sort data in RDBMS so can make ranking data.
 Like Nine Chronicles and other related projects, the data provider is also open-source project. Please visit [GitHub repository](https://github.com/planetarium/NineChronicles.DataProvider) and feel free to use, modify, raise issue and/or pull request.

# Query ranking data through GraghQL

 Not only saving data, the data provider also has GraphQL endpoint. You can test the GraphQL on [playground](https://api.9c.gg/ui/playground). Using GraghQL, you can get all kinds of ranking data, such as Arena, World Boss. 

## Data provider in action

Let's see what can we do with data provider. I'll not cover everything what we get, just scan in glance. On the [playground](https://api.9c.gg/ui/playground), you can see all the GraqhQL schema. For example, we can get the top three user data of Arena Season 8.

```graphql
query{
  battleArenaRanking(championshipId:2 round:4, limit: 3){
    blockIndex
    ranking
    agentAddress
    avatarAddress
    name
    medalCount
  }
}
```

![alt text](/images/en/forum-trunk/data-provider-performance-resolver-for-ranking/image.png)

As you can see, user named `Dred` was at the first place of latest arena.
I think you could feel weird about the arguments. Each championship has 3 rounds of arena and off-seasons between them. You can get the arena using following formula: `{arena} = {championshipId}*3 + {round}/2`
so championship 2 and round 4 is arena season 8.
You can get the `championshipId` and `round` info using this query to the data provider:

```graphql
query {
  battleArenaInfo {
    championshipId
    round
  }
}
```

## Caveat

Sometimes your real-time data is not identical with the data provider's query result. This is because data migration from blockchain to data provider occurs once in several hours. You should check the `blockIndex` when you querying to data provider. Don't panic if you get different data. It'll be imported to  data provider sooner or later.
 
# Summary

 Blockchain has downsides to perform certain type of operations caused by the nature of blockchain itself. But we can use several helper tools to cover these things. Some may say this is not a pure blockchain game. But Nine Chronicles is a service with thankful players, so we should give them good game experience. And actually, they(data) are there in the blockchain.
