export interface Order {
    items: Array<{
        productId: number;
        size: string;
        additives: Array<string>;
        quantity: number;
    }>;
    totalPrice: number;
}

export interface SizeOption {
    size: string;
    price: string;
    discountPrice?: string | null;
}

export interface Additive {
    name: string;
    price: string;
    discountPrice?: string | null;
}

export interface CartItem {
    id: number;
    name: string;
    description: string;
    category: string;
    image: string;
    price: string;
    discountPrice?: string;
    finalPrice: number;
    additives: Additive[];
    selectedAdditives: Additive[];
    sizes: Record<string, SizeOption>;
    selectedSize: Record<string, SizeOption>;
}

export interface Profile {
    id: number;
    login: string;
    city: string;
    street: string;
    houseNumber: number;
    paymentMethod: string;
    createdAt: string;
}