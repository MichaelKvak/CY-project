import HomePage from "../page-objects/pages/HomePage";
import SignUpForm from "../page-objects/forms/signUpForm";

describe("Sign Up check Test", () => {
  let testData;
  const randomEmail = `test_${Date.now()}@example.com`;
  beforeEach(() => {
    HomePage.openPage();
    HomePage.openSignUpForm();
    cy.fixture("data").then((data) => {
      testData = data;
    });
  });

  it("Should check Sign Up modal header", () => {
    cy.get(".modal-header")
      .should("contain.text", "Registration")
      .and("exist")
      .and("be.visible");
  });

  it("Should check Sign Up with empty, wrong data, wrong length of Name field", () => {
    SignUpForm.triggerErrorMessageForField(SignUpForm.nameField);
    SignUpForm.errorMessage.should("contain", "Name required");
    SignUpForm.enterName(testData.invalidName);
    SignUpForm.errorMessage.should("contain", "Name is invalid");
    SignUpForm.enterName(testData.wrongLengthName);
    SignUpForm.errorMessage.should(
      "contain",
      "Name has to be from 2 to 20 characters long"
    );
    SignUpForm.enterLastName(testData.lastName);
    SignUpForm.enterEmail(testData.email);
    SignUpForm.enterPassword(testData.password);
    SignUpForm.enterRepeatPassword(testData.repeatPasswordSuccess);
    SignUpForm.registerButton.should("be.disabled");
  });

  it("Should check Sign Up with empty, wrong data, wrong length of Last Name field", () => {
    SignUpForm.enterName(testData.name);
    SignUpForm.triggerErrorMessageForField(SignUpForm.lastNameField);
    SignUpForm.errorMessage.should("contain", "Last name required");
    SignUpForm.enterLastName(testData.invalidLastName);
    SignUpForm.errorMessage.should("contain", "Last name is invalid");
    SignUpForm.enterLastName(testData.wrongLengthLastName);
    SignUpForm.errorMessage.should(
      "contain",
      "Last name has to be from 2 to 20 characters long"
    );
    SignUpForm.enterEmail(testData.email);
    SignUpForm.enterPassword(testData.password);
    SignUpForm.enterRepeatPassword(testData.repeatPasswordSuccess);
    SignUpForm.registerButton.should("be.disabled");
  });

  it("Should check Sign Up with empty, wrong data of Email field", () => {
    SignUpForm.enterName(testData.name);
    SignUpForm.enterLastName(testData.lastName);
    SignUpForm.triggerErrorMessageForField(SignUpForm.emailField);
    SignUpForm.errorMessage.should("contain", "Email required");
    SignUpForm.enterEmail(testData.wrongEmail);
    SignUpForm.errorMessage.should("contain", "Email is incorrect");
    SignUpForm.enterPassword(testData.password);
    SignUpForm.enterRepeatPassword(testData.repeatPasswordSuccess);
    SignUpForm.registerButton.should("be.disabled");
  });

  it("Should check Sign Up with empty, wrong data of Password field", () => {
    SignUpForm.enterName(testData.name);
    SignUpForm.enterLastName(testData.lastName);
    SignUpForm.enterEmail(testData.email);
    SignUpForm.triggerErrorMessageForField(SignUpForm.passwordField);
    SignUpForm.errorMessage.should("contain", "Password required");
    SignUpForm.enterPassword(testData.wrongPassword);
    SignUpForm.errorMessage.should(
      "contain",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    SignUpForm.enterRepeatPassword(testData.repeatPasswordSuccess);
    SignUpForm.errorMessage.should(
      "contain",
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    SignUpForm.registerButton.should("be.disabled");
  });

  it("Should check Sign Up with empty, do not match data of Re-enter password field", () => {
    SignUpForm.enterName(testData.name);
    SignUpForm.enterLastName(testData.lastName);
    SignUpForm.enterEmail(testData.email);
    SignUpForm.enterPassword(testData.password);
    SignUpForm.triggerErrorMessageForField(SignUpForm.repeatPasswordField);
    SignUpForm.errorMessage.should("contain", "Re-enter password required");
    SignUpForm.enterRepeatPassword(testData.repeatPasswordWrong);
    SignUpForm.errorMessage.should("contain", "Passwords do not match");
    SignUpForm.registerButton.should("be.disabled");
  });

  it("Should check Sign Up with correct data", () => {
    cy.intercept("POST", "/api/auth/signup").as("signUpRequest");

    SignUpForm.enterName(testData.name);
    SignUpForm.enterLastName(testData.lastName);
    SignUpForm.enterEmail(randomEmail);
    SignUpForm.enterPassword(testData.password);
    SignUpForm.enterRepeatPassword(testData.repeatPasswordSuccess);
    SignUpForm.registerButton.should("not.be.disabled");
    SignUpForm.clickRegisterButton();

    cy.wait("@signUpRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      expect(interception.response.body.status).to.eq("ok");
    });

    cy.url().should("eq", "https://qauto.forstudy.space/panel/garage");
  });
});
