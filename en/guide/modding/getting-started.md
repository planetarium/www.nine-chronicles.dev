Here’s the **Getting Started** guide translated into English while maintaining its structure and tone:

---

# **Getting Started**

Welcome, modders! 🎉

We currently categorize modding into two main fields and provide various tools and tutorials to make the modding process easier.

1. **Client Modification Modding**: Creating or modifying plugins for the Unity client that runs the actual game.
2. **Third-Party Application Modding**: Creating websites or applications.

Additionally, you can create `CLI` tools or `API` services, which can also be developed using the tools and libraries provided for the second category.

## **Tutorials**

We provide detailed tutorials for each field. If you're ready to start, check out the links below:

- If you want to create a mod that **does not require user signatures**, refer to the [Avatar Information Page Guide](./guide/avatar-information-dapp-guide).
- If you want to create a mod that **requires user signatures**, check out the [Daily Reward Page Guide](./guide/daily-reward-dapp).
- For **client modding**, refer to the [BepInEx Guide](./guide/bepinex-guide).

::: info
A signature is required for creating transactions that need user authorization.  
For example, when users purchase items from the Market or engage in adventures, a signature is necessary.
:::

## **Third-Party Application Modding**

Building websites or mobile applications is also considered modding by our standards.

To facilitate this process, we’ve developed tools like [Mimir](https://github.com/planetarium/mimir) and [Chrono](https://github.com/planetarium/chrono), and you can use various TypeScript libraries to develop your applications.

- **Mimir**: Access real-time game data via GraphQL, such as Arena rankings or avatar information. [Check out the guide here](../guide/general/get-state/get-state-with-mimir-graphql).
- **Chrono**: A Chrome extension that provides wallet functionality for Nine Chronicles, similar to [Metamask](https://metamask.io/). [See the guide here](../guide/general/how-to-use-chrono).

By using Mimir to retrieve data and Chrono to send transactions to the network, modding becomes much simpler. Since Mimir is a GraphQL service, it can also be used in CLI tools or analytics services.

- If you want to create a mod that doesn’t require user signatures, refer to the [Avatar Information Page Tutorial](../../tutorials/modding/avatar-information-dapp-guide).
- If you need to create a mod that requires signatures, refer to the [Daily Reward Page Tutorial](../../tutorials/modding/daily-reward-dapp).

We also offer several TypeScript libraries. [Check out the guide here](./ts-libs).

## **Client Modding**

Client modding can be divided into two main methods:

1. Modding by downloading and modifying the client source code from the [Nine Chronicles](https://github.com/planetarium/NineChronicles) repository.
2. Modding without directly modifying the client by developing plugins.

**We recommend the second method** since the client code is regularly updated, making it challenging to maintain modifications over time.

Although we haven’t prepared a guide for the first method yet, we recommend using [BepInEx](https://github.com/BepInEx/BepInEx) for plugin-based modding. BepInEx allows you to create mods as plugins without modifying the client directly, and users can easily install these plugins without needing to download a new client.

Both methods rely heavily on the [necoyume.dll](https://github.com/planetarium/NineChronicles/tree/development/nekoyume) used within the game client. Therefore, it’s crucial to understand the APIs in the `necoyume` module.  
Unfortunately, we don’t have a dedicated guide for this yet 😢, but you can refer to our [Mods repository](https://github.com/planetarium/NineChronicles.Mods) for examples of how mods are implemented. For more extensive usage, check the Nine Chronicles repository directly.

We have prepared a simple guide on how to call a notification from the necoyume module and install BepInEx. [Check out the BepInEx Guide](./guide/bepinex-guide).

## **awesome-9c**

[awesome-9c](https://github.com/planetarium/awesome-9c) is a repository that collects mods and services created by users. If you've created a mod, feel free to submit a pull request and add your mod to the repository!

::: tip
The next document is a system guide. If you're looking for tutorials, please refer to the tutorial links provided in this document.  
The following section includes basic guides that will help you during modding.
:::

---

This version retains the technical depth and clarity, ensuring that both beginner and advanced developers can follow the process easily. Let me know if you need further adjustments!
