describe('Cognito, programmatic login', function () {
  beforeEach(function () {

     cy.log('Username:', Cypress.env('cognito_username'));
    cy.log('Password:', Cypress.env('cognito_password'));

    // Programmatically login via Amazon Cognito API
    cy.loginByCognitoApi(
      Cypress.env('cognito_username'),
      Cypress.env('cognito_password')
    )
  })

  it('shows onboarding', function () {
    cy.contains('Get Started').should('be.visible')
  })
})