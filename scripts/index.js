// RADIO INPUT JS EVENT TRIGGER
const carSizeRadioInput = document.querySelectorAll('input[name="car-size"]');
let prevSelectedRadioNum = "1";
for (const element of carSizeRadioInput) {
    element.parentNode.addEventListener("click", () => {
        element.checked = true;
        const selectedRadioNum = document.querySelector('input[name="car-size"]:checked').id.replace("car-size-radio", "");
        if (selectedRadioNum !== prevSelectedRadioNum) {
            carSizeRadioInput[prevSelectedRadioNum - 1].parentNode.classList.remove("active");
            prevSelectedRadioNum = selectedRadioNum;
            element.parentNode.classList.add("active");
        }
    })
}