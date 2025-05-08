import {param} from "express-validator";
import fs from "node:fs";
import path from "node:path"

export const fileMiddleware = {
    filename: param("filename").notEmpty().trim()
}

export function doProfileExist(req, res, next) {
    const filename = req.params["filename"];

    fs.readFile(path.resolve('./uploads/profile_pictures/' + filename), (err, data) => {
        if (err) res.send(404).json({"message": "Profile picture not found"});
        next();
    })

}

export function doAttachmentExist(req, res, next) {
    const filename = req.params["filename"];

    fs.readFile(path.resolve('./uploads/attachments/' + filename), (err, data) => {
        if (err) res.send(404).json({"message": "Profile picture not found"});
        next();
    })

}

export default {fileMiddleware, doProfileExist, doAttachmentExist};
