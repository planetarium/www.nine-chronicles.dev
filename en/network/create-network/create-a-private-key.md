# Create a private key

In order to participate in a blockchain network, that is, to issue transactions, we need to create a private key. A private key allows us to secure our account and perform transactions using our own independent key.

[Libplanet][libplanet], the blockchain technology behind Nine Chronicles, provides a cli called `planet` through the [Libplanet.Tools][libplanet-tools] project. Let's use it to create a private key.

[libplanet]: https://github.com/planetarium/libplanet
[libplanet-tools]: https://github.com/planetarium/libplanet/tree/main/tools/Libplanet.Tools

## Install the `planet` cli

First, install the `planet` cli by referring to the [README documentation][readme] of `Libplanet.Tools`.

[readme]: https://github.com/planetarium/libplanet/blob/main/tools/Libplanet.Tools/README.md

::: info :bulb:
This document uses the `planet` cli version 5.0.0.
:::

## `planet key`

Let's create a private key using the `planet key` command. First, let's run the `planet key` command to see the list of managed keys.

```shell
planet key
```
```console
Key ID                               Address                                   
------------------------------------ ------------------------------------------
```

We can see that we don't have the key yet. Next, let's run the `planet key --help` command to see what we can do.

```shell
planet key --help
```
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

Now let's generate a new private key using the `planet key create` command.

::: danger :rotating_light:
When create your private key, you should use a strong passphrase.
:::

```shell
planet key create
```
```console
Passphrase: ***************
Retype passphrase: ***************
Key ID                               Address                                   
------------------------------------ ------------------------------------------
1fd94a3e-2273-489b-bd44-b62036e2c07d 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159
```

After entering the passphrase, a new private key was created. This key is represented by the `Key ID` and `Address` at the `planet` cli level. Below, we'll see the private and public keys from this key. Let's use the `planet key export --help` command to see how to use it.

```shell
planet key export --help
```
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

Let's verify the private key by entering the passphrase we entered above in the `--passphrase` option.

::: danger :rotating_light:
We're exposing the private key here for illustrative purposes, but you should never expose a private key for any other purpose.
:::

```shell
planet key export 1fd94a3e-2273-489b-bd44-b62036e2c07d --passphrase=***************
```
```console
9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102
```

Let's check the public key by adding the `--public-key` option.

```shell
planet key export 1fd94a3e-2273-489b-bd44-b62036e2c07d --passphrase=*************** --public-key
```
```console
033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14
```

Here is the information for the key we created above.

```
Key ID: 1fd94a3e-2273-489b-bd44-b62036e2c07d
Private Key: 9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102
Public Key: 033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14
Address: 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159
```

::: tip :tada:
Congratulations! You've now learned some of the ways to create and use a private key using the `planet` cli. Next, we'll utilize this key to create a genesis block.
:::
