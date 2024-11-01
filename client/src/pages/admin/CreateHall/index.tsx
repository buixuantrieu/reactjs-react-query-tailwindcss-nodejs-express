/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { MdChair } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import { TbArmchair2Off, TbArmchair2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, InputNumber, Button, Card, Select, Input, notification } from "antd";

import { Cinema } from "@type/cinema";
import { ROUTES } from "@constants/routes";
import { CreateHall, GetSeatType } from "@api/hall/queries";
import { GetCinema, GetFacilityByCinemaId } from "@api/cinema/queries";

function CreateHallManager() {
  type SeatType = {
    id: number;
    type: string;
    color: string;
  };
  type FormCreateHall = {
    rows: number;
    columns: number;
    name: string;
    facilityId: number;
    cinemaId: number;
  };
  enum TypeSeat {
    NORMAL = "Normal",
    VIP = "Vip",
    SWEET_BOX = "SweetBox",
    NO_SEAT = "NoSeat",
  }

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [showScreen, setShowScreen] = useState(true);
  const [typeSeat, setTypeSeat] = useState<number>(4);
  const [facilityList, setFacilityList] = useState([]);
  const [seatTypeList, setSeatTypeList] = useState<SeatType[]>([]);
  const [seats, setSeats] = useState<
    Array<{ row: string; seatNumber: number; typeId: number; status: boolean; color: string | undefined }>
  >([]);

  const { mutate: getSeatType } = GetSeatType();
  const { data: cinemaList } = GetCinema();
  const { mutate: getFacility } = GetFacilityByCinemaId();
  const { mutate: createHall } = CreateHall();

  useEffect(() => {
    getSeatType(undefined, {
      onSuccess: (result) => {
        setSeatTypeList(result.data.data);
      },
    });
  }, [getSeatType]);

  const seatTypes = useMemo(
    () =>
      seatTypeList.map((item) => {
        return {
          typeId: item.id,
          label: item.type,
          color: item.color ?? "gray",
        };
      }),
    [seatTypeList]
  );

  const handleCreateRoom = () => {
    if (rows !== 0 && columns !== 0) {
      setShowScreen(false);
    } else {
      setShowScreen(true);
    }
    const initialSeats = Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: columns }, (_, colIndex) => ({
        row: String.fromCharCode(65 + rowIndex),
        seatNumber: colIndex + 1,
        typeId: typeSeat,
        status: true,
        color: "#389e0d",
      }))
    ).flat();
    setSeats(initialSeats);
  };
  const toggleSeatType = (row: string, seatNumber: number) => {
    const updatedSeats = seats.map((seat) => {
      if (typeSeat === 0) {
        return seat.row === row && seat.seatNumber === seatNumber ? { ...seat, status: false } : seat;
      }
      const newColor = seatTypes.find((type) => type.typeId === typeSeat);
      return seat.row === row && seat.seatNumber === seatNumber
        ? { ...seat, status: true, color: newColor?.color, typeId: typeSeat }
        : seat;
    });
    setSeats(updatedSeats);
  };

  const onChangCinema = (value: number) => {
    form.setFieldsValue({ facilityId: undefined });
    getFacility(value, {
      onSuccess: (result) => {
        setFacilityList(result.data.data);
      },
    });
  };

  const handleSubmit = async (values: FormCreateHall) => {
    const newData = { ...values, seats };
    createHall(newData, {
      onSuccess: () => {
        notification.success({ message: "Tạo phòng chiếu thành công!" });
        navigate(ROUTES.ADMIN.HALL_MANAGER);
      },
      onError: (e: any) => {
        if (e.status === 400) {
          notification.error({ message: "Mã phòng đã tồn tại!" });
          form.setFields([
            {
              name: "name",
              errors: ["Mã phòng đã tồn tại tại cở sở!"],
            },
          ]);
        }
      },
    });
  };

  const renderSeat = useMemo(
    () =>
      seats.map((seat, index) => (
        <div
          key={index}
          className="flex flex-col items-center cursor-pointer p-1  rounded box-shadow"
          onClick={() => toggleSeatType(seat.row, seat.seatNumber)}
        >
          {!seat.status ? (
            <TbArmchair2Off className="text-[#bfbfbf] text-[26px]" />
          ) : seat.typeId === 6 ? (
            <MdChair className="text-[#c41d7f] text-[26px]" />
          ) : (
            <TbArmchair2 className={`text-[${seat.color}] text-[26px]`} />
          )}
          <div className="text-[12px]">
            {seat.row}
            {seat.seatNumber}
          </div>
        </div>
      )),
    [seats, typeSeat]
  );

  const renderSeatType = useMemo(
    () =>
      seatTypes.map((item, index) => {
        return (
          <Col span={12} className="flex  gap-4 items-center" key={index}>
            <span
              className={`relative rounded w-6 h-6 cursor-pointer 
              ${typeSeat == item.typeId && `checkmark`}`}
              style={{ border: `2px solid ${item.color}` }}
              onClick={() => setTypeSeat(item.typeId)}
            ></span>
            {item.label}
          </Col>
        );
      }),
    [seatTypes, typeSeat]
  );

  const renderCinema = useMemo(() => {
    if (!cinemaList?.data.data || !cinemaList || !cinemaList.data) return null;
    return cinemaList.data.data.map((item: Cinema, index: number) => {
      return (
        <Select.Option key={index} value={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [cinemaList]);

  const renderFacility = useMemo(() => {
    return facilityList.map((item: Cinema, index: number) => {
      return (
        <Select.Option key={index} value={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [facilityList]);

  return (
    <div className="p-10 pt-[70px]">
      <div className="p-5 box-shadow rounded-[8px] bg-[#0f1d2f]">
        <h1 className="text-center text-[20px] text-[#8fbdff] font-semibold">Tạo phòng chiếu</h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row className="mt-4" gutter={[32, 32]}>
            <Col span={12}>
              <Form.Item
                label="Rạp (Cinema):"
                name="cinemaId"
                rules={[{ required: true, message: "Không được để trống" }]}
              >
                <Select allowClear onChange={onChangCinema}>
                  {renderCinema}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Cơ sở:" name="facilityId" rules={[{ required: true, message: "Không được để trống" }]}>
                <Select disabled={!form.getFieldValue("cinemaId")}>{renderFacility}</Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mã phòng:" rules={[{ required: true, message: "Không được để trống" }]} name="name">
                <Input allowClear className="bg-transparent" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Card className="bg-[#0f1d2f] box-shadow border-none">
                <Form.Item label="Số cột:" name="columns" rules={[{ required: true, message: "Không được để trống" }]}>
                  <InputNumber
                    onChange={(value) => setColumns(Number(value))}
                    min={1}
                    max={50}
                    className="w-full bg-transparent"
                  />
                </Form.Item>
                <Form.Item label="Số hàng:" name="rows" rules={[{ required: true, message: "Không được để trống" }]}>
                  <InputNumber
                    onChange={(value) => setRows(Number(value))}
                    min={1}
                    max={26}
                    className="w-full bg-transparent"
                  />
                </Form.Item>
                <Button ghost type="primary" onClick={handleCreateRoom}>
                  Tạo lưới phòng chiếu
                </Button>
              </Card>
            </Col>
            <Col span={12}>
              <Card className="bg-[#0f1d2f] box-shadow border-none text-[#8fbdff] " title="Loại ghế">
                <Row gutter={[24, 24]}>
                  {renderSeatType}
                  <Col span={12} className="flex  gap-4 items-center">
                    <span
                      className={`relative rounded w-6 h-6 cursor-pointer 
                    ${typeSeat === 0 && `checkmark`}`}
                      style={{ border: `2px solid #bfbfbf` }}
                      onClick={() => setTypeSeat(0)}
                    ></span>
                    {TypeSeat.NO_SEAT}
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col hidden={showScreen} span={24}>
              <Card className="bg-[#0f1d2f] box-shadow border-none">
                <h2 className="text-center font-semibold">Lưới phòng chiếu</h2>
                <div className="grid gap-3 mt-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                  {renderSeat}
                </div>
                <Button htmlType="submit" className="mt-4" ghost type="primary">
                  Tạo phòng chiếu
                </Button>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default CreateHallManager;
