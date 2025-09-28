const CartModule = (() => {
  const lsKey = "products";

  const getAll = () => {
    if (localStorage.getItem(lsKey) != null) {
      return JSON.parse(localStorage.getItem(lsKey));
    } else {
      return [];
    }
  };

  const saveAll = (products) => {
    localStorage.setItem(lsKey, JSON.stringify(products));
  };

  const add = (product) => {
    const products = getAll();

    const existing = products.find((p) => p.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      product.quantity = 1;
      products.push(product);
    }

    saveAll(products);
  };

  const increase = (id) => {
    const products = getAll();
    const existing = products.find((p) => p.id === id);

    if (existing) {
      existing.quantity++;
      saveAll(products);
    }
  };

  const decrease = (id) => {
    const products = getAll();
    const existing = products.find((p) => p.id === id);

    if (existing) {
      existing.quantity -= 1;

      if (existing.quantity <= 0) {
        const updated = products.filter((p) => p.id !== id);
        saveAll(updated);
      } else {
        saveAll(products);
      }
    }
  };

  return {
    getAll,
    add,
    decrease,
    increase,
  };
})();

export default CartModule;
