import { expect } from 'playwright/test';
import { LOGIN_PAGE, USERNAME_TXT, INVENTORY_URL, INVENTORY_TITLE } from '../utils/constants';

export class Login {
    constructor(page) {
        this.page = page;
        this.usernameInp = page.locator('#user-name');
        this.passwordInp = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async verifyLoginCompleteness() {
        await expect(this.usernameInp).toBeVisible();
        await expect(this.passwordInp).toBeVisible();
        await expect(this.loginButton).toBeVisible();
        await expect(this.usernameInp).toHaveAttribute('placeholder', USERNAME_TXT);
    }

    async enterUsername(username) {
        await this.usernameInp.waitFor({ state: 'visible' });
        await this.usernameInp.type(username);
        await expect(this.usernameInp).toHaveValue(username);
    }

    async enterPassword(password) {
        await this.passwordInp.waitFor({ state: 'visible' });
        await this.passwordInp.type(password);
        await expect(this.passwordInp).toHaveValue(password);
    }

    async clickLoginButton() {
        await this.loginButton.waitFor({ state: 'visible' });
        await this.loginButton.click();
    }

    async Login(username, password) {
        await this.page.goto(LOGIN_PAGE);
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async completeLogin(username, password, inventory) {
        await this.Login(username, password);
        await this.page.waitForURL(INVENTORY_URL);
        await expect(inventory.inventoryTitle).toHaveText(INVENTORY_TITLE);
    }
}