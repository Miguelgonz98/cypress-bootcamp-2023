import { LoginPage } from "../page-objects/pages/login";
import { BankAccountsPage } from "../page-objects/pages/bankAccounts";
const apiBankAccounts = `${Cypress.env("apiUrl")}/bankAccounts`;

describe('Real World App Bank Account API Tests', () => {
  const UUID = '1' + Math.random().toString();
  const bankAccountName = "Test Account " + UUID;
  const routingNumber = '987654321';
  const accountNumber = '123456789';
  let bankAccountsID = [];
  let bankAccountsName = [];
  
    beforeEach(() => {
      cy.visit('/');
      LoginPage.login('Katharina_Bernier','s3cret');
    });

    afterEach(() =>{
      cy.get('span.MuiTypography-root').contains('Logout').click();
    });

    it("Should create a 5 bank accounts via API", () => {
      for (let i = 0; i < 5; i++) {
        cy.request("POST", `${apiBankAccounts}`, {
          bankName: bankAccountName+i,
          routingNumber: routingNumber+i,
          accountNumber: accountNumber+i
        }).then((response) => {
          expect(response.status).to.eq(200);
          bankAccountsID.push(response.body.account.id);
          bankAccountsName.push(bankAccountName+i);
        });
      }
      cy.visit("/bankAccounts");
      bankAccountsName.forEach(e => {
        BankAccountsPage.elements.getBankAccounts().contains(e).should('exist');
      });
    });

    it("Should get all bank accounts", () => {
      bankAccountsID.forEach(e => {
        cy.request("GET", `${apiBankAccounts}/${e}`, {
        }).then((response) => {
          expect(response.status).to.eq(200)
        })
      })
    });

    it("Should delete 5 last bank accounts", () => {
      bankAccountsID.forEach(e => {
        cy.request("DELETE", `${apiBankAccounts}/${e}`, {
          isDeleted: true
        }).then((response) => {
          expect(response.status).to.eq(200);
        })
      })
      cy.visit("/bankAccounts");
      bankAccountsName.forEach(e => {
        BankAccountsPage.elements.getBankAccounts().contains(`${e} (Deleted)`).should('exist');
      });
    });
  });