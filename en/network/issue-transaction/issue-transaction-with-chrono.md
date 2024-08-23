# Issuing a Transaction: `Chrono`

Let's explore how to issue transactions on the Nine Chronicles blockchain network using `Chrono`, one of the available methods. `Chrono` is a Chrome browser extension that provides functionalities similar to `MetaMask`. Users can register their private keys with `Chrono`, configure their desired network, and sign and broadcast transactions requested by web applications through `Chrono`.

## Installing Chrono
Refer to [this article](../../general/chrono/how-to-use-chrono) for instructions on how to install `Chrono`.

# Adding a Network in `Chrono`

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
