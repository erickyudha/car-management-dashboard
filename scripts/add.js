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

