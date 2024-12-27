const base = require('@playwright/test');
const CheckoutPage = require("../pageobjects/CheckoutPage").default;

exports.test = base.extend({
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);        
        await page.goto('/checkout');
        await use(checkoutPage);
    },
});
exports.expect = base.expect;