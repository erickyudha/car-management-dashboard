const express = require('express');

const upload = require("./handler/upload");
const uploadOnMemory = require("./handler/uploadOnMemory");
const cloudinary = require("./handler/cloudinary");
const { Car } = require("./handler/db-handler/models");

const router = express.Router();
const CLOUDINARY_DIR = "bcr-management-dashboard"


// API ROUTES
router.get('/', (req, res) => {
    res.json({
        status: "success",
        message: 'Hello world'
    });
});

router.get('/cars', (req, res) => {
    Car.findAll()
        .then(cars => {
            res.status(200)
                .json({
                    status: "success",
                    message: "Get all car data successfully",
                    data: cars
                })
        })
})

router.get('/cars/:carId', (req, res) => {
    const carId = req.params.carId;
    Car.findOne({
        where: { id: carId }
    })
        .then(car => {
            if (car !== null) {
                res.status(200)
                    .json({
                        status: "success",
                        message: `Get car data with id=${carId} successfully`,
                        data: car
                    })
            } else {
                res.status(404)
                    .json({
                        status: "failed",
                        message: `Car data with id=${carId} not found`
                    })
            }

        })
})

router.post('/cars', (req, res) => {
    Car.create({
        name: req.body.name,
        size: req.body.size,
        rent_per_day: req.body.rentPerDay,
        image_id: req.body.imageId,
        image_url: req.body.imageUrl
    })
        .then(car => {
            res.status(201)
                .json({
                    status: "success",
                    message: "Add data successfully"
                })
        })
        .catch(err => {
            res.status(422)
                .json({
                    status: "failed",
                    message: `Add data failed: ${err.message}`
                })
        })
})

router.put('/cars/:carId', (req, res) => {
    const carId = req.params.carId;
    Car.findOne({
        where: { id: carId }
    }).then(car => {
        // Delete previous image from cloudinary to prevent storage bloating
        cloudinary.uploader.destroy(`${CLOUDINARY_DIR}/${car.image_id}`)
    })

    let data = {
        name: req.body.name,
        size: req.body.size,
        rent_per_day: req.body.rentPerDay,
    }
    if (req.body.editImg) {
        data = {
            ...data,
            image_id: req.body.imageId,
            image_url: req.body.imageUrl
        }
    }

    Car.update(data, {
        where: { id: carId }
    })
        .then(car => {
            res.status(200)
                .json({
                    status: "success",
                    message: `Edit data with id=${carId} successfully`
                })
        })
        .catch(err => {
            res.status(422)
                .json({
                    status: "failed",
                    message: `Edit data with id=${carId} failed: ${err.message}`
                })
        })
})

router.delete('/cars/:carId', (req, res) => {
    const carId = req.params.carId;
    Car.findOne({
        where: { id: carId }
    }).then(car => {
        // Delete image from cloudinary to prevent storage bloating
        cloudinary.uploader.destroy(`${CLOUDINARY_DIR}/${car.image_id}`)
    }).then(result => {
        Car.destroy({
            where: { id: carId }
        })
            .then(car => {
                if (car) {
                    res.status(200)
                        .json({
                            status: "success",
                            message: `Delete data with id=${carId} successfully`
                        })
                } else {
                    res.status(404)
                        .json({
                            status: "failed",
                            message: `Delete data with id=${carId} failed: data not found`
                        })
                }
            })
            .catch(err => {
                res.status(422)
                    .json({
                        status: "failed",
                        message: `Delete data with id=${carId} failed: ${err.message}`
                    })
            })
    })
})

// IMAGE UPLOAD HANDLER
router.post("/cars/picture",
    // Unused as of now
    upload.single("picture"),
    (req, res) => {
        const url = `/uploads/${req.file.filename}`;
        res
            .status(201)
            .json({ message: "Foto berhasil di-upload, silahkan cek URL", url });
    }
);

router.post("/cars/picture/cloudinary",
    uploadOnMemory.single("picture"),
    (req, res) => {
        const public_id = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        cloudinary.uploader
            .upload(file, {
                height: 160, width: 270, crop: "fit",
                folder: "bcr-management-dashboard", public_id: public_id
            })
            .then(result => {
                res.status(201).json({
                    status: "success",
                    message: "Upload image successfully",
                    url: result.url,
                    public_id: public_id
                });
            })
            .catch(err => {
                res.status(422)
                    .json({
                        status: "failed",
                        message: `Post image failed: ${err.message}`
                    })
            })

    }
);

// ERROR HANDLER
router.use((error, request, response, next) => {
    response.status(error.status || 500).json({
        status: 'error',
        message: error.message || serverErrorMsg,
    });
});


module.exports = router;