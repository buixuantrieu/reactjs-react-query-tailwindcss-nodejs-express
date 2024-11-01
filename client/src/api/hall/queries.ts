import { useMutation } from "@tanstack/react-query";

import hallClient from "./fetchers";
import { QueryKeys } from "@api/queryKeys";

const GetSeatType = () => {
  return useMutation({
    mutationKey: [QueryKeys.SEAT_TYPE],
    mutationFn: hallClient.getSeatType,
  });
};
const CreateHall = () => {
  return useMutation({
    mutationKey: [QueryKeys.CREATE_HALL],
    mutationFn: hallClient.createHall,
  });
};
const GetHallDetail = () => {
  return useMutation({
    mutationKey: [QueryKeys.GET_HALL_DETAIL],
    mutationFn: hallClient.getHallDetail,
  });
};
const GetHallAll = () => {
  return useMutation({
    mutationKey: [QueryKeys.GET_HALL_ALL],
    mutationFn: hallClient.getHallAll,
  });
};

export { GetSeatType, CreateHall, GetHallDetail, GetHallAll };
