This section provides an overview of the primary repositories that comprise the Nine Chronicles ecosystem.

### Blockchain

- [bencodex](https://github.com/planetarium/bencodex)([bencodex.net](https://github.com/planetarium/bencodex.net)): A language for expressing the state of the blockchain.
- [libplanet](https://github.com/planetarium/libplanet): A blockchain framework.

### Nine Chronicles Networks

- [lib9c](https://github.com/planetarium/lib9c): The blockchain protocol for Nine Chronicles, built on `libplanet`. It defines the blockchain state model and actions.
- [NineChronicles.Headless](https://github.com/planetarium/NineChronicles.Headless): The blockchain node implementation for Nine Chronicles.
- [NineChronicles.RPC.Shared](https://github.com/planetarium/NineChronicles.RPC.Shared): Manages the RPC networking interface provided by `NineChronicles.Headless`.
- [9c-infra](https://github.com/planetarium/9c-infra): Manages the infrastructure of the Nine Chronicles network.

### Nine Chronicles Playables

- [NineChronicles](https://github.com/planetarium/NineChronicles): The Unity client for Nine Chronicles. It primarily communicates with the RPC server provided by `NineChronicles.Headless` to facilitate gameplay.
- [9c-launcher](https://github.com/planetarium/9c-launcher): The launcher for running the Nine Chronicles game. It communicates with major nodes in the Nine Chronicles network to perform various functions.

### Services

- [9c-portal](https://github.com/planetarium/9c-portal): A repository that provides various features for Nine Chronicles users. It utilizes some of the actions defined in lib9c, necessitating relevant communication.
- [market-service](https://github.com/planetarium/market-service): Provides APIs to cache and retrieve market-related information stored in the blockchain state.
- [NineChronicles.Arena](https://github.com/planetarium/NineChronicles.Arena)
- [NineChronicles.DataProvider](https://github.com/planetarium/NineChronicles.DataProvider): Provides APIs to cache and retrieve some of the information stored in the blockchain state.
- [NineChronicles.EthBridge](https://github.com/planetarium/NineChronicles.EthBridge): Bridges NCG to other blockchain networks (e.g., WNCG).
- [NineChronicles.IAP](https://github.com/planetarium/NineChronicles.IAP): Verifies purchases made on Google Play or the App Store and provides the corresponding items to the blockchain network for valid purchases.
- [patrol-reward-service](https://github.com/planetarium/patrol-reward-service)
- [world-boss-service](https://github.com/planetarium/world-boss-service)

### Additional Resources

- [NineChronicles.LiveAssets](https://github.com/planetarium/NineChronicles.LiveAssets): An assets repository referenced by the client.
