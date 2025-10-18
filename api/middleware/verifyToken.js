import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/responseHandler.js";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return errorHandler(res, 401, "No token provided");
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return errorHandler(res, 403, "Token is not valid")

        req.user = user

        next()
    })
}

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(errorHandler(res,403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    if (req.user.isAdmin) {
      next();
    } else {
      return next(errorHandler(res,403, "Only admin allowed!"));
    }
  });
};
