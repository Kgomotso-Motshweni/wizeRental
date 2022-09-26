const multer = require("multer");
const path = require("path");

//Multer Config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb ) => {
        let ext = path.extname(file.originalname);
        if(ext == ".mp4" && ext == ".avi" && ext == ".mkv" && ext == ".mp3" && ext == ".wmv"){
            cb('message: Images and PDF Only!');
        }
        cb(null, true);
    },
});
