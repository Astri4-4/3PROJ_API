import { Router } from "express";
import { private_message } from "../middlewares/private_messages.middlewares.js";
import AttachmentMiddleware from "../middlewares/attachment.middleware.js";
import {verifyToken} from "../middlewares/jwt.middlewares.js";
import errorMiddleware from "../middlewares/error.middlewares.js";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/:receiverId", [verifyToken, private_message.receiverId, errorMiddleware.validator], (req, res) => {

    const receiverId = req.params["receiverId"]; // ID du correspondant
    const token = req.headers.authorization.split(" ")[1];
    const decrypt = jwt.decode(token);
    const userId = decrypt.id; // ID de l'utilisateur client

    //TODO Récuperer les messages depuis la BDD
    const messages = ["message 1", "message 2", "..."]; // ...

    res.status(200).json(messages);
})

router.post("/:receiverId", [verifyToken, AttachmentMiddleware.single("attachment"), private_message.receiverId, private_message.content, errorMiddleware.validator], (req, res) => {

    const content = req.body.content;
    const receiverId = req.params["receiverId"]; // ID du correspondant
    const token = req.headers.authorization.split(" ")[1];
    const decrypt = jwt.decode(token);
    const userId = decrypt.id; // ID de l'utilisateur client
    const filename = req.file.filename;

    const message = {
        receiver: receiverId,
        sender: userId,
        content: content,
        attachment: filename,
    }

    //TODO Stocké en BDD

    res.status(200).json({"message": "Message sended successfully"});

})

export default router;
