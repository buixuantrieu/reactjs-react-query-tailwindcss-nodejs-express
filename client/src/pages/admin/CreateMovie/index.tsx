import { useEffect, useMemo, useState } from "react";
import Card from "antd/es/card/Card";
import { RcFile } from "antd/es/upload";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button, Col, Form, Input, notification, Row, Upload, InputNumber, DatePicker, Select } from "antd";

import { ROUTES } from "@constants/routes";
import { CreateMovie, GetGenre } from "@api/movie/queries";
import { uploadImageFireBase } from "@utils/fireBase";
import { Genre } from "@type/movie";
import dayjs from "dayjs";
import { convertToEmbedLink } from "@utils/convert";

function AddMovie() {
  type FormCreateMovie = {
    title: string;
    description: string;
    genreId: number;
    duration: number;
    releaseDate: Date;
    rating: number;
    director: string;
    cast: string[];
    language: string;
    poster: { originFileObj: RcFile }[];
  };

  const navigate = useNavigate();
  const [linkTrailer, setLinkTrailer] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [formCreateMovie] = Form.useForm();
  const [isLoading, setLoading] = useState(false);
  const { mutate: createMovie } = CreateMovie();
  const { mutate: getGenre } = GetGenre();

  useEffect(() => {
    getGenre(undefined, {
      onSuccess: (result) => {
        setGenreList(result.data.data);
      },
    });
  }, [getGenre]);

  const handleCreateMovie = async (values: FormCreateMovie) => {
    try {
      setLoading(true);
      const posterUrl = await uploadImageFireBase(values.poster[0].originFileObj);

      const newData = {
        ...values,
        posterUrl,
        releaseDate: dayjs(values.releaseDate).add(1, "day").toISOString(),
        trailerUrl: linkTrailer,
      };

      createMovie(newData, {
        onSuccess: () => {
          setLoading(false);
          notification.success({ message: "Tạo phim thành công!" });
          navigate(ROUTES.ADMIN.MOVIE);
        },
        onError: () => {
          setLoading(false);
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeTrailerUrl = (url: string | undefined) => {
    const trailerUrl = convertToEmbedLink(url);
    setLinkTrailer(trailerUrl);
  };

  const renderGenre = useMemo(
    () =>
      genreList.map((item: Genre) => {
        return (
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        );
      }),
    [genreList]
  );

  return (
    <div className="p-10 pt-[70px]">
      <h1 className="text-center text-[20px] font-semibold mb-4 text-[#8fbdff]">Thêm phim</h1>
      <Link to={ROUTES.ADMIN.MOVIE}>
        <Button type="primary" ghost className="mb-4">
          Danh sách phim
        </Button>
      </Link>
      <Form onFinish={handleCreateMovie} form={formCreateMovie} layout="vertical">
        <Card className="bg-[#0f1d2f] box-shadow border-none text-[#8fbdff]">
          <Row gutter={[32, 32]}>
            <Col span={12}>
              <Form.Item name="title" label="Tên phim:" rules={[{ required: true, message: "Không được để trống!" }]}>
                <Input allowClear className="bg-transparent" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="genreId" label="Thể loại:" rules={[{ required: true, message: "Không được để trống!" }]}>
                <Select allowClear>{renderGenre}</Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả:"
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Input.TextArea rows={3} allowClear className="bg-transparent" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="duration"
                label="Thời lượng (phút):"
                rules={[{ required: true, type: "number", message: "Không được để trống!" }]}
              >
                <InputNumber className="w-full bg-transparent" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="releaseDate"
                label="Ngày phát hành:"
                rules={[{ required: true, message: "Chọn ngày phát hành!" }]}
              >
                <DatePicker className="w-full bg-transparent" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ageRestriction"
                label="Độ tuổi tối thiểu:"
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <InputNumber min={0} max={99} className="w-full bg-transparent" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="director"
                label="Đạo diễn:"
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Input allowClear className="bg-transparent" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cast"
                label="Diễn viên chính:"
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Input allowClear className="bg-transparent" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="language"
                label="Ngôn ngữ:"
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Input allowClear className="bg-transparent" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="subtitles"
                label="Ngôn ngữ phụ đề:"
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Input allowClear className="bg-transparent" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="poster"
                label="Poster:"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Upload listType="picture" beforeUpload={() => false} maxCount={1}>
                  <Button type="primary" ghost icon={<FaCloudUploadAlt />}>
                    Bấm để tải ảnh lên
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={24}></Col>
            <Col span={12}>
              <Form.Item
                name="trailerUrl"
                label="Link trailer:"
                rules={[{ required: true, message: "Không được để trống!" }]}
              >
                <Input onChange={(e) => onChangeTrailerUrl(e.target.value)} allowClear className="bg-transparent" />
              </Form.Item>
            </Col>
            <Col span={12}>
              {linkTrailer && (
                <iframe
                  width="560"
                  height="315"
                  src={linkTrailer}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube Video"
                ></iframe>
              )}
            </Col>
          </Row>
        </Card>
        <Button loading={isLoading} ghost htmlType="submit" className="w-full mt-4" type="primary">
          Thêm phim
        </Button>
      </Form>
    </div>
  );
}

export default AddMovie;
