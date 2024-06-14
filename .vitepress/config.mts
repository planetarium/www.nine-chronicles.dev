import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  locales: {
    root: {
      title: "Nine Chronicles Developer Portal",
      description: "A site for Nine Chronicles Ecosystem Developers",
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Examples', link: '/en/examples/' }
        ],
    
        sidebar: [
          {
            text: "Ecosystem",
            items: [
              { text: "@planetarium/account", link: "https://www.npmjs.com/package/@planetarium/account" },
              { text: "@planetarium/tx", link: "https://www.npmjs.com/package/@planetarium/tx" },
              { text: "@planetarium/lib9c", link: "https://lib9c.nine-chronicles.dev/" },
            ]
          },
          {
            text: 'Examples',
            link: "/en/examples/",
            items: [
              { text: 'Transfer NCG (Chrono)', link: '/en/examples/transfer/chrono' },
            ]
          }
        ],
    
        socialLinks: [
          { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
      }
    },
    ko: {
      title: "나인크로니클 개발자 포탈",
      description: "나인크로니클 에코시스템 개발자를 위한 사이트",
      label: 'Korean',
      lang: 'ko',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/ko/' },
          { text: '예제', link: '/ko/examples/' }
        ],
    
        sidebar: [
          {
            text: "둘러보기", link: "/ko/overview"
          },
          {
            text: "에코시스템",
            items: [
              { text: "@planetarium/account", link: "https://www.npmjs.com/package/@planetarium/account" },
              { text: "@planetarium/tx", link: "https://www.npmjs.com/package/@planetarium/tx" },
              { text: "@planetarium/lib9c", link: "https://lib9c.nine-chronicles.dev/" },
            ]
          },
          {
            text: '예재',
            link: "/ko/examples/",
            items: [
              { text: 'NCG 송금 (Chrono)', link: '/ko/examples/transfer/chrono' }
            ]
          }
        ],
    
        socialLinks: [
          { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
      }
    }
  }
})
