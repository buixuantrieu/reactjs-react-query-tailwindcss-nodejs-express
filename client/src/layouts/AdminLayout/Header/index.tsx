import { IoMdStar } from "react-icons/io";
import { GetUserInfo } from "@api/users/queries";
import { useEffect, useMemo } from "react";
import { UserRole } from "types/user";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "@constants/routes";

function Header() {
  const { data: userInfo, isLoading } = GetUserInfo();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (!userInfo) {
        navigate(ROUTES.AUTH);
      } else {
        if (userInfo.data.data.UserRole.some((item: { [key: string]: number }) => item.roleId === 1)) {
          navigate(ROUTES.USER.HOME);
        }
      }
    }
  }, [userInfo, isLoading, navigate]);

  const renderRole = useMemo(() => {
    if (!userInfo || !userInfo.data || !userInfo.data.data.UserRole) return null;
    return userInfo.data.data.UserRole.map((item: UserRole, index: number) => {
      return (
        <span
          key={index}
          className="py-[2px] text-[12px] flex gap-1 px-3 bg-[#ffb933] rounded-[12px] font-semibold border"
        >
          <IoMdStar />
          {item.role.roleName}
        </span>
      );
    });
  }, [userInfo]);

  return (
    <div className="relative">
      <img className="w-full " src="/public/assets/images/anh-bia-dashboard.jpeg" alt="" />
      <div className="absolute bottom-0 left-[50px] translate-y-[50%] w-[120px] h-[120px] rounded-[50%] overflow-hidden  border-[2px] bg-black">
        <img
          className="w-full aspect-[1/1] object-cover"
          src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-1/407919981_1802218826873940_3153245800751188815_n.jpg?stp=c0.0.1536.1536a_dst-jpg_s480x480&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=zWiUAjSm1YAQ7kNvgHg2UqS&_nc_zt=24&_nc_ht=scontent.fdad1-4.fna&_nc_gid=AMbcSJ5k8K0UUtecAPYqxIo&oh=00_AYDURbEu8gKRcDdX5W-MWJfwtmPQfoWJ69Z6YoUi8h1BjQ&oe=6730CC31"
          alt=""
        />
      </div>
      <div className="absolute bottom-[12px] left-[180px] flex items-center gap-2">
        <span className="text-[white] font-bold text-[24px]">{userInfo?.data?.data?.Profile?.fullName}</span>
        {renderRole}
      </div>
    </div>
  );
}

export default Header;
