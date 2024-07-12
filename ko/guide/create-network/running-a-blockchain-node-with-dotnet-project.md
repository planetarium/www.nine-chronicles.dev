# 블록체인 노드 실행하기: .NET 프로젝트

블록체인 노드(Node)는 블록체인 네트워크를 구성하는 개별 컴퓨터나 서버를 의미합니다. 각 노드는 블록체인 데이터를 저장하고, 새 트랜잭션을 검증하며, 다른 노드들과 정보를 교환하여 네트워크의 분산성을 유지합니다. 노드는 블록체인 네트워크의 근간이 되며, 네트워크의 보안과 무결성을 보장하는 역할을 합니다.

우리는 [앞에서](./create-a-genesis-block.md) 나인크로니클의 블록체인 노드 구현체인 [NineChronicles.Headless][nc-headless]를 복제해서 제네시스 블록을 만드는데 사용해봤습니다. 이번에는 블록체인 노드를 실행해보겠습니다.

[nc-headless]: https://github.com/planetarium/NineChronicles.Headless

::: info :bulb:
본 문서에서는 `NineChronicles.Headless` 저장소의 `v200200` 태그를 기준으로 진행했습니다.
:::

## `appsettings.local.json` 설정하기

나인크로니클의 블록체인 노드를 실행할 때에는 아래와 같이 많은 옵션을 입력할 수 있습니다.

::: details `NineChronicles.Headless.Executable` 실행 옵션
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

각각의 옵션을 따로 지정해주는 방법을 사용할 수도 있지만, 여기서는 `--config` 옵션을 사용해서 `json` 형식으로 작성된 옵션 파일을 지정해주는 방법을 사용해 보겠습니다.

`NineChronicles.Headless.Executable/appsettings.local.json` 경로에 파일을 만들고 아래와 같이 옵션을 설정해줍니다. `Headless` 항목을 위주로 보세요.

::: danger :rotating_light:
여기서는 예를 들기 위해서 개인 키를 노출합니다만, 이외의 목적으로 사용하는 개인 키는 절대로 노출해서는 안 됩니다.
:::

::: details `appsettings.local.json` 파일
```json
{
    "$schema": "./appsettings-schema.json",
    "Headless": {
        // 오딘 행성으로 설정했습니다.
        "Planet": "Odin",
        // 제네시스 블록 파일의 절대 경로 또는 URL을 입력합니다. e.g., 앞에서 만든 사용자 정의 제네시스 블록 파일의 절대 경로
        "GenesisBlockPath": "path-of-genesis-block",
        // 태그버전에 맞게 200200 버전으로 설정했습니다.
        "AppProtocolVersionString": "200200/AB2da648b9154F2cCcAFBD85e0Bc3d51f97330Fc/MEUCIQCaK89fzl+RWPKD28zCFYUJvWFrcqsBizZ3k5HYLMcsogIgMtXiuZZlp.C3OSZIyYRHbcV263F2nh2CJhFwP1NY85I=/ZHU5OnRpbWVzdGFtcHUxMDoyMDI0LTA3LTA5ZQ==",
        "StoreType": "rocksdb",
        // 블록체인 저장소의 절대 경로를 설정합니다. e.g., "/Users/{username}/nine-chronicles/store"
        "StorePath": "path-of-blockchain-store",
        // 블록을 채굴하기 위해서 false로 설정했습니다.
        "NoMiner": false,
        // 블록에 서명하기 위한 개인 키를 앞에서 예시로 만든 개인 키로 설정했습니다.
        "MinerPrivateKeyString": "9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102",
        // 블록 합의를 위한 개인 키를 앞에서 예시로 만든 개인 키로 설정했습니다.
        "ConsensusPrivateKeyString": "9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102",
        "ConsensusSeedStrings": [
            // 앞에서 예시로 만든 개인 키의 공개 키를 설정했습니다.
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

## 블록체인 노드 실행하기

아래의 명령어로 블록체인 노드를 실행해 보겠습니다.

```console
➜  NineChronicles.Headless.Executable & dotnet run --config=./appsettings.local.json --arena-participants-sync=false
```

아래는 블록체인 노드의 로그입니다. 강조된 라인들을 보면, 0번 블록 즉 제네시스 블록을 평가한 후에 1번 블록을 만들어서 제안하고, 다시 1번 블록을 평가하고 블록체인에 추가한 후에 합의와 관련한 로그가 찍히고, 2번 블록을 만들기 시작하는 것을 알 수 있습니다.

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

블록체인 노드를 종료할 때에는 콘솔에서 `Ctrl+C`(`^C`)를 입력해주세요. 아래 로그에서와 같이 블록체인 노드가 잘 종료되는 것을 확인할 수 있습니다.

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

## 생성된 블록체인 저장소 확인하기

`appsettings.local.json`에서 `StorePath` 항목에 설정한 경로를 확인해보면 여러 폴더와 파일들이 생성된 것을 확인할 수 있습니다.

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

블록체인 저장소가 정상적으로 생성되었음을 확인할 수 있습니다. 이는 나인크로니클 블록체인 노드가 정상적으로 동작하고 있는 증거입니다.

다시 블록체인 노드를 실행하면 블록체인 저장소의 데이터를 기준으로 적절한 인덱스의 블록에 대한 작업이 진행됩니다.

```console
➜  NineChronicles.Headless.Executable & dotnet run --config=./appsettings.local.json --arena-participants-sync=false
```

::: tip :tada:
수고하셨습니다! 이제 여러분은 `NineChronicles.Headless.Executable` 프로젝트를 이용해서 나인크로니클의 블록체인 노드를 실행하는 방법을 배웠습니다. 여기서는 단일 노드로 동작하는 것을 해봤는데요. 다른 가이드에서는 다른 블록체인 네트워크, 예를 들어서 메인넷에 참여하는 것도 할 수 있습니다.
다음은 블록체인 노드에서 제공하는 GraphQL 서비스를 이용해서 블록체인 상태를 조회하는 방법을 배워보겠습니다.
:::
