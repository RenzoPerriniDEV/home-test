class OrderPage {
    constructor(page) {
      this.page = page;    
      this.orderNumber = '[data-id="ordernumber"]';      
    }

    // Get order number
    async getOrderNumber() {
      const orderNumberText = await this.page.textContent(this.orderNumber);
      return orderNumberText.trim();
    }
  }
  
  export default OrderPage;