---
outline: deep
next:
  text: Examples
  link: ./examples
---

# Overview

This developer portal is for [Nine Chronicles]-related developers. This includes mod developers, 3rd-party app developers, and anyone else who wants to write NCIP and contribute directly to Nine Chronicles.

There are already libraries developed by teams within the Planetarium community. However, there are no examples of how to organically connect these libraries to create an app, which can be frustrating when you want to create a third-party app. To solve this problem, we will create and provide examples.

[Nine Chronicles]: https://nine-chronicles.com/

## Related-Libraries

### JavaScript/TypeScript

<br/>

#### `@planetarium/account`

https://www.npmjs.com/package/@planetarium/account

Provides implementations and interfaces for signing transactions. The built-in `RawPrivateKey` implementation can be utilized to sign keys or generate keys.

#### `@planetarium/tx`

https://www.npmjs.com/package/@planetarium/tx

A library for easily creating transactions.

#### `@planetarium/lib9c`

https://lib9c.nine-chronicles.dev/

A library for easily creating actions for the Nine Chronicles network.

#### `@planetarium/account-aws-kms`

https://www.npmjs.com/package/@planetarium/account-aws-kms

This is the AWS KMS implementation of the `Account` interface provided by `@planetarium/account` mentioned earlier. If you want to sign using AWS KMS, this is the library for you.

## Discord

[![Planetarium Dev][planetarium-dev-badge]][planetarium-dev-invite-link]

We're talking about Nine Chronicles development on a discord server called *Planetarium Dev*. If you're interested or have any questions, feel free to jump in and mention `@9c-dx`!

[planetarium-dev-badge]: https://img.shields.io/discord/928926944937013338?color=6278DA&label=Planetarium-dev&logo=discord&logoColor=white
[planetarium-dev-invite-link]: https://discord.com/invite/RYJDyFRYY7
