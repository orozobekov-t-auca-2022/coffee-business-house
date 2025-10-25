export function renderCart():string{
    return `
        <div class="cart-page">
            <h2>Cart</h2>
            <div class="products-list">

            </div>
            <div class="additional-information">
                <div class="cart-total">
                    <span class="price-info-first">Total:</span>
                    <span class="first-total-amount">$0.00</span>
                    <span class="cart-total-amount">$0.00</span>
                </div>
            </div>
            <div class="cart-actions-wrapper">
                <div class="cart-actions">
                    <button class="sign-in-button">Sign In</button>
                    <button class="register-button">Registration</button>
                    <button class="confirm-order-button">Confirm</button>
                </div>
            </div>
        </div>
    `
}