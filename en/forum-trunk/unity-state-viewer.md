Hello, everyone. I'd like to introduce a tool for those developing Nine Chronicles with the Unity Engine.

> :bulb: This article is based on [this](https://github.com/planetarium/NineChronicles/blob/7375aa4298089afa1949b86fb1630815d5828bd1/nekoyume/Assets/Plugins/StateViewer/Editor/StateViewer.cs) code.

# State Viewer

We already had a State Viewer in Unity, and we've enhanced it. You can now view and manipulate statuses more specifically in Unity Play Mode.

## How to open

This tool can be opened with the `Tools/Lib9c/State Viewer` menu.
![alt text](/images/en/forum-trunk/unity-state-viewer/image.png)

## How to use

> :warning: This feature is only available in play mode.

![alt text](/images/en/forum-trunk/unity-state-viewer/image-1.png)

- `Test Values` toggle(non-play mode only): Toggle the test values.
  - Inner buttons: The preset `Bencodex` values for test.
    ![alt text](/images/en/forum-trunk/unity-state-viewer/image-2.png)

### State

From here, you can search for a specific state via address. You can also manipulate all state values, although this is still under development.

![alt text](/images/en/forum-trunk/unity-state-viewer/image-3.png)

- `Address` search field: Type the address of the state you want to view and press Enter.
- State tree view
  - Key/Index: The key or index of state. It is a key when the state is an element of a dictionary and it is an index when the state is an element of a list.
  - Alias: An alias of the key. If the key has an alias, this column filled.
  - ValueKind: A kind of [Bencodex.Types.ValueKind](https://github.com/planetarium/bencodex.net/blob/main/Bencodex/Types/ValueKind.cs) type.
  - Value: A json encoded value which type is `IValue`.
  - (WIP)Add/Edit
  - (WIP)Remove
- (WIP)`Save` button:  Save the manipulated states to blockchain store.

### Balances

Multiple balances based on the address entered above can also be viewed or manipulated. The UI/UX will be further improved.
![alt text](/images/en/forum-trunk/unity-state-viewer/image-4.png)

## Examples

> :warning: Once again, this is a development-only feature.

### Prepare `clo.json`

Here is the sample code.
```json
{
  "NoMiner": false,
  "RpcClient": false,
  "Development": true
}
```

### Start play mode

![alt text](/images/en/forum-trunk/unity-state-viewer/image-5.png)

> Please wait until the Agent is initialized.

`State Viewer` does not work before agent sign-in.
![alt text](/images/en/forum-trunk/unity-state-viewer/image-6.png)

As shown above, the `State Viewer` is ready to use.

### Prepare address

You can use the `Address Tool` to get the address you want, see [this article](./unity-address-tool) on how to do that.
I use `0x9723f230A20372564c50d63403223e83549a477f` which is an avatar placed in index 0.

### View and manipulate state

![alt text](/images/en/forum-trunk/unity-state-viewer/image-7.png)

As shown above, the state viewer works cool.
Let's manipulate the action point from 120 to 5.

Click the `Edit` button.
![alt text](/images/en/forum-trunk/unity-state-viewer/image-8.png)

Now we can edit the value.
![alt text](/images/en/forum-trunk/unity-state-viewer/image-9.png)

Set the value to 5. And click the `Save` button beside of the field.
![alt text](/images/en/forum-trunk/unity-state-viewer/image-10.png)

Finally, click the `Save` button below the state tree view.
![alt text](/images/en/forum-trunk/unity-state-viewer/image-11.png)

Clicking the `Save` button create a transaction that contains the `ManipulateState` action and display the text `Verifying transaction...` in the lower left corner of the game screen.
![alt text](/images/en/forum-trunk/unity-state-viewer/image-12.png)

When the `ManipulateState` action(transaction) finished(minded and rendered), a notification will appear in the center of the game screen, and you will see that the action point have actually changed to 5.
![alt text](/images/en/forum-trunk/unity-state-viewer/image-13.png)

### View and manipulate balance

When you enter an address, as in the state manipulation above, you can see the NCG and CRYSTAL stored at that address. The NCG and CRYSTAL are stored at the agent address.
![alt text](/images/en/forum-trunk/unity-state-viewer/image-14.png)

Edit the balance you want to manipulate and click the `Save` button.
![alt text](/images/en/forum-trunk/unity-state-viewer/image-15.png)

The reason the resulting balance is 10 larger is because it reflects the 10 earned as a mining reward.
![alt text](/images/en/forum-trunk/unity-state-viewer/image-16.png)

## Conclusion

Throughout the development of Nine Chronicles, the need for state manipulation has been a consistent theme.
We hope this `State Viewer` will make your development experience more comfotable.

Please note that the `State Viewer` is still under development and contains bugs. We'll be back soon with better completeness and UX.

Thank you.
