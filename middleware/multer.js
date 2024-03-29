const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'C:/usman/new data base/images');
    },
    filename: function (req, file, callback) {
        // callback(null, file.fieldname)
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = { upload };
