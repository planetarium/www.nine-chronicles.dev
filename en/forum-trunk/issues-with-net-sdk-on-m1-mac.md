## Issues

Problem occurs when running the project `NineChronicles.Headless.Executable` in `Debug` mode in `Rider`.

Only the execution command is printed on the console of `Rider` and no initialization log is recorded at all.

I guess there is a problem with the .NET SDK.

> This article was written with reference to [this][ref-01].

[ref-01]: https://rider-support.jetbrains.com/hc/en-us/articles/4413459013010--NET-6-and-M1-problems-when-other-SDKs-are-present-in-the-system

## .NET SDK path on M1 Mac

| architecture | path |
| --- | --- |
| arm64(m1) | /usr/local/share/dotnet/sdk/{version}/ |
| x64 | /usr/local/share/dotnet/x64/sdk/{version}/ |

## Rider configuration

Change the .NET CLI path.

- Menu: `Rider > Preferences > Build, Execution, Deployment > Toolset and Build > Toolset > .NET CLI executable path`

- default: `~/.dotnet/dotnet`

- change: `/usr/local/share/dotnet/x64/dotnet`

## Closing

Locally, many versions of dotnet SDK were installed for each architecture, and in this article, I confirmed that it was successful using `x64 version 6.0.401`.

And unfortunately, it definitely slows down the .NET process in Rider.
