const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/user-page');
const { InventoryPage } = require('../pages/inventory-page');
const userData = require('../test-data/user-data');
require('dotenv').config();

test.describe('SauceDemo Bug Validation Suite', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(userData.username, userData.password);

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('Validate back navigation behavior after login', async ({ page }) => {
    await page.goBack();

    await expect(page).not.toHaveURL(process.env.BASE_URL);
  });


  test('Validate product sorting persistence after page refresh', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortDropdown.selectOption('za');
    await page.reload();

    const selected = await inventoryPage.sortDropdown.inputValue();
    expect(selected).toBe('za');
  });

test('Validate cart reset updates Add to Cart button state', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);


    await inventoryPage.addToCartButtons.first().click();
    await expect(inventoryPage.cartBadge).toBeVisible();

   
    const removeButton = page.locator('button[id^="remove"]').first();
    await expect(removeButton).toBeVisible();

    await inventoryPage.resetCart();

    await expect(inventoryPage.cartBadge).toHaveCount(0);
    await expect(inventoryPage.addToCartButtons.first()).toBeVisible();
    await expect(removeButton).not.toBeVisible(); 
  });

  test('Validate product titles do not contain code patterns', async ({ page }) => {
    const productTitles = page.locator('[data-test="inventory-item-name"]');
    
    await expect(productTitles).not.toContainText(/\.\w+\(\)/);
    await expect(productTitles).not.toContainText('<');
    await expect(productTitles).not.toContainText('>');
  });

  test('Validate product descriptions do not contain code patterns', async ({ page }) => {
    const productDescriptions = page.locator('[data-test="inventory-item-desc"]');
    
    await expect(productDescriptions).not.toContainText(/\.\w+\(\)/);
    await expect(productDescriptions).not.toContainText('<');
    await expect(productDescriptions).not.toContainText('>');
  });

test('Validate Privacy Policy navigation from footer', async ({ page }) => {
  const privacyLink = page.locator('text=Privacy Policy');

  await expect(privacyLink).toHaveAttribute('href');
});

});