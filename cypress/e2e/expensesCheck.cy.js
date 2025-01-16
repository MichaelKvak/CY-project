import HomePage from "../page-objects/pages/HomePage";
import AddFuelExpense from "../page-objects/forms/expensesForm";

const today = new Date();
const formattedDate = `${today.getDate().toString().padStart(2, "0")}.${(
  today.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}.${today.getFullYear()}`;

describe("Add car expenses", () => {
  let testData;
  beforeEach(() => {
    HomePage.openPage();
    HomePage.openSignInForm();
    cy.login(Cypress.env("MAIN_USER_EMAIL"), Cypress.env("MAIN_USER_PASSWORD"));
    cy.fixture("data").then((data) => {
      testData = data;
    });
  });

  it("Success add expenses", () => {
    const brand = testData.addedCar[0];
    const mileage = brand.mileage[0];
    const liters = brand.liters[2];
    const total = brand.totalCost[2];

    cy.get("h1").should("have.text", "Garage");
    AddFuelExpense.openFuelExpenseForm();
    AddFuelExpense.selectVehicle(brand.name);
    AddFuelExpense.selectReportDate(formattedDate);
    AddFuelExpense.updateExpenseMileage();
    AddFuelExpense.enterNumberOfLiters(liters);
    AddFuelExpense.enterTotalCost(total);
    AddFuelExpense.clickAddButton();
  });

  it("Cancel add expenses", () => {
    const brand = testData.addedCar[0];
    const mileage = brand.mileage[0];
    const liters = brand.liters[2];
    const total = brand.totalCost[2];

    cy.get("h1").should("have.text", "Garage");
    AddFuelExpense.openFuelExpenseForm();
    AddFuelExpense.selectVehicle(brand.name);
    AddFuelExpense.selectReportDate(formattedDate);
    AddFuelExpense.updateExpenseMileage();
    AddFuelExpense.enterNumberOfLiters(liters);
    AddFuelExpense.enterTotalCost(total);
    AddFuelExpense.clickCancelButton();
    cy.url().should("eq", "https://qauto.forstudy.space/panel/garage");
  });

  it("Add expenses without mileage", () => {
    const brand = testData.addedCar[0];
    const mileage = brand.mileage[0];
    const liters = brand.liters[2];
    const total = brand.totalCost[2];

    cy.get("h1").should("have.text", "Garage");
    AddFuelExpense.openFuelExpenseForm();
    AddFuelExpense.selectVehicle(brand.name);
    AddFuelExpense.selectReportDate(formattedDate);
    AddFuelExpense.updateExpenseMileage();
    AddFuelExpense.enterNumberOfLiters(liters);
    AddFuelExpense.enterTotalCost(total);

    AddFuelExpense.triggerEmptyErrorMessageByMileageField();
    AddFuelExpense.verifyFieldErrorByText("Mileage required");
    AddFuelExpense.addButton.should("be.disabled");
  });

  it("Add expenses without liters", () => {
    const brand = testData.addedCar[0];
    const liters = brand.liters[2];
    const total = brand.totalCost[2];

    cy.get("h1").should("have.text", "Garage");
    AddFuelExpense.openFuelExpenseForm();
    AddFuelExpense.selectVehicle(brand.name);
    AddFuelExpense.selectReportDate(formattedDate);
    AddFuelExpense.updateExpenseMileage();
    AddFuelExpense.enterTotalCost(total);

    AddFuelExpense.triggerEmptyErrorMessageByNumberOfLiters();
    AddFuelExpense.verifyFieldErrorByText("Liters required");
    AddFuelExpense.addButton.should("be.disabled");
  });

  it("Add expenses without cost", () => {
    const brand = testData.addedCar[0];
    const mileage = brand.mileage[0];
    const liters = brand.liters[2];
    const total = brand.totalCost[2];

    cy.get("h1").should("have.text", "Garage");
    AddFuelExpense.openFuelExpenseForm();
    AddFuelExpense.selectVehicle(brand.name);
    AddFuelExpense.selectReportDate(formattedDate);
    AddFuelExpense.updateExpenseMileage();
    AddFuelExpense.enterNumberOfLiters(liters);

    AddFuelExpense.triggerEmptyErrorMessageByTotalCost();
    AddFuelExpense.verifyFieldErrorByText("Total cost required");
    AddFuelExpense.addButton.should("be.disabled");
  });
});
