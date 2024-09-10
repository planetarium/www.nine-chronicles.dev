import { DefaultTheme, defineConfig } from 'vitepress'

export const ko = defineConfig({
  lang: 'ko-KR',
  title: '개발자 포탈',
  description: '나인크로니클 에코시스템 개발자를 위한 사이트',

  themeConfig: {
    outline: 'deep',
    nav: nav(),

    sidebar: {
      '/ko/introduce/': { base: '/ko/', items: sidebarGeneral() },
      '/ko/general/': { base: '/ko/', items: sidebarGeneral() },
      '/ko/network/': { base: '/ko/', items: sidebarNetwork() },
      '/ko/modding/': { base: '/ko/', items: sidebarModding() },
      '/ko/contributing/': { base: '/ko/', items: sidebarContributing() },
    },

    editLink: {
      pattern: 'https://github.com/planetarium/www.nine-chronicles.dev/edit/main/:path',
      text: '이 페이지 편집 제안하기'
    },
  }
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '일반',
      link: '/ko/general/what-is-nine-chronicles',
      activeMatch: '/ko/general/'
    },
    {
      text: '네트워크',
      link: '/ko/network/local-network-tutorial/getting-started',
      activeMatch: '/ko/network/'
    },
    {
      text: '모딩',
      link: '/ko/modding/getting-started',
      activeMatch: '/ko/modding/'
    },
    {
      text: '기여',
      link: '/ko/contributing/getting-started',
      activeMatch: '/ko/contributing/'
    },
    {
      text: '포럼 트렁크',
      link: '/forum-trunk/0-what-is-forum-trunk',
      activeMatch: '/forum-trunk/'
    }
  ];
}

function sidebarGeneral(): DefaultTheme.SidebarItem[] {
  return [
    { text: '나인크로니클은 무엇인가?', link: 'general/what-is-nine-chronicles' },
    { text: '네트워크', link: 'general/networks' },
    { text: '멀티플라네타리', link: 'general/multiplanetary' },
    { text: '개발자 생태계', link: 'general/developer-ecosystem' },
    {
      text: '크로노',
      collapsed: false,
      items: [
        { text: '사용법', link: 'general/chrono/how-to-use-chrono' }
      ]
    },
    {
      text: '상태 조회하기',
      collapsed: false,
      items: [
        { text: 'GraphQL(Headless)', link: 'general/get-state/get-state-with-headless-graphql' },
        { text: 'GraphQL(Mimir)', link: 'general/get-state/get-state-with-mimir-graphql' },
      ]
    },
  ];
}

function sidebarNetwork(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '네트워크 실행하기',
      collapsed: false,
      items: [
        { text: '시작하기', link: 'network/local-network-tutorial/getting-started' },
        { text: '블록체인 노드 실행하기', link: 'network/local-network-tutorial/running-node-with-executor.md' },
        { text: '상태 조회하기', link: 'network/local-network-tutorial/get-state-with-headless-graphql.md' },
        { text: '개인 키 만들기', link: 'network/local-network-tutorial/create-a-private-key' },
        { text: '제네시스 블록 만들기', link: 'network/local-network-tutorial/create-a-genesis-block' },
        { text: '자신의 key로 노드 실행하기', link: 'network/local-network-tutorial/running-node-with-own-private-key.md' },
        { text: '로컬 네트워크로 client 실행하기', link: 'network/local-network-tutorial/run-client-with-local-node' },
        { text: '트랜잭션 발행하기', link: 'network/local-network-tutorial/issue-transaction-with-chrono' }
      ]
    },
    // {
    //   text: '메인넷 참여하기',
    //   collapsed: false,
    //   items: [
    //     { text: '나인크로니클 플레이', link: 'guide/join-mainnet/play-nc' },
    //     { text: '블록체인 노드 운영', link: 'guide/join-mainnet/operating-a-blockchain-node' },
    //     { text: '모딩', link: 'guide/join-mainnet/modding' },
    //   ]
    // },
  ];
}

function sidebarModding(): DefaultTheme.SidebarItem[] {
  return [
    { text: '시작하기', link: 'modding/getting-started' },
    {
      text: '튜토리얼',
      collapsed: false,
      items: [
        { text: '아바타 정보 웹사이트', link: 'modding/guide/avatar-information-dapp-guide' },
        { text: '데일리 리워드 웹사이트', link: 'modding/guide/daily-reward-dapp' },
        { text: 'Bepinex를 활용한 클라이언트 모딩', link: 'modding/guide/bepinex-guide' },
      ]
    },
    {
      text: '시스템 가이드',
      collapsed: false,
      items: [
        { text: '주소와 상태', link: 'modding/system-guide/0-address-and-state' },
        { text: '트랜젝션과 액션', link: 'modding/system-guide/1-transaction-and-action' },
        {
          text: '에이전트',
          link: 'modding/system-guide/agent/0-agent',
          // collapsed: false,
          // items: [
          //   { text: '서약', link: 'modding/system-guide/agent/pledge' },
          //   { text: '스테이킹', link: 'modding/system-guide/agent/staking' },
          // ]
        },
        {
          text: '아바타',
          link: 'modding/system-guide/avatar/0-avatar',
          collapsed: false,
          items: [
            { text: '인벤토리', link: 'modding/system-guide/avatar/inventory' },
            { text: 'WorldInformation', link: 'modding/system-guide/avatar/world-information' },
            { text: 'QuestList', link: 'modding/system-guide/avatar/quest-list' },
          ]
        },
        { text: '모험', link: 'modding/system-guide/adventure' },
        { text: '아레나', link: 'modding/system-guide/arena' },
      ]
    },
  ];
}

function sidebarContributing(): DefaultTheme.SidebarItem[] {
  return [
    { text: '시작하기', link: 'contributing/getting-started' },
    { text: '저장소 목록', link: 'contributing/repositories' },
  ];
}
