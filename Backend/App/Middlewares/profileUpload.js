const multer = require("multer");
const path = require("path");

//Multer Config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb ) => {
        let ext = path.extname(file.originalname);
        if(ext !== ".jpeg" &&  ext !== ".jpg" && ext !== ".png"){
            cb("message: Unsupported file format")
            return 
        }
        cb(null, true);
    },
});
