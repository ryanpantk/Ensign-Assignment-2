export class ProductListing {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;

    constructor(
            id: number,
            title: string, 
            price: number,
            category: string, 
            description: string, 
            image: string
        ) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
        this.description = description;
        this.image = image;
    }
    

    static fromJson(json: any) {
        return new ProductListing(
            json.id,
            json.title,
            json.price,
            json.category,
            json.description,
            json.image
        );
    }

    static fromJsonArray(json: any[]) {
        return json.map(ProductListing.fromJson);
    }

    getID() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getPrice() {
        return this.price;
    }

    getCategory() {
        return this.category;
    }

    getDescription() {
        return this.description;
    }

    getImage() {
        return this.image;
    }
}