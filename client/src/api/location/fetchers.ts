import { LOCATION_ENDPOINTS } from "@constants/apiEndpoints";
import axios from "axios";

const locationClient = {
  getProvince: () => {
    return axios.get(LOCATION_ENDPOINTS.PROVINCE);
  },
  getDistrict: (provinceId: number) => {
    return axios.get(LOCATION_ENDPOINTS.DISTRICT, {
      params: {
        provinceId,
      },
    });
  },
  getWard: (districtId: number) => {
    return axios.get(LOCATION_ENDPOINTS.WARD, {
      params: {
        districtId,
      },
    });
  },
};
export default locationClient;
