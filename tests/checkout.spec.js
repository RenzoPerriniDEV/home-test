const { test, expect } = require('../fixtures/checkout');
const credentials = require('../test-data/checkout.data.json');
const OrderPage = require('../pageobjects/OrderPage').default;

test.describe("Checkout suite", () => {
    test("Checkout Form Order Success", async ({ checkoutPage, page }) => {
        // Arrange
        const billingAddressInfo = credentials.checkout.billingAdress;
        const paymentInfo = credentials.checkout.paymentInfo;

        // Act 
        await checkoutPage.fillBillingAndPaymentInfo(billingAddressInfo.fullName, billingAddressInfo.email, 
            billingAddressInfo.address, billingAddressInfo.city, billingAddressInfo.state, 
            billingAddressInfo.zip, paymentInfo.nameOnCard, paymentInfo.creditCardNumber, 
            paymentInfo.expMonth, paymentInfo.expYear, paymentInfo.cvv);   
        await checkoutPage.checkShippingAddress(); 
        await checkoutPage.submitCheckoutForm();
        const orderPage = new OrderPage(page);
        const orderNumber = await orderPage.getOrderNumber();

        // Assert
        expect(orderNumber).not.toBe('');
    });

    test("Checkout Form Alert", async ({ checkoutPage }) => {
        // Arrange
        const billingAddressInfo = credentials.checkout.billingAdress;
        const paymentInfo = credentials.checkout.paymentInfo;

        // Act 
        await checkoutPage.fillBillingAndPaymentInfo(billingAddressInfo.fullName, billingAddressInfo.email, 
            billingAddressInfo.address, billingAddressInfo.city, billingAddressInfo.state, 
            billingAddressInfo.zip, paymentInfo.nameOnCard, paymentInfo.creditCardNumber, 
            paymentInfo.expMonth, paymentInfo.expYear, paymentInfo.cvv);   
        await checkoutPage.uncheckShippingAddress(); 
        await checkoutPage.submitCheckoutForm();
        if(await checkoutPage.validateAlertMessageIsPresent()) {
            await checkoutPage.confirmAlertMessage(); 
        }              
            
        // Assert
        expect(await checkoutPage.validateAlertMessageIsPresent()).toBeFalsy();
    });

    test("Cart Total Test", async ({ checkoutPage, page }) => {
        // Arrange
        const totalOfAllProducts = await checkoutPage.getTotalSumOfProducts();
        const totalCartDisplayed = await checkoutPage.getTotalDisplayed();
            
        // Assert
        expect(totalOfAllProducts).toBe(totalCartDisplayed);
    });    
});