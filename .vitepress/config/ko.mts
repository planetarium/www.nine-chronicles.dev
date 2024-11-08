import { DefaultTheme, defineConfig } from 'vitepress'

export const ko = defineConfig({
  lang: 'ko-KR',
  title: '개발자 포탈',
  description: '나인크로니클 에코시스템 개발자를 위한 사이트',

  themeConfig: {
    outline: 'deep',
    nav: nav(),

    sidebar: {
      '/ko/event/': { base: '/ko/', items: sidebarEvent() },
      '/ko/guide/': { base: '/ko/', items: sidebarGuide() },
      '/ko/tutorials/': { base: '/ko/', items: sidebarTutorials() },
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
      text: '이벤트',
      link: '/ko/event/2024modathon',
      activeMatch: '/ko/event/'
    },
    {
      text: '가이드',
      link: '/ko/guide/getting-started',
      activeMatch: '/ko/guide/'
    },
    {
      text: '튜토리얼',
      link: '/ko/tutorials/index',
      activeMatch: '/ko/tutorials/'
    }
  ];
}

function sidebarEvent(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '2024 모다톤',
      link: 'event/2024modathon',
      collapsed: false,
      items: [
        { text: '초보자 가이드', link: 'event/for-non-developer' },
        { text: '무기 제작자 가이드', link: 'event/for-weapon-crafter' },
      ]
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    { text: '시작하기', link: 'guide/getting-started' },
    {
      text: '모딩',
      collapsed: false,
      items: [
        { text: '모딩 시작하기', link: 'guide/modding/getting-started' },
        {
          text: '시스템 가이드',
          collapsed: true,
          items: [
            { text: '주소와 상태', link: 'guide/modding/system-guide/0-address-and-state' },
            { text: '트랜젝션과 액션', link: 'guide/modding/system-guide/1-transaction-and-action' },
            {
              text: '에이전트',
              link: 'guide/modding/system-guide/agent/0-agent',
            },
            {
              text: '아바타',
              link: 'guide/modding/system-guide/avatar/0-avatar',
              collapsed: true,
              items: [
                { text: '인벤토리', link: 'guide/modding/system-guide/avatar/inventory' },
                { text: 'WorldInformation', link: 'guide/modding/system-guide/avatar/world-information' },
                { text: 'QuestList', link: 'guide/modding/system-guide/avatar/quest-list' },
              ]
            },
            { text: '모험', link: 'guide/modding/system-guide/adventure' },
            { text: '아레나', link: 'guide/modding/system-guide/arena' },
          ]
        },
        { text: 'TypeScript 라이브러리', link: 'guide/modding/ts-libs' },
      ]
    },
    {
      text: '네트워크',
      collapsed: false,
      items: [
        { text: '네트워크 시작하기', link: 'guide/network/getting-started' },
      ]
    },
    {
      text: '오픈소스',
      collapsed: false,
      items: [
        { text: '오픈소스 기여 시작하기', link: 'guide/contributing/getting-started' },
        { text: '저장소 목록', link: 'guide/contributing/repositories' },
      ]
    },
    {
      text: '일반',
      collapsed: false,
      items: [
        { text: '멀티플라네타리', link: 'guide/general/multiplanetary' },
        { text: '크로노 사용법', link: 'guide/general/how-to-use-chrono' },
        {
          text: '상태 조회하기',
          collapsed: false,
          items: [
            { text: '헤드리스를 통해 상태 조회하기', link: 'guide/general/get-state/get-state-with-headless-graphql' },
            { text: 'Mimir를 통해 상태 조회하기', link: 'guide/general/get-state/get-state-with-mimir-graphql' },
          ]
        },
      ]
    },
  ];
}

function sidebarTutorials(): DefaultTheme.SidebarItem[] {
  return [
    { text: '탐색', link: 'tutorials/index' },
    {
      text: '모딩 튜토리얼',
      collapsed: false,
      items: [
        { text: '아바타 정보 웹사이트', link: 'tutorials/modding/avatar-information-dapp-guide' },
        { text: '데일리 리워드 웹사이트', link: 'tutorials/modding/daily-reward-dapp' },
        { text: 'Bepinex를 활용한 클라이언트 모딩', link: 'tutorials/modding/bepinex-guide' },
      ]
    },
    {
      text: '네트워크 실행하기',
      collapsed: false,
      items: [
        { text: '시작하기', link: 'tutorials/local-network-tutorial/getting-started' },
        { text: '블록체인 노드 실행하기', link: 'tutorials/local-network-tutorial/running-node-with-executor.md' },
        { text: '상태 조회하기', link: 'tutorials/local-network-tutorial/get-state-with-headless-graphql.md' },
        { text: '개인 키 만들기', link: 'tutorials/local-network-tutorial/create-a-private-key' },
        { text: '제네시스 블록 만들기', link: 'tutorials/local-network-tutorial/create-a-genesis-block' },
        { text: '자신의 key로 노드 실행하기', link: 'tutorials/local-network-tutorial/running-node-with-own-private-key.md' },
        { text: '로컬 네트워크로 client 실행하기', link: 'tutorials/local-network-tutorial/run-client-with-local-node' },
        { text: '트랜잭션 발행하기', link: 'tutorials/local-network-tutorial/issue-transaction-with-chrono' }
      ]
    },
  ];
}
