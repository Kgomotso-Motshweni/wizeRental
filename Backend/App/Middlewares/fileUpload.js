const multer = require("multer");
const path = require("path");

//Multer Config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb ) => {
        let ext = path.extname(file.originalname);
        if(ext == ".png" && ext == ".pdf" && ext == ".jpg" && ext == ".jpeg"){
            cb({message: 'Unsupported file format'}, false)
        }
        cb(null, true);
    },
});
