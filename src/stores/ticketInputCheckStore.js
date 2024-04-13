import { ref } from "vue";
import { defineStore } from "pinia";

export const useTicketInputCheck = defineStore("useTicketInputCheck", () => {
  const ruleFormRef = ref(null);

  const form = ref([]);

  const basic = {
    englishLastName: "",
    englishFirstName: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    passportNumber: "",
    passportExpiryDate: "",
  };

  const rules = {
    englishLastName: [
      { required: true, message: "英文姓為必填", trigger: "blur" },
      { min: 1, max: 5, message: "長度須介於1～20個字", trigger: "blur" },
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
      { min: 1, max: 5, message: "長度須介於1～20個字", trigger: "blur" },
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
    dateOfBirth: [
      { required: true, message: "出生日期為必填", trigger: "blur" },
    ],
    phone: [
      { required: true, message: "手機號碼為必填", trigger: "blur" },
      {
        pattern: /^09[0-9]\d{8}$/,
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

  const createPassenger = (num) => {
    form.value = [];
    for (let i = 0; i < num; i++) {
      form.value.push({ ...basic });
    }
  };

  // 按下送出 會觸發的事件
  const submitForm = () => {
    console.log(form.value);

    ruleFormRef.value.validate(async (valid) => {
      if (valid) {
        console.log("submit!");

        // const { account, password } = form.value;
        // const loginMethod = "Account";

        // memberStore
        //   .getMemberInfo({
        //     account,
        //     password,
        //     loginMethod,
        //   })
        //   .then((response) => {
        //     if (response.isVerify == true) {
        //       sessionStorage.setItem("memberToken", response.token);
        //       memberStore.memberInfo = response.token;
        //       sessionStorage.removeItem("ticketsToken");
        //       loginSuccess();
        //       setTimeout(() => {
        //         // 要導向首頁;
        //         document.location.href = "/";
        //         //router.replace({ path: "/" });
        //       }, 1000);
        //     }
        //   })
        //   .catch((e) => {
        //     console.log(e);
        //     loginFail();
        //   });
      } else {
        console.log("error submit!");
        return false;
      }
    });
  };

  return {
    ruleFormRef,
    form,
    rules,
    createPassenger,
    submitForm,
  };
});
