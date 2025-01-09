import { expect } from 'playwright/test';
import { INVENTORY_TITLE, ADD_TO_CART_TXT, REMOVE_TXT, DESC_TXT, ZA_TXT, AZ_TXT, ASC_ZA_TXT, ASC_AZ_TXT, LOW_TXT, LOHI_TXT, 
    HILO_TXT, ASC_HILO_TXT, ASC_LOHI_TXT, CART_URL, ALL_TXT, ABOUT_TXT, LOGOUT_TXT, RESET_APP_TXT, INVALID_OPTION } from '../utils/constants';
import { functions } from '../utils/functions';

export class Inventory {
    constructor(page) {
        this.page = page;
        this.inventoryTitle = page.locator('[class="app_logo"]');
        this.menuBarBtn = page.locator('#react-burger-menu-btn');
        this.menuBarOptions = page.locator('[class="bm-item menu-item"]');
        this.inventoryItemsList = page.locator('#inventory_container [data-test="inventory-item"]');
        this.sortButton = page.locator('[class="product_sort_container"]');
        this.optionSelected = page.locator('[class="active_option"]');
        this.cartButton = page.locator('#shopping_cart_container');
        this.cartItemsAmount = page.locator('[data-test="shopping-cart-badge"]');
    }

    async verifyInventoryCompleteness() {
        await expect(this.inventoryTitle).toHaveText(INVENTORY_TITLE);
        await expect(this.menuBarBtn).toBeVisible();
        await expect(this.sortButton).toBeVisible();
        await expect(this.cartButton).toBeVisible();
    }

    async addProductToCart() {
        const products = await this.inventoryItemsList.locator('.pricebar [name*="add-to-cart"]');
        const addToCartAmountProducts = await products.count()
        const productToAdd = await products.first();
        await productToAdd.hover();
        await expect(productToAdd).toHaveText(ADD_TO_CART_TXT);
        await productToAdd.click({ force: true });
        await expect(products).toHaveCount(await addToCartAmountProducts - 1);
    }

    async addRandomProductsToCart() {
        const productsToAdd = await functions.getRandomNumber(5);
        for (let i = 0; i < productsToAdd; i++) {
            await this.addProductToCart();
        }
    }

    async removeProduct() {
        const products = await this.inventoryItemsList.locator('.pricebar [name*="remove"]');
        const productsAmount = await products.count()
        const productToRemove = await products.first();
        await productToRemove.hover();
        await expect(productToRemove).toHaveText(REMOVE_TXT);
        await productToRemove.click();
        await expect(products).toHaveCount(await productsAmount - 1);
    }

    async sortProductsByName(sortType) {
        await this.sortButton.click({ force: true });
        sortType === DESC_TXT ? await this.sortButton.selectOption(ZA_TXT) : await this.sortButton.selectOption(AZ_TXT);
        const optionSelectedText = sortType === DESC_TXT ? ASC_ZA_TXT : ASC_AZ_TXT;
        await expect(this.optionSelected).toHaveText(optionSelectedText);
    }

    async sortProductsByPrice(sortType) {
        await this.sortButton.click({ force: true });
        sortType === LOW_TXT ? await this.sortButton.selectOption(LOHI_TXT) : await this.sortButton.selectOption(HILO_TXT);
        const optionSelectedText = sortType === LOW_TXT ? ASC_LOHI_TXT : ASC_HILO_TXT;
        await expect(this.optionSelected).toHaveText(optionSelectedText);
    }

    async openProductDetailsImage() {
        const productIndex = await functions.getRandomNumber(5);
        const productImgage = await this.inventoryItemsList.locator('[class="inventory_item_img"] img').nth(productIndex);
        await productImgage.click();
    }

    async openProductDetailsTitle() {
        const productIndex = await functions.getRandomNumber(5);
        const productImgage = await this.inventoryItemsList.locator('[data-test="inventory-item-name"]').nth(productIndex);
        await productImgage.click();
    }

    async goToCart() {
        await this.cartButton.waitFor({ state: 'visible' });
        await this.cartButton.click();
        await this.page.waitForURL(CART_URL);
    }
    async selectMenuOption(option) {
        await this.menuBarBtn.click();
        switch (option) {
            case ALL_TXT:
                await expect(this.menuBarOptions.nth(0)).toHaveText(ALL_TXT);
                await this.menuBarOptions.nth(0).click();
                break;
            case ABOUT_TXT:
                await expect(this.menuBarOptions.nth(1)).toHaveText(ABOUT_TXT);
                await this.menuBarOptions.nth(1).click();
                break;
            case LOGOUT_TXT:
                await expect(this.menuBarOptions.nth(2)).toHaveText(LOGOUT_TXT);
                await this.menuBarOptions.nth(2).click();
                break;
            case RESET_APP_TXT:
                await expect(this.menuBarOptions.nth(3)).toHaveText(RESET_APP_TXT);
                await this.menuBarOptions.nth(3).click();
                break;
            default:
                console.log(INVALID_OPTION);
                break;
        }
    }
}