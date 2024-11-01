import { useMutation } from "@tanstack/react-query";

import locationClient from "./fetchers";
import { QueryKeys } from "@api/queryKeys";

const GetProvince = () => {
  return useMutation({
    mutationKey: [QueryKeys.PROVINCE],
    mutationFn: locationClient.getProvince,
  });
};
const GetDistrict = () => {
  return useMutation({
    mutationKey: [QueryKeys.DISTRICT],
    mutationFn: locationClient.getDistrict,
  });
};
const GetWard = () => {
  return useMutation({
    mutationKey: [QueryKeys.WARD],
    mutationFn: locationClient.getWard,
  });
};

export { GetProvince, GetDistrict, GetWard };
