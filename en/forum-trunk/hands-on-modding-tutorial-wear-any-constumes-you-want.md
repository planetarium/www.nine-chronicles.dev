> 💡 This article was written based on Nine Chronicles version v100290[^v100290].

> 💡 This article assumes that you refer to [this][./playing-the-nine-chronicles-main-network-with-the-unity-editor] and play in the Unity editor.

![alt text](/images/en/forum-trunk/hands-on-modding-tutorial-wear-any-constumes-you-want/image.png)

In the above image, you can see my character is wearing a full costume without any equipped costume item.

Weird, right? Well, you can try out this too by modding a few pieces in the game source code. Let's try it out!

> 💡 This trick only works within your client or Unity editor only. Others won't be able to see your costume character.

## Where are the graphic resources for the character?

You can find Unity prefabs that contains spine resource in several paths.

- Armor prefabs: /nekoyume/Assets/Resources/Character/Player/{armor-id}

   {armor-id}: ID of a armor defined in `EquipmentItemSheet.csv`.

- Full costume prefabs: /nekoyume/Assets/Resources/Character/FullCostume/{costume-id}

   {costume-id}: ID of a costume defined in `CostumeItemSheet.csv`.

## Change the visual of my character

1. Select your armor ID or full costume ID.

   If you already equipped any of the full costume, you can replace that to other full costume.

   Or if not, you can replace the armor.

2. Find the same prefab with the ID you checked in step 1 and back it up.

   For example, if you select an armor with ID `10211000`, temporarily rename it to `10211000_` like below.

   ```text
   /nekoyume/Assets/Resources/Character/Player/10211000
   ->
   /nekoyume/Assets/Resources/Character/Player/10211000_
   ```

   For example, if you select a full costume with ID `40100000`, temporarily rename it to `40100000_` like below.

   ```text
   /nekoyume/Assets/Resources/Character/FullCostume/40100000
   ->
   /nekoyume/Assets/Resources/Character/FullCostume/40100000_
   ```

3. Copy the full costume prefab you want to use to the same path with the original name of the prefab you backed up in step 2.

   For example, If you want change character to a full costume with ID `40100003`, copy this to original path. Using the example above, the original path would be `/nekoyume/Assets/Resources/Character/Player/10211000` or `/nekoyume/Assets/Resources/Character/FullCostume/40100000`.

4. Run the game!

   If you following the example above, your character would look like below.

   ![alt text](/images/en/forum-trunk/hands-on-modding-tutorial-wear-any-constumes-you-want/image-1.png)

## Yeah, there are some problems, but it's a great start

There are some differences in the armor or full costume equipping logic in the codebase. So the result of this trick has some weird visuals.🤪

Have fun, modders!🤟

---

[^v100290]: [lib9c:v100290][lib9c-v100290], [NineChronicles:v100290][9c-unity-v100290]

[lib9c-v100290]: https://www.github.com/planetarium/lib9c/tree/v100290
[9c-unity-v100290]: https://www.github.com/planetarium/NineChronicles/tree/v100290
