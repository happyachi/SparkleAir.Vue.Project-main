<script setup>
import { ref, reactive, onBeforeMount, onUpdated } from "vue";
// import { loginApi } from "@/apis/loginApis.js";
import { parseJwt } from "@/utils/sessionHelper";

// import pinia用來儲存使用者資料
import { useMemberStore } from "@/stores/members";
const memberStore = useMemberStore();
import { useRouter } from "vue-router";
const router = useRouter();

// import element-puls 欄位確認
import { ruleFormRef, form, rules } from "./LoginMethod/inputCheck.js";
//import google method
import {
  GOOGLE_CLIENT_ID,
  data,
  handleGoogleAuthTokenLogin,
} from "./LoginMethod/GoogleMethod.js";

// import line method
import { handleLineLoginButtonClick } from "./LoginMethod/LineMethod.js";

// import element-plus message
import { ElMessage, ElNotification } from "element-plus";

// 登入成功的訊息
const loginSuccess = () => {
  ElNotification({
    title: "登入成功",
    message: "登入成功，頁面轉跳中",
    type: "success",
    offset: 100,
  });
};

// 登入失敗的訊息
const loginFail = () => {
  ElNotification({
    title: "登入失敗",
    message: "帳號或密碼錯誤，或是帳號尚未啟用，請先至信箱收信，並點擊啟用連結",
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
            loginSuccess();
            setTimeout(() => {
              // 要導向首頁;
              document.location.href = "/";
              //router.replace({ path: "/" });
            }, 1000);
          } else {
            loginFail();
          }
        })
        .catch((e) => {
          console.log(e);
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
          loginSuccess();
          setTimeout(() => {
            // 要導向首頁;
            document.location.href = "/";
            //router.replace({ path: "/" });
          }, 1000);
        } else {
          loginFail();
        }
      })
      .catch((e) => {
        console.log(e);
        loginFail();
      });
  });
};
////////////////////////////Line///////////////////////
import axios from "axios";
const checkLineLoginCallBack = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("state") && urlParams.has("code")) {
    const state = urlParams.get("state");
    const code = urlParams.get("code");

    if (state === "abcde") {
      const URL = "https://api.line.me/oauth2/v2.1/token";
      const getTokenUrl = `${URL}`;
      const getTokenBody = {
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://localhost:8888/login",
        client_id: "2004013922",
        client_secret: "7bf0ccd16f6fcc579a5c63055bb66dd2",
      };

      axios
        .post(getTokenUrl, getTokenBody, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((e1) => {
          const token = e1.data.access_token;
          const idToken = e1.data.id_token;
          console.log(e1);
          const getProfileApiUrl = "https://api.line.me/v2/profile";
          axios({
            method: "GET",
            url: getProfileApiUrl,
            responseType: "json", // responseType 也可以寫在 header 裡面
            headers: {
              Authorization: `Bearer ${token}`, // Bearer 跟 token 中間有一個空格
            },
          })
            .then((e2) => {
              loginApi({
                loginMethod: "Line",
                account: "",
                password: "",
                passwordConfirm: "",
                googleAccessToken: "",
                lineCode: e2.data.userId,
              })
                .then((response) => {
                  if (response.isVerify == true) {
                    sessionStorage.setItem("memberToken", response.token);
                    memberStore.memberInfo = response.token;
                    loginSuccess();
                    setTimeout(() => {
                      // 要導向首頁;
                      document.location.href = "/";
                    }, 1000);
                  } else {
                    loginFail();
                  }
                })
                .catch((e) => {
                  console.log(e);
                  loginFail();
                });
            })
            .catch((error) => {
              console.log(`錯誤: ${error}`);
            });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  }
};
checkLineLoginCallBack();
</script>

<template>
  <header>
    <nav
      class="main-menu"
      style="
        z-index: 200;
        position: absolute;
        background-color: #fff;
        opacity: 0.5;
        padding: 0;
      "
    >
      <div class="container-fluid">
        <div class="main-menu__left">
          <div class="main-menu__logo">
            <a href="/">
              <img
                src="../../../sparkle/SparkleLogoHorizontal.png"
                alt="Sparkle Airline"
                style="width: 150px"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
    <!-- Header Area end -->
  </header>
  <!-- Main Wrapper Start -->
  <div id="main-wrapper" class="main-wrapper overflow-hidden">
    <!-- Main Content Start -->
    <div class="page-content m-0">
      <!-- Signup Form Start -->
      <section class="signup bg-white" style="background-size: cover">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div
              class="mb-48 col-xl-1 col-xl-2 col-lg-4 col-md-6 col-sm-8 mb-lg-0"
            >
              <div class="form-block">
                <!-- <a href="/" class="color-primary h6 mb-30"
                  ><i class="fa-solid fa-circle-left"></i
                  >&nbsp;&nbsp;回主頁面</a
                > -->
                <h2 class="light-black" style="margin-bottom: 20px !important">
                  會員登入
                </h2>
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
                    <div class="col-4">
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
                    <div class="col-8">
                      <div class="loginBtn mb-24" @click="submitForm()">
                        <h5 class="color-white">
                          <a class="link-btn mb-24 mb-sm-0"> 登入 </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </el-form>

                <h5 class="or mb-8">或</h5>

                <div class="google mb-24" @click="clickGoogleLogin">
                  <h5 class="color-white">
                    <a class="link-btn mb-24 mb-sm-0">
                      <div class="col-3"></div>

                      <div class="col-1">
                        <img
                          src="../../../flightWeb/static/picture/googleIcon.png"
                          style="height: 20px"
                          alt=""
                        />
                      </div>
                      <div class="col-4">使用 Google 登入</div>
                      <div class="col-3"></div>
                    </a>
                  </h5>
                </div>
                <div
                  class="lineLogin mb-30"
                  @click.prevent="handleLineLoginButtonClick"
                >
                  <h5 class="color-white">
                    <a class="link-btn">
                      <div class="col-3"></div>

                      <div class="col-1">
                        <img
                          src="../../../flightWeb/static/picture/LINE_Brand_icon.png"
                          style="height: 20px"
                          alt=""
                        />
                      </div>
                      <div class="col-4">使用 Line 登入</div>
                      <div class="col-3"></div>
                    </a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Signup Form End -->
    </div>
    <!-- Main Content End -->
  </div>
</template>
<style scoped></style>
