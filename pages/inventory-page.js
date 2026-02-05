class InventoryPage {
  constructor(page) {
    this.page = page;
    
    // Locators for inventory items
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.productDescriptions = page.locator('[data-test="inventory-item-description"]');
    
    // Sort dropdown
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    
    // Cart related
    this.addToCartButtons = page.locator('button[id^="add-to-cart"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    
    // Menu for reset
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
  }

  async resetCart() {
    await this.hamburgerMenu.click();
    await this.resetAppStateLink.click();
  }
}

module.exports = { InventoryPage };