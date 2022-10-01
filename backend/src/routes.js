const express = require('express');

const multer = require("multer")
const upload = require("./upload");
const uploadOnMemory = require("./uploadOnMemory");
const cloudinary = require("./loudinary");

const carData = require("../test_data.json");

const router = express.Router();

// TODO: ADD ERROR HANDLING

router.get('/', (req, res) => {
    res.send({ message: 'Hello world' });
});

router.get('/cars', (req, res) => {
    const resultData = [];
    carData.forEach(car => {
        const appendData = {
            id: car.id,
            name: `${car.manufacture} - ${car.model}`,
            size: "small",
            rentPerDay: car.rentPerDay,
            image: car.image
        }
        resultData.push(appendData)
    })

    res.send({
        data: resultData
    })
})

router.get('/cars/:carId', (req, res) => {
    const carId = req.params.carId;
    const car = carData.find(car => car.id === carId);

    res.send({
        data: {
            id: car.id,
            name: `${car.manufacture} - ${car.model}`,
            size: "small",
            rentPerDay: car.rentPerDay,
            image: car.image
        }
    })
})

router.post('/cars', (req, res) => {
    // ADD NEW CAR TO DB
    // make new car id
    // add data to db
    res.send("heyaa");
})

router.put('/cars/:carId', (req, res) => {
    const carId = req.params.carId;
    // edit car based on id in db
    res.send("hyeooo")
})

router.delete('/cars/:carId', (req, res) => {
    const carId = req.params.carId;
    // delete car based on id in db
    res.send("hyedwaadooo")
})

// IMAGE UPLOAD HANDLER

module.exports = router;