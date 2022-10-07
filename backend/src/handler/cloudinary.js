// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "CHANGE THIS",
    api_key: "CHANGE THIS",
    api_secret: "CHANGE THIS",
    secure: true,
});

module.exports = cloudinary;
