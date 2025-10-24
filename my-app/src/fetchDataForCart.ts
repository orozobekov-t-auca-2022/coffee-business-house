export default function fetchDataForCart() {
    const productsInCart = localStorage.getItem('cartItems');
    const cartItems = document.querySelector('.products-list') as HTMLElement | null;

    const cartItemsList = productsInCart ? JSON.parse(productsInCart) : [];

    if(localStorage.getItem('token') !== null) {
        const signInButton = document.querySelector('.sign-in-button') as HTMLElement | null;
        const registerButton = document.querySelector('.register-button') as HTMLElement | null;
        signInButton.style.display = 'none';
        registerButton.style.display = 'none';
    } else {
        const confirmButton = document.querySelector('.confirm-order-button') as HTMLElement | null;
        confirmButton.style.display = 'none';
    }

    if (!cartItems) {
        return;
    }

    if (!cartItemsList || cartItemsList.length === 0) {
        cartItems.innerHTML = `<div class="empty-cart">Your cart is empty</div>`;
        const cartTotalPrice = document.querySelector('.cart-total-amount') as HTMLElement | null;
        if (cartTotalPrice) cartTotalPrice.innerHTML = '$0.00';
        return;
    }

    cartItems.innerHTML = cartItemsList!.map((item) => {
        let finalSizes = item.selectedSize['size']

    item.selectedAdditives.forEach((additive) => {
            finalSizes += `, ${additive.name}`;
        })

        const cartTotalPrice = document.querySelector('.cart-total-amount') as HTMLElement;
        cartTotalPrice.innerHTML = `$${cartItemsList.reduce((total: number, currentItem) => total + parseFloat(currentItem.finalPrice.toString()), 0).toFixed(2)}`;

        let priceWithDiscount = 0;
        if (item.selectedSize.discountPrice) {
            priceWithDiscount = Number(item.selectedSize.discountPrice);
        } else {
            priceWithDiscount = Number(item.selectedSize.price);
        }

        for(let key = 0; key < item.selectedAdditives.length; key++) {
            if (item.selectedAdditives[key].discountPrice) {
                priceWithDiscount += Number(item.selectedAdditives[key].discountPrice);
            } else {
                priceWithDiscount += Number(item.selectedAdditives[key].price);
            }
        }

        let htmlPrice = ''
        if (priceWithDiscount > 0) {
            htmlPrice = `<h3>${priceWithDiscount}</h3>`;
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
                    <h3>$${htmlPrice}</h3>
                    <h3 class="strikethrough">$${parseFloat(item.finalPrice.toString()).toFixed(2)}</h3>
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