import {body, param} from "express-validator";

const user = {
    id: param("id").notEmpty().trim().isNumeric(),
    email: body("email").notEmpty().withMessage("Needed").trim().isEmail(),
    username: body("username").notEmpty().trim(),
    password: body("password").notEmpty().isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1
    }).trim()
}

const updateUser = {
    email: body("email").trim().isEmail().optional({values: "falsy"}),
    username: body("username").optional({values: "falsy"}).trim(),
    password: body("password").isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1
    }).trim().optional({values: "falsy"})
}

export {user, updateUser};
