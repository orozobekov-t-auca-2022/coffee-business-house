import { showNotification } from "../components/showNotification";
import { showSuccess } from "../components/showSuccess";
import type { RegistrationData } from "../types/register";

export async function registrationService(formData: RegistrationData): Promise<void> {
    try {
        const res = await fetch(`${import.meta.env.VITE_COFFEE_API_KEY}` + `/auth/register`, {
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
        const data = await res.json();
        localStorage.setItem('token', data.data.access_token);
        showSuccess("Registration successful! You can now log in.");
        return data.data
    } catch (error) {
        console.error(error);
        showNotification('Something wrong happened during registration. The user with the same credentials already exists.');
    }
}