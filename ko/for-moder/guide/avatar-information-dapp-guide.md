# 아바타 정보 페이지 제작 튜토리얼 
나인크로니클의 최신 상태를 GraphQL로 쉽게 조회해볼 수 있는 서비스인 [Mimir](../../guide/get-state/get-state-with-mimir-graphql)를 통해 간단하게 아바타 정보를 받아와 보드를 만들어보는 튜토리얼 입니다.

# 프로젝트 세팅
프로젝트는 빠르게 프론트를 만들어볼 수 있는 [React](https://react.dev/)와 [TypeScript](https://www.typescriptlang.org/)를 사용합니다.

```sh
npx create-react-app some-app-name --template @planetarium/9c-mimir-gql
```
먼저 [Create React APP](https://create-react-app.dev/)을 통해 기본적인 프로젝트 설정들을 받아온 후 실행해봅니다.

```sh
cd some-app-name
npm run codegen
npm run start
```

실행이 정상적으로 되었다면 준비는 끝입니다!

## 쿼리 수정
create-react-app을 통해 템플릿을 다운받았기 때문에 Mimir GQL을 사용하기 위한 대부분의 세팅이 되어있는 상태입니다.

GQL에서 불러오는 쿼리를 수정하고 싶다면 `src/graphql/api.graphql` 파일을 수정하면 됩니다. 아바타와 관련된 더 많은 정보를 불러보기 위해 inventory에 장비 목록을 불러오도록 아래와 같이 쿼리를 수정해봅니다.

```graphql
query GetAvatarInformation($avatarAddress: Address!) {
  avatar(address: $avatarAddress) {
    address
    name
    level
    inventory {
      equipments {
        count
        elementalType
        exp
        grade
        itemSheetId
        itemSubType
        itemType
        level
        mainStatType
      }
    }
  }
}
```

수정을 했다면 쿼리를 요청할 Client에 변경사항을 적용해줘야합니다. `graphql-codegen` 라이브러리를 통해 자동으로 생성될 수 있도록 세팅이 되어있으므로 codegen 명령어를 통해 생성할 수 있습니다.
```sh
npm run codegen
```

## App.tsx 수정
쿼리와 Client를 수정했으니 `src/App.tsx` 코드를 수정할 차례입니다.

아까 수정했던 쿼리인 `GetAvatarInformation`를 `useGetAvatarInformationQuery` 함수를 통해 실제로 요청을 하고 있습니다. 아까 Client를 업데이트 했으므로 해당 함수Response에 inventory 관련 정보들이 생겨있으니 해당 정보를 List로 표현합니다.
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
                <h2>Equipment List</h2>
                // 장비 목록을 불러옵니다.
                <ul>
                  {data.avatar.inventory?.equipments?.map((equipment, index) => (
                    <li key={index} className="equipment-item">
                      <p>Item SubType: {equipment.itemSubType}</p>
                      <p>Elemental Type: {equipment.elementalType}</p>
                      <p>Grade: {equipment.grade}</p>
                      <p>Level: {equipment.level}</p>
                      <p>Count: {equipment.count}</p>
                    </li>
                  ))}
                </ul>
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

`App.css` 파일 맨 끝에도 추가된 `equipment-item` class에 대한 style을 추가해줍니다.
```css
ul {
    list-style-type: none;
    padding: 0;
}

.equipment-item {
    background-color: #e2e8f0;
    border-radius: 4px;
    padding: 10px;
    margin: 10px 0;
}
```

## 완성
모든 수정이 끝났습니다. 이제 다시 서버를 틀고 아바타 주소를 입력해 확인해봅니다.
```sh
npm run start
```

아바타 주소는 [9cscan](https://9cscan.com/)에서 확인이 가능하며 예시 아바타 주소는 "0x2E2dDdf0adC57b3C88E3ce3dBf2d3Eb5b9C41227"가 있습니다.
모든 내용은 [9c-examples](https://github.com/planetarium/9c-examples/tree/main/avatar-information) 레포에 있으니 참고 바랍니다.
Mimir GQL에는 9c에 관련된 정보를 쿼리해볼 수 있는 많은 type들이 존재하니 활용하여 여러분만의 어플을 만들어보세요!

![alt text](/make-avatar-information-website-result.png)
