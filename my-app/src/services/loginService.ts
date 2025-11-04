import { showSuccess } from "../components/showSuccess";
import type { LoginData } from "../types/login";
import { safeFetch } from './http';

export async function loginService(formData: LoginData): Promise<void>{
    try {
        const res = await safeFetch(`${import.meta.env.VITE_COFFEE_API_KEY}` + `/auth/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });
        if (!res.ok) {
            throw new Error(`Error with status: ${res.status}`);
        }
        const response = await res.json();
        showSuccess("Login successful! Redirecting to menu...");
        localStorage.setItem('token', response.data.access_token);
    } catch (error) {
        console.error(error);
    }
}