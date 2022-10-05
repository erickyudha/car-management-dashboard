// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "secret",
    api_key: "secret",
    api_secret: "secret",
    secure: true,
});

module.exports = cloudinary;
