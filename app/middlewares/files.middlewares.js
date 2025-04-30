import {param} from "express-validator";

const validator = {
    filename: param("filename").notEmpty().trim()
}

export default validator;
