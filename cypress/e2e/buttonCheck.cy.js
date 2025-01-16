import HomePage from "../page-objects/pages/HomePage";
describe("Button check Test", () => {
  const elementsToCheck = {
    "Guest log in": "button.-guest",
    About: "button.btn.header-link",
    Contacts: "button.btn.header-link",
    Home: "a.btn.header-link",
  };

  const links = {
    "https://ithillel.ua": {
      text: "ithillel.ua",
      className: "display-4",
    },
    "mailto:developer@ithillel.ua": {
      text: "support@ithillel.ua",
      className: "h4",
    },
  };
  beforeEach(() => {
    HomePage.openPage();
  });

  it("should check header buttons", () => {
    cy.get("header").within(() => {
      cy.get("button.header_signin").should("exist").and("be.visible");

      Object.entries(elementsToCheck).forEach(([text, selector]) => {
        cy.get(selector)
          .should("contain.text", text)
          .and("exist")
          .and("be.visible");
      });
    });
    cy.get("button.btn-primary")
      .should("contain.text", "Sign up")
      .and("exist")
      .and("be.visible");
  });

  it("should check footer buttons", () => {
    cy.get(".contacts_socials.socials")
      .find("a.socials_link")
      .should("have.length", 5)
      .each(($el) => {
        cy.wrap($el)
          .should("exist")
          .and("have.attr", "href")
          .and("not.be.empty");
      });

    Object.entries(links).forEach(([href, { text, className }]) => {
      cy.get(`a.contacts_link[href="${href}"]`)
        .should("have.attr", "href", href)
        .should("be.visible")
        .should("not.be.empty")
        .should("have.class", className)
        .and(($el) => {
          expect($el.text()).to.equal(text);
        });
    });
  });
});
