import {Routeur} from "express";
import {workspace, doAdminExist} from "../middlewares/workspaces.middlewares.js"
import errorMiddleware from "../middlewares/error.middlewares.js";

const router = Router();

/**
 * @swagger
 * /workspace/:id:
 *  get:
 *      summary: Returns a workspace based on it's ID
 *      tags: [Workspaces]
 *      responses:
 *          200:
 *              description: [workspace]
 */
router.get("/:id", [workspace.id, errorMiddleware.validator], (req, res) => {
    const workspace = {
        "wsname": "TaskFlow",
        "private": true,
        "admin_id": 1,
        "limits": 50
    }

    if (workspace == null) {
        res.status(404).json({error: "Workspace with id: " + req.params["id"] + " not found."})
    }

    res.status(200).json(workspace);

})

router.post("/", [workspace.wsname, workspace.private, workspace.admin_id, workspace.limits, errorMiddleware.validator], (res, req) => { //TODO Rajouter workspace.doAdminExist
    
})

export default router;
