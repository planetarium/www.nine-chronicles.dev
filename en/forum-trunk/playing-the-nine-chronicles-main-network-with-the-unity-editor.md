The [Nine Chronicles][9c-page] published by [Planetarium][planetarium-page] is developed with [Unity][unity-page]. It means the Nine Chronicles can be executed by Unity Editor. So this article will show you how to play the Nine Chronicles main network.

[planetarium-page]: https://planetariumhq.com/
[9c-page]: https://nine-chronicles.com/
[unity-page]: https://unity.com/

## Install Unity

Here's how to install Unity with Unity Hub.

### Install Unity Hub

1. Click the Unity Hub download link for your operating system

   - [Windows(.exe)](https://public-cdn.cloud.unity3d.com/hub/prod/UnityHubSetup.exe)
   - [Mac(.dmg)](https://public-cdn.cloud.unity3d.com/hub/prod/UnityHubSetup.dmg)
   - If the above link does not work, download Unity Hub from [Unity download page][unity-download-page].

2. Run the downloaded Unity Hub installation file

[unity-download-page]: https://unity3d.com/get-unity/download

### Install Unity(2021.3.5f1)

1. Click [Unity(2021.3.5f1) installation link for Unity Hub][unity-install-with-hub-2021.3.5f1]

   - If the above link does not work, download Unity(2021.3.5f1) from [Unity downlad archive page][unity-download-archive-page]. At this time, install with the green Unity Hub button.

      ![Web: green Unity Hub button](/images/en/forum-trunk/playing-the-nine-chronicles-main-network-with-the-unity-editor/image.png)

2. Unity(2021.3.5f1) installation proceeds with Unity Hub running

[unity-install-with-hub-2021.3.5f1]: unityhub://2021.3.5f1/40eb3a945986
[unity-download-archive-page]: https://unity3d.com/get-unity/download/archive

## Prepare the Nine Chronicles repository

Here I cover how to use [Git CLI][git-page] and [Fork][fork-page] as a way to clone a repository.

[git-page]: https://git-scm.com/
[fork-page]: https://git-fork.com/

### Cloning with the Git CLI

1. Install the Git CLI for your operating system

   - [Windows](https://git-scm.com/download/windows)
   - [Mac](https://git-scm.com/download/mac)
   - [Linux](https://git-scm.com/download/linux)

2. Clone the Nine Chronicles repository

   ```sh
   git clone https://github.com/planetarium/NineChronicles.git
   cd NineChronicles
   git submodule update --init --recursive
   git config core.hooksPath hooks
   ```

3. Checkout to the `main` branch

   ```sh
   git checkout main
   git submodule update --recursive
   ```

### Cloning with the Fork

1. Install the Fork for your operating system

   - [Windows(.exe)](https://git-fork.com/update/win/ForkInstaller.exe)
   - [Mac(2.20.2)(.dmg)](https://cdn.fork.dev/mac/Fork-2.20.2.dmg)
   - If above link does not work or if you want to install another version, go to the [Fork page][fork-page] and download it.

2. Run the Fork and clone the Nine Chronicles repository

   - Click `File > Clone` menu.

      ![Fork: `File > Clone` menu](/images/en/forum-trunk/playing-the-nine-chronicles-main-network-with-the-unity-editor/image-1.png)

   - Enter `URL` and `Location` and click the `Clone` button.
      - URL: `https://github.com/planetarium/NineChronicles.git`
      - Location: In the image below, I specified it as "`/Users/seungmin/Repositories/NineChronicles`".

   ![Fork: `Clone` popup](/images/en/forum-trunk/playing-the-nine-chronicles-main-network-with-the-unity-editor/image-2.png)

3. Checkout to the main branch

   - Right-click the `Remotes > Origin > main` branch and click the `Checkout 'origin/main'...` menu.

      ![Fork: `Remotes > Origin > main` -> `Checkout 'origin/main'...` menu](/images/en/forum-trunk/playing-the-nine-chronicles-main-network-with-the-unity-editor/image-3.png)

   - In the following popup, click the `Track` button.

      ![Fork: `Track` popup](/images/en/forum-trunk/playing-the-nine-chronicles-main-network-with-the-unity-editor/image-4.png)

## Play the Nine Chronicles with the Unity editor

### Open the Nine Chronicles project with the Unity Hub

1. Run the Unity Hub

   Unity account creation and licensing are not covered here. You can also proceed for free(Unity Personal License).

2. Open the Nine Chronicles project

   - Click the `Projects > Open` button when running for the first time.

      ![Unity Hub: `Projects > Open` button](/images/en/forum-trunk/playing-the-nine-chronicles-main-network-with-the-unity-editor/image-5.png)

   - Select the `/nekoyume` folder in the location where you cloned the Nine Chronicles repository and click the `Open` button.

      ![Unity Hub: `Open Project` popup](/images/en/forum-trunk/playing-the-nine-chronicles-main-network-with-the-unity-editor/image-6.png)

### Configure `clo.json`

The clo.json file is a file that sets various options related to the blockchain network.

1. Create a clo.json file in `/nekoyume/Assets/StreamingAssets/` based on the cloned path

2. Fill in the clo.json file as shown below and save it

   ```json
   {
     "GenesisBlockPath": "https://download.nine-chronicles.com/genesis-block-Nine Chronicles-main",
     "NoMiner": true,
     "RpcClient": true,
     "RpcServerHost": "9c-main-rpc-1.nine-chronicles.com",
     "RpcServerPort": 31238,
     "ApiServerHost": "https://api.9c.gg/graphql"
   }
   ```

### Prepare a Private key

#### If you already have a Private Key

1. Use the Key Store

   You can find more information about the Key Store [here](./about-the-key-store).
      - Put your Protected Private Key into the Key Store path.

1. (not recommended) Setting the private key directly in the clo.json file

   - Add a `"PrivateKey"` entry to the existing clo.json file.

      ```json
      {
        "PrivateKey": "your-pivate-key"
      }
      ```

#### Generate a new Private Key

- You can generate a new Private Key on [Play](#play) step.

### Play {#play}

You are now ready to access to the Nine Chronicles mainnet and play.

1. Open the `Game` scene

   - Double-click the Game scene in the `/nekoyume/Assets/_Scenes/`.

      ![Unity Editor: `Game` scene](/images/en/forum-trunk/playing-the-nine-chronicles-main-network-with-the-unity-editor/image-7.png)

2. Click the `Play` button

   - Click the ▶️ button at the top and middle of the Unity editor.

      ![Unity Editor: `Play` button](/images/en/forum-trunk/playing-the-nine-chronicles-main-network-with-the-unity-editor/image-8.png)

3. Sign in

   - Go to [3.1. Sign up] if there is no Protected Private Key in the Key Store path.
   - If there is no Protected Private Key in the Key Store path, go to [3.1. Sign up].
   - If you enter "PrivateKey" in the clo.json file, this process will be skipped.
   - Confirm the address of the selected account in the login pop-up and enter `passphrase`.
   - And click the `GAME START` button.

      ![Unity Editor Play: input passphrase](/images/en/forum-trunk/playing-the-nine-chronicles-main-network-with-the-unity-editor/image-9.png)

   3.1. Sign up

      You can generate the Private Key and the Protected Private Key in this step.

      - Click the `GAME START` button

         ![Unity Editor Play: click GAME START button](/images/en/forum-trunk/playing-the-nine-chronicles-main-network-with-the-unity-editor/image-10.png)

      - Fill the passphrase and click the `GAME START` button.

         ![Unity Editor Play: input passphrase and click GAME START button](/images/en/forum-trunk/playing-the-nine-chronicles-main-network-with-the-unity-editor/image-11.png)

## Conclusion

So far, I have introduced how to connect to the Nine Chronicles main network using the Unity Editor.
In order to maintain this method, you will need to consistently pull the main branch of the Nine Chronicles repository.

I plan to introduce various tips based on this content in the future.
