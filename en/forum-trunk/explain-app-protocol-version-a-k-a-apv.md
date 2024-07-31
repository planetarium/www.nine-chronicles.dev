If you have run the headless node, you may see the argument like `--app-protocol-version=100…`. We says it as *App Protocol Version*, defined by *[Libplanet]*, a .NET blockchain library.

# Function

Its function is to separate network nodes by it. For example, there are three nodes, `v1` node A, `v2` node B, `v1` node C. When they try to organize P2P network each other,  they send *Ping* message to each other. The every message includes the App Protocol Version and check the version with itself.

Or, it is used to broadcast notify the new version was introduced by the trusted app protocol version signer. Nine Chronicles uses this function to upgrade the clients.

# Structure

The app protocol version consists of `signature`, `version`, `signer`, `extra`.

- The `signature` is a signature of serialized app protocol version, signed by `signer`.
- The `version` is a number to version the app. Nine Chronicles uses it for versioning like `100xxx`.
- The `signer` is an address signed the app protocol version.
- The `extra` is extra values to describe the version. Nine Chronicles uses it to include clients' download urls. (e.g. `https://download.nine-chronicles.com/v100280/Windows.zip`)

For example, let's see the `v100282` version's app protocol version.

```text
100282/6ec8E598962F1f475504F82fD5bF3410eAE58B9B/MEUCIQDYz9MXCV3k3B93+R2GZs+BCnu8SwfZOZ4GQeCLKqjIfwIgFlC1AlOBs9KR4Y00MVBpmh9dGa6P6wEXy9NZNwGOrRU=/ZHUxNjpXaW5kb3dzQmluYXJ5VXJsdTU2Omh0dHBzOi8vZG93bmxvYWQubmluZS1jaHJvbmljbGVzLmNvbS92MTAwMjgyL1dpbmRvd3MuemlwdTk6dGltZXN0YW1wdTEwOjIwMjItMDgtMjll
```

The deserialized one is same with the below elements.

- `version`: `100282`
- `signature`: `3045022100d8cfd317095de4dc1f77f91d8666cf810a7bbc4b07d9399e0641e08b2aa8c87f02201650b5025381b3d291e18d343150699a1f5d19ae8feb0117cbd35937018ead15`
- `signer`: `0x6ec8E598962F1f475504F82fD5bF3410eAE58B9B`
- `extra`: `{ "WindowsBinaryUrl": "https://download.nine-chronicles.com/v100282/Windows.zip", "timestamp": "2022-08-29" }`

## Deserialize it with `planet` command

You can look the fields yourself with `planet` command. At first, install `planet` command. And run the below command:

```text
# planet apv analyze <APV>
$ planet apv analyze 100282/6ec8E598962F1f475504F82fD5bF3410eAE58B9B/MEUCIQDYz9MXCV3k3B93+R2GZs+BCnu8SwfZOZ4GQeCLKqjIfwIgFlC1AlOBs9KR4Y00MVBpmh9dGa6P6wEXy9NZNwGOrRU=/ZHUxNjpXaW5kb3dzQmluYXJ5VXJsdTU2Omh0dHBzOi8vZG93bmxvYWQubmluZS1jaHJvbmljbGVzLmNvbS92MTAwMjgyL1dpbmRvd3MuemlwdTk6dGltZXN0YW1wdTEwOjIwMjItMDgtMjll
Field                  Value                                                                                                                                         
---------------------- ----------------------------------------------------------------------------------------------------------------------------------------------
version                100282                                                                                                                                        
signature              3045022100d8cfd317095de4dc1f77f91d8666cf810a7bbc4b07d9399e0641e08b2aa8c87f02201650b5025381b3d291e18d343150699a1f5d19ae8feb0117cbd35937018ead15
signer                 0x6ec8E598962F1f475504F82fD5bF3410eAE58B9B                                                                                                    
extra.WindowsBinaryUrl https://download.nine-chronicles.com/v100282/Windows.zip                                                                                      
extra.timestamp        2022-08-29
```

[Libplanet]: https://libplanet.io
