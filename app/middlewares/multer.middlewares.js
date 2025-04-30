import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/profile_pictures");
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, JPG, PNG allowed !'));
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 2 * 1024 * 1024}
})

export default upload;
