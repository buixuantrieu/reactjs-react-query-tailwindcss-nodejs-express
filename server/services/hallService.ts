import prisma from "../lib/prisma";
const getSeatType = async () => {
  const result = await prisma.seatType.findMany();
  return result;
};

const createSeatPrices = async (id: number, arr: { [key: string]: number }[]) => {
  arr.forEach(async (item) => {
    await prisma.cinemaSeatPrice.create({
      data: {
        seatTypeId: item.typeId,
        price: item.price,
        facilityId: id,
      },
    });
  });
};

const createHall = async (
  name: string,
  facilityId: number,
  columns: number,
  rows: number,
  seats: { row: string; seatNumber: number; typeId: number; status: boolean }[]
) => {
  await prisma.$transaction(async (prisma) => {
    const hall = await prisma.hall.create({
      data: {
        name,
        facilityId,
        rows,
        columns,
      },
    });

    const seatData = seats.map((item) => ({
      hallId: hall.id,
      row: item.row,
      seatNumber: item.seatNumber,
      typeId: item.typeId,
      isAvailable: item.status,
    }));

    await prisma.seat.createMany({
      data: seatData,
    });
  });
};

const checkNameHall = async (name: string, facilityId: number) => {
  const check = await prisma.hall.findFirst({
    where: {
      name,
      facilityId,
    },
  });
  if (check) {
    return false;
  }
  return true;
};

const getHallAll = async (facilityId: number | undefined) => {
  const result = await prisma.hall.findMany({
    where: {
      facilityId: facilityId,
    },
    include: {
      CinemaFacility: {
        include: {
          cinemas: true,
        },
      },
      seats: true,
    },
  });
  return result;
};

export { getSeatType, createSeatPrices, createHall, checkNameHall, getHallAll };
