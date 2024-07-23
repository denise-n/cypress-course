describe('Fundamentals test', () => {
  beforeEach(() => {
    cy.visit('/fundamentals');
  });

  it('Contains correct header text', () => {
    cy.get('[data-test=fundamentals-header]').contains(/Testing Fundamentals/i);
  });

  it('contains accordion that works correctly', () => {
    cy.contains(/Your tests will exist in a/i).should('not.be.visible');
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click();
    cy.contains(/Your tests will exist in a/i).should('be.visible');
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click();
    cy.contains(/Your tests will exist in a/i).should('not.be.visible');
  });
});
