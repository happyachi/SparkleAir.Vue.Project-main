import httpInstance from "@/utils/http";

/**
 * addJwtTokenData 增加key,value到JWT token裡的payload，
 * @param  {string}  token - session 裡的 token
 * @param  {object}  obj - 要增加的參數，key, value用object的方式傳入
 * @return {型態}  回傳新的token
 */
export function addJwtTokenData(token, obj) {
  if (token == null || token == undefined) {
    throw "token不得為空";
  }
  if (obj == null || obj == undefined) {
    throw "obj不得為空";
  }

  return httpInstance({
    method: "post",
    // url: "methods/addJwtTokenData",
    url: "Jwts/addJwtTokenData",
    // withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`, // Bearer 跟 token 中間有一個空格
      Authorization1: `Bearer ${token}`,
    },
    data: {
      token: token,
      obj,
    },
  });
  // .default.headers.Authorization = `Bearer ${token}`);
}
