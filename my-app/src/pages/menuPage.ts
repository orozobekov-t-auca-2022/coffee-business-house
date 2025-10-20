export function renderMenu(): string{
    return `
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
    `
}