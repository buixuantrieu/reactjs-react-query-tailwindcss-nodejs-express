import { useMutation } from "@tanstack/react-query";

import userClient from "./fetchers";

enum QueryKeys {
  REGISTER = "register",
  LOGIN = "login",
}

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

export { RegisterUser, LoginUser };
