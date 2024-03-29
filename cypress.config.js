const { defineConfig } = require("cypress");

module.exports = {
  e2e: {
    baseUrl: "http://localhost:3000",
    retries: {
      openMode: 1,
      runMode: 2,
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
  },

  setupNodeEvents(on, config) {
    // implement node event listeners here
  },
};
