<script setup>
import { ref } from "vue";
import { GetMemberInfo } from "@/apis/loginApis.js";

const memberToken = sessionStorage.getItem("memberToken");
const size = ref("large");
const iconStyle = ref("32px");
const memberInfo = ref();
const getMemberInfoFun = () => {
  GetMemberInfo(memberToken).then((response) => {
    memberInfo.value = response;
    if (memberInfo.value.chineseFirstName == null) {
      memberInfo.value.chineseFirstName = "";
    }
    if (memberInfo.value.chineseLastName == null) {
      memberInfo.value.chineseLastName = "";
    }
    if (memberInfo.value.gender == true) {
      memberInfo.value.gender = "男";
    } else {
      memberInfo.value.gender = "女";
    }
    if (memberInfo.value.googleId != null && memberInfo.value.googleId != "") {
      isBindGoogle.value = true;
    } else {
      isBindGoogle.value = false;
    }

    if (memberInfo.value.lineId != null && memberInfo.value.lineId != "") {
      isBindLine.value = true;
    } else {
      isBindLine.value = false;
    }
    console.log(response);
  });
};
getMemberInfoFun();
//////////////////// 按鈕事件 ////////////////////
const clickUpdateInfo = () => {
  updateInfoDialog.value = true;
  setDefaultAccount();
};
const clickUpdatePassword = () => {
  updatePasswordDialog.value = true;
};

//////////////////// 修改個資 ////////////////////
import {
  ruleFormRef,
  form,
} from "@/views/flightWeb/Members/SingUpMethod/MemberUpdateInputCheck.js";
import { checkAccountIsRegister, checkEmailIsRegister } from "@/apis/loginApis";

import { UpdateMemberInfo } from "@/apis/loginApis.js";

