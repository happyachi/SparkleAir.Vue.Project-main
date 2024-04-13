<script setup>
import { ref, reactive, onBeforeMount, onUpdated } from "vue";
// import { loginApi } from "@/apis/loginApis.js";

// import pinia用來儲存使用者資料
import { useMemberStore } from "@/stores/members";
const memberStore = useMemberStore();

// import element-puls 欄位確認
import {
  ruleFormRef,
  form,
  rules,
} from "@/views/flightWeb/Members/LoginMethod/inputCheck.js";

//import google method
import {
  GOOGLE_CLIENT_ID,
  data,
  handleGoogleAuthTokenLogin,
} from "../../views/flightWeb/Members/LoginMethod/GoogleMethod.js";

// import line method
import {
  handleLineLoginButtonClick,
  checkLineLoginCallBack,
} from "../../views/flightWeb/Members/LoginMethod/LineMethod.js";

// import element-plus message
import { ElMessage, ElNotification } from "element-plus";

// 登入失敗的訊息
const loginFail = () => {
  ElNotification({
    title: "登入失敗",
    message: "登入失敗，帳號或密碼錯誤",
    type: "error",
    offset: 100,
  });
};

// 按下登入建 會觸發的事件
const submitForm = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log("submit!");

      const { account, password } = form.value;
      const loginMethod = "Account";

      memberStore
        .getMemberInfo({
          account,
          password,
          loginMethod,
        })
        .then((response) => {
          if (response.isVerify == true) {
            sessionStorage.setItem("memberToken", response.token);
            memberStore.memberInfo = response.token;
          }
        })
        .catch((e) => {
          loginFail();
        });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

// 建立預設帳號
const defaultAccount = [
  { account: "user10", password: "password10", name: "老客戶" },
  { account: "user101", password: "password101", name: "新客戶" },
  { account: "user1011", password: "password1011", name: "全新註冊客戶" },
];

// 點擊後資料會到input框
const setDefaultAccount = (i) => {
  form.value.account = defaultAccount[i].account;
  form.value.password = defaultAccount[i].password;
};

/////////google Login/////////
import { googleTokenLogin } from "vue3-google-login";
import { loginApi } from "@/apis/loginApis";
const clickGoogleLogin = () => {
  googleTokenLogin({
    clientId: GOOGLE_CLIENT_ID,
  }).then((googleResponse) => {
    loginApi({
      loginMethod: "Google",
      account: "",
      password: "",
      passwordConfirm: "",
      googleAccessToken: googleResponse.access_token,
      lineCode: "",
    })
      .then((response) => {
        if (response.isVerify == true) {
          sessionStorage.setItem("memberToken", response.token);
          memberStore.memberInfo = response.token;
        }
      })
      .catch((e) => {
        loginFail();
      });
  });
};
</script>

<template>
  <div class="row mb-80">
    <div class="col">
      <el-card style="max-width: 800px; margin: auto">
        <div class="form-block">
          <h2 class="light-black ml-0" style="margin-bottom: 20px !important">
            會員登入
          </h2>
          <div class="row">
            <div class="col-sm-6">
              <el-form
                ref="ruleFormRef"
                :model="form"
                status-icon
                :rules="rules"
                label-width="auto"
                class="demo-ruleForm"
              >
                <el-form-item label="帳號" prop="account">
                  <el-input
                    v-model="form.account"
                    autocomplete="off"
                    id="inputAccount"
                  /> </el-form-item
                ><el-form-item label="密碼" prop="password">
                  <el-input
                    v-model="form.password"
                    type="password"
                    autocomplete="off"
                    style="border: 0 solid white"
                  />
                </el-form-item>
                <div class="row">
                  <div
                    class="col loginBtnStyle ml-3 mr-3"
                    style="border: 1px solid #ccc; border-radius: 5px"
                  >
                    <div
                      class="loginBtn justify-content-center text-center"
                      @click="submitForm()"
                    >
                      <h4 class="">登入</h4>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <el-dropdown style="margin-top: 10px">
                    <el-button type="primary">
                      預設帳號<el-icon class="el-icon--right"
                        ><arrow-down
                      /></el-icon>
                    </el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item
                          v-for="(item, index) in defaultAccount"
                          :key="item.account"
                          @click="setDefaultAccount(index)"
                          >{{ item.name }}</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </el-form>
            </div>

            <div class="col-sm-6">
              <div
                class="google mb-24 row pt-1 pb-1 mr-1 ml-1 loginBtnStyle"
                @click="clickGoogleLogin"
                style="border: 1px solid #ccc; border-radius: 5px"
              >
                <div class="col-3"></div>
                <div class="col-1 p-0 justify-content-center m-auto">
                  <img
                    src="../../flightWeb/static/picture/googleIcon.png"
                    style="height: 20px"
                    alt=""
                  />
                </div>
                <div class="col-5 p-0">
                  <h5 class="">使用 Google 登入</h5>
                </div>
                <div class="col-2"></div>
              </div>

              <div
                class="lineLogin mb-24 row pt-1 pb-1 mr-1 ml-1 loginBtnStyle"
                @click="handleLineLoginButtonClick"
                style="border: 1px solid #ccc; border-radius: 5px"
              >
                <div class="col-3"></div>
                <div class="col-1 p-0 justify-content-center m-auto">
                  <img
                    src="../../flightWeb/static/picture/LINE_Brand_icon.png"
                    style="height: 20px"
                    alt=""
                  />
                </div>
                <div class="col-5 p-0">
                  <h5 class="">使用 Line 登入</h5>
                </div>
                <div class="col-2"></div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style scoped>
.loginBtnStyle {
  cursor: pointer;
  background: #f7f7f7;
}

.loginBtnStyle:hover {
  background: #ffffff;
}
</style>
