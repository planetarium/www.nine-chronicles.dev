# 개인 키 만들기

블록체인 네트워크에 참여하기 위해서는, 다시 말해 트랜잭션을 발행하기 위해서는 개인 키를 만들어야 합니다. 개인 키를 통해 우리는 계정을 보호하고, 자신만의 독립적인 키를 사용하여 거래를 수행할 수 있습니다.

나인크로니클의 블록체인 기술 기반이 되는 [Libplanet][libplanet]에서는 [Libplanet.Tools][libplanet-tools] 프로젝트를 통해서 `planet`이라는 cli를 제공합니다. 이를 사용해서 개인 키를 만들어 보겠습니다.

[libplanet]: https://github.com/planetarium/libplanet
[libplanet-tools]: https://github.com/planetarium/libplanet/tree/main/tools/Libplanet.Tools

## `planet` cli 설치

먼저 `Libplanet.Tools`의 [README 문서][readme]를 참조하여 `planet` cli를 설치합니다.

[readme]: https://github.com/planetarium/libplanet/blob/main/tools/Libplanet.Tools/README.md

::: info :bulb:
본 문서에서는 `planet` cli 버전 5.0.0을 사용합니다.
:::

## `planet key`

`planet key` 명령어를 사용해서 개인 키를 만들어 보겠습니다. 우선 `planet key` 명령어를 실행해서 관리되고 있는 키 목록을 확인해보겠습니다.

```shell
planet key
```
```console
Key ID                               Address                                   
------------------------------------ ------------------------------------------
```

아직은 키가 없는 것을 확인할 수 있습니다. 다음은 `planet key --help` 명령어를 실행해서 무엇을 할 수 있는지 확인해보겠습니다.

```shell
planet key --help
```
```console {7}
Usage: planet key [command]
Usage: planet key [--path <String>] [--help]

List all private keys.

Commands:
  create      Create a new private key.
  remove      Remove a private key.
  import      Import a raw private key or Web3 Secret Storage.
  export      Export a raw private key (or public key).
  generate    Generate a raw private key without storing it.
  sign        Sign a message.
  derive      Derive public key and address from private key.

Options:
  --path <String>    Specify key store path to list.
  -h, --help         Show help message
```

이제 `planet key create` 명령어를 사용해서 새로운 개인 키를 생성해 보겠습니다.

::: danger :rotating_light:
실제로 사용할 용도의 개인 키를 생성할 때에는 강력한 암호 구문을 사용해야 합니다.
:::

```shell
planet key create
```
```console
Passphrase: ***************
Retype passphrase: ***************
Key ID                               Address                                   
------------------------------------ ------------------------------------------
1fd94a3e-2273-489b-bd44-b62036e2c07d 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159
```

암호 구문을 입력하고 나니 새로운 개인 키가 생성되었습니다. 이 키는 `planet` cli 수준에서 `Key ID`와 `Address`로 표현됩니다. 아래에는 이 키로부터 개인 키와 공개 키를 확인해보겠습니다. `planet key export --help` 명령어를 사용해서 어떻게 사용해야 하는지 확인해보겠습니다.

```shell
planet key export --help
```
```console {9}
Usage: planet key export [--passphrase <PASSPHRASE>] [--passphrase-file <FILE>] [--public-key] [--bytes] [--json] [--path <String>] [--help] key-id

Export a raw private key (or public key).

Arguments:
  0: key-id    A key UUID to export. (Required)

Options:
  -p, --passphrase <PASSPHRASE>    Take passphrase through this option instead of prompt.  Mutually exclusive with --passphrase-file option.
  --passphrase-file <FILE>         Read passphrase from the specified file instead of taking it through prompt.  Mutually exclusive with -p/--passphrase option.  For standard input, use a hyphen (`-').  For an actual file named a hyphen, prepend `./', i.e., `./-'.  Note that the trailing CR/LF is trimmed.
  -P, --public-key                 Export a public key instead of private key.
  -b, --bytes                      Print raw bytes instead of hexadecimal.  No trailing LF appended.
  --json                           Export a Web3 Secret Storage Formatted json
  --path <String>                  Path to key store to export from.
  -h, --help                       Show help message
```

`--passphrase` 옵션에 위에서 입력했던 암호 구문을 입력해서 개인 키를 확인해보겠습니다.

::: danger :rotating_light:
여기서는 예를 들기 위해서 개인 키를 노출합니다만, 이외의 목적으로 사용하는 개인 키는 절대로 노출해서는 안 됩니다.
:::

```shell
planet key export 1fd94a3e-2273-489b-bd44-b62036e2c07d --passphrase=***************
```
```console
9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102
```

`--public-key` 옵션을 추가해서 공개 키를 확인해보겠습니다.

```shell
planet key export 1fd94a3e-2273-489b-bd44-b62036e2c07d --passphrase=*************** --public-key
```
```console
033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14
```

위에서 만들어 본 키의 정보를 모아보면 아래와 같습니다.

```
Key ID: 1fd94a3e-2273-489b-bd44-b62036e2c07d
Private Key: 9fe5f7c309495d284ca36b948fdeca0e65b21a019e2f8a03efd849df88fab102
Public Key: 033dafc7bf6d603578a8c51b04430b738aeeead8a012e1dcbd8c75cf18a625cf14
Address: 0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159
```

::: tip :tada:
수고하셨습니다! 이제 여러분은 `planet` cli를 사용해서 개인 키를 만들고 사용하는 방법 일부를 배웠습니다. 다음은 이 키를 활용해서 제네시스 블록을 만들어 보겠습니다.
:::
