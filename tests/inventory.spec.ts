import { test, expect } from '../fixtures/base';

test('TC-INVENTORY-001 - Add item to cart', { tag: '@smoke' }, async ({ inventoryPage }) => {
    // Steps
    const product: string = 'sauce-labs-backpack';
    await inventoryPage.addToCartButton(product).click();

    // Expected result
    await expect(inventoryPage.removeFromCartButton(product)).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('TC-INVENTORY-002 - Remove item from cart', { tag: '@regression' }, async ({ inventoryPage }) => {
    // Preconditions
    const product: string = 'sauce-labs-backpack';
    await inventoryPage.addToCartButton(product).click();

    // Steps
    await inventoryPage.removeFromCartButton(product).click();

    // Expected result
    await expect(inventoryPage.addToCartButton(product)).toBeVisible();
    await expect(inventoryPage.cartBadge).toBeHidden();
});

test('TC-INVENTORY-003 - Sort price low to high', { tag: '@regression' }, async ({ inventoryPage }) => {
    // Steps
    await inventoryPage.sortDropdown.selectOption('lohi');

    // Expected result
    await expect(inventoryPage.itemNames.first()).toHaveText('Sauce Labs Onesie');
    await expect(inventoryPage.itemNames.last()).toHaveText('Sauce Labs Fleece Jacket');

    // Wait for something before to make sure the sort happened
    const prices = (await inventoryPage.itemPrices.allTextContents())
        .map(price => parseFloat(price.replace('$', '')));
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
});
