const { expect } = require('@playwright/test');
import { test } from '../utils/pom-setup';
import { INVENTORY_URL, EMPTY, ERROR_MESSAGE_USERNAME_AND_PASSWORD_NOT_MATCHING, ERROR_INPUT_CLASS, ERROR_MESSAGE_USER_REQUIRED, LOGOUT_TXT } from '../utils/constants';

test('User is able to succefully Login in the website', async ({ login }) => {
    await login.Login(process.env.STANDARD_USERNAME, process.env.PASSWORD);
    await login.page.waitForURL(INVENTORY_URL);
});

test('Inexistent user is not able to Login the website', async ({ login }) => {
    await login.Login(process.env.INEXISTENT_USERNAME, process.env.PASSWORD);
    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toHaveText(ERROR_MESSAGE_USERNAME_AND_PASSWORD_NOT_MATCHING);
    await expect(login.usernameInp).toHaveClass(ERROR_INPUT_CLASS);
    await expect(login.passwordInp).toHaveClass(ERROR_INPUT_CLASS);
});

test('User should not be able to Login the website with empty fields', async ({ login }) => {
    await login.Login(EMPTY, EMPTY);
    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toHaveText(ERROR_MESSAGE_USER_REQUIRED);
    await expect(login.usernameInp).toHaveClass(ERROR_INPUT_CLASS);
    await expect(login.passwordInp).toHaveClass(ERROR_INPUT_CLASS);
});

test('User is not able to Login the website with wrong password', async ({ login }) => {
    await login.Login(process.env.STANDARD_USERNAME, process.env.WRONG_PASSWORD);
    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toHaveText(ERROR_MESSAGE_USERNAME_AND_PASSWORD_NOT_MATCHING);
    await expect(login.usernameInp).toHaveClass(ERROR_INPUT_CLASS);
    await expect(login.passwordInp).toHaveClass(ERROR_INPUT_CLASS);
});

test('User is able to Logout from the website', async ({ login, inventory }) => {
    await login.Login(process.env.STANDARD_USERNAME, process.env.PASSWORD);
    await login.page.waitForURL(INVENTORY_URL);
    await inventory.verifyInventoryCompleteness();
    await inventory.selectMenuOption(LOGOUT_TXT);
    await login.verifyLoginCompleteness();
});