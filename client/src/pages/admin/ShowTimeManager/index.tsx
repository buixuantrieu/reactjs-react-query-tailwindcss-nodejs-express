import { ROUTES } from "@constants/routes";
import { Button, Table } from "antd";
import { Link, generatePath } from "react-router-dom";

import { GetShowtime } from "@api/showtime/queries";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
function ShowTimeManager() {
  const { mutate: getShowTime } = GetShowtime();
  const [showTimeList, setShowTime] = useState([]);

  useEffect(() => {
    getShowTime(undefined, {
      onSuccess: (result) => {
        setShowTime(result.data.data);
      },
    });
  }, [getShowTime]);

  const columns = [
    {
      dataIndex: "startTime",
      title: "Ngày",
      key: "startTime",
      render: (item: Date) => dayjs(item).format("YYYY-MM-DD"),
    },
    {
      dataIndex: "startTime",
      title: "Giờ bắt đầu",
      key: "startTime",
      render: (item: Date) => dayjs.utc(item).format("HH:mm"),
    },
    {
      dataIndex: "endTime",
      title: "Giờ kết thúc",
      key: "endTime",
      render: (item: Date) => dayjs.utc(item).format("HH:mm"),
    },
    {
      dataIndex: "movie",
      title: "Tên phim",
      key: "movie",
      render: (item: { title: string }) => item.title,
    },
    {
      dataIndex: "hall",
      title: "Phòng chiếu",
      key: "hall",
      render: (item: { name: string }) => item.name,
    },
    {
      dataIndex: "hall",
      title: "Cơ sở",
      key: "hall",
      render: (item: { CinemaFacility: { name: string } }) => item.CinemaFacility.name,
    },
    {
      dataIndex: "id",
      title: "Thao tác",
      key: "id",
      render: (id: number) => (
        <Link to={generatePath(ROUTES.ADMIN.EDIT_SHOWTIME, { id })}>
          <Button type="primary" ghost>
            Chỉnh sửa
          </Button>
        </Link>
      ),
    },
  ];
  return (
    <div className="p-10 pt-[70px]">
      <h1 className="text-center text-[20px] font-semibold mb-4 text-[#8fbdff]">Xuất chiếu phim</h1>
      <Link to={ROUTES.ADMIN.CREATE_SHOWTIME}>
        <Button type="primary" ghost className="mb-4">
          Thêm xuất chiếu
        </Button>
      </Link>
      <Table columns={columns} dataSource={showTimeList} rowKey="id" className="box-shadow rounded" />
    </div>
  );
}
export default ShowTimeManager;
