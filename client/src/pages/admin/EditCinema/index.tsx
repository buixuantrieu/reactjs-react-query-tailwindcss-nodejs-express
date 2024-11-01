/* eslint-disable @typescript-eslint/no-explicit-any */

import Card from "antd/es/card/Card";
import { RcFile } from "antd/es/upload";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Form, Input, notification, Row, Upload } from "antd";

import { ROUTES } from "@constants/routes";
import { GetCinemaDetail, UpdateCinema } from "@api/cinema/queries";
import { deleteImageFireBase, uploadImageFireBase } from "@utils/fireBase";

function EditCinema() {
  type FormCreateCinema = {
    name: string;
    image: { originFileObj: RcFile }[];
  };

  const navigate = useNavigate();
  const { id } = useParams();

  const [formCreateCinema] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [isDelete, setDelete] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const { mutate: getCinemaDetail } = GetCinemaDetail();
  const { mutate: updateCinema } = UpdateCinema();

  useEffect(() => {
    getCinemaDetail(Number(id), {
      onSuccess: (result) => {
        setImageUrl(result.data.data.logo);
        setOldImage(result.data.data.logo);
        formCreateCinema.setFieldsValue({
          name: result.data.data.name,
        });
      },
    });
  }, [getCinemaDetail, id, formCreateCinema]);

  const handleUploadImage = async (info: any) => {
    try {
      if (info.fileList.length > 0) {
        const file = info.fileList[0].originFileObj;
        const objectUrl = URL.createObjectURL(file);
        setImageUrl(objectUrl);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpdate = async (values: FormCreateCinema) => {
    try {
      setLoading(true);
      const newData: { name: string; logo?: string } = { name: values.name, logo: undefined };
      if (values.image) {
        const logo = await uploadImageFireBase(values.image[0].originFileObj);
        newData.logo = logo;
      } else {
        setDelete(false);
        newData.logo = oldImage;
      }
      await updateCinema(
        { id: Number(id), data: { name: newData.name, logo: newData.logo } },
        {
          onSuccess: async () => {
            if (isDelete) {
              await deleteImageFireBase(oldImage);
            }
            notification.success({ message: "Cập nhật thành công!" });
            navigate(ROUTES.ADMIN.CINEMA);
          },
          onError: (e) => {
            console.log(e);
          },
        }
      );
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-10 pt-[70px] rounded-[8px] ">
      <h1 className="text-center text-[20px] font-semibold mb-4 text-[#8fbdff]">Cập nhật rạp chiếu phim</h1>
      <Link to={ROUTES.ADMIN.CINEMA}>
        <Button type="primary" ghost className="mb-4">
          Danh sách rạp
        </Button>
      </Link>
      <Form onFinish={handleUpdate} form={formCreateCinema} layout="vertical">
        <Card className="bg-[#0f1d2f] box-shadow border-none text-[#8fbdff] ">
          <Row gutter={[32, 32]}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên rạp:"
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

            <Col span={12}>
              <Form.Item label="Logo:">
                <div className="w-max relative">
                  <img className="w-[150px]" src={imageUrl} alt="" />
                  <label
                    htmlFor="logo"
                    className="absolute bg-[#0f1d2f] right-1 top-1 p-1 rounded border cursor-pointer"
                  >
                    <FaRegEdit />
                  </label>
                </div>
              </Form.Item>
              <Form.Item
                name="image"
                label="Logo:"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
                hidden
              >
                <Upload
                  id="logo"
                  onChange={handleUploadImage}
                  listType="picture"
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  <Button type="primary" ghost icon={<FaCloudUploadAlt />}>
                    Bấm để tải ảnh lên
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Button ghost loading={isLoading} htmlType="submit" className="w-full mt-4" type="primary">
          Cập nhật
        </Button>
      </Form>
    </div>
  );
}
export default EditCinema;
