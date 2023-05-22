describe('Bootcamp 2023 - Assignment 2', () => {

  beforeEach(() =>{
    cy.visit('http://localhost:3000/signin')
    cy.get('#username').clear().type('Katharina_Bernier')
    cy.get('#password').clear().type('s3cret')
    cy.get('.MuiButton-label').click()
    cy.get('h6[data-test="sidenav-username"]').should('have.text', '@Katharina_Bernier')
  })

  it('Create New Bank Account', () => {
    cy.get('span.MuiTypography-root').contains('Bank Accounts').click()
    cy.get('#root div.MuiContainer-root.makeStyles-container-20.MuiContainer-maxWidthMd div:nth-child(2) > a').click()
    cy.get('#bankaccount-bankName-input').clear().type('Test Account')
    cy.get('#bankaccount-routingNumber-input').clear().type('123456789')
    cy.get('#bankaccount-accountNumber-input').clear().type('123456789')
    cy.get('button[data-test="bankaccount-submit"]').click()
    cy.get('div.MuiContainer-root.makeStyles-container-20.MuiContainer-maxWidthMd div:nth-child(1) p').contains('Test Account').should('exist')
  })

  it('Delete a Bank Account', () => {
    cy.get('span.MuiTypography-root').contains('Bank Accounts').click()
    cy.contains('ul[data-test="bankaccount-list"] li', 'Test Account').find('button').click()
    cy.get('div.MuiContainer-root.makeStyles-container-20.MuiContainer-maxWidthMd div:nth-child(1) p').contains('Test Account (Deleted)').should('exist')
  })

  afterEach(() =>{
    cy.get('span.MuiTypography-root').contains('Logout').click()
  })

})