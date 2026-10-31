import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS, PASSWORD, WRONG_PASSWORD } from '../test-data/users';

test('TC-LOGIN-001 - Login with valid credentials', { tag: '@smoke' }, async ({ page }) => {
    // Preconditions
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Steps
    await loginPage.login(USERS.standard, PASSWORD);

    // Expected result
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.items).toHaveCount(6);
});

test('TC-LOGIN-002 - Login with wrong password', { tag: '@regression' }, async ({ page }) => {
    // Preconditions
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Steps
    await loginPage.login(USERS.standard, WRONG_PASSWORD);

    // Expected result
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Username and password do not match any user in this service'
    );
});

test('TC-LOGIN-003 - Login with locked out user', { tag: '@regression' }, async ({ page }) => {
    // Preconditions
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Steps
    await loginPage.login(USERS.lockedOut, PASSWORD);

    // Expected result
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Sorry, this user has been locked out.'
    );
});

test('TC-LOGIN-004 - Login with empty username', { tag: '@regression' }, async ({ page }) => {
    // Preconditions
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Steps
    await loginPage.login('', PASSWORD);

    // Expected result
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Username is required'
    );
});
