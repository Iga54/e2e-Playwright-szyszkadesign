import { Page } from '@playwright/test';

export class ButtonPage {
  constructor(private page: Page) {}
  searchButton = this.page.getByRole('link', { name: 'Szukaj' });

  async clickSearchButton() {
    await this.searchButton.click();
  }
}
