import {body, param} from "express-validator";

// VERIFY VALUE
const userMiddleware = {
    id: param("id").notEmpty().trim().isNumeric(),
    email: body("email").notEmpty().withMessage("Needed").trim().isEmail(),
    username: body("username").notEmpty().trim(),
    password: body("password").notEmpty().isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1
    }).trim(),
    telephone: body("telephone").notEmpty().trim().isMobilePhone()
}

const updateUserMiddleware = {
    email: body("email").trim().isEmail().optional({values: "falsy"}),
    username: body("username").optional({values: "falsy"}).trim(),
    password: body("password").isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minSymbols: 1
    }).trim().optional({values: "falsy"}),
    telephone: body("telephone").notEmpty().trim().isMobilePhone()
}

// VERIFY FUNCTION
function doExistWanted(req, res, next) {
    const id = req.params["id"];

    //TODO Voir si l'utilisateur existe par son id
    const user = {
        id: 1
    }
    if (user == undefined || user == null) {
        res.status(404).json({"message": "User not found"})
    } else {
        next()
    }
}

function doExistUnwanted(req, res, next) {
    //TODO Voir si l'utilisateur existe par on id
    const user = {}
    if (user != undefined || user != null) {
        next()
    } else {
        res.status(400).json({"message": "User do not exist"})
    }
}

function isEmailUsed(req, res, next) {
    //TODO Voir si l'email est déjà utilisé par un utilisateur
    const response = false;

    if (response == true) {
        res.status(400).json({"message": "Email already used"})
    } else {
        next();
    }
}

export {userMiddleware, updateUserMiddleware, doExistWanted, doExistUnwanted, isEmailUsed};
