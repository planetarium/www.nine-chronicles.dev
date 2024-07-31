# The Structure and Location of "config.json"

# File Definition

Currently, there are 3 separate "config.json"s. although each file has the same structure, their roles are slightly different. This document defines these config.json as follows:
- **remote config:** The config.json file on Nine Chronicles S3 storage which is accessible via HTTPS.
- **local config:** The config.json file that the user installs and uses.
    - `%LOCALAPPDATA%\Programs\Nine Chronicles\resources\app`
    - Editing this configuration won't work as the launcher will overwrite it with remote config in most cases.
- **user config:** The config.json file that is set by each user through the launcher's settings which are shared across multiple versions of the launcher.
    - `%APPDATA%\Nine Chronicles\config.json`
    - (on different network (ex. internal, previewnet)) `%APPDATA%\Nine Chronicles\config.{Network}.json`
    - (on macOS) `~/Library/Application Support/Nine Chronicles/config.json`
    - (on Linux) `~/.config/Nine Chronicles/config.json`

## Installation and Application of remote config

Currently, remote config is served on https://download.nine-chronicles.com/9c-launcher-config.json and can be distributed to each user over HTTPS.

If **all** of the following conditions are met, the user's local config will be overwritten to the remote settings.

- If the APV of the remote and local configuration matches
- If the `ConfigVersion` of the remote config is higher than the local config

Therefore, you can assume that the latest version of the user distribution has remote config applied when running on the mainnet.
## Overwrite of user config

User configuration uses the same schema as the others but usually stores the values that are specific to the user, such as language preference, the location of the blockchain data etc. When the corresponding key exists in the user config, the launcher reads the value of the user config without merging it with other values from other configs.

However, this feature sometimes causes the blockchain data from other networks to get mixed up. So from v100087 and onwards uses a different user config when connecting to other networks by looking at the `Network` value of the local config. If the value is set to `9c-main`, it reads the config.json, but if it is set to something else like `9c-previewnet`, the launcher will read `config.9c-previewnet.json` to avoid this conflict.

# Field schema

[9c-launcher/config.ts at fbb99228b61d6ca4140f42a6a597e34e208d9f08 · planetarium/9c-launcher](https://github.com/planetarium/9c-launcher/blob/fbb99228b61d6ca4140f42a6a597e34e208d9f08/src/config.ts#L11)

|Field                           |Data Type    |Required|Deprecated|Usage                        |
|--------------------------------|-------------|--------|----------|-----------------------------|
|AppProtocolVersion              |string       |Yes     |No        |Headless, Launcher           |
|AwsRegion                       |string       |No      |No        |Headless                     |
|AwsSecretKey                    |string       |No      |No        |Headless                     |
|BlockChainStoreDirName          |string       |No      |No        |Headless, Launcher           |
|BlockChainStoreDirParent        |string       |No      |No        |Headless, Launcher           |
|ConfigVersion                   |number       |Yes     |No        |Launcher                     |
|Confirmations                   |number       |Yes     |No        |Headless, Libplanet          |
|DataProviderUrl                 |string       |No      |No        |                             |
|GenesisBlockPath                |string       |Yes     |No        |Headless, Launcher, Libplanet|
|HeadlessArgs                    |array\<string\>|No      |No        |Headless                     |
|IceServerSettings               |             |No      |No        |                             |
|LaunchPlayer                    |boolean      |No      |No        |Launcher                     |
|Locale                          |string       |No      |No        |Launcher                     |
|LogSizeBytes                    |number       |No      |No        |Launcher                     |
|Mixpanel                        |boolean      |No      |No        |Launcher, NineChronicles     |
|MuteTeaser                      |             |No      |Yes       |Launcher                     |
|Network                         |string       |No      |No        |                             |
|NoMiner                         |boolean      |No      |No        |Headless, Launcher           |
|NoTrustedStateValidators        |             |No      |Yes       |                             |
|PeerStrings                     |array\<string\>|No      |No        |Headless                     |
|PreferLegacyInterface           |boolean      |No      |No       |Launcher                     |
|RemoteNodeList                  |array\<string\>|No      |No        |Launcher                     |
|Sentry                          |boolean      |No      |No        |Launcher                     |
|SnapshotPaths                   |array\<string\>|No      |No        |Launcher                     |
|SnapshotThreshold               |             |No      |No        |                             |
|StoreType                       |             |No      |No        |                             |
|SwapAddress                     |             |No      |No        |                             |
|TrustedAppProtocolVersionSigners|array\<string\>|No      |No        |Headless                     |
|UseRemoteHeadless               |boolean      |No      |No        |Launcher                     |
|UseV2Interface                  |boolean      |No      |Yes       |Launcher                     |
|Workers                         |             |No      |No        |                             |
