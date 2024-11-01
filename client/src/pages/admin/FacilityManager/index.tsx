import { Button, Select, Table } from "antd";
import { generatePath, Link } from "react-router-dom";

import { ROUTES } from "@constants/routes";
import { GetCinema, GetFacilityByCinemaId } from "@api/cinema/queries";
import { useEffect, useMemo, useState } from "react";
import { Cinema, Facility } from "@type/cinema";

function FacilityManager() {
  const [facilityList, setFacilityList] = useState([]);

  const { data: cinemaList } = GetCinema();
  const { mutate: getFacilityByCinemaId } = GetFacilityByCinemaId();

  useEffect(() => {
    getFacilityByCinemaId(undefined, {
      onSuccess: (result) => {
        setFacilityList(result.data.data);
      },
    });
  }, [getFacilityByCinemaId]);

  const columns = [
    {
      dataIndex: "name",
      title: "Tên cơ sở",
      key: "name",
    },
    {
      dataIndex: "location",
      title: "Địa chỉ",
      key: "location",
    },
    {
      dataIndex: "cinema",
      title: "Cinema",
      key: "cinema",
      render: (_: unknown, item: Facility) => <div>{item.cinemas.name}</div>,
    },
    {
      dataIndex: "id",
      title: "Thao tác",
      key: "control",
      render: (id: number) => (
        <div>
          <Link to={generatePath(ROUTES.ADMIN.EDIT_FACILITY, { id })}>
            <Button ghost type="primary">
              Cập nhật
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const handleGetFacilityByCinemaId = (cinemaId: number | undefined) => {
    getFacilityByCinemaId(cinemaId, {
      onSuccess: (result) => {
        setFacilityList(result.data.data);
      },
    });
  };

  const renderCinemaList = useMemo(
    () =>
      cinemaList?.data.data.map((item: Cinema, index: number) => {
        return (
          <Select.Option key={index} value={item.id}>
            {item.name}
          </Select.Option>
        );
      }),
    [cinemaList]
  );

  return (
    <div className="p-10 pt-[70px]">
      <h1 className="text-center text-[20px] font-semibold mb-4 text-[#8fbdff]">Danh sách các cơ sở</h1>
      <Link to={ROUTES.ADMIN.CREATE_FACILITY}>
        <Button type="primary" ghost className="mb-4">
          Thêm cơ sở
        </Button>
      </Link>
      <Select onChange={handleGetFacilityByCinemaId} allowClear className="w-[200px] ml-4">
        {renderCinemaList}
      </Select>
      <Table columns={columns} dataSource={facilityList} rowKey="id" className="box-shadow rounded" />
    </div>
  );
}
export default FacilityManager;
