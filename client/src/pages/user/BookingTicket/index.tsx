/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetHallDetail } from "@api/hall/queries";
import { useEffect, useMemo, useState } from "react";
import { MdChair } from "react-icons/md";
import { TbArmchair2, TbArmchair2Off } from "react-icons/tb";

function BookingTicket() {
  const { mutate: getHallDetail } = GetHallDetail();

  const [hallDetail, setHallDetail] = useState<{ [key: string]: number | any }>();
  useEffect(() => {
    getHallDetail(4, {
      onSuccess: (result) => {
        setHallDetail(result.data);
      },
    });
  }, []);
  console.log(hallDetail?.seats);
  const renderSeat = useMemo(
    () =>
      hallDetail?.seats.map((item, index) => {
        return (
          <div key={index} className="flex flex-col items-center cursor-pointer p-1  rounded box-shadow">
            {!item.status ? (
              <TbArmchair2Off className="text-[#bfbfbf] text-[26px]" />
            ) : item.typeId === 6 ? (
              <MdChair className="text-[#c41d7f] text-[26px]" />
            ) : (
              <TbArmchair2 className={`text-[${item.type.color}] text-[26px]`} />
            )}
            <div className="text-[12px] text-white">
              {item.row}
              {item.seatNumber}
            </div>
          </div>
        );
      }),
    [hallDetail]
  );
  return (
    <div className="p-10">
      <div className="grid gap-3 mt-4" style={{ gridTemplateColumns: `repeat(${hallDetail?.columns}, 1fr)` }}>
        {renderSeat}
      </div>
    </div>
  );
}
export default BookingTicket;
