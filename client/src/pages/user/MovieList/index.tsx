import MovieItem from "@components/MovieItem";
import { Col, Row } from "antd";
import { GetMovie } from "@api/movie/queries";
import { useEffect, useMemo, useState } from "react";
import { Movie } from "@type/movie";

function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const { mutate: getMovie } = GetMovie();

  useEffect(() => {
    getMovie(undefined, {
      onSuccess: (result) => {
        setMovieList(result.data.data);
      },
    });
  }, [getMovie]);

  const renderMovie = useMemo(
    () =>
      movieList.map((item: Movie) => {
        return (
          <Col key={item.id} span={6}>
            <MovieItem {...item} />
          </Col>
        );
      }),
    [movieList]
  );

  return (
    <div className="p-8">
      <Row gutter={[32, 32]}>{renderMovie}</Row>
    </div>
  );
}
export default MovieList;
