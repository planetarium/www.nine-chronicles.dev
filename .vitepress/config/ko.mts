import { defineConfig } from 'vitepress'

export const ko = defineConfig({
    title: '나인크로니클 개발자 포탈',
    description: '나인크로니클 에코시스템 개발자를 위한 사이트',
    lang: 'ko-KR',
    themeConfig: {
      outline: 'deep',
      nav: [
        { text: '홈', link: '/ko' },
        { text: '예제', link: '/ko/examples' }
      ],
  
      sidebar: [
        {
          text: '둘러보기', link: '/ko/overview'
        },
        {
          text: '소개',
          link: '/ko/introduce/nine-chronicles',
          collapsed: false,
          items: [
            { text: '나인크로니클은 무엇인가?', link: '/ko/introduce/nine-chronicles' },
            { text: '네트워크', link: '/ko/introduce/networks' },
            { text: '멀티플라네타리', link: '/ko/introduce/multiplanetary' },
            { text: '개발자 생태계', link: '/ko/introduce/developer-ecosystem' },
          ]
        },
        {
          text: '메인넷 참여하기',
          link: '/ko/guide/mainnet/join-mainnet',
          collapsed: false,
          items: [
            { text: '나인크로니클 플레이', link: '/ko/guide/mainnet/play-nc' },
            { text: '노드 운영', link: '/ko/guide/mainnet/node-operations' },
            { text: '모딩', link: '/ko/guide/mainnet/modding' },
          ]
        },
        {
          text: '네트워크 만들기',
          link: '/ko/guide/create-network/getting-started',
          collapsed: false,
          items: [
            { text: '시작하기', link: '/ko/guide/create-network/getting-started' },
            { text: '비밀키 만들기', link: '/ko/guide/create-network/create-private-key' },
            { text: '제네시스 블록 만들기', link: '/ko/guide/create-network/create-genesis-block' },
            {
              text: '노드 실행하기',
              link: '/ko/guide/create-network/run-node',
              items: [
                { text: '.NET 프로젝트', link: '/ko/guide/create-network/run-node-with-dotnet-project' },
                { text: 'Docker', link: '/ko/guide/create-network/run-node-with-docker' }
              ]
            },
            {
              text: '상태 조회하기',
              link: '/ko/guide/create-network/get-state',
              items: [
                { text: 'GraphQL(Headless)', link: '/ko/guide/create-network/get-state-with-headless-graphql' },
                { text: 'GraphQL(Mimir)', link: '/ko/guide/create-network/get-state-with-mimir-graphql' }
              ]
            },
            {
              text: '트랜젝션 발행하기',
              link: '/ko/guide/create-network/issue-transaction',
              items: [
                { text: '크로노', link: '/ko/guide/create-network/issue-transaction-with-chrono' }
              ]
            },
          ]
        },
        {
          text: '예재',
          link: '/ko/examples/getting-started',
          collapsed: false,
          items: [
            { text: 'NCG 송금(크로노)', link: '/ko/examples/transfer/chrono' }
          ]
        },
      ],
  
      socialLinks: [
        { icon: 'github', link: 'https://github.com/planetarium/www.nine-chronicles.dev' }
      ]
    }
});
