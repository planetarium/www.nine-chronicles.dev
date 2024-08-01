# Getting Started with Modding using BepInEx

### Install
- Installing Nine Chronicles at https://nine-chronicles.com/start

### Verifying Nine Chronicles Operation
- Launch the Nine Chronicles launcher and player to ensure they are working correctly.
- Close the Nine Chronicles player after confirmation. You may leave the launcher running.

### Installing BepInEx 5 LTS
- Download BepInEx 5 LTS version.
  - https://github.com/BepInEx/BepInEx/releases/tag/v5.4.22
  - BepInEx_x64_5.4.22.0.zip
- Extract the BepInEx zip file into the folder where Nine Chronicles player is installed.
  - e.g., `C:\Users{username}\Roaming\Nine Chronicles\player\main\`
- After extraction, the BepInEx folder contains only the core folder at this point.

<img width="327" alt="Untitled" src="https://github.com/Atralupus/NineChronicles.Mods/assets/30599098/1a089551-cfa4-44a6-9e47-7d4934bf9a8d">
<img width="335" alt="Untitled (1)" src="https://github.com/Atralupus/NineChronicles.Mods/assets/30599098/a0bb3e6e-5e4a-4233-96c5-191adeac60d2">

### Verifying Nine Chronicles Operation (One More)
- Check if the Nine Chronicles player operates correctly with the default BepInEx installation.
- Close the Nine Chronicles player after confirmation.

### Reviewing and Configuring the Automatically Generated BepInEx Structure
- Review the structure inside the extracted BepInEx folder.
<img width="377" alt="Untitled (2)" src="https://github.com/Atralupus/NineChronicles.Mods/assets/30599098/65b673e7-7427-45b6-baf3-a344f73c660b">

- Open the BepInEx.cfg file inside the config folder to modify some settings.
```
[Chainloader]
  HideManagerGameObject = true
[Logging.Console]
  Enabled = true
[Preloader.Entrypoint]
  Type = Camera
```

### Verifying Nine Chronicles Operation
- After modifying the BepInEx settings, confirm that the Nine Chronicles player operates correctly.
- Notice the difference with the BepInEx log terminal opening.
- Close the Nine Chronicles player after confirmation.

### Developing Mods
**Create a New dotnet Project**
- Target Framework: .NET Standard 2.1
- Lang Version: 9.0

**Add Basic Dependencies**

Location e.g., `C:\Users{username}\Roaming\Nine Chronicles\player\main\NineChronicles_Data\Managed\`
- UnityEngine.CoreModule.dll
- UnityEngine.dll
- Lib9c.dll
- Nekoyume.dll

Location e.g., `C:\Users{username}\Roaming\Nine Chronicles\player\main\BepInEx\core\`
- 0Harmony.dll
- BepInEx.dll
  
**Create a Plugin**

To implement an example plugin, add additional dependencies

You can check example code here [https://github.com/planetarium/NineChronicles.Mods/tree/sample-dotnet-code/Sample]

Location e.g., `C:\Users{username}\Roaming\Nine Chronicles\player\main\NineChronicles_Data\Managed\`
- UnityEngine.InputLegacyModule.dll

e.g., TestModPlugin.cs

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

e.g., NotifyKeyboardInput.cs

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

### Applying Mods
Build the Plugin
e.g., TestMod.dll

Copy the mod dll file to the Nine Chronicles player
e.g., `C:\Users{username}\Roaming\Nine Chronicles\player\main\BepInEx\plugins\`

### Verifying Mod Operation
After applying the mod dll file, check if the Nine Chronicles player operates normally.

Confirm the mod is loaded properly in the BepInEx log terminal.

- Loading [Test Mod 0.1.0]
- Test Mod is loaded!
<img width="500" alt="Untitled (3)" src="https://github.com/Atralupus/NineChronicles.Mods/assets/30599098/fc0419d0-1ef9-468a-a7b5-ffec65240ddc">

- Verify the mod operates as expected.

e.g., Pressing the space key triggers the 9c-unity NotificationSystem.Push() function.
<img width="419" alt="Untitled (4)" src="https://github.com/Atralupus/NineChronicles.Mods/assets/30599098/a64fc4e4-ba85-483d-90df-24557b741955">

Close the Nine Chronicles player after confirmation.
