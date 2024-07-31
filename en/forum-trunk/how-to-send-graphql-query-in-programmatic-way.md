# Intro

In our previous posts, we've introduced GraphQL usage on GraphQL playgaound like following image:

![alt text](/images/en/forum-trunk/how-to-send-graphql-query-in-programmatic-way/image.png)

But when you're creating your own mod/plugin, you have to query data from your program, not from GUI playground.
In this article, I'll show you how to call GQL query in your code.

# How to

First of all, we need to know where to query to get our data. We already know the domain of RPC node(http://9c-main-rpc-10.nine-chronicles.com) or data provider(https://api.9c.gg). We usually connected to the playground on web browser routing to `/ui/playgound`, but for direct query, we have to use `/graphql` instead. Let's see the working example written in JS.

```javascript
// gql.js
// Needs Node 17 or later to use "fetch".
const API_URL = "https://api.9c.gg/graphql";
const query = `
{
  battleArenaInfo {
    championshipId
    round
    arenaType
    startBlockIndex
    endBlockIndex
  }
}
`;

const getArenaInfo = async () => {
  const resp = await fetch(
    API_URL,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({query: query})
    }
  );
  
  if (resp.status === 200) {
    const result = await resp.json();
    console.log(result.data);
  } else {
    const err = await resp.text();
    console.log(`Fetch failed: ${resp.status} :: ${err}`);
  }
};

getArenaInfo();
```

![alt text](/images/en/forum-trunk/how-to-send-graphql-query-in-programmatic-way/image-1.png)

You can test your own query with changing `const query` part in this sample. Just copy and paste query contents from GQL playground. That's it.

As you write your own code, I recommend that you check a few points:

1. Use `/graphql` endpoint
2. Request with `POST` method
3. Send JSON contents as request body

# Outro

This short article shows how to query data via GraphQL in programmatic way. Now you can get and use real-time data in your own program from Nine Chronicles node.
