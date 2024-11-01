/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Row, Col, InputNumber, Button, Card } from "antd";
import { useEffect, useMemo, useState } from "react";
import { TbArmchair2Off, TbArmchair2 } from "react-icons/tb";
import { MdChair } from "react-icons/md";
import { GetSeatType } from "@api/hall/queries";

function CreateHall() {
  type SeatType = {
    id: number;
    type: string;
  };
  type FormCreateRoom = {
    columns: number;
    rows: number;
  };
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);

  const [seatTypeList, setSeatTypeList] = useState<SeatType[]>([]);
  const [seats, setSeats] = useState<Array<{ row: string; seatNumber: number; type: string; status: boolean }>>([]);
  const [typeSeat, setTypeSeat] = useState<string>("");
  const { mutate: getSeatType } = GetSeatType();

  enum TypeSeat {
    NORMAL = "Normal",
    VIP = "Vip",
    SWEET_BOX = "SweetBox",
    NO_SEAT = "NoSeat",
  }

  useEffect(() => {
    setTypeSeat(TypeSeat.NORMAL);
  }, []);
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
          type: item.type,
          label: item.type,
          color:
            item.type === TypeSeat.NORMAL
              ? "green"
              : item.type === TypeSeat.VIP
              ? "#faad14"
              : item.type === TypeSeat.SWEET_BOX
              ? "#c41d7f"
              : "#bfbfbf",
        };
      }),
    [seatTypeList]
  );

  const handleCreateRoom = (values: FormCreateRoom) => {
    setColumns(values.columns);
    setRows(values.rows);
    const initialSeats = Array.from({ length: values.rows }, (_, rowIndex) =>
      Array.from({ length: values.columns }, (_, colIndex) => ({
        row: String.fromCharCode(65 + rowIndex),
        seatNumber: colIndex + 1,
        type: TypeSeat.NORMAL,
        status: true,
        color: "#389e0d",
      }))
    ).flat();
    setSeats(initialSeats);
  };
  const toggleSeatType = (row: string, seatNumber: number) => {
    const updatedSeats = seats.map((seat) => {
      if (typeSeat === TypeSeat.NO_SEAT) {
        return seat.row === row && seat.seatNumber === seatNumber ? { ...seat, status: false } : seat;
      }
      return seat.row === row && seat.seatNumber === seatNumber ? { ...seat, status: true, type: typeSeat } : seat;
    });
    setSeats(updatedSeats);
  };
  const renderSeat = useMemo(
    () =>
      seats.map((seat, index) => (
        <div
          key={index}
          className="flex flex-col items-center cursor-pointer p-1  rounded box-shadow"
          onClick={() => toggleSeatType(seat.row, seat.seatNumber)}
        >
          {seat.status && seat.type === TypeSeat.NORMAL && <TbArmchair2 className="text-[#389e0d] text-[26px]" />}
          {seat.status && seat.type === TypeSeat.VIP && <TbArmchair2 className="text-[#faad14] text-[26px]" />}
          {seat.status && seat.type === TypeSeat.SWEET_BOX && <MdChair className="text-[#c41d7f] text-[26px]" />}
          {!seat.status && <TbArmchair2Off className="text-[#bfbfbf] text-[26px]" />}
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
              ${typeSeat == item.type && `checkmark`}`}
              style={{ border: `2px solid ${item.color}` }}
              onClick={() => setTypeSeat(item.type)}
            ></span>
            {item.label}
          </Col>
        );
      }),
    [seatTypes, typeSeat]
  );

  const handleSubmit = async () => {
    console.log(seats);
    console.log(rows);
    console.log(columns);
  };

  return (
    <div className="p-10 pt-[70px]">
      <div className="p-5 box-shadow rounded-[8px] bg-[#0f1d2f]">
        <h1 className="text-center text-[20px] text-[#8fbdff] font-semibold">Tạo phòng chiếu</h1>
        <Row className="mt-4" gutter={[32, 32]}>
          <Col span={12}>
            <Card className="bg-[#0f1d2f] box-shadow border-none">
              <Form onFinish={handleCreateRoom} layout="vertical">
                <Form.Item label="Số cột:" name="columns" rules={[{ required: true, message: "Không được để trống" }]}>
                  <InputNumber min={1} className="w-full bg-transparent" />
                </Form.Item>
                <Form.Item label="Số hàng:" name="rows" rules={[{ required: true, message: "Không được để trống" }]}>
                  <InputNumber min={1} className="w-full bg-transparent" />
                </Form.Item>
                <Button htmlType="submit" ghost type="primary">
                  Tạo lưới phòng chiếu
                </Button>
              </Form>
            </Card>
          </Col>
          <Col span={12}>
            <Card className="bg-[#0f1d2f] box-shadow border-none text-[#8fbdff] " title="Loại ghế">
              <Row gutter={[24, 24]}>
                {renderSeatType}
                <Col span={12} className="flex  gap-4 items-center">
                  <span
                    className={`relative rounded w-6 h-6 cursor-pointer 
                    ${typeSeat == TypeSeat.NO_SEAT && `checkmark`}`}
                    style={{ border: `2px solid #bfbfbf` }}
                    onClick={() => setTypeSeat(TypeSeat.NO_SEAT)}
                  ></span>
                  {TypeSeat.NO_SEAT}
                </Col>
              </Row>
            </Card>
          </Col>
          {columns !== 0 && rows !== 0 && (
            <Col span={24}>
              <Card className="bg-[#0f1d2f] box-shadow border-none">
                <h2 className="text-center font-semibold">Lưới phòng chiếu</h2>
                <div className="grid gap-3 mt-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                  {renderSeat}
                </div>
                <Button className="mt-4" ghost type="primary" onClick={handleSubmit}>
                  Tạo phòng chiếu
                </Button>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}

export default CreateHall;
