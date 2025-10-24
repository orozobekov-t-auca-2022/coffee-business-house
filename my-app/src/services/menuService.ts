import { showLoader } from "../components/showLoader";
import { coffeeImages } from "../imageDictionaries/coffeeImages";
import { dessertsImages } from "../imageDictionaries/dessertsImages";
import { teaImages } from "../imageDictionaries/teaImages";
import { router } from "../router";
import { Categories, type Product } from "../types/product";

const currentCategory: Categories = Categories.Coffee;
let products : Product[] = []
const coffeeProducts: Product[] = []
const teaProducts: Product[] = []
const dessertProducts: Product[] = []

export default async function menuService(): Promise<Product[]> {
    const response = await fetch(import.meta.env.VITE_COFFEE_API_KEY + '/products');
    if(!response.ok) {
        throw new Error('Failed to fetch products')
    }
    const data = await response.json();
    products = data['data'];
    return products;
}

function sortProductsByCategories(): void {
    console.log("sorting products by categories")
    for(const el in products) {
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

    if(category === Categories.Coffee) {
        categoryProducts = coffeeProducts;
        productImages = coffeeImages;
    } else if(category === Categories.Tea) {
        categoryProducts = teaProducts;
        productImages = teaImages;
    } else if(category === Categories.Dessert) {
        categoryProducts = dessertProducts;
        productImages = dessertsImages;
    }
    const menuItemsContainer = document.querySelector(".menu-items");
    if (!menuItemsContainer) {        
        return;
    }
    menuItemsContainer!.innerHTML = categoryProducts.map(e => `
        <div class="menu-item">
            <div class="menu-item-img">
                <img src="${productImages[e.name]}" alt="menu-item-photo" />
            </div>
            <div class="menu-item-text">
                <div class="menu-item-title">
                    <h3>${e.name}</h3>
                    <p>${e.description}</p>
                </div>
                <div class="menu-item-price">
                    <h3>$${e.price}</h3>
                </div>
            </div>
        </div>
        `).join('');
}

export async function initMenuPage() {
    showLoader(true);
    const productItems = document.querySelector('.productsAmount') as HTMLElement;
    const cartItemsCount = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')).length : 0;
    productItems.innerHTML = cartItemsCount.toString();
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        if (products.length === 0) {
            await menuService();
            sortProductsByCategories();
        }        
        const currentProduct: Product[] = displayFilterButtons();
        makeActiveButton("coffee-btn");
        displayProductsByCategory(Categories.Coffee);
        attachModalListeners(currentProduct, Categories.Coffee);
    } catch (error) {
        console.error('Error initializing menu:', error);
        const menuItemsContainer = document.querySelector('.menu-items') as HTMLElement;
        if (menuItemsContainer) {
            menuItemsContainer.innerHTML = `
                <div class="fetch-failure-message">
                    <p>Something went wrong while loading favorite products. Try refreshing the page.</p>
                </div>`;
        }
    } finally {
        showLoader(false);
    }
}
function displayFilterButtons() : Product[]{
    const coffeeBtn = document.getElementById('coffee-btn');
    const teaBtn = document.getElementById('tea-btn');
    const dessertBtn = document.getElementById('dessert-btn');
    
    coffeeBtn?.addEventListener('click', () => {
        makeActiveButton('coffee-btn');
        filterProducts(Categories.Coffee);
        currentProduct = coffeeProducts;
    });
    teaBtn?.addEventListener('click', () => {
        makeActiveButton('tea-btn');
        filterProducts(Categories.Tea);
        currentProduct = teaProducts;
    });
    dessertBtn?.addEventListener('click', () => {
        makeActiveButton('dessert-btn');
        filterProducts(Categories.Dessert);
        currentProduct = dessertProducts;
    });

    let currentProduct = coffeeProducts
    if(currentCategory === 'coffee') {
        currentProduct = coffeeProducts;
    } else if (currentCategory === 'tea') {
        currentProduct = teaProducts;
    } else if (currentCategory === 'dessert') {
        currentProduct = dessertProducts
    }
    return currentProduct;
}

function filterProducts(category: Categories): void {
    const menuItemsContainer = document.querySelector(".menu-items");
    menuItemsContainer!.innerHTML = '';
    displayProductsByCategory(category);

    let currentProducts: Product[] = [];
    if (category === "coffee") currentProducts = coffeeProducts;
    else if (category === "tea") currentProducts = teaProducts;
    else currentProducts = dessertProducts;

    attachModalListeners(currentProducts, category)
}

