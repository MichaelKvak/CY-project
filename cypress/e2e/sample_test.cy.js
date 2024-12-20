describe("Sample Test", () => {
  it("should visit the example page", () => {
    cy.visit("https://example.cypress.io");
    cy.contains("Kitchen Sink").should("be.visible");
    cy.get("h2").contains("Commands").should("be.visible");
    cy.get("p")
      .invoke("text")
      .then((text) => {
        text =
          'Commands drive your tests in the browser like a real user would. They let you perform actions like typing, clicking, xhr requests, and can also assert things like "my button should be disabled".';
      });
  });
});
