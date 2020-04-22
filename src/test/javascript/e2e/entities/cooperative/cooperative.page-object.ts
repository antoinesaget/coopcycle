import { element, by, ElementFinder } from 'protractor';

export class CooperativeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cooperative div table .btn-danger'));
  title = element.all(by.css('jhi-cooperative div h2#page-heading span')).first();
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

export class CooperativeUpdatePage {
  pageTitle = element(by.id('jhi-cooperative-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  geographicalAreaInput = element(by.id('field_geographicalArea'));

  dgSelect = element(by.id('field_dg'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setGeographicalAreaInput(geographicalArea: string): Promise<void> {
    await this.geographicalAreaInput.sendKeys(geographicalArea);
  }

  async getGeographicalAreaInput(): Promise<string> {
    return await this.geographicalAreaInput.getAttribute('value');
  }

  async dgSelectLastOption(): Promise<void> {
    await this.dgSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async dgSelectOption(option: string): Promise<void> {
    await this.dgSelect.sendKeys(option);
  }

  getDgSelect(): ElementFinder {
    return this.dgSelect;
  }

  async getDgSelectedOption(): Promise<string> {
    return await this.dgSelect.element(by.css('option:checked')).getText();
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

export class CooperativeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cooperative-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cooperative'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
