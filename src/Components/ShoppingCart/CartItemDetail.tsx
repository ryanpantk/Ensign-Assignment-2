import React from 'react';
import { CartItem } from '../../Model/CartItem';
import { DestructiveButton, SquareButton } from '../Button';

type CartItemProps = {
    item: CartItem;
    index: number;
    removeFromCart: (item: CartItem) => void;
    decrementQuantity: (item: CartItem) => void;
    incrementQuantity: (item: CartItem) => void;
}

export default function CartItemDetail({ item, index, removeFromCart, decrementQuantity, incrementQuantity }: CartItemProps): JSX.Element {
    return (
    <div key={index} className="flex flex-row justify-between items-center my-4">
        {/* Product image and details */}
        <div className="flex flex-row items-center">
            <img src={item.product.getImage()} alt={item.product.getTitle()} className="w-24 h-24 object-cover rounded-md"/>
            <div className="flex flex-col ml-4">
                <p className="text-xl font-semibold">{item.product.getTitle()}</p>
                <p className="text-gray-400">{item.product.getPrice()}</p>
            </div>
        </div>
        {/* Quantity and remove button */}
        <div className="flex flex-row items-center">
            <SquareButton text="-" onClick={() => decrementQuantity(item)} />
            <p title="quantity" className="text-xl font-semibold mx-4">{item.getQuantity()}</p>
            <SquareButton text="+" onClick={() => incrementQuantity(item)} />
            <div className="ml-4">
                <DestructiveButton text="Remove" onClick={() => removeFromCart(item)} />
            </div>
        </div>
    </div>
    );
}