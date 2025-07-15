const dayjs = require('dayjs');

describe('advanced features test', () => {

  beforeEach(function () {
    cy.loginByCognitoApi(
      Cypress.env('cognito_username'),
      Cypress.env('cognito_password')
    )
  })

  it('test next goal in line comes when update', () => {
    cy.intercept('GET', '**/api/getSchedules*').as('getSchedules');
    cy.visit('http://localhost:3000/myschedules');
    cy.wait('@getSchedules');
    cy.get('.openUpdateGoalButton').click();
    cy.get('.goalCompletedButton').click();
    cy.get('.updateGoalButton').click();
    cy.get('.errorAlert').contains('Updated goal!');
    cy.get('.errorCloseButton').click();
    cy.get('.goalTitle').contains('next')
  })

  it('test next goal in line comes when delete', () => {
    cy.intercept('GET', '**/api/getSchedules*').as('getSchedules');
    cy.visit('http://localhost:3000/myschedules');
    cy.wait('@getSchedules');
    cy.get('.openSkillTree').click();
    cy.get('.addGoalToTree').click();
    cy.get('.createGoalTitle').type('next2');
    cy.get('.createGoalButton').click();
    cy.get('.errorAlert').contains('Created goal!');
    cy.get('.errorCloseButton').click();
    cy.get('.closeGoalTree').click();
    cy.get('.openUpdateGoalButton').click();
    cy.get('.deleteGoal').click();
    cy.get('.errorAlert').contains('Deleted goal!');
    cy.get('.goalTitle').contains('next2')
  })

  it('test reoccurring', () => {
    cy.intercept('GET', '**/api/getSchedules*').as('getSchedules');
    cy.visit('http://localhost:3000/myschedules');
    cy.wait('@getSchedules');

    let currentDatetime = dayjs().add(2, 'hour').minute(30).format('H:mmD/M');
    cy.get(`[class="${currentDatetime}TimeboxCreationForm"]`).click();
    cy.get('.createTimeboxTitle').type('test');
    cy.get('.openReoccurring').click();
    cy.get('.turnReoccuringOn').click();
    cy.get('.createTimebox').click()
    cy.get('.errorAlert').contains('Added timebox!');
    cy.get('.errorCloseButton').click();
    let currentDatetimeDifferentFormatting = dayjs().add(2, 'hour').minute(30).format('HH:mmD/M') //dumb thing in my code i cbf to changed
    cy.get(`[class="${currentDatetimeDifferentFormatting}TimeboxActionsForm"]`).should('have.length', 7);
  })
})