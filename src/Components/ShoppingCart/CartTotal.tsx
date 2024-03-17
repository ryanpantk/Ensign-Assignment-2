import React from 'react';
import { CartItem } from '../../Model/CartItem';

type CartTotalProp = { 
    cart: CartItem[];
}

export default function CartTotal({ cart }: CartTotalProp): JSX.Element {
    return (
        <div className="flex flex-row justify-end items-center my-8">
            <p className="text-2xl font-semibold text-gray-400 px-4">Total:</p>
            <p title="total" className="text-2xl font-semibold text-gray-400">${ cart.reduce((total, element) => total + element.product.getPrice() * element.getQuantity(), 0).toFixed(2) }</p>
        </div>
    );

}