# Running a Blockchain Node: .NET Project

A blockchain node is an individual computer or server that makes up a blockchain network. Each node stores blockchain data, validates new transactions, and exchanges information with other nodes to maintain the network's decentralization. Nodes are the backbone of a blockchain network and are responsible for ensuring the security and integrity of the network.

We cloned NineChronicles' blockchain node implementation [NineChronicles.Headless][nc-headless] [earlier](./create-a-genesis-block.md) and used it to create a genesis block. This time, let's run the blockchain node.

[nc-headless]: https://github.com/planetarium/NineChronicles.Headless

::: info :bulb:
For the purposes of this article, we've been working with the `v200200` tag in the `NineChronicles.Headless` repository.
:::

## Setting up `appsettings.local.json`

나인크로니클의 블록체인 노드를 실행할 때에는 아래와 같이 많은 옵션을 입력할 수 있습니다.
When running a blockchain node on NineChronicles, you can enter many options, as shown below.

::: details `NineChronicles.Headless.Executable` run options
```console
➜  NineChronicles.Headless.Executable $ dotnet run -- --help
Usage: NineChronicles. [command]
Usage: NineChronicles. [--app-protocol-version <String>] [--genesis-block-path <String>] [--host <String>] [--port <UInt16>] [--swarm-private-key <String>] [--no-miner] [--miner-count <Int32>] [--miner-private-key <String>] [--miner.block-interval <Int32>] [--store-type <String>] [--store-path <String>] [--no-reduce-store] [--ice-server <String>...] [--peer <String>...] [--trusted-app-protocol-version-signer <String>...] [--rpc-server] [--rpc-listen-host <String>] [--rpc-listen-port <Int32>] [--rpc-remote-server] [--rpc-http-server] [--graphql-server] [--graphql-host <String>] [--graphql-port <Int32>] [--graphql-secret-token-path <String>] [--no-cors] [--confirmations <Int32>] [--nonblock-renderer] [--nonblock-renderer-queue <Int32>] [--strict-rendering] [--log-action-renders] [--network-type <String>] [--planet <Planet>] [--tx-life-time <Int32>] [--message-timeout <Int32>] [--tip-timeout <Int32>] [--demand-buffer <Int32>] [--static-peer <String>...] [--skip-preload] [--minimum-broadcast-target <Int32>] [--bucket-size <Int32>] [--chain-tip-stale-behavior-type <String>] [--tx-quota-per-signer <Int32>] [--maximum-poll-peers <Int32>] [--consensus-port <UInt16>] [--consensus-private-key <String>] [--consensus-seed <String>...] [--consensus-target-block-interval <Double>] [--consensus-propose-second-base <Int32>] [--maximum-transaction-per-block <Int32>] [--config <String>] [--sentry-dsn <String>] [--sentry-trace-sample-rate <Double>] [--arena-participants-sync-interval <Int32>] [--arena-participants-sync=<true|false>] [--remote-key-value-service] [--help] [--version]

NineChronicles.Headless.Executable

Commands:
  docs          
  account       
  validation    
  chain         
  key           
  apv           
  action        
  state         
  tx            
  market        
  genesis       
  replay        

Options:
  -V, --app-protocol-version <String>                      App protocol version token.
  -G, --genesis-block-path <String>                        Genesis block path of blockchain. Blockchain is recognized by its genesis block.
  -H, --host <String>                                      Hostname of this node for another nodes to access. This is not listening host like 0.0.0.0
  -P, --port <UInt16>                                      Port of this node for another nodes to access.
  --swarm-private-key <String>                             The private key used for signing messages and to specify your node. If you leave this null, a randomly generated value will be used.
  --no-miner                                               Disable block mining.
  --miner-count <Int32>                                    The number of miner task(thread).
  --miner-private-key <String>                             The private key used for mining blocks. Must not be null if you want to turn on mining with libplanet-node.
  --miner.block-interval <Int32>                           The miner's break time after mining a block. The unit is millisecond.
  --store-type <String>                                    The type of storage to store blockchain data. If not provided, "LiteDB" will be used as default. Available type: ["rocksdb", "memory"]
  --store-path <String>                                    Path of storage. This value is required if you use persistent storage e.g. "rocksdb"
  --no-reduce-store                                        Do not reduce storage. Enabling this option will use enormous disk spaces.
  -I, --ice-server <String>...                             ICE server to NAT traverse.
  --peer <String>...                                       Seed peer list to communicate to another nodes.
  -T, --trusted-app-protocol-version-signer <String>...    Trustworthy signers who claim new app protocol versions
  --rpc-server                                             Use this option if you want to make unity clients to communicate with this server with RPC
  --rpc-listen-host <String>                               RPC listen host
  --rpc-listen-port <Int32>                                RPC listen port
  --rpc-remote-server                                      Do a role as RPC remote server? If you enable this option, multiple Unity clients can connect to your RPC server.
  --rpc-http-server                                        If you enable this option with "rpcRemoteServer" option at the same time, RPC server will use HTTP/1, not gRPC.
  --graphql-server                                         Use this option if you want to enable GraphQL server to enable querying data.
  --graphql-host <String>                                  GraphQL listen host
  --graphql-port <Int32>                                   GraphQL listen port
  --graphql-secret-token-path <String>                     The path to write GraphQL secret token. If you want to protect this headless application, you should use this option and take it into headers.
  --no-cors                                                Run without CORS policy.
  --confirmations <Int32>                                  The number of required confirmations to recognize a block.
  --nonblock-renderer                                      Uses non-blocking renderer, which prevents the blockchain & swarm from waiting slow rendering. Turned off by default.
  --nonblock-renderer-queue <Int32>                        The size of the queue used by the non-blocking renderer. Ignored if --nonblock-renderer is turned off.
  --strict-rendering                                       Flag to turn on validating action renderer.
  --log-action-renders                                     Log action renders besides block renders. --rpc-server implies this.
  --network-type <String>                                  (deprecated) Network type.
  --planet <Planet>                                        Planet (Allowed values: Odin, Heimdall, Idun, OdinInternal, HeimdallInternal)
  --tx-life-time <Int32>                                   The lifetime of each transaction, which uses minute as its unit.
  --message-timeout <Int32>                                The grace period for new messages, which uses second as its unit.
  --tip-timeout <Int32>                                    The grace period for tip update, which uses second as its unit.
  --demand-buffer <Int32>                                  A number of block size that determines how far behind the demand the tip of the chain will publish `NodeException` to GraphQL subscriptions.
  --static-peer <String>...                                A list of peers that the node will continue to maintain.
  --skip-preload                                           Run node without preloading.
  --minimum-broadcast-target <Int32>                       Minimum number of peers to broadcast message.
  --bucket-size <Int32>                                    Number of the peers can be stored in each bucket.
  --chain-tip-stale-behavior-type <String>                 Determines behavior when the chain's tip is stale. "reboot" and "preload" is available and "reboot" option is selected by default.
  --tx-quota-per-signer <Int32>                            The number of maximum transactions can be included in stage per signer.
  --maximum-poll-peers <Int32>                             The maximum number of peers to poll blocks. int.MaxValue by default.
  --consensus-port <UInt16>                                Port used for communicating consensus related messages.  null by default.
  --consensus-private-key <String>                         The private key used for signing consensus messages. Cannot be null.
  --consensus-seed <String>...                             A list of seed peers to join the block consensus.
  --consensus-target-block-interval <Double>               A target block interval used in consensus context. The unit is millisecond.
  --consensus-propose-second-base <Int32>                  A propose second base for consensus context timeout. The unit is second.
  --maximum-transaction-per-block <Int32>                  Maximum transactions allowed in a block. null by default.
  -C, --config <String>                                    Absolute path of "appsettings.json" file to provide headless configurations. (Default: appsettings.json)
  --sentry-dsn <String>                                    Sentry DSN
  --sentry-trace-sample-rate <Double>                      Trace sample rate for sentry
  --arena-participants-sync-interval <Int32>               arena participants list sync interval time
  --arena-participants-sync=<true|false>                   arena participants list sync enable (Default: True)
  --remote-key-value-service                               [DANGER] Turn on RemoteKeyValueService to debug.
  -h, --help                                               Show help message
  --version                                                Show version
```
:::

