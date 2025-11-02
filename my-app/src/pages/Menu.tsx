import { useEffect, useState } from "react";
import { Categories, type Product } from "../types/product";
import menuService from "../services/menuService";
import { coffeeImages } from "../imageDictionaries/coffeeImages";
import { teaImages } from "../imageDictionaries/teaImages";
import { dessertsImages } from "../imageDictionaries/dessertsImages";
import Modal from "../components/Modal";

function Menu() {
    const [currentCategory, setCurrentCategory] = useState<Categories>(Categories.Coffee);
    const [products, setProducts] = useState<Product[]>([]);
    const [currentProductImages, setCurrentProductImages] = useState<Record<string, string>>({});
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            await menuService().then((data) => {
                setProducts(data);
            });
        }
        fetchProducts();
    },[])

    const filteredProducts = products.filter(product => product.category === currentCategory);

    useEffect(() => {
        if(currentCategory === Categories.Coffee) {
            setCurrentProductImages(coffeeImages);
        } else if(currentCategory === Categories.Tea) {
            setCurrentProductImages(teaImages);
        } else if(currentCategory === Categories.Dessert) {
            setCurrentProductImages(dessertsImages);
        }
    })

    return <>
        <section className="product-list">
            <div className="product-list-container">
                <h1 className="menu-h1">Behind each of our cups hides an <span style={{color: "rgba(176, 144, 122, 1)", fontStyle: "italic"}}> amazing surprise</span></h1>
            </div>    
            <div className="product-list-container">
                <div className="product-options">    
                    <button id="coffee-btn" className={currentCategory === Categories.Coffee ? "active" : ""} onClick={() => setCurrentCategory(Categories.Coffee)}>
                        <span className="product-icon">☕</span>
                        <span>Coffee</span>
                    </button>
                    <button id="tea-btn" className={currentCategory === Categories.Tea ? "active" : ""} onClick={() => setCurrentCategory(Categories.Tea)}>
                        <span className="product-icon">🫖</span>
                        <span>Tea</span>
                    </button>
                    <button id="dessert-btn" className={currentCategory === Categories.Dessert ? "active" : ""} onClick={() => setCurrentCategory(Categories.Dessert)}>
                        <span className="product-icon">🍰</span>
                        <span>Dessert</span>
                    </button>
                </div>
            </div>

            <div className="error-credentials">

            </div>

            <div className="menu-items">
                {/* <div id="loader" className="loader hidden"></div> */}
                {filteredProducts.map((product) => (
                    <div className="menu-item" onClick={() => setSelectedProduct(product)} key={product.id}>
                        <div className="menu-item-img">
                            <img src={currentProductImages[product.name]} alt="menu-item-photo" />
                        </div>
                        <div className="menu-item-text">
                            <div className="menu-item-title">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                            </div>
                            <div className="menu-item-price">
                                {localStorage.getItem("token") && product.discountPrice ? (
                                <>
                                    <h3 className="discount-price">${product.discountPrice}</h3>
                                    <h3 className="struck-through-price">${product.price}</h3>
                                </>
                                ) : (
                                    <h3>${product.price}</h3>
                                )}
                            </div>
                        </div>
                    </div>  
                ))}
            </div>

            <div className="modal-container">

            </div>
            <div className="loadmore-container">
                <button className="loadmore-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="#403F3D" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="#403F3D" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </section>
        {selectedProduct && <Modal obj={selectedProduct} image={currentProductImages[selectedProduct.name]} onClose={() => setSelectedProduct(null)} />}
    </>
}

export default Menu