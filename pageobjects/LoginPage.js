
class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = "#username";
        this.password = "#password";
        this.signin = "#signin-button";
        this.message = "#message";       
    }

    // Fill and submit login form
    async login(userName, password) {
        await this.page.fill(this.userName, userName);
        await this.page.fill(this.password, password);
        await this.page.click(this.signin);
    }

    // Get error messages from login form
    async getLoginErrorMessage() {
        const locator = this.page.locator(this.message);
        await this.page.waitForFunction(
            (locator) => {
                return document.querySelector(locator);
            },
            this.message,
            { timeout: 5000 }
        );
        return await locator.textContent();
    }    
}
export default LoginPage;