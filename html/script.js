
const menuItems = document.querySelector('.menu-items');

const coffeeList = []
const teaList = []
const dessertsList = []

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
                    'image': coffeeImages[el]
                })
                break;
            case 'tea':
                teaList.push({
                    ...actual_data[el],
                    'image': teaImages[el % 8]
                })
                break;
            case 'dessert':
                dessertsList.push({
                    ...actual_data[el],
                    'image': dessertsImages[el % 12]
                })
                break;
        }
    }    
}
loadData();

function displayProducts(coffeeList) {
    menuItems.innerHTML = coffeeList.map((element, index) => `
    <div class="menu-item">
        <img src=${element['image']} />
        <div class="menu-item-text">
            <h3>${element.name}</h3>
            <p>${element.description}</p>
            <h3>${element.price} $</h3>
        </div>
    </div>
    `).join('');
}

function filterProducts(category) {
    switch(category) {
        case 'coffee':
            displayProducts(coffeeList);
            break;
        case 'tea':
            displayProducts(teaList);
            break;
        case 'dessert':
            displayProducts(dessertsList);
            break;
    }
}