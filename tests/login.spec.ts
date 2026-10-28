import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS, PASSWORD, WRONG_PASSWORD } from '../test-data/users';

test('TC-LOGIN-001 - Login with valid credentials', { tag: '@smoke' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard, PASSWORD);

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByTestId('title')).toHaveText('Products');
    await expect(page.getByTestId('inventory-item')).toHaveCount(6);
});

test('TC-LOGIN-002 - Login with wrong password', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard, WRONG_PASSWORD);

    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Username and password do not match any user in this service'
    );
});

test('TC-LOGIN-003 - Login with locked out user', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.lockedOut, PASSWORD);

    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Sorry, this user has been locked out.'
    );
});

test('TC-LOGIN-004 - Login with empty username', { tag: '@regression' }, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', PASSWORD);

    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
        'Epic sadface: Username is required'
    );
});
