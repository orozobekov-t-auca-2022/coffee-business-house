(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(t){if(t.ep)return;t.ep=!0;const n=a(t);fetch(t.href,n)}})();function I(e){const o=document.getElementById("loader");e?o?.classList.remove("hidden"):o?.classList.add("hidden")}const D={"S’mores Frappuccino":"./assests/coffee-slider-1.png","Caramel Macchiato":"./assests/coffee-slider-2.png","Ice coffee":"./assests/coffee-slider-3.png","Irish coffee":"../assests/coffee-1.png","Kahlua coffee":"../assests/coffee-2.png","Honey raf":"../assests/coffee-3.png","Ice cappuccino":"../assests/coffee-4.png",Espresso:"../assests/coffee-5.png",Latte:"../assests/coffee-6.png","Latte macchiato":"../assests/coffee-7.png","Coffee with cognac":"../assests/coffee-8.png"};function T(){return`
    <div class="sidebar-wrapper">
        <div class="mobileSidebar">
            <ul>
                <li class="sidebar-nav-links">
                    <ul>
                        <li><a href="#favorite-coffee">Favorite coffee</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#mobile-app">Mobile app</a></li>
                        <li><a href="#contact-us">Contact us</a></li>
                    </ul>
                </li>
                <li class="sidebar-nav-menu">
                    <a href="./src/html/menu.html">Menu</a>
                    <svg class="menu-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.167 9.76667V11.6667C14.167 14.8883 11.5553 17.5 8.33366 17.5C5.112 17.5 2.50033 14.8883 2.50033 11.6667V9.76667C2.50033 9.4353 2.76896 9.16667 3.10033 9.16667H13.567C13.8984 9.16667 14.167 9.4353 14.167 9.76667Z" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.0003 7.50008C10.0003 6.66675 10.5956 5.83341 11.786 5.83341C13.101 5.83341 14.167 4.76743 14.167 3.45246V2.91675" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.66634 7.5V7.08333C6.66634 5.70262 7.78563 4.58333 9.16634 4.58333C10.0868 4.58333 10.833 3.83714 10.833 2.91667V2.5" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M13.333 9.16675H15.4163C16.5669 9.16675 17.4997 10.0995 17.4997 11.2501C17.4997 12.4007 16.5669 13.3334 15.4163 13.3334H14.1663" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </li>
            </ul>
        </div>
    </div>
    <div class="header-main">
            <video autoplay muted loop playsinline preload="auto">
                <source src="./assests/video.mp4" type="video/mp4">
            </video>
            <div class="header-text">
                <h1><span style="color: rgba(176, 144, 122, 1); font-style: italic;">Enjoy</span> premium coffee at our charming cafe</h1>
                <p>With its inviting atmosphere and delicious coffee options, the Coffee House Resource is a popular destination for coffee lovers and those seeking a warm and inviting space to enjoy their favorite beverage.</p>
                <button class="header-menu-button" data-link="/menu">
                    <span>
                        Menu
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1666 9.76667V11.6667C14.1666 14.8883 11.555 17.5 8.33329 17.5C5.11163 17.5 2.49996 14.8883 2.49996 11.6667V9.76667C2.49996 9.4353 2.76859 9.16667 3.09996 9.16667H13.5666C13.898 9.16667 14.1666 9.4353 14.1666 9.76667Z" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.99996 7.49996C9.99996 6.66663 10.5952 5.83329 11.7857 5.83329C13.1006 5.83329 14.1666 4.7673 14.1666 3.45234V2.91663" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.66671 7.5V7.08333C6.66671 5.70262 7.786 4.58333 9.16671 4.58333C10.0872 4.58333 10.8334 3.83714 10.8334 2.91667V2.5" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.3334 9.16663H15.4167C16.5673 9.16663 17.5 10.0994 17.5 11.25C17.5 12.4006 16.5673 13.3333 15.4167 13.3333H14.1667" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    <main id="content">
        <section id="favorite-coffee">
            <h2>Choose your <span style="color: rgba(176, 144, 122, 1); font-style: italic;">favorite</span> coffee</h2>
            <div class="coffee-cards">
                <div class="swipe-left">
                    <svg class="defaultLeftSwipe" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 7H1M1 7L7 1M1 7L7 13" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg class="hoverLeftSwipe" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.5 7H1M1 7L7 1M1 7L7 13" stroke="#E1D4C9" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>

                <div class="coffee-card">
                    <div id="loader" class="loader hidden"></div>
                </div>

                <div class="swipe-right">
                    <svg class="defaultRightSwipe" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7H13.5M13.5 7L7.5 1M13.5 7L7.5 13" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg class="hoverRightSwipe" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7H13.5M13.5 7L7.5 1M13.5 7L7.5 13" stroke="#E1D4C9" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div class="coffee-slider">
                <div class="sliders">
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
            <h2>Resource is <span style="color: rgba(176, 144, 122, 1); font-style: italic;">the perfect and cozy place</span> where you can enjoy a variety of hot beverages, relax, catch up with friends, or get some work done.</h2>
            <div class="about-images">
                <img class="firstImg" src="./assests/about-1.png" alt="first about image">
                <img class="secondImg" src="./assests/about-3.png" alt="second about image">
                <img class="fourthImg" src="./assests/about-4.png" alt="fourth about image">
                <img class="thirdImg" src="./assests/about-2.png" alt="third about image">
            </div>
        </section>
        <section id="mobile-app">
            <div class="mobile-app-text">
                <h2><span style="color: rgba(176, 144, 122, 1); font-style: italic;">Download</span> our apps to start ordering</h2>
                <p>Download the Resource app today and experience the comfort of ordering your favorite coffee from wherever you are</p>
                <div class="download-buttons">
                    <button class="app-store">
                        <svg class="default" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.7063 18.6307C26.6694 14.6324 30.0641 12.6872 30.2193 12.5966C28.2967 9.86366 25.3169 9.49026 24.2697 9.46048C21.767 9.20369 19.3393 10.9206 18.0644 10.9206C16.764 10.9206 14.8008 9.48529 12.6848 9.52747C9.96196 9.56841 7.41468 11.1055 6.01762 13.4923C3.13444 18.359 5.28474 25.5108 8.04705 29.4446C9.42884 31.3712 11.0435 33.5223 13.1569 33.4466C15.2245 33.3635 15.9968 32.1614 18.4919 32.1614C20.9641 32.1614 21.6893 33.4466 23.8447 33.3983C26.0637 33.3635 27.4608 31.463 28.7942 29.519C30.3911 27.3108 31.0323 25.1362 31.0578 25.0245C31.0056 25.0071 26.7483 23.4229 26.7063 18.6307Z" fill="#403F3D"/> 
                            <path d="M22.6347 6.87268C23.7468 5.51675 24.5076 3.67205 24.2964 1.80005C22.6869 1.86952 20.674 2.88554 19.5149 4.21169C18.4893 5.38029 17.5732 7.29571 17.8099 9.097C19.6179 9.2285 21.4743 8.20752 22.6347 6.87268Z" fill="#403F3D"/>
                        </svg>
                        <svg class="onHover" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.7063 18.6307C26.6694 14.6324 30.0641 12.6872 30.2193 12.5966C28.2967 9.86366 25.3169 9.49026 24.2697 9.46048C21.767 9.20369 19.3393 10.9206 18.0644 10.9206C16.764 10.9206 14.8008 9.48529 12.6848 9.52747C9.96196 9.56841 7.41468 11.1055 6.01762 13.4923C3.13444 18.359 5.28474 25.5108 8.04705 29.4446C9.42884 31.3712 11.0435 33.5223 13.1569 33.4466C15.2245 33.3635 15.9968 32.1614 18.4919 32.1614C20.9641 32.1614 21.6893 33.4466 23.8447 33.3983C26.0637 33.3635 27.4608 31.463 28.7942 29.519C30.3911 27.3108 31.0323 25.1362 31.0578 25.0245C31.0056 25.0071 26.7483 23.4229 26.7063 18.6307Z" fill="#E1D4C9"/>
                            <path d="M22.6347 6.87268C23.7468 5.51675 24.5076 3.67205 24.2964 1.80005C22.6869 1.86952 20.674 2.88554 19.5149 4.21169C18.4893 5.38029 17.5732 7.29571 17.8099 9.097C19.6179 9.2285 21.4743 8.20752 22.6347 6.87268Z" fill="#E1D4C9"/>
                        </svg>
                        <span class="app-store-text">
                            <span>Available on the</span>
                            <strong>App Store</strong>
                        </span>
                    </button>
                    <button class="google-play">
                        <svg class="default" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.7558 3.20309C3.39335 3.57302 3.18359 4.14896 3.18359 4.89483V31.4995C3.18359 32.2454 3.39335 32.8213 3.7558 33.1913L3.84525 33.2725L19.1359 18.3701V18.0182L3.84525 3.11587L3.7558 3.20309Z" fill="#403F3D"/>
                            <path d="M26.0776 23.34L20.9863 18.3701V18.0182L26.0837 13.0482L26.1979 13.1129L32.2345 16.4618C33.9573 17.4122 33.9573 18.9761 32.2345 19.9325L26.1979 23.2754L26.0776 23.34Z" fill="#403F3D"/>
                            <path d="M25.2733 24.2008L20.0617 19.1196L4.68164 34.1167C5.25384 34.7031 6.18695 34.7738 7.24807 34.1873L25.2733 24.2008Z" fill="#403F3D"/>
                            <path d="M25.2733 12.1876L7.24807 2.20103C6.18695 1.62058 5.25384 1.69125 4.68164 2.27772L20.0617 17.2688L25.2733 12.1876Z" fill="#403F3D"/>
                        </svg>
                        <svg class="onHover" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.7558 3.20309C3.39335 3.57302 3.18359 4.14896 3.18359 4.89483V31.4995C3.18359 32.2454 3.39335 32.8213 3.7558 33.1913L3.84525 33.2725L19.1359 18.3701V18.0182L3.84525 3.11587L3.7558 3.20309Z" fill="#E1D4C9"/>
                            <path d="M26.0776 23.34L20.9863 18.3701V18.0182L26.0837 13.0482L26.1979 13.1129L32.2345 16.4618C33.9573 17.4122 33.9573 18.9761 32.2345 19.9325L26.1979 23.2754L26.0776 23.34Z" fill="#E1D4C9"/>
                            <path d="M25.2733 24.2008L20.0617 19.1196L4.68164 34.1167C5.25384 34.7031 6.18695 34.7738 7.24807 34.1873L25.2733 24.2008Z" fill="#E1D4C9"/>
                            <path d="M25.2733 12.1876L7.24807 2.20103C6.18695 1.62058 5.25384 1.69125 4.68164 2.27772L20.0617 17.2688L25.2733 12.1876Z" fill="#E1D4C9"/>
                        </svg>
                        <span class="google-play-text">
                            <span>Available on</span>
                            <strong>Google Play</strong>
                        </span>
                    </button>
                </div>
            </div>
            <div class="mobile-app-image">
                <img src="./assests/mobile-screens.png" alt="mobile-screens">
            </div>
        </section>
    </main>
    `}function G(){return`
        <main id="content">
        <section class="product-list">
            <div class="product-list-container">
                <h1 class="menu-h1">Behind each of our cups hides an <span style="color: rgba(176, 144, 122, 1); font-style: italic;"> amazing surprise</span></h1>
            </div>    
            <div class="product-list-container">
                <div class="product-options">    
                    <button id="coffee-btn" class="active">
                        <span class="product-icon">☕</span>
                        <span>Coffee</span>
                    </button>
                    <button id="tea-btn">
                        <span class="product-icon">🫖</span>
                        <span>Tea</span>
                    </button>
                    <button id="dessert-btn">
                        <span class="product-icon">🍰</span>
                        <span>Dessert</span>
                    </button>
                </div>
            </div>

            <div class="menu-items">
                <div id="loader" class="loader hidden"></div>
            </div>
            <div class="error-credentials">
            
            </div>

            <div class="modal-container">

            </div>
            <div class="loadmore-container">
                <button class="loadmore-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </section>
    </main>
    `}function U(){return`
        <div class="cart-page">
            <h2>Cart</h2>
            <div class="products-list">

            </div>
            <div class="cart-total">
                <span>Total:</span>
                <span class="cart-total-amount">$0.00</span>
            </div>
            <div class="cart-actions-wrapper">
                <div class="cart-actions">
                    <button class="sign-in-button">Sign In</button>
                    <button class="register-button">Registration</button>
                </div>
            </div>
        </div>
    `}function W(){return`
        <div class="login-page">
            <h2>Sign In</h2>
            <form class="login-form">
                <div class="login-input-wrapper">
                    <div class="input-group">
                        <label for="login">Login</label>
                        <input type="text" id="login" placeholder="Placeholder" required>
                    </div>

                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Placeholder" required>
                    </div>
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    `}function _(){return`
        <div class="register-page">
            <h2>Registration</h2>
            <form class="register-form">
                <div class="register-input-wrapper firstRow">
                    <div class="input-group">
                        <label for="login">Login</label>
                        <input type="text" id="login" placeholder="Placeholder" required>
                    </div>

                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Placeholder" required>
                    </div>

                     <div class="input-group">
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" placeholder="Placeholder" required>
                    </div>
                </div>
                <div class="register-input-wrapper secondRow">
                    <div class="input-group">
                        <label for="city">City</label>
                        <select class="drop-down" id="city" required>
                            <option value="" disabled selected>Select a city</option>
                            <option value="Tokyo">Tokyo</option>
                            <option value="Kioto">Kioto</option>
                            <option value="Yokohama">Yokohama</option>
                        </select>
                    </div>


                     <div class="input-group">
                        <label for="street">Street</label>
                        <select class="drop-down" id="street" required>

                        </select>
                    </div>

                    <div class="input-group">
                        <label for="house-number">House number</label>
                        <input type="number" min="2" id="house-number" placeholder="Placeholder" required>
                    </div>

                    <div class="paying-options">
                        <label>Pay by</label>
                        <div class="paying-options-wrapper">
                            <div class="pay-option">
                                <input type="radio" id="cash" name="payment" value="cash">
                                <label for="cash">Cash</label>
                            </div>
                            <div class="pay-option">
                                <input type="radio" id="card" name="payment" value="card">
                                <label for="card">Card</label>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit">Registration</button>
            </form>
        </div>
    `}function V(){const e=localStorage.getItem("cartItems"),o=document.querySelector(".products-list"),a=e?JSON.parse(e):[];o.innerHTML=a.map(s=>{let r=s.selectedSize.size;s.selectedAdditives.map(c=>{r+=`, ${c.name}`});const d=document.querySelector(".cart-total-amount");return d.innerHTML=`$${a.reduce((c,p)=>c+parseFloat(p.finalPrice.toString()),0).toFixed(2)}`,`
            <div class="cart-item-wrapper">
                <button class="cart-item-remove">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 6H15.375M3 6H8.625M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6H15.375" stroke="#403F3D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="cart-item-image">
                    <img src="${s.image}" alt="${s.name}" />
                </div>
                <div class="cart-item-info">
                    <h3>${s.name}</h3>
                    <div class="cart-size-details">
                        ${r}
                    </div>
                </div>
                <div class="cart-item-price">
                    <h3>$${parseFloat(s.finalPrice.toString()).toFixed(2)}</h3>
                </div>
            </div>
        `}).join(""),document.querySelectorAll(".cart-item-remove").forEach((s,r)=>{s.addEventListener("click",()=>{console.log("Remove button clicked for item index:",r),a.splice(r,1),localStorage.setItem("cartItems",JSON.stringify(a)),V()})}),document.querySelector(".sign-in-button").addEventListener("click",()=>{history.pushState({},"","/login"),window.dispatchEvent(new Event("popstate"))}),document.querySelector(".register-button").addEventListener("click",()=>{history.pushState({},"","/register"),window.dispatchEvent(new Event("popstate"))})}function Q(){const e=document.querySelector(".register-form");if(!e)return;e.addEventListener("submit",async t=>{t.preventDefault();const n=document.getElementById("login").value,s=document.getElementById("password").value,r=document.getElementById("confirm-password").value,d=document.getElementById("city").value,c=document.getElementById("street").value,p=document.getElementById("house-number").value,g=document.getElementsByName("payment");let y="";function L(){for(const P of g)if(P.checked){y=P.value;break}if(!/^[A-Za-z][A-Za-z]{2,}$/.test(n))return alert("Login must start with a letter and contain only letters and numbers"),!1;if(/^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/.test(s)){if(s!==r)return alert("Passwords do not match"),!1}else return alert("Password must be at least 6 characters long and contain at least one special character"),!1;return isNaN(Number(p))||Number(p)<=1?(alert("House number must be greater than 1"),!1):!!document.querySelector('input[name="payment"]:checked')}if(document.querySelector('button[type="submit"]'),!L())return;const v={login:n,password:s,confirmPassword:r,city:d,street:c,houseNumber:Number(p),paymentMethod:y};await fetch("http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/auth/register",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(v)}).then(u=>{if(console.log("Response status:",u.status),!u.ok)throw new Error(`Error with status: ${u.status}`);return u.json()}).then(u=>{console.log("Successful POST ",u)}).catch(u=>{console.log(u)})});const o={Tokyo:["Chuo-dori","Omotesando","Takeshita-dori","Ueno","Yanaka Ginza","Akihabara","Ginza","Shibuya","Harajuku","Roppongi"],Kioto:["Shijo-dori","Pontocho","Shimbashi-dori","Yasaka-dori","Shirakawa-dori","Nishiki Market","Gion","Philosopher's Path","Arashiyama","Fushimi Inari"],Yokohama:["Kawasaki","Yokosuka","Zushi","Kamakura","Fujisawa","Yamato","Machida","Yamashita Park","Minato Mirai","Motomachi"]};document.getElementById("city").addEventListener("change",t=>{const n=t.target.value,s=o[n]||[];console.log(s);const r=document.getElementById("street");r.innerHTML='<option value="" disabled selected>Select a street</option>',s.forEach(d=>{const c=document.createElement("option");c.value=d,c.textContent=d,r.appendChild(c)})}),[{id:"login",message:"⚠ Login must start with a letter and contain only letters and numbers"},{id:"password",message:"⚠ Password must be at least 6 characters long and contain at least one special character"},{id:"confirm-password",message:"⚠ Passwords do not match"},{id:"city",message:"⚠ Please select a city"},{id:"street",message:"⚠ Please select a street"},{id:"house-number",message:"⚠ House number must be greater than 1"},{id:"payment",message:"⚠ Please select a payment method"}].forEach(({id:t,message:n})=>{const s=document.getElementById(t);if(!s)return;const r=document.createElement("div");r.classList.add("error-message"),s.insertAdjacentElement("afterend",r),s.addEventListener("blur",()=>{let d=!0;if(t==="login")d=/^[A-Za-z][A-Za-z]{2,}$/.test(s.value);else if(t==="password")d=/^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/.test(s.value);else if(t==="confirm-password"){const c=document.getElementById("password").value;d=s.value===c}else if(t==="house-number"){const c=Number(s.value);d=!isNaN(c)&&c>1}else if(t==="city"||t==="street")d=s.value.trim()!=="";else if(t==="payment"){const c=document.getElementsByName("payment");d=Array.from(c).some(p=>p.checked)}d?(s.classList.remove("input-error"),r.textContent=""):(s.classList.add("input-error"),r.textContent=n)}),s.addEventListener("focus",()=>{s.classList.remove("input-error"),r.textContent=""})})}function X(){const e=document.querySelector(".login-form");if(!e)return;e.addEventListener("submit",async a=>{a.preventDefault();const i=document.getElementById("login").value,t=document.getElementById("password").value;let n=e.querySelector(".error-credentials");n||(n=document.createElement("div"),n.classList.add("error-credentials"),n.textContent="⚠ Invalid login or password",e.insertAdjacentElement("beforeend",n)),await fetch("http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/auth/login",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({login:i,password:t})}).then(r=>{if(console.log("Response status:",r.status),!r.ok)throw n.style.display="block",new Error(`Error with status: ${r.status}`);return r.json()}).then(r=>{console.log("Successful POST ",r),n.style.display="none",localStorage.setItem("token",r.token),window.location.href="/menu"}).catch(r=>{console.log(r)})}),[{id:"login",message:"⚠ Login must start with a letter and contain only letters and numbers"},{id:"password",message:"⚠ Password must be at least 6 characters long and contain at least one special character"}].forEach(({id:a,message:i})=>{const t=document.getElementById(a);if(!t)return;const n=document.createElement("div");n.classList.add("error-message"),t.insertAdjacentElement("afterend",n),t.addEventListener("blur",()=>{let s=!0;a==="login"?s=/^[A-Za-z][A-Za-z0-9]{2,}$/.test(t.value):a==="password"&&(s=/^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/.test(t.value)),s?(t.classList.remove("input-error"),n.textContent=""):(t.classList.add("input-error"),n.textContent=i)}),t.addEventListener("focus",()=>{t.classList.remove("input-error"),n.textContent=""})})}const H={"Marble cheesecake":"./assests/dessert-1.png","Red velvet":"./assests/dessert-2.png",Cheesecakes:"./assests/dessert-3.png","Creme brulee":"./assests/dessert-4.png",Pancakes:"./assests/dessert-5.png","Honey cake":"./assests/dessert-6.png","Chocolate cake":"./assests/dessert-7.png","Black forest":"./assests/dessert-8.png",Pavlova:"./assests/pavlova.png",Tiramisu:"./assests/tiramisu.png",Brownie:"./assests/brownie.png","Lemon mousse":"./assests/lemon-mousse.png","Fruit tart":"./assests/fruit-tart.png","Apple pie":"./assests/apple-pie.png"},j={Moroccan:"./assests/tea-1.png",Ginger:"./assests/tea-2.png",Cranberry:"./assests/tea-3.png","Sea buckthorn":"./assests/tea-4.png","English Breakfast":"./assests/english-breakfast-tea.png","Green Jasmine":"./assests/green-jasmine.png",Mint:"./assests/mint-tea.png",Chamomile:"./assests/chamomile.png","Jasmine Pearl":"./assests/jasmine-pearl.png","Berry Hibiscus":"./assests/berry-hibiscus.png"};var f=(e=>(e.Coffee="coffee",e.Tea="tea",e.Dessert="dessert",e))(f||{});const q=f.Coffee;let m=[];const b=[],S=[],E=[];async function ee(){const e=await fetch("http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products");if(!e.ok)throw new Error("Failed to fetch products");return m=(await e.json()).data,m}function te(){console.log("sorting products by categories");for(const e in m)m[e].category==="coffee"?b.push(m[e]):m[e].category==="tea"?S.push(m[e]):m[e].category==="dessert"&&E.push(m[e])}function Z(e){let o=[],a={};e===f.Coffee?(o=b,a=D):e===f.Tea?(o=S,a=j):e===f.Dessert&&(o=E,a=H);const i=document.querySelector(".menu-items");i&&(i.innerHTML=o.map(t=>`
        <div class="menu-item">
            <div class="menu-item-img">
                <img src="${a[t.name]}" alt="menu-item-photo" />
            </div>
            <div class="menu-item-text">
                <div class="menu-item-title">
                    <h3>${t.name}</h3>
                    <p>${t.description}</p>
                    <h3>${t.price}</h3>
                </div>
            </div>
        </div>
        `).join(""))}async function se(){I(!0);try{await new Promise(o=>setTimeout(o,3e3)),m.length===0&&(await ee(),te());const e=oe();B("coffee-btn"),Z(f.Coffee),R(e,f.Coffee)}catch(e){console.error("Error initializing menu:",e);const o=document.querySelector(".menu-items");o&&(o.innerHTML=`
                <div class="fetch-failure-message">
                    <p>Something went wrong while loading favorite products. Try refreshing the page.</p>
                </div>`)}finally{I(!1)}}window.addEventListener("DOMContentLoaded",()=>{ae()});function oe(){const e=document.getElementById("coffee-btn"),o=document.getElementById("tea-btn"),a=document.getElementById("dessert-btn");e?.addEventListener("click",()=>{B("coffee-btn"),A(f.Coffee),i=b}),o?.addEventListener("click",()=>{B("tea-btn"),A(f.Tea),i=S}),a?.addEventListener("click",()=>{B("dessert-btn"),A(f.Dessert),i=E});let i=b;return q==="coffee"?i=b:q==="tea"?i=S:q==="dessert"&&(i=E),i}function A(e){const o=document.querySelector(".menu-items");o.innerHTML="",Z(e);let a=[];e==="coffee"?a=b:e==="tea"?a=S:a=E,R(a,e)}function R(e,o){const a=document.querySelectorAll(".menu-item"),i=document.querySelector(".modal-container");a.forEach((t,n)=>{t.addEventListener("click",async()=>{try{let s=function(){let l=0,w=0;console.log(Number(c.sizes[g.toLowerCase()].price)),g&&(l=Number(c.sizes[g.toLowerCase()].price)),document.querySelectorAll(".additives .modal-text-option-btns.active").forEach($=>{const Y=$.querySelector(".additInd").textContent;w+=Number(c.additives[Y].price)});const k=l+w;document.querySelector(".modal-price-text").textContent=`$${k.toFixed(2)}`};const c=(await(await fetch(`http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products/${e[n].id}`)).json()).data,p=c;let g=null;console.log(c);let y=D[e[n].name];o==="tea"?y=j[e[n].name]:o==="dessert"&&(y=H[e[n].name]);let L="",v=0;for(const l in c.sizes)v===0?L+=`
                    <button class="modal-text-option-btns active" data-index="${v}">
                        <span class="size">${l.toUpperCase()}</span>
                        <span>${c.sizes[l].size}</span>
                    </button>
                `:L+=`
                    <button class="modal-text-option-btns" data-index="${v}">
                        <span class="size">${l.toUpperCase()}</span>
                        <span>${c.sizes[l].size}</span>
                    </button>
                `,v++;let u="";for(const l in c.additives)u+=`
                <button class="modal-text-option-btns" data-index="${v}">
                    <span class="additInd">${l}</span>
                    <span>${c.additives[l].name}</span>
                </button>
            `,v++;let x=0;x+=Number(p.price)+0+0,console.log(x),i.innerHTML=`
            <div class="modal">
                <div class="modal-content">
                    <img src=${y} alt=""/>
                    <div class="modal-text">
                        <h3>${e[n].name}</h3>
                        <p>${e[n].description}</p>
                        <label>Size</label>
                        <div class="sizes">
                            ${L}
                        </div>

                        <label>Additives</label>
                        <div class="additives">
                            ${u}
                        </div>
                        <div class="modal-price">
                            <h3>Total:</h3>
                            <h3 class="modal-price-text">$${parseFloat(x.toString()).toFixed(2)}</h3>
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
        `,document.querySelector(".close-modal-button")?.addEventListener("click",()=>{i.innerHTML=""}),document.querySelector(".add-to-cart-btn")?.addEventListener("click",()=>{const l={...p,image:o==="coffee"?D[e[n].name]:o==="tea"?j[e[n].name]:H[e[n].name],selectedSize:c.sizes[g.toLowerCase()],selectedAdditives:Array.from(document.querySelectorAll(".additives .modal-text-option-btns.active")).map(w=>{const k=w.querySelector(".additInd").textContent;return c.additives[k]}),finalPrice:Number(c.sizes[g.toLowerCase()].price)+Array.from(document.querySelectorAll(".additives .modal-text-option-btns.active")).reduce((w,k)=>{const $=k.querySelector(".additInd").textContent;return w+Number(c.additives[$].price)},0)};localStorage.getItem("cartItems")?localStorage.setItem("cartItems",JSON.stringify([...JSON.parse(localStorage.getItem("cartItems")),l])):localStorage.setItem("cartItems",JSON.stringify([l])),ne(),i.innerHTML=""});const z=document.querySelector(".modal");z?.addEventListener("click",l=>{l.target===z&&(i.innerHTML="")}),document.addEventListener("keydown",l=>{l.key==="Escape"&&(i.innerHTML="")});const N=document.querySelectorAll(".sizes .modal-text-option-btns");N.forEach(l=>{l.addEventListener("click",()=>{N.forEach(w=>w.classList.remove("active")),l.classList.add("active"),g=l.querySelector(".size")?.textContent,s()})}),document.querySelectorAll(".additives .modal-text-option-btns").forEach(l=>{l.addEventListener("click",()=>{l.classList.contains("active")?l.classList.remove("active"):l.classList.add("active"),s()})}),document.querySelector(".cartDisplay").addEventListener("click",l=>{l.preventDefault(),history.pushState({},"","/cart"),C()})}catch(s){console.log(s),i.innerHTML=`
            <div>
                <p>Something went wrong. Please, refresh the page</p>
            </div>
        `}})})}function B(e){const o=document.getElementById("coffee-btn"),a=document.getElementById("tea-btn"),i=document.getElementById("dessert-btn");e==="coffee-btn"?(o.classList.add("active"),a.classList.remove("active"),i.classList.remove("active")):e==="tea-btn"?(o.classList.remove("active"),a.classList.add("active"),i.classList.remove("active")):e==="dessert-btn"&&(o.classList.remove("active"),a.classList.remove("active"),i.classList.add("active"))}function ne(){const e=localStorage.getItem("cartItems"),o=document.querySelector(".productsAmount");o.innerHTML="",o.innerHTML=`${e?JSON.parse(e).length:0}`}function ae(){document.querySelector(".nav-menu")?.addEventListener("click",async o=>{o.preventDefault(),history.pushState({},"","/menu"),C()})}function C(){const e=document.querySelector("#app"),o={"/":T,"/menu":G,"/cart":U,"/login":W,"/register":_},a=window.location.pathname,i=o[a]||T,t=document.getElementsByClassName("cartDisplay").item(0);t&&(i!==T?t.style.visibility="visible":t.style.visibility="hidden"),e.innerHTML=i(),a==="/"&&J(),a==="/cart"&&V(),a==="/register"&&Q(),a==="/login"&&X(),a==="/menu"&&se(),document.querySelectorAll("[data-link]").forEach(s=>{s.addEventListener("click",r=>{r.preventDefault();const d=r.currentTarget;history.pushState({},"",d.href),C()})});const n=new CustomEvent("pageLoaded",{detail:{path:a}});document.dispatchEvent(n)}window.addEventListener("popstate",()=>{C()});async function ie(){const e=await fetch("http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products/favorites").then(o=>o.json());return console.log(e),{products:e.data}}let F=[],h=0,M=0;async function J(){I(!0),await new Promise(e=>setTimeout(e,500));try{return F=await ie(),console.log(F),F.products.map(e=>`
    <div class="product-card fade">
        <img src="${D[e.name]}" alt="product-img">
        <h3>${e.name}</h3>
        <p>${e.description}</p>
        <h3>$${e.price}</h3>
      </div>
    `).join("")}catch(e){return console.log(e),`
      <div class="fetch-failure-message">
        <p>Something went wrong while loading favorite products. Try refreshing the page.</p>
      </div>`}finally{I(!1)}}window.addEventListener("DOMContentLoaded",()=>{C(),window.dispatchEvent(new CustomEvent("pageLoaded",{detail:{path:window.location.pathname}})),document.querySelector(".nav-list-home")?.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("pageLoaded",{detail:{path:window.location.pathname}}))})});window.addEventListener("pageLoaded",async e=>{if(e.detail.path==="/"){const s=document.querySelector(".coffee-card");s&&(s.innerHTML=await J())}const a=Array.from(document.getElementsByClassName("product-card"));if(M=a.length,M===0)return;function i(){a.forEach((s,r)=>{s.style.display=r===h?"block":"none"})}i();const t=document.querySelector(".swipe-left"),n=document.querySelector(".swipe-right");t?.addEventListener("click",()=>{h=h===0?M-1:h-1,i(),O()}),n?.addEventListener("click",()=>{h=h===M-1?0:h+1,i(),O()})});window.addEventListener("popstate",()=>{C()});function O(){const e=document.querySelector(".sliders");e&&e.children.length>0&&(Array.from(e.children).forEach(o=>{o.innerHTML=`
          <svg width="40" height="4" viewBox="0 0 40 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="4" rx="2" fill="#C1B6AD"/>
          </svg>
          `}),e.children[h]&&(e.children[h].innerHTML=`
        <svg width="40" height="4" viewBox="0 0 40 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="4" rx="2" fill="#665F55"/>
        </svg>
        `))}
