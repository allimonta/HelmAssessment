const { expect } = require('@playwright/test');
import { test } from '../utils/pom-setup';
import { DESC_TXT, ASC_TXT, LOW_TXT, HIGH_TXT, BACK_TO_PRODUCTS_BUTTON } from '../utils/constants';

test.beforeEach(async ({ login, inventory }) => {
    await login.completeLogin(process.env.STANDARD_USERNAME, process.env.PASSWORD, inventory);
});

test('User is able to add products to the cart', async ({ inventory }) => {
    await inventory.addRandomProductsToCart();
});

test('User is able to remove products from the cart', async ({ inventory }) => {
    await inventory.addProductToCart();
    await inventory.removeProduct();
});

test('User is able to sort products by name', async ({ inventory }) => {
    await inventory.sortProductsByName(DESC_TXT);
    await inventory.sortProductsByName(ASC_TXT);
});

test('User is able to sort products by price', async ({ inventory }) => {
    await inventory.sortProductsByPrice(LOW_TXT);
    await inventory.sortProductsByPrice(HIGH_TXT);
});

test('User is able to access Product details screen clicking the product image', async ({ inventory, product }) => {
    await inventory.openProductDetailsImage();
    await product.verifyingProductDetailsCompleteness();
    await expect(product.backButton).toHaveText(BACK_TO_PRODUCTS_BUTTON);
});

test('User is able to access Product details screen clicking the product title', async ({ inventory, product }) => {
    await inventory.openProductDetailsTitle();
    await product.verifyingProductDetailsCompleteness();
    await expect(product.backButton).toHaveText(BACK_TO_PRODUCTS_BUTTON);
});