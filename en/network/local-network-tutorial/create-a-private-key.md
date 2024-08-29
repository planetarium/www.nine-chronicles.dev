# Creating a Private Key

To participate in a blockchain network, such as issuing transactions, you need to create a private key. This private key allows you to secure your account and perform transactions using your unique key.

In Nine Chronicles, the blockchain technology is powered by [Libplanet][libplanet]. Through the [Libplanet.Tools][libplanet-tools] project, you can use the `planet` CLI to create a private key.

[libplanet]: https://github.com/planetarium/libplanet
[libplanet-tools]: https://github.com/planetarium/libplanet/tree/main/tools/Libplanet.Tools

## Installing the `planet` CLI

First, refer to the [README documentation][readme] for `Libplanet.Tools` to install the `planet` CLI.

[readme]: https://github.com/planetarium/libplanet/blob/main/tools/Libplanet.Tools/README.md

::: info :bulb:
This tutorial uses version 5.0.0 of the `planet` CLI.
:::

## Using `planet key`

Let's create a private key using the `planet key` command. First, run the `planet key` command to see the list of managed keys.

```shell
planet key
```

You should see something like this:

```console
Key ID                               Address                                   
------------------------------------ ------------------------------------------
```

Since no keys exist yet, the list is empty. Next, let's check out the options available by running the `planet key --help` command.

```shell
planet key --help
```

You'll see the following output:

```console {7}
Usage: planet key [command]
Usage: planet key [--path <String>] [--help]

List all private keys.

Commands:
  create      Create a new private key.
  remove      Remove a private key.
  import      Import a raw private key or Web3 Secret Storage.
  export      Export a raw private key (or public key).
  generate    Generate a raw private key without storing it.
  sign        Sign a message.
  derive      Derive public key and address from private key.

Options:
  --path <String>    Specify key store path to list.
  -h, --help         Show help message
```

Now, let's use the `planet key create` command to generate a new private key.

::: danger :rotating_light:
When creating a private key for actual use, make sure to use a strong passphrase.
:::

```shell
planet key create
```

You'll be prompted to enter a passphrase:

```console
Passphrase: ***************
Retype passphrase: ***************
Key ID                               Address                                   
------------------------------------ ------------------------------------------
1fd94a3e-2273-489b-bd44-b62036e2c07d 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159
```

After entering a passphrase, a new private key is created. The key is represented by a `Key ID` and an `Address` within the `planet` CLI. Next, let's export the private and public keys from this `Key ID`. Run `planet key export --help` to see the available options.

```shell
planet key export --help
```

You'll see the following output:

```console {9}
Usage: planet key export [--passphrase <PASSPHRASE>] [--passphrase-file <FILE>] [--public-key] [--bytes] [--json] [--path <String>] [--help] key-id

Export a raw private key (or public key).

Arguments:
  0: key-id    A key UUID to export. (Required)

Options:
  -p, --passphrase <PASSPHRASE>    Take passphrase through this option instead of prompt.  Mutually exclusive with --passphrase-file option.
  --passphrase-file <FILE>         Read passphrase from the specified file instead of taking it through prompt.  Mutually exclusive with -p/--passphrase option.  For standard input, use a hyphen (`-').  For an actual file named a hyphen, prepend `./', i.e., `./-'.  Note that the trailing CR/LF is trimmed.
  -P, --public-key                 Export a public key instead of private key.
  -b, --bytes                      Print raw bytes instead of hexadecimal.  No trailing LF appended.
  --json                           Export a Web3 Secret Storage Formatted json
  --path <String>                  Path to key store to export from.
  -h, --help                       Show help message
```

Let's retrieve the private key using the `--passphrase` option with the passphrase you previously entered.

::: danger :rotating_light:
For demonstration purposes, we will expose the private key here, but never expose your private key in any other context.
:::

```shell
planet key export 1fd94a3e-2273-489b-bd44-b62036e2c07d --passphrase=***************
```

The output will be:

```console
9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102
```

Now, let's export the public key using the `--public-key` option.

```shell
planet key export 1fd94a3e-2273-489b-bd44-b62036e2c07d --passphrase=*************** --public-key
```

The output will be:

```console
033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14
```

Here’s a summary of the key information we’ve generated:

```
Key ID: 1fd94a3e-2273-489b-bd44-b62036e2c07d
Private Key: 9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102
Public Key: 033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14
Address: 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159
```

::: tip :tada:
Great work! You’ve just learned how to create and manage a private key using the `planet` CLI. Next, we'll use this key to create a genesis block.
:::
