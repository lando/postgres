import {createRequire} from 'module';

import {defineConfig} from '@lando/vitepress-theme-default-plus/config';

const require = createRequire(import.meta.url);

const {name, version} = require('../../package.json');
const landoPlugin = name.replace('@lando/', '');

export default defineConfig({
  title: 'Lando PostgreSQL Plugin',
  description: 'The offical Lando plugin for PostgreSQL.',
  landoDocs: 3,
  landoPlugin,
  version,
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/postgres/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/postgres/favicon.svg', type: 'image/svg+xml'}],
  ],
  themeConfig: {
    multiVersionBuild: {
      satisfies: '>=1.4.0',
    },
    sidebar: sidebar(),
  },
});

function sidebar() {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        {text: 'Overview', link: '/'},
        {text: 'Installation', link: '/install'},
        {text: 'Usage', link: '/config'},
      ],
    },
    {
      text: 'Contribution',
      collapsed: false,
      items: [
        {text: 'Development', link: '/development'},
        {text: 'Team', link: '/team'},
      ],
    },
    {
      text: 'Help & Support',
      collapsed: false,
      items: [
        {text: 'GitHub', link: 'https://github.com/lando/postgres/issues/new/choose'},
        {text: 'Slack', link: 'https://www.launchpass.com/devwithlando'},
        {text: 'Contact Us', link: '/support'},
        {text: 'Examples', link: 'https://github.com/lando/postgres/tree/main/examples'},
      ],
    },
  ];
};
