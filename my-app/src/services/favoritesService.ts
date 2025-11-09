import type { Products } from "../types/product";
import { safeFetch } from './http';

export async function favoritesService(): Promise<Products> {
    const url = `${import.meta.env.VITE_COFFEE_API_KEY}/products/favorites`;
    try {
        const res = await safeFetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch favorites, status ${res.status}`);
        }
        const json = await res.json();
        const products = json.data ?? json;
        return { products: products };
    } catch (err) {
        console.error('[favoritesService] fetch error', err);
        throw err;
    }
}
