import { SHOWTIME_ENDPOINTS } from "@constants/apiEndpoints";
import httpClient from "@api/httpClient";
import axios from "axios";

const showtimeClient = {
  createShowtime: (variables: unknown) => {
    return httpClient.post(SHOWTIME_ENDPOINTS.SHOWTIME, variables);
  },
  getShowtime: (variables: unknown) => {
    return axios.get(SHOWTIME_ENDPOINTS.SHOWTIME, {
      params: variables,
    });
  },
  getShowtimeDetail: (id: number) => {
    return axios.get(SHOWTIME_ENDPOINTS.SHOWTIME_DETAIL(id));
  },
  updateShowTime: (id: number, data: unknown) => {
    return httpClient.put(SHOWTIME_ENDPOINTS.SHOWTIME_DETAIL(id), data);
  },
};
export default showtimeClient;
