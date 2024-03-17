import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../Components/Loader";
import { ProductListing } from "../Model/ProductListing";
import { PrimaryButton } from "../Components/Button";
import { toast } from "react-toastify";
import { ShoppingCart } from "../Model/ShoppingCart";

export default function Product() {
    let { id } = useParams();
    const [data, setData] = useState<ProductListing | undefined>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // Get the product and convert it to a ProductListing object
                const data = await fetch('https://fakestoreapi.com/products/'+ id)
                    .then(res=>res.json())
                    .then(json=>ProductListing.fromJson(json));
                // Set the data and stop loading
                setData(data);
                setLoading(false);
            } catch (error) {
                // Log the error and stop loading
                console.error(error);
            }
        }
        fetchProduct();
    }, [id]);

    const addToCart = () => {
        ShoppingCart.addToCart(data!);
        toast.success(`${data!.getTitle()} added to Cart.`, {
            position: "bottom-right",
            theme: "light",
        });
    }
    
    return (
        <div>
            {loading
                ?
                <Loader />
                :
                <div className="flex flex-col items-center">
                    <div className="w-5/6 h-96 bg-white rounded-xl mt-12 flex justify-center items-center rounded-2xl">
                        <img src={data!.getImage()} alt={data!.getTitle()} className="h-80 object-contain" />
                    </div>
                    <div className="w-5/6 h-full py-8 flex flex-col justify-start">
                        <h1 className="text-4xl font-bold mt-8">{data!.getTitle()}</h1>
                        <p className="text-xl text-gray-400 capitalize my-4">{data!.getCategory()}</p>
                        <p className="text-xl text-gray-600 first-letter:capitalize">{data!.getDescription()}</p>
                        <p className="text-2xl font-bold my-4">${data!.getPrice()}</p>
                        <div className="w-fit self-end">
                            <PrimaryButton text="Add to Cart" onClick={addToCart}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}