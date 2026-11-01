import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly title: Locator;
    readonly cartBadge: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly errorMessage: Locator;
    readonly continueButton: Locator;
    readonly itemNames: Locator;
    readonly subtotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;

    constructor (page: Page) {
        this.page = page;
        this.title = page.getByTestId('title');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.firstNameInput = page.getByTestId('firstName');
        this.lastNameInput = page.getByTestId('lastName');
        this.postalCodeInput = page.getByTestId('postalCode');
        this.errorMessage = page.getByTestId('error');
        this.continueButton = page.getByTestId('continue');
        this.itemNames = page.getByTestId('inventory-item-name');
        this.subtotal = page.getByTestId('subtotal-label');
        this.tax = page.getByTestId('tax-label');
        this.total = page.getByTestId('total-label');
        this.finishButton = page.getByTestId('finish');
        this.completeHeader = page.getByTestId('complete-header');
    }

    async fillInformation(first: string, last: string, zip: string) {
        await this.firstNameInput.fill(first);
        await this.lastNameInput.fill(last);
        await this.postalCodeInput.fill(zip);
        await this.continueButton.click()
    }
}
