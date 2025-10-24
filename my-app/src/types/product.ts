export enum Categories {
    Coffee = "coffee",
    Tea = "tea",
    Dessert = "dessert"
};

export type Category = (typeof Categories)[keyof typeof Categories]

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discountPrice: number;
    category: Category
}

export interface Products {
    products: Product[]
}