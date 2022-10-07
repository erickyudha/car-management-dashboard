class EditCarApp {
    constructor() {
        this.nameInput = document.querySelector("#carName");
        this.rentPerDayInput = document.querySelector("#rentPerDay");
        this.picInput = document.querySelector("#carImg");
        this.sizeInput = document.getElementsByName("carSize");
        this.sizeInputSelector = `input[name="carSize"]:checked`;

        this.picFile;

        this.cancelBtn = document.getElementById("cancel-btn");
        this.saveBtn = document.getElementById("save-car-btn");
        this.formOverlay = document.querySelector(".form-overlay");

        this.savedImgId = "";
        this.savedImgUrl = "";
        this.needToPutNewImg = false;

        const params = new URLSearchParams(window.location.search)
        this.queryId = params.get("id");
    }

    async getCarData() {
        // require api config file
        const url = `http://${api.host}:${api.port}/api/cars/${this.queryId}`;

        return fetch(url)
            .then((response) => response.json())
            .then((body) => {
                return body.data
            })
            .catch(error => {
                console.error(error);
            });
    }

    async loadForm() {
        const data = await this.getCarData();
        this.nameInput.value = data.name;
        this.rentPerDayInput.value = data.rent_per_day;

        const sizeMap = ["small", "medium", "large"];
        const selectedSizeInput = this.sizeInput[sizeMap.indexOf(data.size)]
        selectedSizeInput.checked = true;
        const sizeInputRoot = document.querySelector(".select-input");
        sizeInputRoot.querySelector(".select-btn span").innerHTML = data.size.charAt(0).toUpperCase() + data.size.slice(1);

        const [picExt] = data.image_url.split(".").slice(-1);
        this.picFile = data.image_id + "." + picExt;
        this.picInput.parentNode.querySelector("span").innerHTML = this.picFile;
        this.picInput.parentNode.querySelector("span").style.color = "#000";

        this.saveBtn.disabled = false;
        this.saveBtn.classList.remove("disabled")
    }

    async uploadImg() {
        const formData = new FormData();
        formData.append("picture", this.picInput.files[0]);

        // require api config file
        const url = `http://${api.host}:${api.port}/api/cars/picture/cloudinary`;

        return fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((body) => {
                return body
            })
            .catch(error => {
                console.error(error);
            });
    }

    async editCarData() {
        // require api config file
        const url = `http://${api.host}:${api.port}/api/cars/${this.queryId}`;
        let data = {
            name: this.nameInput.value,
            size: document.querySelector(this.sizeInputSelector).value,
            rentPerDay: parseInt(this.rentPerDayInput.value),
            editImg: false
        }
        if (this.needToPutNewImg) {
            data = {
                ...data,
                imageId: this.savedImgId,
                imageUrl: this.savedImgUrl,
                editImg: true
            }
        }

        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((body) => {
                return body.data
            })
            .catch(error => {
                console.error(error);
            });
    }

    init() {
        this.cancelBtn.onclick = () => {
            history.back();
        }

        this.saveBtn.onclick = async () => {
            if (!this.saveBtn.disabled) {
                this.formOverlay.classList.add("active");

                if (this.picFile !== this.picInput.parentNode.querySelector("span").innerHTML) {
                    const response = await this.uploadImg();
                    this.savedImgUrl = response.url;
                    this.savedImgId = response.public_id;

                    this.needToPutNewImg = true;
                }

                let hostname = location.protocol + "//" + location.host;
                await this.editCarData()
                    .then(res => {
                        hostname += "?action=edit&status=success";
                    }).catch(error => {
                        console.error(error);
                        hostname += "?action=edit&status=failed";
                    }).finally(() => {
                        location.href = hostname;
                    })
            }
        }

        this.loadForm();
    }
}