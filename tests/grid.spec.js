const { test, expect } = require('../fixtures/grid');

test.describe("Grid suite", () => {

    test("Grid Item Test", async ({ gridPage }) => {
        // Arrange
        const productPosition = 7;
        const expectedProductName = 'Super Pepperoni';
        // Act
        const productName = await gridPage.getProductNameByPosition(productPosition);
        // Assert
        expect(productName).toBe(expectedProductName);
    });

    test("Grid All Items Test", async ({ gridPage }) => {
        // Act
        const gridItems = await gridPage.validateItems();
        // Assert
        expect(gridItems).toBeTruthy();
    });
});