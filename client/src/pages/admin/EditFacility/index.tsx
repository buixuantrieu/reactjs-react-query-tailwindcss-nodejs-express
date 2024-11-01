/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "antd/es/card/Card";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Input, InputNumber, notification, Row, Select } from "antd";

import { Cinema } from "@type/cinema";
import { ROUTES } from "@constants/routes";
import { GetSeatType } from "@api/hall/queries";
import { District, Province, Ward } from "@type/location";
import { GetCinema, GetFacilityDetail, UpdateFacility } from "@api/cinema/queries";
import { GetDistrict, GetProvince, GetWard } from "@api/location/queries";

function EditFacilityCinema() {
  type FormCreateCinema = {
    name: string;
    address: string;
    province: number;
    district: number;
    ward: number;
    [key: number]: number;
  };
  type SeatType = {
    id: number;
    type: string;
  };

  const { id } = useParams();
  const { mutate: getFacilityDetail } = GetFacilityDetail();

  const [formUpdateCinema] = Form.useForm();
  const navigate = useNavigate();

  const [wardList, setWardList] = useState<Ward[]>([]);
  const [provinceList, setProvinceList] = useState<Province[]>([]);
  const [districtList, setDistrictList] = useState<District[]>([]);
  const [seatTypeList, setSeatTypeList] = useState<SeatType[]>([]);

  const { mutate: getWard } = GetWard();
  const { data: cinemaList } = GetCinema();
  const { mutate: getSeatType } = GetSeatType();
  const { mutate: getDistrict } = GetDistrict();
  const { mutate: getProvince } = GetProvince();
  const { mutate: updateFacility, isPending } = UpdateFacility();

  useEffect(() => {
    getProvince(undefined, {
      onSuccess: (result) => {
        setProvinceList(result.data.data);
      },
    });
  }, [getProvince, getDistrict, getWard]);
  useEffect(() => {
    getSeatType(undefined, {
      onSuccess: (result) => {
        setSeatTypeList(result.data.data);
      },
    });
  }, [getSeatType]);

  useEffect(() => {
    getFacilityDetail(Number(id), {
      onSuccess: (result) => {
        getDistrict(result.data.data.provinceId, {
          onSuccess: (result) => {
            setDistrictList(result.data.data);
          },
        });
        getWard(result.data.data.districtId, {
          onSuccess: (result) => {
            setWardList(result.data.data);
          },
        });
        result.data.data.seatPrices.forEach((item: any) => {
          formUpdateCinema.setFieldsValue({
            [item.seatTypeId]: item.price,
          });
        });

        formUpdateCinema.setFieldsValue({
          name: result.data.data.name,
          address: result.data.data.location.split(",")[0],
          cinemaId: result.data.data.cinemaId,
          province: result.data.data.provinceId,
          district: result.data.data.districtId,
          ward: result.data.data.wardId,
        });
      },
    });
  }, [formUpdateCinema, getDistrict, getFacilityDetail, getWard, id]);

  const handleUpdateFacility = async (values: FormCreateCinema) => {
    try {
      const seatPrices = seatTypeList.map((seatType) => ({
        typeId: seatType.id,
        price: values[seatType.id],
      }));
      const provinceData = provinceList.find((item) => item.province_id === values.province);
      const districtData = districtList.find((item) => item.district_id === values.district);
      const wardData = wardList.find((item) => item.wards_id === values.ward);
      const location = `${values.address}, ${wardData?.name}, ${districtData?.name}, ${provinceData?.name}`;
      const newData = { ...values, location, seatPrices };
      updateFacility(
        { id: Number(id), data: newData },
        {
          onSuccess: () => {
            notification.success({ message: "Thêm cơ sở mới thành công!" });
            navigate(ROUTES.ADMIN.FACILITY);
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

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

  const renderProvince = useMemo(
    () =>
      provinceList.map((item: Province, index) => {
        return (
          <Select.Option key={index} value={item.province_id}>
            {item.name}
          </Select.Option>
        );
      }),
    [provinceList]
  );

  const renderDistrict = useMemo(
    () =>
      districtList.map((item: District, index) => {
        return (
          <Select.Option key={index} value={item.district_id}>
            {item.name}
          </Select.Option>
        );
      }),
    [districtList]
  );

  const renderWard = useMemo(
    () =>
      wardList.map((item: Ward, index) => {
        return (
          <Select.Option key={index} value={item.wards_id}>
            {item.name}
          </Select.Option>
        );
      }),
    [wardList]
  );

  const renderSeatType = useMemo(
    () =>
      seatTypeList.map((item, index: number) => {
        return (
          <Col key={index} span={8}>
            <Form.Item
              initialValue={0}
              label={`${item.type}:`}
              name={item.id}
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <InputNumber className="w-full bg-transparent" />
            </Form.Item>
          </Col>
        );
      }),
    [seatTypeList]
  );

  return (
    <div className="p-10  pt-[70px]">
      <h1 className="text-center text-[20px] font-semibold mb-4 text-[#8fbdff]">Cập nhật cơ sở</h1>
      <Link to={ROUTES.ADMIN.FACILITY}>
        <Button type="primary" ghost className="mb-4">
          Danh sách cơ sở
        </Button>
      </Link>
      <Form onFinish={handleUpdateFacility} form={formUpdateCinema} layout="vertical">
        <Card className="bg-[#0f1d2f] py-2 box-shadow border-none text-[#8fbdff] ">
          <Row gutter={[32, 32]}>
            <Col span={8}>
              <Form.Item
                name="cinemaId"
                label="Cinema:"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
              >
                <Select allowClear className="bg-transparent text-[#8fbdff] ">
                  {renderCinema}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tên cơ sở:"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
              >
                <Input className="bg-transparent" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Số đường:"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
              >
                <Input className="bg-transparent" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tỉnh/Thành phố:"
                name="province"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    getDistrict(value, {
                      onSuccess: (result) => {
                        setDistrictList(result.data.data);
                        formUpdateCinema.setFieldsValue({ district: undefined, ward: undefined });
                      },
                    });
                  }}
                  allowClear
                >
                  {renderProvince}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Quận/Huyện:"
                name="district"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    getWard(value, {
                      onSuccess: (result) => {
                        setWardList(result.data.data);
                        formUpdateCinema.setFieldsValue({ ward: undefined });
                      },
                    });
                  }}
                  disabled={!formUpdateCinema.getFieldValue("province")}
                  allowClear
                >
                  {renderDistrict}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Phường/Xã:"
                name="ward"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
              >
                <Select disabled={!formUpdateCinema.getFieldValue("district")} allowClear>
                  {renderWard}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Card className="bg-[#0f1d2f] box-shadow border-none mb-4" title="Giá từng loại ghế:">
                <Row gutter={[34, 34]}>{renderSeatType}</Row>
              </Card>
            </Col>
          </Row>
        </Card>
        <Button loading={isPending} ghost htmlType="submit" className="w-full mt-4" type="primary">
          Thêm cơ sở
        </Button>
      </Form>
    </div>
  );
}
export default EditFacilityCinema;
