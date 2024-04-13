// 管理會員資料
import { ref } from "vue";
import { defineStore } from "pinia";
import { LoginByTicketAndNameApi } from "@/apis/TicketApi";

export const useTicketsStore = defineStore("tickets", () => {
  //管理用戶數據state
  const ticketsInfo = ref({});

  //定義獲取data的action
  const getTicketInfo = async (BookRef, FirstName, LastName) => {
    const response = await LoginByTicketAndNameApi({
      BookRef,
      FirstName,
      LastName,
    });

    console.log(response);

    return response;
  };

  // 登出清除使用者資料
  const clearTicketInfo = () => {
    ticketsInfo.value = {};
  };

  //return state, action
  return {
    ticketsInfo,
    getTicketInfo,
    clearTicketInfo,
  };
});
