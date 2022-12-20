import { useRef } from 'react'
import useInputValidate from '../../hooks/useInputValidate'
import classes from './Checkout.module.css'


function isNotEmpty(text) {
    return text && text.trim().length !== 0
}

function Checkout(props) {
    console.log('Checkout');
    const nameHook = useInputValidate('', false, isNotEmpty)
    const streetHook = useInputValidate('', false, isNotEmpty)
    const postalHook = useInputValidate('', false, isNotEmpty)
    const cityRef = useRef()

    function nameInputChangehandler(event) {
        nameHook.setInputTouched(true)
        nameHook.setEneteredText(event.target.value)
    }

    function streetInputChangehandler(event) {
        streetHook.setInputTouched(true)
        streetHook.setEneteredText(event.target.value)
    }

    function postalInputChangehandler(event) {
        postalHook.setInputTouched(true)
        postalHook.setEneteredText(event.target.value)
    }
    function confirmHandler(event) {
        event.preventDefault()

        nameHook.setInputTouched(true)
        streetHook.setInputTouched(true)
        postalHook.setInputTouched(true)

        if (isNotEmpty(nameHook.enteredText) && isNotEmpty(streetHook.enteredText) && isNotEmpty(postalHook.enteredText)) {
            const userAddress = {
                name: nameHook.enteredText,
                street: streetHook.enteredText,
                postal: postalHook.enteredText,
                city: isNotEmpty(cityRef.current.value) ? cityRef.current.value : 'unknown'
            }
            props.onConfirm(userAddress)

            //reset
            resetStates()
        }
    }
    function resetStates() {
        nameHook.setEneteredText('')
        streetHook.setEneteredText('')
        postalHook.setEneteredText('')
        nameHook.setInputTouched(false)
        streetHook.setInputTouched(false)
        postalHook.setInputTouched(false)
    }
    return <form className={classes.form} onSubmit={confirmHandler}>

        <div className={classes.control}>
            <label htmlFor='name'>
                Your Name
                <span className={classes.mandatory}>*</span>
            </label>
            <input
                onChange={nameInputChangehandler}
                className={nameHook.inputTextInValid ? classes.invalid : ''}
                onBlur={nameHook.onInputBlur}
                value={nameHook.enteredText}
                type='text'
                id='name' />
        </div>
        <div className={classes.control}>
            <label htmlFor='street'>
                Street
                <span className={classes.mandatory}>*</span>
            </label>
            <input
                onChange={streetInputChangehandler}
                className={streetHook.inputTextInValid ? classes.invalid : ''}
                value={streetHook.enteredText}
                onBlur={streetHook.onInputBlur} type='text' id='street' />
        </div>
        <div className={classes.control}>
            <label htmlFor='postal'>
                Postal Code
                <span className={classes.mandatory}>*</span>
            </label>
            <input
                onChange={postalInputChangehandler}
                className={postalHook.inputTextInValid ? classes.invalid : ''}

                value={postalHook.enteredText}
                onBlur={postalHook.onInputBlur} type='text' id='postal' />
        </div>
        <div className={classes.control}>
            <label htmlFor='city'>City</label>
            <input ref={cityRef} type='text' id='city' />
        </div>
        <div className={classes.actions}>
            <button type='button' className={classes.btn_cancel} onClick={props.onCancel}>Cancel</button>
            <button type='submit' className={classes.btn_confirm}>Confirm</button>
        </div>
    </form>
}

export default Checkout