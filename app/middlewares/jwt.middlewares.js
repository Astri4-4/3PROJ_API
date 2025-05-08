import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        
        try {
            const verify = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            next()
        } catch (e) {
            res.status(401).json({"message": "Invalid token"})
        }
    } else {
        res.status(400).json({"message": "No token provided"})
    }


}

export {verifyToken};
