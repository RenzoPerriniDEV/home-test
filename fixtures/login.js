const base = require('@playwright/test');
const LoginPage = require("../pageobjects/LoginPage").default;

exports.test = base.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);        
        await page.goto('/login');
        await use(loginPage);
    },
});
exports.expect = base.expect;