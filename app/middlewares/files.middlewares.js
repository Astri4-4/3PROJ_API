import {param} from "express-validator";
import fs from "node:fs";

const file = {
    filename: param("filename").notEmpty().trim()
}

function doExist(req, res, next) {
    
}

export default {file};
