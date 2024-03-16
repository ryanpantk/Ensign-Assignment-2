import { Link } from "react-router-dom";

export default function ProductCard({index, product}) {
    return (
        <Link to={`/product/${index}`}>
            <div key={index} className="bg-white rounded-xl shadow-md hover:scale-110">
                {/* Product Image */}
                <img src={product.getImage()} alt={product.getTitle()} className="w-full h-80 object-cover rounded-xl" />
                <div className="px-8 my-4 min-h-44 grid grid-cols-12 items-center">
                    {/* Product Title and Category*/}
                    <div className="col-span-8">
                        <h1 className="text-xl text-gray-600 font-semibold">{product.getTitle()}</h1>
                        <p className="text-md text-gray-400 capitalize my-4">{product.getCategory()}</p>
                    </div>
                    {/* Product Price */}
                    <p className="text-2xl font-bold col-span-4 justify-self-end">${product.getPrice()}</p>
                </div>
            </div>
        </Link>
    )
}