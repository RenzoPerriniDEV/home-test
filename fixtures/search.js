const base = require('@playwright/test');
const SearchPage = require("../pageobjects/SearchPage").default;

exports.test = base.extend({
    searchPage: async ({ page }, use) => {
        const searchPage = new SearchPage(page);        
        await page.goto('/search');
        await use(searchPage);
    },
});
exports.expect = base.expect;