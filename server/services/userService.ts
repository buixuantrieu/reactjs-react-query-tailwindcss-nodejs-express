import prisma from "../lib/prisma";
const getUserInfo = (id: string) => {
  const result = prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      UserRole: {
        include: {
          role: true,
        },
      },
      Profile: true,
    },
  });
  return result;
};
export { getUserInfo };
