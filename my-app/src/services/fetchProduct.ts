import { showLoader } from "../components/showLoader";
import { showNotification } from "../components/showNotification";

export async function fetchProduct(onClose, setProduct, setCurrentSize, obj) {
    try {
        showLoader(true);
        const response = await fetch(`${import.meta.env.VITE_COFFEE_API_KEY}/products/${obj.id}`);
            if (!response.ok) {
                showNotification("Something went wrong, try again");
                onClose();
            }
            const data = await response.json();
        setProduct(data.data);
        setCurrentSize(Object.keys(data.data.sizes)[0]);
    } catch (error) {
        console.error("Error fetching product data:", error);
    } finally {
        showLoader(false);
    }
}