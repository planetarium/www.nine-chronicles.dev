# 1. Summary

Genesis block is the very first block of a blockchain network and an identity of blockchain network.
Blockchain nodes only who shares same genesis block can communicate each other without any problem.
So you can make your own Nine Chronicles blockchain network creating genesis block.
You can use this genesis block from local test to run private server of Nine Chronicles.

## 1.1. Expected Result

After reading this article, you will get your own Nine Chronicles genesis block and running node based on that genesis block.

# 2. How to create genesis block

## 2.1. Preparation

### 2.1.1. Install .NET SDK

Nine Chronicles is developed with C# as a main language, so you have to install .NET SDK to create
Visit [Microsoft documentation](https://docs.microsoft.com/en-us/dotnet/core/install/) and install .NET SDK 6 following instruction.
You can check installed .NET SDK versions using this command:

```shell
dotnet --list-sdks
```

Make sure 6.X.YYY version is listed.

### 2.1.2. Prepare Repository

Clone repository with submodules with following commands:

```shell
git clone https://github.com/planetarium/NineChronicles.Headless.git
cd NineChronicles.Headless
git submodule update --init --recursive
```

The last command is required to set up all submodules related codes to build headless server.

### 2.1.3. Remark

You may meet an error about .NET version to use .NET Core 3.1.
In this case, just install .NET Core 3.1 besides .NET 6.0. They can be installed and work at the same time.
If you're running later version of linux e.g. Ubuntu 22.04 LTS.

## 2.2. (Optional) Create activation keys and PendingActivationState

Activation key is the kind of invitation code for new Nine Chronicles account(`0x123abc...`) to register/activate into Nine Chronicles.  
You can create activation key whenever you want later, so you can just skip this step.

```shell
dotnet run --project ./Lic9c/.Lib9c.Tools tx create-activation-keys 10 > ActivationKeys.csv  # Change [10] to your number of new activation keys
dotnet run --project ./Lib9c/.Lib9c.Tools tx create-pending-activations ActivationKeys.csv > PendingActivation
```

## 2.3. Create config file for genesis block

1. Copy `config.json.example` to `config.json`
2. Change values inside `config.json`
    - `data.tablePath` is required.
    - If you have `PendingActivation` file, set file path to `extra.pendingActivationStatePath`

If you skipped step 2.2 so you don't need to set `PendingActivationState`, you should delete `extra.pendingActivationStatePath` to skip this step when mining genesis block.

The full structure of `config.json` can be found in [README.md](https://github.com/planetarium/NineChronicles.Headless#structure-of-genesis-block).

## 2.4. Create genesis block

Now you can create your own genesis block for Nine Chronicles.

```shell
dotnet run --project ./NineChronicles.Headless.Executable/ genesis ./config.json
```

After this step, you will get `genesis-block` file as output and another info in addition.

## 2.5. (Test) Run Nine Chronicles Headless node with new genesis block

```shell
dotnet run --project ./NineChronicles.Headless.Executable/ \
    -V=100260/6ec8E598962F1f475504F82fD5bF3410eAE58B9B/MEUCIQCG2yQNyXu3ovuUBNMEQiqx1vdo.FCMet9FoayFiIL89QIgXGRTU84nrcmLL4ud2j9ogrGt7ScmqaD97N.4rrtraXE=/ZHUxNjpXaW5kb3dzQmluYXJ5VXJsdTU2Omh0dHBzOi8vZG93bmxvYWQubmluZS1jaHJvbmljbGVzLmNvbS92MTAwMjYwL1dpbmRvd3MuemlwdTk6dGltZXN0YW1wdTEwOjIwMjItMDctMjhl \ 
    -G=[PATH/TO/GENESIS/BLOCK] \
    --store-type=rocksdb \
    --store-path= [PATH/TO/BLOCK/STORAGE] \
    --workers=1000 \
    --host=localhost \
    --port=43210 \
    --miner-private-key=[PRIVATE_KEY_OF_BLOCK_MINER]
```

The [PRIVATE_KEY_OF_BLOCK_MINER] is a private key for Nine Chronicles.
You can create a key easily using `planet` command. Please read [this article](./manage-your-keys-with-the-planet-command).
If you see log like this, all process is successfully done:

```text
Start mining.
[BlockChain] 424037645/18484: Starting to mine block #1 with difficulty 5000000 and previous hash 29f53d22...
[BlockChain] Gathering transactions to mine for block #1 from 0 staged transactions...
[BlockChain] Gathered total of 0 transactions to mine for block #1 from 0 staged transactions.
Evaluating actions in the block #1 pre-evaluation hash: 10d93de7...
Evaluating policy block action for block #1 System.Collections.Immutable.ImmutableArray`1[System.Byte]
Actions in 0 transactions for block #1 pre-evaluation hash: 10d93de7... evaluated in 20ms.
[BlockChain] 424037645/18484: Mined block #1 0838b084... with difficulty 5000000 and previous hash 29f53d22...
[BlockChain] Trying to append block #1 0838b084...
[BlockChain] Unstaging 0 transactions from block #1 0838b084...
[BlockChain] Unstaged 0 transactions from block #1 0838b084...
[Swarm] Trying to broadcast blocks...
[NetMQTransport] Broadcasting message Libplanet.Net.Messages.BlockHeaderMessage as 0x7862DD9b....Unspecified/localhost:43210. to 0 peers
[Swarm] Block broadcasting complete.
[BlockChain] Appended the block #1 0838b084...
[BlockChain] Invoking renderers for #1 0838b084... (1 renderer(s), 0 action renderer(s))
[LoggedRenderer] Invoking RenderBlock() for #1 0838b084... (was #0 29f53d22...)...
[LoggedRenderer] Invoked RenderBlock() for #1 0838b084... (was #0 29f53d22...).
[BlockChain] Invoked renderers for #1 0838b084... (1 renderer(s), 0 action renderer(s))
[Swarm] Trying to broadcast blocks...
[NetMQTransport] Broadcasting message Libplanet.Net.Messages.BlockHeaderMessage as 0x7862DD9b....Unspecified/localhost:43210. to 0 peers
[Swarm] Block broadcasting complete.
```

You can see the blocks are mining as time goes by, and now you made your own Nine Chronicles blockchain network.  
Congratulations!

### 2.5.1. Troubleshooting

1. `libdl` not found issue
   If you're running later version of linux, you may encounter error like this:

   ```shell
   librocksdb-6.4.so: (DllNotFoundException) Unable to load shared library 'libdl' or one of its dependencies. In order to help diagnose loading problems, consider setting the LD_DEBUG environment variable: liblibdl: cannot open shared object file: No such file or directory
   ```

   This is because later version of libc(>=2.35), libdl.so is embedded into standard C library.  
   To resolve this, just symlink newer version of libdl to older name like this:

   ```shell
   whereis libdl.so.2
   libdl.so.2: /usr/lib/x86_64-linux-gnu/libdl.so.2 # This result is an example. Please use your output
   sudo ln -s /usr/lib/x86_64-linux-gnu/libdl.so.2 /usr/lib/x86_64-linux-gnu/libdl.so.2
   ```

   After this, run headless server again and the server may run.

   > Reference from [StackExchange](https://unix.stackexchange.com/questions/700097/unable-to-load-shared-library-libdl-so-or-one-of-its-dependencies)

---

### References

- [README.md](https://github.com/planetarium/ninechronicles.headless#create-new-genesis-block) in Nine Chronicles Headless server repository
