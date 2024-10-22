import { ILoginInput } from "./type";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";

const userClient = {
  login: (variables: ILoginInput) => {
    console.log(API_ENDPOINTS.LOGIN);
  },
};
export default userClient;
