// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "Rahasia", // TODO: Ganti dengan cloudname-mu
    api_key: "Rahasia", // TODO: Ganti dengan API Key-mu
    api_secret: "Rahasia", // TODO: Ganti dengan API Secret-mu
    secure: true,
});

module.exports = cloudinary;
