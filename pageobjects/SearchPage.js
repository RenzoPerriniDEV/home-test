
class SearchPage {
    constructor(page) {
        this.page = page;
        this.searchInput = 'input[placeholder="Search.."]';
        this.submitButton = 'button[type="submit"]'; 
        this.result = '#result';
    }   

    // Perform search by word
    async performSearch(word) {
        await this.page.locator(this.searchInput).fill(word);
        await this.page.locator(this.submitButton).click();
    }

    // Wait until "searching..."" text dissapears and then return the result text
    async getSearchResult() {
        const locator = this.page.locator(this.result);
        await this.page.waitForFunction(
            (locator) => {
                const element = document.querySelector(locator);
                return element && element.textContent !== 'searching...';
            },
            this.result,
            { timeout: 5000 }
        );
        return await locator.textContent();
    }
}
export default SearchPage;