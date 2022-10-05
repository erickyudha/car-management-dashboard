const express = require('express');

const upload = require("./handler/upload");
const uploadOnMemory = require("./handler/uploadOnMemory");
const cloudinary = require("./handler/cloudinary");

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
router.put("/cars/:id/picture",
    upload.single("picture"),
    (req, res) => {
        const url = `/uploads/${req.file.filename}`;
        res
            .status(200)
            .json({ message: "Foto berhasil di-upload, silahkan cek URL", url });
    }
);

router.put("/cars/:id/picture/cloudinary",
    uploadOnMemory.single("picture"),
    (req, res) => {
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        cloudinary.uploader.upload(file, function (err, result) {
            if (!!err) {
                console.log(err);
                return res.status(400).json({
                    message: "Gagal upload file!",
                });
            }

            res.status(201).json({
                message: "Upload image berhasil",
                url: result.url,
            });
        });
    }
);




module.exports = router;