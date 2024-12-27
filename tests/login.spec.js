const { test, expect } = require('../fixtures/login');
const credentials = require('../test-data/credentials.json');
const HomePage = require('../pageobjects/HomePage').default;

test.describe("Login suite", () => {
    let user, password;
    test("Login Success", async ({ loginPage, page }) => {
        // Arrange
        user = credentials.users.realUserName.user;
        password = credentials.users.realUserName.password; 

        // Act
        await loginPage.login(user, password);      
        const homePage = new HomePage(page);
        const welcomeMessage = await homePage.getWelcomeMessageUserNameLoggedIn();
        
        // Assert
        expect(welcomeMessage).toContain(user);
    });

    test("Login Failure A: invalid credentials", async ({ loginPage }) => {
        // Arrange
        const expectedMessageError = 'Wrong credentials';
        user = credentials.users.userNameInvalid.user;
        password = credentials.users.userNameInvalid.password; 

        // Act
        await loginPage.login(user, password);
        const errorMessage = await loginPage.getLoginErrorMessage();      
        
        // Assert
        expect(errorMessage).toContain(expectedMessageError);
    });

    test("Login Failure B: empty fields", async ({ loginPage }) => {
        // Arrange
        const expectedMessageError = 'Fields can not be empty';

        // Act
        await loginPage.login('', '');
        const errorMessage = await loginPage.getLoginErrorMessage();      
        
        // Assert
        expect(errorMessage).toContain(expectedMessageError);
    });
});