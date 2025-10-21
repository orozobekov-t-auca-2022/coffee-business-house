export default function fetchDataForCart() {
  console.log("fetchDataForCart works");

  const productsInCart = localStorage.getItem("cartItems");
  const cartItemsContainer = document.querySelector(".products-list") as HTMLElement;

  if (!cartItemsContainer) {
    console.warn("⚠️ .products-list not found in DOM");
    return;
  }

  const cartItemsList = productsInCart ? JSON.parse(productsInCart) : [];
  console.log("Products in cart:", cartItemsList);

  if (cartItemsList.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Your cart is empty ☕</p>`;
    return;
  }

  cartItemsContainer.innerHTML = cartItemsList
    .map((item) => {
      const sizeLabel = item.selectedSize?.size || "Regular";
      const additives =
        item.selectedAdditives?.map((a) => a.name).join(", ") || "No additives";

      return `
        <div class="cart-item">
          <div class="cart-item-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg" class="remove-item">
              <path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" 
                    stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 6H15.375M3 6H8.625M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6H15.375" 
                    stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <img src="${item.image}" alt="${item.name}" class="cart-image"/>
          </div>
          <div class="cart-item-right">
            <h3>${item.name}</h3>
            <p class="cart-item-details">${sizeLabel}, ${additives}</p>
            <p class="cart-item-price">$${item.price}</p>
          </div>
        </div>
      `;
    })
    .join("");
}