const rules = {
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
        if (value == memberInfo.value.email) {
          callback();
        } else {
          // 要呼叫資料庫看此信箱是否已經被註冊
          checkEmailIsRegister(value).then((response) => {
            if (response) {
              callback(new Error("此電子信箱已被註冊"));
            } else {
              callback();
            }
          });
        }
      },
      trigger: "blur",
    },
  ],
  passportNumber: [
    { required: true, message: "護照號碼為必填", trigger: "blur" },
    { min: 9, max: 9, message: "護照號碼為9位數", trigger: "blur" },
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

const updateInfoDialog = ref(false);

// 點擊後資料會到input框
const setDefaultAccount = () => {
  form.value.chineseLastName = memberInfo.value.chineseLastName;
  form.value.chineseFirstName = memberInfo.value.chineseFirstName;
  form.value.englishLastName = memberInfo.value.englishLastName;
  form.value.englishFirstName = memberInfo.value.englishFirstName;
  form.value.phone = memberInfo.value.phone;
  form.value.email = memberInfo.value.email;
  form.value.passportNumber = memberInfo.value.passportNumber;
  form.value.passportExpiryDate = memberInfo.value.passportExpiryDate;
};

// 按下送出 會觸發的事件
const submitEditForm = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      // 先呼叫註冊方法;
      // 成功後轉只到會員中心;
      // document.location.href = "/chooseService";

      let data = {
        chineseLastName: form.value.chineseLastName,
        chineseFirstName: form.value.chineseFirstName,
        englishLastName: form.value.englishLastName,
        englishFirstName: form.value.englishFirstName,
        phone: form.value.phone,
        email: form.value.email,
        passportNumber: form.value.passportNumber,
        passportExpiryDate: `${form.value.passportExpiryDate.substring(
          0,
          10
        )}T00:00:00.000Z`,
        token: memberToken,
      };
      console.log(data);

      UpdateMemberInfo(data)
        .then((r) => {
          console.log(r);
          getMemberInfoFun();
        })
        .catch((e) => console.log(e));
      updateInfoDialog.value = false;

      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

//////////////////// 修改密碼 ////////////////////
import { UpdateMemberPassword } from "@/apis/loginApis.js";

const updatePasswordDialog = ref(false);
const passwordRuleFormRef = ref(null);

const passwordForm = ref({
  passwordOld: "",
  passwordNew: "",
  passwordConfirm: "",
});
const passwordRules = {
  passwordOld: [
    { required: true, message: "原始密碼為必填", trigger: "blur" },
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
  passwordNew: [
    { required: true, message: "新密碼為必填", trigger: "blur" },
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
  passwordConfirm: [
    { required: true, message: "確認密碼為必填", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("請再次輸入密碼"));
        } else if (value !== passwordForm.value.passwordNew) {
          callback(new Error("二次密碼輸入不一樣"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

// 按下送出 會觸發的事件
const submitPasswordForm = () => {
  passwordRuleFormRef.value.validate(async (valid) => {
    if (valid) {
      // 先呼叫註冊方法;
      // 成功後轉只到會員中心;
      // document.location.href = "/chooseService";

      let data = {
        passwordOld: passwordForm.value.passwordOld,
        passwordNew: passwordForm.value.passwordNew,
        passwordConfirm: passwordForm.value.passwordConfirm,
        token: memberToken,
      };
      console.log(data);

      UpdateMemberPassword(data)
        .then((r) => {
          console.log(r);
        })
        .catch((e) => console.log(e));
      updatePasswordDialog.value = false;

      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

//////////////////// 第三方登入區塊 ////////////////////
import { computed } from "vue";
//import google method
import {
  GOOGLE_CLIENT_ID,
  data,
  BindGoogle,
} from "@/views/flightWeb/Members/LoginMethod/GoogleMethod.js";
import { BindGoogleLogin } from "@/apis/loginApis";
import { googleTokenLogin } from "vue3-google-login";

const bindThirdLoginDialog = ref(false);
const isBindGoogle = ref(false);
const isBindLine = ref(false);
const isBindThird = computed(() => {
  return isBindGoogle.value || isBindLine.value;
});
const isNotYetBindThird = computed(() => {
  return isBindGoogle.value && isBindLine.value;
});

const clickBindThirdLogin = () => {
  bindThirdLoginDialog.value = true;

  if (memberInfo.value.googleId != null && memberInfo.value.googleId != "") {
    isBindGoogle.value = true;
  } else {
    isBindGoogle.value = false;
  }

  if (memberInfo.value.lineId != null && memberInfo.value.lineId != "") {
    isBindLine.value = true;
  } else {
    isBindLine.value = false;
  }
};

const clickBindGoogle = async () => {
  googleTokenLogin({
    clientId: GOOGLE_CLIENT_ID,
  }).then((response) => {
    data.value = response;

    BindGoogleLogin({
      accessToken: response.access_token,
      memberToken: memberToken,
    })
      .then((r) => {
        console.log(r);
        getMemberInfoFun();
      })
      .catch((e) => {
        bindFail();
      });
  });
};

////////////////////////////Line///////////////////////
import axios from "axios";
const clickBindLine = () => {
  let URL = "https://access.line.me/oauth2/v2.1/authorize?";
  URL += "response_type=code";

  //channel id
  URL += "&client_id=2004013922";

  // 與Line Developer Channel設定的一樣就好，驗證完就會經過瀏覽器轉址回來
  URL += "&redirect_uri=http://localhost:8888/BindThirdLogin";

  // 狀態碼是會從client呼叫端帶到驗證端，再從驗證端帶回
  // 因此應該可以作為一個亂數卡控確保是自   已丟出去的交易碼
  URL += "&state=abcde";

  //要求存取的範圍
  URL += "&scope=profile%20openid%20email";
  window.location.href = URL;
  console.log(URL);
};

// 登入失敗的訊息
const bindFail = () => {
  ElNotification({
    title: "綁定失敗",
    message: "登入驗證有誤或是此帳號已被註冊",
    type: "error",
    offset: 100,
  });
};
//bindThirdLoginDialog.value = false;
</script>

<template>
  <el-dialog
    v-model="bindThirdLoginDialog"
    width="70%"
    append-to-body
    style="max-width: 600px"
  >
    <div>
      <h3 style="max-width: 580px; margin: auto">綁定第三方登入</h3>
      <el-card style="max-width: 580px; margin: auto" class="mb-5 mt-1 row">
        您目前已綁定的第三方登入
        <div class="row" style="margin: auto; text-align: center">
          <div
            v-if="!isBindThird"
            class="col-5 p-2 m-2"
            style="border: 3px solid #eee; font-size: 20px"
          >
            <div class="">無綁定資料</div>
          </div>

          <div
            v-if="isBindGoogle"
            class="col-5 p-2 m-2"
            style="border: 3px solid #eee; font-size: 20px"
          >
            <div class="row">
              <div class="col-4">
                <img
                  src="../../../flightWeb/static/picture/googleIcon.png"
                  style="height: 20px"
                  alt=""
                />
              </div>
              <div class="col-6">Google</div>
            </div>
          </div>
          <div
            v-if="isBindLine"
            class="col-5 p-2 m-2"
            style="border: 3px solid #eee; font-size: 20px"
          >
            <div class="row">
              <div class="col-4">
                <img
                  src="../../../flightWeb/static/picture/LINE_Brand_icon.png"
                  style="height: 20px"
                  alt=""
                />
              </div>
              <div class="col-6">Line</div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card style="max-width: 580px; margin: auto" class="mb-5 mt-1 row">
        您目前尚未綁定第三方登入
        <div class="row" style="margin: auto; text-align: center">
          <div
            v-if="isNotYetBindThird"
            class="col-5 p-2 m-2"
            style="border: 3px solid #eee; font-size: 20px"
          >
            <div class="">無待綁定第三方登入</div>
          </div>

          <div
            v-if="!isBindGoogle"
            class="col-5 p-2 m-2"
            style="border: 3px solid #eee; font-size: 20px; cursor: pointer"
            @click="clickBindGoogle"
          >
            <div class="row">
              <div class="col-4">
                <img
                  src="../../../flightWeb/static/picture/googleIcon.png"
                  style="height: 20px"
                  alt=""
                />
              </div>
              <div class="col-6">Google</div>
            </div>
          </div>
          <div
            v-if="!isBindLine"
            class="col-5 p-2 m-2"
            style="border: 3px solid #eee; font-size: 20px; cursor: pointer"
            @click="clickBindLine"
          >
            <div class="row">
              <div class="col-4">
                <img
                  src="../../../flightWeb/static/picture/LINE_Brand_icon.png"
                  style="height: 20px"
                  alt=""
                />
              </div>
              <div class="col-6">Line</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </el-dialog>

  <el-descriptions
    class="margin-top mb-10 mt-4"
    title="個人資料"
    :column="2"
    :size="size"
    border
    v-if="memberInfo"
  >
    <template #extra>
      <el-button type="primary" @click="clickUpdateInfo">修改資料</el-button>
      <el-button type="primary" @click="clickUpdatePassword"
        >修改密碼</el-button
      >
      <el-button type="primary" @click="clickBindThirdLogin"
        >綁定第三方登入</el-button
      >
    </template>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item fontSize">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          英文姓氏
        </div>
      </template>
      <div class="cell-item fontSize">
        {{ memberInfo.englishLastName }}
      </div>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <user />
          </el-icon>
          英文名字
        </div>
      </template>
      <div class="cell-item fontSize">{{ memberInfo.englishFirstName }}</div>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item fontSize">
          <el-icon :style="iconStyle">
            <UserFilled />
          </el-icon>
          中文姓氏
        </div>
      </template>
      <div class="cell-item fontSize">{{ memberInfo.chineseLastName }}</div>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item fontSize">
          <el-icon :style="iconStyle">
            <UserFilled />
          </el-icon>
          中文名字
        </div>
      </template>
      <div class="cell-item fontSize">{{ memberInfo.chineseFirstName }}</div>
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <div class="cell-item fontSize">
          <el-icon :style="iconStyle">
            <UserFilled />
          </el-icon>
          性別
        </div>
      </template>
      <div class="cell-item fontSize">{{ memberInfo.gender }}</div>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item fontSize">
          <el-icon :style="iconStyle">
            <iphone />
          </el-icon>
          手機號碼
        </div>
      </template>
      <div class="cell-item fontSize">{{ memberInfo.phone }}</div>
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <div class="cell-item fontSize">
          <el-icon :style="iconStyle">
            <Calendar />
          </el-icon>
          出生日期
        </div>
      </template>
      <div class="cell-item fontSize">
        {{ memberInfo.dateOfBirth.substring(0, 10) }}
      </div>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item fontSize">
          <el-icon :style="iconStyle">
            <Message />
          </el-icon>
          電子信箱
        </div>
      </template>
      <div class="cell-item fontSize">{{ memberInfo.email }}</div>
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <div class="cell-item fontSize">
          <el-icon :style="iconStyle">
            <Calendar />
          </el-icon>
          護照效期
        </div>
      </template>
      <div class="cell-item fontSize">
        {{ memberInfo.passportExpiryDate.substring(0, 10) }}
      </div>
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <div class="cell-item fontSize">
          <el-icon :style="iconStyle">
            <postcard />
          </el-icon>
          護照號碼
        </div>
      </template>
      <div class="cell-item fontSize">{{ memberInfo.passportNumber }}</div>
    </el-descriptions-item>

    <el-descriptions-item>
      <template #label>
        <div class="cell-item fontSize">
          <el-icon :style="iconStyle">
            <Calendar />
          </el-icon>
          註冊時間
        </div>
      </template>
      <div class="cell-item fontSize">
        {{ memberInfo.registrationTime.substring(0, 10) }}
      </div>
    </el-descriptions-item>
  </el-descriptions>

  <el-dialog
    v-model="updateInfoDialog"
    width="70%"
    append-to-body
    style="max-width: 600px"
  >
    <div>
      <h3 style="max-width: 580px; margin: auto">修改資料</h3>
      <el-card style="max-width: 580px; margin: auto" class="mb-5 mt-1 row">
        <el-form
          ref="ruleFormRef"
          :model="form"
          status-icon
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item label="中文姓氏" prop="chineseLastName">
            <el-input v-model="form.chineseLastName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="中文名字" prop="chineseFirstName">
            <el-input v-model="form.chineseFirstName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="英文姓氏" prop="englishLastName">
            <el-input v-model="form.englishLastName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="英文名字" prop="englishFirstName">
            <el-input v-model="form.englishFirstName" autocomplete="off" />
          </el-form-item>

          <el-form-item label="手機號碼" prop="phone">
            <el-input v-model="form.phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="電子信箱" prop="email">
            <el-input v-model="form.email" autocomplete="off" />
          </el-form-item>
          <el-form-item label="護照號碼" prop="passportNumber">
            <el-input v-model="form.passportNumber" autocomplete="off" />
          </el-form-item>
          <el-form-item label="護照效期" prop="passportExpiryDate">
            <el-col :span="11">
              <el-date-picker
                v-model="form.passportExpiryDate"
                type="date"
                placeholder="選擇日期"
                autocomplete="off"
                value-format="YYYY-MM-DD"
                size="large"
              />
            </el-col>
          </el-form-item>
          <div class="col-7">
            <div class="row pt-2">
              <el-button size="large" type="primary" @click="submitEditForm()"
                >送出</el-button
              >
            </div>
          </div>
        </el-form>
      </el-card>
    </div>
  </el-dialog>

  <el-dialog
    v-model="updatePasswordDialog"
    width="70%"
    append-to-body
    style="max-width: 600px"
  >
    <div>
      <h3 style="max-width: 580px; margin: auto">修改密碼</h3>
      <el-card style="max-width: 580px; margin: auto" class="mb-5 mt-1 row">
        <el-form
          ref="passwordRuleFormRef"
          :model="passwordForm"
          status-icon
          :rules="passwordRules"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item label="原始密碼" prop="passwordOld">
            <el-input
              v-model="passwordForm.passwordOld"
              type="password"
              autocomplete="off"
              style="border: 0 solid white"
            />
          </el-form-item>
          <el-form-item label="新密碼" prop="passwordNew">
            <el-input
              v-model="passwordForm.passwordNew"
              type="password"
              autocomplete="off"
              style="border: 0 solid white"
            />
          </el-form-item>
          <el-form-item label="確認密碼" prop="passwordConfirm">
            <el-input
              v-model="passwordForm.passwordConfirm"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <div class="col-7">
            <div class="row pt-2">
              <el-button
                size="large"
                type="primary"
                @click="submitPasswordForm()"
                >送出</el-button
              >
            </div>
          </div>
        </el-form>
      </el-card>
    </div>
  </el-dialog>
</template>

<style scoped>
.fontSize {
  font-size: 16px;
}
</style>
