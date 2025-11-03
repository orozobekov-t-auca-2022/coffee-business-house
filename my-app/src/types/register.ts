export interface RegistrationData {
    login: string;
    password: string;
    confirmPassword: string;
    city: string;
    street: string;
    houseNumber: string;
    paymentMethod: 'cash' | 'card' | null;
}