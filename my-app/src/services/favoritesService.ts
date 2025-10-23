import type { Products } from "../types/product";

export async function favoritesService(): Promise<Products> {
    const res = await fetch(`${import.meta.env.VITE_COFFEE_API_KEY}/products/favorites`).then(res => res.json());
    console.log(res)
    return {products:res.data};
}
