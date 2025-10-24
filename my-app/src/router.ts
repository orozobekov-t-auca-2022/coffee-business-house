import { renderHome } from "./pages/mainPage";
import { renderMenu } from "./pages/menuPage";
import { renderCart } from "./pages/cartPage";
import { renderLogin } from "./pages/login";
import { renderRegistration } from "./pages/registration";
import fetchDataForCart from "./fetchDataForCart";
import { registrationService } from "./services/registrationService";
import { loginService } from "./services/loginService";
import { initMenuPage } from "./services/menuService";

export function router() {
  const app = document.querySelector("#app") as HTMLElement;

  const base = import.meta.env.BASE_URL;

  console.log('Base URL:', base);

  const routes: Record<string, () => string> = {
    [`${base}`]: renderHome,
    [`${base}menu`]: renderMenu,
    [`${base}cart`]: renderCart,
    [`${base}login`]: renderLogin,
    [`${base}register`]: renderRegistration
  };

  const path = window.location.pathname;
  const page = routes[path] || renderHome;

  const cartDisplay = document.getElementsByClassName("cartDisplay").item(0) as HTMLElement;

  if(cartDisplay) {
    if(page !== renderHome) {
      if (localStorage.getItem('token') !== null) {
      cartDisplay.style.visibility = "visible";
    } else if (localStorage.getItem('token') === null && localStorage.getItem('cartItems') !== null && localStorage.getItem('cartItems').length > 0) {
      cartDisplay.style.visibility = "visible";
    } else {
      cartDisplay.style.visibility = "hidden";
    }
  } else{
    cartDisplay.style.visibility = "hidden";
  }
  }

  app.innerHTML = page();

  if (path === `${base}cart` || path === '/cart') {
    fetchDataForCart();
  }

  if (path === `${base}register` || path === '/register'){
    registrationService();
  }

  if (path === `${base}login` || path === '/login'){
    loginService();
  }

  if (path === `${base}menu` || path === '/menu') {
    initMenuPage();
  }

  document.querySelectorAll("[data-link]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const el = e.currentTarget as HTMLElement;
      let href = (el.getAttribute && el.getAttribute('href')) || el.getAttribute('data-link') || '';
      try {
        const url = new URL(href, window.location.origin);
        href = url.pathname;
      } catch (error) {
        console.log(error)
      }
      if (href.startsWith('/')) {
        href = `${base}${href.replace(/^\//, '')}`;
      } else if (!href.startsWith(base)) {
        href = `${base}${href}`;
      }

      history.pushState({}, "", href);
      router();
    });
  });

  const event = new CustomEvent("pageLoaded", { detail: { path } });
  console.log('[router] dispatching pageLoaded', path);
  document.dispatchEvent(event);
}

window.addEventListener("popstate", () => {
  router();
});