# GraphQL(Mimir)

Mimir는 나인크로니클의 최신 상태를 GraphQL을 통해 쉽게 조회할 수 있는 서비스입니다.
각 네트워크마다 서비스가 따로 제공되며 Odin, Heimdall의 경로는 아래와 같습니다.

- [Mimir Odin](https://mimir.nine-chronicles.dev/odin/graphql/) 
- [Mimir Heimdall](https://mimir.nine-chronicles.dev/odin/graphql/)

## 상태 조회

Mimir에 접속하면 Playground가 제공되며 쉽게 쿼리를 제작할 수 있습니다.  
Create Document -> Builder + 버튼 클릭 -> New Query -> Query 이름 입력 -> 이후 체크박스 클릭으로 쿼리 제작
![alt text](/graphql-mimir-sample.png)

```gql
query GetArenaSheet {
  sheet(sheetName: "ArenaSheet") {
    name
    csv
  }
}
```

자세한 사용법은 [링크](https://chillicream.com/docs/bananacakepop/v2/explore-the-ui)를 확인해주세요.
