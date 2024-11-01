import jwt from "jsonwebtoken";
import prisma from "@lib/prisma";
import { Request, Response, NextFunction } from "express";
import { checkRoleAdmin } from "@services/authService";

interface CustomRequest extends Request {
  userId?: string;
}
export const authorizationAdmin = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }
  try {
    const user = jwt.verify(token, process.env.PRIMARY_KEY_ACCESS_TOKEN as string);
    if (typeof user !== "string" && user.id) {
      req.userId = user.id;
      const checkRole = await checkRoleAdmin(user.id);
      if (checkRole) {
        next();
      } else {
        return res.status(403).json({ message: "You do not have permission to access this resource!" });
      }
    }
  } catch (error) {
    return res.status(403).json({ message: "Access token is invalid or expired" });
  }
};
