import { CINEMA_ENDPOINTS } from "@constants/apiEndpoints";
import axios from "axios";
import httpClient from "@api/httpClient";

const cinemaClient = {
  createCinema: (variables: unknown) => {
    return httpClient.post(CINEMA_ENDPOINTS.CINEMA, variables);
  },
  getCinema: () => {
    return axios.get(CINEMA_ENDPOINTS.CINEMA);
  },
  getCinemaByMovieId: (movieId: number) => {
    return axios.get(CINEMA_ENDPOINTS.CINEMA, {
      params: {
        movieId,
      },
    });
  },
  getCinemaDetail: (id: number) => {
    return axios.get(CINEMA_ENDPOINTS.CINEMA_DETAIL(id));
  },
  updateCinema: (id: number, data: { name: string; logo: string }) => {
    return httpClient.put(CINEMA_ENDPOINTS.UPDATE_CINEMA(id), data);
  },
  createFacility: (variables: unknown) => {
    return httpClient.post(CINEMA_ENDPOINTS.FACILITY, variables);
  },
  updateFacility: (id: number, data: unknown) => {
    return httpClient.put(CINEMA_ENDPOINTS.UPDATE_FACILITY(id), data);
  },
  getFacilityDetail: (id: number) => {
    return axios.get(CINEMA_ENDPOINTS.FACILITY_DETAIL(id));
  },
  getFacilityByCinemaId: (cinemaId: number | undefined) => {
    return axios.get(CINEMA_ENDPOINTS.FACILITY, {
      params: {
        cinemaId,
      },
    });
  },
  getFacility: () => {
    return axios.get(CINEMA_ENDPOINTS.FACILITY);
  },
};
export default cinemaClient;
