import {query, param, body} from "express-validator";

const private_message = {
    receiverId: param("receiverId").notEmpty().trim().isNumeric(),
    content: body("content").optional({value :"falsy"}).trim(),

}

function doChatExist(req, res, next) {
    const receiver_id = req.params["receiverId"];
    const token = req.headers.authorization.split(" ")[1];
    const decrypt = jwt.decode(token);
    const user_id = decrypt.id; // ID de l'utilisateur client

    //TODO Voir si la discussion existe
    const doExist = true;

    if (doExist == true) {
        next()
    } else {
        res.status(404).json({"message": "Chat do not exist"});
    }

}

function doReceiverExist(req, res, next) {
    const receiver_id = req.params["receiver_id"];

    //TODO Voir si l'utilisateur existe
    const doExist = true;

    if (doExist == true) {
        next()
    } else {
        res.status(404).json({"message": "Receiver do not exist"});
    }

}

export { private_message, doChatExist, doReceiverExist }
