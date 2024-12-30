
class CheckoutPage {
    constructor(page) {
      this.page = page;
  
      // Bulling Address
      this.firstName = 'input[name="firstname"]';
      this.email = 'input[name="email"]';
      this.address = 'input[name="address"]';
      this.city = 'input[name="city"]';
      this.state = 'input[name="state"]';
      this.zip = 'input[name="zip"]';
      // Payment
      this.cardName = 'input[name="cardname"]';
      this.cardNumber = 'input[name="cardnumber"]';
      this.expMonth = 'select[name="expmonth"]';
      this.expYear = 'input[name="expyear"]';
      this.cvv = 'input[name="cvv"]';
      this.shippingAdress = 'input[name="sameadr"]';
      this.continueSubmit = 'button.btn:has-text("Continue to checkout")';
      // Cart
      this.cartTotal = 'p:has-text("Total") b';
      this.productsPrice = 'p:not(:has-text("Total")) span.price';
    }
  
    // Fill billing address and payment form
    async fillBillingAndPaymentInfo(firstName, email, address, city, state, zip, cardName, cardNumber, expMonth, expYear, cvv) {
      await this.page.fill(this.firstName, firstName);
      await this.page.fill(this.email, email);
      await this.page.fill(this.address, address);
      await this.page.fill(this.city, city);
      await this.page.fill(this.state, state);
      await this.page.fill(this.zip, zip);
      await this.page.fill(this.cardName, cardName);
      await this.page.fill(this.cardNumber, cardNumber);
      await this.page.selectOption(this.expMonth, expMonth);
      await this.page.fill(this.expYear, expYear);
      await this.page.fill(this.cvv, cvv);
    }
  
    // Check Shipping address checkbox
    async checkShippingAddress() {
      if(!(await this.page.isChecked(this.shippingAdress))){
          await this.page.check(this.shippingAdress);
      }              
    }

    // Uncheck Shipping address checkbox
    async uncheckShippingAddress() {
      if(await this.page.isChecked(this.shippingAdress)){
        await this.page.uncheck(this.shippingAdress);
      }
    }  
    
    // Check alert if is present
    async validateAlertMessageIsPresent() {
      let dialogDetected = false;
      this.page.on('dialog', async (dialog) => {
        dialogDetected = true;
      }); 
      return dialogDetected;            
    }

    // Confirm dialog
    async confirmAlertMessage() {
      this.page.on('dialog', async (dialog) => {
        await dialog.accept();
      });            
    }

    // Submit checkout form
    async submitCheckoutForm() {
      await this.page.click(this.continueSubmit);
    }

    // Check total for all products in the cart
    async getTotalSumOfProducts() {
      const prices = await this.page.$$eval(this.productsPrice , spans => {
        return spans.map(span => {
          return parseFloat(span.textContent.replace('$', '').trim());
        });
      });
      return prices.reduce((sum, price) => sum + price, 0);      
    }  
    
    // Get the total displayed in the cart
    async getTotalDisplayed() {
      const totalCartDisplayed = await this.page.locator(this.cartTotal).textContent();
      return parseFloat(totalCartDisplayed.replace('$', '').trim());
    }
  }  
  export default CheckoutPage;