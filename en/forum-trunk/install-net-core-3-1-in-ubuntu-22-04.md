# 1. Summary

From ubuntu 22.04 LTS, .NET Core 3.1 is not officially supported[^1]. So you cannot install .NET Core 3.1 with convenient apt command.
Libplanet's some features still needs .NET Core 3.1 so you would fail to build and run Libplanet or even NIne Chronicles.
In this article, I'll introduce how to tweak this problem.

# 2. How to

## 2.1. Find .NET 6 SDK location

First, find the location of .NET SDK 6, the official supported version.

```shell
$ dotnet --list-sdks
6.0.400 [/usr/share/dotnet/sdk]  # The location would be different. Check your location
```

If you doesn't have .NET SDK 6, install it first following [MS Docs](https://docs.microsoft.com/en-us/dotnet/core/install/linux-ubuntu).

## 2.2. Downlaod .NET Core 3.1 SDK

Visit [download page](https://dotnet.microsoft.com/en-us/download/dotnet/3.1) and download .NET Core 3.1 SDK in binary form for your system arch.

![alt text](/images/en/forum-trunk/install-net-core-3-1-in-ubuntu-22-04/image.png)

After download, extract it to any place to easy to access such as home directory.

## 2.3. Move .NET Core 3.1 to target location

The basic target location to put .NET Core 3.1 is that we've already found using `dotnet --list-sdks`. In my case, `/usr/share/dotnet/sdk` is it.
You can install(?) .NET Core 3.1 by just moving extracted files.

```shell
sudo mv ~/dontet-3.1.422 /usr/share/dontet/sdk/3.1.422  # The version would be diffrent. Use your version.
```

## 2.4. Test dotnet catches new SDK

Just re-run sdk list command

```shell
dotnet --list-sdks
3.1.422 [/usr/share/dotnet/sdk]
6.0.400 [/usr/share/dotnet/sdk]
```

That's it!

# 3. Colnclusion

At this moment, Libplanet still uses old .NET Core 3.1 so you should do this tweak to build and run.
But .NET Core 3.1 support will be ended in this December[^2], so we're working on it. ([GitHub Issue](https://github.com/planetarium/libplanet/issues/1931))

[^1]: https://docs.microsoft.com/en-us/dotnet/core/install/linux-ubuntu
[^2]: https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core
