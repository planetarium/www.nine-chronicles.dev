# Mimir를 활용한 서드파티 웹사이트 제작 튜토리얼 

나인크로니클의 최신 상태를 GraphQL로 쉽게 조회해볼 수 있는 서비스인 [Mimir](../../guide/get-state/get-state-with-mimir-graphql)를 통해 간단하게 아레나 랭킹 보드를 만들어보는 튜토리얼 입니다.

# 프로젝트 세팅

프로젝트는 빠르게 프론트를 만들어볼 수 있는 [React](https://react.dev/)와 [TypeScript](https://www.typescriptlang.org/)를 사용합니다.

```sh
npx create-react-app my-app --template typescript
```
먼저 [Create React APP](https://create-react-app.dev/)을 통해 기본적인 프로젝트 설정들을 받아온 후 실행해봅니다.

```sh
npm run start
```

실행이 정상적으로 되었다면 준비는 끝입니다!

## Graphql Client

Mimir를 사용하기 위해선 요청을 위한 Client가 필요합니다. 이 Client는 GraphQL Schema를 받아 자동으로 생성할 수 있습니다.

```sh
npm i @apollo/client graphql graphql-request@^6.1.0 graphql-tag @graphql-codegen/typescript @graphql-codegen/typescript-graphql-request @graphql-codegen/cli @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/typescript-resolvers
```

명령어를 통해 필요한 라이브러리들을 다운받습니다.

이제 스키마 파일이 필요합니다. 스키마 파일은 Mimir에 접속해 `Schema Definition` 을 누르면 우측 버튼을 통해 다운받을 수 있으며 `package.json` 과 같은 폴더에 위치시켜줍니다.

```yaml
overwrite: true
schema: ./schema.graphql
documents: ./api.graphql
generates:
  src/generated/graphql.tsx:
    plugins:
      - typescript
      - typescript-operations
      - typescript-resolvers
      - typescript-react-apollo
    config:
      reactApolloVersion: 3
      withComponent: false
      withHOC: false
      scalars:
        Long: number
        TxId: string
  src/generated/graphql-request.ts:
    plugins:
    - typescript
    - typescript-operations
    - typescript-graphql-request
```

graphql codegen을 하기 위해선 몇가지 설정이 필요합니다. 위 설정을 동일한 경로에 `codegen.yaml` 이름으로 생성해줍니다.

```graphql
query GetArenaLeaderBoard {
  arena {
    leaderboard(ranking: 1, length: 10) {
      arenaAddress
      avatarAddress
      cp
      lose
      purchasedTicketCount
      rank
      score
      ticket
      ticketResetCount
      win
    }
  }
}
```

이제 생성에 사용할 실제 쿼리를 작성해줘야합니다. 아레나 랭킹을 표시해주기 위해 아레나 랭킹을 쿼리해올 쿼리를 위와 같이 작성해 `api.graphql` 파일을 생성해줍니다.

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "codegen": "graphql-codegen"
  },
```

마지막으로 Client를 생성할 시간입니다. 생성을 쉽게 하기 위해 `package.json`에 codegen 스크립트를 추가한 이후 `npm run codegen`을 통해 client를 생성합니다.

## Board 만들기

이제부턴 본격적으로 데이터를 gql에서 받아와 사용할 겁니다.

```ts
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: "https://mimir.nine-chronicles.dev/odin/graphql",
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
		<ApolloProvider client={client}>
            <App />
		</ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

생성한 Client를 사용하기 위해 `ApolloProvider` 에 url 과 함께 client를 `index.tsx`에 추가해 전역에 설정해줍니다.

```ts
import { useGetArenaLeaderBoardQuery } from "./generated/graphql";

function App() {
  const { loading, data } = useGetArenaLeaderBoardQuery();

  return (
      <div className="App">
        <header className="App-header">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Arena Address</th>
                  <th>Avatar Address</th>
                  <th>CP</th>
                  <th>Lose</th>
                  <th>Purchased Ticket Count</th>
                  <th>Score</th>
                  <th>Ticket</th>
                  <th>Ticket Reset Count</th>
                  <th>Win</th>
                </tr>
              </thead>
              <tbody>
                {data?.arena?.leaderboard?.map((player, index) => (
                  <tr key={index}>
                    <td>{player?.rank}</td>
                    <td>{player?.arenaAddress}</td>
                    <td>{player?.avatarAddress}</td>
                    <td>{player?.cp ?? 'N/A'}</td>
                    <td>{player?.lose}</td>
                    <td>{player?.purchasedTicketCount}</td>
                    <td>{player?.score}</td>
                    <td>{player?.ticket}</td>
                    <td>{player?.ticketResetCount}</td>
                    <td>{player?.win}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </header>
      </div>
  );
}

export default App;
```

데이터를 받아 Table에 그려 데이터를 확인해보기 위해 `App.tsx`를 수정해 확인해봅니다.

![alt text](/arena-result.png)

## 페이지네이션

위에서 저희는 `api.graphql` 를 생성할 때 length를 고정해서 받아왔습니다. 이제 동적으로 값을 넣어주기 위해 해당 값을 수정해 페이지 네이션을 구현할겁니다.

## 스타일

데이터를 받아와 그려주는건 완성되었습니다. 이제 좀 더 가독성있게 보기 위해 CSS Theme를 하나 가져와 입혀줄겁니다.

## 완성

