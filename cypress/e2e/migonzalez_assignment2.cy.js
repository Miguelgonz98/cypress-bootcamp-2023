describe('Real World App Bank Account Tests', () => {
  let UUID = '1' + Math.random().toString();
  let bankAccountName = "Test Account" + UUID;
  let routingNumber = '987654321';
  let accountNumber = '123456789';

  beforeEach(() =>{
    cy.visit('/');
    cy.get('#username').clear().type('Katharina_Bernier');
    cy.get('#password').clear().type('s3cret');
    cy.get('.MuiButton-label').click();
    cy.get('h6[data-test="sidenav-username"]').should('have.text', '@Katharina_Bernier');
  });

  afterEach(() =>{
    cy.get('span.MuiTypography-root').contains('Logout').click();
  });

  it('Should create a new bank account', () => {
    cy.get('span.MuiTypography-root').contains('Bank Accounts').click();
    cy.get('[data-test="bankaccount-new"').click();
    cy.get('#bankaccount-bankName-input').clear().type(bankAccountName);
    cy.get('#bankaccount-routingNumber-input').clear().type(routingNumber);
    cy.get('#bankaccount-accountNumber-input').clear().type(accountNumber);
    cy.get('button[data-test="bankaccount-submit"]').click();
    cy.get('div.MuiGrid-root p').contains(bankAccountName).should('exist');
  });

  it('Should delete a created bank account', () => {
    cy.get('span.MuiTypography-root').contains('Bank Accounts').click();
    cy.contains('ul[data-test="bankaccount-list"] li', bankAccountName).find('button').click();
    cy.get('div.MuiGrid-root p').contains(`${bankAccountName} (Deleted)`).should('exist');
  });
});
