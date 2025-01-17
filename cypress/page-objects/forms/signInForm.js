class SignInForm {
  get emailField() {
    return cy.get("#signinEmail");
  }

  get passwordField() {
    return cy.get("#signinPassword");
  }

  get loginButton() {
    return cy.get(".modal-footer .btn-primary");
  }

  get wrongCredsErrorMessage() {
    return cy.contains(".alert-danger", "Wrong email or password");
  }

  triggerEmptyErrorMessageByField(fieldName) {
    const element =
      fieldName === "email" ? this.emailField : this.passwordField;
    element.focus();
    element.blur();
  }

  formatInput(input) {
    return input.trim().replace(/\s+/g, "");
  }

  enterEmail(email) {
    this.emailField.clear().type(this.formatInput(email));
  }

  enterPassword(password) {
    this.passwordField.clear().type(this.formatInput(password));
  }

  clickLogInButton() {
    this.loginButton.click();
  }

  verifyFieldErrorByText(text) {
    cy.contains(".invalid-feedback p", text).should("be.visible");
  }
}

export default new SignInForm();
