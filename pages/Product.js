import { expect } from 'playwright/test';

export class Product {
    constructor(page) {
        this.page = page;
        this.productTitle = page.locator('[data-test="inventory-item-name"]');
        this.productImage = page.locator('[class="inventory_details_img"]');
        this.productDescription = page.locator('[data-test="inventory-item-desc"]');
        this.productPrice = page.locator('[class="inventory_details_price"]');
        this.productAddOrRemoveBtn = page.locator('[class*="btn_small btn_inventory"]');
        this.backButton = page.locator('#back-to-products');
    }

    async verifyingProductDetailsCompleteness() {
        await expect(this.productTitle).toBeVisible();
        await expect(this.productImage).toBeVisible();
        await expect(this.productDescription).toBeVisible();
        await expect(this.productPrice).toBeVisible();
        await expect(this.productAddOrRemoveBtn).toBeVisible();
        await expect(this.backButton).toBeVisible();
    }
}