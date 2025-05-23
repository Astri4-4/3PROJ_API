import { Router } from "express";
import {fileMiddleware, doProfileExist, doAttachmentExist} from "../middlewares/files.middlewares.js";
import errorMiddleware from "../middlewares/error.middlewares.js";
import { verifyToken } from "../middlewares/jwt.middlewares.js";

import path from 'path';

const router = Router();

router.get("/profile/:filename", [verifyToken, fileMiddleware.filename, errorMiddleware.validator, doProfileExist], (req, res) => {
    const filename = req.params["filename"];
    res.sendFile(path.resolve('./uploads/profile_pictures/' + filename));
});

router.get("/attachment/:filename", [verifyToken, fileMiddleware.filename, errorMiddleware.validator, doAttachmentExist], (req, res) => {
    const filename = req.params["filename"];
    res.sendFile(path.resolve('./uploads/attachments/' + filename));
})

export default router;
