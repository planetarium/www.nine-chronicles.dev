About the `APV`'s description, you can see [*Explain App Protocol Version(a.k.a. APV)*](https://devforum.nine-chronicles.com/t/explain-app-protocol-version-a-k-a-apv/34) topic.

### Install `planet` command

Now, the [Libplanet](https://docs.libplanet.io) provides the CLI app on the [NPM](https://npmjs.com) service. You can install the [@planetarium/cli](https://npmjs.com/package/@planetarium/cli) package with the below commands:

```text
# With npm
$ npm install -g @planetarium/cli

# With yarn
yarn global add @planetarium/cli
```

### Analyze an APV with the `planet` command

If you have played Nine Chronicles, you might use APV signed by the Nine Corporation.

You can see the latest APV at http://download.nine-chronicles.com/9c-launcher-config.json.

```json
{
    "AppProtocolVersion": "100282/6ec8E598962F1f475504F82fD5bF3410eAE58B9B/MEUCIQDYz9MXCV3k3B93+R2GZs+BCnu8SwfZOZ4GQeCLKqjIfwIgFlC1AlOBs9KR4Y00MVBpmh9dGa6P6wEXy9NZNwGOrRU=/ZHUxNjpXaW5kb3dzQmluYXJ5VXJsdTU2Omh0dHBzOi8vZG93bmxvYWQubmluZS1jaHJvbmljbGVzLmNvbS92MTAwMjgyL1dpbmRvd3MuemlwdTk6dGltZXN0YW1wdTEwOjIwMjItMDgtMjll",
    "AwsRegion": "ap-northeast-2",
    "AwsSecretKey": "Z8Hlm2K2sT4wEP2uuHgSDaTAVj5FwkNb7LyfWF/b",
    "BlockchainStoreDirName": "9c-main-partition",
    "BlockchainStoreDirParent": "",
    "ConfigVersion": 1,
    "Confirmations": 0,
    "DataProviderUrl": "https://api.9c.gg/graphql",
    "GenesisBlockPath": "https://download.nine-chronicles.com/genesis-block-9c-main",
    "HeadlessArgs": [
        "--minimum-broadcast-target=20",
        "--bucket-size=20",
        "--chain-tip-stale-behavior-type=reboot",
        "--tip-timeout=180"
    ],
    "IceServerStrings": [
        "turn://0ed3e48007413e7c2e638f13ddd75ad272c6c507e081bd76a75e4b7adc86c9af:0apejou+ycZFfwtREeXFKdfLj2gCclKzz5ZJ49Cmy6I=@turn-us.planetarium.dev:3478",
        "turn://0ed3e48007413e7c2e638f13ddd75ad272c6c507e081bd76a75e4b7adc86c9af:0apejou+ycZFfwtREeXFKdfLj2gCclKzz5ZJ49Cmy6I=@turn-us2.planetarium.dev:3478",
        "turn://0ed3e48007413e7c2e638f13ddd75ad272c6c507e081bd76a75e4b7adc86c9af:0apejou+ycZFfwtREeXFKdfLj2gCclKzz5ZJ49Cmy6I=@turn-us3.planetarium.dev:3478",
        "turn://0ed3e48007413e7c2e638f13ddd75ad272c6c507e081bd76a75e4b7adc86c9af:0apejou+ycZFfwtREeXFKdfLj2gCclKzz5ZJ49Cmy6I=@turn-us5.planetarium.dev:3478"
    ],
    "LaunchPlayer": true,
    "Locale": "",
    "LogSizeBytes": 1073741824,
    "Mixpanel": true,
    "MuteTeaser": true,
    "Network": "9c-main",
    "NoMiner": true,
    "NoTrustedStateValidators": true,
    "PeerStrings": [
        "027bd36895d68681290e570692ad3736750ceaab37be402442ffb203967f98f7b6,9c-main-tcp-seed-1.planetarium.dev,31234",
        "02f164e3139e53eef2c17e52d99d343b8cbdb09eeed88af46c352b1c8be6329d71,9c-main-tcp-seed-2.planetarium.dev,31234",
        "0247e289aa332260b99dfd50e578f779df9e6702d67e50848bb68f3e0737d9b9a5,9c-main-tcp-seed-3.planetarium.dev,31234"
    ],
    "RemoteNodeList": [
        "9c-main-rpc-1.nine-chronicles.com,80,31238",
        "9c-main-rpc-2.nine-chronicles.com,80,31238",
        "9c-main-rpc-3.nine-chronicles.com,80,31238",
        "9c-main-rpc-4.nine-chronicles.com,80,31238",
        "9c-main-rpc-5.nine-chronicles.com,80,31238",
        "9c-main-rpc-6.nine-chronicles.com,80,31238",
        "9c-main-rpc-7.nine-chronicles.com,80,31238",
        "9c-main-rpc-8.nine-chronicles.com,80,31238",
        "9c-main-rpc-9.nine-chronicles.com,80,31238",
        "9c-main-rpc-10.nine-chronicles.com,80,31238"
    ],
    "Sentry": true,
    "SnapshotPaths": [
        "https://snapshots.nine-chronicles.com/main/partition"
    ],
    "SnapshotThreshold": 0,
    "StoreType": "rocksdb",
    "SwapAddress": "0x9093dd96c4bb6b44A9E0A522e2DE49641F146223",
    "TrustedAppProtocolVersionSigners": [
        "03eeedcd574708681afb3f02fb2aef7c643583089267d17af35e978ecaf2a1184e"
    ],
    "UseRemoteHeadless": true,
    "UseV2Interface": true,
    "Workers": 1000
}
```

You can get the APV from `AppProtocolVersion` property and you can analyze it with `planet` command:

```text
$ planet apv analyze 100282/6ec8E598962F1f475504F82fD5bF3410eAE58B9B/MEUCIQDYz9MXCV3k3B93+R2GZs+BCnu8SwfZOZ4GQeCLKqjIfwIgFlC1AlOBs9KR4Y00MVBpmh9dGa6P6wEXy9NZNwGOrRU=/ZHUxNjpXaW5kb3dzQmluYXJ5VXJsdTU2Omh0dHBzOi8vZG93bmxvYWQubmluZS1jaHJvbmljbGVzLmNvbS92MTAwMjgyL1dpbmRvd3MuemlwdTk6dGltZXN0YW1wdTEwOjIwMjItMDgtMjll

Field                  Value                                                                                                                                         
---------------------- ----------------------------------------------------------------------------------------------------------------------------------------------
version                100282                                                                                                                                        
signature              3045022100d8cfd317095de4dc1f77f91d8666cf810a7bbc4b07d9399e0641e08b2aa8c87f02201650b5025381b3d291e18d343150699a1f5d19ae8feb0117cbd35937018ead15
signer                 0x6ec8E598962F1f475504F82fD5bF3410eAE58B9B                                                                                                    
extra.WindowsBinaryUrl https://download.nine-chronicles.com/v100282/Windows.zip                                                                                      
extra.timestamp        2022-08-29
```

### Create a new APV with the `planet` command

Then if you want to build your own Nine Chronicles network, you should make your own new APV. Then you can use `planet apv sign` command. It requires your private key and see [Manage your keys with the 'planet' command](./manage-your-keys-with-the-planet-command) to create or import your private key.

At first, check the key id of your key.

```text
$ planet key
Key ID                               Address                                   
------------------------------------ ------------------------------------------
5d79fa1e-9fab-41f6-ad5a-423217e87594 0x7bf2F56085aFE0f78c8F1EdE6De7104814398fD9
```

Okay, you might find your key's id. And you should use `planet apv sign` command. It has two required arguments:

 - `KEY_ID`: The key id you found with the above command.
 - `VERSION`: The integer of your APV. (e.g. 1, 2, 3, 100000)

Then let's create your own APV.

```text
$ planet apv sign 5d79fa1e-9fab-41f6-ad5a-423217e87594 1  
Passphrase (of 5d79fa1e-9fab-41f6-ad5a-423217e87594): ***
1/7bf2F56085aFE0f78c8F1EdE6De7104814398fD9/MEQCIEW32AoO2cXeOuT1K9tQD0xHf4mEwVWXkZzR3qR3HUaKAiBRBSNdwKQs72r4rHSlLm3CSHtDY5WXmLnLckDgtY9GjA==
```

Then the below one is your own APV :tada: 

```text
1/7bf2F56085aFE0f78c8F1EdE6De7104814398fD9/MEQCIEW32AoO2cXeOuT1K9tQD0xHf4mEwVWXkZzR3qR3HUaKAiBRBSNdwKQs72r4rHSlLm3CSHtDY5WXmLnLckDgtY9GjA==
```
