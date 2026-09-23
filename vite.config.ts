 

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'dist',
//   },
//   server: {
//     open: true,
//   },
// });

// vite.config.js
import postcssImport from 'postcss-import';
import vercelConfig from './vercel.json';

interface AtRule {
  name: string;
  remove: () => void;
}

// Security headers are defined once, in vercel.json (used in production), and
// reused here for the local servers.
const vercelHeaders: { key: string; value: string }[] = vercelConfig.headers[0].headers;
const toHeaderObject = (list: { key: string; value: string }[]) =>
  Object.fromEntries(list.map(({ key, value }) => [key, value]));

// `npm run preview` serves the production build over plain http on localhost,
// so leave out the rules that only make sense on https.
const previewHeaders = toHeaderObject(
  vercelHeaders
    .filter(({ key }) => key !== 'Strict-Transport-Security')
    .map(({ key, value }) =>
      key === 'Content-Security-Policy' ? { key, value: value.replace(/;\s*upgrade-insecure-requests/, '') } : { key, value }
    )
);
// `npm run dev` also skips the Content-Security-Policy: Vite's hot reload needs
// websockets and injected scripts that the production policy blocks.
const devHeaders = toHeaderObject(
  vercelHeaders.filter(({ key }) => key !== 'Strict-Transport-Security' && key !== 'Content-Security-Policy')
);

export default {
  server: {
    headers: devHeaders,
    // Forward API calls to the Node backend (npm run server)
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
  preview: {
    headers: previewHeaders,
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssImport(),
        {
          postcssPlugin: 'strip-charset',
          AtRule: {
            charset: (atRule: AtRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
};
