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

    static removeFromCart(product: ProductListing) {
        if (!localStorage.getItem('cart')) {
            return;
        }
        this.cart = JSON.parse(localStorage.getItem('cart') ?? '');
        this.cart = this.cart.filter(element => element.product.id !== product.getID());
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    static getCartTotal() {
        if (!localStorage.getItem('cart')) {
            return 0;
        }
        this.cart = JSON.parse(localStorage.getItem('cart') ?? '');
        return this.cart.reduce((total, element) => total + element.product.price, 0);
    }

    static getCartCount() {
        if (!localStorage.getItem('cart')) {
            return 0;
        }
        this.cart = JSON.parse(localStorage.getItem('cart') ?? '');
        return this.cart.length;
    }

    static checkout() {
        this.cart = JSON.parse(localStorage.getItem('cart') ?? '');
        this.cart = [];
    }
}