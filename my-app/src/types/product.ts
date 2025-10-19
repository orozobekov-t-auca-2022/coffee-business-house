export enum Categories {
    Coffee = "coffee",
    Tea = "tea",
    Dessert = "dessert"
} as const;

export type Categories = (typeof Categories)[keyof typeof Categories]

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discountPrice: number;
    category: Categories
}

export interface Products {
    products: Product[]
}