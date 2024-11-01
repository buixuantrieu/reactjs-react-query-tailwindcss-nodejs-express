import { useState } from "react";
import Card from "antd/es/card/Card";
import { RcFile } from "antd/es/upload";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button, Col, Form, Input, notification, Row, Upload } from "antd";

import { ROUTES } from "@constants/routes";
import { CreateCinema } from "@api/cinema/queries";
import { uploadImageFireBase } from "@utils/fireBase";

function CreateNewCinema() {
  type FormCreateCinema = {
    name: string;
    image: { originFileObj: RcFile }[];
  };

  const navigate = useNavigate();
  const [formCreateCinema] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const { mutate: createCinema } = CreateCinema();

  const handleCreateCinema = async (values: FormCreateCinema) => {
    try {
      setLoading(true);
      const logo = await uploadImageFireBase(values.image[0].originFileObj);
      const newData = { name: values.name, logo };
      createCinema(newData, {
        onSuccess: () => {
          setLoading(false);
          notification.success({ message: "Tạo rạp thành công!" });
          navigate(ROUTES.ADMIN.CINEMA);
        },
        onError: () => {
          setLoading(false);
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-10 pt-[70px]">
      <h1 className="text-center text-[20px] font-semibold mb-4 text-[#8fbdff]">Thêm rạp chiếu phim</h1>
      <Link to={ROUTES.ADMIN.CINEMA}>
        <Button type="primary" ghost className="mb-4">
          Danh sách rạp
        </Button>
      </Link>
      <Form onFinish={handleCreateCinema} form={formCreateCinema} layout="vertical">
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
                <Input allowClear className="bg-transparent" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="image"
                label="Logo:"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
                rules={[
                  {
                    required: true,
                    message: "Không được để trống!",
                  },
                ]}
              >
                <Upload listType="picture" beforeUpload={() => false} maxCount={1}>
                  <Button type="primary" ghost icon={<FaCloudUploadAlt />}>
                    Bấm để tải ảnh lên
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Button loading={isLoading} ghost htmlType="submit" className="w-full mt-4" type="primary">
          Thêm rạp
        </Button>
      </Form>
    </div>
  );
}
export default CreateNewCinema;
