import { ProductListing } from "../Model/ProductListing";

export function AddProductToCart(product: ProductListing) {
    let object = fetch('https://fakestoreapi.com/carts',{
        method:"POST",
        body:JSON.stringify(
            {
                userId:5,
                date: new Date(),
                products:[{
                    productId: product.getID(),
                    quantity:1
                }]
            }
        )
    })
    .then(res=>res.json())
    return object;
}