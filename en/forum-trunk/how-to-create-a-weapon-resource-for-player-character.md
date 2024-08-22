The character of NineChronicles(i.e., 9c) was made with [Spine][spine-link]. This article will guide you through crafting a character's weapon.

[spine-link]: http://esotericsoftware.com

## Weapon?

A player character has a weapon like below.
![alt text](/images/en/forum-trunk/how-to-create-a-weapon-resource-for-player-character/image.png)

## Principles

Before going into details, let me show you the principles first.

### 1. Face to the right.

According to how the script switches the weapon, the weapon's texture should face to the right.

### 2. Remove empty area as transparent.

### 3. Resize as makes sense.

The range of already included textures size is:
- width: 138px ~ 266px
- height: 26px ~ 92px

So you can ref above size.

### 4. Place to right path.

The textures of weapon is stored in specific path.[^1] You can find it in Unity editor like below.
![Underline the path in Unity editor](/images/en/forum-trunk/how-to-create-a-weapon-resource-for-player-character/image-1.png)

### 5. Edit sprite settings.

Set the pivot point as you want to attach it to the player character's hand. You can drag and drop the blue circle pivot point gizmo or modify the "Custom Pivot" values.
![Point the pivot position and underline the pivot values](/images/en/forum-trunk/how-to-create-a-weapon-resource-for-player-character/image-2.png)

Make the texture readable.
![alt text](/images/en/forum-trunk/how-to-create-a-weapon-resource-for-player-character/image-3.png)

## Prepare a weapon texture

I prepared one.[^2] The size of this texture is (293px, 116px).
![hammer-25](/images/en/forum-trunk/how-to-create-a-weapon-resource-for-player-character/image-4.png)

I imported this texture to the path[^1] and naming as `10110001`.
![alt text](/images/en/forum-trunk/how-to-create-a-weapon-resource-for-player-character/image-5.png)

And then I modify the texture's pivot point like below.
![alt text](/images/en/forum-trunk/how-to-create-a-weapon-resource-for-player-character/image-6.png)

## Use the new weapon in play

There are several ways to use the new weapon textures in play. I introduce a two ways in here.

### 1. Replace texture already included to new texture

1. Specify the texture to replace.
   - In here, I select `10110000`.
![alt text](/images/en/forum-trunk/how-to-create-a-weapon-resource-for-player-character/image-7.png)

2. Reveal that texture file in the file explorer. And replace it with new texture.
   - I replace `10110000` with `10110001` which is imported above.
![alt text](/images/en/forum-trunk/how-to-create-a-weapon-resource-for-player-character/image-8.png)
![alt text](/images/en/forum-trunk/how-to-create-a-weapon-resource-for-player-character/image-9.png)
![alt text](/images/en/forum-trunk/how-to-create-a-weapon-resource-for-player-character/image-10.png)

3. Equip a replaced weapon item in inventory.
   - I equipped `10110000` item and my character to be hammer man!
![alt text](/images/en/forum-trunk/how-to-create-a-weapon-resource-for-player-character/image-11.png)

### 2. Fix the sprite getter method

There is the SpriteHelper and this class has `GetPlayerSpineTextureWeapon()` method like below.

```cs
public static Sprite GetPlayerSpineTextureWeapon(int equipmentId)
{
    return Resources.Load<Sprite>(string.Format(PlayerSpineTextureWeaponPathFormat, equipmentId)) ??
           Resources.Load<Sprite>(string.Format(PlayerSpineTextureWeaponPathFormat, GameConfig.DefaultAvatarWeaponId));
}
```

And you can fix this method like below. This method change the equipment Id to `10110001` if the Id equals to `10110000`. We can write any conditions and logics freely in here.

```cs
public static Sprite GetPlayerSpineTextureWeapon(int equipmentId)
{
    if (equipmentId == 10110000)
    {
        equipmentId = 10110001;
    }

    return Resources.Load<Sprite>(string.Format(PlayerSpineTextureWeaponPathFormat, equipmentId)) ??
           Resources.Load<Sprite>(string.Format(PlayerSpineTextureWeaponPathFormat, GameConfig.DefaultAvatarWeaponId));
}
```

Additionally, if you want to separately run the logic to swap weapons at a specific timing, see the code snippet below.

```cs
void SetWeapon(int weaponId)
{
    var sprite = SpriteHelper.GetPlayerSpineTextureWeapon(weaponId);
    var stage = Game.Game.instance.Stage;
    var player = stage.GetPlayer();
    player.SpineController.UpdateWeapon(weaponId, sprite);
}
```

[sprite-helper-link]: https://github.com/planetarium/NineChronicles/blob/main/nekoyume/Assets/_Scripts/Helper/SpriteHelper.cs

### 3. Add new item which use a new texture

I'm in progress to writing about this way.

[^1]: Texture path: `Assets/Resources/Character/PlayerSpineTexture/Weapon`
[^2]: Downloaded from https://opengameart.org/content/warhammer and edited as I needed.
