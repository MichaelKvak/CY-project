class HomePage {
  get signUpButton() {
    return cy.get("button.btn-primary");
  }
  openPage() {
    cy.visit("/");
  }
  openSignUpForm() {
    this.signUpButton.click();
  }
}

export default new HomePage();
