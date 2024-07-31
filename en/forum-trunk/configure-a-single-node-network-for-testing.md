#  Configure a single-node network for testing

This document explains how to set up a single-node network for testing the whole Nine Chronicles.

# Prerequesites

- `planet` CLI
- NineChronicles.Headless.Executable
- The latest CSV tables for Lib9c
  - This can be typically stored with the source code of Lib9c

# Create a credential for testing

Run `planet key create` and follow the instructions. Store the key in a safe location if you expect to use the chain created to be used frequently.

## Export the private key

Check the UUID of the key created in the step above from the command output,  and run `planet key export <UUID>` to get a raw private key.

# Crafting the genesis block

## Creating the configuration

```json
{
	"privateKey": "<PrivateKey>",
	"tablePath": "<TableCSV>",
	"goldDistributionPath": "<GoldDistCSV>",
	"adminAddress": "<ID>",
	"authorizedMinerConfig": {
		"validUntil": 1500000,
		"miners": [
			"<ID>"
		]
	}
}
```

- **ID:** Paste the address of the key we created earlier.
- **PrivateKey:** Paste the raw private key found in the step above.
- **TableCSV:** The location of the CSV files used for Lib9c. It is typically located in `Lib9c/TableCSV` folder inside the Lib9c source tree.
- **GoldDistCSV**: How to create this file will be described in the step below. After creating the file put the path in the configuration file.

After writing the file, store them in a JSON file.

### GoldDistCSV

```json
Address,AmountPerBlock,StartBlock,EndBlock
<ID>,1000000,0,0
```

This file determines the initial NCG distribution for launching the chain. Put ID without the `0x` prefix to give your account some NCGs to get started.

## Creating the genesis block itself

Run the  `NineChronicles.Headless.Executable.exe genesis <filename>` with the filename set to the JSON file we created earlier. You should have a `genesis-block` and `keys` file when it completes.

# Editing config.json

From the mainnet config.json you should edit these to run Nine Chronicles on your single-node network.

- **BlockchainStoreDirName:** Choose a name that doesn't conflict with other chains.
- **ConfigVersion**: Put an arbitrarily large number would suffice.
- **GenesisBlockPath**: Put the absolute path of the `genesis-block` file you created. You may put an URL instead.
- **PeerStrings, RemoteNodeList, SnapshotPaths**: Replace them with a empty array `[]`.
- **UseRemoteHeadless**: `false`
- **Network**: Something random which isn't `9c-main`.
- **NoMiner**: `false`
- **HeadlessArgs**: Append `--network-type=default` to enable mining.
- **DataProviderUrl**: Omit.

# Run the launcher.

Make sure you enable the mining in the settings.
