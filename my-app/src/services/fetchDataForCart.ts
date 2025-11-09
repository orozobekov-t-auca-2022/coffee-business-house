import { showLoader } from "../components/showLoader";
import { showNotification } from "../components/showNotification";
import { showSuccess } from "../components/showSuccess";
import type { Order } from "../types/cart";
import { safeFetch } from './http';

export default async function fetchDataForCart(formData:Order) {
    try {
        showLoader(true);
        const response = await safeFetch(`${import.meta.env.VITE_COFFEE_API_KEY}/orders/confirm`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error(`Something went wrong try again`);
        }
        const json = await response.json();
        console.log('Order confirmed:', json);
        showSuccess("Thank you for your order! Our manager will contact you shortly.");
    } catch (error) {
        showNotification('Something went wrong. Please try again.');
        console.error('Error confirming order:', error);
    } finally {
        showLoader(false);            
    }
}

export async function fetchProfileData() {
    try {
        const profileRes = await safeFetch(`${import.meta.env.VITE_COFFEE_API_KEY}/auth/profile`, {
            method: 'GET',
            headers: {
                Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
            }
        });
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profileJson = await profileRes.json();
        return profileJson.data;
    } catch (err) {
        console.error('[fetchDataForCart] fetch profile error', err);
        throw err;
    }
}