describe('creation functions test', () => {

  beforeEach(function () {
    cy.loginByCognitoApi(
      Cypress.env('cognito_username'),
      Cypress.env('cognito_password')
    )
  })

  it('test schedule creation', () => {
    cy.visit('http://localhost:3000/myschedules');
    cy.get('.openCreateScheduleForm').click();
    cy.get('.createScheduleTitle').type('type')
    cy.get('.createScheduleButton').click();
    cy.get('.errorAlert').contains('Created schedule!');
  })

  it('test timebox creation when goal not there', () => {
    cy.visit('http://localhost:3000/myschedules');
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
    cy.get(`[class="${hours+':30'}${date+'/'+month}TimeboxCreationForm"]`).click();
    cy.get('.createTimeboxTitle').type('test');
    cy.get(`[class="${hours+':30'}${date+'/'+month}TimeboxCreationForm"] .timeboxInCreation`).should('have.attr', 'style').and('include', 'height: calc(100% + 0px);');
    cy.get(`[class="${hours+':30'}${date+'/'+month}TimeboxCreationForm"]`).contains('test');
    cy.get('.createTimebox').click()
    cy.get('.errorAlert').contains('Please create a goal before creating a timebox');
    cy.get('.errorCloseButton').click();
    cy.get('.closeCreateTimeboxButton').click();
  })

  it('test goal creation', () => {
    cy.intercept('GET', '**/api/getSchedules*').as('getSchedules');
    cy.visit('http://localhost:3000/myschedules');
    cy.wait('@getSchedules');
    cy.get('.openCreateGoalForm').click();
    cy.get('.createGoalTitle').type('test');
    cy.get('.createGoalButton').click();
    cy.get('.errorAlert').contains('Created goal!');
  })

  it('test goal creation limit locking', () => {
    cy.intercept('GET', '**/api/getSchedules*').as('getSchedules');
    cy.visit('http://localhost:3000/myschedules');
    cy.wait('@getSchedules');
    cy.get('.openCreateGoalForm').click();
    cy.get('.createGoalTitle').type('test');
    cy.get('.createGoalButton').click();
    cy.get('.errorAlert').contains('Please complete more goals and we will unlock more goal slots for you!');
  })

  it('test timebox creation when goal there', () => {
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
    cy.get(`[class="${hours+':30'}${date+'/'+month}TimeboxCreationForm"]`).click();
    cy.get('.createTimeboxTitle').type('test');
    cy.get(`[class="${hours+':30'}${date+'/'+month}TimeboxCreationForm"] .timeboxInCreation`).should('have.attr', 'style').and('include', 'height: calc(100% + 0px);');
    cy.get(`[class="${hours+':30'}${date+'/'+month}TimeboxCreationForm"]`).contains('test');
    cy.get('.createTimebox').click()
    cy.get('.errorAlert').contains('Added timebox!');
  })

  it('test recording functions ', () => {
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
    cy.get('.recordButton').click();
    cy.get('.stopRecordButton').click();
    cy.get('.errorAlert').contains('Completed timebox!');
    cy.get('.errorCloseButton').click();
    cy.get('.clearRecording').click();
    cy.get('.errorAlert').contains('Cleared recording!');
  })

  it('test add tree to goal ', () => {
    cy.intercept('GET', '**/api/getSchedules*').as('getSchedules');
    cy.visit('http://localhost:3000/myschedules');
    cy.wait('@getSchedules');
    cy.get('.openSkillTree').click();
    cy.get('.addGoalToTree').click();
    cy.get('.createGoalTitle').type('next');
    cy.get('.createGoalButton').click();
    cy.get('.errorAlert').contains('Created goal!');
  })
})