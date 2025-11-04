import { useEffect, useState } from "react";
import { type Profile, type CartItem, type Order, type Product as OrderProduct } from "../types/cart";
import { Link } from "react-router-dom";
import fetchDataForCart from "../services/fetchDataForCart";

export async function fetchProfileData() {
    try {
        const profileRes = await fetch(`${import.meta.env.VITE_COFFEE_API_KEY}/auth/profile`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
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

function Cart() {
    const [productItems, setProductItems] = useState<Array<CartItem>>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [totalAmountWithDiscount, setTotalAmountWithDiscount] = useState<number>(0);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [formData, setFormData] = useState<Order>({
        items: [],
        totalPrice: 0
    });

    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            setProductItems(JSON.parse(storedCartItems));
        }
        if(localStorage.getItem('token')){
            async function fetchProfile() {
                const profInfo = await fetchProfileData();
                setProfile(profInfo);
            }
            fetchProfile();
        }
    }, [])

    useEffect(() => {
        let amount = 0;
        let discountAmount = 0;
        productItems.forEach((item) => {
            amount += item.finalPrice;
            if(localStorage.getItem('token') && item.discountPrice){
                discountAmount += Number(item.discountPrice);
            }
        });
        setTotalAmount(amount);
        setTotalAmountWithDiscount(discountAmount);

    }, [productItems])

    function removeItemFromCart(itemToRemove: CartItem) {
        const updatedCartItems = productItems.filter((item) => item !== itemToRemove);
        setProductItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }

    function confirmOrder() {
        const combinedItems: OrderProduct[] = [];

        productItems.forEach((cartItem) => {
            const size = Object.keys(cartItem.selectedSize)[0];
            const additives = cartItem.selectedAdditives.map(additive => additive.name);

            const existing = combinedItems.find((item) =>
                item.productId === cartItem.id &&
                item.size === size &&
                item.additives.length === additives.length &&
                item.additives.every(add => additives.includes(add))
            )

            if(existing) {
                existing.quantity += 1;
            } else {
                combinedItems.push({
                    productId: cartItem.id,
                    size: size,
                    additives: additives,
                    quantity: 1
                })
            }
        })
        setFormData({
            items: combinedItems,
            totalPrice: totalAmountWithDiscount
        })
        try {
            fetchDataForCart(formData);
            localStorage.removeItem("cartItems");
            setProductItems([]);
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    }


    return <>
        <div className="cart-page">
            <h2>Cart</h2>
            <div className="products-list">
                {productItems && (
                    productItems.map((item) => (
                        <div className="cart-item-wrapper">
                        <button className="cart-item-remove" onClick={() => removeItemFromCart(item)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#403F3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M21 6H15.375M3 6H8.625M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6H15.375" stroke="#403F3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <div className="cart-item-image">
                            <img src={`${item.image}`} alt={`${item.name}`} />
                        </div>
                        <div className="cart-item-info">
                            <h3>{item.name}</h3>
                            <div className="cart-size-details">
                                {
                                    Object.keys(item.selectedSize).map((sizeKey) => (
                                        <span key={sizeKey}>Size: {item.selectedSize[sizeKey].size}</span>
                                    ))
                                }
                                {
                                    Object.keys(item.selectedAdditives).map((additiveKey, index) => {
                                        
                                        return (
                                            <>
                                                <span key={additiveKey}> {item.selectedAdditives[additiveKey].name}</span>
                                                {(index !== item.selectedAdditives.length - 1) && (<span>,</span>)}
                                            </>
                                        )
                                        
                                    })
                                }
                            </div>
                        </div>
                        <div className="cart-item-price">
                            {
                                (item.price !== item.discountPrice) ? (
                                    <>
                                        <h3 className="strikethrough">${parseFloat(item!.finalPrice).toFixed(2)}</h3>
                                        <h3>${parseFloat(item!.discountPrice.toString()).toFixed(2)}</h3>
                                    </>
                                ) : (
                                    <h3>${parseFloat(item!.finalPrice.toString()).toFixed(2)}</h3>
                                )
                            }
                        </div>
                        </div>
                    ))
                )}
            </div>
            <div className="additional-information">
                <div className="cart-total">
                    <span className="price-info-first">Total:</span>
                    {!localStorage.getItem('token') ? (<span className="cart-total-amount">${totalAmount.toFixed(2)}</span>)
                    : ( 
                        <div style={{display:'flex', gap:'20px'}}>
                            <span className="cart-total-amount strikethrough">${totalAmount.toFixed(2)}</span>
                            <span className="cart-total-amount">${totalAmountWithDiscount.toFixed(2)}</span>
                        </div>
                    )}
                    </div>
                {
                    profile && (<>
                        <div className="add-info">
                            <span className="add-info-first">Address</span>
                            <span className="add-info-second">{profile.street}</span>
                        </div>
                        <div className="add-info">
                            <span className="add-info-first">Pay by:</span>
                            <span className="add-info-second">{profile.paymentMethod}</span>
                        </div>
                    </>)
                }
            </div>
            <div className="cart-actions-wrapper">
                <div className="cart-actions">
                    {localStorage.getItem('token') ? (
                        <button className="confirm-order-button" onClick={confirmOrder}>Confirm</button>
                    ):(
                        <>
                            <button><Link to="/login" className="sign-in-button">Sign In</Link></button>
                            <button><Link to="/registration" className="register-button">Registration</Link></button>
                        </>
                    )}
                </div>
            </div>
        </div>
    </>
}

export default Cart