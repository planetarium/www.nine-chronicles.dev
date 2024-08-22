import { defineConfig } from 'vitepress';
import { shared } from './shared.mjs';
import { ko } from './ko.mts';
import { en } from './en.mts';

export default defineConfig({
  ...shared,
  locales: {
    root: { label: 'English', ...en },
    ko: { label: 'Korean', ...ko }
  },
})
