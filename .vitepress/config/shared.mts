import { defineConfig } from 'vitepress';
import footnote from 'markdown-it-footnote';

export const shared = defineConfig({
    title: 'NineChronicles Developer Portal',
    description: 'A comprehensive guide for Nine Chronicles developers.',

    cleanUrls: true,
    lastUpdated: true,

    markdown: {
        config: (md) => {
            md.use(footnote)
        },
        linkify: true,
        typographer: true,
    },

    head: [
        ['link', { rel: 'icon', href: '/favicon/favicon.ico' }],
        ['meta', { name: 'theme-color', content: '#5f67ee' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:locale', content: 'en' }],
        ['meta', { property: 'og:title', content: 'NineChronicles Developer Portal' }],
        ['meta', { property: 'og:site_name', content: 'NineChronicles Developer Portal' }],
        ['meta', { property: 'og:image', content: '/images/share.jpg' }],
        ['meta', { property: 'og:url', content: 'https://nine-chronicles.dev/' }],
    ],
    }
})
