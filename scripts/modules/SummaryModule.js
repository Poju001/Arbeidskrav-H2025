import CartModule from "./CartModule.js";

const SummaryModule = (() => {
    const getSummary = (cartProducts) => {
        let totalPrice = 0;
        let totalItems = 0;
    
        cartProducts.forEach((product) => {
            const qty = product.quantity || 1;
            totalPrice += product.price * qty;
            totalItems += qty;
        });

        return {
            totalItems,
            totalPrice
        }
    }

    return {
        getSummary
    };
})();

export default SummaryModule;