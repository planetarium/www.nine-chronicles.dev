import { defineConfig } from 'vitepress'

export const en = defineConfig({
    title: 'NineChronicles Developer Portal',
    description: 'Site for NineChronicles Ecosystem Developers',
    lang: 'en-US',
    themeConfig: {
      outline: 'deep',
      nav: [ 
        { text: 'Home', link: '/en' },
        { text: 'Examples', link: '/en/examples' }
      ],
  
      sidebar: [
        {
          text: 'Overview', link: '/en/overview'
        },
        {
          text: 'Introduce',
          link: '/en/introduce/nine-chronicles',
          collapsed: false,
          items: [
            { text: 'NineChronicles?', link: '/en/introduce/nine-chronicles' },
            { text: 'Networks', link: '/en/introduce/networks' },
            { text: 'Multiplanetary', link: '/en/introduce/multiplanetary' },
            { text: 'Developer Ecosystem', link: '/en/introduce/developer-ecosystem' },
          ]
        },
        {
          text: 'Join Minnet',
          link: '/en/guide/mainnet/join-mainnet',
          collapsed: false,
          items: [
            { text: 'Play NineChronicles', link: '/en/guide/mainnet/play-nc' },
            { text: 'Node Operations', link: '/en/guide/mainnet/node-operations' },
            { text: 'Modding', link: '/en/guide/mainnet/modding' },
          ]
        },
        {
          text: 'Create Network',
          link: '/en/guide/create-network/getting-started',
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
            {
              text: 'Get State',
              link: '/en/guide/create-network/get-state',
              items: [
                { text: 'GraphQL(Headless)', link: '/en/guide/create-network/get-state-with-headless-graphql' },
                { text: 'GraphQL(Mimir)', link: '/en/guide/create-network/get-state-with-mimir-graphql' }
              ]
            },
            {
              text: 'Issue Transaction',
              link: '/en/guide/create-network/issue-transaction',
              items: [
                { text: 'Chrono', link: '/en/guide/create-network/issue-transaction-with-chrono' }
              ]
            },
          ]
        },
        {
          text: 'Examples',
          link: '/en/examples/getting-started',
          collapsed: false,
          items: [
            { text: 'Transfer NCG(Chrono)', link: '/en/examples/transfer/chrono' }
          ]
        },
      ],
  
      socialLinks: [
        { icon: 'github', link: 'https://github.com/planetarium/www.nine-chronicles.dev' }
      ]
    }
});
