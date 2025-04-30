import jwt from "jsonwebtoken";

class Socket {

    constructor(socket) {
        this.socket = socket;
        this.listener();
    }

    listener() {
        this.socket.on("private_message", (data) => {
            this.private_message(data);
        })
    }

    checkJWT(token) {
        try {
            const verification = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            return verification;
        } catch (e) {
            return false;
        }
    }

    private_message(data) {

        data = JSON.parse(data);

        const isTokenValid = this.checkJWT(data.token);

        if (isTokenValid != false) {
            const userInfo = isTokenValid;

            let socketEvent = "";

            if (userInfo.id < data.receiver) {
                socketEvent = "mp_" + userInfo.id + "_" + data.receiver;
            } else {
                socketEvent = "mp_" + data.receiver + "_" + userInfo.id;
            }

            //TODO Ajouter le message a la base de donnée

            this.socket.emit(socketEvent, data.content);

        } else {
            console.log("Invalid Token")
        }

    }

}

export default Socket;
