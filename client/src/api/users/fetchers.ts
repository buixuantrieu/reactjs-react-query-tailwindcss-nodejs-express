import httpClient from "@api/httpClient";
import { ILoginInput, IRegisterInput, IVerified } from "./type";
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from "@constants/apiEndpoints";
import axios from "axios";

const userClient = {
  register: (variables: IRegisterInput) => {
    return axios.post(AUTH_ENDPOINTS.REGISTER, variables);
  },
  login: (variables: ILoginInput) => {
    return axios.post(AUTH_ENDPOINTS.LOGIN, variables);
  },
  verified: (variables: IVerified) => {
    return axios.post(AUTH_ENDPOINTS.VERIFIED, variables);
  },
  getUserInfo: () => {
    return httpClient.get(USER_ENDPOINTS.USER_INFO);
  },
};
export default userClient;
