describe('The Landing Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:4200');
  });

  it('should open the 8th Ashak page', () => {
    cy.get('[data-testid="actu-0"]').invoke('removeAttr', 'target').click();

    // Wait for the new window to be opened
    cy.window().its('length').should('be.gt', 1);

    // Switch to the new window
    cy.window().then(newWindow => {
      // Assert that the new page has loaded, for example, by checking the URL or content
      cy.wrap(newWindow).url().should('include', '/ashak-page-8'); // Adjust the expected URL as needed
    });

    // Switch back to the original window if needed
    cy.window().then(originalWindow => {
      cy.wrap(originalWindow).focus();
    });
  });
});
