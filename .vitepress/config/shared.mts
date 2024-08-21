import { defineConfig } from 'vitepress';
import footnote from 'markdown-it-footnote';

// https://vitepress.dev/reference/site-config
export const shared = defineConfig({
    lang: 'en-US',
    title: 'Nine Chronicles Developer Portal',
    description: 'A comprehensive guide for Nine Chronicles developers.',

    ignoreDeadLinks: true,
    cleanUrls: true,
    lastUpdated: true,

    markdown: {
        config: (md) => {
            md.use(footnote)
        },
        linkify: true,
        typographer: true,
    }
})
