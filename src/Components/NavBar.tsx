import React from 'react'
import { BuildingStorefrontIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className='w-screen h-20 bg-emerald-400 flex items-center pl-12'>
            {/* Website Logo */}
            <Link
                to="/"  
            >
                <div className="flex items-center">
                    <BuildingStorefrontIcon className='h-6 w-6 text-emerald-100' />
                    <h1 className='text-emerald-100 font-semibold text-xl ml-4'>Ecommerce Shop</h1>
                </div>
            </Link>
            {/* Shopping Cart */}
            <Link
                className="ml-auto "
                to="/cart"  
            >
                <div className="px-12 h-20 flex items-center bg-emerald-500 hover:bg-emerald-600">
                    <ShoppingCartIcon className='h-8 w-8 text-white' />
                    <h1 className='text-white font-bold text-2xl ml-4'>My Shopping Cart</h1>
                </div>
            </Link>
        </div>
    )
}