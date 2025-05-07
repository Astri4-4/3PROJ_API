import {body} from "express-validator";

const metadata = {
    user_id: body("user_id").notEmpty().trim().isNumeric(),
    key: body("key").notEmpty().trim(),
}

export default metadata;
