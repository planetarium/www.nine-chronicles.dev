# Working with Bencodex

Bencodex is a serialization/deserialization format that Libplanet-based games use for serializing the game transactions, actions and more. 

## Why Bencodex

> This section is a summary of [the README of Bencodex repository](https://github.com/planetarium/bencodex).

Bencodex makes sure there is only one valid way to represent any value. This property makes checking equality between two values trivial; there is no way to have multiple same Bencodex values with different representations.

## Data Types

The data types used in Bencodex are similar to what you would find in a normal JSON, with some differences like:

- byte strings
- replaced numbers with integers -- meaning no floating numbers can be stored

This also means that as long as your JSON data contains no decimal points, you can convert them to Bencodex without a loss of data.

The complex data can be stored in arrays and dictionaries (corresponding to objects in JSON). Unlike JSON, you can choose to have byte string as a key.

## Transmit over Text-based Channels

Bencodex is a binary-encoded format, so the data is usually encoded as hexadecimal when packed inside JSON or GraphQL. The `0x` prefix is not used.

You'll typically see this when working with GraphQL APIs of Nine Chronicles.

## Bindings

### C#

The C# bindings provide basic `Encode` and `Decode` methods for working with Bencodex data.

TODO: Fill this section.

### JavaScript/TypeScript

There's [a third-party implementation for Bencodex](https://github.com/disjukr/bencodex/) which is also used within some of Planetarium's products, such as the Nine Chronicles launcher.

To get a copy, you can install it on npm:

```shell
npm install bencodex
```

The API is fairly simple: it has `encode` for serializing the value into Bencodex or `decode` for vice-versa.

Note that the library decodes dictionaries into [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). You can use them via its methods or convert them to plain JavaScript object using [`Object.fromEntries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries).