function attachModalListeners(currentProducts: Product[], currentCategory: Categories) {
  const menuProducts = document.querySelectorAll(".menu-item");
  const modalContainer = document.querySelector(".modal-container") as HTMLElement;

  menuProducts.forEach((item, i) => {
    item.addEventListener("click", async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_COFFEE_API_KEY}/products/${currentProducts[i].id}`);
        const productData = await res.json();
        const product = productData.data;
        const selectedItem = product;

        let selectedSize = null;
        console.log(product)

        let image = coffeeImages[currentProducts[i].name];
        if (currentCategory === "tea") image = teaImages[currentProducts[i].name];
        else if (currentCategory === "dessert") image = dessertsImages[currentProducts[i].name];

        let sizes = '';
        let countInd = 0;
        for(const key in product.sizes) {
            if (countInd === 0) {
                sizes += `
                    <button class="modal-text-option-btns active" data-index="${countInd}">
                        <span class="size">${key.toUpperCase()}</span>
                        <span>${product.sizes[key].size}</span>
                    </button>
                `
            } else {
                sizes += `
                    <button class="modal-text-option-btns" data-index="${countInd}">
                        <span class="size">${key.toUpperCase()}</span>
                        <span>${product.sizes[key].size}</span>
                    </button>
                `
            }
            countInd++;
        }

        let additives = '';
        for(const key in product.additives) {
            additives += `
                <button class="modal-text-option-btns" data-index="${countInd}">
                    <span class="additInd">${key}</span>
                    <span>${product.additives[key].name}</span>
                </button>
            `
            countInd++;
        }

        let totalPrice = 0;
        const priceForSize = 0;
        const priceForAdditives = 0;
        totalPrice += Number(selectedItem.price) + priceForSize + priceForAdditives
        console.log(totalPrice)
        modalContainer.innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    <img src=${image} alt=""/>
                    <div class="modal-text">
                        <h3>${currentProducts[i]['name']}</h3>
                        <p>${currentProducts[i]['description']}</p>
                        <label>Size</label>
                        <div class="sizes">
                            ${sizes}
                        </div>

                        <label>Additives</label>
                        <div class="additives">
                            ${additives}
                        </div>
                        <div class="modal-price">
                            <h3>Total:</h3>
                            <h3 class="modal-price-text">$${parseFloat(totalPrice.toString()).toFixed(2)}</h3>
                        </div>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                    <button class="close-modal-button">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.34326 1.34314L12.657 12.6568" stroke="#E1D4C9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1.34326 12.6569L12.657 1.34315" stroke="#E1D4C9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        const closeButton = document.querySelector(".close-modal-button");
        closeButton?.addEventListener("click", () => {
            modalContainer.innerHTML = "";
        });
        const addToCartButton = document.querySelector(".add-to-cart-btn");
        addToCartButton?.addEventListener("click", () => {
            const formData = {
                ...selectedItem,
                'image': currentCategory === "coffee" ? coffeeImages[currentProducts[i].name] :
                          currentCategory === "tea" ? teaImages[currentProducts[i].name] :
                          dessertsImages[currentProducts[i].name],
                'selectedSize': product.sizes[selectedSize.toLowerCase()],
                'selectedAdditives': Array.from(document.querySelectorAll('.additives .modal-text-option-btns.active')).map(btn => {
                    const additiveKey = btn.querySelector('.additInd').textContent;
                    return product.additives[additiveKey];
                }),
                'finalPrice': Number(product.sizes[selectedSize.toLowerCase()]['price']) +
                              Array.from(document.querySelectorAll('.additives .modal-text-option-btns.active')).reduce((sum, btn) => {
                                  const additiveKey = btn.querySelector('.additInd').textContent;
                                  return sum + Number(product.additives[additiveKey]['price']);
                              }, 0)
            }
            // Add the selected item to the cart
            if(localStorage.getItem('cartItems')){
                localStorage.setItem('cartItems', JSON.stringify([...JSON.parse(localStorage.getItem('cartItems') as string), formData]));
            } else {
                localStorage.setItem('cartItems', JSON.stringify([formData]));
            }

            addToCart();
            modalContainer.innerHTML = "";
        });

        const modalWindow = document.querySelector('.modal')
        modalWindow?.addEventListener('click', (e) => {
            if(e.target === modalWindow) {
                modalContainer.innerHTML = ''
            }
        })

        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') {
                modalContainer.innerHTML = ''
            }
        });
        const sizeButtons = document.querySelectorAll('.sizes .modal-text-option-btns');

        sizeButtons!.forEach(button => {
            button.addEventListener('click', () => {
                sizeButtons!.forEach(childBtn => childBtn.classList.remove('active'));
                button.classList.add('active');
                selectedSize = button.querySelector('.size')?.textContent;
                updateTotalPrice();
            });
        });

        const additiveButtons = document.querySelectorAll('.additives .modal-text-option-btns');

        additiveButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('active')) {
                    button.classList.remove('active');
                } else {
                    button.classList.add('active');
                }
                updateTotalPrice();
            });
        });


        function updateTotalPrice() {
            let sizePrice = 0;
            let additivesPrice = 0;

            console.log(Number(product['sizes'][selectedSize.toLowerCase()]['price']))
            if (selectedSize) {
                sizePrice = Number(product['sizes'][selectedSize.toLowerCase()]['price']);
            }

            document.querySelectorAll('.additives .modal-text-option-btns.active').forEach(btn => {
                const additiveKey = btn.querySelector('.additInd').textContent;
                additivesPrice += Number(product['additives'][additiveKey]['price']);
            });

            const total = sizePrice + additivesPrice;
            document.querySelector('.modal-price-text')!.textContent = `$${total.toFixed(2)}`;
        }

        const cartItems = document.querySelector('.cartDisplay') as HTMLElement;
        cartItems.addEventListener('click', (e) => {
            e.preventDefault();
            history.pushState({}, "", `${import.meta.env.BASE_URL}cart`);
            router();
        });
        } catch (err) {
        console.log(err);
        modalContainer.innerHTML = `
            <div>
                <p>Something went wrong. Please, refresh the page</p>
            </div>
        ` 
      }
    });
  });
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


function addToCart(): void {
    const productsInCart = localStorage.getItem('cartItems');
    const cartItems = document.querySelector('.productsAmount') as HTMLElement;
    cartItems.innerHTML = '';
    cartItems.innerHTML = `${productsInCart ? JSON.parse(productsInCart).length : 0}`
}