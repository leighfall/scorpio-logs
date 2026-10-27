import { defineVitestProject } from '@nuxt/test-utils/config';
import { defineConfig } from 'vitest/config';

process.env.TZ = 'America/Los_Angeles';

export default defineConfig({
  test: {
    passWithNoTests: true,
    projects: [
      await defineVitestProject({
        test: {
          name: 'unit',
          include: ['tests/unit/**/*.test.ts'],
          environment: 'happy-dom',
        },
      }),
      {
        test: {
          name: 'integration',
          include: ['tests/integration/**/*.test.ts'],
          environment: 'node',
        },
      },
    ],
  },
});
