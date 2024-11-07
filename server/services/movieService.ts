import prisma from "../lib/prisma";

const getGenre = () => {
  const result = prisma.genre.findMany();
  return result;
};
const createMovie = async (
  title: string,
  genreId: number,
  description: string,
  duration: number,
  releaseDate: Date,
  ageRestriction: number,
  cast: string,
  director: string,
  language: string,
  subtitles: string,
  posterUrl: string,
  trailerUrl: string
) => {
  const result = await prisma.movie.create({
    data: {
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
    },
  });
  return result;
};
const getMovie = async (search: string) => {
  const result = await prisma.movie.findMany({
    where: {
      title: {
        contains: search,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};
const getMovieDetail = async (id: number) => {
  const result = await prisma.movie.findFirst({
    where: {
      id,
    },
    include: {
      Genre: true,
    },
  });
  return result;
};
const updateMovie = async (
  id: number,
  title: string,
  genreId: number,
  description: string,
  duration: number,
  releaseDate: Date,
  ageRestriction: number,
  cast: string,
  director: string,
  language: string,
  subtitles: string,
  posterUrl: string,
  trailerUrl: string
) => {
  const result = await prisma.movie.update({
    where: {
      id,
    },
    data: {
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
    },
  });
  return result;
};

export { getGenre, createMovie, getMovie, getMovieDetail, updateMovie };
