import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

/**
 * This is the configuration file for Vitest, a testing framework for Vite.
 * It merges the default Vite configuration with the specific configuration for Vitest.
 *
 * @module vitest.config
 */
export default mergeConfig(
  // Importing the default Vite configuration
  viteConfig,

  // Defining the specific configuration for Vitest
  defineConfig({
    test: {
      // Setting the environment for the tests to 'jsdom'
      environment: 'jsdom',

      // Excluding certain files and directories from the tests
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
