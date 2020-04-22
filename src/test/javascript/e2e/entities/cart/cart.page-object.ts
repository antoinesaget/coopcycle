import { element, by, ElementFinder } from 'protractor';

export class CartComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cart div table .btn-danger'));
  title = element.all(by.css('jhi-cart div h2#page-heading span')).first();
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

export class CartUpdatePage {
  pageTitle = element(by.id('jhi-cart-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  sateSelect = element(by.id('field_sate'));

  productsSelect = element(by.id('field_products'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSateSelect(sate: string): Promise<void> {
    await this.sateSelect.sendKeys(sate);
  }

  async getSateSelect(): Promise<string> {
    return await this.sateSelect.element(by.css('option:checked')).getText();
  }

  async sateSelectLastOption(): Promise<void> {
    await this.sateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productsSelectLastOption(): Promise<void> {
    await this.productsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productsSelectOption(option: string): Promise<void> {
    await this.productsSelect.sendKeys(option);
  }

  getProductsSelect(): ElementFinder {
    return this.productsSelect;
  }

  async getProductsSelectedOption(): Promise<string> {
    return await this.productsSelect.element(by.css('option:checked')).getText();
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

export class CartDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cart-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cart'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
