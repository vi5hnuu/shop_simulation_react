import { useState } from "react"

function useInputValidate(defaultValue, inpTouched = false, validationHandler) {
    const [enteredText, setEneteredText] = useState(defaultValue)
    const [inputTouched, setInputTouched] = useState(inpTouched)
    const inputTextInValid = inputTouched && !validationHandler(enteredText)


    function onInputBlur() {
        setInputTouched(true)
    }
    return {
        enteredText,
        inputTextInValid,
        setInputTouched,
        inputTouched,
        setEneteredText,
        onInputBlur,
    }
}

export default useInputValidate