// authEndpoints.js
const BASE_URL = "http://localhost:3000/api/v1";
export const AUTH_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  VERIFIED: `${BASE_URL}/auth/verified`,
};

export const LOCATION_ENDPOINTS = {
  PROVINCE: `${BASE_URL}/location/province`,
  DISTRICT: `${BASE_URL}/location/district`,
  WARD: `${BASE_URL}/location/ward`,
};

export const CINEMA_ENDPOINTS = {
  CINEMA: `${BASE_URL}/cinema`,
  HALL: `${BASE_URL}/hall`,
  FACILITY: `${BASE_URL}/cinema/facility`,
  SEAT_HALL: `${BASE_URL}/hall/seat-type`,
  CINEMA_DETAIL: (id: number) => `${BASE_URL}/cinema/${id}`,
  FACILITY_DETAIL: (id: number) => `${BASE_URL}/cinema/facility/${id}`,
  UPDATE_CINEMA: (id: number) => `${BASE_URL}/cinema/${id}`,
  UPDATE_FACILITY: (id: number) => `${BASE_URL}/cinema/facility/${id}`,
};

export const USER_ENDPOINTS = {
  USER_INFO: `${BASE_URL}/user/user-info`,
};
export const MOVIE_ENDPOINTS = {
  MOVIE: `${BASE_URL}/movie`,
  GENRE: `${BASE_URL}/movie/genre`,
  MOVIE_DETAIL: (id: number) => `${BASE_URL}/movie/${id}`,
};
export const SHOWTIME_ENDPOINTS = {
  SHOWTIME: `${BASE_URL}/show-time`,
  SHOWTIME_DETAIL: (id: number) => `${BASE_URL}/show-time/${id}`,
};

