import {
  keys,
  operators,
  wholeNumbers1,
  wholeNumbers2,
  decimal1,
  decimal2
}  from '../fixtures/data'
import {calc} from '../support/utl'

describe('Calculator', () => {

    beforeEach(() => {
      cy.visit('index.html');
    });

    it('Has a visual state', () => {
      cy.get('h1')
        .contains('Calculator')
        .should('be.visible')
      cy.matchImageSnapshot('calculator-app');
    });

    it('Supports different viewport', () => {
        cy.viewport('ipad-2')
        cy.matchImageSnapshot('ipad-2-calculator-app');
        cy.viewport('ipad-mini')
        cy.matchImageSnapshot('ipad-mini-calculator-app');
        cy.viewport('iphone-6+')
        cy.matchImageSnapshot('iphone-6-calculator-app');
        cy.viewport('ipad-2', 'portrait')
        cy.matchImageSnapshot('ipad-2-portrait-calculator-app');
        cy.viewport('iphone-4', 'landscape')
        cy.matchImageSnapshot('iphone-4-landscape-calculator-app');
    });

    it('Displays values in the result based on key press', () => {
      cy.get('[class="container"]')
      .find('div')
      .each(($row, index1) => {
        cy.wrap($row)
        .children()
        .each(($el, index2) => {
          cy.wrap($el).click();
          cy.get('#result').should('have.value', keys[index1][index2]);
          cy.get('#clear').click();
        });
      })
    });

    /**
     * Below test validate for 4 different combinations for each operations
     */
    it('Evaluates arithmetic operations with whole numbers', () => {
        operators.forEach((operator) => {
          wholeNumbers1.forEach((input, i) => {
              cy.evaluate(input,operator,wholeNumbers2[i]);
              cy.get('#result').should('have.value',`${calc(input,operator,wholeNumbers2[i])}`);
              cy.clearResults();
          });
      });
    });

    it('Evaluates arithmetic operations with decimal & negative numbers', () => {
      operators.forEach((operator) => {
        decimal1.forEach((input, i) => {
            cy.evaluateDecimal(input,operator,decimal2[i]);
            cy.get('#result').should('have.value',`${calc(input,operator,decimal2[i])}`);
            cy.clearResults();
          });
      });
    });

    /**
     * Below tests input data entered directly to result field
     */
    it('Accepts keypad inputs', () => {
        cy.typeEval('3.5','x','10');
        cy.typeEval('-4','+','8');
        cy.typeEval('99.45','/','5.76');
        cy.typeEval('0.9868','-','347.23');
    });

    it('Evaluates order of operation', () => {

      // TODO - Improve the test to accept dynamic data
      cy.get('#five').click()
      cy.get('[value="-"]').click();
      cy.get('#five').click()
      cy.get('[value="."]').click();
      cy.get('#six').click()
      cy.get('#five').click()
      cy.get('[value="+"]').click();
      cy.get('#seven').click()
      cy.get('[value="x"]').click();
      cy.get('#three').click()
      cy.get('[value="+"]').click();
      cy.get('#one').click()
      cy.get('[value="/"]').click();
      cy.get('#eight').click()

      cy.get('[value="="]').click();

      cy.get('#result').should('have.value', '20.475');

    });

    it('Does not allow non numeric characters', () => {
        cy.get('#result').type("Hello!");
        cy.get('#result').should('have.value', ''); // input should accept only numeric value
    });

    it('Allows to enter negative value', () => {
        cy.get('[value="-"]').click();
        cy.get('#five').click()
        cy.get('#result').should('have.value', '-5');
    });

    it('Does not allow to enter operator in the beginning for expression', () => {
        cy.get('[value="x"]').click();
        cy.get('#result').should('have.value', '');
    });

    it('Does not allow to enter operator next to the operator in a expression', () => {
      cy.get('#five').click()
      cy.get('#result').should('have.value', '5');
      cy.get('[value="x"]').click();
      cy.get('#result').should('have.value', '5*');
      cy.get('[value="/"]').click();
      cy.get('#result').should('have.value', '5/');
    });

    // TODO - No character limit and need to fix length validation
    it.skip('Has character limit', () => {
      // Try enter 30 characters
      for(let i=0;i<30;i++){
        cy.get('#five').click()
      }
      cy.get('#result')
          .invoke('value')
          .then((value) => {
            expect(value).not.to.have.lengthOf(30);
          });
    });
});