import prisma from "@lib/prisma";
import { checkNameHall, createHall, getHallAll, getSeatType } from "@services/hallService";
import { Request, Response } from "express";
class hallController {
  static async getSeatType(req: Request, res: Response) {
    try {
      const result = await getSeatType();
      return res.status(200).json({ message: "get seat type successfully", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getHall(req: Request, res: Response) {
    try {
      const result = await getHallAll();
      return res.status(200).json({ message: "get seat type successfully", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async createHall(req: Request, res: Response) {
    try {
      const { facilityId, name, columns, rows, seats } = req.body;
      const checkName = await checkNameHall(name, facilityId);
      if (!checkName) {
        return res.status(400).json({ message: "Hall name already exists!" });
      }
      await createHall(name, facilityId, columns, rows, seats);
      return res.status(201).json({ message: "Create Hall successfully" });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getHallDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await prisma.hall.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          seats: {
            include: {
              type: true,
            },
          },
        },
      });
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
export default hallController;
