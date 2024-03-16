import { ProductListing } from "../Model/ProductListing";
import { useEffect, useState } from 'react';
import Header from "../Components/Header";
import Loader from "../Components/Loader";
import ProductCard from "../Components/ProductListing/ProductCard";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductListings = async () => {
            try {
                setLoading(true);
                // Get all products and convert them to ProductListing objects
                const data = await fetch('https://fakestoreapi.com/products')
                    .then(res=>res.json())
                    .then(json=>ProductListing.fromJsonArray(json));
                // Set the products and stop loading
                setProducts(data);
                setLoading(false);
            } catch (error) {
                // Log the error and stop loading
                console.error(error);
                setLoading(false);
            }
        }
        fetchProductListings();
    }, []);
    
    return (
        <div className="w-screen h-full px-24 py-8 flex flex-col justify-start">
            {/* Header */}
            <Header text="Product Listing"/>
            {loading 
                ? 
                /* Loader */
                <Loader />
                :
                /* Product Listings */
                <div className="grid grid-cols-4 gap-12 mt-8">
                    {products.map((product, index) => (
                        <ProductCard key={index} index={index} product={product} />
                    ))}
                </div>
            }
        </div>
    );
}