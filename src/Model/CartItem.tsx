import { ProductListing } from "./ProductListing";

export class CartItem {
    product: ProductListing;
    quantity: number;
  
    constructor(product: {
      id: number;
      title: string;
      price: number;
      category: string;
      description: string;
      image: string;
    }, quantity: number) {
      this.product = new ProductListing(
        product.id,
        product.title,
        product.price,
        product.category,
        product.description,
        product.image
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
      return this;
    }

    incrementQuantity() {
        this.quantity++;
        return this;
    }

    decrementQuantity() {
        if (this.quantity > 0) {
            this.quantity--;
        }
        return this;
    }
}