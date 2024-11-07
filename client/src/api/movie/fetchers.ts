import { MOVIE_ENDPOINTS } from "@constants/apiEndpoints";
import httpClient from "@api/httpClient";
import axios from "axios";
import { IUpdateMovie } from "./type";

const movieClient = {
  createMovie: (variables: unknown) => {
    return httpClient.post(MOVIE_ENDPOINTS.MOVIE, variables);
  },
  getMovie: () => {
    return axios.get(MOVIE_ENDPOINTS.MOVIE);
  },
  getMovieDetail: (id: number) => {
    return axios.get(MOVIE_ENDPOINTS.MOVIE_DETAIL(id));
  },
  updateMovie: (id: number, data: IUpdateMovie) => {
    return httpClient.put(MOVIE_ENDPOINTS.MOVIE_DETAIL(id), data);
  },
  getGenre: () => {
    return axios.get(MOVIE_ENDPOINTS.GENRE);
  },
};
export default movieClient;
