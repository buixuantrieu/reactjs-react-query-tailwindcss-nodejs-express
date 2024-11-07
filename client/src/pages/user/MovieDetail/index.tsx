import { GetMovieDetail } from "@api/movie/queries";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FcStart } from "react-icons/fc";
import { Col, Row } from "antd";
import dayjs from "dayjs";
import { GetCinemaByMovieId } from "@api/cinema/queries";
import "dayjs/locale/vi";

dayjs.locale("vi");

function MovieDetail() {
  type MovieType = {
    posterUrl?: string;
    title?: string;
    duration?: number;
    description?: string;
    releaseDate?: Date;
    Genre?: { name: string };
    subtitles?: string;
    language?: string;
    director?: string;
    cast?: string;
  };
  const { mutate: getMovieDetail } = GetMovieDetail();
  const { mutate: getCinemaByMovieId } = GetCinemaByMovieId();
  const [movieDetail, setMovieDetail] = useState<MovieType>({});
  const [cinemaList, setCinemaList] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getMovieDetail(Number(id), {
      onSuccess: (result) => {
        setMovieDetail(result.data.data);
      },
    });
  }, [getMovieDetail, id]);
  useEffect(() => {
    getCinemaByMovieId(Number(id), {
      onSuccess: (result) => {
        setCinemaList(result.data.data);
      },
    });
  }, [getCinemaByMovieId, id]);
  const renderCinema = useMemo(
    () =>
      cinemaList.map((item: { logo: string }, index: number) => {
        return (
          <img key={index} className="w-[120px] cursor-pointer h-[60px] object-cover rounded" src={item.logo} alt="" />
        );
      }),
    [cinemaList]
  );

  const renderDay = () => {
    const dayList = [];

    for (let i = 0; i < 15; i++) {
      const date = dayjs().add(i, "day");
      const weekday = date.format("dddd");

      const capitalizedWeekday = `T${weekday.slice(1)}`;

      dayList.push({
        day: date.format("DD"),
        weekday: capitalizedWeekday,
        date: date,
      });
    }
    return dayList.map((item, index) => (
      <div
        key={index}
        className="flex flex-shrink-0 flex-col text-center rounded w-[100px] px-1 border snap-start cursor-pointer"
      >
        <p className="p-1">{item.day}</p>
        <p className="p-1">{index === 0 ? "Hôm nay" : item.weekday}</p>
      </div>
    ));
  };

  return (
    <div>
      <div className="bg-[#0f1d2f] my-8 py-8 px-[100px] gap-[32px] flex">
        <Row gutter={[32, 32]}>
          <Col span={6}>
            <div className="relative">
              <img className="rounded" src={movieDetail.posterUrl} alt="" />
              <span className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[48px] border p-1 rounded cursor-pointer hover:bg-[#80808061]">
                <FcStart />
              </span>
            </div>
          </Col>
          <Col span={18}>
            <div className="text-white flex flex-col justify-between h-full">
              <div>
                <h1 className="font-bold text-[24px]">{movieDetail.title}</h1>
                <p className="text-[#ffffffb3] text-[12px]">{movieDetail.duration} phút</p>
              </div>
              <div className="mt-4">
                <p>
                  <span className="font-bold">Đạo diễn: </span>
                  <span className="text-[#ffffffb3]">{movieDetail.director}</span>
                </p>
                <p>
                  <span className="font-bold">Diễn viên chính: </span>
                  <span className="text-[#ffffffb3]">{movieDetail.cast}</span>
                </p>
                <p className="font-bold mt-4">Nội dung</p>
                <p className="text-[#ffffffb3] text-[14px]">{movieDetail.description}</p>
              </div>
              <div className="mt-8 gap-4 flex text-[#ffffffb3]">
                <div>
                  <p className="font-light">Ngày chiếu</p>
                  <p className="mt-3 font-bold">{dayjs(movieDetail.releaseDate).format("DD/MM/YYYY")}</p>
                  <p></p>
                </div>
                <div>
                  <p className="font-light">Thể loại</p>
                  <p className="mt-3 font-bold">{movieDetail.Genre?.name}</p>
                </div>
                <div>
                  <p className="font-light">Ngôn ngữ</p>
                  <p className="mt-3 font-bold">{movieDetail.language}</p>
                </div>
                <div>
                  <p className="font-light">Phụ đề</p>
                  <p className="mt-3 font-bold">{movieDetail.subtitles}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="px-[150px]">
        <div className=" text-white overflow-auto m-auto flex gap-6 hide-scrollbar snap-x snap-mandatory">
          {renderDay()}
        </div>
        <div className="overflow-auto mt-8 flex gap-6">{renderCinema}</div>
      </div>
    </div>
  );
}
export default MovieDetail;
