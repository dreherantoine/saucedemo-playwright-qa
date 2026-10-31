import { test, expect } from '../fixtures/base';
import { CartPage } from '../pages/CartPage';

test('TC-CART-001 - Cart badge shows the right number', { tag: '@regression' }, async ({ inventoryPage, page }) => {
    // Preconditions
    const cartPage = new CartPage(page);
    await inventoryPage.addToCartButton('sauce-labs-backpack').click();
    await inventoryPage.addToCartButton('sauce-labs-bike-light').click();
    await inventoryPage.cartLink.click();

    // Expected result
    await expect(cartPage.cartBadge).toHaveText('2');
    await expect(cartPage.items).toHaveCount(2);
    await expect(cartPage.itemNames.first()).toHaveText('Sauce Labs Backpack');
    await expect(cartPage.itemNames.last()).toHaveText('Sauce Labs Bike Light');
});

test('TC-CART-002 - Remove an item from the cart', { tag: '@regression' }, async ({ inventoryPage, page }) => {
    // Preconditions
    const cartPage = new CartPage(page);
    await inventoryPage.addToCartButton('sauce-labs-backpack').click();
    await inventoryPage.addToCartButton('sauce-labs-bike-light').click();
    await inventoryPage.cartLink.click();

    // Steps
    await cartPage.removeFromCart('sauce-labs-backpack');

    // Expected result
    await expect(cartPage.cartBadge).toHaveText('1');
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.itemNames.first()).toHaveText('Sauce Labs Bike Light');
});

test('TC-CART-003 - Item is still there when you return to the cart', { tag: '@regression' }, async ({ inventoryPage, page }) => {
    // Preconditions
    const cartPage = new CartPage(page);
    await inventoryPage.addToCartButton('sauce-labs-backpack').click();
    await inventoryPage.cartLink.click();

    // Steps
    await cartPage.continueShoppingButton.click();
    await inventoryPage.cartLink.click();

    // Expected result
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.cartBadge).toHaveText('1');
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.itemNames.first()).toHaveText('Sauce Labs Backpack');
});

