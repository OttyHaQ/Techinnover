/// <reference types="cypress" />

// cypress/support/commands.js or cypress/support/commands.ts

// Add the command to simulate mouse hover

Cypress.Commands.add('login', (email, password) => { 

  const userEmail = Cypress.env("email")
  const userPassword = Cypress.env("password")

  cy.visit("/");
	cy.fixture('loginPage').then((loginPage) => {
		cy.get(loginPage.loginLink).click();
		cy.get(loginPage.emailField).type(userEmail);
		cy.get(loginPage.passwordField).type(userPassword);
		cy.get(loginPage.loginBtn).click();
        cy.get(loginPage.header).should('have.text', 'Automation')
	});

 });

Cypress.Commands.add('isHomePage', () => { 
    cy.fixture('homePage').then((homePage) => {
        cy.get(homePage.featuresItemSection).should('be.visible');
        cy.get(homePage.featuresItemSection).should('have.text', 'Features Items');
    });
 });


Cypress.Commands.add('sortItems', () => { 
    cy.fixture("homePage").then((homePage) => {
		cy.get(homePage.featuresItems).then(($products) => {
			
			const items = [];
			$products.each((index, product) => {
			  const label = Cypress.$(product).find("h2").text();
			  const price = parseFloat(
				Cypress.$(product).find(".price").text().replace("$", "")
			  );
			  items.push({ label, price });
			});
		
			const sortedItems = items.sort((a, b) => a.price - b.price);
			sortedItems.forEach((item) => cy.log(`${item.label}: ${item.price}`));
		  });
	})
 });

Cypress.Commands.add('navigateToWomenProducts', () => {
    cy.fixture('homePage').then((homePage) => {
		cy.get(homePage.womenDropdown).scrollIntoView().click();
		cy.get(homePage.topsLink).click();
    });
});

Cypress.Commands.add('scrollandClick', (element) => {
   cy.get(element).should('exist');
   cy.get(element).scrollIntoView().click()
});

Cypress.Commands.add('clickElement', (element) => {
    cy.get(element).should('exist').click()
 });

Cypress.Commands.add('typeAText', (field, text) => {
    cy.get(field).should('exist').type(text)
 });

Cypress.Commands.add('textPresent', (element, text) => {
  cy.get(element).should('have.text', text);
});

Cypress.Commands.add('visibiltyOfElement', (element) => {
  cy.get(element).should('be.visible');
});





//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      sortItems(): Chainable<void>
      isHomePage(): Chainable<void>
      navigateToWomenProducts(): Chainable<void>
      scrollandClick(element: string): Chainable<void>
      clickElement(element: string): Chainable<void>
      typeAText(field: string, text: string): Chainable<void>
      visibiltyOfElement(element: string): Chainable<void>
      textPresent(element: string, text: string): Chainable<void>
    }
  }
}