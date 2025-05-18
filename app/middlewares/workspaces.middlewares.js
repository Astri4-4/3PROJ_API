import {param, body} from "express-validator";

export const workspace = {
    id: param('id').notEmpty().trim().isNumeric(),
    wsName: body('wsName').notEmpty().trim().isAlpha(),
    limited: body('private').notEmpty().trim().isAlpha(),
    adminId: body('admin_id').notEmpty().trim().isNumeric(),
    limits: body('limits').optional({values: "falsy"}).trim().isNumeric()
}

export function doAdminExist(req, res, next) {
    const admin_id = req.body["admin_id"];

    //TODO Voir si l'utilisateur existe
    const user = {
        id: 1
    }

    if (user == null) res.status(404).sendText("User not found");

    next();

}

export default {workspace, doAdminExist};
