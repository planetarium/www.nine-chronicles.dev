# 제네시스 블록 만들기

제네시스 블록은 블록체인 네트워크가 시작할 때 생성되는 첫 번째 블록입니다. 나인크로니클의 블록체인 네트워크에도 제네시스 블록이 존재하고, 모든 게임 플레이가 이 블록에서 시작됩니다.

나인크로니클의 블록체인 노드 구현체인 [NineChronicles.Headless][nc-headless]에서는 [NineChronicles.Headless.Executable][nc-headless-executable] 프로젝트를 통해서 `genesis`라는 명령을 제공합니다. 이를 사용해서 사용자 정의된 제네시스 블록을 만들어 보겠습니다.

예시 private key로 생성된 제네시스 블록 파일을 제공합니다. (새 탭으로 열어서 다운로드 받아주세요.) [Genesis Block](/files/genesis-block)

[nc-headless]: https://github.com/planetarium/NineChronicles.Headless
[nc-headless-executable]: https://github.com/planetarium/NineChronicles.Headless/tree/main/NineChronicles.Headless.Executable

## `NineChronicles.Headless` 저장소 복제

먼저, `NineChronicles.Headless`의 [GitHub 저장소](https://github.com/planetarium/NineChronicles.Headless)를 복제합니다.

### cli

::: code-group
```shell [git]
git clone https://github.com/planetarium/NineChronicles.Headless.git
git submodule update --init --recursive
```

```shell [gh(GitHub)]
gh repo clone planetarium/NineChronicles.Headless -- --recurse-submodules
```
:::

::: info :bulb:
본 문서에서는 `v200200` 태그를 기준으로 진행했습니다.
```shell
git checkout v200200
```
:::

## `NineChronicles.Headless.Executable genesis`

이제 `NineChronicles.Headless.Executable` 프로젝트의 `genesis` 명령어로 무엇을 할 수 있는지 확인해보겠습니다.

[nc-headless-readme]: https://github.com/planetarium/NineChronicles.Headless?tab=readme-ov-file#create-a-new-genesis-block

```shell
cd ./NineChronicles.Headless.Executable
```
```shell
dotnet run -- genesis --help
```
```console {6}
Usage: NineChronicles. genesis [--help] config

Mine a new genesis block

Arguments:
  0: config    JSON config path to mine genesis block (Default: ./config.json)

Options:
  -h, --help    Show help message
```

위의 명령어를 사용하여 새로운 제네시스 블록을 생성할 수 있습니다. 이 명령어는 기본적으로 `./config.json` 파일에서 설정 정보를 읽습니다. 만약 다른 경로의 JSON 파일을 사용하려면, `--config` 옵션을 사용하여 해당 경로를 지정할 수 있습니다.
이제 `NineChronicles.Headless.Executable/config.json` 경로에 설정 파일을 만들어 보겠습니다. 설정 파일의 스키마는 [Structure of genesis block][structure-of-genesis-block]과 [config.schema.json][config-schema-json]에서 확인할 수 있습니다. 아래는 이전 단계에서 생성한 개인 키를, 블록체인의 관리자이자 재화(`NCG`)의 주조자이자 블록 검증자가 되게끔 설정해보았습니다.

[structure-of-genesis-block]: https://github.com/planetarium/NineChronicles.Headless?tab=readme-ov-file#structure-of-genesis-block
[config-schema-json]: https://github.com/planetarium/NineChronicles.Headless/blob/development/config.schema.json

::: danger :rotating_light:
여기서는 예를 들기 위해서 개인 키를 노출합니다만, 이외의 목적으로 사용하는 개인 키는 절대로 노출해서는 안 됩니다.
:::

::: details `config.json` 파일에 대한 설명

```json
{
    "$schema": "../config.schema.json",
    "data": {
        // 테이블시트 csv 파일들을 포함하고 있는 경로를 설정합니다.
        "tablePath": "../Lib9c/Lib9c/TableCSV"
    },
    // 블록체인의 관리자를 설정합니다.
    "admin": {
        "activate": true,
        // 앞에서 예시로 만든 개인 키의 주소를 입력했습니다.
        "address": "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159",
        "validUntil": 1000000
    },
    // 재화(NCG)의 주조자와 예금량을 설정합니다.
    "currency": {
        // 관리자의 개인 키를 입력했습니다.
        "initialMinter": "9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102",
        "initialCurrencyDeposit": [
            {
                // 관리자의 주소를 입력했습니다.
                "address": "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159",
                "amount": 1000000,
                "start": 0,
                "end": 0
            }
        ]
    },
    // 블록 검증자를 설정합니다.
    "initialValidatorSet": [
        {
            // 관리자의 공개 키를 입력했습니다.
            "publicKey": "033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14",
            "power": 1
        }
    ],
    // 미드(Mead)를 설정합니다.
    "initialMeadConfigs": [
        {
            // 관리자의 주소를 입력했습니다.
            "address": "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159",
            "amount": "1000000"
        }
    ],
    "initialPledgeConfigs": []
}
```
:::

```json
{
    "$schema": "../config.schema.json",
    "data": {
        "tablePath": "../Lib9c/Lib9c/TableCSV"
    },
    "admin": {
        "activate": true,
        "address": "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159",
        "validUntil": 1000000
    },
    "currency": {
        "initialMinter": "9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102",
        "initialCurrencyDeposit": [
            {
                "address": "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159",
                "amount": 1000000,
                "start": 0,
                "end": 0
            }
        ]
    },
    "initialValidatorSet": [
        {
            "publicKey": "033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14",
            "power": 1
        }
    ],
    "initialMeadConfigs": [
        {
            "address": "0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159",
            "amount": "1000000"
        }
    ],
    "initialPledgeConfigs": []
}
```

이제 이 `config.json` 파일을 사용해서 제네시스 블록을 만들어 보겠습니다.

```shell
dotnet run -- genesis ./config.json 
```
```console
Processing data for genesis...

Processing currency for genesis...

Processing admin for genesis...
Admin config done

Processing initial validator set for genesis...
Initial validator set config done: PublicKey: 033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14, Power: 1


Processing initial mead distribution...
Preparing initial 1000000 MEAD for 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159...

Processing initial pledges...

Mining genesis block...

Admin privilege has been granted to given admin address. Keep this account in secret.

Genesis block created.
```

이제 `genesis-block` 파일이 만들어졌습니다.

::: tip :tada:
수고하셨습니다! 이제 여러분은 `NineChronicles.Headless.Executable` 프로젝트의 `genesis` 명령어를 사용해서 제네시스 블록을 만드는 방법을 배웠습니다. 다음은 개인 키와 제네시스 블록을 사용해서 나인크로니클의 블록체인 노드를 실행해보겠습니다.
:::
