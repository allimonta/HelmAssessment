import { expect } from 'playwright/test';
import { CHECKOUT_TITLE, FIRST_NAME_TXT, LAST_NAME_TXT, ZIP_CODE_TXT, CANCEL_BUTTON, CONTINUE_BUTTON, CHECKOUT_STEP2_URL } from '../utils/constants';

export class Checkout {
    constructor(page) {
        this.page = page;
        this.checkoutTitle = page.locator('[data-test="title"]');
        this.nameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.zipCodeInput = page.locator('#postal-code');
        this.cancelButton = page.locator('#cancel');
        this.continueButton = page.locator('#continue');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async verifyingCheckoutCompleteness() {
        await expect(this.checkoutTitle).toHaveText(CHECKOUT_TITLE);
        await expect(this.nameInput).toHaveAttribute('placeholder', FIRST_NAME_TXT);
        await expect(this.lastNameInput).toHaveAttribute('placeholder', LAST_NAME_TXT);
        await expect(this.zipCodeInput).toHaveAttribute('placeholder', ZIP_CODE_TXT);
        await expect(this.cancelButton).toHaveText(CANCEL_BUTTON);
        await expect(this.continueButton).toHaveText(CONTINUE_BUTTON);
    }

    async fillOutCheckoutForm(name, lastName, zipCode) {
        await this.nameInput.type(name);
        await this.lastNameInput.type(lastName);
        await this.zipCodeInput.type(zipCode);
    }

    async continueToOverview() {
        await this.continueButton.click();
        await this.page.waitForURL(CHECKOUT_STEP2_URL);
    }
}