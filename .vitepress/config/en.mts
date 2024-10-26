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
      link: '/tutorials/index',
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
    {
      text: 'Modding',
      collapsed: false,
      items: [
        { text: 'Start Modding', link: 'guide/modding/getting-started' },
        {
          text: 'System Guide',
          collapsed: true,
          items: [
            { text: 'Address and State', link: 'guide/modding/system-guide/0-address-and-state' },
            { text: 'Transaction and Action', link: 'guide/modding/system-guide/1-transaction-and-action' },
            {
              text: 'Agent',
              link: 'guide/modding/system-guide/agent/0-agent',
            },
            {
              text: 'Avatar',
              link: 'guide/modding/system-guide/avatar/0-avatar',
              collapsed: true,
              items: [
                { text: 'Inventory', link: 'guide/modding/system-guide/avatar/inventory' },
                { text: 'World Information', link: 'guide/modding/system-guide/avatar/world-information' },
                { text: 'Quest List', link: 'guide/modding/system-guide/avatar/quest-list' },
              ]
            },
            { text: 'Adventure', link: 'guide/modding/system-guide/adventure' },
            { text: 'Arena', link: 'guide/modding/system-guide/arena' },
          ]
        },
        { text: 'TypeScript Libraries', link: 'guide/modding/ts-libs' },
      ]
    },
    {
      text: 'Network',
      collapsed: false,
      items: [
        { text: 'Getting Started with Network', link: 'guide/network/getting-started' },
      ]
    },
    {
      text: 'Open Source',
      collapsed: false,
      items: [
        { text: 'Start Contribution', link: 'guide/contributing/getting-started' },
        { text: 'Repository List', link: 'guide/contributing/repositories' },
      ]
    },
    {
      text: 'General',
      collapsed: false,
      items: [
        { text: 'Multiplanetary', link: 'guide/general/multiplanetary' },
        { text: 'How to Use Chrono', link: 'guide/general/how-to-use-chrono' },
        {
          text: 'Querying State',
          collapsed: false,
          items: [
            { text: 'Querying State with Headless', link: 'guide/general/get-state/get-state-with-headless-graphql' },
            { text: 'Querying State with Mimir', link: 'guide/general/get-state/get-state-with-mimir-graphql' },
          ]
        },
      ]
    },
  ];
}

function sidebarTutorials(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Index', link: 'tutorials/index' },
    {
      text: 'Modding Tutorials',
      collapsed: false,
      items: [
        { text: 'Avatar Information Website', link: 'tutorials/modding/avatar-information-dapp-guide' },
        { text: 'Daily Reward Website', link: 'tutorials/modding/daily-reward-dapp' },
        { text: 'Client Modding with Bepinex', link: 'tutorials/modding/bepinex-guide' },
      ]
    },
    {
      text: 'Run local ninechronicles network',
      collapsed: false,
      items: [
        { text: 'Getting Started', link: 'tutorials/local-network-tutorial/getting-started' },
        { text: 'Running a Blockchain Node', link: 'tutorials/local-network-tutorial/running-node-with-executor.md' },
        { text: 'Querying State', link: 'tutorials/local-network-tutorial/get-state-with-headless-graphql.md' },
        { text: 'Creating a Private Key', link: 'tutorials/local-network-tutorial/create-a-private-key' },
        { text: 'Creating a Genesis Bloc', link: 'tutorials/local-network-tutorial/create-a-genesis-block' },
        { text: 'Running a Node with Your Own Key', link: 'tutorials/local-network-tutorial/running-node-with-own-private-key.md' },
        { text: 'Running the Client with a Local Node', link: 'tutorials/local-network-tutorial/run-client-with-local-node' },
        { text: 'Issuing a Transaction', link: 'tutorials/local-network-tutorial/issue-transaction-with-chrono' }
      ]
    },
  ];
}
