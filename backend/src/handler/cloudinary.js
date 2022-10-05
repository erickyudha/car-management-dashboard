// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dgjwtquka",
    api_key: "851982188236256",
    api_secret: "DhkUsZjzVEC-ARzZgXYM9UMSNvA",
    secure: true,
});

module.exports = cloudinary;
