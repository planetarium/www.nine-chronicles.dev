# Getting Started

This developer portal serves as a space for developers involved with Nine Chronicles. It caters not only to modders but also third-party app developers who wish to contribute directly to or create new features within the game through NCIP.

Existing libraries developed by teams in the Planetarium community already exist, but there lacks an example of how to organically connect those libraries when creating a third-party app, which can leave users feeling uncertain. To address this gap and provide guidance on such tasks, we aim to share examples that illustrate how to do so.

1. **Client Editing Modding**: How to modify the actual game client that runs the game.
2. **Third-Party Application Modding**: How to provide Nine Chronicles information through websites or applications.

We provide detailed guides for each area, so please refer to the links below.

- If you want to mod without needing signatures, refer to the [Avatar Information Page Creation Guide](./guide/avatar-information-dapp-guide.md).
- If you want to mod with signatures, refer to the [Daily Reward Guide](./guide/daily-reward-dapp.md).
- If you want to mod the client, refer to the [Bepenix Guide](./guide/bepinex-guide.md).

## Related Libraries
### JavaScript/TypeScript

<br/>

#### `@planetarium/account`

https://www.npmjs.com/package/@planetarium/account

Provides implementations and interfaces for signing transactions. You can sign keys or generate keys using the default `RawPrivateKey` implementation provided.

#### `@planetarium/tx`

https://www.npmjs.com/package/@planetarium/tx

A library for easily creating transactions.

#### `@planetarium/lib9c`

https://lib9c.nine-chronicles.dev/

A library for easily creating actions on the Nine Chronicles network.

#### `@planetarium/account-aws-kms`

https://www.npmjs.com/package/@planetarium/account-aws-kms

An AWS KMS implementation of the `Account` interface provided by `@planetarium/account`. Use this library if you want to sign using AWS KMS.

## Discord

[![Planetarium Dev][planetarium-dev-badge]][planetarium-dev-invite-link]

Discussions related to Nine Chronicles development are taking place on a Discord server named *Planetarium Dev*. If you have any interests or questions, feel free to join and mention `@9c-dx`!

[planetarium-dev-badge]: https://img.shields.io/discord/928926944937013338?color=6278DA&label=Planetarium-dev&logo=discord&logoColor=white
[planetarium-dev-invite-link]: https://discord.com/invite/RYJDyFRYY7
