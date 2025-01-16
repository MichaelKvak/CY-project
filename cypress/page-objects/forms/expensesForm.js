class AddFuelExpense {
  get addFuelExpenseButton() {
    return cy.get(".car .car_add-expense");
  }

  get addExpenseCarField() {
    return cy.get("#addExpenseCar");
  }

  get reportDateField() {
    return cy.get("#addExpenseDate");
  }

  get addExpenseMileage() {
    return cy.get("#addExpenseMileage");
  }

  get addNumberOfLiters() {
    return cy.get("#addExpenseLiters");
  }

  get addTotalCost() {
    return cy.get("#addExpenseTotalCost");
  }

  get addButton() {
    return cy.get(".modal-footer .btn-primary");
  }

  get cancelButton() {
    return cy.get(".modal-footer .btn-secondary");
  }

  openFuelExpenseForm() {
    this.addFuelExpenseButton.first().click();
  }

  enterMileage(mileage) {
    this.addExpenseMileage.clear().type(mileage);
  }
  updateExpenseMileage() {
    this.addExpenseMileage.then(($input) => {
      const currentValue = Number($input.val());
      if (!isNaN(currentValue)) {
        const newValue = currentValue + 100;
        cy.wrap($input).clear().type(newValue.toString());
      }
    });
  }

  enterNumberOfLiters(liters) {
    this.addNumberOfLiters.clear().type(liters);
  }

  enterTotalCost(total) {
    this.addTotalCost.clear().type(total);
  }

  clickAddButton() {
    this.addButton.click();
  }

  clickCancelButton() {
    this.cancelButton.click();
  }

  selectVehicle(brand) {
    this.addExpenseCarField.select(brand);
  }

  selectReportDate(date) {
    this.reportDateField.clear().type(date);
  }

  verifyFieldErrorByText(text) {
    cy.contains(".invalid-feedback p", text).should("be.visible");
  }

  triggerEmptyErrorMessageByMileageField() {
    this.addExpenseMileage.clear();
    this.addExpenseMileage.focus();
    this.addExpenseMileage.blur();
  }
  triggerEmptyErrorMessageByNumberOfLiters() {
    this.addNumberOfLiters.focus();
    this.addNumberOfLiters.blur();
  }

  triggerEmptyErrorMessageByTotalCost() {
    this.addTotalCost.focus();
    this.addTotalCost.blur();
  }
}

export default new AddFuelExpense();
