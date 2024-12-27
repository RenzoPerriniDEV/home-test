
class HomePage {
    constructor(page) {
        this.page = page;
        this.welcomeMessage = "#welcome-message";
    }

    // Get the user name logged in home page
    async getWelcomeMessageUserNameLoggedIn() {
        return await this.page.textContent(this.welcomeMessage);
    }
}
export default HomePage;