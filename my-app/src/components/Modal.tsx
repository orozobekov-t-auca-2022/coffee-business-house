import { useEffect, useState } from "react";
import type { Product } from "../types/product"
import { showLoader } from "./showLoader";
import { showNotification } from "./showNotification";
import type { Additive } from "../types/cart";

interface ModalProps {
    obj: Product;
    image: string;
    onClose: () => void;
}

function Modal({ obj, image, onClose }: ModalProps) {
    const [product, setProduct] = useState<Product>();
    const [currentSize, setCurrentSize] = useState<string>("");
    const [additives, setAdditives] = useState<Array<Additive>>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        async function fetchProduct() {
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
        fetchProduct();
    },[])
    
    useEffect(() => {
        calculateTotalPrice();
    }, [currentSize, additives])

    function handleBackgroundClick(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    function changeSize(size: string) {
        setCurrentSize(size);
    }
    function addAdditive(additive: Additive) {
        setAdditives((prevAdditives) => {
            const exists = prevAdditives.find((item) => item.name === additive.name);
            if (exists) {
                return prevAdditives.filter((item) => item.name !== additive.name);
            } else {
                return [...prevAdditives, additive];
            }
        });
    }
    function calculateTotalPrice() {
        let price = 0;
        if (product) {
            price += parseFloat(product.sizes[currentSize.toLowerCase()].price);
            additives.forEach((additive) => {
                price += parseFloat(additive.price);
            });
        }
        setTotalPrice(price);
    }

    function addToCart() {
        if (!product) return;
        const formData = {
            ...product,
            'image': image,
            'selectedSize': {
                [currentSize]: product!.sizes[currentSize.toLowerCase()]
            },
            'finalPrice': totalPrice,
            'selectedAdditives': additives
        }
        if(localStorage.getItem('cartItems')){
            localStorage.setItem('cartItems', JSON.stringify([...JSON.parse(localStorage.getItem('cartItems') as string), formData]));
        } else {
            localStorage.setItem('cartItems', JSON.stringify([formData]));
        }
    }

    return <>
    {product ? (
        <div className="modal" onClick={handleBackgroundClick}>
            <div className="modal-content">
                <img src={`${image}`} alt=""/>
                <div className="modal-text">
                    <h3>{product!['name']}</h3>
                    <p>{product!['description']}</p>
                    <label>Size</label>
                    <div className="sizes">
                        {
                            Object.keys(product!['sizes']).map((sizeKey, index) => {
                                return <button className={`modal-text-option-btns ${currentSize === sizeKey ? 'active' : ''}`} data-size={sizeKey} key={sizeKey} onClick={() => changeSize(sizeKey)}>
                                    <span className="size">{sizeKey.toUpperCase()}</span>
                                    <span>{product.sizes[sizeKey].size}</span>
                                </button>
                            })
                        }
                    </div>
                    <label>Additives</label>
                    <div className="additives">
                        {
                            product!['additives'].map((additive, key) => (
                                <button className={`modal-text-option-btns ${additives.find((item) => item.name === additive.name) ? 'active' : ''}`} data-additive={additive.name} key={key} onClick={() => addAdditive(additive)}>
                                    <span className="additInd">{key}</span>
                                    <span>{additive.name}</span>
                                </button>
                            ))
                        }
                    </div>
                    <div className="modal-price">
                        <h3>Total:</h3>
                        <h3 className="modal-price-text">${parseFloat(totalPrice.toString()).toFixed(2)}</h3>
                    </div>
                    <button className="add-to-cart-btn" onClick={
                        () => {
                            onClose();
                            addToCart();
                        }
                    }>Add to Cart</button>
                </div>
                <button className="close-modal-button" onClick={onClose}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.34326 1.34314L12.657 12.6568" stroke="#E1D4C9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1.34326 12.6569L12.657 1.34315" stroke="#E1D4C9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>):
        (<></>)
    }
    </>
}

export default Modal