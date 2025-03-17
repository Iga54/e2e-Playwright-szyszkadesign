import { expect, test } from '@playwright/test';
import { SearchPage } from '../../pages/search.page';

test.describe('Search tests', () => {
  let searchPage: SearchPage;
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Zezwól na wszystkie' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'Szukaj' }).click();
    searchPage = new SearchPage(page);
  });

  test('Displaying new website with product after searching for concrete product', async ({ page }) => {
    //Arrange:
    const URL = 'https://szyszkadesign.pl/produkt/szafka-rtv-kiko/';
    //Act:
    await searchPage.clickSearchInputField();
    await searchPage.fillSearchInput();
    await searchPage.pressSearchInput();
    //Assert:
    await expect(page).toHaveURL(URL);
  });

  test('Image of product is visible in search results', async ({ page }) => {
    //Act:
    await searchPage.clickSearchInputField();
    await searchPage.fillSearchInput();
    await searchPage.pressSearchInput();
    //Assert:
    await expect(page.locator('.zoomImg')).toBeVisible();
  });

  test('Negative test of searching item which does not exist on the page', async ({ page }) => {
    //Arrange:
    const expectedErrorMessage = 'Nie znaleziono produktów, których szukasz.';
    //Act:
    await searchPage.fillSearchWrongInput();
    await searchPage.pressSearchInput();
    //Assert:
    await expect(page.locator('.woocommerce-info')).toHaveText(expectedErrorMessage);
  });
});
