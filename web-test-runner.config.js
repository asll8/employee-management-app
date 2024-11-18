import { playwrightLauncher } from '@web/test-runner-playwright';
import { legacyPlugin } from '@web/dev-server-legacy';

export default {
  browsers: [playwrightLauncher({ product: 'chromium', channel: 'chrome' })],
  files: 'tests/**/*.test.js',
  nodeResolve: true,
  testFramework: {
    config: {
      timeout: 10000,
    },
  },
  coverageConfig: {
    exclude: ['node_modules/**', 'test/**'],
  },
  plugins: [
    legacyPlugin({
      polyfills: {
        webcomponents: true,
        custom: [
          {
            name: 'lit-polyfill-support',
            path: 'node_modules/lit/polyfill-support.js',
            test: "!('attachShadow' in Element.prototype)",
            module: false,
          },
        ],
      },
    }),
  ],
};
