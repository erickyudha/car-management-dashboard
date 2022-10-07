class AddCarApp {
    constructor() {
        this.nameInput = document.querySelector("#carName");
        this.rentPerDayInput = document.querySelector("#rentPerDay");
        this.picInput = document.querySelector("#carImg");
        this.sizeInputSelector = `input[name="carSize"]:checked`;

        this.cancelBtn = document.getElementById("cancel-btn");
        this.saveBtn = document.getElementById("save-car-btn");
        this.formOverlay = document.querySelector(".form-overlay");

        this.savedImgId = "";
        this.savedImgUrl = "";
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

    async postNewCar() {
        // require api config file
        const url = `http://${api.host}:${api.port}/api/cars`;
        const data = {
            name: this.nameInput.value,
            size: document.querySelector(this.sizeInputSelector).value,
            rentPerDay: parseInt(this.rentPerDayInput.value),
            imageId: this.savedImgId,
            imageUrl: this.savedImgUrl
        }

        return fetch(url, {
            method: 'POST',
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

                const response = await this.uploadImg();
                this.savedImgUrl = response.url;
                this.savedImgId = response.public_id;

                let hostname = location.protocol + "//" + location.host;
                await this.postNewCar()
                    .then(res => {
                        hostname += "?action=add&status=success";
                    }).catch(error => {
                        console.error(error);
                        hostname += "?action=add&status=failed";
                    }).finally(() => {
                        location.href = hostname;
                    })
            }
        }
    }
}