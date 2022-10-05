const multer = require("multer");
const path = require("path");

//Multer Config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb ) => {
        let ext = path.extname(file.originalname);
        // console.log(file)
        // console.log(ext)
        //test our file uploads if they meet the criteria/ test condition set below
        if(!ext.match(/\.(png|jpg|jpeg|gif|web|pdf)$/)){
           return  cb("message: Unsupported file format")   
        }
        cb(null, true);
    },
});
