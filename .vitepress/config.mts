import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  router: {
    routes: [

    ]
  },
  locales: {
    root: {
      title: "Nine Chronicles Developer Portal",
      description: "A site for Nine Chronicles Ecosystem Developers",
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Quick Start', link: '/en/quick-start' }
        ],
    
        sidebar: [
          {
            text: 'Examples',
            items: [
              { text: 'Markdown Examples', link: '/en/markdown-examples' },
              { text: 'Runtime API Examples', link: '/en/api-examples' }
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
          { text: 'Home', link: '/ko/index' },
          { text: 'Examples', link: '/ko/markdown-examples' }
        ],
    
        sidebar: [
          {
            text: 'Examples',
            items: [
              { text: 'Markdown Examples', link: '/ko/markdown-examples' },
              { text: 'Runtime API Examples', link: '/ko/api-examples' }
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
