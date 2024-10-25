import { TbHomeFilled } from "react-icons/tb";
import { SiThemoviedatabase } from "react-icons/si";
import { GiCarSeat } from "react-icons/gi";

function Navigate() {
  return (
    <div className="min-h-[100vh] bg-[#f9f5f1] flex flex-col justify-center px-5 gap-4">
      <div className="flex flex-col gap-3">
        <span className="p-3 cursor-pointer bg-white text-black text-[20px] rounded  hover:text-black hover:bg-white">
          <TbHomeFilled />
        </span>
        <span className="p-3 cursor-pointer text-[#c2c0bc] text-[20px] rounded  hover:text-black hover:bg-white">
          <SiThemoviedatabase />
        </span>
        <span className="p-3 cursor-pointer text-[#c2c0bc] text-[20px] rounded  hover:text-black hover:bg-white">
          <GiCarSeat />
        </span>
      </div>
    </div>
  );
}
export default Navigate;
