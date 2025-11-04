import type { Product } from "./product";

export interface ModalTooltip {
    visible: boolean;
    message: string;
    x: number;
    y: number;
}

export interface ModalProps {
    obj: Product;
    image: string;
    onClose: () => void;
}