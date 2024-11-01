import { useMutation, useQuery } from "@tanstack/react-query";

import userClient from "./fetchers";

import { QueryKeys } from "@api/queryKeys";

const RegisterUser = () => {
  return useMutation({
    mutationKey: [QueryKeys.REGISTER],
    mutationFn: userClient.register,
  });
};
const LoginUser = () => {
  return useMutation({
    mutationKey: [QueryKeys.LOGIN],
    mutationFn: userClient.login,
  });
};

const Verified = () => {
  return useMutation({
    mutationKey: [QueryKeys.VERIFIED],
    mutationFn: userClient.verified,
  });
};
const GetUserInfo = () => {
  return useQuery({
    queryKey: [QueryKeys.USER_INFO],
    queryFn: userClient.getUserInfo,
    refetchInterval: 300000,
    retry: 0,
  });
};

export { RegisterUser, LoginUser, Verified, GetUserInfo };
