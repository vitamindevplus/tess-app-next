import axios, { AxiosRequestConfig } from "axios";
import { removeCookie, getCookie, KEY } from "./cookie";

const RESPONSE_CODE = {
  EXPECTATION_FAILED: 417,
  NOT_SIGNED_IN: 401,
};

const service = (config: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
    const _config = {
      ...config,
      baseURL: "https://vitamin-share-be.vercel.app/",
      // baseURL: "http://localhost:9000/",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie(KEY.TOKEN)
          ? `Bearer ${getCookie(KEY.TOKEN)}`
          : undefined,
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios(_config)
      .then((res) => {
        return resolve(res);
      })
      .catch((error) => {
        if (
          error?.response?.status === RESPONSE_CODE.NOT_SIGNED_IN &&
          window.location.pathname !== "/dang-nhap"
        ) {
          removeCookie(KEY.TOKEN);
          window.location.href = "/dang-nhap";
        }
        if (error?.response?.status === RESPONSE_CODE.EXPECTATION_FAILED) {
          return reject(error?.response);
        }
        return reject(error);
      });
  });
};

export default service;
