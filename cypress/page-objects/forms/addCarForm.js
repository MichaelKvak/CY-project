class AddCarForm {
  get carBrandField() {
    return cy.get("#addCarBrand");
  }

  get carModelField() {
    return cy.get("#addCarModel");
  }

  get carMileageField() {
    return cy.get("#addCarMileage");
  }

  get addButton() {
    return cy.get(".modal-footer .btn-primary");
  }

  get cancelButton() {
    return cy.get(".modal-footer .btn-secondary");
  }

  get addCarButton() {
    return cy.get(".panel-page_heading .btn-primary");
  }

  openAddCarForm() {
    this.addCarButton.click();
  }

  formatInput(input) {
    return input.trim().replace(/\s+/g, "");
  }

  enterCarMileage(mileage) {
    this.carMileageField.clear().type(mileage);
  }

  clickAddButton() {
    this.addButton.click();
  }

  clickCancelButton() {
    this.cancelButton.click();
  }

  selectCarBrand(brand) {
    this.carBrandField.select(brand);
  }

  selectCarModel(model) {
    this.carModelField.select(model);
  }

  verifyFieldErrorByText(text) {
    cy.contains(".invalid-feedback p", text).should("be.visible");
  }

  triggerEmptyErrorMessageByMileageField(fieldName) {
    this.carMileageField.focus();
    this.carMileageField.blur();
  }
}

export default new AddCarForm();
