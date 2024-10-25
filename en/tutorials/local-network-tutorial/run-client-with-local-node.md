# Playing Nine Chronicles with a Local Node

::: info
Before starting this tutorial, ensure you have the Nine Chronicles client installed and ready to run. You can download it from the [official Nine Chronicles website](https://nine-chronicles.com).
:::

## 1. Modifying Client Settings

If you’ve updated the client through the Nine Chronicles launcher, the client files should be located in the following directories:

- **Windows**: `%appdata%\Nine Chronicles\player\main`
- **MacOS**: `~/Library/Application Support/Nine Chronicles/player/main/`

To connect the client to your local network, you'll need to modify or create the `clo.json` file located in the following path:

- **Windows**: `%appdata%\Nine Chronicles\player\main\NineChronicles_Data\StreamingAssets\clo.json`
- **MacOS**: `~/Library/Application Support/Nine Chronicles/player/main/NineChronicles.app/Contents/Resources/Data/StreamingAssets/clo.json`

Make sure to set `GenesisBlockPath` as an absolute path and replace `{username}` with your actual username for each operating system.

::: code-group
```json [clo.json (MacOS)]
{
    "RpcClient": true,
    "RpcServerHost": "127.0.0.1",
    "RpcServerPort": 31238,
    "SelectedPlanetId": "0x999999999999",
    "AppProtocolVersion": "1/b4179Ad0d7565A6EcFA70d2a0f727461039e0159/MEUCIQDvIIp8IKCpjKojE8LzgYZzeRg9fUPl.sWHrowzHhmrxgIgBhTkSRc8BHXZwwIAwBQN8J3wGlAbOD7FRyp8bA6OH6Y=",
    "GenesisBlockPath": "/Users/{username}/.planetarium/headless/genesis-block/genesis-block-for-single"
}
```

```json [clo.json (Windows)]
{
    "RpcClient": true,
    "RpcServerHost": "127.0.0.1",
    "RpcServerPort": 31238,
    "SelectedPlanetId": "0x999999999999",
    "AppProtocolVersion": "1/b4179Ad0d7565A6EcFA70d2a0f727461039e0159/MEUCIQDvIIp8IKCpjKojE8LzgYZzeRg9fUPl.sWHrowzHhmrxgIgBhTkSRc8BHXZwwIAwBQN8J3wGlAbOD7FRyp8bA6OH6Y=",
    "GenesisBlockPath": "C:\\Users\\{username}\\.planetarium\\headless\\genesis-block\\genesis-block-for-single"
}
```
:::

## 2. Running the Local Node and Connecting

Now, restart your local node as you did before:

```sh
9crun run --version=v200220 --planet=Single
```

Once the node is running, don’t use the launcher to start the game. Instead, open the client directly and connect to the game.  
Note that you can **only play the game with the private key you previously created**.  
If you've played with a different account before, you’ll need to create a new account to connect.

![Game Login Screen 1](/images/network/login1.png)
If you've played Nine Chronicles before, you should see a screen like the one above. Click `FORGOT PASSWORD?` to proceed.

![Game Login Screen 2](/images/network/login2.png)
![Game Play Screen](/images/network/game.jpeg)

Once you log in with your newly created account, you’ll be able to start playing. Since the Nine Chronicles client is running without external services (such as the Market Service or DataProvider), you won’t be able to access market or ranking information.

::: tip :tada:
Congratulations! You’re almost at the end of the tutorial. As a final step, let’s issue a transaction using Chrono, but this time in an environment outside of the game client.
:::
