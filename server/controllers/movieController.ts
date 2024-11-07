import { createMovie, getGenre, getMovie, getMovieDetail, updateMovie } from "@services/movieService";
import { Request, Response } from "express";
class movieController {
  static async createMovie(req: Request, res: Response) {
    try {
      const {
        title,
        genreId,
        description,
        duration,
        releaseDate,
        ageRestriction,
        cast,
        director,
        language,
        subtitles,
        posterUrl,
        trailerUrl,
      } = req.body;
      await createMovie(
        title,
        genreId,
        description,
        duration,
        releaseDate,
        ageRestriction,
        cast,
        director,
        language,
        subtitles,
        posterUrl,
        trailerUrl
      );
      return res.status(201).json({ message: "Create movie successfully" });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getMovie(req: Request, res: Response) {
    try {
      const result = await getMovie("");
      return res.status(200).json({ message: "get genre successfully", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getGenre(req: Request, res: Response) {
    try {
      const result = await getGenre();
      return res.status(200).json({ message: "get genre successfully", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getMovieDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await getMovieDetail(Number(id));
      return res.status(200).json({ message: "get movie detail successfully", data: result });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async updateMovie(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        title,
        genreId,
        description,
        duration,
        releaseDate,
        ageRestriction,
        cast,
        director,
        language,
        subtitles,
        posterUrl,
        trailerUrl,
      } = req.body;
      await updateMovie(
        Number(id),
        title,
        genreId,
        description,
        duration,
        releaseDate,
        ageRestriction,
        cast,
        director,
        language,
        subtitles,
        posterUrl,
        trailerUrl
      );
      return res.status(200).json({ message: "update movie successfully" });
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
export default movieController;
