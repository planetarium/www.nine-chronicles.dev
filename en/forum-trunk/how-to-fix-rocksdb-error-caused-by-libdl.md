# 1. Symptom

When running test of [NineChronicles.Headless](https://github.com/planetarium/NineChronicles.Headless) on linux system, your test could fail with following error:

```
Unable to locate rocksdb native library, either install it, or use RocksDbNative nuget package
```

You will meet this error even if you installed all required NuGet packages like `Planetarium.RocksDbSharp`.

For digging this error, the reason of failure is `libdl` loading issue.

```
Unable to load shared library 'libdl' or one of its dependencies. In order to help diagnose loading problems, consider setting the LD_DEBUG environment variable: liblibdl: cannot open shared object file: No such file or directory
```

# 2. Reason

This is about libc version issue. From libc version 2.34, `libdl` is part of `libc` library.[^1]

> ...all functionality formerly implemented in the libraries libpthread, libdl, libutil, libanl has been integrated into libc. New applications do not need to link with -lpthread, -ldl, -lutil, -lanl anymore. For backwards compatibility, empty static archives libpthread.a, libdl.a, libutil.a, libanl.a are provided, so that the linker options keep working. Applications which have been linked against glibc 2.33 or earlier continue to load the corresponding shared objects (which are now empty).

But RocksDB(more specific, RocksDB C# binding) does not catch up this change and loads libdl in old way. I think they're trying to resolve this[^2] but not merged yet.

# 3. Solution

I think this is tweak not a solution, but this simple command can solve the problem anyway.

```shell
$ whereis libdl.so.2
libdl.so.2: /usr/lib/libdl.so.2
$ sudo ln -s /usr/lib/libdl.so.2 /usr/lib/libdl.so
```

Try running tests again. Now your tests will pass.

---

References
- StackExchange : [Unable to load shared library 'libdl.so' or one of its dependencies](https://unix.stackexchange.com/questions/700097/unable-to-load-shared-library-libdl-so-or-one-of-its-dependencies)

[^1]: https://sourceware.org/pipermail/libc-alpha/2021-August/129718.html
[^2]: https://github.com/curiosity-ai/rocksdb-sharp/issues/26
