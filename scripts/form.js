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
    if (picInput.value === "") isValid = false;

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
