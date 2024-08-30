import { DefaultTheme, defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  title: 'Developer Portal',
  description: 'Site for Nine Chronicles Ecosystem Developers.',

  themeConfig: {
    outline: 'deep',
    nav: nav(),

    sidebar: {
      '/introduce/': { base: '/', items: sidebarGeneral() },
      '/general/': { base: '/', items: sidebarGeneral() },
      '/network/': { base: '/', items: sidebarNetwork() },
      '/modding/': { base: '/', items: sidebarModding() },
      '/contributing/': { base: '/contributing/', items: sidebarContributing() },
      '/forum-trunk/': { base: '/forum-trunk/', items: sidebarForumTrunk() },
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
      text: 'General',
      link: '/general/what-is-nine-chronicles',
      activeMatch: '/general/'
    },
    {
      text: 'Network',
      link: '/network/local-network-tutorial/getting-started',
      activeMatch: '/network/'
    },
    {
      text: 'Modding',
      link: '/modding/getting-started',
      activeMatch: '/modding/'
    },
    {
      text: 'Contributing',
      link: '/contributing/getting-started',
      activeMatch: '/contributing/'
    },
    {
      text: 'Forum Trunk',
      link: '/forum-trunk/0-what-is-forum-trunk',
      activeMatch: '/forum-trunk/'
    }
  ];
}

function sidebarGeneral(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'What is Nine Chronicles?', link: 'general/what-is-nine-chronicles' },
    { text: 'Networks', link: 'general/networks' },
    { text: 'Multiplanetary', link: 'general/multiplanetary' },
    { text: 'Developer Ecosystem', link: 'general/developer-ecosystem' },
    {
      text: 'Chrono',
      collapsed: false,
      items: [
        { text: 'How to use', link: 'general/chrono/how-to-use-chrono' }
      ]
    },
    {
      text: 'Get State',
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

function sidebarModding(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Getting Started', link: 'modding/getting-started' },
    { text: 'Avatar Information Website', link: 'modding/guide/avatar-information-dapp-guide' },
    { text: 'Daily Reward Website', link: 'modding/guide/daily-reward-dapp' },
    { text: 'Client Modding with Bepinex', link: 'modding/guide/bepinex-guide' },
  ]
}

function sidebarContributing(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Getting Started', link: 'getting-started' },
    { text: 'Repositories', link: 'repositories' },
  ];
}

