import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma";

const salt = bcrypt.genSaltSync(10);

const hashPassword = async (password: string) => {
  const hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
};

const checkPassword = async (password: string, hashPassword: string) => {
  const result = bcrypt.compareSync(password, hashPassword);
  return result;
};
const createAccessToken = async (data: { id: string }) => {
  const result = jwt.sign(data, process.env.PRIMARY_KEY_ACCESS_TOKEN as string, { expiresIn: "1h" });
  return result;
};
const createRefreshToken = async (data: { id: string }) => {
  const result = jwt.sign(data, process.env.PRIMARY_KEY_REFRESH_TOKEN as string, { expiresIn: "7d" });
  return result;
};

const existenceCheckUser = async (email: string) => {
  const result = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return result;
};

const registerUser = async (email: string, password: string, activationCode: number) => {
  const id = uuid();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  const result = await prisma.user.create({
    data: {
      id,
      email,
      password,
      activationCode,
      expiresAt,
    },
  });
  return result;
};

export { hashPassword, registerUser, checkPassword, existenceCheckUser, createAccessToken, createRefreshToken };
