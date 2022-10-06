class DashboardApp {
    constructor() {
        this.carListContainer = document.querySelector(".car-list")
        this.filterInput = document.querySelectorAll('input[name="car-size"]');
        this.filterCarBy = "all";

        this.deleteConfirmPrompt = document.querySelector(".delete-confirm");
        this.deleteConfirmBtn = document.getElementById("confirm-delete-btn");
        this.cancelConfirmBtn = document.getElementById("confirm-cancel-btn");

        this.alertElement = document.querySelector(".alert");

        const params = new URLSearchParams(window.location.search)
        this.queryAction = params.get("action");
        this.queryStatus = params.get("status");
    }

    async showAlert(type, message) {
        const alertTextElement = this.alertElement.querySelector("span");
        alertTextElement.innerHTML = message;

        this.alertElement.style.visibility = "visible";
        this.alertElement.style.display = "flex";
        this.alertElement.classList.add(type);
        this.alertElement.classList.remove("hidden");

        setTimeout(() => {
            this.alertElement.classList.remove(type)
            this.alertElement.classList.add("hidden");

            setTimeout(() => {
                this.alertElement.style.visibility = "hidden";
                this.alertElement.style.display = "none";
            }, 500)
        }, 2500)
    }

    async fetchCarData() {
        // require api config file
        const url = `http://${api.host}:${api.port}/api/cars`;

        return fetch(url)
            .then((response) => response.json())
            .then((body) => { return body.data })
            .catch(error => {
                this.carListContainer.innerHTML = "<h2>Server Error: Try again later</h2>"
                console.error(error);
            });
    }

    async removeCarData(id) {
        // require api config file
        const url = `http://${api.host}:${api.port}/api/cars/${id}`;

        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((body) => { return body.data })
            .catch(error => {
                console.error(error);
            });
    }

    async load() {
        const cars = await this.fetchCarData();
        let finalCars = []

        if (this.filterCarBy === "all") finalCars = cars;
        else finalCars = cars.filter(car => car.size === this.filterCarBy)

        Car.init(finalCars)
    }

    async run() {
        this.clear()
        await this.load()

        if (Car.list.length < 1) {
            this.carListContainer.innerHTML = "<h2>Car not found</h2>"
        } else {
            Car.list.forEach((car) => {
                // create element
                const node = document.createElement("li");
                node.classList.add("car-card");
                node.innerHTML = car.render();

                // delete confirmation event
                const nodeDelBtn = node.querySelector(".btn-delete");
                const id = car.id;

                nodeDelBtn.onclick = async () => {
                    this.deleteConfirmPrompt.classList.add("active");
                    this.cancelConfirmBtn.onclick = () => {
                        this.deleteConfirmPrompt.classList.remove("active");
                    }
                    this.deleteConfirmBtn.onclick = () => {
                        this.deleteConfirmPrompt.classList.remove("active");
                        this.removeCarData(id).then(result => this.run());
                        this.showAlert("neutral", "Data Berhasil Dihapus")
                    }
                }

                // render element to DOM
                this.carListContainer.appendChild(node);
            });
        }
    }

    clear = () => {
        let child = this.carListContainer.firstElementChild;

        while (child) {
            child.remove();
            child = this.carListContainer.firstElementChild;
        }
    };

    async init() {
        this.run();

        // Hide Alert
        this.alertElement.style.visibility = "hidden";

        // Radio Event Handler
        let prevSelectedRadioNum = "1";
        for (const element of this.filterInput) {
            element.parentNode.addEventListener("click", () => {
                element.checked = true;
                const selectedRadioNum = document.querySelector('input[name="car-size"]:checked').id.replace("car-size-radio", "");
                this.filterCarBy = element.value;
                if (selectedRadioNum !== prevSelectedRadioNum) {
                    this.filterInput[prevSelectedRadioNum - 1].parentNode.classList.remove("active");
                    prevSelectedRadioNum = selectedRadioNum;
                    element.parentNode.classList.add("active");

                    this.run();
                }
            })
        }

        if (this.queryAction) {
            let type = "neutral"
            let message = ""
            if (this.queryStatus === "success") {
                type = "success"
                message = (this.queryAction === "add") ? "Data Berhasil Disimpan" : "Edit Data Berhasil"
            } else {
                type = "error"
                message = "Terjadi kesalahan tak terduga"
            }
            this.showAlert(type, message)
            setTimeout(() => {
                history.replaceState({}, document.title, "/");
            }, 3000)
        }
    }
}