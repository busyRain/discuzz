import { Base64 } from "js-base64";
import localStore from "@/utils/auth.js";
var ls = new localStore();
export const SetCookies = (name, value) => {
  ls.set(name, Base64.encode(value));
};
export const GetCookies = name => {
  try {
    let val = ls.get(name);
    if (val) {
      return Base64.decode(val);
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const DelCookies = name => {
  ls.del(name);
};
