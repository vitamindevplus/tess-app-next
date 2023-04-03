import request from "../utils/axios";

export function loginApi(data: any): any {
  return request({
    url: "/api/v1/auth/login",
    method: "post",
    data,
  });
}
