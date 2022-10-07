const carSizeInput = new DropdownInput(
    "Small",
    "car-size-input",
    "img/icons/input_dropdown.svg",
    "carSize",
    {
        "Small": "small",
        "Medium": "medium",
        "Large": "large"
    }
)

carSizeInput.render();
carSizeInput.init();

const carPicInput = new FileInput(
    "pic-input",
    "Click to select file...",
    "img/icons/upload.svg",
    "carImg",
    "pic-input-validation"
)
carPicInput.render();
carPicInput.init();



// FORM VALIDATION
const carNameInput = document.querySelector("#carName")
const rentPerDayInput = document.querySelector("#rentPerDay")
const picInput = document.querySelector("#carImg");
const sizeInput = document.getElementsByName("carSize");

const sizeInputSelectedSelector = `input[name="carSize"]:checked`
const saveBtn = document.getElementById("save-car-btn");

const toggleSaveBtn = (activate) => {
    if (activate) {
        saveBtn.disabled = false;
        saveBtn.classList.remove("disabled");
    } else {
        saveBtn.disabled = true;
        saveBtn.classList.add("disabled");
    }
}

toggleSaveBtn(false);

const formValidation = () => {
    let isValid = true;

    if (carNameInput.value === "") isValid = false;
    if (rentPerDayInput.value === "") isValid = false;
    const picInputText = picInput.parentNode.querySelector("span");
    if (picInputText.innerHTML === "Click to select file...") isValid = false;

    const sizeInputVal = document.querySelector(sizeInputSelectedSelector)
    if (sizeInputVal === null) sizeInput[0].checked = true;

    return isValid;
}

const inputEventHandler = () => {
    toggleSaveBtn(formValidation());
}

const formInputArr = [carNameInput, rentPerDayInput, picInput]
for (const input of formInputArr) {
    input.addEventListener("change", inputEventHandler)
}

// RUPIAH INPUT
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
