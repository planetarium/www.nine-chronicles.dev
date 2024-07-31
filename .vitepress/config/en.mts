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
          { text: 'Create a Private Key', link: '/en/guide/create-network/create-a-private-key' },
          { text: 'Create a Genesis Block', link: '/en/guide/create-network/create-a-genesis-block' },
          {
            text: 'Running a Blockchain Node',
            items: [
              { text: '.NET Project', link: '/en/guide/create-network/running-a-blockchain-node-with-dotnet-project' },
              { text: 'Docker' }
            ]
          },
        ]
      },
      {
        text: 'Get State',
        collapsed: false,
        items: [
          { text: 'GraphQL(Headless)', link: '/en/guide/get-state/get-state-with-headless-graphql' },
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
          { text: 'Operating a Blockchain Node', link: '/en/guide/join-mainnet/operating-a-blockchain-node' },
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
      {
        text: 'Forum Trunk',
        collapsed: false,
        items: [
          { text: 'About the key store', link: '/en/forum-trunk/about-the-key-store' },
          { text: 'How to select filtered inventory items in the NineChronicles Unity project', link: '/en/forum-trunk/how-to-select-filtered-inventory-items-in-the-nine-chronicles-unity-project' },
          { text: 'How to use my own RPC server, not Planetarium’s', link: '/en/forum-trunk/how-to-use-my-own-rpc-server-not-planetariums' },
          { text: 'The Structure of Lib9c and its implementations (0) - Overview', link: '/en/forum-trunk/the-structure-of-lib9c-and-its-implementations-0-overview' },
          { text: 'Working with Bencodex', link: '/en/forum-trunk/working-with-bencodex' },
          { text: 'NineChronicles service and repository structure', link: '/en/forum-trunk/nine-chronicles-service-and-repository-structure' },
          { text: 'The Structure and Detail of the Snapshot File', link: '/en/forum-trunk/the-structure-and-detail-of-the-snapshot-file' },
          { text: 'Build and run your own NineChronicles server (a.k.a. Headless)', link: '/en/forum-trunk/build-and-run-your-own-nine-chronicles-server-a-k-a-headless' },
          { text: 'Working with Libplanet Web3KeyStore', link: '/en/forum-trunk/working-with-libplanet-web3keystore' },
          { text: 'The Structure and Location of "config.json"', link: '/en/forum-trunk/the-structure-and-location-of-config-json' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/planetarium/www.nine-chronicles.dev' }
    ]
  }
});
