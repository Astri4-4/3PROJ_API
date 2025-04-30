import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/attachments");
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: {fileSize: 2 * 1024 * 1024}
})

export default upload;
