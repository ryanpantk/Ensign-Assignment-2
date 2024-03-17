import { toast } from "react-toastify";
import { CartItem } from "../Model/CartItem";
import { ShoppingCart } from "../Model/ShoppingCart";
import { NavigateFunction } from "react-router-dom";
import { ProductListing } from "../Model/ProductListing";

const addToCart = (item: ProductListing) => {
    ShoppingCart.addToCart(item);
    toast.success(`${item.getTitle()} added to Cart.`, {
        position: "bottom-right",
        theme: "light",
    });
}

const removeFromCart = (item: CartItem, setCart: (cart: CartItem[]) => void) => {
    ShoppingCart.removeFromCart(item.product);
    setCart(ShoppingCart.getCart());
}
const decrementQuantity = (item: CartItem, setCart: (cart: CartItem[]) => void) => {
    if (item.getQuantity() === 1) {
        removeFromCart(item, setCart);
        return;
    }
    item.decrementQuantity();
    ShoppingCart.updateCart(item);
    setCart([...ShoppingCart.getCart()]);
}

const incrementQuantity = (item: CartItem, setCart: (cart: CartItem[]) => void) => {
    item.incrementQuantity();
    ShoppingCart.updateCart(item);
    setCart([...ShoppingCart.getCart()]);
}

const checkout = (navigate: NavigateFunction) => {
    ShoppingCart.checkout();
    navigate('/');
    toast.success(`Checkout Successful`, {
        position: "bottom-right",
        theme: "light",
    });
}

export { addToCart, removeFromCart, decrementQuantity, incrementQuantity, checkout };