const { expect } = require('@playwright/test');
import { test } from '../utils/pom-setup';
import { ERROR_INPUT_CLASS, CHECKOUT_EMPTY_FIELDS_ERROR_MESSAGE } from '../utils/constants';

test.beforeEach(async ({ login, inventory, cart, checkout }) => {
    await login.completeLogin(process.env.STANDARD_USERNAME, process.env.PASSWORD, inventory);
    await inventory.addRandomProductsToCart();
    await inventory.goToCart();
    await cart.goToCheckout();
    await checkout.verifyingCheckoutCompleteness();
});

test('All fields in Checkout screen are required', async ({ checkout }) => {
    await checkout.continueButton.click();
    await expect(checkout.errorMessage).toHaveText(CHECKOUT_EMPTY_FIELDS_ERROR_MESSAGE);
    await expect(checkout.nameInput).toHaveClass(ERROR_INPUT_CLASS);
    await expect(checkout.lastNameInput).toHaveClass(ERROR_INPUT_CLASS);
    await expect(checkout.zipCodeInput).toHaveClass(ERROR_INPUT_CLASS);
});

test('Checkout Overview screen displays the correct Total price', async ({ checkout, checkoutOverview }) => {
    await checkout.fillOutCheckoutForm(process.env.FIRST_NAME, process.env.LAST_NAME, process.env.ZIP_CODE);
    await checkout.continueToOverview();
    await checkoutOverview.verifyingCheckoutOverviewCompleteness();
    const totalPrice = await checkoutOverview.calculatingTotalPrice();
    await expect(checkoutOverview.itemTotalLbl).toContainText(`Item total: $${totalPrice}`);
});

test('User is able to Complete the checkout order', async ({ checkout, checkoutOverview, checkoutCompleted }) => {
    await checkout.fillOutCheckoutForm(process.env.FIRST_NAME, process.env.LAST_NAME, process.env.ZIP_CODE);
    await checkout.continueToOverview();
    await checkoutOverview.verifyingCheckoutOverviewCompleteness();
    const totalPrice = await checkoutOverview.calculatingTotalPrice();
    await expect(checkoutOverview.itemTotalLbl).toContainText(`Item total: $${totalPrice}`);
    await checkoutOverview.finishCheckout();
    await checkoutCompleted.verifyingCheckoutScreenIsCompleted();
});