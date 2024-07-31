> 💡 This article was written based on Nine Chronicles version v100290[^v100290].

## Inventory

The inventory contains all items for each characters.

The current character's inventory can be obtained as follows.

```cs
var inventory = States.Instance.CurrentAvatarState.inventory;
```

And the inventory provides some properties.

```cs
// All items.
IReadOnlyList<Inventory.Item> items = inventory.Items;

// Each items.
IEnumerable<Consumable> consumables = inventory.Consumables;
IEnumerable<Costume> costumes = inventory.Costumes;
IEnumerable<Equipment> equipments = inventory.Equipments;
IEnumerable<Material> materials = inventory.Materials;
```

### Locked item?

There is the `bool Locked` property in `Inventory.Item`. And there is one case this property return `true`.

- When an item is registered for sale.

So you can select inventory items without locked items like below.

```cs
IEnumerable<Inventory.Item> unlockedInventoryItems =
    inventory.Items.Where(inventoryItem => !inventoryItem.Locked);
```

### Required block index?

`Inventory.Item` has `ItemBase Item` field and `ItemBase` can be casting to `ITradableItem` depending on the type.
And there is the `long RequiredBlockIndex` property in `ITradableItem`. And there are some cases this property updated.

- Item crafts.
- Item enhancement.

So you can select the remaining items from the inventory items except those for which `RequiredBlockIndex` is greater then current block index.

```cs
long currentBlockIndex = Game.Game.instance.Agent.BlockIndex;
IEnumerable<Inventory.Item> activeInventoryItems =
    inventory.Items
        .Select(inventoryItem =>
            (inventoryItem: inventoryItem, itemBase: inventoryItem.item))
        .Where(tuple =>
            tuple.itemBase is ITradableItem tradableItem &&
            tradableItem.RequiredBlockIndex <= currentBlockIndex)
        .Select(tuple => tuple.inventoryItem);
```

## Conclusion

When you retrieve or manipulate items in the game, you may get different values than expected. Whether the design of this is good or bad, I know it will take some learning.
This article was written in the hopes that it will be of some help to such difficulties.
We support your Nine Chronicle journey.💪

---

[^v100290]: [lib9c:v100290][lib9c-v100290], [NineChronicles:v100290][9c-unity-v100290]

[lib9c-v100290]: https://www.github.com/planetarium/lib9c/tree/v100290
[9c-unity-v100290]: https://www.github.com/planetarium/NineChronicles/tree/v100290