You could specify each option separately, but we'll use the `--config` option to specify an options file written in `json` format.

Create a file in the path `NineChronicles.Headless.Executable/appsettings.local.json` and set the options as shown below. Focus on the `Headless` entry.

::: details `appsettings.local.json` file
```json
{
    "$schema": "./appsettings-schema.json",
    "Headless": {
        // Set to the planet Odin.
        "Planet": "Odin",
        // Enter the absolute path or URL of the genesis block file. e.g., the absolute path to the custom genesis block file you created earlier
        "GenesisBlockPath": "path-of-genesis-block",
        // Set the tag version to 200200 to match the version of the tag.
        "AppProtocolVersionString": "200200/AB2da648b9154F2cCcAFBD85e0Bc3d51f97330Fc/MEUCIQCaK89fzl+RWPKD28zCFYUJvWFrcqsBizZ3k5HYLMcsogIgMtXiuZZlp.C3OSZIyYRHbcV263F2nh2CJhFwP1NY85I=/ZHU5OnRpbWVzdGFtcHUxMDoyMDI0LTA3LTA5ZQ==",
        "StoreType": "rocksdb",
        // Set the absolute path to the blockchain store. e.g., "/Users/{username}/nine-chronicles/store"
        "StorePath": "path-of-blockchain-store",
        // Set to false to mine the block.
        "NoMiner": false,
        // Set the private key for signing the block to the private key we created in the previous example.
        "MinerPrivateKeyString": "9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102",
        // Set the private key for block consensus to the private key we created in the previous example.
        "ConsensusPrivateKeyString": "9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102",
        "ConsensusSeedStrings": [
            // Set the public key for the private key we created in the previous example.
            "033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14,127.0.0.1,31588"
        ],
        "ConsensusPort": 31588,
        "Host": "127.0.0.1",
        "Port": 31234,
        "RpcServer": true,
        "RpcListenHost": "127.0.0.1",
        "RpcListenPort": 31238,
        "RpcRemoteServer": true,
        "GraphQLServer": true,
        "GraphQLHost": "127.0.0.1",
        "GraphQLPort": 31280,
        "NoCors": true,
        "ChainTipStaleBehaviorType": "reboot"
    },
    "Serilog": {
        "Using": [
            "Serilog.Expressions",
            "Serilog.Sinks.Console",
            "Serilog.Sinks.RollingFile"
        ],
        "MinimumLevel": "Debug",
        "WriteTo": [
            {
                "Name": "Logger",
                "Args": {
                    "configureLogger": {
                        "WriteTo": [
                            {
                                "Name": "Console",
                                "Args": {
                                    "formatter": "Serilog.Formatting.Compact.CompactJsonFormatter, Serilog.Formatting.Compact",
                                    "outputTemplate": "[{Timestamp:HH:mm:ss} {Level:u3}] [{Source}] {Message:lj}{NewLine}{Exception}"
                                }
                            }
                        ],
                        "Filter": [
                            {
                                "Name": "ByIncludingOnly",
                                "Args": {
                                    "expression": "Source is not null"
                                }
                            }
                        ]
                    }
                }
            },
            {
                "Name": "Logger",
                "Args": {
                    "configureLogger": {
                        "WriteTo": [
                            {
                                "Name": "Console",
                                "Args": {
                                    "formatter": "Serilog.Formatting.Compact.CompactJsonFormatter, Serilog.Formatting.Compact",
                                    "outputTemplate": "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}"
                                }
                            }
                        ],
                        "Filter": [
                            {
                                "Name": "ByExcluding",
                                "Args": {
                                    "expression": "Source is not null"
                                }
                            }
                        ]
                    }
                }
            }
        ],
        "Filter": [
            {
                "Name": "ByExcluding",
                "Args": {
                    "expression": "SourceContext = 'Libplanet.Stun.TurnClient'"
                }
            }
        ]
    },
    "Logging": {
        "LogLevel": {
            "Microsoft": "None"
        }
    }
}
```
:::

