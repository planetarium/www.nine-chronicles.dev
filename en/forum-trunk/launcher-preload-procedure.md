# Preload Procedure

This post describes what happens with Preload in the launcher based on v100080.

# Prepare Stage

## 0/10

Verify that the folder containing the chain data is accessible and that there is sufficient space to store the chain thereafter. The UI has no separate label because it runs for a very short time.

The errors that occur during this process are as follows:

- Not enough permission (No UI)
- Not enough storage space (UI `disk-space`)
  - If the space check itself fails, the process continues.

## 1/10 Validating Snapshot

After completing the permission check, the launcher looks for:

- if a snapshot is required 
- if a snapshot is required, check if it exists already,
- if a snapshot exists, verify if it is up to date. 
- If a custom server is used, snapshots are not considered necessary and are omitted and immediately entered into the Headless phase.

It attempts to download from the URL within 'SnapshotPaths', and if unsuccessful, it returns to 1/10 and repeats the process to the URL of the next element. Currently, only one URL is included and distributed.

First, we run a header to get the tip header of the local chain, and if the block header of the snapshot server is further advanced,  the snapshot download process begins; otherwise, it goes directly to 5/10. 

After that, it looks for the tx and block folder and reads the structure of the folder to determine the latest epoch available on the local copy of the blockchain and compares them against the epochs of the snapshot server to find out which epochs should be downloaded.

```typescript
declare function getSnapshotMetadataFromEpoch(epoch: Epoch): Metadata;

function getRequiredEpoches(snapshotMetadata, localMetadata, list = []): Epoch[] {
	// If the local epoch is higher, it will not be accepted because we already has it.
	if(snapshotMetadata.epoch < localMetadata.epoch) return list;

	// If no snapshot was taken earlier than this snapshot, consider it Genesis and exit.
	if(!snapshotMetadata.previousEpoch) return [...list, snapshotMetadata.epoch];

	// Otherwise, browse to the previous snapshot and try recursively.
	return getRequiredEpoches(
		getSnapshotMetadataFromEpoch(snapshotMetadata.previousEpoch),
		localMetadata,
		[...list, snapshotMetadata.epoch]
	);
}
```

The errors that occur during this process are as follows:

- Snapshot block header download failed (Cause of failure not provided)

# Snapshot Stage

## 2/10 Downloading Snapshot

Based on the Epoch list recorded from 1/10, get the file name of the snapshot that needs to be downloaded and proceed with the download. During this process, the compressed snapshot files are stored within AppData.

The errors that occur during this process are as follows:

- Snapshot file download failed

## 3/10 Downloading State Snapshot

In addition to the files divided into separate files from previous process, Gets a state_latest that collects information that is not incrementally stored. Existing unnecessary chain data will then be deleted.

The errors that occur during this process are as follows:

- Snapshot file download failed
- Failed to delete existing chain folder

## 4/10 Extracting Snapshot

Unzip each downloaded snapshot. During this process, compressed files that have been compressed files will be deleted.

# Headless Stage

## 5/10 Starting Headless

Runs the headless. This is the state until receiving block hashes.

## 6/10 Downloading Block Hashes

Get block hashes of blocks that needs to be received from the P2P network.

## 7/10 Downloading Blocks

Gets the blocks corresponding to the collected block hash.

## 8/10 Verifying Block Headers

Validates block headers (e.g. difficulty, index) while putting received blocks together.

## 9/10 Downloading States

Obtain blocks from trusted peers.

## 10/10 Executing Actions

Calculates and validates status while executing transactions of received blocks.

## Done

Preloading is complete.
