import { Locator, Page } from '@playwright/test';

export class SearchPage {
  searchInputField: Locator;
  searchInputFill: Locator;
  searchInputPressEnter: Locator;

  constructor(private page: Page) {
    this.searchInputField = this.page
      .locator('div')
      .filter({ hasText: 'Zacznij pisać aby zobaczyć produkty, których szukasz' })
      .getByPlaceholder('Wyszukaj produkty');

    this.searchInputFill = this.page
      .locator('div')
      .filter({ hasText: 'Zacznij pisać aby zobaczyć produkty, których szukasz' })
      .getByPlaceholder('Wyszukaj produkty');

    this.searchInputPressEnter = this.page
      .locator('div')
      .filter({ hasText: 'Zacznij pisać aby zobaczyć produkty, których szukasz' })
      .getByPlaceholder('Wyszukaj produkty');
  }

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
