import CartModule from "./modules/CartModule.js";
import SummaryModule from "./modules/SummaryModule.js";

const cartProductSection = document.querySelector("#cart-product-section");
const cartCount = document.querySelector("#cart-count");
const summarySection = document.querySelector("#summary-section");

const showCartProducts = () => {
  const cartProducts = CartModule.getAll();

  let htmlTxt = "";

  cartProducts.forEach((product) => {
    htmlTxt += `
            <article class="product xs-12 sm-6 md-4 lg-3 ">
                <img class="product__image" src="images/${product.img}" alt="${
      product.name
    }">

                <div class="product__details">
                    <h3 class="product__title">${product.name}</h3>
                    <p class="product__price">Pris: ${product.price},-</p>
                    
                    <div class="product__quantity">
                      <button data-id=${
                        product.id
                      } class="product__quantity-btn product__quantity-btn--minus">-</button>
                      <span class="product__quantity-value">${
                        product.quantity || 1
                      }</span>
                      <button data-id=${
                        product.id
                      } class="product__quantity-btn product__quantity-btn--plus">+</button>
                    </div>
                </div>
            </article>
        `;
  });
  cartProductSection.innerHTML = htmlTxt;

  const minusBtns = document.querySelectorAll(".product__quantity-btn--minus");
  const plusBtns = document.querySelectorAll(".product__quantity-btn--plus");

  minusBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      CartModule.decrease(id);
      refreshCart();
    });
  });

  plusBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      CartModule.increase(id);
      refreshCart();
    });
  });
};

const refreshCart = () => {
  showCartProducts();
  showSummary();
  updateCartCount();
};

const updateCartCount = () => {
  const lsKey = "products";
  const cart = JSON.parse(localStorage.getItem(lsKey) || []);

  cartCount.textContent = cart.length;
};

const showSummary = () => {
  const cartProducts = CartModule.getAll();
  const summary = SummaryModule.getSummary(cartProducts);

  summarySection.innerHTML = `
  <section class="cart-summary">
    <div class="cart-summary__box">
      <h2 class="cart-summary__title">Oppsummering</h2>

      <div class="cart-summary__row">
        <span class="cart-summary__label">Antall varer:</span>
        <span class="cart-summary__value cart-summary__value--items">${
          summary.totalItems
        }</span>
      </div>

      <div class="cart-summary__row cart-summary__row--total">
        <span class="cart-summary__label">Totalpris:</span>
        <span class="cart-summary__value cart-summary__value--price">${summary.totalPrice.toFixed(
          2
        )}</span>
      </div>

      <button class="cart-summary__checkout-btn">Til betaling
      <i class="fa-solid fa-money-check-dollar fa-bounce"></i>
      </button>
    </div>
  </section>
  `;
};

showCartProducts();
showSummary();
updateCartCount();
