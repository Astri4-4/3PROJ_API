import {validationResult} from "express-validator";

const errorMiddleware = {
    validator: (req, res, next) => {
        const report = validationResult(req);
        if (!report.isEmpty()) {
            return res.status(400).json(report.array());
        } else {
            next();
        }
    }
}

export default errorMiddleware;
