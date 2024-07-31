import { defineConfig } from 'vitepress';
import { ko } from './ko.mts';
import { en } from './en.mts';
import footnote from 'markdown-it-footnote';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Nine Chronicles Developer Portal',
  description: 'A comprehensive guide for Nine Chronicles developers.',

  ignoreDeadLinks: true,
  cleanUrls: true,
  lastUpdated: true,

  locales: {
    en: { label: 'English', ...en },
    ko: { label: 'Korean', ...ko }
  },

  markdown: {
    config: (md) => {
      md.use(footnote)
    },
    linkify: true,
    typographer: true,
  }
})
