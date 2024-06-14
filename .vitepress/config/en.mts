import { defineConfig } from "vitepress";

export const en = defineConfig({
    title: "Nine Chronicles Developer Portal",
    description: "A site for Nine Chronicles Ecosystem Developers",
    lang: 'en-US',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/en' },
            { text: 'Examples', link: '/en/examples' }
        ],

        sidebar: [
            {
                text: "Overview", link: "/en/overview"
            },
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
                link: "/en/examples",
                items: [
                    { text: 'Transfer NCG (Chrono)', link: '/en/examples/transfer/chrono' },
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
});
