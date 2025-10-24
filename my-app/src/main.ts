import { showLoader } from "./components/showLoader";
import { coffeeImages } from "./imageDictionaries/coffeeImages";
import { router } from "./router";
import { favoritesService } from "./services/favoritesService";
import type { Products } from "./types/product";

let favoriteProducts : Products = { products: [] };

let currentProduct = 0;
let TOTAL_PRODUCTS = 0;

export async function loadFavorites(): Promise<string> {
  showLoader(true)
  await new Promise(resolve => setTimeout(resolve, 500));
  try {
    favoriteProducts = await favoritesService();
    console.log(favoriteProducts)
    return favoriteProducts.products.map((p) =>`
    <div class="product-card fade">
        <img src="${coffeeImages[p.name]}" alt="product-img">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <h3>$${p.price}</h3>
      </div>
    `).join('');
  } catch (error) {
    console.log(error);
    return `
      <div class="fetch-failure-message">
        <p>Something went wrong while loading favorite products. Try refreshing the page.</p>
      </div>`;
  } finally {
    showLoader(false)
  }
}

window.addEventListener("DOMContentLoaded", () => {
  router();
  window.dispatchEvent(new CustomEvent("pageLoaded", { detail: { path: window.location.pathname } }));
  const homeBtn = document.querySelector(".nav-list-home");
  homeBtn?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent("pageLoaded", { detail: { path: window.location.pathname } }));
  });
});

window.addEventListener("pageLoaded", async(e: Event) => {
  const path = (e as CustomEvent).detail.path;
  if (path === "/") {
    const coffeeCard = document.querySelector(".coffee-card");
    if (coffeeCard) {
      coffeeCard.innerHTML = await loadFavorites();
    }
  }
  const productCards = Array.from(document.getElementsByClassName("product-card"));
  TOTAL_PRODUCTS = productCards.length;

  if (TOTAL_PRODUCTS === 0) {
    return;
  }

  function showCurrentSlide(){
    productCards.forEach((el, i) => {
      (el as HTMLElement).style.display = (i === currentProduct) ? "block" : "none";
    });
  }
  showCurrentSlide();
  const swipeLeft = document.querySelector(".swipe-left");
  const swipeRight = document.querySelector(".swipe-right");

  swipeLeft?.addEventListener("click", () => {
    currentProduct = (currentProduct === 0) ? TOTAL_PRODUCTS - 1 : currentProduct - 1;
    showCurrentSlide();
    changeSlideIndicator();
  });

  swipeRight?.addEventListener("click", () => {
    currentProduct = (currentProduct === TOTAL_PRODUCTS - 1) ? 0 : currentProduct + 1;    
    showCurrentSlide();
    changeSlideIndicator();
  });
});

window.addEventListener("popstate", () => {
  router();
});


function changeSlideIndicator() {
  const sliders = document.querySelector(".sliders");
  if (sliders && sliders.children.length > 0) {
    Array.from(sliders.children).forEach(child => {
        child.innerHTML = `
          <svg width="40" height="4" viewBox="0 0 40 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="4" rx="2" fill="#C1B6AD"/>
          </svg>
          `
        });
        
    if (sliders.children[currentProduct]) {
      sliders.children[currentProduct].innerHTML = `
        <svg width="40" height="4" viewBox="0 0 40 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="4" rx="2" fill="#665F55"/>
        </svg>
        `;
      }
    }
}