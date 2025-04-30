import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {user, updateUser} from "../middlewares/users.middlewares.js";
import FileMiddleware from "../middlewares/multer.middlewares.js";
import { verifyToken } from "../middlewares/jwt.middlewares.js";
import ErrorMiddleware from "../middlewares/error.middlewares.js";


const router = Router();

router.post("/register", [FileMiddleware.single("profile_pic"), user.email, user.username, user.password, ErrorMiddleware.validator], (req, res) => {

    const {email, username, password} = req.body;
    // const profilePic = req.file.filename;
    console.log(req)

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = {
        email: email,
        username: username,
        password: hashPassword,
        role: "user",
    }

    //TODO Inséerer l'utilisateur dans la BDD

    res.status(200).json({"message": "User created successfully"})

})

router.post("/login", [user.email, user.password, ErrorMiddleware.validator], (req, res) => {

    const {email, username, password} = req.body;

    //TODO Récuperer les infos de l'utilisateur
    const user = {
        email: "sachaguerin.sg@gmail.com",
        username: "astria",
        password: "$2b$10$PBaw/vXk78xBK7Z/Cgtg2epPj/j1ScASNxAceQlUNDkP4rDOd4FCu",
        role: "admin"
    }

    const verification = bcrypt.compareSync(password, user.password);

    if (verification == true) {
        const payload = {
            id: 1,
            username: username,
            role: user.role
        };
        //FIXME Ajouter une limite au Token
        const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET)

        res.status(200).json({token: token});

    } else {
        res.status(401).json({"message": "Invalid Credential"})
    }



})

// GET USER BY ID
router.get("/:id", [verifyToken, user.id, ErrorMiddleware.validator], (req, res) => {

    const id = req.params["id"];

    //TODO Récuperer les informations de l'utilisateur dans la BDD
    const user = {
        "id": req.params["id"],
        "email": "sachaguerin.Sg@gmail.com",
        "username": "Astria"
    }

    res.status(200).json(user);
})

// GET WORKSPACE BY USER
router.get("/:id/workspaces", [verifyToken, user.id, ErrorMiddleware.validator], (req, res) => {
    const id = req.params["id"];

    //TODO Récuperer les workspaces dans la BDD
    const workspacesId = [1,2,3,4];

    //TODO Récupérer les informations des workspaces dans leur BDD respectives
    const workspaces = [
        {
            id: 1,
            "title": "Supinfo",
            // ...
        },
        {
            id: 1,
            "title": "Axelerance",
            // ...
        }
        // ...
    ];

    res.status(200).json(workspaces);

})

// GET USER PROFILE PICTURE
router.get("/:id/profile_picture", [verifyToken, user.id, ErrorMiddleware.validator], (req, res) => {
    const id = req.params["id"];

    //TODO Récupérer le lien de l'image dans la BDD
    const profile_picture = "1746004637707-IMG_0190.jpg";

    res.status(200).json({"profile_pic": profile_picture});

})

// UPDATE USER
router.put("/:id", [verifyToken, FileMiddleware.single("profile_pic"), user.id, updateUser.email, updateUser.username, updateUser.password, ErrorMiddleware.validator], (req,res) => {
    const {email, username, password} = req.body;

    //TODO Récupérer les informations de l'utilisateur
    const currentUser = {
        "email": "sachaguerin.sg@gmail.com",
        "username": "Astria",
        "password": "$2b$10$PBaw/vXk78xBK7Z/Cgtg2epPj/j1ScASNxAceQlUNDkP4rDOd4FCu"
    }

    const updatedUser = {
        email: "",
        username: "",
        password:""
    };

    if (email == undefined || email == "" || email == null) {
        updatedUser.email = currentUser.email
    } else {
        updatedUser.email = email
    }
    if (username == undefined || username == "" || username == null) {
        updatedUser.username = currentUser.username
    }else {
        updatedUser.username = username;
    }
    if (password == undefined || password == '' || password == null) {
        updatedUser.password = currentUser.password
    } else {
        updatedUser.password = bcrypt.hashSync(password, 10);
    }

    //TODO Update les valeurs dans la BDD

    res.status(200).json({message: "User updated successfully"})
})

export default router;
