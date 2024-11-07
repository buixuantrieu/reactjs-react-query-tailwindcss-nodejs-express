import { useMutation } from "@tanstack/react-query";
import showtimeClient from "./fetchers";
import { QueryKeys } from "@api/queryKeys";

const CreateShowtime = () => {
  return useMutation({
    mutationKey: [QueryKeys.CREATE_MOVIE],
    mutationFn: showtimeClient.createShowtime,
  });
};

const GetShowtime = () => {
  return useMutation({
    mutationKey: [QueryKeys.GET_SHOWTIME],
    mutationFn: showtimeClient.getShowtime,
  });
};
const GetShowtimeDetail = () => {
  return useMutation({
    mutationKey: [QueryKeys.GET_SHOWTIME_DETAIL],
    mutationFn: showtimeClient.getShowtimeDetail,
  });
};
const UpdateShowTime = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_MOVIE],
    mutationFn: ({ id, data }: { id: number; data: unknown }) => {
      return showtimeClient.updateShowTime(id, data);
    },
  });
};

export { CreateShowtime, GetShowtime, GetShowtimeDetail, UpdateShowTime };
