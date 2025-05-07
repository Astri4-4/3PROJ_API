

class PrivateMessage {

    getAll(receiverId, userId) {
        //TODO Récuperer les messages depuis la BDD
        const messages = ["message 1", "message 2", "..."]; // ...
        return messages
    }

    send(receiverId, userId, content=null, filename=null) {
        const message = {
            receiver: receiverId,
            sender: userId,
            content: content,
            create_time: Date.now(),
            file: filename,
        }
        //TODO Ajouter le message a la base de donnée
    }

}

export default PrivateMessage;
