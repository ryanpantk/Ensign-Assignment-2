import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { ShoppingCart } from "../Model/ShoppingCart";
import Loader from "../Components/Loader";
import { CartItem } from "../Model/CartItem";

export default function Cart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true);
        const cart = ShoppingCart.getCart();
        console.log(cart);
        setCart(cart);
        setLoading(false);
    }, []);
    
    return (

        <div className="w-screen h-full px-24 py-8 flex flex-col justify-start">
            <Header text="Shopping Cart"/>
            {/* If loading, show loader */}
            {
                loading && <Loader />
            }
            {/* If cart is empty, show empty cart */}
            {
                !loading && cart.length === 0 && <p className="text-2xl font-semibold text-gray-400 my-8">Your cart is empty.</p>
            }
            {/* If cart is filled, show cart items*/}
            {
                !loading && cart.length > 0 && 
                <div> </div>
            }
        </div>
    );
}