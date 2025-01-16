import HomePage from "../page-objects/pages/HomePage";
import SignInForm from "../page-objects/forms/signInForm";

describe("Login form", () => {
  let testData;
  beforeEach(() => {
    HomePage.openPage();
    HomePage.openSignInForm();
    cy.fixture("data").then((data) => {
      testData = data;
    });
  });

  it("Success Sign in", () => {
    SignInForm.enterEmail(testData.correctEmail);
    SignInForm.enterPassword(testData.correctPassword);
    SignInForm.clickLogInButton();

    cy.get("h1").should("have.text", "Garage");
    cy.url().should("contain", "/garage");
  });

  it("Login button is disabled without email", () => {
    SignInForm.enterPassword(testData.password);
    SignInForm.loginButton.should("be.disabled");
  });

  it("Login button is disabled without password", () => {
    SignInForm.enterEmail(testData.email);
    SignInForm.loginButton.should("be.disabled");
  });

  it("Sign in with wrong credentials", () => {
    SignInForm.enterEmail(testData.email);
    SignInForm.enterPassword(testData.wrongPassword);
    SignInForm.clickLogInButton();
    SignInForm.wrongCredsErrorMessage.should("be.visible");
  });

  it("Error message is displayed with empty password", () => {
    SignInForm.enterEmail(testData.email);
    SignInForm.triggerEmptyErrorMessageByField("password");
    SignInForm.verifyFieldErrorByText("Password required");
  });

  it("Error message is displayed with empty email", () => {
    SignInForm.triggerEmptyErrorMessageByField("email");
    SignInForm.enterPassword(testData.password);
    SignInForm.verifyFieldErrorByText("Email required");
  });
});
