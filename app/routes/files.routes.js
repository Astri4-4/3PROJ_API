import { Router } from "express";
import FileMiddleware from "../middlewares/files.middlewares.js";
import errorMiddleware from "../middlewares/error.middlewares.js";
import { verifyToken } from "../middlewares/jwt.middlewares.js";

import path from 'path';

const router = Router();

router.get("/profile/:filename", [verifyToken, FileMiddleware.filename, errorMiddleware.validator], (req, res) => {
    const filename = req.params["filename"];
    res.sendFile(path.resolve('./uploads/profile_pictures/' + filename));
});

router.get("/attachment/:filename", [verifyToken, FileMiddleware.filename, errorMiddleware.validator], (req, res) => {
    const filename = req.params["filename"];
    res.sendFile(path.resolve('./uploads/attachments/' + filename));
})

export default router;
