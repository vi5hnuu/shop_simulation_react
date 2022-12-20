import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const existingCartItemIndex = state.items.findIndex((it) => { return it.id === action.item.id })

        const totalAmount = state.totalAmount + action.item.price * (action.singleAdd ? 1 : action.item.amount)
        let updatedItems = null
        if (existingCartItemIndex >= 0) {
            const existingItem = state.items[existingCartItemIndex]
            const nItem = { ...existingItem, amount: existingItem.amount + (action.singleAdd ? 1 : action.item.amount) }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = nItem
            return { items: updatedItems, totalAmount }
        } else {
            updatedItems = state.items.concat(action.item);
            return { items: updatedItems, totalAmount }
        }
    }
    if (action.type === 'REMOVE') {
        const existingCaerItemIndex = state.items.findIndex((it) => { return it.id === action.id })
        const existingItem = state.items[existingCaerItemIndex]
        const updatedTotalAmount = Number.parseFloat((state.totalAmount - existingItem.price).toFixed(2))
        let updatesItems;
        if (existingItem.amount === 1) {
            updatesItems = state.items.filter((item) => item.id !== action.id)
        } else {
            updatesItems = [...state.items]
            updatesItems[existingCaerItemIndex].amount = existingItem.amount - 1
        }
        return { items: updatesItems, totalAmount: updatedTotalAmount }
    }
    return defaultCartState
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item, singleAdd = false) => {
        dispatchCartAction({ type: 'ADD', item, singleAdd })
    }
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: "REMOVE", id })
    }
    function clearCartHandler() {
        dispatchCartAction({ type: "CLEAR" })
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }


    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider