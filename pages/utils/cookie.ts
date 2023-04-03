import Cookies from "js-cookie";

export function getCookie(key: string) {
  return Cookies.get(key);
}

export function setCookie(key: string, value: any) {
  return Cookies.set(key, value);
}

export function removeCookie(key: string) {
  return Cookies.remove(key);
}

export const KEY = {
  TOKEN: "TOKEN",
  ROLE: "ROLE",
  EMAIL: "EMAIL",
  USER: "USER",
};
