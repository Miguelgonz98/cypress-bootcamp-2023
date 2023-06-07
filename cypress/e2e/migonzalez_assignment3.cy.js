import { BankAccountsPage } from "../page-objects/pages/bankAccounts";
import { LoginPage } from "../page-objects/pages/login";
import { SideBarPage } from "../page-objects/components/sideBar";

describe('Real World App Bank Account Tests', () => {
    const UUID = '1' + Math.random().toString();
    const bankAccountName = "Test Account" + UUID;
    const routingNumber = '987654321';
    const accountNumber = '123456789';
  
    beforeEach(() =>{
      cy.visit('/');
      LoginPage.login('Katharina_Bernier','s3cret');
      SideBarPage.selectOption('Bank Accounts');
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
  