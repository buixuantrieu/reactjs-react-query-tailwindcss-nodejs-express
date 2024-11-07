/* eslint-disable @typescript-eslint/no-explicit-any */
import { ROUTES } from "@constants/routes";
import { Button, Form, Card, Row, Col, DatePicker, Select, notification } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { GetCinema, GetFacilityByCinemaId } from "@api/cinema/queries";
import { GetHallAll } from "@api/hall/queries";
import { GetMovie } from "@api/movie/queries";
import { useEffect, useMemo, useState } from "react";
import { Cinema, Facility, Hall } from "@type/cinema";
import { Movie } from "@type/movie";
import { CreateShowtime } from "@api/showtime/queries";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function CreateShowTimeManager() {
  const { RangePicker } = DatePicker;
  const [formCreateShowTime] = Form.useForm();
  const navigate = useNavigate();

  const { mutate: getMovie } = GetMovie();
  const { mutate: getFacilityByCinemaId } = GetFacilityByCinemaId();
  const { mutate: getHall } = GetHallAll();
  const { mutate: createShowTime } = CreateShowtime();

  const { data: cinemaList } = GetCinema();

  const [movieList, setMovieList] = useState([]);
  const [facilityList, setFacilityList] = useState([]);
  const [hallList, setHallList] = useState([]);

  const disablePastDates = (current: Dayjs | null): boolean => {
    return current ? current.isBefore(dayjs().startOf("day")) : false;
  };

  useEffect(() => {
    getMovie(undefined, {
      onSuccess: (result) => {
        setMovieList(result.data.data);
      },
    });
  }, [getMovie]);
  const disablePastTime = (date: Dayjs | null) => {
    if (!date) return {};
    if (date.isSame(dayjs(), "day")) {
      return {
        disabledHours: () => Array.from({ length: 24 }, (_, i) => i).filter((hour) => hour < dayjs().hour()),
        disabledMinutes: (selectedHour: number) => {
          if (selectedHour === dayjs().hour()) {
            return Array.from({ length: 60 }, (_, i) => i).filter((minute) => minute < dayjs().minute());
          }
          return [];
        },
      };
    }
    return {};
  };

  const handleCreateShowTime = (value: { showtime: Date[]; hallId: number; movieId: number }) => {
    const startTimeFormat = dayjs(value.showtime[0]).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm");
    const endTimeFormat = dayjs(value.showtime[1]).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm");
    const startTime = dayjs.utc(startTimeFormat).tz("Asia/Ho_Chi_Minh").toISOString();
    const endTime = dayjs.utc(endTimeFormat).tz("Asia/Ho_Chi_Minh").toISOString();

    const differenceInMinutes = dayjs(endTime).diff(dayjs(startTime), "minute");
    createShowTime(
      {
        startTime,
        endTime,
        hallId: value.hallId,
        movieId: value.movieId,
        differenceInMinutes,
      },
      {
        onSuccess: () => {
          notification.success({ message: "Tạo xuất chiếu thành công!" });
          navigate(ROUTES.ADMIN.SHOWTIME);
        },
        onError: (e: any) => {
          formCreateShowTime.setFields([
            {
              name: "showtime",
              errors: [e.response.data.message],
            },
          ]);
        },
      }
    );
  };

  const renderCinema = useMemo(
    () =>
      cinemaList?.data.data.map((item: Cinema) => {
        return (
          <Select.Option value={item.id} key={item.id}>
            {item.name}
          </Select.Option>
        );
      }),
    [cinemaList]
  );
  const renderMovie = useMemo(
    () =>
      movieList.map((item: Movie) => {
        return (
          <Select.Option value={item.id} key={item.id} label={item.title}>
            <div className="flex gap-4">
              <img src={item.posterUrl} className="w-[50px]" alt="" />
              {item.title}
            </div>
          </Select.Option>
        );
      }),
    [movieList]
  );
  const renderFacility = useMemo(
    () =>
      facilityList.map((item: Facility) => {
        return (
          <Select.Option value={item.id} key={item.id}>
            {item.name}
          </Select.Option>
        );
      }),
    [facilityList]
  );
  const renderHall = useMemo(
    () =>
      hallList.map((item: Hall) => {
        return (
          <Select.Option value={item.id} key={item.id}>
            {item.name}
          </Select.Option>
        );
      }),
    [hallList]
  );

  return (
    <div className="p-10 pt-[70px]">
      <h1 className="text-center text-[20px] font-semibold mb-4 text-[#8fbdff]">Thêm rạp chiếu phim</h1>
      <Link to={ROUTES.ADMIN.SHOWTIME}>
        <Button type="primary" ghost className="mb-4">
          Danh sách xuất chiếu
        </Button>
      </Link>
      <Form form={formCreateShowTime} onFinish={handleCreateShowTime} layout="vertical">
        <Card className="bg-[#0f1d2f] box-shadow border-none text-[#8fbdff]">
          <Row gutter={[32, 32]}>
            <Col span={12}>
              <Form.Item name="movieId" label="Tên phim:" rules={[{ required: true, message: "Không được để trống!" }]}>
                <Select optionLabelProp="label">{renderMovie}</Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="cinemaId" label="Cinema:" rules={[{ required: true, message: "Không được để trống!" }]}>
                <Select
                  allowClear
                  onChange={(id) => {
                    formCreateShowTime.setFieldsValue({ facilityId: undefined });
                    getFacilityByCinemaId(id, {
                      onSuccess: (result) => {
                        setFacilityList(result.data.data);
                      },
                    });
                  }}
                >
                  {renderCinema}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Cơ sở:" name="facilityId" rules={[{ required: true, message: "Không được để trống!" }]}>
                <Select
                  allowClear
                  onChange={(id: number) => {
                    formCreateShowTime.setFieldsValue({ hallId: undefined });
                    getHall(id, {
                      onSuccess: (result) => {
                        setHallList(result.data.data);
                      },
                    });
                  }}
                  disabled={!formCreateShowTime.getFieldValue("cinemaId")}
                >
                  {renderFacility}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hallId"
                label="Phòng chiếu:"
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Select disabled={!formCreateShowTime.getFieldValue("facilityId")}>{renderHall}</Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="showtime"
                label="Thời gian chiếu :"
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <RangePicker
                  disabledDate={disablePastDates}
                  disabledTime={disablePastTime}
                  showTime
                  className="bg-transparent"
                  placeholder={["Bắt đầu", "Kết thúc"]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Button ghost htmlType="submit" className="w-full mt-4" type="primary">
          Thêm xuất chiếu
        </Button>
      </Form>
    </div>
  );
}
export default CreateShowTimeManager;
