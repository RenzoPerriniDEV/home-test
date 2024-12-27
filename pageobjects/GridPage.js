class GridPage {
    constructor(page) {
        this.page = page;
        this.productPosition = 'label[data-test-id="card-number"]'; 
        this.productName = 'h4[data-test-id="item-name"]';
        this.productPrice = '#item-price'; 
        this.gridContainer = '.grid-container';      
        this.item = '.item';
        this.addToOrderButton = 'button[data-test-id="add-to-order"]';
    } 

    // Get product name by index position
    async getProductNameByPosition(position) {
      const productName = this.page.locator(`${this.item}:has(${this.productPosition}:has-text("${position}")) ${this.productName}`);
      return productName.textContent();      
    }
 
    // Validate that all the items have a non empty title, price, image and a button.
    async validateItems() { 
      const items = await this.page.locator(this.item);  
      const itemCount = await items.count();

      for (let i = 0; i < itemCount; i++) {
        const item = items.nth(i);
    
        const title = await item.locator(this.productName).textContent();
        if (!title || title.trim() === '') {
          throw new Error(`Title of item ${i + 1} is empty`);
        }
    
        const price = await item.locator(this.productPrice).textContent();
        if (!price || price.trim() === '') {
          throw new Error(`The price of the item ${i + 1} is empty`);
        }
    
        const imageSrc = await item.locator('img').getAttribute('src');
        if (!imageSrc || imageSrc.trim() === '') {
          throw new Error(`The image of the item ${i + 1} has a src invalid`);
        }
    
        const buttonVisible = await item.locator(this.addToOrderButton).isVisible();
        if (!buttonVisible) {
          throw new Error(`The button of the item ${i + 1} is not present`);
        }
      }
      return true;
    }
}
export default GridPage;