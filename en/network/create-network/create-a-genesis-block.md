# Create a genesis block

The genesis block is the first block created when a blockchain network starts. Nine Chronicles' blockchain network also has a genesis block, and all gameplay starts from this block.

Nine Chronicles' blockchain node implementation, [NineChronicles.Headless][nc-headless], provides a command called `genesis` via the [NineChronicles.Headless.Executable][nc-headless-executable] project. Let's use it to create a customized genesis block.

[nc-headless]: https://github.com/planetarium/NineChronicles.Headless
[nc-headless-executable]: https://github.com/planetarium/NineChronicles.Headless/tree/main/NineChronicles.Headless.Executable

## Clone the `NineChronicles.Headless` repository

First, clone the [GitHub repository](https://github.com/planetarium/NineChronicles.Headless) of `NineChronicles.Headless`.

### cli

::: code-group
```shell [git]
git clone https://github.com/planetarium/NineChronicles.Headless.git
git submodule update --init --recursive
```

```shell [gh(GitHub)]
gh repo clone planetarium/NineChronicles.Headless -- --recurse-submodules
```
:::

::: info :bulb:
For the purposes of this article, we've used the `v200200` tag.
```shell
git checkout v200200
```
:::

## `NineChronicles.Headless.Executable genesis`

Now let's see what we can do with the `genesis` command in the `NineChronicles.Headless.Executable` project.

[nc-headless-readme]: https://github.com/planetarium/NineChronicles.Headless?tab=readme-ov-file#create-a-new-genesis-block

```shell
cd ./NineChronicles.Headless.Executable
```
```shell
dotnet run -- genesis --help
```
```console {6}
Usage: NineChronicles. genesis [--help] config

Mine a new genesis block

Arguments:
  0: config    JSON config path to mine genesis block (Default: ./config.json)

Options:
  -h, --help    Show help message
```

You can use the above command to create a new genesis block. By default, the command reads configuration information from the `./config.json` file. If you want to use a JSON file in a different path, you can specify that path using the `--config` option.
Now let's create a configuration file in the path `NineChronicles.Headless.Executable/config.json`. The schema of the configuration file can be found in [Structure of genesis block][structure-of-genesis-block] and [config.schema.json][config-schema-json]. Below, we've set up the private key we created in the previous step to be the blockchain's administrator, the minter of the currency(`NCG`), and the block validator.

[structure-of-genesis-block]: https://github.com/planetarium/NineChronicles.Headless?tab=readme-ov-file#structure-of-genesis-block
[config-schema-json]: https://github.com/planetarium/NineChronicles.Headless/blob/development/config.schema.json

::: danger :rotating_light:
We're exposing the private key here for illustrative purposes, but you should never expose a private key for any other purpose.
:::

::: details Description of the `config.json` file
```json
{
    "$schema": "../config.schema.json",
    "data": {
        // Set the path that contains the tablesheet CSV files.
        "tablePath": "../Lib9c/Lib9c/TableCSV"
    },
    // Set the blockchain's administrator.
    "admin": {
        "activate": true,
        // Enter the address of the private key we created in the previous example.
        "address": "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159",
        "validUntil": 1000000
    },
    // Set the minter and deposit of a currency(NCG).
    "currency": {
        // Set the administrator's private key.
        "initialMinter": "9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102",
        "initialCurrencyDeposit": [
            {
                // Set the administrator's address.
                "address": "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159",
                "amount": 1000000,
                "start": 0,
                "end": 0
            }
        ]
    },
    // Set the block validator.
    "initialValidatorSet": [
        {
            // Set the administrator's public key.
            "publicKey": "033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14",
            "power": 1
        }
    ],
    // Configure Mead.
    "initialMeadConfigs": [
        {
            // Set the administrator's address.
            "address": "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159",
            "amount": "1000000"
        }
    ],
    "initialPledgeConfigs": []
}
```
:::

```json
{
    "$schema": "../config.schema.json",
    "data": {
        "tablePath": "../Lib9c/Lib9c/TableCSV"
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

Now let's use this `config.json` file to create a Genesis block.

```shell
dotnet run -- genesis ./config.json 
```
```console
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

The `genesis-block` file has now been created.

::: tip :tada:
Congratulations! You've now learned how to create a genesis block using the `genesis` command in the `NineChronicles.Headless.Executable` project. Next, we'll use the private key and the genesis block to run Nine Chronicles' blockchain node.
:::
