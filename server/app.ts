import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import http from "http";

const app = express();
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
