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
    cy.wait(100);
    cy.contains(/Successfully subbed: /i).should('exist');
    cy.wait(3000);
    cy.contains(/Successfully subbed: /i).should('not.exist');

    // invalid email
    cy.get('@subscribe-input').clear().type('invalid@invalid');
    cy.getDataTest('forms-subscribe-button').click();
    cy.wait(100);
    cy.contains(/Invalid email/i).should('exist');
    cy.wait(3000);
    cy.contains(/Invalid email/i).should('not.exist');

    // no email
    cy.get('@subscribe-input').clear();
    cy.contains(/fail!/i).should('not.exist');
    cy.getDataTest('forms-subscribe-button').click();
    cy.wait(100);
    cy.contains(/fail!/i).should('exist');
  });
});
