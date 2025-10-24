import { renderHome } from "./pages/mainPage";
import { renderMenu } from "./pages/menuPage";
import { renderCart } from "./pages/cartPage";
import { renderLogin } from "./pages/login";
import { renderRegistration } from "./pages/registration";
import fetchDataForCart from "./fetchDataForCart";
import { registrationService } from "./services/registrationService";
import { loginService } from "./services/loginService";
import { initMenuPage } from "./services/menuService";
import { loadFavorites } from "./main";

export function router() {
  const app = document.querySelector("#app") as HTMLElement;

  const routes: Record<string, () => string> = {
    "/": renderHome,
    "/menu": renderMenu,
    "/cart": renderCart,
    "/login": renderLogin,
    "/register": renderRegistration
  };

  const path = window.location.pathname;
  const page = routes[path] || renderHome;

  const cartDisplay = document.getElementsByClassName("cartDisplay").item(0);

  if(cartDisplay) {
    if (page !== renderHome) {
      cartDisplay.style.visibility = "visible";
    } else {
      cartDisplay.style.visibility = "hidden";
    }
  }

  app.innerHTML = page();

  if(path === '/') {
    loadFavorites()
  }

  if(path === '/cart') {
    fetchDataForCart();
  }

  if(path === '/register'){
    registrationService()
  }

  if(path === '/login'){
    loginService()
  }

  if (path === "/menu") {
    initMenuPage();
  }

  document.querySelectorAll("[data-link]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      history.pushState({}, "", target.href);
      router();
    });
  });

  const event = new CustomEvent("pageLoaded", { detail: { path } });
  document.dispatchEvent(event);
}

// Обработка навигации стрелками браузера
window.addEventListener("popstate", () => {
  router();
});
