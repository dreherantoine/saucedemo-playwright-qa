import { test, expect } from '../fixtures/base';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { FIRST_NAME, LAST_NAME, POSTAL_CODE } from '../test-data/users';

test('TC-CHECKOUT-001 - Full purchase', { tag: '@smoke' }, async ({ inventoryPage, page }) => {
    // Preconditions
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await inventoryPage.addToCartButton('sauce-labs-backpack').click();
    await inventoryPage.cartLink.click();
    await expect(cartPage.cartBadge).toHaveText('1');

    // Steps
    await cartPage.checkoutButton.click();
    await checkoutPage.fillInformation(FIRST_NAME, LAST_NAME, POSTAL_CODE);
    await expect(checkoutPage.itemNames.first()).toHaveText('Sauce Labs Backpack');
    await checkoutPage.finishButton.click();

    // Expect
    await expect(checkoutPage.title).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutPage.cartBadge).toBeHidden();
});

test('TC-CHECKOUT-002 - Missing first name', { tag: '@regression' }, async ({ inventoryPage, page }) => {
    // Preconditions
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await inventoryPage.addToCartButton('sauce-labs-backpack').click();
    await inventoryPage.cartLink.click();
    await expect(cartPage.cartBadge).toHaveText('1');

    // Steps
    await cartPage.checkoutButton.click();
    await checkoutPage.fillInformation('', LAST_NAME, POSTAL_CODE);

    // Expect
    await expect(checkoutPage.title).toHaveText('Checkout: Your Information');
    await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
});

test('TC-CHECKOUT-003 - Total price is correct', { tag: '@regression' }, async ({ inventoryPage, page }) => {
    // Preconditions
    // Do recommendation number 5 from Claude
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await inventoryPage.addToCartButton('sauce-labs-backpack').click();
    await inventoryPage.addToCartButton('sauce-labs-bike-light').click();
    await inventoryPage.cartLink.click();
    await expect(cartPage.cartBadge).toHaveText('2');

    // Steps
    await cartPage.checkoutButton.click();
    await checkoutPage.fillInformation(FIRST_NAME, LAST_NAME, POSTAL_CODE);

    // Expect
    await expect(checkoutPage.title).toHaveText('Checkout: Overview');
    await expect(checkoutPage.itemNames.first()).toHaveText('Sauce Labs Backpack');
    await expect(checkoutPage.itemNames.last()).toHaveText('Sauce Labs Bike Light');
    await expect(checkoutPage.subtotal).toHaveText('Item total: $39.98');
    await expect(checkoutPage.tax).toHaveText('Tax: $3.20');
    await expect(checkoutPage.total).toHaveText('Total: $43.18');
});
