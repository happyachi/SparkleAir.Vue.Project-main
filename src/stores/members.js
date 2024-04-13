// 管理會員資料

import { ref } from "vue";
import { defineStore } from "pinia";
import { loginApi } from "@/apis/loginApis.js";

export const useMemberStore = defineStore(
  "member",
  () => {
    //管理用戶數據state
    const memberInfo = ref({});

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

    // 登出清除使用者資料
    const clearMemberInfo = () => {
      memberInfo.value = {};
    };

    //return state, action
    return {
      memberInfo,
      getMemberInfo,
      clearMemberInfo,
    };
  },
  {
    persist: true,
  }
);
