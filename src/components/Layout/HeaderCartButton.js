import { useContext, useEffect, useState } from 'react'
import CartIcon from './../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../Store/cart-context'

const HeaderCartButton = (props) => {
    const ctx = useContext(CartContext)
    const [btnIsAnim, setBtnIsAnim] = useState(false)
    const numberOfCartItems = ctx.items.reduce((prev, cur) => { return prev + cur.amount }, 0)

    const btnClasses = `${classes.button} ${btnIsAnim ? classes.bump : ''}`

    useEffect(() => {
        if (ctx.items.length === 0) {
            return
        }
        setBtnIsAnim(true)
        const timer = setTimeout(() => {
            setBtnIsAnim(false)
        }, 300)
        return () => { clearTimeout(timer) }
    }, [ctx.items])

    return <button onClick={props.onClick} className={btnClasses}>
        <span className={classes.icon}><CartIcon /></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton