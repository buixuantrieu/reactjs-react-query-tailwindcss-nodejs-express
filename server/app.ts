import express from "express";
import dotenv from "dotenv";
import authRoute from "@routes/authRoute";
import bodyParser from "body-parser";

import cors from "cors";
import http from "http";
import prisma from "@lib/prisma";
import cron from "node-cron";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

cron.schedule("*/5 * * * *", async () => {
  try {
    const now = new Date();
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        expiresAt: {
          lt: now,
        },
        isVerified: false,
      },
    });
    console.log(`Deleted ${deletedUsers.count} expired users.`);
  } catch (error) {
    console.error("Error deleting expired users:", error);
  }
});

app.use("/api/v1/auth", authRoute);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