## Run a blockchain node

Let's run the blockchain node with the command below.

```console
➜  NineChronicles.Headless.Executable & dotnet run --config=./appsettings.local.json --arena-participants-sync=false
```

아래는 블록체인 노드의 로그입니다. 강조된 라인들을 보면, 0번 블록 즉 제네시스 블록을 평가한 후에 1번 블록을 만들어서 제안하고, 다시 1번 블록을 평가하고 블록체인에 추가한 후에 합의와 관련한 로그가 찍히고, 2번 블록을 만들기 시작하는 것을 알 수 있습니다.
Below is a log from a blockchain node. In the highlighted lines, you can see that after evaluating block 0, or the genesis block, it creates block 1 and proposes it, evaluates block 1 again and adds it to the blockchain, logs the consensus, and starts creating block 2.

::: details console logs of `NineChronicles.Headless.Executable`
```console:line-numbers {6,33,55,58,81-82,87,92,125-128,134}
[13:11:45 DBG] Secp256K1CryptoBackend initialized.
[13:11:45 DBG] Migrating RocksDB.
[13:11:45 DBG] RocksDB is initialized.
[13:11:45 DBG] Number of chain ids: 0
[13:11:45 DBG] Canonical chain id: 
[13:11:46 INF] [ActionEvaluator] Evaluating actions in the block #0 pre-evaluation hash 8610c9332afb37d64a6ca95987ea1220fcbd13a3e26ec6c399ae1aa78dbd5ec0...
[13:11:46 INF] [ActionEvaluator] Action Nekoyume.Action.InitializeStates took 27 ms to execute, GetState called 0 times and took 0 ms
[13:11:46 INF] [ActionEvaluator] Action Nekoyume.Action.PrepareRewardAssets took 0 ms to execute, GetState called 0 times and took 0 ms
[13:11:46 INF] [ActionEvaluator] Action Nekoyume.Action.PrepareRewardAssets took 0 ms to execute, GetState called 0 times and took 0 ms
[13:11:46 INF] [ActionEvaluator] Took 89 ms to evaluate 3 actions ["InitializeStates", "PrepareRewardAssets", "PrepareRewardAssets"] in transaction c7897b12850bc4f7cfe96f8ebb02d05d4b0b267e763badeea87fe658e69a9f79 by 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159 as a part of block #0 pre-evaluation hash 8610c9332afb37d64a6ca95987ea1220fcbd13a3e26ec6c399ae1aa78dbd5ec0
[13:11:46 INF] [ActionEvaluator] Action Libplanet.Action.Sys.Initialize took 1 ms to execute, GetState called 0 times and took 0 ms
[13:11:46 INF] [ActionEvaluator] Took 5 ms to evaluate 1 actions ["Initialize"] in transaction 7a2a0bd7001332c4f81342c141b9257e5fcb535e4b5a76c9e817d01e63872988 by 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159 as a part of block #0 pre-evaluation hash 8610c9332afb37d64a6ca95987ea1220fcbd13a3e26ec6c399ae1aa78dbd5ec0
[13:11:46 INF] [ActionEvaluator] Evaluating policy block action for block #0 8610c9332afb37d64a6ca95987ea1220fcbd13a3e26ec6c399ae1aa78dbd5ec0
[13:11:46 DBG] [b4179Ad0d7565A6EcFA70d2a0f727461039e0159, b4179Ad0d7565A6EcFA70d2a0f727461039e0159]RewardGold exec started
[13:11:46 WRN] No weekly arena state (e0c15f3CEF3FCdCb02e181b0077D2813Ebc925CA)
[13:11:46 DBG] [b4179Ad0d7565A6EcFA70d2a0f727461039e0159, b4179Ad0d7565A6EcFA70d2a0f727461039e0159]RewardGold Total Executed Time: 00:00:00.0044260
[13:11:46 INF] [ActionEvaluator] Action Nekoyume.Action.RewardGold took 8 ms to execute, GetState called 0 times and took 0 ms
[13:11:46 INF] [ActionEvaluator] Actions in 2 transactions for block #0 pre-evaluation hash 8610c9332afb37d64a6ca95987ea1220fcbd13a3e26ec6c399ae1aa78dbd5ec0 evaluated in 128 ms
[13:11:46 DBG] [BlockChain] Took 132 ms to evaluate block #0 hash ee0dae112ece151d4bce5300b7a16c1adc86cdc837df378fb395876de68b244c with 5 action evaluations
[13:11:46 INF] [ActionEvaluator] Evaluating actions in the block #0 pre-evaluation hash 8610c9332afb37d64a6ca95987ea1220fcbd13a3e26ec6c399ae1aa78dbd5ec0...
[13:11:46 INF] [ActionEvaluator] Action Nekoyume.Action.InitializeStates took 1 ms to execute, GetState called 0 times and took 0 ms
[13:11:46 INF] [ActionEvaluator] Action Nekoyume.Action.PrepareRewardAssets took 0 ms to execute, GetState called 0 times and took 0 ms
[13:11:46 INF] [ActionEvaluator] Action Nekoyume.Action.PrepareRewardAssets took 0 ms to execute, GetState called 0 times and took 0 ms
[13:11:46 INF] [ActionEvaluator] Took 35 ms to evaluate 3 actions ["InitializeStates", "PrepareRewardAssets", "PrepareRewardAssets"] in transaction c7897b12850bc4f7cfe96f8ebb02d05d4b0b267e763badeea87fe658e69a9f79 by 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159 as a part of block #0 pre-evaluation hash 8610c9332afb37d64a6ca95987ea1220fcbd13a3e26ec6c399ae1aa78dbd5ec0
[13:11:46 INF] [ActionEvaluator] Action Libplanet.Action.Sys.Initialize took 0 ms to execute, GetState called 0 times and took 0 ms
[13:11:46 INF] [ActionEvaluator] Took 0 ms to evaluate 1 actions ["Initialize"] in transaction 7a2a0bd7001332c4f81342c141b9257e5fcb535e4b5a76c9e817d01e63872988 by 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159 as a part of block #0 pre-evaluation hash 8610c9332afb37d64a6ca95987ea1220fcbd13a3e26ec6c399ae1aa78dbd5ec0
[13:11:46 INF] [ActionEvaluator] Evaluating policy block action for block #0 8610c9332afb37d64a6ca95987ea1220fcbd13a3e26ec6c399ae1aa78dbd5ec0
[13:11:46 DBG] [b4179Ad0d7565A6EcFA70d2a0f727461039e0159, b4179Ad0d7565A6EcFA70d2a0f727461039e0159]RewardGold exec started
[13:11:46 WRN] No weekly arena state (e0c15f3CEF3FCdCb02e181b0077D2813Ebc925CA)
[13:11:46 DBG] [b4179Ad0d7565A6EcFA70d2a0f727461039e0159, b4179Ad0d7565A6EcFA70d2a0f727461039e0159]RewardGold Total Executed Time: 00:00:00.0003890
[13:11:46 INF] [ActionEvaluator] Action Nekoyume.Action.RewardGold took 0 ms to execute, GetState called 0 times and took 0 ms
[13:11:46 INF] [ActionEvaluator] Actions in 2 transactions for block #0 pre-evaluation hash 8610c9332afb37d64a6ca95987ea1220fcbd13a3e26ec6c399ae1aa78dbd5ec0 evaluated in 37 ms
[13:11:46 DBG] [BlockChain] Took 38 ms to evaluate block #0 hash ee0dae112ece151d4bce5300b7a16c1adc86cdc837df378fb395876de68b244c with 5 action evaluations
[13:11:46 INF] [NetMQTransport] Listening on 31234...
[13:11:46 INF] [NetMQTransport] Listening on 31588...
[13:11:46 DBG] Initializing Swarm. ConsensusReactor: True
[13:11:46 DBG] Trying to delete 0 obsoleted chains...
[13:11:46 DBG] [Swarm] Starting swarm...
[13:11:46 DBG] [Swarm] Peer information : 0x251443E20eD8f821cE63Cb8E238c5eFB6DB209e7.Unspecified/127.0.0.1:31234.
[13:11:46 DBG] [Swarm] Watching the BlockChain for tip changes...
[13:11:46 DBG] [Swarm] Swarm started
[13:11:46 ERR] [Gossip] Peer discovery exception occurred during StartAsync.
Libplanet.Net.Protocols.PeerDiscoveryException: All seeds are unreachable.
   at Libplanet.Net.Protocols.KademliaProtocol.BootstrapAsync(IEnumerable`1 bootstrapPeers, Nullable`1 dialTimeout, Int32 depth, CancellationToken cancellationToken) in /Users/seungmin/Repositories/NineChronicles.Headless/Lib9c/.Libplanet/Libplanet.Net/Protocols/KademliaProtocol.cs:line 112
   at Libplanet.Net.Consensus.Gossip.StartAsync(CancellationToken ctx) in /Users/seungmin/Repositories/NineChronicles.Headless/Lib9c/.Libplanet/Libplanet.Net/Consensus/Gossip.cs:line 138
[13:11:46 DBG] [Gossip] All peers are alive. Starting gossip...
[13:11:46 INF] [ConsensusContext] Invoked NewHeight() for new height #1 from old height #-1
[13:11:46 DBG] [ConsensusContext] LastCommit of height #-1 is null
[13:11:46 INF] [ConsensusContext] Start consensus for height #-1
[13:11:46 DBG] [HeightVoteSet] Adding round 0
[13:11:46 INF] [Context] Created Context for height #1, round #-1
[13:11:46 INF] [Context] Starting context for height #1, LastCommit: null
[13:11:46 INF] [Context] Starting round 0 (was -1). (context: {"node_id":"0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159","number_of_validators":1,"height":1,"round":-1,"step":"Default","proposal":"null","locked_value":"null","locked_round":-1,"valid_value":"null","valid_round":-1})
[13:11:46 INF] [Context] Starting round 0 and is a proposer.
[13:11:46 DBG] [BlockChain] Starting to propose block #1...
[13:11:46 INF] [BlockChain] Gathering transactions to propose for block #1 from 0 staged transactions...
[13:11:46 INF] [BlockChain] Gathered total of 0 transactions to propose for block #1 from 0 staged transactions
[13:11:46 DBG] [BlockChain] Proposed block #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49 with previous hash ee0dae112ece151d4bce5300b7a16c1adc86cdc837df378fb395876de68b244c
[13:11:46 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.ConsensusProposalMsg as 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159.Unspecified/127.0.0.1:31588. to 0 peers
[13:11:46 INF] [Context] State (Proposal, VoteCount, Round, Step) changed from (Null, 0, -1, Default) to (Null, 0, 0, Propose)
[13:11:46 DBG] [Gossip] RebuildTableAsync: Updating the peer table from seed for every 60000 milliseconds...
[13:11:46 DBG] [Gossip] HeartbeatTask() has invoked.
[13:11:46 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.HaveMessage as 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159.Unspecified/127.0.0.1:31588. to 0 peers
[13:11:46 DBG] [Context] Proposal 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49 is set
[13:11:46 INF] [Context] State (Proposal, VoteCount, Round, Step) changed from (Null, 0, 0, Propose) to (90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49, 0, 0, Propose)
[13:11:46 DBG] [Context] Entering PreVote step due to proposal message with valid round -1. (context: {"node_id":"0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159","number_of_validators":1,"height":1,"round":0,"step":"Propose","proposal":"Libplanet.Consensus.Proposal","locked_value":"null","locked_round":-1,"valid_value":"null","valid_round":-1})
[13:11:46 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.ConsensusPreVoteMsg as 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159.Unspecified/127.0.0.1:31588. to 0 peers
[13:11:46 INF] [Context] State (Proposal, VoteCount, Round, Step) changed from (90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49, 0, 0, Propose) to (90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49, 0, 0, PreVote)
[13:11:46 DBG] [VoteSet] Adding verified vote {"validator_public_key":"033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14","vote_flag":"PreVote","block_hash":"90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49","height":1,"round":0,"timestamp":"07/12/2024 04:11:46 \u002B00:00"}
[13:11:46 DBG] [Context] AddMessage: Message: Libplanet.Net.Messages.ConsensusPreVoteMsg => Height: 1, Round: 0, Validator Address: 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159, Hash: 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49. (context: {"node_id":"0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159","number_of_validators":1,"height":1,"round":0,"step":"PreVote","proposal":"Libplanet.Consensus.Proposal","locked_value":"null","locked_round":-1,"valid_value":"null","valid_round":-1})
[13:11:46 INF] [Context] State (Proposal, VoteCount, Round, Step) changed from (90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49, 0, 0, PreVote) to (90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49, 1, 0, PreVote)
[13:11:46 DBG] [Context] PreVote step in round 0 is scheduled to be timed out because 2/3+ PreVotes are collected for the round. (context: {"node_id":"0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159","number_of_validators":1,"height":1,"round":0,"step":"PreVote","proposal":"Libplanet.Consensus.Proposal","locked_value":"null","locked_round":-1,"valid_value":"null","valid_round":-1})
[13:11:46 DBG] [Context] 2/3+ PreVotes for the current round 0 have collected. (context: {"node_id":"0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159","number_of_validators":1,"height":1,"round":0,"step":"PreVote","proposal":"Libplanet.Consensus.Proposal","locked_value":"null","locked_round":-1,"valid_value":"null","valid_round":-1})
[13:11:46 DBG] [Context] Entering PreCommit step due to proposal message and have collected 2/3+ PreVote for current round 0. (context: {"node_id":"0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159","number_of_validators":1,"height":1,"round":0,"step":"PreVote","proposal":"Libplanet.Consensus.Proposal","locked_value":"null","locked_round":-1,"valid_value":"null","valid_round":-1})
[13:11:46 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.ConsensusPreCommitMsg as 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159.Unspecified/127.0.0.1:31588. to 0 peers
[13:11:46 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.ConsensusMaj23Msg as 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159.Unspecified/127.0.0.1:31588. to 0 peers
[13:11:46 INF] [Context] State (Proposal, VoteCount, Round, Step) changed from (90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49, 1, 0, PreVote) to (90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49, 1, 0, PreCommit)
[13:11:46 DBG] [VoteSet] Adding verified vote {"validator_public_key":"033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14","vote_flag":"PreCommit","block_hash":"90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49","height":1,"round":0,"timestamp":"07/12/2024 04:11:46 \u002B00:00"}
[13:11:46 DBG] [Context] AddMessage: Message: Libplanet.Net.Messages.ConsensusPreCommitMsg => Height: 1, Round: 0, Validator Address: 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159, Hash: 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49. (context: {"node_id":"0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159","number_of_validators":1,"height":1,"round":0,"step":"PreCommit","proposal":"Libplanet.Consensus.Proposal","locked_value":"90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49","locked_round":0,"valid_value":"90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49","valid_round":0})
[13:11:46 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.ConsensusMaj23Msg as 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159.Unspecified/127.0.0.1:31588. to 0 peers
[13:11:46 INF] [Context] Committing block #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49 (context: {"node_id":"0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159","number_of_validators":1,"height":1,"round":0,"step":"EndCommit","proposal":"Libplanet.Consensus.Proposal","locked_value":"90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49","locked_round":0,"valid_value":"90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49","valid_round":0})
[13:11:46 INF] [Context] Committed block #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49
[13:11:46 INF] [Context] State (Proposal, VoteCount, Round, Step) changed from (90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49, 1, 0, PreCommit) to (90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49, 2, 0, EndCommit)
[13:11:46 DBG] [Context] Operation will not run in EndCommit step
[13:11:46 DBG] [Context] GetBlockCommit: CommittedRound: 0, Decision: 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49, BlockCommit: {"block_hash":"90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49","height":1,"round":0,"votes":[{"validator_public_key":"033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14","flag":2,"timestamp":"07/12/2024 04:11:46 \u002B00:00"}]}
[13:11:46 INF] [BlockChain] Trying to append block #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49...
[13:11:46 INF] [BlockChain] Block #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49 with timestamp 2024-07-12T04:11:46.569397Z appended at 2024-07-12T04:11:46.614172Z
[13:11:46 INF] [BlockChain] Unstaging 0 transactions from block #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49...
[13:11:46 INF] [BlockChain] Unstaged 0 transactions from block #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49...
[13:11:46 INF] [Swarm] Trying to broadcast block #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49...
[13:11:46 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.BlockHeaderMsg as 0x251443E20eD8f821cE63Cb8E238c5eFB6DB209e7.Unspecified/127.0.0.1:31234. to 0 peers
[13:11:46 INF] [BlockChain] Appended the block #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49
[13:11:46 INF] [ActionEvaluator] Evaluating actions in the block #1 pre-evaluation hash e36ce7afe753b7a2b05ed91139680a73ed3eabb42a8e532727d61b33a11542ee...
[13:11:46 INF] [ActionEvaluator] Evaluating policy block action for block #1 e36ce7afe753b7a2b05ed91139680a73ed3eabb42a8e532727d61b33a11542ee
[13:11:46 DBG] [b4179Ad0d7565A6EcFA70d2a0f727461039e0159, b4179Ad0d7565A6EcFA70d2a0f727461039e0159]RewardGold exec started
[13:11:46 DBG] [b4179Ad0d7565A6EcFA70d2a0f727461039e0159, b4179Ad0d7565A6EcFA70d2a0f727461039e0159]RewardGold Total Executed Time: 00:00:00.0000900
[13:11:46 INF] [ActionEvaluator] Action Nekoyume.Action.RewardGold took 0 ms to execute, GetState called 0 times and took 0 ms
[13:11:46 INF] [ActionEvaluator] Actions in 0 transactions for block #1 pre-evaluation hash e36ce7afe753b7a2b05ed91139680a73ed3eabb42a8e532727d61b33a11542ee evaluated in 0 ms
[13:11:46 DBG] [BlockChain] Took 1 ms to evaluate block #1 hash 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49 with 1 action evaluations
[13:11:46 INF] [BlockChain] Invoking 2 renderers and 1 action renderers for #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49
[13:11:46 DBG] [LoggedRenderer] Invoking RenderBlock() for #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49 (was #0 ee0dae112ece151d4bce5300b7a16c1adc86cdc837df378fb395876de68b244c)...
[13:11:46 DBG] [LoggedRenderer] Invoked RenderBlock() for #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49 (was #0 ee0dae112ece151d4bce5300b7a16c1adc86cdc837df378fb395876de68b244c)
[13:11:46 DBG] [BlockChain] Rendering actions in block #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49...
[13:11:46 DBG] [LoggedRenderer] Invoking RenderAction() for an action Bencodex.Types.Dictionary at block #1...
[13:11:46 DBG] [LoggedRenderer] Invoked RenderAction() for an action Bencodex.Types.Dictionary at block #1
[13:11:46 DBG] [BlockChain] Finished rendering 1 renders for actions in block #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49 in 1 ms
[13:11:46 DBG] [LoggedRenderer] Invoking RenderBlockEnd() for #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49 (was #0 ee0dae112ece151d4bce5300b7a16c1adc86cdc837df378fb395876de68b244c)...
[13:11:46 DBG] [LoggedRenderer] Invoked RenderBlockEnd() for #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49 (was #0 ee0dae112ece151d4bce5300b7a16c1adc86cdc837df378fb395876de68b244c)
[13:11:46 INF] [BlockChain] Invoked 2 renderers and 1 action renderers for #1 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49
[13:11:47 DBG] [Gossip] HeartbeatTask() has invoked.
[13:11:47 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.HaveMessage as 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159.Unspecified/127.0.0.1:31588. to 0 peers
[13:11:48 DBG] [Gossip] HeartbeatTask() has invoked.
[13:11:48 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.HaveMessage as 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159.Unspecified/127.0.0.1:31588. to 0 peers
[13:11:49 DBG] [Gossip] HeartbeatTask() has invoked.
[13:11:49 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.HaveMessage as 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159.Unspecified/127.0.0.1:31588. to 0 peers
[13:11:50 DBG] [Gossip] HeartbeatTask() has invoked.
[13:11:50 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.HaveMessage as 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159.Unspecified/127.0.0.1:31588. to 0 peers
[13:11:50 INF] [Context] TimeoutPreVote has occurred in 00:00:04. {"node_id":"0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159","number_of_validators":1,"height":1,"round":0,"step":"EndCommit","proposal":"Libplanet.Consensus.Proposal","locked_value":"90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49","locked_round":0,"valid_value":"90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49","valid_round":0}
[13:11:51 DBG] [Gossip] HeartbeatTask() has invoked.
[13:11:51 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.HaveMessage as 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159.Unspecified/127.0.0.1:31588. to 0 peers
[13:11:52 DBG] [Gossip] HeartbeatTask() has invoked.
[13:11:52 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.HaveMessage as 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159.Unspecified/127.0.0.1:31588. to 0 peers
[13:11:53 DBG] [Gossip] HeartbeatTask() has invoked.
[13:11:53 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.HaveMessage as 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159.Unspecified/127.0.0.1:31588. to 0 peers
[13:11:53 INF] [ConsensusContext] Invoked NewHeight() for new height #2 from old height #1
[13:11:53 DBG] [Context] GetBlockCommit: CommittedRound: 0, Decision: 90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49, BlockCommit: {"block_hash":"90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49","height":1,"round":0,"votes":[{"validator_public_key":"033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14","flag":2,"timestamp":"07/12/2024 04:11:46 \u002B00:00"}]}
[13:11:53 DBG] [ConsensusContext] LastCommit of height #1 is {"block_hash":"90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49","height":1,"round":0,"votes":[{"validator_public_key":"033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14","flag":2,"timestamp":"07/12/2024 04:11:46 \u002B00:00"}]}
[13:11:53 INF] [ConsensusContext] Start consensus for height #1
[13:11:53 DBG] [HeightVoteSet] Adding round 0
[13:11:53 INF] [Context] Created Context for height #2, round #-1
[13:11:53 INF] [Context] Starting context for height #2, LastCommit: {"block_hash":"90e2d936d3cbb4f8751c916c71015326ffc67722cd188876b7f6f06753c20d49","height":1,"round":0,"votes":[{"validator_public_key":"033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14","flag":2,"timestamp":"07/12/2024 04:11:46 \u002B00:00"}]}
[13:11:53 INF] [Context] Starting round 0 (was -1). (context: {"node_id":"0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159","number_of_validators":1,"height":2,"round":-1,"step":"Default","proposal":"null","locked_value":"null","locked_round":-1,"valid_value":"null","valid_round":-1})
[13:11:53 INF] [Context] Starting round 0 and is a proposer.
[13:11:53 DBG] [BlockChain] Starting to propose block #2...
```
:::

