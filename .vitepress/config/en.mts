import { defineConfig } from 'vitepress'

export const en = defineConfig({
  title: 'NineChronicles Developer Portal',
  description: 'Site for NineChronicles Ecosystem Developers',
  lang: 'en-US',
  themeConfig: {
    outline: 'deep',
    nav: [
      { text: 'Guide', link: '/en/introduce/what-is-nine-chronicles' },
      { text: 'Examples', link: '/en/examples/getting-started' }
    ],

    sidebar: [
      {
        text: 'Introduce',
        collapsed: false,
        items: [
          { text: 'NineChronicles?', link: '/en/introduce/what-is-nine-chronicles' },
          { text: 'Networks', link: '/en/introduce/networks' },
          { text: 'Multiplanetary', link: '/en/introduce/multiplanetary' },
          { text: 'Developer Ecosystem', link: '/en/introduce/developer-ecosystem' },
        ]
      },
      {
        text: 'Create Network',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/en/guide/create-network/getting-started' },
          { text: 'Create Private Key', link: '/en/guide/create-network/create-private-key' },
          { text: 'Create Genesis Block', link: '/en/guide/create-network/create-genesis-block' },
          {
            text: 'Run Node',
            link: '/en/guide/create-network/run-node',
            items: [
              { text: '.NET Project', link: '/en/guide/create-network/run-node-with-dotnet-project' },
              { text: 'Docker', link: '/en/guide/create-network/run-node-with-docker' }
            ]
          },
        ]
      },
      {
        text: 'Get State',
        collapsed: false,
        items: [
          { text: 'GraphQL(Headless)', link: '/en/guide/get-state/get-state-with-headless-graphql' },
          { text: 'GraphQL(Mimir)', link: '/en/guide/get-state/get-state-with-mimir-graphql' }
        ]
      },
      {
        text: 'Issue Transaction',
        collapsed: false,
        items: [
          { text: 'Chrono', link: '/en/guide/issue-transaction/issue-transaction-with-chrono' }
        ]
      },
      {
        text: 'Join Mainnet',
        collapsed: false,
        items: [
          { text: 'Play NineChronicles', link: '/en/guide/join-mainnet/play-nc' },
          { text: 'Node Operations', link: '/en/guide/join-mainnet/node-operations' },
          { text: 'Modding', link: '/en/guide/join-mainnet/modding' },
        ]
      },
      {
        text: 'Examples',
        collapsed: false,
        items: [
          { text: 'Getting Started', link: '/en/examples/getting-started' },
          { text: 'Transfer NCG(Chrono)', link: '/en/examples/transfer-ncg-with-chrono' },
          { text: 'Daily Reward DApp', link: '/en/examples/daily-reward-dapp' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/planetarium/www.nine-chronicles.dev' }
    ]
  }
});
