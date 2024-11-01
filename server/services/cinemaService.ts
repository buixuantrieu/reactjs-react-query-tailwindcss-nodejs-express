import prisma from "../lib/prisma";

const createCinema = async (name: string, logo: string) => {
  const result = await prisma.cinema.create({
    data: {
      name,
      logo,
    },
  });
  return result;
};

const getCinema = async () => {
  const result = await prisma.cinema.findMany({
    where: {
      isDelete: false,
    },
  });
  return result;
};

const createFacility = async (
  cinemaId: number,
  name: string,
  location: string,
  provinceId: number,
  districtId: number,
  wardId: number
) => {
  const result = await prisma.cinemaFacility.create({
    data: {
      name,
      cinemaId,
      location,
      provinceId,
      districtId,
      wardId,
    },
  });
  return result;
};
const getFacilityByCinemaId = async (cinemaId: number) => {
  const result = await prisma.cinemaFacility.findMany({
    where: {
      cinemaId,
    },
    include: {
      cinemas: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};
const getFacility = async () => {
  const result = await prisma.cinemaFacility.findMany({
    include: {
      cinemas: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};
const getFacilityDetail = async (id: number) => {
  const result = await prisma.cinemaFacility.findFirst({
    where: {
      id,
    },
    include: {
      seatPrices: {
        include: { seatType: true },
      },
    },
  });
  return result;
};
const getCinemaById = async (id: number) => {
  const result = await prisma.cinema.findFirst({
    where: {
      id,
    },
  });
  return result;
};

const updateCinema = async (id: number, name: string, logo: string) => {
  await prisma.cinema.update({
    where: { id },
    data: {
      name,
      logo,
    },
  });
};
const updateFacility = async (
  id: number,
  cinemaId: number,
  name: string,
  location: string,
  provinceId: number,
  districtId: number,
  wardId: number,
  seatPrices: { typeId: number; price: number }[]
) => {
  await prisma.$transaction(async (prisma) => {
    await prisma.cinemaFacility.update({
      where: { id },
      data: { cinemaId, name, location, provinceId, districtId, wardId },
    });

    const seatPriceUpdates = seatPrices.map((item) =>
      prisma.cinemaSeatPrice.updateMany({
        where: { facilityId: id, seatTypeId: item.typeId },
        data: { price: item.price },
      })
    );

    await Promise.all(seatPriceUpdates);
  });
};

export {
  createCinema,
  getCinema,
  createFacility,
  getFacilityByCinemaId,
  getCinemaById,
  updateCinema,
  getFacility,
  getFacilityDetail,
  updateFacility,
};
