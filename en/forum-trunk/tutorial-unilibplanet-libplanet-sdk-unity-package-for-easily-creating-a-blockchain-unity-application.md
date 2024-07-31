# 1. Summary

UniLibPlanet is a [Libplanet](https://github.com/planetarium/libplanet) extensions for Unity.

## 1.1. Expected Result

Your own simple clicker game that click count is stored into [Libplanet](https://github.com/planetarium/libplanet)
blockchain.

## 1.2. What you'll get

### 1.2.1. As a Unity game developer

You will find the way to make your own game runs on blockchain.
You will understand the basic concepts of blockchain based game like `genesis block`, `node`.

### 1.2.2. As a UniLibplanet contributor

You will find the way to build and test Libplanet unity package
Moreover, you could upgrade Libplanet unity package to make game easier.

# 2. Dive Deep

You could find detailed step-by-step tutorial
in [tutorials.md](https://github.com/planetarium/UniLibplanet/blob/documentation/docs/tutorials.md).  
So in this article, we'll not cover detailed steps how to run this. Instead, we'll cover the functions of libplanet
unity package.

## 2.1. Tools > Libplanet

### 2.1.1. Blockchain

Blockchain is a kind of data storage created in the form of a list of blocks that are connected securely using
cryptography.  
The block contains transaction(change of state) data and is linked to previous and next block.
In this menu, you can handle the whole blockchain data.

### 2.1.2. Genesis Block

Genesis block is the very first block of the blockchain.  
Since this is the start of the blockchain, this should be made in hand.  
You can create and manage genesis block in this menu.  
For more technical detail of genesis block, please visit here(The docs will be prepared.)

### 2.1.3. Private key

Private key is the secret key represents user's address. With private key, anyone can access to that address and use like owner.  
Keeping private key in secure is **very** important issue.  
In general situation, private key is not required because keyfile and passphrase can do action as address owner but raw private key is required in few special cases like generating genesis block.  
To support this temporary work, UniLibplanet supports to generate temporary private key.  
With this menu, you can create and manage private keys.

### 2.1.4. Swarm config

When running your own blockchain node, the swarm is running inside the node to communicate with other nodes and sync blockchain status with them to meet latest state on P2P network.
To config that swarm's behavior, you can use this menu.

### 2.1.5. Utils

You need to add `peer string` to run blockchain node with communicate peer, which is formatted string of peer node info.
In certain case, you need to bind special peer node not to detach for test or another reason. This kind of peers are called `bound peer`.  
To create bound peer info as `peer string` format, you can use this menu.

# 3. Conclusion

With this tutorial, you can make your own Unity game that runs on Libplanet blockchain.  
Running game on blockchain is a little tricky but blockchain makes your game for multiple users because blockchain is born to be.
In addition, works without centralized governor, so called `The Oracle` and someone who wants to play game can play game anytime he/she runs blockchain node even if he/she is the only player of the game.
