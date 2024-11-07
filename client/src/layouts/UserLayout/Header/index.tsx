/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { NAVIGATE_ITEM } from "@layouts/UserLayout/constants";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  const renderNavigate = useMemo(
    () =>
      NAVIGATE_ITEM.map((item: { label: string; path: string }, index: number) => {
        return (
          <Link className={`${pathname === item.path && "text-[#69b1ff]"} text-[17px]`} to={item.path} key={index}>
            {item.label}
          </Link>
        );
      }),
    [NAVIGATE_ITEM, pathname]
  );
  return (
    <div className="bg-[#0f1d2f] text-white p-4 shadow flex justify-between items-center">
      <img className="w-[170px]" src="/public/assets/images/logo-venom.png" alt="" />
      <div className="flex gap-8 font-medium">{renderNavigate}</div>
      <div>User</div>
    </div>
  );
}
export default Header;
