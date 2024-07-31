This is a non-exhaustive list of the file paths used on Nine Chronicles. Please consult the related documentation for its role and structure. The order doesn't signify the importance or the priority.

## Log files

|Path | Used for | Note|
|--- | --- | ---|
|`%appdata%\Nine Chronicles\logs\main.log` | Launcher | The main process log of the Launcher|
|`%appdata%\Nine Chronicles\logs\renderer.log` | Launcher | The UI process log of the Launcher|
|`%localappdata%\Unity\Editor\Editor.log` | Game (in dev) | The Game log, when launched from the editor|
|`%USERPROFILE%\AppData\LocalLow\Planetariumlabs\NineChronicles\Player.log` | Game | The log of the game itself.|
|`%localappdata%\Programs\Nine Chronicles\Logs\launcher.log` | Installer | |

## config.json

See also: [The Structure and Location of "config.json"](./the-structure-and-location-of-config-json)

| Configuration Type  | Path                                                    |
| ------------------- | ------------------------------------------------------- |
| Local Configuration | `%LOCALAPPDATA%\Programs\Nine Chronicles\resources\app` |
| User Configuration  | `%APPDATA%\Nine Chronicles\config.json`                 |

## Game Settings

|Platform | Path|
|--- | ---|
|Windows | `HKCU\Software\Planetariumlabs\NineChronicles` (Registry)|
|macOS | `~/Library/Preferences/com.Planetariumlabs.NineChronicles.plist`|
|Linux | `~/.config/unity3d/Planetariumlabs/NineChronicles`|

The format may vary depending on the platform you're using. Consult [`PlayerPrefs`](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html) documentation of Unity for details on the format.

## Keystore

See also: [About the Key Store](./about-the-key-store)

| Platform | Path |
| --- | --- |
| Windows | `%appdata%\planetarium\keystore` |
| macOS | `~/.config/planetarium/keystore` *or*<br />`~/Library/Application Support/planetarium/keystore` |
| Linux | `~/config/planetarium/keystore` |

## Blockchain Store

| Platform | Path |
| --- | --- |
| Windows | `%localappdata%\planetarium\` |
| macOS | `~/.local/share/planetarium` |
| Linux | |
