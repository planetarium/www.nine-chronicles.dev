import { defineConfig } from 'vitepress';
import { ko } from './ko.mts';
import { en } from './en.mts';
import 'mermaid';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'Nine Chronicles Developer Portal',
  description: 'A comprehensive guide for Nine Chronicles developers.',

  cleanUrls: true,
  lastUpdated: true,

  locales: {
    en: { label: 'English', ...en },
    ko: { label: 'Korean', ...ko }
  },

  markdown: {
    linkify: true,
    typographer: true,
  }
})
