import footnote from 'markdown-it-footnote';
import { withMermaid } from "vitepress-plugin-mermaid";

const GATAG = "G-3TF7Q09Y5N"

export const shared = withMermaid({
    title: 'Nine Chronicles Developer Portal',
    description: 'A comprehensive guide for Nine Chronicles developers.',

    rewrites: {
        'en/:rest*': ':rest*'
    },

    cleanUrls: true,
    lastUpdated: true,

    markdown: {
        config: (md) => {
            md.use(footnote);
        },
        linkify: true,
        typographer: true,
    },

    head: [
        ['link', { rel: 'icon', href: '/favicon/favicon.ico' }],
        ['meta', { name: 'theme-color', content: '#5f67ee' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:locale', content: 'en' }],
        ['meta', { property: 'og:title', content: 'Nine Chronicles Developer Portal' }],
        ['meta', { property: 'og:site_name', content: 'Nine Chronicles Developer Portal' }],
        ['meta', { property: 'og:image', content: '/images/share.jpg' }],
        ['meta', { property: 'og:url', content: 'https://nine-chronicles.dev/' }],
        [
            'script',
            { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${GATAG}` }
        ],
        [
            'script',
            {},
            `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GATAG}');`
        ]
    ],

    themeConfig: {
        // logo: { src: '/favicon/favicon-32x32.png', width: 24, height: 24 },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/planetarium/www.nine-chronicles.dev' }
        ],

        search: {
            provider: 'local',
        },
    }
})
