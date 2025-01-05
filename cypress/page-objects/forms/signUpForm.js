class SignUpForm {
  get nameField() {
    return cy.get("#signupName");
  }

  get lastNameField() {
    return cy.get("#signupLastName");
  }

  get emailField() {
    return cy.get("#signupEmail");
  }
  get passwordField() {
    return cy.get("#signupPassword");
  }

  get repeatPasswordField() {
    return cy.get("#signupRepeatPassword");
  }

  get registerButton() {
    return cy.get(".modal-content .btn-primary");
  }

  get errorMessage() {
    return cy.get(".invalid-feedback p");
  }

  formatInput(input) {
    return input.trim().replace(/\s+/g, "");
  }

  enterName(name) {
    this.nameField.clear().type(this.formatInput(name));
  }

  enterLastName(lastName) {
    this.lastNameField.clear().type(this.formatInput(lastName));
  }

  enterEmail(email) {
    this.emailField.clear().type(this.formatInput(email));
  }

  enterPassword(password) {
    this.passwordField.clear().type(this.formatInput(password));
  }

  enterRepeatPassword(password) {
    this.repeatPasswordField.clear().type(this.formatInput(password));
  }

  clickRegisterButton() {
    this.registerButton.click();
  }

  triggerErrorMessageForField(field) {
    field.focus();
    field.blur();
  }
}

export default new SignUpForm();
