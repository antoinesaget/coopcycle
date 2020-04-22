import { element, by, ElementFinder } from 'protractor';

export class PaymentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-payment div table .btn-danger'));
  title = element.all(by.css('jhi-payment div h2#page-heading span')).first();
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

export class PaymentUpdatePage {
  pageTitle = element(by.id('jhi-payment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  stateSelect = element(by.id('field_state'));
  methodSelect = element(by.id('field_method'));

  courseSelect = element(by.id('field_course'));

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

  async setMethodSelect(method: string): Promise<void> {
    await this.methodSelect.sendKeys(method);
  }

  async getMethodSelect(): Promise<string> {
    return await this.methodSelect.element(by.css('option:checked')).getText();
  }

  async methodSelectLastOption(): Promise<void> {
    await this.methodSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async courseSelectLastOption(): Promise<void> {
    await this.courseSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async courseSelectOption(option: string): Promise<void> {
    await this.courseSelect.sendKeys(option);
  }

  getCourseSelect(): ElementFinder {
    return this.courseSelect;
  }

  async getCourseSelectedOption(): Promise<string> {
    return await this.courseSelect.element(by.css('option:checked')).getText();
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

export class PaymentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-payment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-payment'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
