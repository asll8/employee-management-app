import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  rootDir: './',
  files: ['tests/**/*.test.js'],
  nodeResolve: true,
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    //playwrightLauncher({ product: 'firefox' }),
    //playwrightLauncher({ product: 'webkit' }),
  ],
  testFramework: {
    config: {
      ui: 'bdd',
      timeout: '2000',
    },
  },
  plugins: [],
  coverageConfig: {
    include: ['src/**/*.{js,ts}'],
    exclude: ['tests/**/*'],
  },
};
