
import { playwrightLauncher } from '@web/test-runner-playwright';


export default {
  files: 'tests/**/*.test.js',
  plugins: [
    playwrightLauncher({ 
      browsers: ['chromium', 'firefox', 'webkit'],
    }),
  ],
  nodeResolve: true,
  testFramework: {
    config: {
      ui: 'bdd', 
    },
  },
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    //playwrightLauncher({ product: 'firefox' }),
    //playwrightLauncher({ product: 'webkit' }),
  ],
};
