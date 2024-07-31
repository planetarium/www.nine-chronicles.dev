### Update (2022-12-12)

We provide sample `appsettings.{network}.json` to connect to the network you want or run your own local network easily.
Please check section 3.3.1. to get new info.

### Update (2022-11-18)

We recently made an update that allows you to manage arguments to a file for running a headless server.
Information on this has been added to Section 3.3.

# 1. Summary

According to our [product structure](./nine-chronicles-service-and-repository-structure), the headless server is responsible for relaying transactions and communicates with Unity Client and Launcher. Currently, these headless servers are operating as remote gRPC servers managed by Planetarium and the launcher communicates with this RPC server by default, but you can run your own RPC server on your machine or container.
In this post, we will discuss how to get your own RPC server attached to Nine Chronicles mainnet and make your launcher/client communicate with to play game.

## :warning: High Disk Storage Usage

In order to run your RPC server, you have to store full blockchain data on your machine and the size of the full snapshot file is currently about 30GB in compressed form.
Please be sure you have **100+GB of free storage** before doing this action.

# 2. How to pt.1 : Use the official Docker image

Planetarium uses Docker to run mainnet server. These Docker images are also publically opened, and you can easily use this Docker image to run the server instead of starting from scratch.

## 2.1. Preparation

### 2.1.1. Install Docker

