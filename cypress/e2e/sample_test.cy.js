describe("Sample Test", () => {
  it("should visit the example page", () => {
    cy.visit("https://example.cypress.io");
    cy.contains("Kitchen Sink").should("be.visible");
  });
});
