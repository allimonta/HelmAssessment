const { expect } = require('@playwright/test');
import { test } from '../utils/pom-setup';

test.beforeEach(async ({ login, inventory }) => {
    await login.completeLogin(process.env.STANDARD_USERNAME, process.env.PASSWORD, inventory);
    await inventory.addRandomProductsToCart(inventory);
});

test('User is able to add products to remove products from the cart', async ({ inventory, cart }) => {
    await inventory.goToCart();
    await cart.verifyingCartCompleteness();
    await cart.removeProduct();
});