import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../Model/CartItem";
import { ShoppingCart } from "../Model/ShoppingCart";
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import { PrimaryButton } from "../Components/Button";
import CartItemDetail from "../Components/ShoppingCart/CartItemDetail";
import CartTotal from "../Components/ShoppingCart/CartTotal";
import EmptyCart from "../Components/ShoppingCart/EmptyCart";
import { removeFromCart, decrementQuantity, incrementQuantity, checkout } from "../Services/Cart";

export default function Cart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const cart = ShoppingCart.getCart();
        setCart(cart);
        setLoading(false);
    }, []);

    return (

        <div className="w-screen h-full px-24 py-8 flex flex-col justify-start">
            {/* Header */}
            <Header text="Shopping Cart"/>
            {/* If loading, show loader */}
            {
                loading && <Loader />
            }
            {/* If cart is empty, show empty cart */}
            {
                !loading && cart.length === 0 && <EmptyCart />
            }
            {/* If cart is filled, show cart items*/}
            {
                !loading && cart.length > 0 && 
                <div>
                    <div className="flex flex-row justify-between items-center">
                        {/* Subheader */}
                        <p className="text-2xl font-semibold text-gray-400 my-8">Items in your cart</p>
                        {/* Checkout button */}
                        <PrimaryButton text="Checkout" onClick={() => checkout(navigate)} />
                    </div>
                    <div className="flex flex-col">
                        {/* Show cart items */}
                        {
                            cart.map((item, index) => {
                                return (
                                    <CartItemDetail 
                                        key={index} 
                                        item={item} 
                                        index={index} 
                                        removeFromCart= {() => removeFromCart(item, setCart)}
                                        decrementQuantity= {() => decrementQuantity(item, setCart)}
                                        incrementQuantity= {() => incrementQuantity(item, setCart)}
                                    />
                                );
                            })
                        }
                        {/* Show total */}
                        <CartTotal cart={cart} />
                    </div>
                </div>
            }
        </div>
    );
}