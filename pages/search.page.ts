import { Page } from '@playwright/test';

export class SearchPage {
  constructor(private page: Page) {}

  searchInputField = this.page
    .locator('div')
    .filter({ hasText: 'Zacznij pisać aby zobaczyć produkty, których szukasz' })
    .getByPlaceholder('Wyszukaj produkty');

  searchInputFill = this.page
    .locator('div')
    .filter({ hasText: 'Zacznij pisać aby zobaczyć produkty, których szukasz' })
    .getByPlaceholder('Wyszukaj produkty');

  searchInputPressEnter = this.page
    .locator('div')
    .filter({ hasText: 'Zacznij pisać aby zobaczyć produkty, których szukasz' })
    .getByPlaceholder('Wyszukaj produkty');

  async clickSearchInputField() {
    await this.searchInputField.click();
  }

  async fillSearchInput() {
    await this.searchInputFill.fill('szafka RTV Kiko');
  }

  async pressSearchInput() {
    await this.searchInputPressEnter.press('Enter');
  }

  async fillSearchWrongInput() {
    await this.searchInputFill.fill('ławka');
  }
}