To shut down the blockchain node, type `Ctrl+C`(`^C`) in the console. You should see the blockchain node shut down successfully, as shown in the log below.

::: details console logs of `NineChronicles.Headless.Executable`
```console {1}
^C[13:11:55 DBG] [Swarm] Stopping watching BlockChain for tip changes...
[13:11:55 DBG] [Swarm] Stopping Swarm...
[13:11:56 DBG] [Gossip] HeartbeatTask() has invoked.
[13:11:56 DBG] [NetMQTransport] Broadcasting message Libplanet.Net.Messages.HaveMessage as 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159.Unspecified/127.0.0.1:31588. to 0 peers
[13:11:56 DBG] [Context] Cancellation was requested
System.OperationCanceledException: The operation was canceled.
   at System.Threading.Channels.AsyncOperation`1.GetResult(Int16 token)
   at Libplanet.Net.Consensus.Context.ConsumeMutation(CancellationToken cancellationToken) in /Users/seungmin/Repositories/NineChronicles.Headless/Lib9c/.Libplanet/Libplanet.Net/Consensus/Context.Async.cs:line 129
   at Libplanet.Net.Consensus.Context.MutationConsumerTask(CancellationToken cancellationToken) in /Users/seungmin/Repositories/NineChronicles.Headless/Lib9c/.Libplanet/Libplanet.Net/Consensus/Context.Async.cs:line 75
