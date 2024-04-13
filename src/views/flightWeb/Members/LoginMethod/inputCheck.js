// element 表單輸入檢查
import { ref } from "vue";

export const ruleFormRef = ref(null);

export const form = ref({
  account: "",
  password: "",
});

export const rules = {
  account: [
    { required: true, message: "帳號為必填", trigger: "blur" },
    { min: 6, max: 16, message: "帳號長度介於6～16個字", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        // 英文字母
        let alphabet = value.match(/([A-Za-z]+)/);
        // 數字
        let number = value.match(/([\d]+)/);
        if (alphabet && number) {
          callback();
        } else {
          callback(new Error("帳號格式錯誤! 必須包含英文字母及數字"));
        }
      },
      trigger: "blur",
    },
  ],

  password: [
    { required: true, message: "密碼為必填", trigger: "blur" },
    { min: 6, max: 16, message: "密碼長度介於6～16個字", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        // 英文字母
        let alphabet = value.match(/([A-Za-z]+)/);
        // 數字
        let number = value.match(/([\d]+)/);
        if (alphabet && number) {
          callback();
        } else {
          callback(new Error("密碼格式錯誤! 必須包含英文字母及數字"));
        }
      },
      trigger: "blur",
    },
  ],
};

export const ruleFormBookRef = ref(null);

export const formBookRef = ref({
  bookRef: "",
  englishFirstName: "",
  englishLastName: "",
});

export const rulesBookRef = {
  bookRef: [{ required: true, message: "訂位代號為必填", trigger: "blur" }],

  englishFirstName: [
    { required: true, message: "英文名字為必填", trigger: "blur" },
  ],
  englishLastName: [
    { required: true, message: "英文姓氏為必填", trigger: "blur" },
  ],
};
