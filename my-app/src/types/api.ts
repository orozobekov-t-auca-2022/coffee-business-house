import { Categories } from "./product";

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discountPrice: number;
    category: Categories
}

export type ProductsResponse = ApiResponse<Product[]>;