[13:11:56 DBG] [Context] Cancellation was requested
System.OperationCanceledException: The operation was canceled.
   at System.Threading.Channels.AsyncOperation`1.GetResult(Int16 token)
   at Libplanet.Net.Consensus.Context.ConsumeMessage(CancellationToken cancellationToken) in /Users/seungmin/Repositories/NineChronicles.Headless/Lib9c/.Libplanet/Libplanet.Net/Consensus/Context.Async.cs:line 115
   at Libplanet.Net.Consensus.Context.MessageConsumerTask(CancellationToken cancellationToken) in /Users/seungmin/Repositories/NineChronicles.Headless/Lib9c/.Libplanet/Libplanet.Net/Consensus/Context.Async.cs:line 43
[13:11:56 WRN] [Gossip] RefreshTableAsync() is cancelled.
System.Threading.Tasks.TaskCanceledException: A task was canceled.
   at Libplanet.Net.Consensus.Gossip.RefreshTableAsync(CancellationToken ctx) in /Users/seungmin/Repositories/NineChronicles.Headless/Lib9c/.Libplanet/Libplanet.Net/Consensus/Gossip.cs:line 563
[13:11:56 DBG] [Swarm] Swarm stopped
[13:11:56 DBG] Disposing LibplanetNodeService...
[13:11:56 WRN] [Swarm] RebuildConnectionAsync() is cancelled
System.Threading.Tasks.TaskCanceledException: A task was canceled.
   at Libplanet.Net.Swarm.RebuildConnectionAsync(TimeSpan period, CancellationToken cancellationToken) in /Users/seungmin/Repositories/NineChronicles.Headless/Lib9c/.Libplanet/Libplanet.Net/Swarm.cs:line 1436
[13:11:56 WRN] [Swarm] RefreshTableAsync() was cancelled
System.Threading.Tasks.TaskCanceledException: A task was canceled.
   at Libplanet.Net.Swarm.RefreshTableAsync(TimeSpan period, TimeSpan maxAge, CancellationToken cancellationToken) in /Users/seungmin/Repositories/NineChronicles.Headless/Lib9c/.Libplanet/Libplanet.Net/Swarm.cs:line 1411
[13:11:56 WRN] [Swarm] BroadcastTxAsync() was canceled
System.Threading.Tasks.TaskCanceledException: A task was canceled.
   at Libplanet.Net.Swarm.BroadcastTxAsync(TimeSpan broadcastTxInterval, CancellationToken cancellationToken) in /Users/seungmin/Repositories/NineChronicles.Headless/Lib9c/.Libplanet/Libplanet.Net/Swarm.cs:line 1348
[13:11:56 WRN] [Swarm] BroadcastBlockAsync() was canceled
System.Threading.Tasks.TaskCanceledException: A task was canceled.
   at Libplanet.Net.Swarm.BroadcastBlockAsync(TimeSpan broadcastBlockInterval, CancellationToken cancellationToken) in /Users/seungmin/Repositories/NineChronicles.Headless/Lib9c/.Libplanet/Libplanet.Net/Swarm.cs:line 1321
[13:11:56 DBG] Swarm disposed.
[13:11:56 DBG] Store disposed.
```
:::

## Check the created blockchain store

If you check the path you set in the `StorePath` entry in `appsettings.local.json`, you'll see that several folders and files have been created.

```console
./store
├── block
│   ├── blockindex
│   │   └── ...
│   └── epoch19916
│       └── ...
├── blockcommit
│   └── ...
├── blockpercept
│   └── ...
├── chain
│   └── ...
├── nextstateroothash
│   └── ...
├── states
│   └── ...
├── tx
│   ├── epoch19916
│   │   └── ...
│   └── txindex
│       └── ...
├── txbindex
│   └── ...
└── txexec
    └── ...
```

You can see that the blockchain store was created successfully. This is evidence that the Nine Chronicles blockchain node is working properly.

When you run the blockchain node again, it will work on blocks at the appropriate index based on the data in the blockchain store.

```console
➜  NineChronicles.Headless.Executable & dotnet run --config=./appsettings.local.json --arena-participants-sync=false
```

::: tip :tada:
Congratulations! You've now learned how to run a blockchain node in NineChronicles using the `NineChronicles.Headless.Executable` project. In this guide, we've been working with a single node. In other guides, you'll be able to join other blockchain networks, such as the mainnet.
Next, we'll learn how to use the GraphQL service provided by the blockchain node to query the blockchain state.
:::
