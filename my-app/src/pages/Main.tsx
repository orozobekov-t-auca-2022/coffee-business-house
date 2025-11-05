import { useContext, useEffect, useState } from 'react'
import firstAboutImage from '../../assests/about-1.png'
import secondAboutImage from '../../assests/about-2.png'
import thirdAboutImage from '../../assests/about-3.png'
import fourthAboutImage from '../../assests/about-4.png'
import mobileSceensImage from '../../assests/mobile-screens.png'
import mainVideo from '../../assests/video.mp4'
import { showLoader } from '../components/showLoader'
import { favoritesService } from '../services/favoritesService'
import { coffeeImages } from '../imageDictionaries/coffeeImages'
import type { Product } from '../types/product'
import { ThemeContext } from '../provider/ThemeContext'


function Main() {
    let currentProduct = 0;
    let TOTAL_PRODUCTS = 0;
    const {theme} = useContext(ThemeContext);

    const [favoritesProducts, setFavoritesProducts] = useState<Product[]>([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                showLoader(true, '.coffee-cards');

                const favoriteProducts = await favoritesService();
                setFavoritesProducts(favoriteProducts.products ?? favoriteProducts);
            } catch (error) {
                console.error(error);
            } finally {
                showLoader(false, '.coffee-cards');
            }
        };

        loadFavorites();
    }, []);

    console.log(favoritesProducts)

    const favorites = favoritesProducts.map((p) => (
        <div className="product-card fade" key={p.id}>
            <img src={`${coffeeImages[p.name]}`} alt="product-img" />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <h3>${p.price}</h3>
        </div>
    ))

    function showCurrentSlide(){
        const productCards = Array.from(document.getElementsByClassName("product-card"));
        TOTAL_PRODUCTS = productCards.length;
        productCards.forEach((el, i) => {
            (el as HTMLElement).style.display = (i === currentProduct) ? "block" : "none";
        });
    }

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

    function swipeLeft() {
        currentProduct = (currentProduct === 0) ? TOTAL_PRODUCTS - 1 : currentProduct - 1;
        showCurrentSlide();
        changeSlideIndicator();
    }

    function swipeRight(){
        currentProduct = (currentProduct === TOTAL_PRODUCTS - 1) ? 0 : currentProduct + 1;
        showCurrentSlide();
        changeSlideIndicator();
    }

    return <>
        {/* <div className="sidebar-wrapper">
        <div className="mobileSidebar">
            <ul>
                <li className="sidebar-nav-links">
                    <ul>
                        <li><a href="#favorite-coffee">Favorite coffee</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#mobile-app">Mobile app</a></li>
                        <li><a href="#contact-us">Contact us</a></li>
                    </ul>
                </li>
                <li className="sidebar-nav-menu">
                    <a href="./src/html/menu.html">Menu</a>
                    <svg className="menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.167 9.76667V11.6667C14.167 14.8883 11.5553 17.5 8.33366 17.5C5.112 17.5 2.50033 14.8883 2.50033 11.6667V9.76667C2.50033 9.4353 2.76896 9.16667 3.10033 9.16667H13.567C13.8984 9.16667 14.167 9.4353 14.167 9.76667Z" stroke="#403F3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.0003 7.50008C10.0003 6.66675 10.5956 5.83341 11.786 5.83341C13.101 5.83341 14.167 4.76743 14.167 3.45246V2.91675" stroke="#403F3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.66634 7.5V7.08333C6.66634 5.70262 7.78563 4.58333 9.16634 4.58333C10.0868 4.58333 10.833 3.83714 10.833 2.91667V2.5" stroke="#403F3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.333 9.16675H15.4163C16.5669 9.16675 17.4997 10.0995 17.4997 11.2501C17.4997 12.4007 16.5669 13.3334 15.4163 13.3334H14.1663" stroke="#403F3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </li>
            </ul>
        </div>
        </div> */}
    <div className="header-main">
            <video autoPlay muted loop playsInline preload="auto">
                <source src={`${mainVideo}`} type="video/mp4" />
            </video>
            <div className="header-text">
                <h1><span style={{"color": "rgba(176, 144, 122, 1)", "fontStyle": "italic"}}>Enjoy</span> premium coffee at our charming cafe</h1>
                <p>With its inviting atmosphere and delicious coffee options, the Coffee House Resource is a popular destination for coffee lovers and those seeking a warm and inviting space to enjoy their favorite beverage.</p>
                <button className="header-menu-button" data-link="/menu">
                    <span>
                        Menu
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1666 9.76667V11.6667C14.1666 14.8883 11.555 17.5 8.33329 17.5C5.11163 17.5 2.49996 14.8883 2.49996 11.6667V9.76667C2.49996 9.4353 2.76859 9.16667 3.09996 9.16667H13.5666C13.898 9.16667 14.1666 9.4353 14.1666 9.76667Z" stroke={theme === 'dark' ? 'rgba(225, 212, 201, 1)' : '#403F3D'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.99996 7.49996C9.99996 6.66663 10.5952 5.83329 11.7857 5.83329C13.1006 5.83329 14.1666 4.7673 14.1666 3.45234V2.91663" stroke={theme === 'dark' ? 'rgba(225, 212, 201, 1)' : '#403F3D'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.66671 7.5V7.08333C6.66671 5.70262 7.786 4.58333 9.16671 4.58333C10.0872 4.58333 10.8334 3.83714 10.8334 2.91667V2.5" stroke={theme === 'dark' ? 'rgba(225, 212, 201, 1)' : '#403F3D'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.3334 9.16663H15.4167C16.5673 9.16663 17.5 10.0994 17.5 11.25C17.5 12.4006 16.5673 13.3333 15.4167 13.3333H14.1667" stroke={theme === 'dark' ? 'rgba(225, 212, 201, 1)' : '#403F3D'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    <main id="content">
        <section id="favorite-coffee">
            <h2>Choose your <span style={{"color": "rgba(176, 144, 122, 1)", "fontStyle": "italic"}}>favorite</span> coffee</h2>
            <div className="coffee-cards">
                <div className="swipe-left" onClick={() => swipeLeft()}>
                    <svg className="defaultLeftSwipe" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 7H1M1 7L7 1M1 7L7 13" stroke={theme === 'dark' ? 'rgba(225, 212, 201, 1)' : '#403F3D'} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg className="hoverLeftSwipe" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 7H1M1 7L7 1M1 7L7 13" stroke="#E1D4C9" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <div className="coffee-card">
                    {favorites}
                </div>

                <div className="swipe-right" onClick={() => swipeRight()}>
                    <svg className="defaultRightSwipe" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7H13.5M13.5 7L7.5 1M13.5 7L7.5 13" stroke={theme === 'dark' ? 'rgba(225, 212, 201, 1)' : '#403F3D'} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg className="hoverRightSwipe" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7H13.5M13.5 7L7.5 1M13.5 7L7.5 13" stroke="#E1D4C9" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
            <div className="coffee-slider">
                <div className="sliders">
                    <span>
                        <svg width="40" height="4" viewBox="0 0 40 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="4" rx="2" fill="#665F55"/>
                        </svg>
                    </span>
                    <span>
                        <svg width="40" height="4" viewBox="0 0 40 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="4" rx="2" fill="#C1B6AD"/>
                        </svg>
                    </span>
                    <span>
                        <svg width="40" height="4" viewBox="0 0 40 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="4" rx="2" fill="#C1B6AD"/>
                        </svg>
                    </span>
                </div>
            </div>
        </section>
        <section id="about">
            <h2>Resource is <span style={{color: "rgba(176, 144, 122, 1)", fontStyle: "italic"}}>the perfect and cozy place</span> where you can enjoy a variety of hot beverages, relax, catch up with friends, or get some work done.</h2>
            <div className="about-images">
                <img className="firstImg" src={`${firstAboutImage}`} alt="first about image"/>
                <img className="secondImg" src={`${thirdAboutImage}`} alt="second about image"/>
                <img className="fourthImg" src={`${fourthAboutImage}`} alt="fourth about image"/>
                <img className="thirdImg" src={`${secondAboutImage}`} alt="third about image"/>
            </div>
        </section>
        <section id="mobile-app">
            <div className="mobile-app-text">
                <h2><span style={{color: "rgba(176, 144, 122, 1)", fontStyle: "italic"}}>Download</span> our apps to start ordering</h2>
                <p>Download the Resource app today and experience the comfort of ordering your favorite coffee from wherever you are</p>
                <div className="download-buttons">
                    <button className="app-store">
                        <svg className="default" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.7063 18.6307C26.6694 14.6324 30.0641 12.6872 30.2193 12.5966C28.2967 9.86366 25.3169 9.49026 24.2697 9.46048C21.767 9.20369 19.3393 10.9206 18.0644 10.9206C16.764 10.9206 14.8008 9.48529 12.6848 9.52747C9.96196 9.56841 7.41468 11.1055 6.01762 13.4923C3.13444 18.359 5.28474 25.5108 8.04705 29.4446C9.42884 31.3712 11.0435 33.5223 13.1569 33.4466C15.2245 33.3635 15.9968 32.1614 18.4919 32.1614C20.9641 32.1614 21.6893 33.4466 23.8447 33.3983C26.0637 33.3635 27.4608 31.463 28.7942 29.519C30.3911 27.3108 31.0323 25.1362 31.0578 25.0245C31.0056 25.0071 26.7483 23.4229 26.7063 18.6307Z" fill={theme === 'dark' ? 'rgba(225, 212, 201, 1)' : '#403F3D'}/> 
                            <path d="M22.6347 6.87268C23.7468 5.51675 24.5076 3.67205 24.2964 1.80005C22.6869 1.86952 20.674 2.88554 19.5149 4.21169C18.4893 5.38029 17.5732 7.29571 17.8099 9.097C19.6179 9.2285 21.4743 8.20752 22.6347 6.87268Z" fill={theme === 'dark' ? 'rgba(225, 212, 201, 1)' : '#403F3D'}/>
                        </svg>
                        <svg className="onHover" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.7063 18.6307C26.6694 14.6324 30.0641 12.6872 30.2193 12.5966C28.2967 9.86366 25.3169 9.49026 24.2697 9.46048C21.767 9.20369 19.3393 10.9206 18.0644 10.9206C16.764 10.9206 14.8008 9.48529 12.6848 9.52747C9.96196 9.56841 7.41468 11.1055 6.01762 13.4923C3.13444 18.359 5.28474 25.5108 8.04705 29.4446C9.42884 31.3712 11.0435 33.5223 13.1569 33.4466C15.2245 33.3635 15.9968 32.1614 18.4919 32.1614C20.9641 32.1614 21.6893 33.4466 23.8447 33.3983C26.0637 33.3635 27.4608 31.463 28.7942 29.519C30.3911 27.3108 31.0323 25.1362 31.0578 25.0245C31.0056 25.0071 26.7483 23.4229 26.7063 18.6307Z" fill="#E1D4C9"/>
                            <path d="M22.6347 6.87268C23.7468 5.51675 24.5076 3.67205 24.2964 1.80005C22.6869 1.86952 20.674 2.88554 19.5149 4.21169C18.4893 5.38029 17.5732 7.29571 17.8099 9.097C19.6179 9.2285 21.4743 8.20752 22.6347 6.87268Z" fill="#E1D4C9"/>
                        </svg>
                        <span className="app-store-text">
                            <span>Available on the</span>
                            <strong>App Store</strong>
                        </span>
                    </button>
                    <button className="google-play">
                        <svg className="default" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.7558 3.20309C3.39335 3.57302 3.18359 4.14896 3.18359 4.89483V31.4995C3.18359 32.2454 3.39335 32.8213 3.7558 33.1913L3.84525 33.2725L19.1359 18.3701V18.0182L3.84525 3.11587L3.7558 3.20309Z" fill={theme === 'dark' ? 'rgba(225, 212, 201, 1)' : '#403F3D'}/>
                            <path d="M26.0776 23.34L20.9863 18.3701V18.0182L26.0837 13.0482L26.1979 13.1129L32.2345 16.4618C33.9573 17.4122 33.9573 18.9761 32.2345 19.9325L26.1979 23.2754L26.0776 23.34Z" fill={theme === 'dark' ? 'rgba(225, 212, 201, 1)' : '#403F3D'}/>
                            <path d="M25.2733 24.2008L20.0617 19.1196L4.68164 34.1167C5.25384 34.7031 6.18695 34.7738 7.24807 34.1873L25.2733 24.2008Z" fill={theme === 'dark' ? 'rgba(225, 212, 201, 1)' : '#403F3D'}/>
                            <path d="M25.2733 12.1876L7.24807 2.20103C6.18695 1.62058 5.25384 1.69125 4.68164 2.27772L20.0617 17.2688L25.2733 12.1876Z" fill={theme === 'dark' ? 'rgba(225, 212, 201, 1)' : '#403F3D'}/>
                        </svg>
                        <svg className="onHover" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.7558 3.20309C3.39335 3.57302 3.18359 4.14896 3.18359 4.89483V31.4995C3.18359 32.2454 3.39335 32.8213 3.7558 33.1913L3.84525 33.2725L19.1359 18.3701V18.0182L3.84525 3.11587L3.7558 3.20309Z" fill="#E1D4C9"/>
                            <path d="M26.0776 23.34L20.9863 18.3701V18.0182L26.0837 13.0482L26.1979 13.1129L32.2345 16.4618C33.9573 17.4122 33.9573 18.9761 32.2345 19.9325L26.1979 23.2754L26.0776 23.34Z" fill="#E1D4C9"/>
                            <path d="M25.2733 24.2008L20.0617 19.1196L4.68164 34.1167C5.25384 34.7031 6.18695 34.7738 7.24807 34.1873L25.2733 24.2008Z" fill="#E1D4C9"/>
                            <path d="M25.2733 12.1876L7.24807 2.20103C6.18695 1.62058 5.25384 1.69125 4.68164 2.27772L20.0617 17.2688L25.2733 12.1876Z" fill="#E1D4C9"/>
                        </svg>
                        <span className="google-play-text">
                            <span>Available on</span>
                            <strong>Google Play</strong>
                        </span>
                    </button>
                </div>
            </div>
            <div className="mobile-app-image">
                <img src={`${mobileSceensImage}`} alt="mobile-screens" />
            </div>
        </section>
    </main>
    </>
}

export default Main;