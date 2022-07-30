describe('Calculator', () => {
  it('opens app', () => {
    cy.visit('index.html');
    cy.matchImageSnapshot('calculator-app');
  })
})