import { expect, test } from '@playwright/test';

test.describe('Cart tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Zezwól na wszystkie' }).click();
    await page.getByRole('link', { name: 'sklep ' }).click();
    await page.locator('.hover-img > a').first().click();
    await page.getByLabel('Szerokość').selectOption('150');
    await page.waitForTimeout(3000);

  });

  test('Checking whether the quantity of the product in the cart has increased by 1', async ({ page }) => {
    //Act:
    await page.getByRole('button', { name: 'Dodaj do koszyka' }).click();
    await page.getByRole('link', { name: 'Zobacz koszyk' }).click();
    //Assert:
    await expect(page.getByLabel('Ilość produktu')).toHaveValue('1');
  });

  test('Cart icon has a visible 1 item icon after adding product', async ({ page }) => {
    //Act:
    await page.getByRole('button', { name: 'Dodaj do koszyka' }).click();
    //Assert:
    await expect(page.locator('.wd-cart-number.wd-tools-count:visible')).toHaveText('1 element');
  });

  test('Product subtotal is visible in the top right corner of the page after adding a product to the cart', async ({ page }) => {
    //Arrange
    const initialSubtotal = '0,00 ZŁ';
    //Act:
    await page.getByRole('button', { name: 'Dodaj do koszyka' }).click();
    await page.locator('.wd-close-side').click();
    //Assert:
    await expect(page.locator('.wd-cart-number.wd-tools-count:visible')).not.toHaveText(initialSubtotal);
  });

  test('Successful removing item from a cart', async ({ page }) => {
    // Arrange:
    const messageText = 'Twój koszyk aktualnie jest pusty.';
    //Act:
    await page.getByRole('button', { name: 'Dodaj do koszyka' }).click();
    await page.getByRole('link', { name: 'Zobacz koszyk' }).click();
    await page.getByRole('cell', { name: 'Usuń Szafka RTV Rosto z' }).click();

    //Assert:
    await expect(page.locator('.wc-empty-cart-message')).toHaveText(messageText);
  });

  test('Checking the price within cart after adding two items and expected message', async ({ page }) => {
    //Arrange:
    const expectedMessage = 'Koszyk zaktualizowany.';
    // Act:
    await page.getByRole('button', { name: 'Dodaj do koszyka' }).click();
    await page.getByRole('link', { name: 'Zobacz koszyk' }).click();

    const initialValue = await page.locator('[data-title="Cena"]').innerText();
    const expectedValue = `${parseInt(initialValue) * 2},00 zł`;

    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: 'Zaktualizuj koszyk' }).click();
    //Assert:
    await expect(page.locator('.product-subtotal[data-title="Kwota"]')).toHaveText(`${expectedValue}`);
    await expect(page.locator('.woocommerce-message')).toHaveText(expectedMessage);
  });

  test('Edge case - negative test - when choosing -1 quantity of product in the cart', async ({ page }) => {
    //Act:
    await page.getByRole('button', { name: 'Dodaj do koszyka' }).click();
    await page.getByRole('link', { name: 'Zobacz koszyk' }).click();
    const numberInput = await page.getByLabel('Ilość produktu');
    await numberInput.fill('-1');
    await numberInput.blur();
    await page.getByRole('button', { name: 'Zaktualizuj koszyk' }).click();
    const input = await page.getByLabel('Ilość produktu');
    const errorMessage = await input.evaluate((i: HTMLInputElement) => i.validationMessage);
    const expectedErrorMessage = 'Value must be greater than or equal to 0.';

    //Assert:
    await expect(page.getByLabel('Ilość produktu')).toHaveValue('-1');
    await expect(errorMessage).toBe(expectedErrorMessage);
  });

  test('Comparison initial price with the price after changing product option', async ({ page }) => {
    //Arrange:
    const initialPrice = await page.locator('.woocommerce-variation-price').innerText();
    //Act:
    await page.getByLabel('Szerokość').selectOption('180');
    await page.waitForTimeout(3000);
    const priceAfterChange = await page.locator('.woocommerce-variation-price').innerText();
    //Assert:
    await expect(initialPrice).not.toBe(priceAfterChange);
  });

  test('Testing of product removal from a cart and returning item to cart', async ({ page }) => {
    //Act:
    await page.getByRole('button', { name: 'Dodaj do koszyka' }).click();
    await page.getByRole('link', { name: 'Zobacz koszyk' }).click();
    await page.getByLabel('Usuń Szafka RTV Rosto z').click();
    await page.getByRole('link', { name: 'Cofnij?' }).click();
    //Assert:
    await expect(page.locator('.woocommerce-cart-form__cart-item.cart_item')).toBeVisible();
  });

  test('Cart summary - checking the values of total cost, cost of delivery and product price', async ({ page }) => {
    //Act:
    const totalInt = 4860;
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Dodaj do koszyka' }).click();
    await page.getByRole('link', { name: 'Zobacz koszyk' }).click();
    const totalCost = await page.locator('.order-total [data-title="Łącznie"]').innerText();
    const priceOfProduct = await page.locator('.cart-subtotal [data-title="Kwota"]').innerText();
    // Assert:
    await expect(priceOfProduct).not.toBe(totalCost);
    await expect(parseInt(totalCost)).toBe(totalInt);
  });
});

