import { ROUTES } from "@constants/routes";
import { Movie } from "@type/movie";
import { Link, generatePath } from "react-router-dom";

function MovieItem({ title, director, cast, duration, posterUrl, id }: Movie) {
  return (
    <div className="p-4 rounded bg-[#0f1d2f] ">
      <Link to={generatePath(ROUTES.USER.MOVIE_DETAIL, { id })}>
        <img src={posterUrl} className="aspect-[3/4] object-cover w-full" alt="" />
        <div className="mt-4 text-white">
          <span className="font-bold ">Tên phim: </span>
          <span className="text-[#69b1ff]">{title}</span>
        </div>
        <div className="mt-1 text-white">
          <span className="font-bold ">Đạo diễn: </span>
          <span className="text-[#69b1ff]">{director}</span>
        </div>
        <div className="mt-1 text-white whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="font-bold ">Diễn viên chính: </span>
          <span className="text-[#69b1ff]">{cast}</span>
        </div>
        <div className="mt-1 text-white">
          <span className="font-bold ">Độ dài: </span>
          <span className="text-[#69b1ff]">{duration} phút</span>
        </div>
      </Link>
    </div>
  );
}
export default MovieItem;
