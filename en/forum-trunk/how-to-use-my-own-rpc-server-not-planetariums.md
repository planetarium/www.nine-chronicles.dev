This article explains how to setup Nine Chronicles to pointing your own RPC server, instead of Planetarium's.

# Requirements

- Windows 10 or above
  - I'll revise this doc when ready for other platform. :)
- Nine Chronicles (v100282 or above) 

# Steps

## Navigate to directory for user configuration
1. Open Explorer
![alt text](/images/en/forum-trunk/how-to-use-my-own-rpc-server-not-planetariums/image.png)

2. Type `%APPDATA%`
![alt text](/images/en/forum-trunk/how-to-use-my-own-rpc-server-not-planetariums/image-1.png)

## Create (or edit) user config
You need to create user configuration file here. (`config.json`) Here is an example for rpc server with below setting.

```json
{
	"RemoteNodeList": [
		"apn-2-nc-1.ninodes.com,80,31238"
	]
}
```

- `apn-2-nc-1.ninodes.com`: Host name of server
- `80`: HTTP port
  - launcher will use this port for GraphQL requests/response.
  - specified as `--graphql-port`
- `31238`: gRPC port
  - specified as `--rpc-listen-port`

if you already have `config.json` under `%APPDATA%\Nine Chronicles`, just open it and add `RemoteNodeList`.

## Check configuration

After configuration, you need to restart the launcher. you can check the rpc server your launcher connected on first screen.

![alt text](/images/en/forum-trunk/how-to-use-my-own-rpc-server-not-planetariums/image-2.png)
