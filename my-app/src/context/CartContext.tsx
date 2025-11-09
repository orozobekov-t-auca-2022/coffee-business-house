import React, { createContext, useEffect, useState } from 'react';

type CartContextValue = {
    count: number;
    addItem: () => void;
    removeItem: () => void;
    removeAllItems: () => void;
};

const CartContext = createContext<CartContextValue>({
    count: 0,
    addItem: () => {},
    removeItem: () => {},
    removeAllItems: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<number>(0);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("cartItems") || "0");
        if (storedItems) {
            setItems(storedItems.length);
        }
    },[])

    const addItem = () => {
        setItems((prev) => prev + 1);
    };

    const removeItem = () => {
        setItems((prev) => prev - 1);
    };

    const removeAllItems = () => setItems(0);

    const value: CartContextValue = {
        count: items,
        addItem,
        removeItem,
        removeAllItems,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
