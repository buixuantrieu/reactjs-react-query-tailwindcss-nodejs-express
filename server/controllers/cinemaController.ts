import {
  createCinema,
  createFacility,
  getCinema,
  getCinemaById,
  getCinemaByMovieId,
  getFacility,
  getFacilityByCinemaId,
  getFacilityDetail,
  updateCinema,
  updateFacility,
} from "@services/cinemaService";
import { createSeatPrices } from "@services/hallService";
import { Request, Response } from "express";
class cinemaController {
  static async createCinema(req: Request, res: Response) {
    try {
      const { name, logo } = req.body;
      if (!name || !logo) return res.status(400).json({ message: "Invalid data" });
      const result = await createCinema(name, logo);
      res.status(201).json({ message: "create cinema successfully!", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getCinema(req: Request, res: Response) {
    try {
      const { movieId } = req.query;
      if (movieId) {
        const result = await getCinemaByMovieId(Number(movieId));
        res.status(200).json({ message: "get cinema successfully!", data: result });
      } else {
        const result = await getCinema();
        res.status(200).json({ message: "get cinema successfully!", data: result });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async createFacility(req: Request, res: Response) {
    try {
      const { cinemaId, name, province, district, ward, seatPrices, location } = req.body;
      const result = await createFacility(cinemaId, name, location, province, district, ward);
      await createSeatPrices(result.id, seatPrices);
      res.status(200).json({ message: "create facility successfully!", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getFacility(req: Request, res: Response) {
    try {
      const { cinemaId } = req.query;
      if (cinemaId) {
        const result = await getFacilityByCinemaId(Number(cinemaId));
        res.status(200).json({ message: "get facility successfully!", data: result });
      } else {
        const result = await getFacility();
        res.status(200).json({ message: "get facility successfully!", data: result });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getCinemaDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await getCinemaById(Number(id));
      res.status(200).json({ message: "get cinema detail successfully!", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async updateCinema(req: Request, res: Response) {
    try {
      const { name, logo } = req.body;
      const { id } = req.params;
      await updateCinema(Number(id), name, logo);
      res.status(200).json({ message: "get cinema detail successfully!" });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getFacilityDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await getFacilityDetail(Number(id));

      res.status(200).json({ message: "get facility detail successfully!", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async updateFacility(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { cinemaId, name, location, province, district, ward, seatPrices } = req.body;
      console.log(req.body);

      await updateFacility(
        Number(id),
        cinemaId,
        name,
        location,
        province,
        district,
        ward,
        seatPrices as { typeId: number; price: number }[]
      );
      res.status(200).json({ message: "Update facility successfully!" });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
export default cinemaController;
