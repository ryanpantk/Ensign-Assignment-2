import { ProductListing } from "./ProductListing";

export class CartItem {
    product: ProductListing;
    quantity: number;
  
    constructor(product: ProductListing, quantity: number) {
      this.product = new ProductListing(
        product.getID(),
        product.getTitle(),
        product.getPrice(),
        product.getCategory(),
        product.getDescription(),
        product.getImage()
      );
      this.quantity = quantity;
    }
  
    getProduct() {
      return this.product;
    }
  
    getQuantity() {
      return this.quantity;
    }
  
    setQuantity(quantity: number) {
      this.quantity = quantity;
    }

    incrementQuantity() {
        this.quantity++;
    }

    decrementQuantity() {
        if (this.quantity > 0) {
            this.quantity--;
        }
    }
  
    getTotal() {
      return this.product.getPrice() * this.quantity;
    }
}