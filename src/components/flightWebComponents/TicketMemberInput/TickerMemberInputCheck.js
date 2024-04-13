// element 表單輸入檢查
import { ref } from "vue";

export const ruleFormRef = ref(null);

export const form = ref({
  englishLastName: "",
  englishFirstName: "",
  gender: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  passportNumber: "",
  passportExpiryDate: "",
});

export const rules = {
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
  gender: [{ required: true, message: "性別為必填", trigger: "blur" }],
  dateOfBirth: [{ required: true, message: "出生日期為必填", trigger: "blur" }],
  phone: [
    { required: true, message: "手機號碼為必填", trigger: "blur" },
    {
      pattern: /^09\d{7}$/,
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
  ],
  passportNumber: [
    { required: true, message: "護照號碼為必填", trigger: "blur" },
    { min: 10, max: 10, message: "護照號碼為10位數", trigger: "blur" },
  ],
  passportExpiryDate: [
    { required: true, message: "護照效期為必填", trigger: "blur" },
  ],
};
