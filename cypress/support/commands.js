/// <reference types="cypress" />
import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command';
import {calc} from '../support/utl'

addMatchImageSnapshotCommand({
    failureThreshold: 0.03, // threshold for entire image
    failureThresholdType: 'percent', // percent of image or number of pixels
    customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
    capture: 'viewport', // capture viewport in screenshot
});

/**
 * Clear search results
 * @returns {void}
 */
Cypress.Commands.add('clearResults', () => {
    cy.get('[id="clear"]').click();
    cy.get('[id="result"]').should('have.value','');
});

/**
 * Press given input and validate result display
 * @param {string} input
 * @returns {void}
 */
Cypress.Commands.add('pressNumberAndValidate', (input) =>{
    cy.get(`[value=${input}]`).click();
    cy.get('#result').should('have.value',input);
});


/**
 * @param {string} input1
 * @param {string} operator
 * @param {string} input2
 * @returns {void}
 */
Cypress.Commands.add('evaluate', (input1, operator, input2) => {
  // Press first input and validate result
  cy.get(`[value=${input1}]`).click();
  cy.get('#result').should('have.value',input1);

  /**
   * For multiplication value and display are different
   * added condition to manage difference
   */
  if (operator === 'x') {
      // Press operator
      cy.get(`[value="${operator}"]`).click();
      cy.get('#result').should('have.value',`${input1}*`);

      // Press the second input
      cy.get(`[value=${input2}]`).click();
      cy.get('#result').should('have.value',`${input1}*${input2}`);
  } else {
      cy.get(`[value="${operator}"]`).click();
      cy.get('#result').should('have.value',`${input1}${operator}`);

      cy.get(`[value=${input2}]`).click();
      cy.get('#result').should('have.value',`${input1}${operator}${input2}`);
  }

  // Press equal button to evaluate expression
  cy.get('[value="="]').click();

});


/**
 * @param {string} input1
 * @param {string} operator
 * @param {string} input2
 * @returns {void}
 */
 Cypress.Commands.add('evaluateDecimal', (input1, operator, input2) => {

      // Covert to array and Press each input
      [...input1].forEach((input)=> {
          cy.get(`[value="${input}"]`).click();
      })

      cy.get(`[value="${operator}"]`).click();

      // Covert to array and Press each input
      [...input2].forEach((input)=> {
        cy.get(`[value="${input}"]`).click();
      });
      // Press equal button to evaluate expression
      cy.get('[value="="]').click();
});


/**
 * @param {string} input1
 * @param {string} operator
 * @param {string} input2
 * @returns {void}
 */
Cypress.Commands.add('typeEval', (input1, operator, input2) => {
    if (operator === 'x') {
        cy.get('#result').type(`${input1}*${input2}`);
        cy.get('[value="="]').click();
        cy.get('#result').should('have.value',calc(input1,operator,input2));
        cy.clearResults();
    } else {
        cy.get('#result').type(`${input1}${operator}${input2}`);
        cy.get('[value="="]').click();
        cy.get('#result').should('have.value',calc(input1,operator,input2));
        cy.clearResults();
    }
});

