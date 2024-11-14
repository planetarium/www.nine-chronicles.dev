# Avatar Information Viewer Tutorial

This tutorial will show you how to easily fetch avatar information and create a board using [Mimir](../../guide/general/get-state/get-state-with-mimir-graphql.md), a service that allows you to easily query the latest state of Nine Chronicles with GraphQL.

# Project Setup

We will use [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/) to quickly create the front end of our project.

```sh
npx degit planetarium/template-9c-mimir some-app-name
```

First, let's set up a basic project configuration using [degit](https://www.npmjs.com/package/degit) and run it to make sure everything is working.

```sh
cd some-app-name
npm install
npm run codegen
npm run start
```

Once the initialization is confirmed to be successful, you're ready to proceed!

## Modify the QueryTemplate

Since you downloaded the template using degit, most settings required to use Mimir GQL are already configured.

If you want to modify the query fetched by GQL, you can edit the `src/graphql/api.graphql` file. To fetch more information related to the avatar, let's modify the query to include the action point as shown below.

```graphql
query GetAvatarInformation($avatarAddress: Address!) {
  avatar(address: $avatarAddress) {
    address
    name
    level
  }
  actionPoint(address: $avatarAddress)
}
```

Once modifications are made, the changes need to be applied to the Client that requests the query. This can be done automatically using the `graphql-codegen` library, which is already set up. You can generate the necessary code by running the codegen command.

```sh
npm run codegen
```

## Modify App.tsx

Now that we have updated the query and the client, it's time to modify the `src/App.tsx` code.

We will use the previously updated `GetAvatarInformation` query via the `useGetAvatarInformationQuery` function to make the actual request. Since we have updated the client, the response from this function will now include action point information, which we can display it.

```typescript
import { useState } from 'react';
import { useGetAvatarInformationQuery } from "./graphql/generated/graphql";
import './App.css';

function App() {
  const [avatarAddress, setAvatarAddress] = useState('');
  const [addressToFetch, setAddressToFetch] = useState('');

  const { loading, data } = useGetAvatarInformationQuery({
    variables: { avatarAddress: addressToFetch },
    skip: !addressToFetch
  });

  const handleFetch = () => {
    setAddressToFetch(avatarAddress);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="input-group">
          <input
            type="text"
            value={avatarAddress}
            onChange={(e) => setAvatarAddress(e.target.value)}
            placeholder="Enter avatar address"
          />
          <button onClick={handleFetch}>Fetch</button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {data && data.avatar ? (
              <>
                <p>Avatar Name: {data.avatar.name}</p>
                <p>Avatar Level: {data.avatar.level}</p>
                {/* Action Point Data */}
                <p>Action Point: {data.actionPoint}</p>
              </>
            ) : (
              <p>No data available</p>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
```

## Completion

All modifications are complete. Now, restart the server and enter an avatar address to check it out.

```sh
npm run start
```

You can find the avatar address on [9cscan](https://9cscan.com/), and an example of an avatar address is "0x2E2dDdf0adC57b3C88E3ce3dBf2d3Eb5b9C41227".
All contents are available in the [9c-examples](https://github.com/planetarium/9c-examples/tree/main/avatar-information) repository, so feel free to refer to it.
Mimir GQL has many types that allow you to query information related to 9c. Utilize them to create your own application!

![alt text](/make-avatar-information-website-result.png)
