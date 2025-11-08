import { showLoader } from "../components/showLoader";
import { showNotification } from "../components/showNotification";
import type { Dispatch, SetStateAction } from "react";

interface Product {
    id: string;
    sizes: Record<string, unknown>;
    [key: string]: unknown;
}

interface ApiResponse<T> {
    data: T;
}

export async function fetchProduct(
    onClose: () => void,
    setProduct: Dispatch<SetStateAction<Product | null>>,
    setCurrentSize: Dispatch<SetStateAction<string | undefined>>,
    obj: { id: string }
): Promise<void> {
    try {
        showLoader(true);
        const response = await fetch(`${import.meta.env.VITE_COFFEE_API_KEY}/products/${obj.id}`);
            if (!response.ok) {
                showNotification("Something went wrong, try again");
                onClose();
            }
            const data = (await response.json()) as ApiResponse<Product>;
        setProduct(data.data);
        setCurrentSize(Object.keys(data.data.sizes)[0]);
    } catch (error) {
        console.error("Error fetching product data:", error);
    } finally {
        showLoader(false);
    }
}