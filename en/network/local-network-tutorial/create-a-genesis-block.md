# Creating a Genesis Block

The genesis block is the first block created when a blockchain network is initialized. In the Nine Chronicles blockchain network, the genesis block serves as the starting point for all gameplay.

In Nine Chronicles, the blockchain node implementation [NineChronicles.Headless][nc-headless] provides the `genesis` command via the [NineChronicles.Headless.Executable][nc-headless-executable] project. Let's learn how to create a custom genesis block using this command.

[nc-headless]: https://github.com/planetarium/NineChronicles.Headless
[nc-headless-executable]: https://github.com/planetarium/NineChronicles.Headless/tree/main/NineChronicles.Headless.Executable

## Cloning the `NineChronicles.Headless` Repository

First, clone the [NineChronicles.Headless GitHub repository](https://github.com/planetarium/NineChronicles.Headless).

### CLI Commands

```shell
git clone https://github.com/planetarium/NineChronicles.Headless.git
git submodule update --init --recursive
```

Alternatively, using GitHub CLI:

```shell
gh repo clone planetarium/NineChronicles.Headless -- --recurse-submodules
```

::: tip
This tutorial assumes you are working with the `development` branch.
```shell
git checkout development
```
:::

## The `NineChronicles.Headless.Executable genesis` Command

Now, let's explore what you can do with the `genesis` command provided by the `NineChronicles.Headless.Executable` project.

```shell
dotnet run --project=NineChronicles.Headless.Executable -- genesis --help
```

You should see the following output:

```
Usage: NineChronicles.Headless.Executable genesis [--help] config

Mine a new genesis block

Arguments:
  0: config    JSON config path to mine genesis block (Default: ./config.json)

Options:
  -h, --help    Show help message
```

This command allows you to generate a new genesis block.

Let's start by creating a `config.json` file for the genesis block. Since we are setting up a single node, we'll configure the genesis block with all the permissions assigned to a single private key.  
To do this, use the `create-config-for-single` script. Make sure to use the private key you created in the [previous step](./create-a-private-key).

```shell
sh scripts/create-config-for-single.sh
```

After running the command, you'll see the following prompts:

```
Enter the private key: {private key}
Enter the public key: {public key}
Enter the address: {address}
config.json has been created successfully.
```

If successful, a `config.json` file similar to the one below will be generated:

```json
{
    "$schema": "./config.schema.json",
    "data": {
        "tablePath": "./Lib9c/Lib9c/TableCSV"
    },
    "admin": {
        "activate": true,
        "address": "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159",
        "validUntil": 1000000
    },
    "currency": {
        "initialMinter": "9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102",
        "initialCurrencyDeposit": [
            {
                "address": "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159",
                "amount": 1000000,
                "start": 0,
                "end": 0
            }
        ]
    },
    "initialValidatorSet": [
        {
            "publicKey": "033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14",
            "power": 1
        }
    ],
    "initialMeadConfigs": [
        {
            "address": "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159",
            "amount": "1000000"
        }
    ],
    "initialPledgeConfigs": []
}
```

This `config.json` file designates the specified private key as the admin, assigns validator permissions, and sets initial currency configurations.  
If you need more complex configurations, refer to the [Structure of genesis block][structure-of-genesis-block] and [config.schema.json][config-schema-json] documentation.

[structure-of-genesis-block]: https://github.com/planetarium/NineChronicles.Headless?tab=readme-ov-file#structure-of-genesis-block
[config-schema-json]: https://github.com/planetarium/NineChronicles.Headless/blob/development/config.schema.json

Now, let's use the generated `config.json` to create the genesis block:

```shell
dotnet run --project=NineChronicles.Headless.Executable -- genesis ./config.json 
```

You should see output similar to this:

```
Processing data for genesis...

Processing currency for genesis...

Processing admin for genesis...
Admin config done

Processing initial validator set for genesis...
Initial validator set config done: PublicKey: 033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14, Power: 1

Processing initial mead distribution...
Preparing initial 1000000 MEAD for 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159...

Processing initial pledges...

Mining genesis block...

Admin privilege has been granted to given admin address. Keep this account in secret.

Genesis block created.
```

The `genesis-block` file is now successfully created.

::: tip :tada:
Congratulations! You’ve learned how to create a genesis block using the `genesis` command in the `NineChronicles.Headless.Executable` project. Next, we’ll move on to running the node with the genesis block and private key you just created.
:::
