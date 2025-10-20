import { coffeeImages } from "./imageDictionaries/coffeeImages";
import { dessertsImages } from "./imageDictionaries/dessertsImages";
import { teaImages } from "./imageDictionaries/teaImages";
import type { Categories, Product } from "./types/product";

let products : Product[] = []
const coffeeProducts: Product[] = []
const teaProducts: Product[] = []
const dessertProducts: Product[] = []

export default async function fetchMenuProducts(): Promise<Product[]> {
    try{
        const response = await fetch(import.meta.env.VITE_COFFEE_API_KEY + '/products').then(res => res.json());
        products = response['data'];
        return products;
    } catch (error) {
        console.error('Error fetching menu products:', error);
        throw error;
    }
}

function sortProductsByCategories(): void {
    console.log(products);
    for(const el in products) {
        console.log(el)
        if(products[el].category === 'coffee') {
            coffeeProducts.push(products[el])
        } else if(products[el].category === 'tea') {
            teaProducts.push(products[el])
        } else if(products[el].category === 'dessert') {
            dessertProducts.push(products[el])
        }
    }
}

export function displayProductsByCategory(category: Categories): void {
    let categoryProducts: Product[] = [];
    let productImages = {}

    if(category === 'coffee') {
        categoryProducts = coffeeProducts;
        productImages = coffeeImages;
    } else if(category === 'tea') {
        categoryProducts = teaProducts;
        productImages = teaImages;
    } else if(category === 'dessert') {
        categoryProducts = dessertProducts;
        productImages = dessertsImages;
    }
    const menuItemsContainer = document.querySelector(".menu-items");
    if (!menuItemsContainer) {
        return;
    }
    menuItemsContainer!.innerHTML = categoryProducts.map(e => `
        <div class="menu-item">
            <img src="${productImages[e.name]}" alt="menu-item-photo" />
            <div class="menu-item-text">
                <div class="menu-item-title">
                    <h3>${e.name}</h3>
                    <p>${e.description}</p>
                    <h3>${e.price}</h3>
                </div>
            </div>
        </div>
        `).join('');
}



window.addEventListener("DOMContentLoaded", async() => {
    await fetchMenuProducts();
    sortProductsByCategories();
    // if (window.location.pathname === "/menu") {
    //     displayProductsByCategory("coffee");
    // }
    displayProductsByCategory('coffee');
    const coffeeBtn = document.getElementById('coffee-btn');
    const teaBtn = document.getElementById('tea-btn');
    const dessertBtn = document.getElementById('dessert-btn');
    coffeeBtn?.addEventListener('click', () => {
        makeActiveButton('coffee-btn');
        filterProducts('coffee');
    });
    teaBtn?.addEventListener('click', () => {
        makeActiveButton('tea-btn');
        filterProducts('tea');
    });
    dessertBtn?.addEventListener('click', () => {
        makeActiveButton('dessert-btn');
        filterProducts('dessert');
    });
})

function filterProducts(category: Categories): void {
    const menuItemsContainer = document.querySelector(".menu-items");
    menuItemsContainer!.innerHTML = '';
    displayProductsByCategory(category);
}

function makeActiveButton(selectedButtonId: string): void {
    const coffeeBtn = document.getElementById('coffee-btn')!;
    const teaBtn = document.getElementById('tea-btn')!;
    const dessertBtn = document.getElementById('dessert-btn')!;
    if(selectedButtonId === 'coffee-btn') {
        coffeeBtn.classList.add('active');
        teaBtn.classList.remove('active');
        dessertBtn.classList.remove('active');
    } else if(selectedButtonId === 'tea-btn') {
        coffeeBtn.classList.remove('active');
        teaBtn.classList.add('active');
        dessertBtn.classList.remove('active');
    } else if(selectedButtonId === 'dessert-btn') {
        coffeeBtn.classList.remove('active');
        teaBtn.classList.remove('active');
        dessertBtn.classList.add('active');
    }
}