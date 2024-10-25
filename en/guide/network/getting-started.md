# Getting Started with Network

Nine Chronicles is a **fully on-chain** game that records all game data on the blockchain.

To understand it better, imagine the typical backend structure of **Database <-> API Service**. In Nine Chronicles, this is replaced with a **Blockchain <-> API Service** structure.

Using [Libplanet](https://github.com/planetarium/libplanet) and [Lib9c](https://github.com/planetarium/lib9c), the blockchain network is configured to function similarly to a database, while [Nine Chronicles Headless](https://github.com/planetarium/NineChronicles.Headless) provides API services through GraphQL (GQL) and gRPC.

With this setup, both data storage and API calls operate entirely on the blockchain.

If you'd like to run the Nine Chronicles network locally, please refer to [this guide](../../tutorials/local-network-tutorial/getting-started)!
