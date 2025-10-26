import { showLoader } from "../components/showLoader";
import { showNotification } from "../components/showNotification";
import { showSuccess } from "../components/showSuccess";
import type { CartItem, Order } from "../types/cart";
import { safeFetch } from './http';



export default async function fetchDataForCart() {
    const productsInCart = localStorage.getItem('cartItems');
    const cartItems = document.querySelector('.products-list') as HTMLElement | null;
    const formData: Order = {
        items: [],
        totalPrice: 0,
    };

    const displayedInCartProducts = document.getElementsByClassName("productsAmount");
    if (displayedInCartProducts) {
        displayedInCartProducts[0].innerHTML = (localStorage.getItem('cartItems')) ? `${JSON.parse(localStorage.getItem('cartItems')!).length}` : '0';
    }

    const cartItemsList = productsInCart ? JSON.parse(productsInCart) : [];

    if(localStorage.getItem('token') !== null) {
        const signInButton = document.querySelector('.sign-in-button') as HTMLElement | null;
        const registerButton = document.querySelector('.register-button') as HTMLElement | null;
        signInButton!.style.display = 'none';
        registerButton!.style.display = 'none';
    } else {
        const confirmButton = document.querySelector('.confirm-order-button') as HTMLElement | null;
        confirmButton!.style.display = 'none';
    }

    if (!cartItems) {
        return;
    }

    initializeLogRegButtons();

    let paymentMethod = '';
    let addtionalInfo = null;
    if(localStorage.getItem('token') !== null) {
        showLoader(true);
        addtionalInfo = await fetchProfileData();
        showLoader(false);
        if(addtionalInfo.paymentMethod === 'card') {
            paymentMethod = 'Card'
        } else if(addtionalInfo.paymentMethod === 'cash') {
            paymentMethod = 'Cash'
        }
    }
    
    
    const profileInner = addtionalInfo ? `
        <div class="add-info">
            <span class="add-info-first">Address</span>
            <span class="add-info-second">${addtionalInfo.street}</span>
        </div>
        <div class="add-info">
            <span class="add-info-first">Pay by:</span>
            <span class="add-info-second">${paymentMethod}</span>
        </div>
    ` : '';

    const profileHTML = profileInner ? `<div class="profile-block">${profileInner}</div>` : '';

    const additionalInfoContainer = document.querySelector('.additional-information') as HTMLElement | null;
    if (localStorage.getItem('token') !== null && additionalInfoContainer) {
        const existing = additionalInfoContainer.querySelector('.profile-block') as HTMLElement | null;
        if (existing) {
            if (existing.innerHTML !== profileInner) {
                existing.remove();
                additionalInfoContainer.insertAdjacentHTML('beforeend', profileHTML);
            }
        } else if (profileHTML) {
            additionalInfoContainer.insertAdjacentHTML('beforeend', profileHTML);
        }
    }

    const confirmButton = document.querySelector('.confirm-order-button') as HTMLButtonElement | null;
    const cartList = productsInCart ? JSON.parse(productsInCart) : [];
    if (confirmButton) {
        const isEmpty = !Array.isArray(cartList) || cartList.length === 0;
        confirmButton.disabled = isEmpty;
        confirmButton.classList.toggle('disabled', isEmpty);
    }


    if (!cartItemsList || cartItemsList.length === 0) {
        const cartTotalPrice = document.querySelector('.cart-total-amount') as HTMLElement | null;
        if (cartTotalPrice) cartTotalPrice.innerHTML = '$0.00';
        return;
    }

    let totalDiscountPrice = 0;

    cartItems.innerHTML = cartItemsList!.map((item: CartItem) => {
        formData.items.push({
            productId: item.id,
            size: Object.keys(item.selectedSize)[0],
            additives: item.selectedAdditives.map((additive: { name: string; }) => additive.name),
            quantity: 1,
        });

        let finalSizes = item.selectedSize[Object.keys(item.selectedSize)[0]]['size']

        item.selectedAdditives.forEach((additive) => {
            finalSizes += `, ${additive.name}`;
        })

        const cartTotalPrice = document.querySelector('.cart-total-amount') as HTMLElement;

        let priceWithDiscount = 0;
        if (item.selectedSize[Object.keys(item.selectedSize)[0]].discountPrice) {
            priceWithDiscount = Number(item.selectedSize[Object.keys(item.selectedSize)[0]].discountPrice);
        } else {
            priceWithDiscount = Number(item.selectedSize[Object.keys(item.selectedSize)[0]].price);
        }
        totalDiscountPrice += priceWithDiscount;

        let htmlPrice = ''
        if (priceWithDiscount > 0) {
            htmlPrice = `${priceWithDiscount}`;
        }
        htmlPrice = parseFloat(htmlPrice).toFixed(2);

        if(localStorage.getItem('token') !== null && item.selectedSize.discountPrice !== null && item.finalPrice !== priceWithDiscount) {
            htmlPrice = `
                <h3 class="strikethrough">$${parseFloat(item.finalPrice.toString()).toFixed(2)}</h3>
                <h3>$${htmlPrice}</h3>
            `
        } else {
            htmlPrice = `<h3>$${htmlPrice}</h3>`
        }

        if(localStorage.getItem('token') !== null) {
            const firstTotalAmount = document.querySelector('.first-total-amount') as HTMLElement | null;
            if (firstTotalAmount) {
                firstTotalAmount.style.display = 'inline-block';
                firstTotalAmount.innerHTML = `$${cartItemsList.reduce((total: number, currentItem:CartItem) => total + parseFloat(currentItem.finalPrice.toString()), 0).toFixed(2)}`;
                cartTotalPrice.innerHTML = `$${parseFloat(totalDiscountPrice.toString()).toFixed(2)}`;
                formData.totalPrice = parseFloat(totalDiscountPrice.toString());
            } else {
                cartTotalPrice.innerHTML = `$${cartItemsList.reduce((total: number, currentItem:CartItem) => total + parseFloat(currentItem.finalPrice.toString()), 0).toFixed(2)}`;
                formData.totalPrice = cartItemsList.reduce((total: number, currentItem:CartItem) => total + parseFloat(currentItem.finalPrice.toString()), 0);
            }
            
        } else {
            cartTotalPrice.innerHTML = `$${cartItemsList.reduce((total: number, currentItem:CartItem) => total + parseFloat(currentItem.finalPrice.toString()), 0).toFixed(2)}`;
            formData.totalPrice = cartItemsList.reduce((total: number, currentItem:CartItem) => total + parseFloat(currentItem.finalPrice.toString()), 0);
        }

        return (`
            <div class="cart-item-wrapper">
                <button class="cart-item-remove">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 6H15.375M3 6H8.625M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6H15.375" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <div class="cart-size-details">
                        ${finalSizes}
                    </div>
                </div>
                <div class="cart-item-price">
                    ${htmlPrice}
                </div>
            </div>
        `)}).join('');

        const removeButtons = document.querySelectorAll('.cart-item-remove');
        removeButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                cartItemsList.splice(index, 1);
                localStorage.setItem('cartItems', JSON.stringify(cartItemsList));
                fetchDataForCart();
            });
        });

        const newFormData = groupBySimilarProducts(formData);

        if (confirmButton) {
        confirmButton.addEventListener('click', async () => {
        try {
            showLoader(true);
            confirmButton.setAttribute('disabled', 'true');

            const response = await safeFetch(`${import.meta.env.VITE_COFFEE_API_KEY}/orders/confirm`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFormData),
            });
            if (!response.ok) {
                throw new Error(`Something went wrong try again`);
            }
            const json = await response.json();
            console.log('Order confirmed:', json);

            showSuccess("Thank you for your order! Our manager will contact you shortly.")
            resetPage();

        } catch (error) {
            showNotification('Something went wrong. Please try again.');
            console.error('Error confirming order:', error);
        } finally {
            showLoader(false);
            confirmButton.removeAttribute('disabled');
            
        }
    });
    }
}

