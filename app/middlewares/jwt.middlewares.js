import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {

    const token = req.headers.authorization.split(" ")[1];

    try {
        jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        next()
    } catch (e) {
        next("Invalid Token")
    }


}

export {verifyToken};
