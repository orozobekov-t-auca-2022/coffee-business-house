import { useEffect, useRef, useState } from "react";
import type { Product } from "../types/product"
import { showLoader } from "./showLoader";
import { showNotification } from "./showNotification";
import type { Additive } from "../types/cart";
import type { ModalProps, ModalTooltip } from "../types/modal";

function Modal({ obj, image, onClose }: ModalProps) {
    const [product, setProduct] = useState<Product>();
    const [currentSize, setCurrentSize] = useState<string>("");
    const [currentHoveredSize, setCurrentHoveredSize] = useState<string>("");
    const [currentHoveredAdditive, setCurrentHoveredAdditive] = useState<number | undefined>();
    const [additives, setAdditives] = useState<Array<Additive>>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalPriceWithDiscount, setTotalPriceWithDiscount] = useState<number>(0);
    const [toolTip, setToolTip] = useState<ModalTooltip>({
        visible: false,
        message: "",
        x: 0,
        y: 0
    });

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
        if(localStorage.getItem('token')){
            calculateTotalPriceWithDiscount();
        }
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

    function calculateTotalPriceWithDiscount() {
        let price = 0;
        if(localStorage.getItem('token') && product && product.sizes[currentSize.toLowerCase()].discountPrice) {
            price += parseFloat(product.sizes[currentSize.toLowerCase()].discountPrice);
            additives.forEach((additive) => {
                if(additive.discountPrice) {
                    price += parseFloat(additive.discountPrice);
                } else {
                    price += parseFloat(additive.price);
                }
            });
        }
        setTotalPriceWithDiscount(price);
    }

    function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>, priceInfo: { price: string; discountPrice?: string }) {
        const rect = e.currentTarget.getBoundingClientRect();
        setToolTip({
            visible: true,
            message: priceInfo,
            x: rect.left + rect.width / 2,
            y: rect.top - 8,
        });
    }

    function handleMouseLeave() {
        setToolTip({...toolTip, visible: false });
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
            'selectedAdditives': additives,
            'discountPrice': localStorage.getItem('token') ? totalPriceWithDiscount : totalPrice
        }
        if(localStorage.getItem('cartItems')){
            localStorage.setItem('cartItems', JSON.stringify([...JSON.parse(localStorage.getItem('cartItems') as string), formData]));
        } else {
            localStorage.setItem('cartItems', JSON.stringify([formData]));
        }
    }

    if(!product) {
        return null;
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
                                const sizeInfo = product!.sizes[sizeKey];
                                return <button className={`modal-text-option-btns ${currentSize === sizeKey ? 'active' : ''}`} data-size={sizeKey} key={sizeKey} onClick={() => changeSize(sizeKey)} onMouseEnter={(e) => {handleMouseEnter(e, { price: sizeInfo.price, discountPrice: sizeInfo.discountPrice}); setCurrentHoveredSize(sizeKey);}} onMouseLeave={() => {handleMouseLeave(); setCurrentHoveredSize("");}}>
                                    <span className="size">{sizeKey.toUpperCase()}</span>
                                    <span>{product.sizes[sizeKey].size}</span>
                                </button>
                            })
                        }
                    </div>
                    <label>Additives</label>
                    <div className="additives">
                        {
                            product!['additives'].map((additive, key) => {
                                return <button className={`modal-text-option-btns ${additives.find((item) => item.name === additive.name) ? 'active' : ''}`} data-additive={additive.name} key={key} onClick={() => addAdditive(additive)} onMouseEnter={(e) => {handleMouseEnter(e, {price: additive.price, discountPrice: additive.discountPrice}); setCurrentHoveredAdditive(key)}} onMouseLeave={() => {handleMouseLeave(); setCurrentHoveredAdditive(undefined)}}>
                                    <span className="additInd">{key}</span>
                                    <span>{additive.name}</span>
                                </button>
                            })
                        }
                    </div>
                    <div className="modal-price">
                        <h3>Total:</h3>
                        {
                            (localStorage.getItem('token') && totalPriceWithDiscount < totalPrice) ? (
                                <div style={{display:'flex', gap: '20px'}}>
                                    {totalPriceWithDiscount === 0 ? (<h3 className="modal-price-text">${parseFloat(totalPrice.toString()).toFixed(2)}</h3>
                                    ) : (
                                        <>
                                            <h3 className="modal-price-text">${parseFloat(totalPriceWithDiscount.toString()).toFixed(2)}</h3>
                                            <h3 className="struck-through-price">${parseFloat(totalPrice.toString()).toFixed(2)}</h3>
                                        </>
                                    )}
                                </div>
                            ):(
                                <h3 className="modal-price-text">${parseFloat(totalPrice.toString()).toFixed(2)}</h3>
                            )
                        }
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
            {toolTip.visible && (
                currentHoveredSize ? (
                    <div className="size-tooltip" style={{left: toolTip.x,top: toolTip.y}}>
                        {(product.sizes[currentHoveredSize].discountPrice && localStorage.getItem('token')) ? (
                            <>
                                <h3>${product.sizes[currentHoveredSize].discountPrice}</h3>
                                <h3 className="struck-through-price">${product.sizes[currentHoveredSize].price}</h3>
                            </>
                        ) : (
                            <h3>${product.sizes[currentHoveredSize].price}</h3>
                        )}
                    </div>
                ) : currentHoveredAdditive !== undefined ? (
                    <div className="size-tooltip" style={{left: toolTip.x, top: toolTip.y}}>
                        {(product.additives[currentHoveredAdditive].discountPrice && localStorage.getItem('token')) ? (
                            <>
                                <h3>${product.additives[currentHoveredAdditive].discountPrice}</h3>
                                <h3 className="struck-through-price">${product.additives[currentHoveredAdditive].price}</h3>
                            </>
                        ) : (
                            <h3>${product.additives[currentHoveredAdditive].price}</h3>
                        )}
                    </div>
                ) : (<></>)
            )}
        </div>):
        (<></>)
    }
    </>
}

export default Modal