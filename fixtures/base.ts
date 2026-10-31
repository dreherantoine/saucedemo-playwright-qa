import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS, PASSWORD } from '../test-data/users';

type Fixtures = {
    inventoryPage: InventoryPage;
};

export const test = base.extend<Fixtures>({
    inventoryPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(USERS.standard, PASSWORD);
        await use(new InventoryPage(page));
    },
});

export { expect } from '@playwright/test';
