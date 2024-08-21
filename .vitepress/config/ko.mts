import { defineConfig } from 'vitepress'

export const ko = defineConfig({
  title: '나인크로니클 개발자 포탈',
  description: '나인크로니클 에코시스템 개발자를 위한 사이트',
  lang: 'ko-KR',
  themeConfig: {
    outline: 'deep',
    nav: [
      { text: '가이드', link: '/ko/introduce/what-is-nine-chronicles' },
      { text: '예제', link: '/ko/examples/getting-started' }
    ],

    sidebar: [
      {
        text: '소개',
        collapsed: false,
        items: [
          { text: '나인크로니클은 무엇인가?', link: '/ko/introduce/what-is-nine-chronicles' },
          { text: '네트워크', link: '/ko/introduce/networks' },
          { text: '멀티플라네타리', link: '/ko/introduce/multiplanetary' },
          { text: '개발자 생태계', link: '/ko/introduce/developer-ecosystem' },
        ]
      },
      {
        text: '모딩 가이드',
        collapsed: false,
        items: [
          { text: '시작하기', link: '/ko/for-modder/getting-started' },
          { text: '아바타 정보 웹사이트', link: '/ko/for-modder/guide/avatar-information-dapp-guide.md' },
          { text: '송금 웹사이트', link: '/ko/for-modder/guide/transfer-ncg-with-chrono.md' },
          { text: 'Bepinex를 활용한 클라이언트 모딩', link: '/ko/for-modder/guide/bepinex-guide.md' },
          {
            text: 'NineChronicles의 시스템 이해하기',
            items: [
              { text: 'TableSheet' },
              { text: 'Hit 계산 공식' },
            ]
          },
        ]
      },
      {
        text: '네트워크 만들기',
        collapsed: false,
        items: [
          { text: '시작하기', link: '/ko/guide/create-network/getting-started' },
          { text: '개인 키 만들기', link: '/ko/guide/create-network/create-a-private-key' },
          { text: '제네시스 블록 만들기', link: '/ko/guide/create-network/create-a-genesis-block' },
          {
            text: '블록체인 노드 실행하기',
            items: [
              { text: '.NET 프로젝트', link: '/ko/guide/create-network/running-a-blockchain-node-with-dotnet-project' },
              // { text: 'Docker' }
            ]
          },
        ]
      },
      {
        text: '상태 조회하기',
        collapsed: false,
        items: [
          { text: 'GraphQL(Headless)', link: '/ko/guide/get-state/get-state-with-headless-graphql' },
          // { text: 'GraphQL(Mimir)' },
        ]
      },
      {
        text: '트랜젝션 발행하기',
        collapsed: false,
        items: [
          { text: '크로노', link: '/ko/guide/issue-transaction/issue-transaction-with-chrono' }
        ]
      },
      {
        text: '메인넷 참여하기',
        collapsed: false,
        items: [
          { text: '나인크로니클 플레이', link: '/ko/guide/join-mainnet/play-nc' },
          { text: '블록체인 노드 운영', link: '/ko/guide/join-mainnet/operating-a-blockchain-node' },
          { text: '모딩', link: '/ko/guide/join-mainnet/modding' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/planetarium/www.nine-chronicles.dev' }
    ]
  }
});
