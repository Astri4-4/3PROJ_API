import chalk from "chalk";
import jwt from "jsonwebtoken";

class Socket {

    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        this.room = 0;
        this.listener();
    }

    listener() {
        this.socket.on("joinRoom", (roomId) => {
            this.joinRoom(roomId)
        })
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

    joinRoom(roomId) {
        this.socket.join(roomId);
        this.room = roomId;
        console.log(chalk.blue("Socket joined room " + roomId));
    }

    private_message(data) {

        data = JSON.parse(data);

        const isTokenValid = this.checkJWT(data.token);

        if (isTokenValid != false) {
            const receiverId = data.receiver;
            const userId = isTokenValid.id;
            this.io.to(this.room).emit('message', data.content);


        } else {
            console.log("Invalid Token")
        }

    }

}

export default Socket;
