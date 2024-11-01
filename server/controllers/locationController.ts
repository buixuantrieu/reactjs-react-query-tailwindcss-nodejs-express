import { getDistrict, getProvince, getWard } from "@services/locationService";
import { Request, Response } from "express";
class locationController {
  static async getProvince(req: Request, res: Response) {
    try {
      const result = await getProvince();
      res.status(200).json({ message: "get province successfully!", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getDistrict(req: Request, res: Response) {
    try {
      const { provinceId } = req.query;

      if (!provinceId) return res.status(200).json({ message: "No data", data: [] });

      const result = await getDistrict(Number(provinceId));
      return res.status(200).json({ message: "get district successfully", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getWard(req: Request, res: Response) {
    try {
      const { districtId } = req.query;

      if (!districtId) return res.status(200).json({ message: "No data", data: [] });

      const result = await getWard(Number(districtId));
      return res.status(200).json({ message: "get ward successfully", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
export default locationController;
