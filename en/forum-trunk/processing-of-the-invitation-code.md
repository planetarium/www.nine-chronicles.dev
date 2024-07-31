# Processing of the Invitation Code

# Structure

```
a9811a4b51da78872b47257e404c8a70095482110a1fdc6ab3e5cc57f7c28676/622630ac8a889dcec746ba319c4e7faca607f9eb
```

- Given an activation code, there are two parts separated by the slash: the former being the private key and the latter being the address.
- The address corresponds to the public key and the nonce.
- Invitation code and activation code are the same things.

# Activation

> 📢 This documentation explains how the launcher activates an account using an invitation code for details on how the keys work, please refer to the [source code](https://github.com/planetarium/lib9c/blob/development/Lib9c/Action/ActivateAccount.cs).

## Invitation code provided on account creation

- An invitation code provided on account creation is stored temporarily in the memory.
    - The launcher merely stores them in this stage; it doesn't do anything with them yet.
    - This also means the invitation code is lost if the launcher closes before the user launches the actual game.

## Activation on the lobby page

- After the preload is done, check if the user has already been activated.
    - If activated, the flow stops.
- If not activated, check if there's an invitation key stored in the memory.
    - If yes, continues.
    - If no, the form asking for the key shows up and waits for the user to provide an invitation key to be used.
- Retrieve the nonce via `activationKeyNonce(invitationCode: $encodedActivationKey)` query.
- Create `ActivateAction` via headless using the nonce from the step above and the invitation key itself, and sign and stage them.
- Periodically polls the chain using this query:

```graphql
query ActivationAddress($address: Address!) {
  activationStatus {
    addressActivated(address: $address)
  }
}
```
