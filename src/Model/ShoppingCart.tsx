import { CartItem } from './CartItem';
import { ProductListing } from './ProductListing';

export class ShoppingCart {
    static cart: CartItem[];

    static getCart(): CartItem[] {
        if (localStorage.getItem('cart')) {
            const payload = JSON.parse(localStorage.getItem('cart') ?? '');
            this.cart = payload.map(
                    (element: { product: ProductListing; quantity: number; }) => new CartItem(element.product, element.quantity)
                );
        } else {
            this.cart = [];
        }
        return this.cart;
    }

    static addToCart(product: ProductListing) {
        let inCart = false;
        if (localStorage.getItem('cart')) {
            this.cart = JSON.parse(localStorage.getItem('cart') ?? '');
        } else {
            this.cart = [];
        }
        this.cart.forEach(element => {
            if (element.product.id === product.getID()) {
                element.quantity++;
                localStorage.setItem('cart', JSON.stringify(this.cart));
                inCart = true;
                return;
            }
        });
        if (!inCart) {
            this.cart.push(new CartItem(product, 1));
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }

    static updateCart(item: CartItem) {
        if (!localStorage.getItem('cart')) {
            return;
        }
        this.cart = JSON.parse(localStorage.getItem('cart') ?? '');
        this.cart.forEach(element => {
            if (element.product.id === item.product.getID()) {
                element.quantity = item.getQuantity();
                localStorage.setItem('cart', JSON.stringify(this.cart));
                return;
            }
        });
    }

    static removeFromCart(product: ProductListing) {
        if (!localStorage.getItem('cart')) {
            return;
        }
        this.cart = JSON.parse(localStorage.getItem('cart') ?? '');
        this.cart = this.cart.filter(element => element.product.id !== product.getID());
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    static checkout() {
        this.cart = JSON.parse(localStorage.getItem('cart') ?? '');
        this.cart = [];
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
}