function sidebarForumTrunk(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Forum Trunk',
      collapsed: false,
      items: [
        { text: 'What is forum trunk?', link: '0-what-is-forum-trunk' },
        { text: 'About the key store', link: 'about-the-key-store' },
        { text: 'How to select filtered inventory items in the Nine Chronicles Unity project', link: 'how-to-select-filtered-inventory-items-in-the-nine-chronicles-unity-project' },
        { text: 'How to use my own RPC server, not Planetarium’s', link: 'how-to-use-my-own-rpc-server-not-planetariums' },
        { text: 'The Structure of Lib9c and its implementations (0) - Overview', link: 'the-structure-of-lib9c-and-its-implementations-0-overview' },
        { text: 'Working with Bencodex', link: 'working-with-bencodex' },
        { text: 'Nine Chronicles service and repository structure', link: 'nine-chronicles-service-and-repository-structure' },
        { text: 'The Structure and Detail of the Snapshot File', link: 'the-structure-and-detail-of-the-snapshot-file' },
        { text: 'Build and run your own Nine Chronicles server (a.k.a. Headless)', link: 'build-and-run-your-own-nine-chronicles-server-a-k-a-headless' },
        { text: 'Working with Libplanet Web3KeyStore', link: 'working-with-libplanet-web3keystore' },
        { text: 'The Structure and Location of "config.json"', link: 'the-structure-and-location-of-config-json' },
        { text: 'The Structure of Battle System and its implementations (0) - Overview', link: 'the-structure-of-battle-system-and-its-implementations-0-overview' },
        { text: 'The Structure of Battle System and its implementations (1) - Turns and Casting Skills : How Skills to Cast are Selected', link: 'the-structure-of-battle-system-and-its-implementations-1-turns-and-casting-skills-how-skills-to-cast-are-selected' },
        { text: 'Hands-On Modding Tutorial: Wear any constumes you want', link: 'hands-on-modding-tutorial-wear-any-constumes-you-want' },
        { text: '"planet" : Libplanet tools to help your Libplanet development journey', link: 'planet-libplanet-tools-to-help-your-libplanet-development-journey' },
        { text: 'How to fix RocksDB error caused by `libdl`?', link: 'how-to-fix-rocksdb-error-caused-by-libdl' },
        { text: 'Install .NET Core 3.1 in Ubuntu 22.04', link: 'install-net-core-3-1-in-ubuntu-22-04' },
        { text: 'Playing the Nine Chronicles local network with the Unity editor', link: 'playing-the-nine-chronicles-local-network-with-the-unity-editor' },
        { text: '[Tutorial] Planet Node: .NET CLI application as example for Libplanet', link: 'tutorial-planet-node-net-cli-application-as-example-for-libplanet' },
        { text: '[TIP] How to play while changing multiple keys in the Unity editor', link: 'tip-how-to-play-while-changing-multiple-keys-in-the-unity-editor' },
        { text: 'Play 9c on x86 macOS / Linux using CI Artifacts (UNOFFICIAL SUPPORT)', link: 'play-9c-on-x86-macos-linux-using-ci-artifacts-unofficial-support' },
        { text: 'Playing the Nine Chronicles main network with the Unity editor', link: 'playing-the-nine-chronicles-main-network-with-the-unity-editor' },
        { text: 'Create, Analyze APV with the "planet" command', link: 'create-analyze-apv-with-the-planet-command' },
        { text: '[Tutorial] UniLibPlanet: Libplanet SDK Unity package for easily creating a blockchain Unity application', link: 'tutorial-unilibplanet-libplanet-sdk-unity-package-for-easily-creating-a-blockchain-unity-application' },
        { text: 'Explain App Protocol Version(a.k.a. APV)', link: 'explain-app-protocol-version-a-k-a-apv' },
        { text: 'Manage your keys with the ‘planet’ command', link: 'manage-your-keys-with-the-planet-command' },
        { text: 'Processing of the Invitation Code', link: 'processing-of-the-invitation-code' },
        { text: 'Configure a single-node network for testing', link: 'configure-a-single-node-network-for-testing' },
        { text: 'Launcher Preload Procedure', link: 'launcher-preload-procedure' },
        { text: 'Issues with .NET SDK on M1 Mac', link: 'issues-with-net-sdk-on-m1-mac' },
        { text: 'Replay of transactions incorporated into blocks', link: 'replay-of-transactions-incorporated-into-blocks' },
        { text: 'Transfer asset with GraphQL queries', link: 'transfer-asset-with-graphql-queries' },
        { text: '[Unity] How to implement a `Action` logics(feat. TransferAsset)', link: 'unity-how-to-implement-a-action-logics-feat-transferasset' },
        { text: 'The Structure of Lib9c and Its Implementations (1) - Event Flow: What actually happens when the daily reward bar is pressed?', link: 'the-structure-of-lib9c-and-its-implementations-1-event-flow-what-actually-happens-when-the-daily-reward-bar-is-pressed' },
        { text: 'Create action and transaction with GraphQL API', link: 'create-action-and-transaction-with-graphql-api' },
        { text: '[WIP] How to submit transaction to the network, using GraphQL', link: 'wip-how-to-submit-transaction-to-the-network-using-graphql' },
        { text: 'How to create your own Nine Chronicles genesis block', link: 'how-to-create-your-own-nine-chronicles-genesis-block' },
        { text: 'Sphere: Easy interaction with Libplanet-based blockchains using JavaScript', link: 'sphere-easy-interaction-with-libplanet-based-blockchains-using-javascript' },
        { text: 'Data Provider: Performance resolver for Ranking', link: 'data-provider-performance-resolver-for-ranking' },
        { text: 'How to send GraphQL query in programmatic way', link: 'how-to-send-graphql-query-in-programmatic-way' },
        { text: 'How to check my balance with GraphQL', link: 'how-to-check-my-balance-with-graphql' },
        { text: 'How to create a weapon resource for player character', link: 'how-to-create-a-weapon-resource-for-player-character' },
        { text: 'About the `replay blocks` command', link: 'about-the-replay-blocks-command' },
        { text: 'How to get mainnet’s blockchain store(w/ Unity Tools)', link: 'how-to-get-mainnets-blockchain-store-w-unity-tools' },
        { text: 'Create a new action and develop graphQL together', link: 'create-a-new-action-and-develop-graphql-together' },
        { text: '[Unity] Address Tool', link: 'unity-address-tool' },
        { text: '[Unity] State Viewer', link: 'unity-state-viewer' },
        { text: 'Run your own local headless node controlled by Unity editor', link: 'run-your-own-local-headless-node-controlled-by-unity-editor' },
        { text: 'The currency of Nine Chronicles', link: 'the-currency-of-nine-chronicles' },
        { text: 'How to play web9c', link: 'how-to-play-web9c' },
        { text: 'How to create actions in JavaScript environment', link: 'how-to-create-actions-in-javascript-environment' },
        { text: 'File Paths used on Nine Chronicles', link: 'file-paths-used-on-nine-chronicles' },
        { text: 'About the redeem code', link: 'about-the-redeem-code' },
      ]
    }
  ];
}
