import { BankAccounts, BankAccountsPage } from "../page-objects/pages/BankAccounts";

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
      cy.get('span.MuiTypography-root').contains('Bank Accounts').click();
      cy.get('h6[data-test="sidenav-username"]').should('have.text', '@Katharina_Bernier');
    });
  
    afterEach(() =>{
      cy.get('span.MuiTypography-root').contains('Logout').click();
    });
  
    it('Should create a new bank account', () => {
      BankAccountsPage.createNew(bankAccountName, routingNumber, accountNumber);
      BankAccountsPage.elements.getBankAccounts().contains(bankAccountName).should('exist');
    });
  
    it('Should delete a created bank account', () => {
      BankAccountsPage.delete(bankAccountName);
      BankAccountsPage.elements.getBankAccounts().contains(`${bankAccountName} (Deleted)`).should('exist');
    });
  });
  