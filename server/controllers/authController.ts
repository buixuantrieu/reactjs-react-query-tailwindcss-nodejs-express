import { Request, Response } from "express";
import validator from "validator";
import jwt from "jsonwebtoken";

import {
  checkPassword,
  createAccessToken,
  createRefreshToken,
  existenceCheckUser,
  getUserById,
  hashPassword,
  isVerified,
  registerUser,
} from "@services/authService";
import { randomNumber, sendMail } from "@utils/index";

class authController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const messageError: { email?: string; password?: string } = {};
      !email && (messageError.email = "Không được để trống!");
      !password && (messageError.password = "Không được để trống!");
      if (email) !validator.isEmail(email) && (messageError.email = "Không phải định dạng email!");
      if (password)
        !validator.isLength(password, { min: 8, max: 20 }) && (messageError.password = "Mật khẩu từ 8 đến 20 kí tự!");
      if (Object.keys(messageError).length != 0) return res.status(401).json({ message: messageError });
      const existenceCheck = await existenceCheckUser(email);
      if (!existenceCheck) {
        const hashPass = await hashPassword(password);
        const activationCode = randomNumber();

        const user = await registerUser(email, hashPass, activationCode);
        const contentEmail = `
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #e3e4f3; color: #333;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fff;">
            <tr>
              <td style="padding: 20px; text-align: center;">
                  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
                  <h1 style="color: #6f76b8; font-size: 24px; margin-bottom: 20px;">Chào mừng đến với T&M Cinema!!</h1>
                  <p style="color: #8b90c6; font-size: 16px; line-height: 1.5;">Cảm ơn bạn đã đăng ký. Vui lòng xác nhận địa chỉ email của bạn bằng cách nhập mã OTP dưới đây:</p>
                  <span style="display: inline-block; padding: 12px 24px; margin: 20px 0; font-size: 16px; color: #ffffff; background-color: #6f76b8; text-decoration: none; border-radius: 4px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">${activationCode}</span>
                  <p style="color: #bec0e1; font-size: 14px;">Nếu bạn không đăng ký tài khoản, bạn không cần thực hiện thêm bất kỳ hành động nào.</p>
                  <a href=${`http://localhost:5173/Verified?email=${email}&id=${user.id}`}>Link kích hoạt</a>
                  <p style="color: #8b90c6; font-size: 14px;">Trân trọng, Đội ngũ T&M Cinema</p>
                </div>
              </td>
            </tr>
          </table>
        </body>`;
        await sendMail(email, contentEmail);
        res.status(201).json({ message: "Tạo tài khoản thành công!", user });
      } else {
        return res.status(401).json({ message: { email: "Email đã tồn tại!" } });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const messageError: { email?: string; password?: string } = {};
    !email && (messageError.email = "Không được để trống!");
    !password && (messageError.password = "Không được để trống!");
    if (Object.keys(messageError).length != 0) return res.status(401).json({ message: messageError });
    const existenceCheck = await existenceCheckUser(email);

    if (existenceCheck) {
      const checkPass = await checkPassword(password, existenceCheck.password);
      const accessToken = await createAccessToken({ id: existenceCheck.id });
      const refreshToken = await createRefreshToken({ id: existenceCheck.id });
      if (checkPass) {
        if (!existenceCheck.isVerified) {
          return res.status(401).json({ message: { password: "Tài khoản chưa được kích hoạt!" } });
        } else if (!existenceCheck.isActive) {
          return res.status(401).json({ message: { password: "Tài khoản đang bị khóa!" } });
        }
        return res.status(200).json({
          message: "Đăng nhập thành công",
          refreshToken,
          accessToken,
          userRole: existenceCheck.UserRole,
        });
      } else {
        res.status(401).json({ message: { password: "Sai tài khoản hoặc mật khẩu" } });
      }
    } else {
      return res.status(401).json({ message: { password: "Sai tài khoản hoặc mật khẩu" } });
    }
  }
  static async refreshToken(req: Request, res: Response) {
    const { token: refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }
    try {
      const decoded = jwt.verify(refreshToken, process.env.PRIMARY_KEY_REFRESH_TOKEN as string) as { id: string };
      const user = await getUserById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const newAccessToken = await createAccessToken({ id: user.id });
      return res.json({ accessToken: newAccessToken });
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
  }
  static async verified(req: Request, res: Response) {
    try {
      const { id, activationCode } = req.body;
      const user = await getUserById(id);
      if (user) {
        if (activationCode === user.activationCode) {
          await isVerified(id);
          return res.status(200).json({ message: "Verified successfully!" });
        } else {
          return res.status(401).json({ message: "wrong OTP!" });
        }
      } else {
        return res.status(403).json({ message: "Activation expired!" });
      }
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
  }
}
export default authController;
