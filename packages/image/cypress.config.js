import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, conifg) {
      console.log('setupNodeEvents')
    },
  },
})
