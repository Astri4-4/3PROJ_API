import { Router } from "express";
import { private_message, doChatExist, doReceiverExist } from "../middlewares/private_messages.middlewares.js";
import AttachmentMiddleware from "../middlewares/attachment.middleware.js";
import {verifyToken} from "../middlewares/jwt.middlewares.js";
import errorMiddleware from "../middlewares/error.middlewares.js";
import jwt from "jsonwebtoken";
import PrivateMessageController from "../controllers/private_message.controllers.js";

const router = Router();
const PrivateMessage = new PrivateMessageController();

router.get("/:receiverId", [verifyToken, private_message.receiverId, errorMiddleware.validator, doChatExist, doReceiverExist], async (req, res) => {

    const receiverId = req.params["receiverId"]; // ID du correspondant
    const token = req.headers.authorization.split(" ")[1];
    const decrypt = jwt.decode(token);
    const userId = decrypt.id; // ID de l'utilisateur client

    try {
        const chat = await PrivateMessage.getAll(receiverId, userId);
        res.send(200).json({"messages": chat});
    } catch (e) {
        res.send(500).json({"error": e});
    }
})

router.post("/:receiverId", [verifyToken, AttachmentMiddleware.single("attachment"), private_message.receiverId, private_message.content, errorMiddleware.validator, doReceiverExist], async (req, res) => {

    const content = req.body.content;
    const receiverId = req.params["receiverId"]; // ID du correspondant
    const token = req.headers.authorization.split(" ")[1];
    const decrypt = jwt.decode(token);
    const userId = decrypt.id; // ID de l'utilisateur client
    const filename = req.file.filename;

    try {
        await PrivateMessage.send(receiverId, userId, content, filename);
        res.status(200).json({"message": "Message send"})
    } catch (e) {
        res.status(500).json({"error": e});
    }

})

export default router;
