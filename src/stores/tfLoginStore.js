// 管理會員資料

import { ref } from "vue";
import { defineStore } from "pinia";
import { loginApi } from "@/apis/loginApis.js";
import { LoginByTicketAndNameApi } from "@/apis/TicketApi";

export const useTfLoginStore = defineStore("TfLogin", () => {
  //管理用戶數據state
  const TfLoginInfo = ref({});
  const isLoginComponent = ref(false);
  const isLogin = ref(false);
  const isLoginTicketDetail = ref(false);

  //定義獲取data的action
  const getMemberInfo = async ({
    loginMethod,
    account,
    password,
    passwordConfirm,
    googleAccessToken,
    lineCode,
  }) => {
    const response = await loginApi({
      loginMethod,
      account,
      password,
      passwordConfirm,
      googleAccessToken,
      lineCode,
    });

    return response;
  };

  //定義獲取data的action
  const getTicketInfo = async (BookRef, FirstName, LastName) => {
    const response = await LoginByTicketAndNameApi({
      BookRef,
      FirstName,
      LastName,
    });

    return response;
  };

  // 登出清除使用者資料
  const clearLoginInfo = () => {
    TfLoginInfo.value = null;
  };

  //return state, action
  return {
    TfLoginInfo,
    isLoginComponent,
    isLogin,
    getMemberInfo,
    getTicketInfo,
    clearLoginInfo,
  };
});
