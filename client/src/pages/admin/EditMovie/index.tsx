import { GetGenre, GetMovieDetail, UpdateMovie } from "@api/movie/queries";
import { ROUTES } from "@constants/routes";
import { Genre } from "@type/movie";
import { convertEmbedToNormalUrl, convertToEmbedLink } from "@utils/convert";
import { deleteImageFireBase, uploadImageFireBase } from "@utils/fireBase";
import { Button, Card, Col, Input, Row, Form, Select, InputNumber, DatePicker, Upload, notification } from "antd";
import { RcFile } from "antd/es/upload";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditMovieManager() {
  type FormUpdateMovie = {
    title: string;
    description: string;
    genreId: number;
    duration: number;
    releaseDate: Date;
    rating: number;
    director: string;
    ageRestriction: number;
    cast: string;
    language: string;
    subtitles: string;
    trailerUrl: string;
    poster: { originFileObj: RcFile }[];
  };
  const navigate = useNavigate();

  const [formUpdateMovie] = Form.useForm();
  const [linkTrailer, setLinkTrailer] = useState("");
  const [linkPoster, setLinkPoster] = useState("");
  const [isDelete, setDelete] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isShowPoster, setShowPoster] = useState(true);
  const [genreList, setGenreList] = useState([]);

  const { mutate: getGenre } = GetGenre();
  const { mutate: getMovieDetail } = GetMovieDetail();
  const { mutate: updateMovie } = UpdateMovie();
  const { id } = useParams();

  useEffect(() => {
    getGenre(undefined, {
      onSuccess: (result) => {
        setGenreList(result.data.data);
      },
    });
  }, [getGenre]);

  useEffect(() => {
    getMovieDetail(Number(id), {
      onSuccess: (result) => {
        setLinkTrailer(result.data.data.trailerUrl);
        const trailerUrl = convertEmbedToNormalUrl(result.data.data.trailerUrl);
        setLinkPoster(result.data.data.posterUrl);
        formUpdateMovie.setFieldsValue({
          title: result.data.data.title,
          genreId: result.data.data.genreId,
          description: result.data.data.description,
          duration: result.data.data.duration,
          releaseDate: dayjs(result.data.data.releaseDate),
          ageRestriction: result.data.data.ageRestriction,
          director: result.data.data.director,
          cast: result.data.data.cast,
          language: result.data.data.language,
          subtitles: result.data.data.subtitles,
          trailerUrl,
        });
      },
    });
  }, [formUpdateMovie, getMovieDetail, id]);

  const onChangeTrailerUrl = (url: string | undefined) => {
    const trailerUrl = convertToEmbedLink(url);
    setLinkTrailer(trailerUrl);
  };
  const handleUploadMovie = async (values: FormUpdateMovie) => {
    try {
      setLoading(true);
      let posterUrl = linkPoster;

      if (values.poster) {
        posterUrl = await uploadImageFireBase(values.poster[0].originFileObj);
      } else {
        setDelete(false);
      }

      updateMovie(
        {
          id: Number(id),
          data: {
            title: values.title,
            description: values.description,
            genreId: values.genreId,
            duration: values.duration,
            releaseDate: dayjs(values.releaseDate).add(1, "day").toISOString(),
            ageRestriction: values.ageRestriction,
            director: values.director,
            cast: values.cast,
            language: values.language,
            subtitles: values.subtitles,
            trailerUrl: linkTrailer,
            posterUrl,
          },
        },
        {
          onSuccess: async () => {
            setLoading(false);
            if (isDelete) {
              await deleteImageFireBase(linkPoster);
            }
            navigate(ROUTES.ADMIN.MOVIE);
            notification.success({ message: "Cập nhật phim thành công!" });
          },
          onError: (e) => {
            console.log(e);
            setLoading(false);
          },
        }
      );
    } catch (error) {
      console.error(error);
      notification.error({ message: "Đã xảy ra lỗi khi cập nhật phim." });
    }
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
      <Form onFinish={handleUploadMovie} form={formUpdateMovie} layout="vertical">
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
            <Col span={8}>
              <Form.Item name="poster" label="Poster:" valuePropName="fileList" getValueFromEvent={(e) => e.fileList}>
                <Upload
                  onChange={() => setShowPoster(false)}
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
            <Col span={4}> {isShowPoster && <img src={linkPoster} alt="" />}</Col>
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
          Cập nhật
        </Button>
      </Form>
    </div>
  );
}
export default EditMovieManager;
