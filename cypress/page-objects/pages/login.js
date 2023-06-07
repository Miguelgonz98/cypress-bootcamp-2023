import { SideBarPage } from "../components/sideBar";

export class Login {
    elements = {
        getTxtUsername: () => cy.get('#username'),
        getTxtPassword: () => cy.get('#password'),
        getBtnSignIn: () => cy.get('.MuiButton-label'),
    }

    login(username, password){
        this.elements.getTxtUsername().clear().type(username);
        this.elements.getTxtPassword().clear().type(password);
        this.elements.getBtnSignIn().click();
        SideBarPage.elements.getUserInfo().contains(`@${username}`);
    }
}

export const LoginPage = new Login();