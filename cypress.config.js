const { defineConfig } = require("cypress");
require('dotenv').config();

console.log(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    cognito_username: process.env.TEST_USERNAME,
    cognito_password: process.env.TEST_PASSWORD,
    awsConfig: {
        Auth: {
            Cognito: {
            userPoolId: process.env.COGNITO_POOL_ID,
            userPoolClientId: process.env.COGNITO_POOL_CLIENT_ID,
            loginWith: {
                email: true,
                username: true
            },
            signUpVerificationMethod: "email",
            userAttributes: {
                username: {
                required: true,
                },
            },
            passwordFormat: {
                minLength: 8,
                requireLowercase: true,
                requireUppercase: true,
                requireNumbers: true,
                requireSpecialCharacters: true,
            },
            },
        },
    }
  }
});
