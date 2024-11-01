import { getUserInfo } from "@services/userService";
import { Request, Response } from "express";
interface CustomRequest extends Request {
  userId?: string;
}
class userController {
  static async getUserInfo(req: CustomRequest, res: Response) {
    try {
      const result = await getUserInfo(req.userId as string);
      return res.status(200).json({ message: "get user info successfully", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
export default userController;
