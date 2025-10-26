import { showLoader } from "./components/showLoader";
import { coffeeImages } from "./imageDictionaries/coffeeImages";
import { router } from "./router";
import { favoritesService } from "./services/favoritesService";
import type { Products } from "./types/product";
import './style.css'

let favoriteProducts : Products = { products: [] };
let favoriteHTML: string | null = null;
let favoritesLoaded = false;

let currentProduct = 0;
let TOTAL_PRODUCTS = 0;

export async function loadFavorites(force = false): Promise<string> {
  if (!force && favoritesLoaded && favoriteHTML !== null) {
    return favoriteHTML;
  }
  try {
    showLoader(true, '.coffee-cards');
    favoriteProducts = await favoritesService();
    favoriteHTML = favoriteProducts.products.map((p) =>`
    <div class="product-card fade">
        <img src="${coffeeImages[p.name]}" alt="product-img">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <h3>$${p.price}</h3>
      </div>
    `).join('');
    favoritesLoaded = true;
    return favoriteHTML;
  } catch (error) {
    console.log(error);
    return `
      <div class="fetch-failure-message">
        <p>Something went wrong while loading favorite products. Try refreshing the page.</p>
      </div>`;
  } finally {
    showLoader(false, '.coffee-cards');
  }
}

window.addEventListener("pageLoaded", async(e: Event) => {
  const path = (e as CustomEvent).detail.path;
  const base = import.meta.env.BASE_URL ?? '/';
  const baseNoSlash = base.endsWith('/') && base.length > 1 ? base.slice(0, -1) : base;
  if (path === "/" || path === base || path === baseNoSlash) {
    const coffeeCard = document.querySelector(".coffee-card");
    if (coffeeCard) {
      try {
        const html = await loadFavorites(true);
        coffeeCard.innerHTML = html;
        if (typeof initFavoritesSlider === 'function') {
          initFavoritesSlider();
        }
      } catch (err) {
        console.error('[main] Error loading favorites:', err);
      }
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


  const cartDisplay = document.getElementsByClassName("cartDisplay").item(0) as HTMLElement | null;
  const productsAmount = document.querySelector('.products-amount') as HTMLElement | null;
  const cartLogo = document.querySelector('.cart-logo') as HTMLElement | null;

  if (cartDisplay) {
    if (localStorage.getItem('token') !== null) {
      cartDisplay.style.visibility = "visible";
      if (productsAmount) productsAmount.style.visibility = 'visible';
      if (cartLogo) cartLogo.style.visibility = 'visible';
    } else {
      if(localStorage.getItem('cartItems') !== null) {
        if (cartLogo) cartLogo.style.visibility = 'visible';
      } else {
        if (cartLogo) cartLogo.style.visibility = 'hidden';
      }
      if (productsAmount) productsAmount.style.visibility = 'hidden';
      cartDisplay.style.visibility = "hidden";
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  router()
  
  setTimeout(async () => {
    const path = window.location.pathname;
    const base = import.meta.env.BASE_URL ?? '/';
    const baseNoSlash = base.endsWith('/') && base.length > 1 ? base.slice(0, -1) : base;
    if ((path === '/' || path === base || path === baseNoSlash)) {
      const coffeeCard = document.querySelector('.coffee-card');
      if (coffeeCard) {
        if (!favoritesLoaded) {
          coffeeCard.innerHTML = await loadFavorites(true);
          initFavoritesSlider();
        } else {
          if (favoriteHTML) {
            coffeeCard.innerHTML = favoriteHTML;
            initFavoritesSlider();
          }
        }
      }
    }
  }, 3000);
  const cartDisplay = document.getElementsByClassName("cartDisplay").item(0) as HTMLElement | null;
  const productsAmount = document.querySelector('.products-amount') as HTMLElement | null;
  const cartLogo = document.querySelector('.cart-logo') as HTMLElement | null;

  if (cartDisplay) {
    if (localStorage.getItem('token') !== null) {
      cartDisplay.style.visibility = "visible";
      if (productsAmount) productsAmount.style.visibility = 'visible';
      if (cartLogo) cartLogo.style.visibility = 'visible';
    } else {
      if(localStorage.getItem('cartItems') !== null) {
        if (cartLogo) cartLogo.style.visibility = 'visible';
      } else {
        if (cartLogo) cartLogo.style.visibility = 'hidden';
      }
      if (productsAmount) productsAmount.style.visibility = 'hidden';
      cartDisplay.style.visibility = "hidden";
    }
  }
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

function initFavoritesSlider() {
  const productCards = Array.from(document.getElementsByClassName("product-card")) as HTMLElement[];
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

  if (swipeLeft) {
    const leftClone = swipeLeft.cloneNode(true) as Element;
    swipeLeft.parentNode?.replaceChild(leftClone, swipeLeft);
  }
  if (swipeRight) {
    const rightClone = swipeRight.cloneNode(true) as Element;
    swipeRight.parentNode?.replaceChild(rightClone, swipeRight);
  }

  const swipeLeftNode = document.querySelector(".swipe-left");
  const swipeRightNode = document.querySelector(".swipe-right");

  swipeLeftNode?.addEventListener("click", () => {
    currentProduct = (currentProduct === 0) ? TOTAL_PRODUCTS - 1 : currentProduct - 1;
    showCurrentSlide();
    changeSlideIndicator();
  });

  swipeRightNode?.addEventListener("click", () => {
    currentProduct = (currentProduct === TOTAL_PRODUCTS - 1) ? 0 : currentProduct + 1;
    showCurrentSlide();
    changeSlideIndicator();
  });
  changeSlideIndicator();
}