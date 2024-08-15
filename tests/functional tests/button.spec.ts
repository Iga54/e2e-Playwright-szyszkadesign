import { expect, test } from '@playwright/test';
import { ButtonPage } from '../../pages/button.page';

test.describe('Testing search button reactions', () => {
  let buttonPage: ButtonPage;
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Zezwól na wszystkie' }).click();
    await page.waitForTimeout(3000);
    buttonPage = new ButtonPage(page);
  });

  test('Checking the visibility of search button for user', async ({ page }) => {
    //Act:
    await buttonPage.clickSearchButton();
    //Assert:
    await expect(page.locator('.wd-inited')).toBeVisible();
  });

  test('Search button is not disabled', async ({ page }) => {
    //Act:
    await buttonPage.clickSearchButton();
    //Assert:
    await expect(page.locator('.wd-inited')).not.toBeDisabled();
  });


  test('Verifying accessibility of search icon', async ({ page }) => {
    //Act:
    await buttonPage.clickSearchButton();
    //Assert:
    await expect(page.locator('.wd-inited[aria-label="Szukaj"]')).toHaveAccessibleName('Szukaj');
  });
});
