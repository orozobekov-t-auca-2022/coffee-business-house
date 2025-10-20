import { coffeeImages } from "./imageDictionaries/coffeeImages";
import fetchMenuProducts, { displayProductsByCategory } from "./fetchMenuProducts";
import { router } from "./router";
import { fetchFavorites } from "./services/favoritesService";
import type { Products } from "./types/product";
import { renderMenu } from "./pages/menuPage";

let favoriteProducts : Products = []

let currentProduct = 0;
let TOTAL_PRODUCTS = 0;

function showLoader(show: boolean) {
  if (!show){
    document.getElementById("loader")?.classList.add("hidden");
  } else {
    document.getElementById("loader")?.classList.remove("hidden");
  }
}

export async function loadFavorites(): Promise<string> {
  showLoader(true)
  try {
    favoriteProducts = await fetchFavorites();    
    return favoriteProducts.products.map((p) =>`
    <div class="product-card fade">
        <img src="${coffeeImages[p.name]}" alt="product-img">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <h3>$${p.price}</h3>
      </div>
    `).join('');
  } catch (error) {
    return `<p>Something went wrong while loading favorite products. Try refreshing the page.</p>`;
  } finally {
    showLoader(false)
  }
}

window.addEventListener("DOMContentLoaded", async() => {
  router();
  const coffeeCard = document.querySelector(".coffee-card");
  const loaderExists = document.getElementById("loader");
  if (coffeeCard) {
      coffeeCard.innerHTML = await loadFavorites();
  }

  const productCards = Array.from(document.getElementsByClassName("product-card"));
  console.log(productCards[0])
  TOTAL_PRODUCTS = productCards.length;

  if (TOTAL_PRODUCTS === 0) {
    return;
  }
  function showCurrentSlide(){
    productCards.forEach((el, i) => {
      el.style.display = (i === currentProduct) ? "block" : "none";
    });
  }

  const swipeLeft = document.querySelector(".swipe-left");
  const swipeRight = document.querySelector(".swipe-right");

  swipeLeft?.addEventListener("click", () => {
    currentProduct = (currentProduct === 0) ? TOTAL_PRODUCTS - 1 : currentProduct - 1;
    console.log(currentProduct);
    showCurrentSlide();
    changeSlideIndicator()
  });

  swipeRight?.addEventListener("click", () => {
    currentProduct = (currentProduct === TOTAL_PRODUCTS - 1) ? 0 : currentProduct + 1;
    console.log(currentProduct);
    
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