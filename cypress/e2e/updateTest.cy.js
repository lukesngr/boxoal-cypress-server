describe('normal functions test', () => {

  beforeEach(function () {
    cy.loginByCognitoApi(
      Cypress.env('cognito_username'),
      Cypress.env('cognito_password')
    )
  })

  it('test schedule update', () => {
    cy.intercept('GET', '**/api/getSchedules*').as('getSchedules');
    cy.visit('http://localhost:3000/myschedules');
    cy.wait('@getSchedules');
    cy.get('.updateScheduleFormOpen').click();
    cy.get('.updateScheduleTitle').type('test')
    cy.get('.updateScheduleButton').click();
    cy.get('.errorAlert').contains('Updated schedule!');
  })

  it('test goal update', () => {
    cy.intercept('GET', '**/api/getSchedules*').as('getSchedules');
    cy.visit('http://localhost:3000/myschedules');
    cy.wait('@getSchedules');
    cy.get('.openUpdateGoalButton').click();
    cy.get('.updateGoalTitle').type('test')
    cy.get('.updateGoalButton').click();
    cy.get('.errorAlert').contains('Updated goal!');
  })

  it('update timebox ', () => {
    cy.intercept('GET', '**/api/getSchedules*').as('getSchedules');
    cy.visit('http://localhost:3000/myschedules');

    cy.wait('@getSchedules');
    let datetime = new Date();
    let hours = datetime.getHours()+1;
    let minutes = datetime.getMinutes();
    let date = datetime.getDate();
    let month = datetime.getMonth()+1;

    if(minutes == 0) {
        minutes = "00";
    }

    if(hours == 0) {
        hours = "00";
    }

    if(minutes < 10 && minutes != "00") {
        minutes = "0"+minutes;
    }

    if(hours < 10 && hours != "00") {
        hours = "0"+hours;
    }
    cy.get(`[class="${hours+':30'}${date+'/'+month}TimeboxActionsForm"]`).click();
    cy.get('.editTimebox').click();
    cy.get('.editTitle').type('test');
    cy.get('.updateTimeboxButton').click();
    cy.get('.errorAlert').contains('Updated timebox!');
  })
})