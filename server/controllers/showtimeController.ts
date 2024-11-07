import { createShowTime, getShowTimeAll, getShowTimeDetail, updateShowTime } from "@services/showtimeService";
import prisma from "@lib/prisma";
import { Request, Response } from "express";
class showtimeController {
  static async createShowTime(req: Request, res: Response) {
    try {
      const messageError: { duration: undefined | string } = { duration: undefined };
      const { endTime, startTime, hallId, movieId, differenceInMinutes } = req.body;
      const movieDetail = await prisma.movie.findFirst({
        where: {
          id: movieId,
        },
      });
      if (movieDetail) {
        if (differenceInMinutes < movieDetail.duration) {
          messageError.duration = "Độ dài phim lớn hơn thời gian xuất chiếu";
        }
      }
      const checkSamTime = await prisma.showTime.findFirst({
        where: {
          hallId,
          OR: [
            {
              startTime: {
                lt: endTime,
              },
              endTime: {
                gt: startTime,
              },
            },
          ],
        },
      });
      if (checkSamTime?.id) {
        messageError.duration = "Phòng chiếu đã có xuất chiếu tại khoảng thời gian này!";
      }
      if (messageError.duration) {
        return res.status(404).json({ message: messageError.duration });
      }
      await createShowTime(startTime, endTime, hallId, movieId);
      return res.status(201).json({ message: "create showtime successfully" });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getShowTime(req: Request, res: Response) {
    try {
      const { hallId, movieId, startTime, endTime } = req.query;
      let hallIdFilter: undefined | number = undefined;
      let movieIdFilter: undefined | number = undefined;
      let startTimeFilter: undefined | Date = undefined;
      let endTimeFilter: undefined | Date = undefined;
      if (typeof hallId === "string") {
        hallIdFilter = Number(hallId);
      }
      if (typeof movieId === "string") {
        movieIdFilter = Number(hallId);
      }
      if (typeof startTime === "string") {
        startTimeFilter = new Date(startTime);
      }
      if (typeof endTime === "string") {
        endTimeFilter = new Date(endTime);
      }
      const result = await getShowTimeAll(hallIdFilter, movieIdFilter, startTimeFilter, endTimeFilter);

      return res.status(200).json({ message: "get user info successfully", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async showTimeDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await getShowTimeDetail(Number(id));

      return res.status(200).json({ message: "get user info successfully", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async updateShowTime(req: Request, res: Response) {
    try {
      const messageError: { duration: undefined | string } = { duration: undefined };
      const { id } = req.params;
      const { endTime, startTime, hallId, movieId, differenceInMinutes } = req.body;
      const movieDetail = await prisma.movie.findFirst({
        where: {
          id: movieId,
        },
      });
      if (movieDetail) {
        if (differenceInMinutes < movieDetail.duration) {
          messageError.duration = "Độ dài phim lớn hơn thời gian xuất chiếu";
        }
      }
      const checkSamTime = await prisma.showTime.findFirst({
        where: {
          hallId,
          id: {
            not: Number(id),
          },
          OR: [
            {
              startTime: {
                lt: endTime,
              },
              endTime: {
                gt: startTime,
              },
            },
          ],
        },
      });
      if (checkSamTime?.id) {
        messageError.duration = "Phòng chiếu đã có xuất chiếu tại khoảng thời gian này!";
      }
      if (messageError.duration) {
        return res.status(404).json({ message: messageError.duration });
      }
      await updateShowTime(Number(id), startTime, endTime, hallId, movieId);
      return res.status(200).json({ message: "update showtime successfully" });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
export default showtimeController;
