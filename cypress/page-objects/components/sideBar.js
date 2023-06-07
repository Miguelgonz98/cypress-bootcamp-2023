export class SideBar {
    elements = {
        getOptionLink: (option) => cy.get('span.MuiTypography-root').contains(`${option}`),
        getHomeLink: () => cy.get('[data-test="sidenav-home"]'),
        getUserInfo: () => cy.get('h6[data-test="sidenav-username"]'),
    }

    selectOption(option){
        this.elements.getOptionLink(option).click();
    }
}

export const SideBarPage = new SideBar();