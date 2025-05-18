import {Router} from "express";
import {workspace, doAdminExist} from "../middlewares/workspaces.middlewares.js"
import { verifyToken } from "../middlewares/jwt.middlewares.js";
import errorMiddleware from "../middlewares/error.middlewares.js";
import WorkspaceController from "../controllers/workspace.controllers.js";

const router = Router();
const Workspace = new WorkspaceController();

// POST /workspace
router.post("/", [verifyToken, doAdminExist, workspace.limited, workspace.wsName, workspace.adminId, workspace.limits, errorMiddleware.validator], async (req, res) => Workspace.create(req, res))

export default router;
