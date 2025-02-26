import jwt from "jsonwebtoken";
import User from "../model/user.js";
import dotenv from "dotenv";

dotenv.config();

// 📌 Protect routes (Authenticated users only)
export const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findByPk(decoded.userId, { attributes: ["id", "name", "email", "isAdmin"] });
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) res.status(401).json({ message: "Not authorized, no token" });
};

// 📌 Admin middleware
export const admin = async(req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findByPk(decoded.userId, { attributes: ["id", "name", "email", "isAdmin"] });
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};
