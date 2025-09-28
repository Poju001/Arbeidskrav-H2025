import ProductModule from "./modules/ProductModule.js";
import CartModule from "./modules/CartModule.js";

const productSection = document.querySelector("#product-section");
const cartCount = document.querySelector("#cart-count");

const showAll = () => {
  const allProducts = ProductModule.getAll();

  let htmlTxt = "";

  allProducts.forEach((product) => {
    htmlTxt += `
            <article class="product xs-12 sm-6 md-4 lg-3 ">
                <img class="product__image" src="images/${product.img}" alt="${product.name}">
                <h3 class="product__title">${product.name}</h3>
                <p class="product__price">Pris: ${product.price},-</p>
                <button data-id="${product.id}" class="product__cart-btn">Legg til i handlekurv
                <i class="fa-solid fa-cart-shopping"></i></button>
            </article>
        `;
  });

  productSection.innerHTML = htmlTxt;
};

const setEventOnButtons = () => {
  const buttons = document
    .getElementById("product-section")
    .querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      saveNewProducts(productId);
    });
  });
};

const updateCartCount = () => {
  const lsKey = "products";
  const cart = JSON.parse(localStorage.getItem(lsKey) || []);

  cartCount.textContent = cart.length;
};

const saveNewProducts = (productId) => {
  const product = ProductModule.getById(parseInt(productId));

  CartModule.add(product);

  updateCartCount();
};

showAll();
setEventOnButtons();
updateCartCount();
