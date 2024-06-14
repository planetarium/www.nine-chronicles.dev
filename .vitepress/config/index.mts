import { defineConfig } from 'vitepress'
import { ko } from './ko.mts';
import { en } from './en.mts';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Nine Chronicles Developer Portal',

  cleanUrls: true,
  lastUpdated: true,

  locales: {
    en: { label: 'English', ...en },
    ko: { label: 'Korean', ...ko }
  }
})
