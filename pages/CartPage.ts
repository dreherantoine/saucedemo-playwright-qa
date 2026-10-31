import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly title: Locator;
    readonly items: Locator;
    readonly itemNames: Locator;
    readonly cartBadge: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.items = page.getByTestId('inventory-item');
        this.itemNames = page.getByTestId('inventory-item-name');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.continueShoppingButton = page.getByTestId('continue-shopping');
        this.checkoutButton = page.getByTestId('checkout');
    }

    async removeFromCart(product: string) {
        await this.page.getByTestId(`remove-${product}`).click();
    }
}
