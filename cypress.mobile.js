const { defineConfig } = require("cypress");

module.exports = {
  e2e: {
    baseUrl: "http://localhost:3000",
    retries: {
      openMode: 1,
      runMode: 2,
    },
    viewportWidth: 375, // Мобильный размер экрана
    viewportHeight: 812, // Мобильный размер экрана
    
  },
  setupNodeEvents(on, config) {
    // implement node event listeners here
  },
};
