describe('Various example', () => {
  beforeEach(() => {
    cy.visit('/examples');
  });

  it('multi page testing', () => {
    cy.getDataTest('nav-why-cypress').click();
    cy.location('pathname').should('equal', '/');

    cy.getDataTest('nav-overview').click();
    cy.location('pathname').should('equal', '/overview');

    cy.getDataTest('nav-fundamentals').click();
    cy.location('pathname').should('equal', '/fundamentals');

    cy.getDataTest('nav-forms').click();
    cy.location('pathname').should('equal', '/forms');
  });

  it('intercepts', () => {
    cy.intercept('POST', 'http://localhost:3000/examples', {
      body: {
        message: 'successfully intercepted request',
      },

      // or using a fixture file
      //   fixture: 'example.json',
    });
    cy.getDataTest('post-button').click();
  });

  it.only('grudges', () => {
    // Grudge title exists
    cy.contains(/add some grudges/i).should('exist');

    // check list title
    cy.getDataTest('grudge-list-title').should('have.text', 'Add Some Grudges');

    // Grudge list has a length of 0
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 0);
    });

    // check that clear button does not exist
    cy.getDataTest('clear-grudge-button').should('not.exist');

    // Add grudge 1
    cy.getDataTest('grudge-input').within(() =>
      cy.get('input').type('grudge 1')
    );
    cy.getDataTest('add-grudge-button').click();

    // check length is now 1
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 1);
    });

    // check list title
    cy.getDataTest('grudge-list-title').should('have.text', 'Grudges');

    // add grudge 2
    cy.getDataTest('grudge-input').within(() =>
      cy.get('input').type('grudge 2')
    );
    cy.getDataTest('add-grudge-button').click();

    // check length is now 2
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 2);
      cy.get('li').its(0).should('contains.text', 'grudge 1');
    });

    // remove grudge 1 list item
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li')
        .its(0)
        .within(() => {
          cy.get('button').click();
        });
    });

    // check length is now 1
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 1);
    });

    // use clear button
    cy.getDataTest('clear-grudge-button').click();

    // check list length is 0
    cy.getDataTest('grudge-list').within(() => {
      cy.get('li').should('have.length', 0);
    });
  });
});
