# Issuing Transactions: `Chrono`

Let's explore using `Chrono` to issue transactions on the Nine Chronicles blockchain network among the various available methods. `Chrono` is a Chrome browser extension similar to `MetaMask`. Users can register their private keys, configure their desired network settings, and sign and propagate transactions requested by web apps using `Chrono`.

## Installation

### 1. Chrome Web Store

You can easily install it from the [Chrono page](https://chromewebstore.google.com/detail/chrono-development-build/gcloogpfjklfhgfddenekamfjgbcklic) on the Chrome Web Store.

### 2. Manual Installation

Due to Chrome Web Store policies, there may be times when the latest version of `Chrono` is not available for installation from the Chrome Web Store. Here are the steps for manual installation for such cases.

#### 2.1 Obtaining the Build Files

To install `Chrono` manually, you need to obtain the build files. You can choose from either of the two methods below to get the build files.

::: details Downloading the repository release version
1. Download the [latest version](https://github.com/planetarium/chrono/releases) from `Chrono`’s [GitHub repository](https://github.com/planetarium/chrono).
    ```shell
    curl -L -o chrono_v1.0.5.zip https://github.com/planetarium/chrono/releases/download/v1.0.5/chrono-extension.zip
    ```
2. Unzip the downloaded file.
3. Proceed to the [next step](#load-unpacked-in-chrome-extensions).
:::

::: details Cloning the `Chrono` repository and building the project
1. Clone the [Chrono GitHub repository](https://github.com/planetarium/chrono).

    ::: code-group
    ```shell [git]
    git clone --recursive https://github.com/planetarium/chrono.git
    ```

    ```shell [gh(GitHub)]
    gh repo clone planetarium/chrono
    ```
    :::

    ::: info :bulb:
    This document is based on the `v1.0.5` tag.
    ```shell
    git checkout v1.0.5
    ```
    :::

2. Build `Chrono` from the root of the cloned repository.

    > The `Chrono` project uses `pnpm` for package management. If you haven't installed `pnpm`, refer to [this link](https://pnpm.io/installation) for installation instructions.

    ```shell
    cd chrono
    ```
    ```shell
    pnpm install
    ```
    ```shell
    pnpm run build
    ```

3. Once the build is complete, a `/build` directory will be created. Now proceed to the [next step](#load-unpacked-in-chrome-extensions).
:::

#### 2.2. Loading Unpacked Extension in Chrome {#load-unpacked-in-chrome-extensions}

1. Open Chrome browser and enter `chrome://extensions` in the address bar.
2. Enable `Developer mode` in the top right corner of the screen.
![Enable Developer Mode](/images/en/guide/issue-transaction/issue-transaction-with-chrono/enable-developer-mode.png){width=240}
3. Click the `Load unpacked` button in the top left corner of the screen and select the directory where you unzipped the files or the `/build` directory if you built it manually.
![Load unpacked button in Chrome extensions](/images/en/guide/issue-transaction/issue-transaction-with-chrono/load-unpacked-01.png){width=360}
![Select "build" directory](/images/en/guide/issue-transaction/issue-transaction-with-chrono/select-build-directory.png){width=480}
4. `Chrono` is now installed.
![Chrono in Chrome extensions](/images/en/guide/issue-transaction/issue-transaction-with-chrono/chrome-extensions-chrono.png){width=360}

## First Run of `Chrono` and Registering a Private Key

First, for convenience, let's pin `Chrono`.
![Pinning "Chrono" in Chrome extensions](/images/en/guide/issue-transaction/issue-transaction-with-chrono/pinning-chrono.png){width=360}

### 1. First Run

When you run `Chrono` for the first time, you will need to set a password to use `Chrono`. The password must be at least 8 characters long, and make sure to choose a strong password to ensure security.
![Set password of "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/set-password.png){width=360}

When `Chrono` is first run, it prompts you to create or register an account. If you already have a private key, click `Recover` and enter the Seed Phrase of your private key to register the account. To create a new account, click `New` and register the account using the automatically generated Seed Phrase.

::: danger :rotating_light:
Never share your password and Seed Phrase with anyone. They can be used to access your account.
:::

![Create first account of "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/first-account.png){width=360}

> `Chrono` does not currently support setting up the first account using an existing private key directly during the initial run. In such cases, click on `New` to proceed and then register the private key later as described [below](#register-private-key).

### 2. Registering a Private Key {#register-private-key}

[Previously](../create-network/create-a-private-key), we created a private key. Now, let's add this private key to `Chrono`.

::: danger :rotating_light:
In this example, we expose the private key for demonstration purposes only. Never expose your private key if it's used for any other purpose.
:::

First, open `Chrono`. Select the `Account 1` button in the top left corner and click the `Import` button.
![Select "Account 1" and "Import" button of "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/account-import.png){width=360}

Set the account name as `My private key`, enter the plaintext private key, and click the `Import` button.
![Import "My private key" to "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/import-my-private-key.png){width=360}

After a short wait, `My private key` will be successfully added.
!["My private key" on "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/my-private-key.png){width=360}

## Adding a Network in `Chrono`

Now, let's register the Nine Chronicles blockchain network that `Chrono` will communicate with. Open `Chrono`, select the `odin` button in the top left corner, and click the `Add New` button.
![Add network to "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/add-network.png){width=360}

The UI for entering network information appears as shown in the image below. Enter the network information here and click the `Import` button.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/import-network-empty.png){width=360}

### Adding Local Node to the Network

We've previously reviewed how to create and run a local network in [this article](../create-network/running-a-blockchain-node-with-dotnet-project). Now, let's add this network information to `Chrono`.

1. Refer to [this article](../create-network/running-a-blockchain-node-with-dotnet-project) to run the local node. Here is an example.
    ```shell
    dotnet run --config=./appsettings.local.json --arena-participants-sync=false
    ```
2. Refer to [this article](../get-state/get-state-with-headless-graphql) to access the GraphQL Playground. Below is an example.
    http://127.0.0.1:31280/ui/playground
3. In the GraphQL Playground, let's input the following information to query the genesis block's hash.
    ::: code-group
    ```graphql [Query]
    query {
      nodeStatus {
        genesis {
          hash
        }
      }
    }
    ```
    ```json [Result]
    {
      "data": {
        "nodeStatus": {
          "genesis": {
            "hash": "37fb1963ababf73045aa036b347971089337945c94bc4e92a694c435b80a1f17"
          }
        }
      }
    }
    ```
    :::
    The genesis block hash of the local network I ran is `37fb1963ababf73045aa036b347971089337945c94bc4e92a694c435b80a1f17`.

The configuration for the locally set up network is as follows:
```
- Planet ID: 0x999999999999
- Network name: My local
- Genesis Hash: 37fb1963ababf73045aa036b347971089337945c94bc4e92a694c435b80a1f17
- GraphQL endpoint: http://127.0.0.1:31280/graphql
- Explore endpoint:
- Is Mainnet: false
```

Now, input the above information into the `Chrono` UI and click the `Import` button.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/import-my-local-network.png){width=360}

After a brief wait, the `My local` network will be successfully added.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/my-local-network.png){width=360}

> In the image above, you can see that the selected account in `Chrono` has 3,920 NCG. This balance is due to the continuous accumulation of block mining rewards from using the same private key when running the local node, which is why the NCG balance is displayed like this in `Chrono`.

## Issuing a Transaction with the `Chrono` Example Project

Below is a simple example site where you can test Chrono. On this site, you can issue a transaction to create an avatar on the local node and check the results.

- https://daily-reward-example.nine-chronicles.dev/

If you have successfully installed Chrono as described above, you should see the following initial screen. Click the `Connect` button.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/image.png){width=480}

`Chrono` is running and prompts for a password.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/image-1.png){width=240}

Enter your password and click the `Unlock` button.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/image-2.png){width=240}

Select the account to connect and click the `Approve` button. In this example, instead of the first account `Account 1`, we connect with the `My private key` account, which was added by entering the private key plaintext.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/image-3.png){width=360}

After a brief wait, the account connection was successful. Since this account does not have an avatar yet, the `Create Avatar 0` button is activated. Click this button.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/image-4.png){width=480}

Chrono shows the details of the avatar creation transaction. Now, click the `Approve` button to sign the transaction and propagate it to the connected network.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/image-5.png){width=360}

After a brief wait, you will see an avatar named `Avatar0` has been created. `(120/120)` indicates the `ActionPoint` status used in the game.
![alt text](/images/en/guide/issue-transaction/issue-transaction-with-chrono/image-6.png "Title"){width=480}

### Querying Status

Lastly, let's query the newly added avatar information from the local node's GraphQL Playground.

::: code-group
```graphql [Query]
query {
  stateQuery {
     agent(address: "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159") {
      avatarStates {
        address
        name
      }
    }
  }
}
```
```json [Result]
{
  "data": {
    "stateQuery": {
      "agent": {
        "avatarStates": [
          {
            "address": "0xD73e10DBE0184bE3284E0e5ca6A2A12ae80ca524",
            "name": "Avatar0"
          }
        ]
      }
    }
  },
  "extensions": {}
}
```
:::

You can check the status of the newly created avatar like this. Using the GraphQL query above, you can retrieve the avatar's address and name, confirming that the avatar was successfully created.

::: tip :tada:
Congratulations! You have now learned how to configure accounts and networks with `Chrono` as well as issue transactions using a web app that utilizes `Chrono`. Go ahead and create various interesting web apps in the future!
:::
