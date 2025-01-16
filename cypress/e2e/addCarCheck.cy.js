import HomePage from "../page-objects/pages/HomePage";
import AddCarForm from "../page-objects/forms/addCarForm";

describe("Add car form", () => {
  let testData;
  beforeEach(() => {
    HomePage.openPage();
    HomePage.openSignInForm();
    cy.login(Cypress.env("MAIN_USER_EMAIL"), Cypress.env("MAIN_USER_PASSWORD"));
    cy.fixture("data").then((data) => {
      testData = data;
    });
  });

  it("Success add car", () => {
    const brand = testData.brands[0];
    const model = brand.models[3];
    cy.get("h1").should("have.text", "Garage");
    AddCarForm.openAddCarForm();
    AddCarForm.selectCarBrand(brand.name);
    AddCarForm.selectCarModel(model);
    AddCarForm.enterCarMileage(testData.carMileage);
    AddCarForm.clickAddButton();
  });

  it("Add car without mileage", () => {
    const brand = testData.brands[1];
    const model = brand.models[2];
    cy.get("h1").should("have.text", "Garage");
    AddCarForm.openAddCarForm();
    AddCarForm.selectCarBrand(brand.name);
    AddCarForm.selectCarModel(model);
    AddCarForm.triggerEmptyErrorMessageByMileageField();
    AddCarForm.verifyFieldErrorByText("Mileage cost required");
    AddCarForm.addButton.should("be.disabled");
  });

  it("Canceled to Add car", () => {
    const brand = testData.brands[2];
    const model = brand.models[2];
    cy.get("h1").should("have.text", "Garage");
    AddCarForm.openAddCarForm();
    AddCarForm.selectCarBrand(brand.name);
    AddCarForm.selectCarModel(model);
    AddCarForm.enterCarMileage(testData.carMileage);
    AddCarForm.clickCancelButton();
    cy.url().should("eq", "https://qauto.forstudy.space/panel/garage");
  });
});
