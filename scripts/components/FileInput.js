class FileInput {
    constructor(renderId, placeholderText, iconPath, varName, labelId) {
        this.varName = varName;
        this.iconPath = iconPath;
        this.placeholderText = placeholderText;
        this.renderId = renderId;
        this.renderElement = document.getElementById(renderId);
        this.labelId = labelId || "";
    }

    render() {
        const element =
            `
            <button type="button">
                <input type="file" name="${this.varName}" id="${this.labelId}">
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
            inputTextElement.style.color = SELECTED_COLOR;
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

            const filename = inputElement.files[0].name;
            const fileExt = filename.split(".").slice(-1)[0].toLocaleLowerCase();

            if (!ACCEPTED_FILE_EXT.includes(fileExt)) {
                alert("File is not an image!");
            } else {
                inputTextElement.innerHTML = filename;
            }
        }
    }
}