import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'frank的组件库',
  favicon:
    '/favicon.png',
  logo: '/favicon.png',
  outputPath: 'docs-dist',
  mode: 'site',
  description:"test",
  // 使用 webpack 5进行构建。
  hash:true,
  history:{ type: 'hash' },
  publicPath:'./',
  // more config: https://d.umijs.org/config
});
