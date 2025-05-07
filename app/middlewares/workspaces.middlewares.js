import {param, body} from "express-validator";

const workspace = {
    id: param('id').notEmpty().trim().isNumeric(),
    wsname: body('wsname').notEmpty().trim().isAlpha(),
    private: body('private').notEmpty().trim().isBoolean(),
    admin_id: body('admin_id').notEmpty().trim().isNumeric(),
    limits: body('limits').optional({values: "falsy"}).trim().isNumeric()
}

function doAdminExist(req, res, next) {
    const admin_id = req.body["admin_id"];

    //TODO Voir si l'utilisateur existe
    const user = {
        id: 1
    }

    if (user == null) next("User doesn't exist");

    next();

}

export default {workspace, doAdminExist};
