import { expect } from 'playwright/test';
import { CART_TITLE, QTY_TXT, DESCRIPTION_TXT, CONTINUE_SHOPPING_BUTTON, CHECKOUT_BUTTON, REMOVE_TXT, CHECKOUT_STEP1_URL } from '../utils/constants';

export class Cart {
    constructor(page) {
        this.page = page;
        this.cartTitle = page.locator('[data-test="title"]');
        this.qtyLbl = page.locator('[class="cart_quantity_label"]');
        this.descriptionLbl = page.locator('[class="cart_desc_label"]');
        this.productsList = page.locator('[data-test="inventory-item"]');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.checkoutButton = page.locator('#checkout');
    }

    async verifyingCartCompleteness() {
        await expect(this.cartTitle).toHaveText(CART_TITLE);
        await expect(this.qtyLbl).toHaveText(QTY_TXT);
        await expect(this.descriptionLbl).toHaveText(DESCRIPTION_TXT);
        await expect(this.continueShoppingButton).toHaveText(CONTINUE_SHOPPING_BUTTON);
        await expect(this.checkoutButton).toHaveText(CHECKOUT_BUTTON);
    }

    async removeProduct() {
        const products = await this.productsList.locator('[class="btn btn_secondary btn_small cart_button"]');
        const productsAmount = await products.count()
        const productToRemove = await products.first();
        await productToRemove.hover();
        await expect(productToRemove).toHaveText(REMOVE_TXT);
        await productToRemove.click();
        await expect(products).toHaveCount(await productsAmount - 1);
    }

    async goToCheckout() {
        await this.checkoutButton.click();
        await this.page.waitForURL(CHECKOUT_STEP1_URL);
    }
}
