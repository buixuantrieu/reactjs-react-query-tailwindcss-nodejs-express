import { useMutation, useQuery } from "@tanstack/react-query";

import cinemaClient from "./fetchers";
import { QueryKeys } from "@api/queryKeys";

const CreateCinema = () => {
  return useMutation({
    mutationKey: [QueryKeys.CREATE_CINEMA],
    mutationFn: cinemaClient.createCinema,
  });
};

const GetCinema = () => {
  return useQuery({ queryKey: [QueryKeys.GET_CINEMA], queryFn: cinemaClient.getCinema });
};

const CreateFacility = () => {
  return useMutation({
    mutationKey: [QueryKeys.CREATE_FACILITY],
    mutationFn: cinemaClient.createFacility,
  });
};
const GetFacilityByCinemaId = () => {
  return useMutation({
    mutationKey: [QueryKeys.GET_FACILITY_BY_CINEMA_ID],
    mutationFn: cinemaClient.getFacilityByCinemaId,
  });
};
const GetCinemaByMovieId = () => {
  return useMutation({
    mutationKey: [QueryKeys.GET_CINEMA_BY_MOVIE_ID],
    mutationFn: cinemaClient.getCinemaByMovieId,
  });
};

const GetCinemaDetail = () => {
  return useMutation({
    mutationKey: [QueryKeys.GET_CINEMA_DETAIL],
    mutationFn: cinemaClient.getCinemaDetail,
  });
};
const GetFacilityDetail = () => {
  return useMutation({
    mutationKey: [QueryKeys.GET_FACILITY_DETAIL],
    mutationFn: cinemaClient.getFacilityDetail,
  });
};
const UpdateCinema = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_CINEMA],
    mutationFn: ({ id, data }: { id: number; data: { name: string; logo: string } }) => {
      return cinemaClient.updateCinema(id, data);
    },
  });
};
const UpdateFacility = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_CINEMA],
    mutationFn: ({ id, data }: { id: number; data: unknown }) => {
      return cinemaClient.updateFacility(id, data);
    },
  });
};

export {
  CreateCinema,
  GetCinema,
  CreateFacility,
  GetFacilityByCinemaId,
  GetCinemaDetail,
  UpdateCinema,
  GetFacilityDetail,
  UpdateFacility,
  GetCinemaByMovieId,
};
