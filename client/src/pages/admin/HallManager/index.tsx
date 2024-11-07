import { Button, Table } from "antd";
import { Link } from "react-router-dom";

import { ROUTES } from "@constants/routes";
import { GetHallAll } from "@api/hall/queries";
import { useEffect, useState } from "react";
import { Facility, Hall, Seat } from "@type/cinema";

function HallManager() {
  const [hallList, setHallList] = useState([]);

  const { mutate: getHallAll } = GetHallAll();

  useEffect(() => {
    getHallAll(undefined, {
      onSuccess: (result) => {
        setHallList(result.data.data);
      },
    });
  }, [getHallAll]);

  const columns = [
    {
      dataIndex: "name",
      title: "Tên rạp",
      key: "name",
    },
    {
      dataIndex: "CinemaFacility",
      title: "Cơ sở",
      key: "facility",
      render: (item: Hall) => item.name,
    },
    {
      dataIndex: "CinemaFacility",
      title: "Cinema",
      key: "cinema",
      render: (item: Facility) => item.cinemas.name,
    },
    {
      dataIndex: "seats",
      title: "Số lượng ghế",
      key: "seats",
      render: (item: Seat[]) => item.filter((seat) => seat.isAvailable !== false).length,
    },
  ];

  return (
    <div className="p-10 pt-[70px]">
      <h1 className="text-center text-[20px] font-semibold mb-4 text-[#8fbdff]">Danh sách phòng chiếu</h1>
      <Link to={ROUTES.ADMIN.CREATE_HALL}>
        <Button type="primary" ghost className="mb-4">
          Thêm phòng chiếu
        </Button>
      </Link>
      <Table columns={columns} dataSource={hallList} rowKey="id" className="box-shadow rounded" />
    </div>
  );
}
export default HallManager;
