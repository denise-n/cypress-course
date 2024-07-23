describe('Forms tests', () => {
  beforeEach(() => {
    cy.visit('/forms');
  });

  it('Tests subscribe form', () => {
    cy.contains(/testing forms/i);

    // Aliases
    cy.getDataTest('forms-subscribe-input').find('input').as('subscribe-input');

    // valid email
    cy.get('@subscribe-input').type('email@email.com');
    cy.contains(/Successfully subbed: /i).should('not.exist');
    cy.getDataTest('forms-subscribe-button').click();
    cy.contains(/Successfully subbed: /i).should('exist');
    cy.wait(3000);
    cy.contains(/Successfully subbed: /i).should('not.exist');
  });
});
