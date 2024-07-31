I introduced how to play the Nine Chronicles using the Unity editor in [another article](./playing-the-nine-chronicles-main-network-with-the-unity-editor).
In this article, I would like to introduce a tip for playing by changing multiple keys.

## Which one will be selected on the Unity editor?

When you run the Nine Chronicle in the Unity editor, the address displayed in the login pop-up is the address of the first among the Protected Private Keys included in [Key Store](./about-the-key-store).

## My tip: How to change the selected one?

1. Among the multiple Protected Private Keys you have, leave one desired file in the Key Store path and back up the rest to another path.

2. Run Nine Chronicle with Unity editor.

## Related things

1. The above method also affects the launcher, which is the normal way we play Nine Chronicle. This is because the launcher uses the same key store path to draw a list of protected private keys.
2. I already developed a UI([screenshot](https://github.com/planetarium/gamejam-laylas-island#play-screenshots)) that allows you to select an address in the Unity editor in the in-house game jam, and I would appreciate it if you refer to this and send a PR to the Nine Chronicle repository.
