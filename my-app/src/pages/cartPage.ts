export function renderCart():string{
    return `
        <div class="cart-page">
            <h2>Cart</h2>
            <div class="products-list">

            </div>
            <div class="cart-total">
                <span>Total:</span>
                <span class="total-amount">$0.00</span>
            </div>
            <div class="cart-actions-wrapper">
                <div class="cart-actions">
                    <button>Sign In</button>
                    <button>Registration</button>
                </div>
            </div>
        </div>
    `
}