import { ProductListing } from "../Model/ProductListing";

const GetAllProducts = async (): Promise<ProductListing[]> => {
    const data = await fetch('https://fakestoreapi.com/products')
                    .then(res=>res.json())
                    .then(json=>json.map((item: any) => ProductListing.fromJson(item)));
    return data;
}

const GetProduct = async (id: string): Promise<ProductListing> => {
    const data = await fetch('https://fakestoreapi.com/products/'+ id)
                    .then(res=>res.json())
                    .then(json=>ProductListing.fromJson(json));
    return data;
}

export { GetAllProducts, GetProduct };