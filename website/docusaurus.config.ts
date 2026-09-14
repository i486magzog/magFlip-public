import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

/**
 * MagFlip documentation site.
 *
 * Two independent doc sets live side by side:
 *   - user-docs/ → /user : for people who USE MagFlip in their web pages.
 *   - dev-docs/  → /dev  : for people who DEVELOP MagFlip itself.
 */
const config: Config = {
  title: 'MagFlip',
  tagline: '웹에서 실제 책장을 넘기는 듯한 Flip Book 라이브러리',
  favicon: 'img/logo.svg',

  // Override with DOCS_URL / DOCS_BASE_URL when deploying (e.g. GitHub Pages).
  url: process.env.DOCS_URL ?? 'https://i486magzog.github.io',
  baseUrl: process.env.DOCS_BASE_URL ?? '/',

  organizationName: 'i486magzog',
  projectName: 'magFlip',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        // User docs are the default docs instance.
        docs: {
          path: 'user-docs',
          routeBasePath: 'user',
          sidebarPath: './sidebars/user.ts',
          editUrl: 'https://github.com/i486magzog/magFlip/tree/dev/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'dev',
        path: 'dev-docs',
        routeBasePath: 'dev',
        sidebarPath: './sidebars/dev.ts',
        editUrl: 'https://github.com/i486magzog/magFlip/tree/dev/main/website/',
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'MagFlip',
      logo: { alt: 'MagFlip Logo', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'userSidebar', position: 'left', label: '사용자 가이드' },
        { type: 'docSidebar', sidebarId: 'devSidebar', docsPluginId: 'dev', position: 'left', label: '개발자 가이드' },
        { to: '/user/demo', label: 'Demo', position: 'left' },
        { href: 'https://www.npmjs.com/package/@magflip/minjs', label: 'npm', position: 'right' },
        { href: 'https://github.com/i486magzog/magFlip', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '사용자 가이드',
          items: [
            { label: '시작하기', to: '/user/intro' },
            { label: 'API 레퍼런스', to: '/user/reference/api' },
          ],
        },
        {
          title: '개발자 가이드',
          items: [
            { label: '시스템 구조', to: '/dev/architecture/overview' },
            { label: '로컬 개발 환경', to: '/dev/development/local-setup' },
          ],
        },
        {
          title: 'More',
          items: [{ label: 'GitHub', href: 'https://github.com/i486magzog/magFlip' }],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Magzog. MIT License.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
