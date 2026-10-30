import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly title: Locator;
    readonly items: Locator;
    readonly itemNames: Locator;
    readonly itemPrices: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    readonly sortDropdown: Locator;

    constructor (page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.items = page.getByTestId('inventory-item');
        this.itemNames = page.getByTestId('inventory-item-name');
        this.itemPrices = page.getByTestId('inventory-item-price');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.cartLink = page.getByTestId('shopping-cart-link');
        this.sortDropdown = page.getByTestId('product-sort-container');
    }

    addToCartButton(product: string) {
        return this.page.getByTestId(`add-to-cart-${product}`);
    }

    removeFromCartButton(product: string) {
        return this.page.getByTestId(`remove-${product}`);
    }
}
