import { showLoader } from "../components/showLoader";
import { showNotification } from "../components/showNotification";
import type { Dispatch, SetStateAction } from "react";
import type { ExtendedProduct } from "../types/api";

interface ApiResponse<T> {
    data: T;
}

export async function fetchProduct(
    onClose: () => void,
    setProduct: Dispatch<SetStateAction<ExtendedProduct | undefined>>,
    setCurrentSize: Dispatch<SetStateAction<string>>,
    obj: { id: number }
): Promise<void> {
    try {
        showLoader(true);
        const response = await fetch(`${import.meta.env.VITE_COFFEE_API_KEY}/products/${obj.id}`);
            if (!response.ok) {
                showNotification("Something went wrong, try again");
                onClose();
            }
            const data = (await response.json()) as ApiResponse<ExtendedProduct>;
        setProduct(data.data);
        setCurrentSize(Object.keys(data.data.sizes)[0]);
    } catch (error) {
        console.error("Error fetching product data:", error);
    } finally {
        showLoader(false);
    }
}