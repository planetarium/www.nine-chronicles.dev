# Chrono 사용법

나인크로니클 블록체인 네트워크에서 서명을 하기 위해 `크로노`를 사용하는 방법을 알아 보겠습니다. `크로노`는 `메타마스크`와 비슷한 기능을 제공하는 크롬 브라우저의 확장입니다.

사용자는 `크로노`에 개인 키를 등록하고 원하는 네트워크를 설정할 수 있고, 웹앱으로부터 요청 받은 트랜젝션을 크로노로 서명하고 전파할 수 있습니다.
## 설치

### 1. 크롬 웹 스토어

크롬 웹 스토어의 [Chrono  페이지](https://chromewebstore.google.com/detail/chrono-development-build/gcloogpfjklfhgfddenekamfjgbcklic)에서 간단히 설치할 수 있습니다.

### 2. 수동 설치

#### 2.1 빌드 파일 확보

`크로노`를 직접 설치하기 위해서는 빌드 파일이 필요합니다. 아래의 두 방법 중에서 선택해서 빌드 파일을 확보합니다.

::: details 저장소 배포 버전을 다운로드
1. `크로노`의 [GitHub 저장소](https://github.com/planetarium/chrono)에서 배포하는 [최신 버전](https://github.com/planetarium/chrono/releases)을 내려받습니다.
    ```shell
    curl -L -o chrono_v1.0.5.zip https://github.com/planetarium/chrono/releases/download/1.0.5/chrono_v1.0.5.zip
    ```
2. 내려받은 압축파일을 해제합니다.
3. 이제 [다음 단계](#load-unpacked-in-chrome-extensions)로 넘어갑니다.
:::

::: details `크로노` 저장소를 복제하고, 프로젝트를 직접 빌드하기
1. `크로노`의 [GitHub 저장소](https://github.com/planetarium/chrono)를 복제합니다.

    ::: code-group
    ```shell [git]
    git clone --recursive https://github.com/planetarium/chrono.git
    ```

    ```shell [gh(GitHub)]
    gh repo clone planetarium/chrono
    ```
    :::

    ::: info :bulb:
    본 문서에서는 `1.0.5` 태그를 기준으로 진행했습니다.
    ```shell
    git checkout 1.0.5
    ```
    :::

2. 복제한 저장소 루트에서 `크로노`를 빌드합니다.

    > `크로노` 프로젝트는 `pnpm`을 사용해서 패키지를 관리하고 있습니다. `pnpm`을 설치하지 않았다면, [이곳](https://pnpm.io/installation)을 참고하여 설치합니다.

    ```shell
    cd chrono
    ```
    ```shell
    pnpm install
    ```
    ```shell
    pnpm run build
    ```

3. 빌드가 완료되면, `/build` 디렉터리가 생성됩니다. 이제 [다음 단계](#load-unpacked-in-chrome-extensions)로 넘어갑니다.
:::

#### 2.2. 크롬 확장에서 Unpacked 불러오기 {#load-unpacked-in-chrome-extensions}

1. 크롬 브라우저를 실행하고, 주소란에 `chrome://extensions`를 입력합니다.
2. 화면 우상단의 `Developer Mode`를 활성화합니다.
![Enable Developer Mode](/images/en/guide/issue-transaction/issue-transaction-with-chrono/enable-developer-mode.png){width=240}
3. 화면 좌상단의 `Load unpacked` 버튼을 클릭하고 압축 해제한 디렉터리나 직접 빌드한 `/build` 디렉터리를 선택합니다.
![Load unpacked button in Chrome extensions](/images/en/guide/issue-transaction/issue-transaction-with-chrono/load-unpacked-01.png){width=360}
![Select "build" directory](/images/en/guide/issue-transaction/issue-transaction-with-chrono/select-build-directory.png){width=480}
4. `크로노`가 설치됐습니다.
!["Chrono" in Chrome extensions](/images/en/guide/issue-transaction/issue-transaction-with-chrono/chrome-extensions-chrono.png){width=360}

## `크로노` 첫 실행과 개인 키 등록하기

우선 사용 편의를 위해서 `크로노`를 고정하겠습니다.
![Pinning "Chrono" in Chrome extensions](/images/en/guide/issue-transaction/issue-transaction-with-chrono/pinning-chrono.png){width=360}

### 1. 첫 실행

`크로노`를 처음 실행하면 `크로노` 실행을 위한 비밀번호를 설정하게 됩니다. 비밀번호는 최소 8자 이상이어야 하며 보안에 주의해주세요.
![Set password of "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/set-password.png){width=360}

`크로노`는 첫 실행시 계정을 생성하거나 등록하게 됩니다. 기존의 개인 키를 가지고 있다면, `Recover`를 클릭하고 개인 키의 Seed Phrase를 입력하여 계정을 등록합니다. 새로운 계정을 생성하려면, `New`를 클릭하고 자동 생성된 Seed Phrase로 계정을 등록합니다.

::: danger :rotating_light:
비밀번호와 Seed Phrase는 절대 타인과 공유하지 마세요. 이를 통해 계정에 접근할 수 있습니다.
:::

![Create first account of "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/first-account.png){width=360}

> `크로노`는 위의 첫 실행 과정에서 이미 갖고 있는 개인 키의 평문으로 첫 계정을 설정하는 기능을 아직은 제공하고 있지 않습니다. 그런 경우에는 `New`를 클릭해서 진행한 후에 [아래](#register-private-key)에서 개인 키를 등록해줍니다.

### 2. 개인 키 등록하기 {#register-private-key}

::: danger :rotating_light:
여기서는 예를 들기 위해서 개인 키를 노출합니다만, 이외의 목적으로 사용하는 개인 키는 절대로 노출해서는 안 됩니다.
:::

우선 `크로노`를 열고, 좌상단의 `Account 1` 버튼을 선택하고, `Import` 버튼을 선택합니다.
![Select "Account 1" and "Import" button of "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/account-import.png){width=360}

계정 이름을 `My private key`로 설정하고, 개인 키 평문을 입력하고 `Import` 버튼을 클릭합니다.
![Import "My private key" to "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/import-my-private-key.png){width=360}

조금 기다리면, `My private key`가 성공적으로 추가되며 Chrono를 사용할 수 있게됩니다.
!["My private key" on "Chrono"](/images/en/guide/issue-transaction/issue-transaction-with-chrono/my-private-key.png){width=360}
