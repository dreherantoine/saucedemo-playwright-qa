import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly title: Locator;
    readonly items: Locator;

    constructor (page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.items = page.getByTestId('inventory-item');
    }
}
