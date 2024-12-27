const { test, expect } = require('../fixtures/search');

test.describe("Search suite", () => {
    test("Search Success", async ({ searchPage }) => {
        // Arrange
        const word = 'automation';
        const resultMessage = 'Found one result for ';
        const expectedMessage = resultMessage + word;
        // Act        
        await searchPage.performSearch(word);
        const resultMessageSearch = await searchPage.getSearchResult();
        // Assert
        expect(resultMessageSearch).toBe(expectedMessage);
    });

    test("Search Empty", async ({ searchPage }) => {
        // Arrange
        const expectedMessage = 'Please provide a search word.';
        // Act        
        await searchPage.performSearch('');
        const resultMessageSearch = await searchPage.getSearchResult();
        // Assert
        expect(resultMessageSearch).toBe(expectedMessage);
    });
});