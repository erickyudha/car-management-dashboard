const rupiahInputElement = document.querySelector("#rentPerDay");


const validateStringNum = (str) => {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

let prevValue = ""
rupiahInputElement.addEventListener("change", () => {
    const inputVal = rupiahInputElement.value;
    if (inputVal == "") return
    if (validateStringNum(inputVal)) {
        prevValue = inputVal
        return
    } else {
        rupiahInputElement.value = prevValue;
    }
})