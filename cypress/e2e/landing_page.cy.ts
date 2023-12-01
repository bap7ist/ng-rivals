describe('The Landing Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:4200');
  });

  cy.get('#ashak-gif').should('exist').click();
  it('should go to the gameplay page', () => {});
});
