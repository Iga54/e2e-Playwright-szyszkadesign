import { Locator, Page } from '@playwright/test';

export class ButtonPage {
  searchButton: Locator;
  constructor(private page: Page) {
    this.searchButton = this.page.getByRole('link', { name: 'Szukaj' });
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }
}
