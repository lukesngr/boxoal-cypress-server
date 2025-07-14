const dayjs = require('dayjs');

describe('advanced features test', () => {

  beforeEach(function () {
    cy.loginByCognitoApi(
      Cypress.env('cognito_username'),
      Cypress.env('cognito_password')
    )
  })

  

  it('test reoccurring', () => {
    cy.intercept('GET', '**/api/getSchedules*').as('getSchedules');
    cy.visit('http://localhost:3000/myschedules');
    cy.wait('@getSchedules');

    let arrayOfSelectors = [];
    for(let i = 0; i < 7; i++) {
      let datetime = dayjs().add(2, 'hour').day(i).minute(30).format('HH:mmD/M');
      arrayOfSelectors.push(`[class="${datetime}TimeboxActionsForm"]`);
    }

    let currentDatetime = dayjs().add(2, 'hour').minute(30).format('H:mmD/M');
    cy.get(`[class="${currentDatetime}TimeboxCreationForm"]`).click();
    cy.get('.createTimeboxTitle').type('test');
    cy.get('.turnReoccuringOn').click();
    cy.get('.createTimebox').click()
    cy.get('.errorAlert').contains('Added timebox!');
    cy.get('.updateTimeboxButton').click();
    cy.get('.errorAlert').contains('Updated timebox!');
    for(let i = 0; i < arrayOfSelectors.length; i++) {
      cy.get(arrayOfSelectors[i]).contains('test');
    }
  })
})