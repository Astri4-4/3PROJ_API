import {query, param, body} from "express-validator";

const private_message = {
    receiverId: param("receiverId").notEmpty().trim().isNumeric(),
    content: body("content").optional({value :"falsy"}).trim(),
    
}

export { private_message }
