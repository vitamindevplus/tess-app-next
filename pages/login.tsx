import React, { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Style from "../styles/Login.module.scss";
import Image from "next/image";
import logo from "../public/mylogo.svg";
import face from "../public/icon-facebook.png";
import google from "../public/icon-google.png";
import github from "../public/icon-github.png";
import { loginApi } from "./api/auth";
import { getCookie, KEY, setCookie } from "./utils/cookie";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginApi(data);
      if (res.data) {
        setCookie(KEY.EMAIL, res.data.email);
        setCookie(KEY.ROLE, res.data.role);
        setCookie(KEY.TOKEN, res.data.token);
        setCookie(KEY.USER, res.data.name);
        router.push("/");
      }
    } catch (error) {}
  };

  useLayoutEffect(() => {
    const token = getCookie(KEY.TOKEN);
    if (token) {
      router.push("/");
    }
  }, []);

  return (
    <div className={Style["login-page"]}>
      <div className={Style["login-box"]}>
        <div className={Style["logo"]}>
          <Image src={logo} alt="logo" />
          <h1>Vitamin Share</h1>
        </div>
        <p style={{ textAlign: "center" }}>Đăng nhập vào Vitamin Share</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Email</label>
            <input type="text" {...register("email")} />
            {errors.email && (
              <div className={Style["error-message"]}>
                {errors.email.message}
              </div>
            )}
          </div>

          <div>
            <label>Password</label>
            <input {...register("password")} type="password" />
            {errors.password && (
              <div className={Style["error-message"]}>
                {errors.password?.message}
              </div>
            )}
          </div>
          <button type="submit">Đăng nhập</button>
        </form>

        <div className={Style["other"]}>
          <div>Quên mật khẩu ?</div>
          <div>Tạo tài khoản</div>
        </div>

        <div className={Style["login-social-title"]}>
          <hr />
          <div>Đăng nhập bằng</div>
          <hr />
        </div>
        <div className={Style["login-social"]}>
          <div className={Style["face-social"]}>
            <Image src={face} alt="face" />
            <div>Facebook</div>
          </div>
          <div className={Style["google-social"]}>
            <Image src={google} alt="google" />
            <div>Google</div>
          </div>
          <div className={Style["github-social"]}>
            <Image src={github} alt="github" />
            <div>Github</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
