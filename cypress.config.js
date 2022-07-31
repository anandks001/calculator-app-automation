const { defineConfig } = require('cypress');
const {
  addMatchImageSnapshotPlugin,
} = require('@simonsmith/cypress-image-snapshot/plugin');
const AllureWriter = require('@shelex/cypress-allure-plugin/writer');
const cypressEslint = require('cypress-eslint-preprocessor');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://talentry-qa-take-home-exercise.s3.eu-central-1.amazonaws.com',
    specPattern: 'cypress/e2e/**/*.test.js',
    setupNodeEvents(on, config) {
      on('file:preprocessor', cypressEslint());
      addMatchImageSnapshotPlugin(on, config);
      AllureWriter(on, config);
      return config;
    },
    env: {
      allure: true,
      allureResultsPath: 'allure-results',
      allureSkipAutomaticScreenshots: true,
    },
  },
});