> 💡 This article was written based on [Libplanet version 0.41.0][libplanet-0.41.0].

[libplanet-0.41.0]: https://github.com/planetarium/libplanet/tree/0.41.0

In order to play the Nine Chronicles, you need a Private Key[^private-key] to participate in the blockchain network.
If you’ve already played the Nine Chronicles, that means you already have a Private Key.
The Key Store stores it as a Protected Private Key[^protected-private-key].

## Path

The default path of the Key Store is determined [this way][default-path-of-key-store].

- Windows
   - `%appdata%\planetarium\keystore\`
- Mac
   - `~/.config/planetarium/keystore/` or
   - `~/Library/Application Support/planetarium/keystore/`
- Linux
   - `~/planetarium/keystore/` or
   - `~/.config/planetarium/keystore/`

[default-path-of-key-store]: https://github.com/planetarium/libplanet/blob/0.41.0/Libplanet/KeyStore/Web3KeyStore.cs#L21-L29

---

[^private-key]: A key required to sign a transaction.([code][private-key-code])
[^protected-private-key]: An encrypted file of the private key.([code][protected-private-key-code])

[private-key-code]: https://github.com/planetarium/libplanet/blob/0.41.0/Libplanet/Crypto/PrivateKey.cs
[protected-private-key-code]: https://github.com/planetarium/libplanet/blob/0.41.0/Libplanet/KeyStore/ProtectedPrivateKey.cs
