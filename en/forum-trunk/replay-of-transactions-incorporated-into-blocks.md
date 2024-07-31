> 💡 This article was written based on Nine Chronicles version v100291[^v100291].

Curious about how the transaction you broadcast was incorporated into the block?
Would you like to replay that operation with exact values?
Here's how.

## Ready

Below is a list of factors that are important to consider in order to make this process go smoothly.

- Hardware capable of running minor nodes: throughout this process, you can reduce the time required to achieve your goals.
- A storage device with at least 100 GB of free space: The capacity of the mainnet blockchain is very large.
- Stable and fast internet environment: You have to deal with very large amounts of data.
- Plenty of time: Depending on the goal, a lot of time is required.

## Prepare transaction ID

You can search a list of transactions signed by a specific address.

- URL: `https://9cscan.com/address/{signer address}`

> e.g., Transaction ID: e5fd2957137b46fabeb19f71a395caaa5f200766f2174c2177f7b0dfb967ef32

### Retrieve transaction ID from 9cscan

You can inquire information of a specific transaction.

- URL: `https://9cscan.com/tx/{transaction id}`

> Transaction URL: https://9cscan.com/tx/e5fd2957137b46fabeb19f71a395caaa5f200766f2174c2177f7b0dfb967ef32

Secure the block index and timeStamp of the transaction.

> block index: `4,753,873`</br>
> timestamp: `2022. 08. 18. 18:33:35 KST`

![Transaction details](/images/en/forum-trunk/replay-of-transactions-incorporated-into-blocks/image.png)

## Preparing the blockchain

Download the snapshot of the past time closest to the transaction timestamp from the snapshot file server operated by Planetarium. Because you cannot access to the AWS S3 dashboard, there is a temporary dashboard. You can find the snapshots with `?prefix=` parameter. (e.g. `?prefix=202209`)

> Snapshot from the past closest to `2022. 08. 18. 18:33:35 KST`: [main network snapshot files link](https://moreal.github.io/planetarium-9c-snapshots-dashboard/?prefix=20220818)

![AWS S3 snapshots](/images/en/forum-trunk/replay-of-transactions-incorporated-into-blocks/image-1.png)

Unzip the snapshot downloaded above to a path of your choice.

> e.g., block chain store path: {LocalAppData}\planetarium\20220818072818_9c-main

## Debugging

Now open the `NineChronicles.Headless.Executable` project and configure the debug configurations. I did it using Rider version 2022.2.2

### Debug Configuration

Click the `Edit Configuration...` button at the top right of Rider.

![Rider edit configuration button](/images/en/forum-trunk/replay-of-transactions-incorporated-into-blocks/image-2.png)

In the `Run/Debug Configurations` popup, make sure the `NineChronicles.Headless.Executable` project is selected.

![Rider select project in configuration popup](/images/en/forum-trunk/replay-of-transactions-incorporated-into-blocks/image-3.png)

And edit the `Program arguments` item.

![Rider program arguments](/images/en/forum-trunk/replay-of-transactions-incorporated-into-blocks/image-4.png)

e.g.,

![Rider program arguments](/images/en/forum-trunk/replay-of-transactions-incorporated-into-blocks/image-5.png)

See below for options in `Program arguments`.

```text
--no-miner \
--store-type rocksdb \
--store-path "{please fill in}" \
--genesis-block-path "https://release.nine-chronicles.com/genesis-block-9c-main" \
--app-protocol-version "{please fill in}" \
--ice-server "turn://0ed3e48007413e7c2e638f13ddd75ad272c6c507e081bd76a75e4b7adc86c9af:0apejou+ycZFfwtREeXFKdfLj2gCclKzz5ZJ49Cmy6I=@turn-us.planetarium.dev:3478" \
--ice-server "turn://0ed3e48007413e7c2e638f13ddd75ad272c6c507e081bd76a75e4b7adc86c9af:0apejou+ycZFfwtREeXFKdfLj2gCclKzz5ZJ49Cmy6I=@turn-us2.planetarium.dev:3478" \
--ice-server "turn://0ed3e48007413e7c2e638f13ddd75ad272c6c507e081bd76a75e4b7adc86c9af:0apejou+ycZFfwtREeXFKdfLj2gCclKzz5ZJ49Cmy6I=@turn-us3.planetarium.dev:3478" \
--ice-server "turn://0ed3e48007413e7c2e638f13ddd75ad272c6c507e081bd76a75e4b7adc86c9af:0apejou+ycZFfwtREeXFKdfLj2gCclKzz5ZJ49Cmy6I=@turn-us5.planetarium.dev:3478" \
--peer "027bd36895d68681290e570692ad3736750ceaab37be402442ffb203967f98f7b6,9c-main-tcp-seed-1.planetarium.dev,31234" \
--peer "02f164e3139e53eef2c17e52d99d343b8cbdb09eeed88af46c352b1c8be6329d71,9c-main-tcp-seed-2.planetarium.dev,31234" \
--peer "0247e289aa332260b99dfd50e578f779df9e6702d67e50848bb68f3e0737d9b9a5,9c-main-tcp-seed-3.planetarium.dev,31234" \
--rpc-server \
--rpc-listen-host localhost \
--rpc-listen-port 23231 \
--graphql-server \
--graphql-host localhost \
--graphql-port 23232 \
--skip-preload
```

Enter the path of the block chain prepared as a snapshot above in `--store-path`.

> e.g., {LocalAppData}\planetarium\20220818072818_9c-main

`--app-protocol-version` can be checked by [downloading the 9c-launcher-config.json file of the main network](https://download.nine-chronicles.com/9c-launcher-config.json).

> e.g., 100291/6ec8E598962F1f475504F82fD5bF3410eAE58B9B/MEUCIQCA3lzUAt0QBfG.+ezw4CQ69zBy669sANEt5juSJgzqcgIgbozfpcyeuKJDeJoT5exyGYDYBqCpxklsMEfs0SQ6qzo=/ZHUxNjpXaW5kb3dzQmluYXJ5VXJsdTcyOmh0dHBzOi8vcmVsZWFzZS5uaW5lLWNocm9uaWNsZXMuY29tL21haW4vdjEwMDI5MS9sYXVuY2hlci92MS9XaW5kb3dzLnppcHU5OnRpbWVzdGFtcHUxMDoyMDIyLTA5LTA3ZQ==

### Set breakpoints on desired actions

I want to see the `HackAndSlashSweep` action executed at block 4753873, so I set a breakpoint on that action as shown below. In the `Execute()` method, check if `context.BlockIndex` is 4753873 in the first line when it is not `context.Rehearsal`.

![Rider HackAndSlashSweep action breakpoint](/images/en/forum-trunk/replay-of-transactions-incorporated-into-blocks/image-6.png)

Setup is complete. Click the ‘Debug’ button at the top right of the Rider.

![Rider debug button](/images/en/forum-trunk/replay-of-transactions-incorporated-into-blocks/image-7.png)

You can see that the project is now built and the log is written to the console.
It may take a long time to stop at the breakpoint set above depending on the conditions.
If you wait patiently, you can directly reproduce the process and values of a specific action in a specific block.

Have Fun!🤞

## Tip

If you are using a Mac based on Apple silicon, you may have problems with .NET settings. In that case, please refer to [this article](./issues-with-net-sdk-on-m1-mac).

---

[^v100291]: [lib9c:v100291][lib9c-v100291], [NineChronicles:v100291][9c-unity-v100291]

[lib9c-v100291]: https://www.github.com/planetarium/lib9c/tree/v100291

[9c-unity-v100291]: https://www.github.com/planetarium/NineChronicles/tree/v100291
