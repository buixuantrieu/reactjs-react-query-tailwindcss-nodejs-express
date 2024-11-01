import { useState } from "react";
import {
  HomeOutlined,
  VideoCameraOutlined,
  CalendarOutlined,
  BankOutlined,
  TagsOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Button, Menu } from "antd";
import { ROUTES } from "@constants/routes";

const items = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: <Link to={ROUTES.ADMIN.DASHBOARD}>Trang chủ</Link>,
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: <Link to={ROUTES.ADMIN.MOVIE}>Phim</Link>,
  },
  {
    key: "3",
    icon: <CalendarOutlined />,
    label: "Lịch chiếu",
  },
  {
    key: "4",
    icon: <BankOutlined />,
    label: "Hệ thống rạp",
    children: [
      {
        key: "4-1",
        label: <Link to={ROUTES.ADMIN.CINEMA}>Danh sách rạp</Link>,
      },
      {
        key: "4-2",
        label: <Link to={ROUTES.ADMIN.FACILITY}>Cơ sở</Link>,
      },
      {
        key: "4-3",
        label: <Link to={ROUTES.ADMIN.HALL_MANAGER}>Phòng chiếu</Link>,
      },
    ],
  },
  {
    key: "5",
    icon: <TagsOutlined />,
    label: "Khuyến mãi",
  },
  {
    key: "6",
    icon: <CustomerServiceOutlined />,
    label: "Hỗ trợ khách hàng",
  },
];

function Navigate() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: 256, backgroundColor: "#001628" }}>
      <Button type="primary" ghost onClick={toggleCollapsed} className="mt-5 ml-4 mb-[100px]">
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu defaultSelectedKeys={["1"]} mode="inline" theme="dark" inlineCollapsed={collapsed} items={items} />
    </div>
  );
}

export default Navigate;
