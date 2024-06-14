import { defineConfig } from "vitepress"

export const ko = defineConfig({
    title: "나인크로니클 개발자 포탈",
    description: "나인크로니클 에코시스템 개발자를 위한 사이트",
    lang: 'ko-KR',
    themeConfig: {
      nav: [
        { text: '홈', link: '/ko' },
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
            { text: "@planetarium/chrono-sdk & Chrono", link: "https://chrono.nine-chronicles.dev/" },
          ]
        },
        {
          text: '예재',
          link: "/ko/examples",
          items: [
            { text: 'NCG 송금 (Chrono)', link: '/ko/examples/transfer/chrono' }
          ]
        }
      ],
  
      socialLinks: [
        { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
      ]
    }
});
