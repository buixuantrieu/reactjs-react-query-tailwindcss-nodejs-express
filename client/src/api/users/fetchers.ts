import { ILoginInput, IRegisterInput } from "./type";
import { API_ENDPOINTS } from "@constants/apiEndpoints";
import axios from "axios";

const userClient = {
  register: (variables: IRegisterInput) => {
    return axios.post(API_ENDPOINTS.REGISTER, variables);
  },
  login: (variables: ILoginInput) => {
    return axios.post(API_ENDPOINTS.LOGIN, variables);
  },
};
export default userClient;
