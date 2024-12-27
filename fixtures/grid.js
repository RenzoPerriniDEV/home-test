const base = require('@playwright/test');
const GridPage = require("../pageobjects/GridPage").default;

exports.test = base.extend({
    gridPage: async ({ page }, use) => {
        const gridPage = new GridPage(page);        
        await page.goto('/grid');
        await use(gridPage);
    },
});
exports.expect = base.expect;