function resetPage() {
    localStorage.removeItem('cartItems');
    const prodList = document.querySelector('.products-list') as HTMLElement | null;
    const prodAmount = document.querySelector('.productsAmount') as HTMLElement | null;
    const priceInfoFirst = document.querySelector('.first-total-amount') as HTMLElement | null;
    const cartTotalPrice = document.querySelector('.cart-total-amount') as HTMLElement | null;
    if (cartTotalPrice) cartTotalPrice.innerHTML = '$0.00';
    if (priceInfoFirst) { priceInfoFirst.style.display = 'none' }
    if (prodAmount) { prodAmount.innerHTML = '0' }
    if (prodList) { prodList.innerHTML = '' }
}

async function fetchProfileData() {
    try {
        const profileRes = await safeFetch(`${import.meta.env.VITE_COFFEE_API_KEY}/auth/profile`, {
            method: 'GET',
            headers: {
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

function groupBySimilarProducts(formData: Order) : Order{
    const grouped = new Map<string, Order['items'][0]>();

    for (const item of formData.items) {
        const additivesKey = Array.isArray(item.additives) ? [...item.additives].slice().sort().join('|') : '';
        const key = `${item.productId}|${item.size}|${additivesKey}`;

        if (grouped.has(key)) {
            grouped.get(key)!.quantity += item.quantity ?? 1;
        } else {
            grouped.set(key, {
                productId: item.productId,
                size: item.size,
                additives: Array.isArray(item.additives) ? [...item.additives] : [],
                quantity: item.quantity ?? 1,
            });
        }
    }

    return {
        items: Array.from(grouped.values()),
        totalPrice: formData.totalPrice
    };
}

function initializeLogRegButtons() {
    const base = import.meta.env.BASE_URL ?? '/';

    const signInButton = document.querySelector('.sign-in-button') as HTMLElement | null;
    if (signInButton) {
        signInButton.addEventListener('click', () => {
            const href = `${base}login`;
            history.pushState({}, '', href);
            window.dispatchEvent(new Event('popstate'));
        });
    }

    const registerButton = document.querySelector('.register-button') as HTMLElement | null;
    if (registerButton) {
        registerButton.addEventListener('click', () => {
            const href = `${base}register`;
            history.pushState({}, '', href);
            window.dispatchEvent(new Event('popstate'));
        });
    }
}