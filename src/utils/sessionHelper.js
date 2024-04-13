import { addJwtTokenData } from "@/apis/helperApi";
import { useMemberStore } from "@/stores/members";

export const parseJwt = (token) => {
  if (token == null || token == undefined) {
    return null;
  }
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

/**
 * @param  {string}  tokenName - 要取得session 裡的 token 名稱
 * @returns {object}   token payload 裡的內容
 */
export const getSessionTokenData = (tokenName) => {
  let token = sessionStorage.getItem(tokenName);
  let data = token != null ? parseJwt(token) : null;
  return data;
};

/**
 * addSessionTokenData 增加key,value到JWT token裡的payload，
 * @param  {string}  token - session 裡的 token
 * @param  {object}  obj - 要增加的參數，key, value用object的方式傳入
 */
export const addSessionTokenData = async (obj) => {
  console.log("addSessionTokenData");
  let token = sessionStorage.getItem("token");

  const memberStore = useMemberStore();
  memberStore.memberInfo.token = token;
  console.log(memberStore.memberInfo.token);

  const responseToken = await addJwtTokenData(token, obj);

  sessionStorage.setItem("token", responseToken);
  console.log(responseToken);
};

// 將資料存到sessionStorage
// sessionStorage.setItem("key", "value");

// 從sessionStorage取得之前存的資料
//var data = sessionStorage.getItem("key");

// 從sessionStorage移除之前存的資料
//sessionStorage.removeItem("key");

// 從sessionStorage移除之前存的所有資料
//sessionStorage.clear();
