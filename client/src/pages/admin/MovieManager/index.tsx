import { Button, Table } from "antd";
import { Link, generatePath } from "react-router-dom";

import { ROUTES } from "@constants/routes";

import { GetMovie } from "@api/movie/queries";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

function MovieManager() {
  const [movieList, setMovieList] = useState([]);
  const { mutate: getMovie } = GetMovie();

  useEffect(() => {
    getMovie(undefined, {
      onSuccess: (result) => {
        setMovieList(result.data.data);
      },
    });
  }, [getMovie]);

  const handleUpdate = (id: number) => {
    console.log(id);
  };
  const handleDelete = (id: number) => {
    console.log(id);
  };

  const columns = [
    {
      dataIndex: "posterUrl",
      title: "Poster",
      key: "poster",
      render: (item: string) => <img className="w-[100px]" src={item} alt="" />,
    },
    {
      dataIndex: "title",
      title: "Tên phim",
      key: "name",
    },
    {
      dataIndex: "director",
      title: "Đạo diễn",
      key: "director",
    },
    {
      dataIndex: "releaseDate",
      title: "Ngày phát hành",
      key: "releaseDate",
      render: (date: Date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      dataIndex: "id",
      title: "Thao tác",
      key: "control",
      render: (id: number) => (
        <div className="flex gap-4">
          <Link to={generatePath(ROUTES.ADMIN.EDIT_MOVIE, { id })}>
            <Button onClick={() => handleUpdate(id)} type="primary" ghost>
              Chỉnh sửa
            </Button>
          </Link>
          <Button onClick={() => handleDelete(id)} ghost danger>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-10 pt-[70px]">
      <h1 className="text-center text-[20px] font-semibold mb-4 text-[#8fbdff]">Danh sách phim</h1>
      <Link to={ROUTES.ADMIN.CREATE_MOVIE}>
        <Button type="primary" ghost className="mb-4">
          Thêm phim
        </Button>
      </Link>
      <Table columns={columns} dataSource={movieList} rowKey="id" className="box-shadow rounded" />
    </div>
  );
}
export default MovieManager;
