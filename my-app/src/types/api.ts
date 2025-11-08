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
    price: number | string;
    discountPrice: number | string | null;
    category: Categories
}

export interface ExtendedProduct extends Product {
    sizes: Record<string, {
        size: string;
        price: number | string;
        discountPrice?: number | string | null;
    }>;
    additives: Array<{ name: string; price: number | string; discountPrice?: number | string | null }>;
}

export type ProductsResponse = ApiResponse<Product[]>;
export type ExtendedProductsResponse = ApiResponse<ExtendedProduct[]>;