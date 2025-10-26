import type { Products } from "../types/product";

export async function favoritesService(): Promise<Products> {
    const url = `${import.meta.env.VITE_COFFEE_API_KEY}/products/favorites`;
    try {
        const res = await fetch(url);
        const json = await res.json();
        const products = json.data ?? json;
        return { products: products };
    } catch (err) {
        console.error('[favoritesService] fetch error', err);
        throw err;
    }
}
