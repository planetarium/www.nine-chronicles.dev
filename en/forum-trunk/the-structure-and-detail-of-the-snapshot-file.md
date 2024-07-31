# The Structure of Snapshot File

In this post, we assume you have a basic understanding of the general mechanism of the blockchain structure. 

# What is Snapshot File?

Generally, A snapshot file is a record of the state of the blockchain at a certain point in time or at a block height. (In Nine Chronicles, we're using time epoch.)

Ideally, in a fully decentralized blockchain, if you want to infer the current state of the blockchain, you can execute the Genesis block to the latest block in order. 

But the problem is that this takes a tremendously long time on a personal computer to complete.

Secondly, As time goes by, also the blockchain itself gets very long, so it takes considerable time to just receive blocks (and transactions contained within them) from peers. 

Imagine you should receive all blocks and transactions from the P2P network first, validating them by recalculating all states that happened from the beginning to the latest in order to play Nine Chronicles. it would be extremely painful.

So instead, we provide a pre-calculated state in compressed form and make users download it, so the user only needs to validate that each state matches its corresponding block hash.

How? Each block has the Merkle root hash of the entire state trie, so by comparing the downloaded state's trie hash, we can 'minimally' check if the state is valid.

# Incremental Snapshot?

In the early days of Nine Chronicles, we used to provide a monolithic "Full Snapshot" every time user launches the game. but as explained earlier, as time goes by, the snapshot file itself became too large to serve and download (about 1GB). 

So we've decided to apply a partitioning database structure in order to save snapshots incrementally. (i.e. Instead of downloading whole states every time, load only the difference between the current and the last time you finished the game.)

So, that's what launchers been loadin'!

# Technical Details 

## Solution

1. Create a RocksDB database for each epoch, with keys = hashes and values = blocks. so, Create RocksDB database `blockhash-block` and `txhash-tx`. and enable the Compress Dictionary option of these databases. (we will call this **Data DB**)

2. Store a map `hash -> epoch` in some other database, so Make RocksDB database `blockhash-epoch` and `txhash-epoch` (we will call this one **Index DB**)

3. When a new block|transactions come, check which epoch this block|transactions belongs to and save it to corresponding **Data DB**, and save 'data1' about this epoch to **Index DB**.

In summary, The blocks and transactions became stored in multiple databases. Each block and transaction belongs to a partition of the database, according to its epoch unit, which is its Unix timestamp. 

Every epoch is divided by certain seconds, configured by `RocksDBStore()` constructor's `txEpochUnitSeconds` and `blockEpochUnitSeconds` parameters (86,400 by default). 

## Snapshot Policy

1. Whenever each epoch is finished, the Data DB, the entire Index DB, and State DB for the epoch are compressed and uploaded.
2. Write information about the epoch in metadata.
3. The client side (In this case, 9c-launcher) receives and put together as much as necessary depending on the current epoch.

## Epoch

- each epoch's default value is set at 86,400 seconds intervals.
- each epoch's sequence is specified as a positive integer.

## State Snapshot

Snapshot containing all of the chain data that is not stored in an incremental structure (i.e., not separated by epochs)
such as `state`, `state_hashes`, `stateref`, `states`, `chain` in `state_latest`. 

## Snapshot Metadata

```tsx
interface SnapshotMetadata extends Libplanet.Blocks.BlockHeader{
	BlockEpoch: number;
	TxEpoch: number;
	PreviousBlockEpoch: number;
  PreviousTxEpoch: number;
}
```

[Documentation of Libplanet.Blocks.BlockHeader](https://docs.libplanet.io/0.41.0/api/Libplanet.Blocks.BlockHeader.html)

It is used to compare Epoch present in the local chain with Epoch held by snapshots to see if snapshots are needed, and to recursively compare old snapshots based on Previous Epoch. The other fields used are latest.json's [Index](https://docs.libplanet.io/0.11.1/api/Libplanet.Blocks.BlockHeader.html#Libplanet_Blocks_BlockHeader_Index) property.

Snapshot Metadata is written in a json file with the same name as the snapshot's zip file.

## Folder Structure of Snapshot

![alt text](/images/en/forum-trunk/the-structure-and-detail-of-the-snapshot-file/image.png)

filename: latest or snapshot-{block epoch max}-{tx epoch max}

block, tx is stored in Incremental structure → distinguished by 'epoch' unit 

```
- {block,tx}
    - epoch$n (n ≤ {BlockEpoch,TxEpoch})
        - [Libplanet Implementation Detail](https://docs.libplanet.io/0.38.0/api/Libplanet.RocksDBStore.RocksDBStore.html)
```

## Final Chain DB Structure

Only the **bold** ones are put in the snapshot.

- **9c-main**
- **block**
    - **blockindex**
    - epoch-1
    - epoch-2
    - ...
    - **epoch-n**
- **chain**
- stagedtx
- blockpercept
- **state**
- **state_hashes**
- **stateref**
- **states**
- **tx**
    - **txindex**
    - epoch-1
    - epoch-2
    - ...
    - **epoch-n** 

# Sources

https://github.com/input-output-hk/cardano-sl/blob/develop/docs/proposals/block-storage.md#the-solution
https://github.com/planetarium/libplanet/issues/1183
[libplanet Version 0.11.0 Changelog - Backward Incompatible Storage Format Changes](https://docs.libplanet.io/0.41.0/CHANGES.html#backward-incompatible-storage-format-changes-2)
[You can download current full main network snapshot file from Here.](http://snapshots.nine-chronicles.com/main/partition/full/9c-main-snapshot.zip)

# Special Thanks

https://github.com/riemannulus
