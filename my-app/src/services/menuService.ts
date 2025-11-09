import { safeFetch } from './http';
import { type Product } from "../types/product";

let products : Product[] = []

export default async function menuService(): Promise<Product[]> {
    try {
        const response = await safeFetch(import.meta.env.VITE_COFFEE_API_KEY + '/products');
        if(!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        products = data['data'];
        return products;
    } catch (err) {
        console.error('[menuService] fetch products error', err);
        throw err;
    }
}