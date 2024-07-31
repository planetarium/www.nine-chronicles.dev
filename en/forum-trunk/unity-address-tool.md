Hello, everyone. I'd like to introduce a tool for those developing Nine Chronicles with the Unity Engine.

> :bulb: This article is based on [this](https://github.com/planetarium/NineChronicles/blob/bd56b002fc9dcc7868007b3e9835d6d922344c36/nekoyume/Assets/Planetarium/Nekoyume/Editor/AddressToolWindow.cs) code.

## Address Tool

The `Address Tool` is a tool that derives the address value where state is stored.

### How to open

This tool can be opened with the `Tools/Lib9c/Address Tool` menu.
![alt text](/images/en/forum-trunk/unity-address-tool/image.png)

### Derive Address

![alt text](/images/en/forum-trunk/unity-address-tool/image-1.png)

- Original Address: The source address to derive the address from.
- Derive Key: The key to use for the derivation.
- Derived Address: The derived address.

![alt text](/images/en/forum-trunk/unity-address-tool/image-2.png)

- Derive button: After entering the `Original Address` and `Derive Key`, the `Derive` button appears.

![alt text](/images/en/forum-trunk/unity-address-tool/image-3.png)

- Copy button: You can copy the derived address via the copy button.

### Agent Addresses

![alt text](/images/en/forum-trunk/unity-address-tool/image-4.png)

- Setup Current Agent button: Autofill the agent address field only in play mode.
- Agent Address: The agent address you want to derive. Fill it and click the derive button.

![alt text](/images/en/forum-trunk/unity-address-tool/image-5.png)

- 0, 1, 2 tab buttons: The avatar index selection tabs.
- Others: The element and addresses you can expect.
- Championship Id & Round: You can derive each addresses of arena round.
