/// <reference types="cypress" />

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

beforeEach('login to website', () =>{
	cy.fixture('loginPage').then((loginPage) => {
		cy.login(loginPage.email, loginPage.password);
	});
	
});

	
Given('I am In the Features Items section', () => {
		cy.isHomePage()
	});

Then('I should be able to fetch and sort items by price from low to high', () => {
	cy.sortItems()
});



Given('I am on the home page', () => {
	cy.isHomePage()
});

When('I navigate to women >> Dress >> Women - Tops Products', () => {
	cy.navigateToWomenProducts()
});

When('I select the Fancy Green Top', () => {
	cy.fixture('womenTopsPage').then((womenTopsPage) => {
		cy.scrollandClick(womenTopsPage.selectGreenDress);
		
	});
});

When('I add the green dress to cart', () => {
	cy.fixture('womenTopsPage').then((womenTopsPage) => {
		cy.clickElement(womenTopsPage.addToCartBtn);
		
	});
});

When('I click Continue Shopping', () => {
	cy.fixture('womenTopsPage').then((womenTopsPage) => {
		cy.clickElement(womenTopsPage.continueBtn);
	});
});

When('I select the Summer White Top', () => {
	cy.fixture('womenTopsPage').then((womenTopsPage) => {
		cy.scrollandClick(womenTopsPage.womenDropdown);
		cy.clickElement(womenTopsPage.topsLink);
		cy.scrollandClick(womenTopsPage.selectWhiteDress);
	});
});

When('I add the white dress to cart', () => {
	cy.fixture('womenTopsPage').then((womenTopsPage) => {
		cy.clickElement(womenTopsPage.addToCartBtn);
	});
});

When('I click view cart', () => {
	cy.fixture('womenTopsPage').then((womenTopsPage) => {
		cy.clickElement(womenTopsPage.viewCart);
	});
});

When('I click Proceed to checkout', () => {
	cy.fixture('cartPage').then((cartPage) => {
		cy.clickElement(cartPage.checkoutBtn);
	});
});

When('I add comment', () => {
	cy.fixture('cartPage').then((cartPage) => {
		cy.get(cartPage.commentField).scrollIntoView().type(cartPage.comment);
	});
});

When('I click on Place Order', () => {
	cy.fixture('cartPage').then((cartPage) => {
		cy.clickElement(cartPage.checkoutBtn);
	});
});

When('enter card details', () => {
	cy.fixture('paymentPage').then((paymentPage) => {
		cy.typeAText(paymentPage.cardNameField, Cypress.env("cardName"));
		cy.typeAText(paymentPage.cardNumberField, Cypress.env("cardNumber"));
		cy.typeAText(paymentPage.cvcField, Cypress.env("cvc"));
		cy.typeAText(paymentPage.mnthField, Cypress.env("mnth"));
		cy.typeAText(paymentPage.yearField, Cypress.env("year"));		
	});
});

When('I click Pay and Confirm Order', () => {
	cy.fixture('paymentPage').then((paymentPage) => {
		cy.clickElement(paymentPage.confirmBtn);
	});
});

Then('I should get confirmation that order is placed', () => {
	cy.fixture('paymentPage').then((paymentPage) => {
		cy.visibiltyOfElement(paymentPage.confirmHeader);
		cy.textPresent(paymentPage.confirmHeader, 'Order Placed!')
		cy.textPresent(paymentPage.confirmMsg, 'Congratulations! Your order has been confirmed!')
	});
});
