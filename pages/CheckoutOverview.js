import { expect } from 'playwright/test';
import { CANCEL_BUTTON, CHECKOUT_OVERVIEW_TITLE, PAYMENT_INFO_TXT, SHIPPING_INFO_TXT, PRICE_TOTAL_TXT, ITEM_TOTAL_TXT, TAX_TXT, 
    FINISH_BUTTON, CHECKOUT_COMPLETE_URL } from '../utils/constants';
import { functions } from '../utils/functions';

export class CheckoutOverview {
    constructor(page) {
        this.page = page;
        this.checkoutOverviewTitle = page.locator('[data-test="title"]');
        this.overviewProductsList = page.locator('[class="cart_item"]');
        this.paymentInformationLbl = page.locator('[data-test="payment-info-label"]');
        this.paymentInformationValue = page.locator('[data-test="payment-info-value"]');
        this.shippingInformationLbl = page.locator('[data-test="shipping-info-label"]');
        this.shippingInformationValue = page.locator('[data-test="shipping-info-value"]');
        this.priceTotalLbl = page.locator('[data-test="total-info-label"]');
        this.itemTotalLbl = page.locator('[data-test="subtotal-label"]');
        this.taxLbl = page.locator('[data-test="tax-label"]');
        this.cancelButton = page.locator('#cancel');
        this.finishButton = page.locator('#finish');
    }

    async verifyingCheckoutOverviewCompleteness() {
        await expect(this.checkoutOverviewTitle).toHaveText(CHECKOUT_OVERVIEW_TITLE);
        await expect(this.paymentInformationLbl).toHaveText(PAYMENT_INFO_TXT);
        await expect(this.shippingInformationLbl).toHaveText(SHIPPING_INFO_TXT);
        await expect(this.priceTotalLbl).toContainText(PRICE_TOTAL_TXT);
        await expect(this.itemTotalLbl).toContainText(ITEM_TOTAL_TXT);
        await expect(this.taxLbl).toContainText(TAX_TXT);
        await expect(this.cancelButton).toHaveText(CANCEL_BUTTON);
        await expect(this.finishButton).toHaveText(FINISH_BUTTON);
    }

    async calculatingTotalPrice() {
        let totalPrice = 0;
        const products = await this.overviewProductsList.locator('[class="inventory_item_price"]');
        for (let index = 0; index < await products.count(); index++) {
            const productText = await products.nth(index).textContent();
            console.log('Product:', productText);
            const price = await functions.convertToNumber(productText.replace('$', '').trim());
            console.log('Price:', await price);
            totalPrice += await price;            
        }
        totalPrice = totalPrice.toFixed(2); 
        console.log('Total price:', totalPrice);
        return totalPrice;
    }

    async finishCheckout() {
        await this.finishButton.click();
        await this.page.waitForURL(CHECKOUT_COMPLETE_URL);
    }
}