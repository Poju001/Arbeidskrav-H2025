const ProductModule = (() => {
  const productData = {
    lastUpdated: "18.09.25 11:45",
    products: [
      {
        id: 1,
        name: "Chipotle pølse",
        img: "chipotle-pølse.jpg",
        price: 55.9,
      },
      {
        id: 2,
        name: "Fårikålkjøtt",
        img: "fårikålkjøtt.jpg",
        price: 195.0,
      },
      {
        id: 3,
        name: "Grill pølser",
        img: "grillpølser.jpg",
        price: 61.9,
      },
      {
        id: 4,
        name: "Karbonadedeig",
        img: "karbonadedeig.jpg",
        price: 60.0,
      },
      {
        id: 5,
        name: "Karbonader",
        img: "karbonader.jpg",
        price: 72.9,
      },
      {
        id: 6,
        name: "Kyllingkjøttdeig",
        img: "kyllingkjøttdeig.jpg",
        price: 59.9,
      },
      {
        id: 7,
        name: "Røkte kjøttpølser",
        img: "røkte-kjøttpølser.jpg",
        price: 80.0,
      },
      {
        id: 8,
        name: "Wienerpølser",
        img: "wienerpølser.jpg",
        price: 68.9,
      },
    ],
  };

  const getAll = () => {
    return structuredClone(productData.products);
  };

  const getById = (id) => {
    const chosenProduct = productData.products.find(
      (product) => product.id === id
    );
    return chosenProduct;
  };

  //LocalStorage
  const lsKey = "products";

  const saveNew = (newProducts) => {
    if (localStorage.getItem(lsKey) != null) {
      const products = JSON.parse(localStorage.getItem(lsKey));

      products.push(newProducts);

      localStorage.setItem(lsKey, JSON.stringify(products));
    } else {
      localStorage.setItem(lsKey, JSON.stringify([newProducts]));
    }
  };

  return {
    getAll,
    getById,
    saveNew,
  };
})();

export default ProductModule;
