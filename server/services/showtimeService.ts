import prisma from "@lib/prisma";

const createShowTime = async (startTime: Date, endTime: Date, hallId: number, movieId: number) => {
  const result = await prisma.showTime.create({
    data: {
      startTime,
      endTime,
      hallId,
      movieId,
    },
  });
  return result;
};
const updateShowTime = async (id: number, startTime: Date, endTime: Date, hallId: number, movieId: number) => {
  const result = await prisma.showTime.update({
    where: {
      id,
    },
    data: {
      startTime,
      endTime,
      hallId,
      movieId,
    },
  });
  return result;
};

const getShowTimeAll = async (
  hallId: number | undefined,
  movieId: number | undefined,
  startTime: Date | undefined,
  endTime: Date | undefined
) => {
  const result = await prisma.showTime.findMany({
    where: {
      hallId,
      movieId,
      ...(startTime && { startTime: { lte: startTime } }),
      ...(endTime && { endTime: { gte: endTime } }),
    },
    orderBy: {
      startTime: "desc",
    },
    include: {
      hall: {
        include: {
          CinemaFacility: true,
        },
      },
      movie: true,
    },
  });
  return result;
};

const getShowTimeDetail = async (id: number) => {
  const result = await prisma.showTime.findFirst({
    where: {
      id,
    },
    include: {
      hall: {
        include: {
          CinemaFacility: true,
        },
      },
    },
  });
  return result;
};

export { createShowTime, getShowTimeAll, getShowTimeDetail, updateShowTime };
