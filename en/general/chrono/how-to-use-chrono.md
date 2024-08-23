# How to use `Chrono`

Let's learn how to use `Chrono` to sign transactions on the Nine Chronicles blockchain network. `Chrono` is a Chrome browser extension that offers functionality similar to `MetaMask`

Users can register their private keys with `Chrono` and configure their desired network. They can also sign and broadcast transactions requested by web applications through `Chrono`

## Installation

### 1. Chrome Web Store

You can easily install it from the [Chrono page](https://chromewebstore.google.com/detail/chrono-development-build/gcloogpfjklfhgfddenekamfjgbcklic) on the Chrome Web Store.

### 2. Manual Installation

Due to Chrome Web Store policies, there may be times when the latest version of `Chrono` is not available for installation from the Chrome Web Store. Here are the steps for manual installation for such cases.

#### 2.1 Obtaining the Build Files

To install `Chrono` manually, you need to obtain the build files. You can choose from either of the two methods below to get the build files.

::: details Downloading the repository release version
1. Download the [latest version](https://github.com/planetarium/chrono/releases) from `Chrono`’s [GitHub repository](https://github.com/planetarium/chrono).
    ```shell
    curl -L -o chrono_v1.0.5.zip https://github.com/planetarium/chrono/releases/download/1.0.5/chrono_v1.0.5.zip
    ```
2. Unzip the downloaded file.
3. Proceed to the [next step](#load-unpacked-in-chrome-extensions).
:::

::: details Cloning the `Chrono` repository and building the project
1. Clone the [Chrono GitHub repository](https://github.com/planetarium/chrono).

    ::: code-group
    ```shell [git]
    git clone --recursive https://github.com/planetarium/chrono.git
    ```

    ```shell [gh(GitHub)]
    gh repo clone planetarium/chrono
    ```
    :::

    ::: info :bulb:
    This document is based on the `1.0.5` tag.
    ```shell
    git checkout 1.0.5
    ```
    :::

2. Build `Chrono` from the root of the cloned repository.

    > The `Chrono` project uses `pnpm` for package management. If you haven't installed `pnpm`, refer to [this link](https://pnpm.io/installation) for installation instructions.

    ```shell
    cd chrono
    ```
    ```shell
    pnpm install
    ```
    ```shell
    pnpm run build
    ```

3. Once the build is complete, a `/build` directory will be created. Now proceed to the [next step](#load-unpacked-in-chrome-extensions).
:::

#### 2.2. Loading Unpacked Extension in Chrome {#load-unpacked-in-chrome-extensions}

1. Open Chrome browser and enter `chrome://extensions` in the address bar.
2. Enable `Developer mode` in the top right corner of the screen.
![Enable Developer Mode](/images/en/guide/issue-transaction/issue-transaction-with-chrono/enable-developer-mode.png){width=240}
3. Click the `Load unpacked` button in the top left corner of the screen and select the directory where you unzipped the files or the `/build` directory if you built it manually.
![Load unpacked button in Chrome extensions](/images/en/guide/issue-transaction/issue-transaction-with-chrono/load-unpacked-01.png){width=360}
![Select "build" directory](/images/en/guide/issue-transaction/issue-transaction-with-chrono/select-build-directory.png){width=480}
4. `Chrono` is now installed.
![Chrono in Chrome extensions](/images/en/guide/issue-transaction/issue-transaction-with-chrono/chrome-extensions-chrono.png){width=360}

## First Run of `Chrono` and Registering a Private Key

First, for convenience, let's pin `Chrono`.
![Pinning "Chrono" in Chrome extensions](/images/en/guide/issue-transaction/issue-transaction-with-chrono/pinning-chrono.png){width=360}

### 1. First Run

When you run `Chrono` for the first time, you will need to set a password to use `Chrono`. The password must be at least 8 characters long, and make sure to choose a strong password to ensure security.
![Set password of "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/set-password.png){width=360}

When `Chrono` is first run, it prompts you to create or register an account. If you already have a private key, click `Recover` and enter the Seed Phrase of your private key to register the account. To create a new account, click `New` and register the account using the automatically generated Seed Phrase.

::: danger :rotating_light:
Never share your password and Seed Phrase with anyone. They can be used to access your account.
:::

![Create first account of "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/first-account.png){width=360}

> `Chrono` does not currently support setting up the first account using an existing private key directly during the initial run. In such cases, click on `New` to proceed and then register the private key later as described [below](#register-private-key).

### 2. Registering a Private Key {#register-private-key}

::: danger :rotating_light:
In this example, we expose the private key for demonstration purposes only. Never expose your private key if it's used for any other purpose.
:::

First, open `Chrono`. Select the `Account 1` button in the top left corner and click the `Import` button.
![Select "Account 1" and "Import" button of "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/account-import.png){width=360}

Set the account name as `My private key`, enter the plaintext private key, and click the `Import` button.
![Import "My private key" to "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/import-my-private-key.png){width=360}

After a short wait, `My private key` will be successfully added.
!["My private key" on "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/my-private-key.png){width=360}
