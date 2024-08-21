# Intro

We previously showed you how to set up and run a local headless node directly from your own computer in [this article](./build-and-run-your-own-nine-chronicles-server-a-k-a-headless).
In fact, launching headless like this is not as simple as in the article, because you have to manually set up the headless node and manage the repository and source code separately from what is being developed in the Unity editor.
What we really want is to develop features while testing them in the Unity editor closer to the real environment than headless itself.
So, we added `Headless Tool` to Unity editor that allows you to easily operate local headless nodes with just a few clicks in Unity editor. Now, you can use this feature to connect to a local headless node controlled by the Unity editor and easily develop/test new features in a more realistic environment.

### :warning: Notice: Following content is only available in Unity editor and this will not be applied to production build.

# How to

## 1. See what's where for new dev tool

![01_overview](/images/en/forum-trunk/run-your-own-local-headless-node-controlled-by-unity-editor/image.png)

As you can see in this screenshot, you'll get new Tools menu: `Headless`. Beside this, we can get a new checkbox `Use local headless` on the `Game` scene.
If you're first time using this tool, please run all menus from top to bottom in  headless tool.

### 2. Prepare headless source code

![02_setup_headless](/images/en/forum-trunk/run-your-own-local-headless-node-controlled-by-unity-editor/image-1.png)

To run headless node, we have to get NineChronicles.Headless source code and prepare. By clicking this menu, Unity asks target directory to put your source code. After selecting, Unity will clone a copy of NnieChronicles.Headless to `NineChronicles-unity-runner`.
The headless repository is set to `development` branch by default. To clarify, Unity will pull from origin and also fetches submodules.
`Lib9c` is a set of models and actions to make game Nine Chronicles. What we're doing is create new feature mostly. Since both Nine Chronicles and Headless uses lib9c, so we have to sync or share lib9c code. To achieve this, Unity makes symbolic link from unity lib9c to headless lib9c.

### 3. Prepare store and genesis block

![03_create_genesis](/images/en/forum-trunk/run-your-own-local-headless-node-controlled-by-unity-editor/image-2.png)

To run headless, we need storage and genesis block. We already have genesis generating tool: Libplanet tool menu. We recycled this function to reset store and genesis block. 
Please be aware that this function deletes previous store and genesis block file. If you want to backup old data, you have to move those things to other place.

### 4. Prepare headless settings

![04_appsettings](/images/en/forum-trunk/run-your-own-local-headless-node-controlled-by-unity-editor/image-3.png)

Running headless needs a bunch of arguments. ([See this!](https://github.com/planetarium/NineChronicles.Headless#run)) Setting all those things are meaningless and just few of those options are needed to run local headless node.
Unity already has an preset/example file of local headless settings. This menu copies this example to headless project. If you want to modify local headless settings, you can modify settings at `[Unity-runner path]/NineChronicles.Headless.Executable/appsettings.local.json` after copy.\

### 5. Test headless

:warning: This menu blocks unity and runs local headless node. You CANNOT play game after run this menu. Please see next section to test play unity player `with` local headless.
![05_run_headless](/images/en/forum-trunk/run-your-own-local-headless-node-controlled-by-unity-editor/image-4.png)

Finally, you're ready to run local headless node. You can test all settings are good using this menu. You can see a new terminal console and headless logs like this: 
![alt text](/images/en/forum-trunk/run-your-own-local-headless-node-controlled-by-unity-editor/image-5.png)

For the first time you run this menu, some time to build headless project and you should wait for a while with blank screen. (Please be patient. Blank screen means it's on work.)
See new blocks mining and yeah, you're now a master of headless.

### 6. Play unity with local headless

![06_run_with_unity](/images/en/forum-trunk/run-your-own-local-headless-node-controlled-by-unity-editor/image-6.png)

After headless is working, now time to play game on your local network. Please open the Game scene, and see right-hand panel. You can see new checkbox `Use Local Headless` unchecked. Checking this runs local headless using subprocess. And the headless closes when you stop playing Unity editor.
That's it! you have local headless node that can make your game play on it. Please enjoy!
![alt text](/images/en/forum-trunk/run-your-own-local-headless-node-controlled-by-unity-editor/image-7.png)

↑ Screenshot of Unity play on local headless controlled by Unity editor

:warning: Note: Default headless setting contains `--store-type memory`. This means your all chain stores are on your memory(RAM) and it vanishes right after stop unity player. You can change it to `--store-type rocksdb` on `nekoyume/Assets/_Scripts/Helper/HeadlessHelper.cs`. 

# Behind the scene

## What is unity runner?

This is another clone of [NineChronicles.Headless](https://github.com/planetarium/NineChronicles.Headless). To avoid conflict, we just picked another name to see what this is.

## Do I have to update both Nine Chronicles and Unity-runner when I want to modify lib9c?

In short, NO. You can apply your lib9c changes to both repositories because Nine Chronicles and Unity-runner shares lib9c source code by symbolic link. Thus just edit lib9c code in unity project and re-run headless node.

# Troubleshooting

## I cannot run local headless after force re-start unity editor

Sometimes Unity editor crashes or freezes. In this case, most of we force kill the unity editor process. Since local headless is separated process, this could be remain in zombie state. In this case, Unity editor cannot run new local headless node because zombie holding blockchain store database read/write lock stopping new node accessing database at the same time.

To resolve this, you have to find and force kill what's prev. local headless process and you could run local headless node again.

# Outro

Test is invincible and more realistic environment makes more accurate test result. Nine Chronicles is blockchain game and game runs on network. We have to test new feature on-chain environment and now you can achieve this with new headless tool.
We're waiting for your new suggestion or any improvement. Please feel free to make modifications!

---

### TODO
- [ ] Use mainnet genesis URL as a genesis block
- [ ] Use custom snapshot (e.g., mainnet snapshot)
- [ ] Change store type: memory | rocksdb
