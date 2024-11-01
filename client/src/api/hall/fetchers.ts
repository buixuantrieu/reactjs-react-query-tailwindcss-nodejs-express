import { CINEMA_ENDPOINTS } from "@constants/apiEndpoints";
import axios from "axios";
import httpClient from "@api/httpClient";

const hallClient = {
  getSeatType: () => {
    return axios.get(CINEMA_ENDPOINTS.SEAT_HALL);
  },
  createHall: (variables: unknown) => {
    return httpClient.post(CINEMA_ENDPOINTS.HALL, variables);
  },
  getHallDetail: (id: number) => {
    return axios.get(`${CINEMA_ENDPOINTS.HALL}/${id}`);
  },
  getHallAll: () => {
    return axios.get(CINEMA_ENDPOINTS.HALL);
  },
};
export default hallClient;
