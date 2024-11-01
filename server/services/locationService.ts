import prisma from "../lib/prisma";

const getProvince = () => {
  const result = prisma.province.findMany();
  return result;
};
const getDistrict = (provinceId: number) => {
  const result = prisma.district.findMany({
    where: {
      province_id: provinceId,
    },
  });
  return result;
};
const getWard = (districtId: number) => {
  const result = prisma.ward.findMany({
    where: {
      district_id: districtId,
    },
  });
  return result;
};
export { getProvince, getDistrict, getWard };
