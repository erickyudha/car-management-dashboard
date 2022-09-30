class FileInput {
    constructor(renderId, placeholderText, iconPath, varName, validationLabelId) {
        this.varName = varName;
        this.iconPath = iconPath;
        this.placeholderText = placeholderText;
        this.renderId = renderId;
        this.renderElement = document.getElementById(renderId);
        this.validationLabelId = validationLabelId;
        this.validationLabelElement = document.getElementById(validationLabelId);
    }

    render() {
        const element =
            `
            <button type="button">
                <input type="file" accept="image/*" name="${this.varName}" id="${this.varName}">
                <span>${this.placeholderText}</span>
                <img src="${this.iconPath}" alt="upload-icon" />
            </button>
            `

        this.renderElement.innerHTML = element;
        this.renderElement.classList.add("file-input");
    }

    init() {
        // COLOR SETUP
        const PLACEHOLDER_COLOR = "#8A8A8A";
        const SELECTED_COLOR = "#000";

        const inputTextElement = this.renderElement.querySelector("span")
        inputTextElement.style.color = PLACEHOLDER_COLOR;

        inputTextElement.addEventListener('DOMSubtreeModified', () => {

        })


        // HANDLE CLICK
        const uploadBtn = this.renderElement.querySelector("button");
        const inputElement = this.renderElement.querySelector("input");
        uploadBtn.onclick = () => {
            inputElement.click();
        }

        // HANDLE FILE INPUT CHANGE
        inputElement.onchange = () => {
            const ACCEPTED_FILE_EXT = ["jpg", "svg", "jpeg", "png"];

            let filename = inputElement.files[0].name;
            const fileExt = filename.split(".").slice(-1)[0].toLocaleLowerCase();

            let inputValid = true;
            if (!ACCEPTED_FILE_EXT.includes(fileExt)) {
                this.validationLabelElement.innerHTML = "File is not an image!";
                inputValid = false;
            } else if (inputElement.files[0].size > 2097152) {
                this.validationLabelElement.innerHTML = "File size is to big! Max file size: 2MB";
                inputValid = false;
            } else {
                this.validationLabelElement.innerHTML = "File size max. 2MB";
            }

            if (inputValid) {
                inputTextElement.style.color = SELECTED_COLOR;
                uploadBtn.style.borderColor = "#000";
                this.validationLabelElement.style.color = "#8A8A8A";
            } else {
                inputElement.value = "";
                inputTextElement.style.color = PLACEHOLDER_COLOR;
                uploadBtn.style.borderColor = "#ff0000";
                this.validationLabelElement.style.color = "#ff0000";
                filename = this.placeholderText
            }
            inputTextElement.innerHTML = filename;

        }
    }
}