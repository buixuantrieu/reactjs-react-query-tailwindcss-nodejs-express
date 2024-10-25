import { IoMdStar } from "react-icons/io";

function Header() {
  return (
    <div className="relative">
      <img className="w-full " src="public/assets/images/anh-bia-dashboard.jpeg" alt="" />
      <div className="absolute bottom-0 left-[50px] translate-y-[50%] w-[120px] h-[120px] rounded-[50%] overflow-hidden  border-[2px] bg-black">
        <img
          className="w-full aspect-[1/1] object-cover"
          src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-1/407919981_1802218826873940_3153245800751188815_n.jpg?stp=c0.0.1536.1536a_dst-jpg_s480x480&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=5kEBv_JOyvMQ7kNvgE4fb25&_nc_zt=24&_nc_ht=scontent.fdad1-4.fna&_nc_gid=AtcGatb_7r6E-_eLwnCM42Y&oh=00_AYA62MXsI2vctTZw_MJQEd0pV-dbz9t-qdy9vC3B8CKBKg&oe=671E5731"
          alt=""
        />
      </div>
      <div className="absolute bottom-[12px] left-[180px] flex items-center gap-2">
        <span className="text-[white] font-bold text-[24px]">Bùi Xuân Triều</span>
        <span className="py-[2px] text-[12px] flex gap-1 px-3 bg-[#ffb933] rounded-[12px] font-semibold border">
          <IoMdStar />
          Pro User
        </span>
      </div>
    </div>
  );
}

export default Header;
