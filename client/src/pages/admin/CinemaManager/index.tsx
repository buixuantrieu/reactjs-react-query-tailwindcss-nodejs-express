import { Button, Table } from "antd";
import { generatePath, Link } from "react-router-dom";

import { ROUTES } from "@constants/routes";
import { GetCinema } from "@api/cinema/queries";

function CinemaManager() {
  const { data: cinemaList } = GetCinema();

  const columns = [
    {
      dataIndex: "name",
      title: "Tên rạp",
      key: "name",
    },
    {
      dataIndex: "logo",
      title: "Logo",
      key: "logo",
      render: (item: string) => <img src={item} className="w-[100px]  object-cover rounded box-shadow" alt="" />,
    },
    {
      dataIndex: "id",
      title: "Thao tác",
      key: "control",
      render: (id: number) => (
        <div>
          <Link to={generatePath(ROUTES.ADMIN.EDIT_CINEMA, { id })}>
            <Button ghost type="primary">
              Cập nhật
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="p-10 pt-[70px]">
      <h1 className="text-center text-[20px] font-semibold mb-4 text-[#8fbdff]">Danh sách rạp chiếu phim</h1>
      <Link to={ROUTES.ADMIN.CREATE_CINEMA}>
        <Button type="primary" ghost className="mb-4">
          Thêm rạp
        </Button>
      </Link>
      <Table columns={columns} dataSource={cinemaList?.data.data} rowKey="id" className="box-shadow rounded" />
    </div>
  );
}
export default CinemaManager;
