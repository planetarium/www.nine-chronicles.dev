If you're playing Nine Chronicles, you might create your private key and be using it for gaming. Have you ever had a question where is the key you created then? This topic will introduce its structure and how you can operate keys.

## Structure

The [Libplanet] provides `Web3KeyStore` implemented [Web3 Secret Storage Definition] to help store and load keys safely. The `Web3KeyStore` stores keys in the user-local directory. The path differs on the platform:

- Linux/macOS: `$HOME/.config/planetarium/keystore`
- Windows: `%AppData%\planetarium\keystore`

You can see that in [docs.libplanet.io](https://docs.libplanet.io/0.41.1/api/Libplanet.KeyStore.Web3KeyStore.html#Libplanet_KeyStore_Web3KeyStore_DefaultKeyStore) too!

[Libplanet]: https://libplanet.io/
[Web3 Secret Storage Definition]: https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition

## Operate keys

And you can handle the keys without writing the app with Libplanet with `planet`, the CLI application to provide utils of Libplanet. You can install the `planet` command with `yarn global add @planetarium/cli` command. See the package at [npmjs.com](https://npmjs.com/package/@planetarium/cli).

### Look your all keys

There are keys you created or imported. You can list them with the `planet key list` command.

```
$ planet key list
Key ID Address
------ -------
```

But because I don't have any keys in my development environment, it doesn't show anything.

### Create a new key with passphrase

You can also create a new key with the `planet key create` command. When you run the command, it'll ask you passphrase twice then you should answer the passphrase of your new key twice well.

```text
$ planet key create
Passphrase: ***
Retype passphrase: ***
Key ID                               Address                                   
------------------------------------ ------------------------------------------
5d79fa1e-9fab-41f6-ad5a-423217e87594 0x7bf2F56085aFE0f78c8F1EdE6De7104814398fD9
```

Then let's try to look the keys again:

```text
planet key list
Key ID                               Address                                   
------------------------------------ ------------------------------------------
5d79fa1e-9fab-41f6-ad5a-423217e87594 0x7bf2F56085aFE0f78c8F1EdE6De7104814398fD9
```

### Export your key

Maybe, you may want to export your private key to move the key into your other computer. Then there is the `planet key export` command. It also requires passphrase and shows your raw private key.

```
$ planet key export 5d79fa1e-9fab-41f6-ad5a-423217e87594
Passphrase (of 5d79fa1e-9fab-41f6-ad5a-423217e87594): ***
6eb1e5fa45bab4d3d6e53e951e18669c8120147c4ce0516e5303db09b8e1ae6f
```

**THE PRIVATE KEY MUST BE MANAGED VERY SECRETLY. DO NOT USE THE EXAMPLE PRIVATE KEY ANYWHERE.**

### Import your key

If you export your key with `planet key export` command well, you should import the key. There is the `planet key import` command. The process is similar with the `planet key create`. And the command receives private key as an argument.

```text
$ planet key import 6eb1e5fa45bab4d3d6e53e951e18669c8120147c4ce0516e5303db09b8e1ae6f
Passphrase: ***
Retype passphrase: ***
Key ID                               Address                                   
------------------------------------ ------------------------------------------
927c2ce6-e613-49a7-8e0e-1551ed927b8d 0x7bf2F56085aFE0f78c8F1EdE6De7104814398fD9
```

### Generate a temporary private key with public key

Or if you may want to create a temporary key to use in development. Then you can use the `planet key generate` command.  If you feel the `generate` word is too long, you can use `gen` instead.

```text
$ planet key gen
Private key                                                      Address                                   
---------------------------------------------------------------- ------------------------------------------
e761ba3723ef9a90279894d0ac6ced71f5c7c496a436cdb045063fb5a7dcd8de 0x4Ff3A11235892608622465914E7a98530DB061a9
```

And you can make it show also public key with `--public-key` flag option.

```text
$ planet key gen --public-key
Private key                                                      Address                                    Public key                                                        
---------------------------------------------------------------- ------------------------------------------ ------------------------------------------------------------------
9bd919fc48f0aee6dd43b4faeabd8c81887e23360fabb6b6c0aebdf324958def 0x68eEB75AD63F99F97Ebcd191e70aa6C5e67fa6D3 034750bcb24ba7364a6ef86e85b7eab2b22b57fae7417ad98d197cedf4338b83d5
```

If you're playing Nine Chronicles, you might create your private key and be using it for gaming. Have you ever had a question where is the key you created then? This topic will introduce its structure and how you can operate keys.

## Structure

The [Libplanet] provides `Web3KeyStore` implemented [Web3 Secret Storage Definition] to help store and load keys safely. The `Web3KeyStore` stores keys in the user-local directory. The path differs on the platform:

- Linux/macOS: `$HOME/.config/planetarium/keystore`
- Windows: `%AppData%\planetarium\keystore`

You can see that in [docs.libplanet.io](https://docs.libplanet.io/0.41.1/api/Libplanet.KeyStore.Web3KeyStore.html#Libplanet_KeyStore_Web3KeyStore_DefaultKeyStore) too!

[Libplanet]: https://libplanet.io/
[Web3 Secret Storage Definition]: https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition

## Operate keys

And you can handle the keys without writing the app with Libplanet with `planet`, the CLI application to provide utils of Libplanet. You can install the `planet` command with `yarn global add @planetarium/cli` command. See the package at [npmjs.com](https://npmjs.com/package/@planetarium/cli).

### Look your all keys

There are keys you created or imported. You can list them with the `planet key list` command.

```
$ planet key list
Key ID Address
------ -------
```

But because I don't have any keys in my development environment, it doesn't show anything.

### Create a new key with passphrase

You can also create a new key with the `planet key create` command. When you run the command, it'll ask you passphrase twice then you should answer the passphrase of your new key twice well.

```text
$ planet key create
Passphrase: ***
Retype passphrase: ***
Key ID                               Address                                   
------------------------------------ ------------------------------------------
5d79fa1e-9fab-41f6-ad5a-423217e87594 0x7bf2F56085aFE0f78c8F1EdE6De7104814398fD9
```

Then let's try to look the keys again:

```text
planet key list
Key ID                               Address                                   
------------------------------------ ------------------------------------------
5d79fa1e-9fab-41f6-ad5a-423217e87594 0x7bf2F56085aFE0f78c8F1EdE6De7104814398fD9
```

### Export your key

Maybe, you may want to export your private key to move the key into your other computer. Then there is the `planet key export` command. It also requires passphrase and shows your raw private key.

```
$ planet key export 5d79fa1e-9fab-41f6-ad5a-423217e87594
Passphrase (of 5d79fa1e-9fab-41f6-ad5a-423217e87594): ***
6eb1e5fa45bab4d3d6e53e951e18669c8120147c4ce0516e5303db09b8e1ae6f
```

**THE PRIVATE KEY MUST BE MANAGED VERY SECRETLY. DO NOT USE THE EXAMPLE PRIVATE KEY ANYWHERE.**

### Import your key

If you export your key with `planet key export` command well, you should import the key. There is the `planet key import` command. The process is similar with the `planet key create`. And the command receives private key as an argument.

```text
$ planet key import 6eb1e5fa45bab4d3d6e53e951e18669c8120147c4ce0516e5303db09b8e1ae6f
Passphrase: ***
Retype passphrase: ***
Key ID                               Address                                   
------------------------------------ ------------------------------------------
927c2ce6-e613-49a7-8e0e-1551ed927b8d 0x7bf2F56085aFE0f78c8F1EdE6De7104814398fD9
```

### Generate a temporary private key with public key

Or if you may want to create a temporary key to use in development. Then you can use the `planet key generate` command.  If you feel the `generate` word is too long, you can use `gen` instead.

```text
$ planet key gen
Private key                                                      Address                                   
---------------------------------------------------------------- ------------------------------------------
e761ba3723ef9a90279894d0ac6ced71f5c7c496a436cdb045063fb5a7dcd8de 0x4Ff3A11235892608622465914E7a98530DB061a9
```

And you can make it show also public key with `--public-key` flag option.

```text
$ planet key gen --public-key
Private key                                                      Address                                    Public key                                                        
---------------------------------------------------------------- ------------------------------------------ ------------------------------------------------------------------
9bd919fc48f0aee6dd43b4faeabd8c81887e23360fabb6b6c0aebdf324958def 0x68eEB75AD63F99F97Ebcd191e70aa6C5e67fa6D3 034750bcb24ba7364a6ef86e85b7eab2b22b57fae7417ad98d197cedf4338b83d5
```
