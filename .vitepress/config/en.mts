import { DefaultTheme, defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  title: 'Developer Portal',
  description: 'Site for Nine Chronicles Ecosystem Developers.',

  themeConfig: {
    outline: 'deep',
    nav: nav(),

    sidebar: {
      '/event/': { base: '/', items: sidebarEvent() },
      '/guide/': { base: '/', items: sidebarGuide() },
      '/tutorials/': { base: '/', items: sidebarTutorials() },
    },

    editLink: {
      pattern: 'https://github.com/planetarium/www.nine-chronicles.dev/edit/main/:path',
      text: 'Edit this page on GitHub'
    },
  }
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Event',
      link: '/event/2024modathon',
      activeMatch: '/event/'
    },
    {
      text: 'Guide',
      link: '/guide/getting-started',
      activeMatch: '/guide/'
    },
    {
      text: 'Tutorials',
      link: '/tutorials/getting-started',
      activeMatch: '/tutorials/'
    },
  ];
}

function sidebarEvent(): DefaultTheme.SidebarItem[] {
  return [
    { text: '2024 Modathon', link: 'event/2024modathon' },
    { text: 'Non Developer Guide', link: 'event/for-non-developer' }
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Getting Started', link: 'guide/getting-started' },
    { text: 'What is Nine Chronicles?', link: 'guide/what-is-nine-chronicles' },
    { text: 'Networks', link: 'guide/networks' },
    { text: 'Multiplanetary', link: 'guide/multiplanetary' },
    { text: 'Developer Ecosystem', link: 'guide/developer-ecosystem' },
    {
      text: 'Chrono',
      collapsed: false,
      items: [
        { text: 'How to use', link: 'guide/chrono/how-to-use-chrono' }
      ]
    },
    {
      text: 'Get State',
      collapsed: false,
      items: [
        { text: 'GraphQL(Headless)', link: 'guide/get-state/get-state-with-headless-graphql' },
        { text: 'GraphQL(Mimir)', link: 'guide/get-state/get-state-with-mimir-graphql' },
      ]
    },
  ];
}

function sidebarNetwork(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Running the Network',
      collapsed: false,
      items: [
        { text: 'Getting Started', link: 'network/local-network-tutorial/getting-started' },
        { text: 'Running a Blockchain Node', link: 'network/local-network-tutorial/running-node-with-executor' },
        { text: 'Querying State', link: 'network/local-network-tutorial/get-state-with-headless-graphql' },
        { text: 'Creating a Private Key', link: 'network/local-network-tutorial/create-a-private-key' },
        { text: 'Creating a Genesis Block', link: 'network/local-network-tutorial/create-a-genesis-block' },
        { text: 'Running a Node with Your Own Key', link: 'network/local-network-tutorial/running-node-with-own-private-key' },
        { text: 'Running the Client with a Local Node', link: 'network/local-network-tutorial/run-client-with-local-node' },
        { text: 'Issuing a Transaction', link: 'network/local-network-tutorial/issue-transaction-with-chrono' }
      ]
    }

  ];
}

function sidebarTutorials(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Getting Started', link: 'modding/getting-started' },
    {
      text: 'Tutorials',
      collapsed: false,
      items: [
        { text: 'Avatar Information Website', link: 'modding/guide/avatar-information-dapp-guide' },
        { text: 'Daily Reward Website', link: 'modding/guide/daily-reward-dapp' },
        { text: 'Client Modding with Bepinex', link: 'modding/guide/bepinex-guide' },
      ]
    },
    {
      text: 'System Guide',
      collapsed: false,
      items: [
        { text: 'Address and State', link: 'modding/system-guide/0-address-and-state' },
        { text: 'Transaction and Action', link: 'modding/system-guide/1-transaction-and-action' },
        {
          text: 'Agent',
          link: 'modding/system-guide/agent/0-agent',
          // collapsed: false,
          // items: [
          //   { text: 'Pledge', link: 'modding/system-guide/agent/pledge' },
          //   { text: 'Staking', link: 'modding/system-guide/agent/staking' },
          // ]
        },
        {
          text: 'Avatar',
          link: 'modding/system-guide/avatar/0-avatar',
          collapsed: false,
          items: [
            { text: 'Inventory', link: 'modding/system-guide/avatar/inventory' },
            { text: 'WorldInformation', link: 'modding/system-guide/avatar/world-information' },
            { text: 'QuestList', link: 'modding/system-guide/avatar/quest-list' },
          ]
        },
        { text: 'Adventure', link: 'modding/system-guide/adventure' },
        { text: 'Arena', link: 'modding/system-guide/arena' },
      ]
    },
  ]
}

function sidebarContributing(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Getting Started', link: 'getting-started' },
    { text: 'Repositories', link: 'repositories' },
  ];
}
