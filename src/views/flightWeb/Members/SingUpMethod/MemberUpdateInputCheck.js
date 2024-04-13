// element 表單輸入檢查
import { ref } from "vue";
import { checkAccountIsRegister, checkEmailIsRegister } from "@/apis/loginApis";
export const ruleFormRef = ref(null);

export const form = ref({
  chineseLastName: "",
  chineseFirstName: "",
  englishLastName: "",
  englishFirstName: "",
  phone: "",
  email: "",
  passportNumber: "",
  passportExpiryDate: "",
});

export const rules = {
  chineseLastName: [
    { min: 1, max: 5, message: "長度須介於1～5個字", trigger: "blur" },
  ],
  chineseFirstName: [
    { min: 1, max: 5, message: "長度須介於1～5個字", trigger: "blur" },
  ],
  englishLastName: [
    { required: true, message: "英文姓為必填", trigger: "blur" },
    { min: 1, max: 20, message: "長度須介於1～20個字", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        // 英文字母
        let alphabet = value.match(/([A-Za-z]+)/);

        if (alphabet) {
          callback();
        } else {
          callback(new Error("格式錯誤! 必須是英文字母"));
        }
      },
      trigger: "blur",
    },
  ],
  englishFirstName: [
    { required: true, message: "英文名為必填", trigger: "blur" },
    { min: 1, max: 20, message: "長度須介於1～20個字", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        // 英文字母
        let alphabet = value.match(/([A-Za-z]+)/);

        if (alphabet) {
          callback();
        } else {
          callback(new Error("格式錯誤! 必須是英文字母"));
        }
      },
      trigger: "blur",
    },
  ],
  phone: [
    { required: true, message: "手機號碼為必填", trigger: "blur" },
    {
      pattern: /^09\d{8}$/,
      message: "請輸入正確的手機號碼",
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "電子信箱為必填", trigger: "blur" },
    {
      type: "email",
      message: "請輸入正確電子格式",
      trigger: ["blur", "change"],
    },
    {
      validator: (rule, value, callback) => {
        // 要呼叫資料庫看此信箱是否已經被註冊
        checkEmailIsRegister(value).then((response) => {
          if (response) {
            callback(new Error("此電子信箱已被註冊"));
          } else {
            callback();
          }
        });
      },
      trigger: "blur",
    },
  ],
  passportNumber: [
    { required: true, message: "護照號碼為必填", trigger: "blur" },
    { min: 9, max: 10, message: "護照號碼為10位數", trigger: "blur" },
  ],
  passportExpiryDate: [
    { required: true, message: "護照效期為必填", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        let inputDate = Date.parse(value);
        let today = Date.parse(new Date().toISOString().slice(0, 10));
        const date = new Date(today);
        date.setMonth(date.getMonth() + 3);

        if (inputDate > date) {
          callback();
        } else {
          callback(new Error("護照效期必須大於3個月"));
        }
      },
      trigger: "blur",
    },
  ],
};
