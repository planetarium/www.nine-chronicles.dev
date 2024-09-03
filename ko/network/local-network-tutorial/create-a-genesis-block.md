# 제네시스 블록 만들기

제네시스 블록은 블록체인 네트워크가 시작될 때 생성되는 첫 번째 블록입니다. 나인크로니클 블록체인 네트워크에서도 제네시스 블록이 존재하며, 모든 게임 플레이는 이 블록에서 시작됩니다.

나인크로니클의 블록체인 노드 구현체인 [NineChronicles.Headless][nc-headless]에서는 [NineChronicles.Headless.Executable][nc-headless-executable] 프로젝트를 통해 `genesis` 명령어를 제공하고 있습니다. 이를 사용해 사용자 정의 제네시스 블록을 생성하는 방법을 알아보겠습니다.

[nc-headless]: https://github.com/planetarium/NineChronicles.Headless
[nc-headless-executable]: https://github.com/planetarium/NineChronicles.Headless/tree/main/NineChronicles.Headless.Executable

## `NineChronicles.Headless` 저장소 복제

먼저, `NineChronicles.Headless`의 [GitHub 저장소](https://github.com/planetarium/NineChronicles.Headless)를 복제합니다.

### CLI 명령어

:::code-group
```shell (git)
git clone https://github.com/planetarium/NineChronicles.Headless.git
cd NineChronicles.Headless
git submodule update --init --recursive
```

```shell (gh)
gh repo clone planetarium/NineChronicles.Headless -- --recurse-submodules
```
:::

::: tip
이 튜토리얼에서는 `development` 브랜치를 기준으로 진행합니다.
```shell
git checkout development
```
:::

## `NineChronicles.Headless.Executable genesis` 명령어

이제 `NineChronicles.Headless.Executable` 프로젝트의 `genesis` 명령어로 어떤 작업을 수행할 수 있는지 확인해보겠습니다.  
빌드가 되는데 시간이 걸릴 수 있습니다.

```shell
dotnet run --project=NineChronicles.Headless.Executable -- genesis --help
```

출력 결과:

```
Usage: NineChronicles.Headless.Executable genesis [--help] config

Mine a new genesis block

Arguments:
  0: config    JSON config path to mine genesis block (Default: ./config.json)

Options:
  -h, --help    Show help message
```

이 명령어를 사용하여 새로운 제네시스 블록을 생성할 수 있습니다. 

먼저 제네시스 블록 생성을 위한 `config.json` 파일을 만들어보겠습니다. 단독 노드에서 사용할 제네시스 블록을 생성할 것이므로, 모든 권한이 한 private key에 할당된 설정을 생성하겠습니다. 이를 위해 `create-config-for-single` 스크립트를 사용합니다.  
이때, private key는 [이전 단계](./create-a-private-key)에서 생성한 것을 사용하세요.

```shell
sh scripts/create-config-for-single.sh
```

명령어 실행 후, 다음과 같은 메시지가 출력됩니다:

```
Enter the private key: {private key}
Enter the public key: {public key}
Enter the address: {address}
config.json has been created successfully.
```

성공적으로 실행되면, 아래와 유사한 `config.json` 파일이 생성됩니다:

```json
{
    "$schema": "./config.schema.json",
    "data": {
        "tablePath": "./Lib9c/Lib9c/TableCSV"
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

이 `config.json` 파일은 입력한 private key를 admin으로 지정하고, validator 권한과 초기 재화를 설정합니다. 더 복잡한 설정이 필요하다면, [Structure of genesis block][structure-of-genesis-block]과 [config.schema.json][config-schema-json]을 참조할 수 있습니다.

[structure-of-genesis-block]: https://github.com/planetarium/NineChronicles.Headless?tab=readme-ov-file#structure-of-genesis-block
[config-schema-json]: https://github.com/planetarium/NineChronicles.Headless/blob/development/config.schema.json

이제 생성된 `config.json` 파일을 사용해 제네시스 블록을 생성해보겠습니다.

```shell
dotnet run --project=NineChronicles.Headless.Executable -- genesis ./config.json 
```

출력 결과:

```
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

이제 `genesis-block` 파일이 생성되었습니다.

::: tip :tada:
축하합니다! 이제 `NineChronicles.Headless.Executable` 프로젝트의 `genesis` 명령어를 사용해 제네시스 블록을 만드는 방법을 배웠습니다. 다음 단계에서는 생성한 제네시스 블록과 private key를 사용해 노드를 실행해보겠습니다.
:::
