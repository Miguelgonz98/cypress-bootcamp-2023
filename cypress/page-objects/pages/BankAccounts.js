export class BankAccounts{
    url = "http://localhost:3000/bankaccounts";
    
    elements = {
        getBtnCreate: () => cy.get('[data-test="bankaccount-new"'),
        getTxtBankName: () => cy.get('#bankaccount-bankName-input'),
        getTxtRoutingNumber: () => cy.get('#bankaccount-routingNumber-input'),
        getTxtAccountNumber: () => cy.get('#bankaccount-accountNumber-input'),
        getBtnSave: () => cy.get('button[data-test="bankaccount-submit"]'),
        getBankAccounts: () => cy.get('div.MuiGrid-root p'),
        getBtnDelete: (bankAccountName) => cy.contains('ul[data-test="bankaccount-list"] li', bankAccountName).find('button')
    }

    createNew(bankAccountName, routingNumber, accountNumber) {
        this.elements.getBtnCreate().click();
        this.elements.getTxtBankName().clear().type(bankAccountName);
        this.elements.getTxtRoutingNumber().clear().type(routingNumber);
        this.elements.getTxtAccountNumber().clear().type(accountNumber);
        this.elements.getBtnSave().click();
    }

    delete(bankAccountName) {
        this.elements.getBtnDelete(bankAccountName).click();
    }
}

export const BankAccountsPage = new BankAccounts();
