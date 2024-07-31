# 1. Summary

When you're using [Liblpanet](https://github.com/planetarium/libplanet) and related projects like Nine Chronicles, you have to create, verify, and manage many things related to blockchain. 
Since the internal implementation of blockchain is complicated to handle manually, Libplanet provides nesscary tools to help your work.
I hope you get inner peace and understanding with this article.

# 2. `planet` : Libplanet tool

The tool is called `planet`, which is a pretty intuitive name to catch.
This tool provides multiple utility functionalities for inspecting and working with Libplanet-based blockchain.

## 2.1. Installation

`planet` can be installed in two ways. For most cases, we recommend installing with npm.

```shell
$ npm install -g @planetarium/cli
```

If you prefer to use yarn, use this command:

```shell
yarn global add @planetarium/cli
```

`planet` also can be installed as [.NET Core tool](https://docs.microsoft.com/en-us/dotnet/core/tools/global-tools) if you have .NET Core SDK in your system. Note that this will build `planet` from the source and may take a while to complete.

```shell
dotnet tool install -g Libplanet.Tools
```

Check your installation with this command:

```shell
planet --version
```

## 2.2. Update

`planet` version is updated when `Libplanet` is updated.
Please keep `planet` version to use `planet` with the latest version of Libplanet.

# 3. What's inside `planet`

In this chapter, we'll cover subcommands in `planet`.

## 3.1. APV

App Protocol Version(APV) is a protocol version, as the name implies. It is primarily used for updating Libplanet-based applications to the latest version. If you want to know more about the APV itself, please refer to [Explain App Protocol Version(a.k.a. APV) ](./explain-app-protocol-version-a-k-a-apv) topic.
You can sign, verify, and analyze APV with this command. The APV string is required to run the node, as the APV is used to determine if the other node is using compatible software with another. For Nine Chronicles, Planetarium signs and deploys a new APV, and the launcher updates it, so you can play the game without checking for updates manually.

You can see the real-world example in [Create, Analyze APV with the `planet` command ](./create-analyze-apv-with-the-planet-command) topic.

## 3.2. key

`Key` means public-private key pairs for Libplanet-based blockchain. You can think of them as a cryptographic account for Nine Chronicles.
In most cases, you don't need to use this tool to manage keys, but in some cases, like running a local node or your own local blockchain, this tool will come in handy.

Here are the details of `planet key` command in [Manage your keys with the ‘planet’ command](./manage-your-keys-with-the-planet-command) topic.

## 3.3. MPT

MPT, [Merkle Patricia Trie](https://ethereum.org/en/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) is a kind of tree of transactions' hashes. We'll not cover technical details of hash and tree.
With this command, you can easily handle the merkle trees inside Libplanet blockchain. In most cases, you should know [root hash](https://www.investopedia.com/terms/m/merkle-root-cryptocurrency.asp) to handle certain trie.
<!-- 원문 의도 파악에 실패해서 냄깁니다 -->

## 3.4. store

This command is related to block storage itself. You can explore blocks and transactions with hash.


## 3.5. stats

This command shows you the summary of the provided blockchain in a CSV format.


# 4. Conclusion

With this article, you can now handle APV, Key, Merkle tree, block and transactions using `planet` cli tool. This tool will easily start your own node or blockchain and explore to get the information that you want to get.

> Want to enhance planet cli tool?
> Please visit our [Discord](https://discord.gg/qBPSw78x) and/or read [CONTRIBUTING.md](https://github.com/planetarium/libplanet/blob/main/Libplanet.Tools/CONTRIBUTING.md) for getting started.
