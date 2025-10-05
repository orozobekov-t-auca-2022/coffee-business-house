
const menuItems = document.querySelector('.menu-items');

const coffeeList = []
const teaList = []
const dessertsList = []
let category = 'coffee'

const coffeeImages = [
    '../assests/coffee-1.png',
    '../assests/coffee-2.png',
    '../assests/coffee-3.png',
    '../assests/coffee-4.png',
    '../assests/coffee-5.png',
    '../assests/coffee-6.png',
    '../assests/coffee-7.png',
    '../assests/coffee-8.png',
]

const dessertsImages = [
    '../assests/dessert-1.png',
    '../assests/dessert-2.png',
    '../assests/dessert-3.png',
    '../assests/dessert-4.png',
    '../assests/dessert-5.png',
    '../assests/dessert-6.png',
    '../assests/dessert-7.png',
    '../assests/dessert-8.png',
]

const teaImages = [
    '../assests/tea-1.png',
    '../assests/tea-2.png',
    '../assests/tea-3.png',
    '../assests/tea-4.png',
]

async function loadData() {
    let actual_data = await fetch('./products.json').then(response => response.json()).catch(err => console.log(err));

    console.log(actual_data);
    
    for (let el = 0; el < actual_data.length; el++) {
        switch(actual_data[el]['category']) {
            case 'coffee':
                coffeeList.push({
                    ...actual_data[el],
                    'image': coffeeImages[el],
                    'id': el
                })
                break;
            case 'tea':
                teaList.push({
                    ...actual_data[el],
                    'image': teaImages[el % 8],
                    'id': el
                })
                break;
            case 'dessert':
                dessertsList.push({
                    ...actual_data[el],
                    'image': dessertsImages[el % 12],
                    'id': el
                })
                break;
        }
    }
    displayProducts(coffeeList);
    
    document.querySelector('#coffee-btn').classList.add('active');
}
loadData();

function displayProducts(coffeeList) {
    menuItems.innerHTML = coffeeList.map((element, index) => `
    <div class="menu-item" data-index="${index}">
        <img src=${element['image']} />
        <div class="menu-item-text">
            <div class="menu-item-title">
                <h3>${element.name}</h3>
                <p>${element.description}</p>
            </div>
            <h3 class="menu-item-price">$${element.price}</h3>
        </div>
    </div>
    `).join('');
}

function filterProducts(category) {
    switch(category) {
        case 'coffee':
            displayProducts(coffeeList);
            category = 'coffee';
            break;
        case 'tea':
            displayProducts(teaList);
            category = 'tea';
            break;
        case 'dessert':
            displayProducts(dessertsList);
            category = 'dessert';
            break;
    }
}

const buttons = document.querySelectorAll('.product-options button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(childBtn => childBtn.classList.remove('active'));
        button.classList.add('active');

        if (button.id === 'coffee-btn') {
            category = 'coffee';
        } else if (button.id === 'tea-btn') {
            category = 'tea';
        } else if (button.id === 'dessert-btn') {
            category = 'dessert';
        }
    })
})

const menuItemElements = document.querySelectorAll('.menu-items');
const modal = document.querySelector('.modal-container');

menuItemElements.forEach((item) => {
    item.addEventListener('click', (event) => {
        let selectedItem = null;
    
        switch(category) {
            case 'coffee':
                selectedItem = coffeeList[event.target.closest('.menu-item').dataset.index];
                console.log(selectedItem);
                break;
            case 'tea':
                selectedItem = teaList[event.target.closest('.menu-item').dataset.index];
                break;
            case 'dessert':
                selectedItem = dessertsList[event.target.closest('.menu-item').dataset.index];
                break;
        }

        let sizes = '';
        for(let key in selectedItem.sizes) {
            sizes += `
                <button class="modal-text-option-btns">
                    <span class="size">${key.toUpperCase()}</span>
                    <span>${selectedItem.sizes[key].size}</span>
                </button>
            `
        }

        let additives = '';
        for(let key in selectedItem.additives) {
            additives += `
                <button class="modal-text-option-btns">
                    <span class="additInd">${key}</span>
                    <span>${selectedItem.additives[key].name}</span>
                </button>
            `
        }

        modal.innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    <img src="${selectedItem.image}" alt=""/>
                    <div class="modal-text">
                        <h3>${selectedItem['name']}</h3>
                        <p>${selectedItem['description']}</p>
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
                            <h3 class="modal-price-text">$${selectedItem.price}</h3>
                        </div>
                        <div class="modal-disclaimer">
                            <div class="modal-warning-icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_268_12877)">
                                        <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_268_12877">
                                            <rect width="16" height="16" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <span>
                                The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
                            </span>
                        </div>
                        <button class="close-modal-btn">Close</button>
                    </div>
                </div>
            </div>
        `
        const closeModalBtn = document.querySelector('.close-modal-btn');
        const modalWindow = document.querySelector('.modal')
        closeModalBtn.addEventListener('click', () => {
            modalWindow.style.display = 'none'
        })

        modalWindow.addEventListener('click', (e) => {
            if (e.target === modalWindow) {
                modalWindow.style.display = 'none'
            }
        })
    });
});