const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://guest:welcome2qauto@qauto2.forstudy.space",

    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: true,
      html: true,
      json: true,
      inline: true,
    },
    env: {
      MAIN_USER_EMAIL: "mkvak2@gmail.com",
      MAIN_USER_PASSWORD: "Barselona-1987",
    },
  },
});