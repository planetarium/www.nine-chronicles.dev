The Nine Chronicles and `planet` CLI tools accesses your key pairs using Libplanet [Web3KeyStore](https://docs.libplanet.io/0.27.4/api/Libplanet.KeyStore.Web3KeyStore.html) API. This documentation describes the basic structure of the key store so you can work with it.

> :warning: This guide doesn't cover the Libplanet API and how to use them. Please refer to the Libplanet docs for accessing the keystore via Libplanet.

# Web3 Secret Storage

The structure of the key file is based on Ethereum's [Web3 Secret Storage](https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition) spec, and most of the internal structure of key files conform to version 3 of the spec.

The notable derivations from the Ethereum spec are:
- The keystone is not stored in the same path as Web3 key files; see https://devforum.nine-chronicles.com/t/file-paths-used-on-nine-chronicles/57 for details
- The `id` field is silently ignored, and the UUID in the filename is always used.

# Filenames
You may have heard people to back up the UTC-something files in your keystore directory. It is because Libplanet stores the key file in this format: [`UTC--{0:yyyy-MM-dd}T{0:HH-mm-ss}Z--{1:D}`](https://github.com/planetarium/libplanet/blob/fbc9b319e0c0beb1694e66abd9f61307260fd2cb/Libplanet/KeyStore/Web3KeyStore.cs#L31).

Libplanet doesn't actually support filenames with other timezones (unlike the name may suggest), and using improper timestamps or UUID in the filename will not be recognized, or an error may be thrown.

The UUID in the filename is used as an identifier of the key file, and it is not derived nor related to the content of the key pair itself, meaning it is safe to share. But the UUID will be useful only on your machine with the exact key file as the UUID may differ even if the file has the exact same content.

# Content
The content of the file conforms to the Web3 Secret Storage standard, with the derivations stated above.
