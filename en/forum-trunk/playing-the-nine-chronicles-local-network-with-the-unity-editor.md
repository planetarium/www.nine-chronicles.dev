> 💡 This article was written based on Nine Chronicles version v100290[^v100290].

This article expects you to read [this][./playing-the-nine-chronicles-main-network-with-the-unity-editor] already and be ready to play Nine Chronicle with the Unity Editor.

## How to run a local network

### Configure clo.json

- path: /nekoyume/Assets/StreamingAssets/clo.json

  ```json
  {
    "GenesisBlockPath": "https://download.nine-chronicles.com/genesis-block-9c-main",
    "NoMiner": false,
    "RpcClient": false
  }
  ```

> Now, you can run a local network within the Unity editor. Click the ▶️ button.

## A few things to note

### Blockchain compatibility

The local network blockchain is not compatible with the main network blockchain. Your play data will not be available on the local chain.

### Transaction Propagation

The local node without RPC connections doesn't propagate transactions.

### Unity editor mode play

There are many benefits to creating a new character in the Unity editor mode.

- All stages of the worlds have been cleared.
- All equipments, materials and costumes already obtained.
- Additional customization is possible.

## Create and use a new genesis block

There is a "GenesisBlockPath" option on `clo.json` file. Now we'll create a new genesis block and use it in `clo.json`.

### Create a new genesis block {#create-a-new-genesis-block}

#### Without blockchain initialization

1. Click `Tools/Libplanet/Make Genesis Block` menu.

   ![Unity Editor: `Tools/Libplanet/Make Genesis Block` menu](/images/en/forum-trunk/playing-the-nine-chronicles-local-network-with-the-unity-editor/image.png)

2. Choose path to export the new genesis block.

   It should be in the `StreamingAssets` folder with the name `genesis-block`.

   ![Unity Editor: Choose path popup](/images/en/forum-trunk/playing-the-nine-chronicles-local-network-with-the-unity-editor/image-1.png)

3. Then you can find the `genesis-block` file in the `StreamingAssets` folder.

   ![Unity Editor: Project/Assets/StreamingAssets/genesis-block file](/images/en/forum-trunk/playing-the-nine-chronicles-local-network-with-the-unity-editor/image-2.png)

#### With blockchain initialization

Just click `Tools/Libplanet/Delete All(Editor)...` menu.

![Unity Editor: `Tools/Libplanet/Delete All(Editor)...` menu](/images/en/forum-trunk/playing-the-nine-chronicles-local-network-with-the-unity-editor/image-3.png)

#### Remove the "GenesisBlockPath" option in `clo.json` file

If you remove the "GenesisBlockPath" option like below, the initialization logic will load the genesis block from `/nekoyume/Assets/StreamingAssets/genesis-block`.

```json
{
  "NoMiner": false,
  "RpcClient": false
}
```

### Tip: Modify any sheet data

There are many sheet data as csv file. These sheets are applied when creating a new genesis block.
In other words, the sheet data included in the genesis block can be modified.

#### Modify max amount of action point(a.k.a. AP)

1. Open `GameConfigSheet.csv` file.

   path: `/nekoyume/Assets/_Scripts/Lib9c/lib9c/Lib9c/TableCSV/GameConfigSheet.csv`

   And you can see like below.

   ```csv
   key,value
   ...
   action_point_max,120
   ...
   ```

2. Modify the `action_point_max` value(120) to 200.

   ```csv
   key,value
   ...
   action_point_max,200
   ...
   ```

3. Create a new genesis block again.

   Ref [here](#create-a-new-genesis-block).

## Conclusion

So far, I have introduced how to play Nine Chronicles local network in the Unity editor and edit the Genesis block and sheet data.
I've introduced the basis for the more complex tasks I use in almost every situation, such as developing and debugging features on a planetarium. Creating a virtual blockchain state and replaying the desired scenario on the client is hugely useful for development.
Now, let's knead the blockchain with more complex manipulations. Although, of course, it is limited to the local network.😉

---

[^v100290]: [lib9c:v100290][lib9c-v100290], [NineChronicles:v100290][9c-unity-v100290]

[lib9c-v100290]: https://www.github.com/planetarium/lib9c/tree/v100290
[9c-unity-v100290]: https://www.github.com/planetarium/NineChronicles/tree/v100290
