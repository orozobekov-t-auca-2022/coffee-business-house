import { router } from "./router";
import { fetchFavorites } from "./services/favoritesService";
import type { Products } from "./types/product";

const swipeImages = ['./assests/coffee-slider-1.png', './assests/coffee-slider-2.png', './assests/coffee-slider-3.png']


let currentProduct = 0;
export async function loadFavorites(): Promise<string> {
  try {
    const favoriteProducts : Products = await fetchFavorites();
    return `
      <img src="${swipeImages[currentProduct]}" alt="product-img">
      <h3>${favoriteProducts.products[currentProduct].name}</h3>
      <p>${favoriteProducts.products[currentProduct].description}</p>
      <h3>${favoriteProducts.products[currentProduct].price}</h3>
    `
  } catch (error) {
    return `<p>Something went wrong while loading favorite products. Try refreshing the page.</p>`;
  }
}

window.addEventListener("DOMContentLoaded", async() => {
  router();
  const coffeeCard = document.querySelector(".coffee-card");
    if (coffeeCard) {
        coffeeCard.innerHTML = await loadFavorites();
    }
});

window.addEventListener("popstate", () => {
  router();
});
