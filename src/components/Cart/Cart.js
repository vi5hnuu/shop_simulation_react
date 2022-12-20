import classes from './Cart.module.css'
import Modal from './../UI/Modal'
import { useContext } from 'react';
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import { useState } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';
import { SyncLoader } from 'react-spinners'

const override = {
    "textAlign": "center"
}

const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const [showCheckout, setShowCheckout] = useState(false)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0
    const [orderLoading, setorderLoading] = useState(false)

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = (item, singleAdd) => {
        cartCtx.addItem(item, singleAdd)//todo bug ;;;duplicate add
    }

    function orderHandler() {
        setShowCheckout((prevState) => { return !prevState })
    }

    async function submitOrderhandler(userData) {
        setorderLoading(true)
        //Todo : Handle any sort of error
        const db = getDatabase();
        const dbRef = ref(db, 'orders');
        const newOrderRef = push(dbRef)
        await set(newOrderRef, { userData, items: cartCtx.items })
        setorderLoading(false)
        cartCtx.clearCart()
        setorderLoading(false)
    }
    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem key={item.id} name={item.name} price={item.price} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item, true)} />
            ))}
        </ul>
    );

    return <Modal onClose={props.onClose}>
        {cartCtx.items.length > 0 && cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {showCheckout && !orderLoading && cartCtx.items.length !== 0 && <Checkout onConfirm={submitOrderhandler} onCancel={props.onClose} />}
        {<SyncLoader cssOverride={override} loading={orderLoading} />}
        {!showCheckout && <div className={classes.actions}>
            <button className={classes['button--cancel']} onClick={props.onClose}>Close</button>
            {hasItems && <button onClick={orderHandler} className={classes['button--order']}>Order</button>}
        </div>}
    </Modal>

}

export default Cart