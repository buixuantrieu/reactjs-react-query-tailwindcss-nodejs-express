/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { Button, Form, Input, InputRef, notification } from "antd";
import { IoMdArrowBack } from "react-icons/io";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ROUTES } from "@constants/routes";
import { Verified } from "@api/users/queries";

function AccountVerification() {
  const [formVerification] = Form.useForm();
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const navigate = useNavigate();
  const numberTwoRef = useRef<InputRef>(null);
  const numberThreeRef = useRef<InputRef>(null);
  const numberFourRef = useRef<InputRef>(null);

  useEffect(() => {
    // if (userRegister.error) {
    //   formVerification.setFields([
    //     { name: "numberOne", errors: [" "], value: "" },
    //     { name: "numberTwo", errors: [" "], value: "" },
    //     { name: "numberThree", errors: [" "], value: "" },
    //     { name: "numberFour", errors: [" "], value: "" },
    //   ]);
    //   notification.warning({ message: "Mã OTP sai!" });
    // }
    // if (!localStorage.getItem("userId")) {
    //   navigate(ROUTES.AUTH);
    // }
  }, []);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const id = searchParams.get("id");

  const { mutate: verified } = Verified();

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft <= 0) {
      setIsTimerActive(false);
    }
  }, [isTimerActive, timeLeft]);

  const handleResendEmail = () => {
    if (!isTimerActive) {
      setIsTimerActive(true);
      setTimeLeft(60);
    }
  };

  const handleOnchange = (value: string, nameValue: string) => {
    const valueNumber = parseInt(value, 10);
    if (valueNumber < 0 || valueNumber > 9 || isNaN(valueNumber)) {
      formVerification.setFieldsValue({ [nameValue]: "" });
    }
    if (valueNumber >= 0 && valueNumber <= 9) {
      if (nameValue === "numberOne" && numberTwoRef.current) {
        numberTwoRef.current.focus();
      } else if (nameValue === "numberTwo" && numberThreeRef.current) {
        numberThreeRef.current.focus();
      } else if (nameValue === "numberThree" && numberFourRef.current) {
        numberFourRef.current.focus();
      }
    }
  };

  const handleVerification = (values: {
    numberOne: string;
    numberTwo: string;
    numberThree: string;
    numberFour: string;
  }) => {
    const activationCode =
      parseInt(values.numberOne + values.numberTwo + values.numberThree + values.numberFour) || undefined;
    verified(
      { id: id as string, activationCode: Number(activationCode) },
      {
        onSuccess: () => {
          notification.success({ message: "Kích hoạt tài khoản thành công!" });
          navigate(ROUTES.AUTH);
        },
        onError: (e: any) => {
          if (e.status === 403) {
            notification.warning({ message: "Tài khoản đã hết thời hạn kích hoạt!" });
            navigate(ROUTES.AUTH);
          } else {
            notification.warning({ message: "Mã OTP sai!" });
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f1d2f] p-10 text-[#8fbdff]">
      <div className="text-3xl border p-2 rounded-md  mb-4">
        <BiLogoGmail />
      </div>
      <h3 className=" mb-3">Vui lòng kiểm tra email của bạn</h3>
      <p className="text-sm ">Chúng tôi đã gửi mã xác nhận tới email</p>
      <p className="text-sm ">{email}</p>
      <Form form={formVerification} onFinish={handleVerification} className="w-max mt-6 ">
        <div className="flex gap-3 mb-5 justify-center">
          {["numberOne", "numberTwo", "numberThree", "numberFour"].map((name, index) => (
            <Form.Item key={name} name={name} rules={[{ required: true, message: "" }]}>
              <Input
                style={{ width: 40, fontSize: 24 }}
                ref={index === 1 ? numberTwoRef : index === 2 ? numberThreeRef : index === 3 ? numberFourRef : null}
                onChange={(e) => handleOnchange(e.target.value, name)}
                maxLength={1}
                className="bg-transparent"
              />
            </Form.Item>
          ))}
        </div>
        <Button htmlType="submit" type="primary" ghost className="w-full">
          Xác nhận Email
        </Button>
      </Form>
      <p className="text-sm  mt-3">
        Bạn không nhận được email?{" "}
        <button
          onClick={handleResendEmail}
          disabled={timeLeft > 0}
          className={`font-semibold ${
            timeLeft > 0 ? "text-[#8fbeff55] cursor-not-allowed" : "text-[#8fbdff] cursor-pointer"
          }`}
        >
          Gửi lại mã OTP{" "}
        </button>
        <span> {isTimerActive && `${timeLeft}s`}</span>
      </p>
      <div onClick={() => navigate(ROUTES.AUTH)} className="flex items-center gap-4 mt-4 font-medium  cursor-pointer">
        <IoMdArrowBack />
        Trở về trang đăng nhập
      </div>
    </div>
  );
}

export default AccountVerification;
