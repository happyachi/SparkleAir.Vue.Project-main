// axios基礎設定
import axios from "axios";
import { ElMessage } from "element-plus";
import { useMemberStore } from "@/stores/members";

const httpInstance = axios.create({
  baseURL: "http://localhost:8889/api/", // .Net Core Api專案已設定，指定port為8889
  timeout: 5000,
});

// axios請求攔截器
httpInstance.interceptors.request.use(
  (config) => {
    // 在發送請求之前做些什麼
    // 1. 從pinia取得token資料
    // const memberStore = useMemberStore();
    // const token = memberStore.memberInfo.token;
    // 2. 把 token 放入 headers
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;

    // }
    // console.log(config);

    return config;
  },
  (error) => {
    // 對請求錯誤做些什麼
    return Promise.reject(error);
  }
);

// axios響應攔截器
httpInstance.interceptors.response.use(
  (response) => {
    // 2xx 範圍內的狀態，都會觸發函數
    // 對響應資料做些什麼
    return response.data;
  },
  (error) => {
    // 不是2xx 範圍的狀態，都會觸發函數
    // 對請求錯誤做些什麼

    // 統一錯誤提示
    // ElMessage({
    //   type: "warning",
    //   message: error.response.data.message,
    // });

    // 401 token錯誤處理
    // 清除用戶資料
    // if (error.response.status === 401) {
    //     const memberStore = useMemberStore();
    //     memberStore.clearMemberInfo();
    // }
    return Promise.reject(error);
  }
);

export default httpInstance;
