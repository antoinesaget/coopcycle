import { element, by, ElementFinder } from 'protractor';

export class DelivererComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-deliverer div table .btn-danger'));
  title = element.all(by.css('jhi-deliverer div h2#page-heading span')).first();
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

export class DelivererUpdatePage {
  pageTitle = element(by.id('jhi-deliverer-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  currentPositionInput = element(by.id('field_currentPosition'));
  transportTypeInput = element(by.id('field_transportType'));
  statusSelect = element(by.id('field_status'));

  accountSelect = element(by.id('field_account'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCurrentPositionInput(currentPosition: string): Promise<void> {
    await this.currentPositionInput.sendKeys(currentPosition);
  }

  async getCurrentPositionInput(): Promise<string> {
    return await this.currentPositionInput.getAttribute('value');
  }

  async setTransportTypeInput(transportType: string): Promise<void> {
    await this.transportTypeInput.sendKeys(transportType);
  }

  async getTransportTypeInput(): Promise<string> {
    return await this.transportTypeInput.getAttribute('value');
  }

  async setStatusSelect(status: string): Promise<void> {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect(): Promise<string> {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption(): Promise<void> {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async accountSelectLastOption(): Promise<void> {
    await this.accountSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async accountSelectOption(option: string): Promise<void> {
    await this.accountSelect.sendKeys(option);
  }

  getAccountSelect(): ElementFinder {
    return this.accountSelect;
  }

  async getAccountSelectedOption(): Promise<string> {
    return await this.accountSelect.element(by.css('option:checked')).getText();
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

export class DelivererDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-deliverer-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-deliverer'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
