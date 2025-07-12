describe('Testing login and logout', () => {
  it('test login and logout', () => {
    cy.visit('http://localhost:3000');
    cy.get('.signInButton').click()
    cy.get('#usernameInput').type('test');
    cy.get('#passwordInput').type('Test123#');
    cy.get('.loginButton').click();
    cy.get('.logoutButton').click();
  })
})