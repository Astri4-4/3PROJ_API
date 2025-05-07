import { Router } from "express";
import {userMiddleware, updateUserMiddleware, doExistWanted, doExistUnwanted, isEmailUsed} from "../middlewares/users.middlewares.js";
import FileMiddleware from "../middlewares/multer.middlewares.js";
import { verifyToken } from "../middlewares/jwt.middlewares.js";
import ErrorMiddleware from "../middlewares/error.middlewares.js";
import UserController from "../controllers/users.controllers.js";


const router = Router();
const User = new UserController();

router.post("/register", [FileMiddleware.single("profile_pic"), userMiddleware.email, userMiddleware.username, userMiddleware.password, userMiddleware.telephone, ErrorMiddleware.validator, isEmailUsed], async (req, res) => {
    const {email, username, password} = req.body;
    try {
        await User.register(email, username, password);
        res.status(200).json({"message": "User created"})
    } catch (e) {
        res.status(500).json({"error":e})
    }
})

router.post("/login", [userMiddleware.email, userMiddleware.password, ErrorMiddleware.validator], async (req, res) => {
    const {email, password} = req.body;
    try {
        const response = await User.login(email, password);
        if (response == false) {
            res.status(401).json({"message": "Invalid Credentials"})
        } else {
            res.status(200).json({"token": response});
        }
    } catch (e) {
        res.status(500).json({"error": e});
    }
})

// GET USER BY ID
router.get("/:id", [verifyToken, userMiddleware.id, ErrorMiddleware.validator, doExistWanted], async (req, res) => {
    const id = req.params["id"];

    try {
        const response = await User.getById(id);
        if (response == false) {
            res.status(404).json({"message": "User not found"});
        } else {
            res.status(200).json(response);
        }
    } catch (e) {
        res.status(500).json({"error": e})
    }

})

// GET WORKSPACE BY USER
router.get("/:id/workspaces", [verifyToken, userMiddleware.id, ErrorMiddleware.validator, doExistWanted], async (req, res) => {
    const id = req.params["id"];
    try {
        const workspaces = await User.getWorkspaces(id);
        res.status(200).json({"workspaces": workspaces});
    } catch(e) {
        res.status(500).json({"error": e});
    }
})

// GET USER PROFILE PICTURE
router.get("/:id/profile_picture", [verifyToken, userMiddleware.id, ErrorMiddleware.validator, doExistWanted], async (req, res) => {
    const id = req.params["id"];

    try {
        const link = await User.profile_picture(id);
        res.send(200).json({"profile_picture": link});
    } catch(e) {
        res.send(500).json({"error": e});
    }
})

// UPDATE USER
router.put("/:id", [verifyToken, FileMiddleware.single("profile_pic"), userMiddleware.id, updateUserMiddleware.email, updateUserMiddleware.username, updateUserMiddleware.password, updateUserMiddleware.telephone, ErrorMiddleware.validator, doExistWanted], async (req,res) => {
    const {email, username, password, telephone} = req.body;

    try {
        await User.update(email, username, password, telephone);
        res.status(200).json({message: "User updated"})
    } catch (e) {
        res.status(500).json({"error": e})
    }
})

export default router;
