class HomePage {
  get signUpButton() {
    return cy.get("button.btn-primary");
  }
  get signInButton() {
    return cy.get(".header_signin");
  }

  openSignInForm() {
    this.signInButton.click();
  }
  openPage() {
    cy.visit("/");
  }
  openSignUpForm() {
    this.signUpButton.click();
  }
}

export default new HomePage();
