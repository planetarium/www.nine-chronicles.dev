# BepInEx를 사용한 모드 만들기 시작하기

### 설치

- https://nine-chronicles.com/start 에서 나인크로니클을 설치합니다.

### 나인크로니클 정상 동작 확인하기 (첫 번째)

- 설치한 나인크로니클 런처와 플레이어를 실행해서 정상 동작하는지 확인합니다.
- 확인 후에 나인크로니클 플레이어를 종료합니다. 런처는 그대로 두어도 됩니다.

### BepInEx 5 LTS 설치하기

- BepInEx 5 LTS 버전을 내려받습니다.
   - https://github.com/BepInEx/BepInEx/releases/tag/v5.4.22
   - BepInEx_x64_5.4.22.0.zip
- BepInEx 압축 파일을 나인크로니클 플레이어가 설치되어 있는 폴더에 해제합니다.
   - e.g., `C:\Users{username}\Roaming\Nine Chronicles\player\main\`
- 압축 해제한 BepInEx 폴더 안에는 아직 **core** 폴더만 있습니다.
  <img width="327" alt="Untitled" src="https://github.com/Atralupus/NineChronicles.Mods/assets/30599098/1a089551-cfa4-44a6-9e47-7d4934bf9a8d">
  <img width="335" alt="Untitled (1)" src="https://github.com/Atralupus/NineChronicles.Mods/assets/30599098/a0bb3e6e-5e4a-4233-96c5-191adeac60d2">

### 나인크로니클 정상 동작 확인하기 (두 번째)

- BepInEx 기본 설치 환경에서 나인크로니클 플레이어가 정상 동작하는지 확인합니다.
- 확인 후에 나인크로니클 플레이어를 종료합니다.

### 자동 생성된 BepInEx 구조 확인하고 설정하기

- 압축 해제한 BepInEx 폴더 안의 구성을 확인합니다.
  <img width="377" alt="Untitled (2)" src="https://github.com/Atralupus/NineChronicles.Mods/assets/30599098/65b673e7-7427-45b6-baf3-a344f73c660b">

- config 폴더 안의 BepInEx.cfg 파일을 열어서 일부 설정을 수정합니다.
```
[Chainloader]
  HideManagerGameObject = true
[Logging.Console]
  Enabled = true
[Preloader.Entrypoint]
  Type = Camera
```

### 나인크로니클 정상 동작 확인하기 (세 번째)

- BepInEx 설정 수정 후, 나인크로니클 플레이어가 정상 동작하는지 확인합니다.
- BepInEx 로그 터미널이 열리는 차이를 확인합니다.
- 확인 후에 나인크로니클 플레이어를 종료합니다.

### 모드 개발하기

1. **새 프로젝트 만들기**
   - Target Framework: .NET Standard 2.1
   - Lang Version: 9.0

2. **기본 종속성 추가하기**
   - 위치 e.g., `C:\Users{username}\Roaming\Nine Chronicles\player\main\NineChronicles_Data\Managed\`
      - UnityEngine.CoreModule.dll
      - UnityEngine.dll
      - Lib9c.dll
      - Nekoyume.dll
   - 위치 e.g., `C:\Users{username}\Roaming\Nine Chronicles\player\main\BepInEx\core\`
      - 0Harmony.dll
      - BepInEx.dll
  
3. **플러그인 만들기**
   - 예제 플러그인 구현을 위해서 추가 종속성 추가하기
      - 위치 e.g., `C:\Users{username}\Roaming\Nine Chronicles\player\main\NineChronicles_Data\Managed\`
         - UnityEngine.InputLegacyModule.dll

::: details e.g., TestModPlugin.cs
```csharp
using BepInEx;
using BepInEx.Logging;
using HarmonyLib;

namespace NineChronicles.Mods.TestMod
{
    [BepInPlugin(ModGUID, ModName, ModVersion)]
    public class TestModPlugin : BaseUnityPlugin
    {
        private const string ModGUID = "com.ninechronicles.mods.testmod";
        private const string ModName = "Test Mod";
        private const string ModVersion = "0.1.0";

        private static TestModPlugin Instance;

        private readonly Harmony _harmony = new Harmony(ModGUID);

        internal ManualLogSource _logger;

        private void Awake()
        {
            if (Instance is null)
            {
                Instance = this;
            }

            _logger = Logger.CreateLogSource(ModGUID);
            _logger.LogInfo($"{ModName} is loaded!");

            _harmony.PatchAll(typeof(TestModPlugin));
            _harmony.PatchAll(typeof(Patches.NotifyKeyboardInput));
        }
    }
}
```
:::
::: details e.g., NotifyKeyboardInput.cs
```csharp
using HarmonyLib;
using Nekoyume.Game;
using Nekoyume.UI;
using UnityEngine;

namespace NineChronicles.Mods.TestMod.Patches
{
    [HarmonyPatch(typeof(ActionCamera))]
    internal class NotifyKeyboardInput
    {
        [HarmonyPatch("Update")]
        [HarmonyPostfix]
        private static void PostfixUpdate()
        {
            if (Input.GetKeyDown(KeyCode.Space))
            {
                NotificationSystem.Push(
                    Nekoyume.Model.Mail.MailType.System,
                    "Space key is pressed!",
                    Nekoyume.UI.Scroller.NotificationCell.NotificationType.Notification);
            }
        }
    }
}
```
:::

### 모드 적용하기

1. 플러그인 빌드하기
   - e.g., TestMod.dll
2. 나인크로니클 플레이어에 모드 dll 파일 복사하기
   - e.g., `C:\Users{username}\Roaming\Nine Chronicles\player\main\BepInEx\plugins\`

### 모드 동작 확인하기

- 모드 dll 파일 적용 후, 나인크로니클 플레이어가 정상 동작하는지 확인합니다.
- BepInEx 로그 터미널에서 모드가 잘 로드되는 것을 확인합니다.
   - Loading [Test Mod 0.1.0]
   - Test Mod is loaded!
   <img width="500" alt="Untitled (3)" src="https://github.com/Atralupus/NineChronicles.Mods/assets/30599098/fc0419d0-1ef9-468a-a7b5-ffec65240ddc">
- 모드가 잘 동작하는 것을 확인합니다.
   - e.g., Pressing the space key triggers the 9c-unity NotificationSystem.Push() function.
   <img width="419" alt="Untitled (4)" src="https://github.com/Atralupus/NineChronicles.Mods/assets/30599098/a64fc4e4-ba85-483d-90df-24557b741955">
- 확인 후에 나인크로니클 플레이어를 종료합니다.
