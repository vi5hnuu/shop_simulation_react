import React from "react";

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item, singleAdd = false) => { },
    removeItem: (id) => { },
    clearCart: () => { }
})

export default CartContext