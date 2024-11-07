import { useMutation } from "@tanstack/react-query";
import movieClient from "./fetchers";
import { QueryKeys } from "@api/queryKeys";
import { IUpdateMovie } from "./type";

const CreateMovie = () => {
  return useMutation({
    mutationKey: [QueryKeys.CREATE_MOVIE],
    mutationFn: movieClient.createMovie,
  });
};

const GetGenre = () => {
  return useMutation({
    mutationKey: [QueryKeys.GET_GENRE],
    mutationFn: movieClient.getGenre,
  });
};
const GetMovie = () => {
  return useMutation({
    mutationKey: [QueryKeys.GET_MOVIE],
    mutationFn: movieClient.getMovie,
  });
};
const GetMovieDetail = () => {
  return useMutation({
    mutationKey: [QueryKeys.GET_MOVIE_DETAIL],
    mutationFn: movieClient.getMovieDetail,
  });
};
const UpdateMovie = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_MOVIE],
    mutationFn: ({ id, data }: { id: number; data: IUpdateMovie }) => {
      return movieClient.updateMovie(id, data);
    },
  });
};

export { CreateMovie, GetGenre, GetMovie, GetMovieDetail, UpdateMovie };
