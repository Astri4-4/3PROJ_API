import { Router } from "express";
import {userMiddleware, updateUserMiddleware, doExistWanted, doExistUnwanted, isEmailUsed} from "../middlewares/users.middlewares.js";
import FileMiddleware from "../middlewares/multer.middlewares.js";
import { verifyToken } from "../middlewares/jwt.middlewares.js";
import ErrorMiddleware from "../middlewares/error.middlewares.js";
import UserController from "../controllers/users.controllers.js";


const router = Router();
const User = new UserController();

/**
 * @swagger
 * /users/register:
 *  post:
 *      summary: Register a new user in the database
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - username
 *                          - password
 *                          - telephone
 *                      properties:
 *                          email:
 *                              type: string
 *                          username:
 *                              type: string
 *                          password:
 *                              type: string
 *                          telephone:
 *                              type: string
 *      responses:
 *          200:
 *              description: User created.
 *          400:
 *              description: Email already used.
 *          500:
 *              description: Server error.
 */
router.post("/register", [FileMiddleware.single("profile_pic"), userMiddleware.email, userMiddleware.username, userMiddleware.password, userMiddleware.telephone, ErrorMiddleware.validator, isEmailUsed], async (req, res) => {
    const {email, username, password, telephone} = req.body;
    try {
        await User.register(email, username, password, telephone);
        res.status(200).json({"message": "User created"})
    } catch (e) {
        res.status(500).json({"error":e})
    }
})

/**
 * @swagger
 * /users/login:
 *  post:
 *      summary: To log a user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Will return a JWT token.
 *          400:
 *              description: One or more value are not correct
 *          401:
 *              description: Invalid Credentials
 *          500:
 *              description: Server error
 *          
 */
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

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
 *      400:
 *          description: One or more value is not correct
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
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

/**
 * @swagger
 * /users/{id}/workspaces:
 *  get:
 *      summary: Return all the workspaces a user is part of.
 *      tags: [Users]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *      responses:
 *       200:
 *         description: User found
 *       400:
 *          description: One or more value is not correct
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
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
    //FIXME Only admin or owner
    try {
        await User.update(email, username, password, telephone);
        res.status(200).json({message: "User updated"})
    } catch (e) {
        res.status(500).json({"error": e})
    }
})

export default router;
