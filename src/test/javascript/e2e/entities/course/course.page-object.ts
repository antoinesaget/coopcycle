import { element, by, ElementFinder } from 'protractor';

export class CourseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-course div table .btn-danger'));
  title = element.all(by.css('jhi-course div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CourseUpdatePage {
  pageTitle = element(by.id('jhi-course-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  stateSelect = element(by.id('field_state'));
  deliveryStateSelect = element(by.id('field_deliveryState'));
  prepTimeInput = element(by.id('field_prepTime'));
  deliveryTimeInput = element(by.id('field_deliveryTime'));
  deliveryDetailsInput = element(by.id('field_deliveryDetails'));

  cartSelect = element(by.id('field_cart'));
  restaurantSelect = element(by.id('field_restaurant'));
  delivererSelect = element(by.id('field_deliverer'));
  clientSelect = element(by.id('field_client'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setStateSelect(state: string): Promise<void> {
    await this.stateSelect.sendKeys(state);
  }

  async getStateSelect(): Promise<string> {
    return await this.stateSelect.element(by.css('option:checked')).getText();
  }

  async stateSelectLastOption(): Promise<void> {
    await this.stateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setDeliveryStateSelect(deliveryState: string): Promise<void> {
    await this.deliveryStateSelect.sendKeys(deliveryState);
  }

  async getDeliveryStateSelect(): Promise<string> {
    return await this.deliveryStateSelect.element(by.css('option:checked')).getText();
  }

  async deliveryStateSelectLastOption(): Promise<void> {
    await this.deliveryStateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setPrepTimeInput(prepTime: string): Promise<void> {
    await this.prepTimeInput.sendKeys(prepTime);
  }

  async getPrepTimeInput(): Promise<string> {
    return await this.prepTimeInput.getAttribute('value');
  }

  async setDeliveryTimeInput(deliveryTime: string): Promise<void> {
    await this.deliveryTimeInput.sendKeys(deliveryTime);
  }

  async getDeliveryTimeInput(): Promise<string> {
    return await this.deliveryTimeInput.getAttribute('value');
  }

  async setDeliveryDetailsInput(deliveryDetails: string): Promise<void> {
    await this.deliveryDetailsInput.sendKeys(deliveryDetails);
  }

  async getDeliveryDetailsInput(): Promise<string> {
    return await this.deliveryDetailsInput.getAttribute('value');
  }

  async cartSelectLastOption(): Promise<void> {
    await this.cartSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cartSelectOption(option: string): Promise<void> {
    await this.cartSelect.sendKeys(option);
  }

  getCartSelect(): ElementFinder {
    return this.cartSelect;
  }

  async getCartSelectedOption(): Promise<string> {
    return await this.cartSelect.element(by.css('option:checked')).getText();
  }

  async restaurantSelectLastOption(): Promise<void> {
    await this.restaurantSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async restaurantSelectOption(option: string): Promise<void> {
    await this.restaurantSelect.sendKeys(option);
  }

  getRestaurantSelect(): ElementFinder {
    return this.restaurantSelect;
  }

  async getRestaurantSelectedOption(): Promise<string> {
    return await this.restaurantSelect.element(by.css('option:checked')).getText();
  }

  async delivererSelectLastOption(): Promise<void> {
    await this.delivererSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async delivererSelectOption(option: string): Promise<void> {
    await this.delivererSelect.sendKeys(option);
  }

  getDelivererSelect(): ElementFinder {
    return this.delivererSelect;
  }

  async getDelivererSelectedOption(): Promise<string> {
    return await this.delivererSelect.element(by.css('option:checked')).getText();
  }

  async clientSelectLastOption(): Promise<void> {
    await this.clientSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async clientSelectOption(option: string): Promise<void> {
    await this.clientSelect.sendKeys(option);
  }

  getClientSelect(): ElementFinder {
    return this.clientSelect;
  }

  async getClientSelectedOption(): Promise<string> {
    return await this.clientSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CourseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-course-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-course'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
