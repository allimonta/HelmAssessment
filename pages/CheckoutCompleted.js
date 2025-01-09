import { expect } from 'playwright/test';
import { CHECKOUT_COMPLETED_TITLE, THANKS_TXT, ORDER_DISPACHED_TXT, BACK_HOME_BUTTON } from '../utils/constants';

export class CheckoutCompleted {
    constructor(page) {
        this.page = page;
        this.checkoutCompletedTitle = page.locator('[data-test="title"]');
        this.successImage = page.locator('[class="pony_express"]');
        this.thanksTxt = page.locator('[class="complete-header"]');
        this.orderDispachedTxt = page.locator('[data-test="complete-text"]');
        this.backHomeButton = page.locator('#back-to-products');
    }

    async verifyingCheckoutScreenIsCompleted() {
        await expect(this.checkoutCompletedTitle).toHaveText(CHECKOUT_COMPLETED_TITLE); 
        await expect(this.successImage).toBeVisible();
        await expect(this.thanksTxt).toHaveText(THANKS_TXT);
        await expect(this.orderDispachedTxt).toHaveText(ORDER_DISPACHED_TXT);
        await expect(this.backHomeButton).toHaveText(BACK_HOME_BUTTON);
    }
}