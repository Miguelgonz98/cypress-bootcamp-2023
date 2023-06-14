import { LoginPage } from "../page-objects/pages/login";
const apiBankAccounts = `${Cypress.env("apiUrl")}/bankAccounts`;

describe('Real World App Bank Account API Tests', () => {
  const UUID = '1' + Math.random().toString();
  const bankAccountName = "Test Account " + UUID;
  const routingNumber = '987654321';
  const accountNumber = '123456789';
  let bankAccountID;
  
    beforeEach(() => {
      cy.visit('/');
      LoginPage.login('Katharina_Bernier','s3cret');
      cy.request("POST", `${apiBankAccounts}`, {
        bankName: bankAccountName,
        routingNumber: routingNumber,
        accountNumber: accountNumber
      }).then((response) => {
        bankAccountID = response.body.account.id;
        expect(response.status).to.eq(200);
      });
    });

    it("should create a bank account via API", () => {
      cy.visit(`/bankaccounts/${bankAccountID}`);
    });

    it.only("Should get all bank accounts", () => {
      cy.request("GET", `${apiBankAccounts}`, {}).then((response) => {
        expect(response.status).to.eq(200)
      })
    });

    it.only("Should delete a transaction", () => {
      cy.request("DELETE", `${apiBankAccounts}/${bankAccountID}`, {
        isDeleted: true
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    });

    
  });