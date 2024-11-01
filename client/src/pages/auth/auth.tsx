/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { RegisterUser, LoginUser } from "@api/users/queries";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@constants/routes";

function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [formSignUp] = Form.useForm();
  const [formSignIn] = Form.useForm();
  const navigate = useNavigate();

  type signUpForm = {
    email: string;
    password: string;
  };
  type signInForm = {
    emailLogin: string;
    passwordLogin: string;
  };

  const { mutate: register, isPending: registerLoading, error: registerError } = RegisterUser();
  const { mutate: login, isPending: loginLoading, error: loginError } = LoginUser();

  const handleSignUp = (values: signUpForm) => {
    register(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (result) => {
          setIsLogin(false);
          formSignUp.resetFields();
          notification.success({ message: "Đăng kí tài khoản thành công!" });
          navigate(`${ROUTES.VERIFIED}?email=${result.data.user.email}&id=${result.data.user.id}`);
        },
        onError: (e) => {
          console.log(e);
        },
      }
    );
  };
  const handleSignIn = (values: signInForm) => {
    login(
      {
        email: values.emailLogin,
        password: values.passwordLogin,
      },
      {
        onSuccess: (result) => {
          notification.success({ message: "Đăng nhập thành công!" });
          const accessToken = result.data.accessToken;
          const refreshToken = result.data.refreshToken;
          localStorage.setItem("accessToken", accessToken);
          document.cookie = `refreshToken=${refreshToken}; max-age=${
            7 * 24 * 60 * 60
          }; path=/; secure; samesite=strict`;
          formSignIn.resetFields();
          const checkRole = result.data.userRole.some((item: { [key: string]: number }) => item.roleId !== 1);
          if (checkRole) {
            navigate(ROUTES.ADMIN.DASHBOARD);
          } else {
            navigate(ROUTES.USER.HOME);
          }
        },
      }
    );
  };

  useEffect(() => {
    if ((registerError as any)?.response?.data?.message) {
      if ((registerError as any)?.response?.data?.message?.email) {
        formSignUp.setFields([
          {
            name: "email",
            errors: [(registerError as any)?.response?.data?.message?.email],
          },
        ]);
      }
      if ((registerError as any)?.response?.data?.message?.password) {
        formSignUp.setFields([
          {
            name: "password",
            errors: [(registerError as any)?.response?.data?.message?.password],
          },
        ]);
      }
    }
  }, [registerError, formSignUp]);
  useEffect(() => {
    if ((loginError as any)?.response?.data?.message) {
      if ((loginError as any)?.response?.data?.message?.email) {
        formSignIn.setFields([
          {
            name: "emailLogin",
            errors: [(loginError as any)?.response?.data?.message?.email],
          },
        ]);
      }
      if ((loginError as any)?.response?.data?.message?.password) {
        formSignIn.setFields([
          {
            name: "passwordLogin",
            errors: [(loginError as any)?.response?.data?.message?.password],
          },
        ]);
      }
    }
  }, [loginError, formSignIn]);

  return (
    <div className="min-h-[100vh] bg-[#0f1d2f] flex items-center justify-center ">
      <div className="relative w-[1000px] h-[600px] rounded-[12px] overflow-hidden bg-[#0f1d2feb] box-shadow ">
        <div className="absolute  top-0 left-[0] w-[100%] h-[100%] flex">
          <div
            className={`relative  w-[50%] p-8 h-[100%] flex items-center justify-center flex-col gap-4 transition-all duration-1000
              ${!isLogin ? "top-[0px]" : "top-[100%]"}`}
          >
            <h1 className="text-[28px] font-bold text-[#8fbdff]">Đăng nhập</h1>
            <Form form={formSignIn} layout="vertical" onFinish={handleSignIn} className="w-[100%]">
              <Form.Item label="Email:" name="emailLogin" rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
                <Input placeholder="Email" className="w-[100%]  bg-transparent text-white" autoComplete="email" />
              </Form.Item>
              <Form.Item
                label="Mật khẩu:"
                name="passwordLogin"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password
                  placeholder="Password"
                  className="w-[100%] bg-transparent"
                  autoComplete="password-login"
                />
              </Form.Item>
              <Button loading={loginLoading} htmlType="submit" ghost className="w-full" type="primary">
                Đăng nhập
              </Button>
            </Form>
          </div>
          <div
            className={`relative  w-[50%] p-8 h-[100%] flex items-center justify-center flex-col gap-4 transition-all duration-1000
              ${isLogin ? "top-[0px]" : "top-[100%]"}`}
          >
            <h1 className="text-[28px] font-bold text-[#8fbdff]">Đăng kí</h1>
            <Form form={formSignUp} layout="vertical" onFinish={handleSignUp} className="w-[100%]">
              <Form.Item
                name="email"
                label="Email:"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Email" className="w-[100%] bg-transparent" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu:"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                  {
                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g,
                    message: "Mật khẩu yếu!",
                  },
                ]}
              >
                <Input.Password placeholder="Password" className="w-[100%] bg-transparent" autoComplete="password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Nhập lại mật khẩu:"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập lại mật khẩu!",
                  },
                  (params) => ({
                    validator(_, value) {
                      if (!value || params.getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="ConfirmPassword"
                  className="w-[100%] bg-transparent"
                  autoComplete="confirm-password"
                />
              </Form.Item>
              <Button loading={registerLoading} htmlType="submit" ghost className="w-full" type="primary">
                Đăng kí
              </Button>
            </Form>
          </div>
        </div>
        <div
          className={`absolute overflow-hidden   w-[50%] top-0 transition-all duration-1000 h-[100%] box-shadow bg-[#031327]
            ${isLogin ? "rounded-r-[100px] left-0" : "rounded-l-[100px]  left-[50%]"}`}
        >
          <div
            className={`absolute flex w-[200%] transition-all duration-700 top-0 left-0 h-[100%]
              ${isLogin && "left-[-100%]"}`}
          >
            <div className="w-[50%] p-10 flex flex-col gap-4 items-center justify-center h-[100%]">
              <h1 className="text-[28px] text-white font-bold">Chào bạn!</h1>
              <p className="text-white font-thin text-center">
                Đăng ký với thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web.
              </p>
              <Button
                onClick={() => {
                  setIsLogin(true);
                  formSignIn.resetFields();
                }}
                className="cursor-pointer"
                type="primary"
                ghost
              >
                Đăng kí
              </Button>
            </div>
            <div className="w-[50%] p-10 flex flex-col gap-4 items-center justify-center h-[100%]">
              <h1 className="text-[28px]  text-white font-bold">Chào mừng trở lại!</h1>
              <p className="text-white font-thin text-center">
                Nhập thông tin cá nhân của bạn để sử dụng tất cả các tính năng của trang web.
              </p>
              <Button
                onClick={() => {
                  setIsLogin(false);
                  formSignUp.resetFields();
                }}
                className="cursor-pointer"
                type="primary"
                ghost
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Auth;
