> :bulb: This article was written based on NineChronicles.Headless version v100330-1.[^1]

Sometimes we need to recalculate blocks. This is the case to determine if there is a non-determinism problem or if a hard fork has occurred.
We can use the `replay blocks` command in this case.

## Preparation

Clone the [NineChronicles.Headless repository](https://github.com/planetarium/NineChronicles.Headless). And move to NineChronicles.Headless.Executable project path.

```bash
$ git clone https://github.com/planetarium/NineChronicles.Headless.git
$ cd ./NineChronicles.Headless/NineChronicles.Headless.Executable
```

#### Prepare blockchain store

You can use your local store already exist or download a new one.
Please refer to [this article](./file-paths-used-on-nine-chronicles/#blockchain-store) for the local store path.
Or if you want to download a new store, [this article](./replay-of-transactions-incorporated-into-blocks/#preparing-the-blockchain) will help.

## Replay blocks

Implementation code link: https://github.com/planetarium/NineChronicles.Headless/blob/v100330-1/NineChronicles.Headless.Executable/Commands/ReplayCommand.cs#L196-L211

```bash
dotnet run -- replay blocks --help
```
```console
Usage: NineChronicles. replay blocks [--store-path <String>] [--start-index <Int64>] [--end-index <Int64>] [--repeat-count <Int32>] [--verbose] [--output-path <String>] [--help]

Evaluate blocks and check state root hash

Options:
  -s, --store-path <String>     An absolute path of block storage.(rocksdb) (Required)
  -i, --start-index <Int64>     Target start block height. Tip as default. (Min: 1) (Default: 1)
  -e, --end-index <Int64>       Target end block height. Tip as default. (Min: 1)If not set, same as argument "-i".
  -r, --repeat-count <Int32>    Repeat count. (Min: 1)If not set, default is 1. (Default: 1)
  -v, --verbose                 Verbose mode.
  -o, --output-path <String>    The path of output file.
  -h, --help                    Show help message
```

## Examples

- Test store: `s3://AKIAUU3S3PEZCDQF47SF@9c-snapshots.s3.ap-northeast-2.amazonaws.com?region=ap-northeast-2/9c-test/seungmin/9c-snapshots/9c-main-partition_20221021_hyeon.7z`
- Local store path: `/Users/seungmin/Downloads/FileZilla/9c-snapshots/9c-main-partition_20221021_hyeon`

#### Case 1

In this case, replay blocks from 5,214,601 to 5,214,602 with repeating 3 times for each block. And success to replay all blocks.

Input

```bash
dotnet run -- replay blocks \
-s /Users/seungmin/Downloads/FileZilla/9c-snapshots/9c-main-partition_20221021_hyeon \
-i 5214601 \
-e 5214602 \
-r 3
```

Output without `-v`

```console
Replay blocks start from #5214601 to #5214602.(range: 2, repeat: 3)
Replay blocks end successfully.
```

Output with `-v` : [replay-blocks-output.log](https://github.com/planetarium/NineChronicles.Headless/files/9908624/replay-blocks-output.log)

#### Case 2

In this case, replay blocks from 5,214,601 to 5,214,610 with repeating 2 times for each block. And success to replay from 5,214,601 to 5,214,603 and failure in 5,214,604 with `InvalidBlockStateRootHashException`.

Input

```bash
dotnet run -- replay blocks \
-s /Users/seungmin/Downloads/FileZilla/9c-snapshots/9c-main-partition_20221021_hyeon \
-i 5214601 \
-e 5214610 \
-r 2
```

Output without `-v`

```console
Replay blocks start from #5214601 to #5214610.(range: 10, repeat: 2)
Libplanet.Blocks.InvalidBlockStateRootHashException: Block #5214604 3ef7eeafbbaf0de24597b10e06324129b6bdfd9f3d57ecff2d53cfa52e6cbd5a's state root hash is febbfb93434eb83a4337f5ae1875a6da5f879f9d3ed20dd478cb301a6db030ef, but the execution result is e332b7d237eab995f340cf4c44c409d4cacf194aee4ec758dfb2d1ab0763b657.
   at Libplanet.Blockchain.BlockChain`1.ExecuteActions(Block`1 block, Nullable`1 stateCompleters) in /Users/seungmin/Repositories/9c-launcher/NineChronicles.Headless/Lib9c/.Libplanet/Libplanet/Blockchain/BlockChain.cs:line 918
   at NineChronicles.Headless.Executable.Commands.ReplayCommand.Blocks(String storePath, Int64 startIndex, Nullable`1 endIndex, Int32 repeatCount, Boolean verbose, String outputPath) in /Users/seungmin/Repositories/9c-launcher/NineChronicles.Headless/NineChronicles.Headless.Executable/Commands/ReplayCommand.cs:line 286
Replay blocks end with exception.
```

Output with `-v` : [replay-blocks-output.log](https://github.com/planetarium/NineChronicles.Headless/files/9908613/replay-blocks-output.log)

#### Case 3

In this case, replay block 4,001,014 without repeating. And failure with `UnexpectedlyTerminatedActionException(IncompleteBlockStatesException)` in each `ActionEvaluation<T>`.

Input

```bash
dotnet run -- replay blocks \
-s /Users/seungmin/Downloads/FileZilla/9c-snapshots/9c-main-partition_20221021_hyeon \
-i 4001014
```

Output without `-v`

```console
Replay blocks start from #4001014 to #4001014.(range: 1, repeat: 1)
Libplanet.Blocks.InvalidBlockStateRootHashException: Block #4001014 2ab8ea908de56f484fe332396c99b16629321511eba3afce2dae16ca1573c148's state root hash is 0e264d9170676a2472278c23b8bd27d233d6bb06f5a2aa4aefcf2cc39336e361, but the execution result is 61cdee84fb562c6d6fc02c885ecbe929b1df76a348a3001e8ae743b5e490fc1b.
   at Libplanet.Blockchain.BlockChain`1.ExecuteActions(Block`1 block, Nullable`1 stateCompleters) in /Users/seungmin/Repositories/9c-launcher/NineChronicles.Headless/Lib9c/.Libplanet/Libplanet/Blockchain/BlockChain.cs:line 918
   at NineChronicles.Headless.Executable.Commands.ReplayCommand.Blocks(String storePath, Int64 startIndex, Nullable`1 endIndex, Int32 repeatCount, Boolean verbose, String outputPath) in /Users/seungmin/Repositories/9c-launcher/NineChronicles.Headless/NineChronicles.Headless.Executable/Commands/ReplayCommand.cs:line 286
Replay blocks end with exception.
```

Output with `-v` : [replay-blocks-output.log](https://github.com/planetarium/NineChronicles.Headless/files/9908626/replay-blocks-output.log)

[^1]: [lib9c:v100330](https://www.github.com/planetarium/lib9c/tree/v100330), [NineChronicles.Headless:v100330-1](https://www.github.com/planetarium/NineChronicles.Headless/tree/v100330-1)