Please visit [Docker homepage](https://docs.docker.com/get-docker/) to install Docker on your system.

### 2.1.2. Download blockchain snapshot

:warning: Warning: This consumes a lot of your disk storage.
Visit [here](https://snapshots.nine-chronicles.com/main/partition/full/9c-main-snapshot.zip) and download the latest snapshot file. (If you don't know what a snapshot file is, Read [this article](./the-structure-and-detail-of-the-snapshot-file)).
Extract snapshots to your storage path.

```shell
# For Windows PowerShell
Expand-Archive 9c-main-snapshot.zip -DestinationPath [your\storage\path]

# For Bash
unzip 9c-main-snapshot.zip [your/storage/path]
```
Make sure your fully extracted data are all stored inside the `9c-main-snapshot` directory.
`[your/storage/path]/9c-main-snapshot/_blabla_`

### 2.1.3. Get Docker image

Get Docker image to run. See [Planetarium's official Docker hub](https://hub.docker.com/r/planetariumhq/ninechronicles-headless/tags) and select the image with the tag name `v100***`. if you're unsure which version to download, click [here](https://download.nine-chronicles.com/9c-launcher-config.json) to download the latest launcher configuration, then check what `AppProtocolVersion` is.  The first six digit with `100xxx/` is the current mainnet version.
```shell
docker pull planetariumhq/ninechronicles-headless:v100291  # v100291 is the latest release at this moment
```

### 2.1.4. Run Docker container

Now you are ready to run the Nine Chronicles RPC server using Docker. We have our snapshot in local storage, so we have to mount it to a Docker container.
```shell
docker run -d -p 23231:23231 -p 23232:23232 --name=headless --mount type=bind,source=[your/storage/path]/9c-main-snapshot,target=/app/data/9c-main-snapshot \
planetariumhq/ninechronicles-headless:v100291 \ 
 -V=100291/6ec8E598962F1f475504F82fD5bF3410eAE58B9B/MEUCIQCA3lzUAt0QBfG.+ezw4CQ69zBy669sANEt5juSJgzqcgIgbozfpcyeuKJDeJoT5exyGYDYBqCpxklsMEfs0SQ6qzo=/ZHUxNjpXaW5kb3dzQmluYXJ5VXJsdTcyOmh0dHBzOi8vcmVsZWFzZS5uaW5lLWNocm9uaWNsZXMuY29tL21haW4vdjEwMDI5MS9sYXVuY2hlci92MS9XaW5kb3dzLnppcHU5OnRpbWVzdGFtcHUxMDoyMDIyLTA5LTA3ZQ== \
  -G=https://release.nine-chronicles.com/genesis-block-9c-main \
  --store-type=rocksdb \
  --store-path=/app/data/9c-main-snapshot \
  -I=turn://0ed3e48007413e7c2e638f13ddd75ad272c6c507e081bd76a75e4b7adc86c9af:0apejou+ycZFfwtREeXFKdfLj2gCclKzz5ZJ49Cmy6I=@turn-us.planetarium.dev:3478 \
  -I=turn://0ed3e48007413e7c2e638f13ddd75ad272c6c507e081bd76a75e4b7adc86c9af:0apejou+ycZFfwtREeXFKdfLj2gCclKzz5ZJ49Cmy6I=@turn-us2.planetarium.dev:3478 \
  -I=turn://0ed3e48007413e7c2e638f13ddd75ad272c6c507e081bd76a75e4b7adc86c9af:0apejou+ycZFfwtREeXFKdfLj2gCclKzz5ZJ49Cmy6I=@turn-us3.planetarium.dev:3478 \
  -I=turn://0ed3e48007413e7c2e638f13ddd75ad272c6c507e081bd76a75e4b7adc86c9af:0apejou+ycZFfwtREeXFKdfLj2gCclKzz5ZJ49Cmy6I=@turn-us5.planetarium.dev:3478 \
  --peer=027bd36895d68681290e570692ad3736750ceaab37be402442ffb203967f98f7b6,9c-main-tcp-seed-1.planetarium.dev,31234 \
  --peer=02f164e3139e53eef2c17e52d99d343b8cbdb09eeed88af46c352b1c8be6329d71,9c-main-tcp-seed-2.planetarium.dev,31234 \
  --peer=0247e289aa332260b99dfd50e578f779df9e6702d67e50848bb68f3e0737d9b9a5,9c-main-tcp-seed-3.planetarium.dev,31234 \
  -T=03eeedcd574708681afb3f02fb2aef7c643583089267d17af35e978ecaf2a1184e \
  --no-miner \
  --rpc-server \
  --rpc-listen-host=0.0.0.0 \
  --rpc-listen-port=23231 \ # pick your own port for RPC server 
  --graphql-server \
  --graphql-host=0.0.0.0 \
  --graphql-port=23232 \ # pick your own port for GraphQL server 
  --workers=1000 \
  --confirmations=0 \
  --minimum-broadcast-target=20 \
  --bucket-size=20 \
  --chain-tip-stale-behavior-type=reboot \
  --tip-timeout=180
```
Please make sure that the Docker ports and server ports are same and is exposed with `-p` option.
Since it tries snapshot to catch up to current block tip and renders all actions in the process to sync up with latest state, It may take awhile.
You may encounter with bunch of `timeout error`, but there's no big deal in syncing your server to the block tip correctly. Instead, watch server log carefully and troubleshoot when you see `block attach fail` error.
If you need to check shell output, attach and see with following command:
```shell
docker attach --sig-proxy=false headless
```
And you can use `Ctrl + C` to detach.

# 3. How to pt.2 : Build from source code

## 3.1. Preparation

### 3.1.1. Install .NET SDK

You can build & run RPC server using `NineChronicles.Headless` repository, written in C#. Please check you have installed .NET SDK 6.0.
The following command can be used to check currently installed .NET SDKs on your computer.

```shell
$ dotnet --list-sdks
6.0.400 [/usr/share/dotnet/sdk]  # The output should looks like this.
```

### 3.1.2. Clone repository

You can directly clone Planetarium's official repository or fork it and clone it from your repository.

```shell
git clone https://github.com/planetarium/NineChronicles.Headless
cd NineChronicles.Headless
git checkout main
git submodule update --init --recursive
```

### 3.1.3. Download blockchain snapshot

:warning: Warning: This consumes a lot of your disk storage.
Visit [here](https://snapshots.nine-chronicles.com/main/partition/full/9c-main-snapshot.zip) and download latest snapshot file. (If you don't know what a snapshot file is, Read [this article](./the-structure-and-detail-of-the-snapshot-file)).
Extract snapshot to your storage path.

```shell
# For Windows PowerShell
Expand-Archive 9c-main-snapshot.zip -DestinationPath [your\storage\path]

# For Bash
unzip 9c-main-snapshot.zip [your/storage/path]
```

Make sure your fully extracted data are all stored inside the `9c-main-snapshot` directory.
`[your/storage/path]/9c-main-snapshot/_blabla_`

## 3.2. Prepare configurations

Now, we'll attach our RPC server to the Nine Chronicles mainnet. To do this easily, we'll just download and use official config file.

```shell
curl https://download.nine-chronicles.com/9c-launcher-config.json -o config.json
```
Unfortulately, you have to provide all the params in command line instead of giving it in config file form. I'll show you the minimum params needed to run the RPC server. For all the details of parameters, Please read [README.md](https://github.com/planetarium/NineChronicles.Headless#run).
To fill required params, we'll pick params from `config.json`.

## 3.3. Run local RPC server

### 3.3.1. Edit `appsettings.json` to config headless server

Now you are ready to run the RPC server. As you can see at [README.md](https://github.com/planetarium/NineChronicles.Headless#run), there are a bunch of arguments to provide to run headless server. This is too much to handle in console and easy to make mistake. For your convenience, you can set those data to config file, named `appsettings.json`.
Please go to `NineChronicles.Headless.Executable` project and see the `Headless` section inside  `appsettings.json`. You can see and edit all the arguments to run headless server. You could find the full list of valid args at `NineChronicles.Headless.Executable/Configuration.cs`. You also can use command line args with the `appsettings.json` file. If you use same argument at the file and the command line, the command line argument overwrites the setting from `appsettings.json`.

#### 3.3.1.1. Example appsettings.{network}.json

We currently run three main 9c networks: `mainnet`, `internal`, `previewnet`. The `mainnet` is production server of Nine Chronicles and you can just use `appsettings.mainnet.json` to run local node with attaching 9c mainnet. Similarly, `appsettings.internal.json` and `appsettings.previewnet.json` are also there to connect to each network. Or, you can just copy `appsettings.json` to `appsettings.local.json` and setup your own config. 
Please double check your `StorePath` to run local node without any problem. Each networks are on different chain and you need to match your local store to appropriate one.

##### Caveat

`internal` and `previewnet` are for test and preview, so those networks could be reset / stop / broken wihtout any announcement. If any problem occurs, please check latest APV and re-download whole snapshot to sync blockchain to current state.

#### 3.3.1.2. Headless connected to peers

In most cases, you may want to connect your headless server to another nodes in network(e.g., Nine Chronicles mainnet). To achieve this, you should set `IceServerStrings` or `PeerStrings`. And the headless will find peer nodes and connect them to itself.

#### 3.3.1.3. Headless that is isolated from the network

In some case, you may want to run your own headless server perfectly isolated from real game network, to test your new feature for example. To isolate your node from anywhere, you have to set `Host` and remove `IceServerStrings` and `PeerStrtings`. If you leave `IceServerStrings` or `PeerStrings`, your node will find and connect to them to sync block. In addition, you have to activate miner to mine new blocks to proceed your network because it's isolated. You have to set `--no-miner=false` and `--network-type=default`. Then your headless node will mine own block to network.
:warning: If once you run your isolated headless and mine blocks, this network will permanently diverges from the original network. If you want to run the node that is connect to peers, you should set a new snapshot that is not touched by your own miner.

### 3.3.2. Run local headless server

Now you are ready to run the RPC server. The following command will run local RPC server and communicate with other RPC nodes to update blockchain.
Please double-check if all parameters are filled out correctly according to your situation.

```shell
dotnet run --project ./NineChronicles.Headless.Executable
```

If you want to use another config file, just add `--config=[YOUR_CONFIG_FILE]` at the last of the command.
Since it tries snapshot to catch up to current block tip and renders all actions in the process to sync up with latest state, It may take awhile.
You may encounter with bunch of `timeout error`, but there’s no big deal in syncing your server to the block tip correctly. Instead, watch server log carefully and troubleshoot when you see `block attach fail` error.

# 4. Play game with your RPC server

If your server successfully syncs up to block tip and receives a new block from peers, it's time to play the 9c with your own server.
The detailed instructions are written [here](./how-to-use-my-own-rpc-server-not-planetariums) with the address string as `"localhost,23232,23231"`. If you picked different port numbers, please use the port so that the launcher can connect correctly.
Make sure your local server is synchronized with blockchain tips and is up to date.

# 5. Conclusion

Now you are a Nine Chronicles node runner! :tada: 
Anytime you want, you can play Nine Chronicles with your own RPC server even if planetarium does not run RPC servers anymore.
Through this method, you can even start your own chain and network with your own genesis block, which ultimately can be your private Nine Chronicles service.
Please do anything you want with your own server. :wave:
