export interface Order {
    items: Array<{
        productId: number;
        size: string;
        additives: Array<string>;
        quantity: number;
    }>;
    totalPrice: number;
}

interface SizeOption {
    size: string;
    price: string;
    discountPrice?: string | null;
}

interface Additive {
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
