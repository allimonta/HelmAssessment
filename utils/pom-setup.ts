import { BrowserContext } from "playwright";
import { test as base, chromium } from "@playwright/test";
import { Login } from "../pages/Login";
import { Inventory } from "../pages/Inventory";
import { Cart } from "../pages/Cart";
import { Product } from "../pages/Product";
import { Checkout } from "../pages/Checkout";
import { CheckoutOverview } from "../pages/CheckoutOverview";
import { CheckoutCompleted } from "../pages/CheckoutCompleted";

type MyFixtures = {
    context: BrowserContext,
    login: Login,
    inventory: Inventory,
    cart: Cart,
    product: Product,
    checkout: Checkout,
    checkoutOverview: CheckoutOverview,
    checkoutCompleted: CheckoutCompleted
};

export const test = base.extend<MyFixtures>({
    context: async ({}, use) => {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      await use(context);
      await context.close();
      await browser.close();
    },
    
    login: async ({ context }, use) => {
      const page = await context.newPage();
      const login = new Login(page);
      await use(login);
    },

    inventory: async ({ login }, use) => {
      const inventory = new Inventory(login.page);
      await use(inventory);
    },

    cart: async ({ login }, use) => {
      const cart = new Cart(login.page);
      await use(cart);
    },

    product: async ({ login }, use) => {
      const product = new Product(login.page);
      await use(product);
    },

    checkout: async ({ login }, use) => {
      const checkout = new Checkout(login.page);
      await use(checkout);
    },

    checkoutOverview: async ({ login }, use) => {
      const checkoutOverview = new CheckoutOverview(login.page);
      await use(checkoutOverview);
    },

    checkoutCompleted: async ({ login }, use) => {
      const checkoutCompleted = new CheckoutCompleted(login.page);
      await use(checkoutCompleted);
    }
});