<script setup>
import { ref, watch } from "vue";
import { useTfLoginStore } from "@/stores/tfLoginStore";
const tfLoginStore = useTfLoginStore();
const tab = ref();

//////////////////////////這是使用會員登入//////////////////////////
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
import { ElNotification } from "element-plus";

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

      tfLoginStore
        .getMemberInfo({
          account,
          password,
          loginMethod,
        })
        .then((response) => {
          if (response.isVerify == true) {
            sessionStorage.setItem("TFLoginToken", response.token);
            let payload = parseJwt(response.token);
            tfLoginStore.TfLoginInfo = payload;
            console.log(payload);
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

//////////////////////////這是使用訂位代號登入//////////////////////////
import { useTicketsStore } from "@/stores/ticketsStore";
import { parseJwt } from "@/utils/sessionHelper";

// import element-puls 欄位確認
import {
  ruleFormBookRef,
  formBookRef,
  rulesBookRef,
} from "@/views/flightWeb/Members/LoginMethod/inputCheck.js";

const ticketsStore = useTicketsStore();

// 按下確認鍵要觸發的事件
const submitFormBookRef = async () => {
  ruleFormBookRef.value.validate(async (valid) => {
    if (valid) {
      const { bookRef, englishFirstName, englishLastName } = formBookRef.value;
      const response = await tfLoginStore.getTicketInfo(
        bookRef,
        englishFirstName,
        englishLastName
      );
      if (response.isVerify == true) {
        sessionStorage.setItem("TFLoginToken", response.token);
        let payload = parseJwt(response.token);
        tfLoginStore.TfLoginInfo = payload;
        tfLoginStore.isLogin = true;
        tfLoginStore.isLoginComponent = false;

        console.log(payload);
      } else {
        // 登入失敗的訊息
        ElNotification({
          title: "登入失敗",
          message: "查無此訂位資訊",
          type: "error",
          offset: 100,
        })();
      }
    }
  });
};
// 建立預設帳號
const defaultAccountBookRef = [
  {
    bookRef: "aaa",
    englishFirstName: "aaa",
    englishLastName: "aaa",
    name: "帳號",
  },
  {
    bookRef: "WJOVLD",
    englishFirstName: "Xiaoxiong",
    englishLastName: "Hsu",
    name: "未起飛帳號",
  },
];

// 點擊後資料會到input框
const setDefaultAccountBookRef = (i) => {
  formBookRef.value.bookRef = defaultAccountBookRef[i].bookRef;
  formBookRef.value.englishFirstName =
    defaultAccountBookRef[i].englishFirstName;
  formBookRef.value.englishLastName = defaultAccountBookRef[i].englishLastName;
};
/////////////////////////google Login/////////////////////////
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
          sessionStorage.setItem("TFLoginToken", response.token);
          let payload = parseJwt(response.token);
          tfLoginStore.TfLoginInfo = payload;
          console.log(payload);
        }
      })
      .catch((e) => {
        loginFail();
      });
  });
};
</script>

<template>
  <div class="border mb-10" style="max-width: 800px">
    <v-tabs v-model="tab" bg-color="white" fixed-tabs>
      <v-tab value="BookRefLogin">訂位代號登入</v-tab>
      <v-tab value="MemberLogin"> 會員登入 </v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="BookRefLogin">
          <div
            class="form-block mt-10 mb-10"
            style="max-width: 800px; margin: auto"
          >
            <div class="row">
              <el-form
                ref="ruleFormBookRef"
                :model="formBookRef"
                status-icon
                :rules="rulesBookRef"
                label-width="auto"
                class="demo-ruleForm"
              >
                <div class="row pl-2 pr-2">
                  <div class="col-xl-4">
                    <el-form-item label="訂位代號" prop="bookRef">
                      <el-input
                        v-model="formBookRef.bookRef"
                        autocomplete="off"
                      />
                    </el-form-item>
                  </div>
                  <div class="col-xl-4">
                    <el-form-item label="英文名字" prop="englishFirstName">
                      <el-input
                        v-model="formBookRef.englishFirstName"
                        autocomplete="off"
                      />
                    </el-form-item>
                  </div>

                  <div class="col-xl-4">
                    <el-form-item label="英文姓氏" prop="englishLastName">
                      <el-input
                        v-model="formBookRef.englishLastName"
                        autocomplete="off"
                      />
                    </el-form-item>
                  </div>
                </div>

                <div class="row pl-2 pr-2">
                  <div
                    class="col loginBtnStyle ml-3 mr-3"
                    style="border: 1px solid #ccc; border-radius: 5px"
                  >
                    <div
                      class="loginBtn justify-content-center text-center"
                      @click="submitFormBookRef()"
                    >
                      <h4 class="">登入</h4>
                    </div>
                  </div>
                </div>
                <div class="row pl-2 pr-2">
                  <el-dropdown style="margin-top: 10px">
                    <el-button type="primary">
                      預設帳號<arrow-down />
                    </el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item
                          v-for="(item, index) in defaultAccountBookRef"
                          :key="item.account"
                          @click="setDefaultAccountBookRef(index)"
                          >{{ item.name }}</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </el-form>
            </div>
          </div>
        </v-window-item>

        <v-window-item value="MemberLogin">
          <div class="form-block" style="max-width: 800px; margin: auto">
            <div class="row">
              <div class="col-xl-6">
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
                  <div class="row pl-2">
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
                  <div class="row pl-2">
                    <el-dropdown style="margin-top: 10px">
                      <el-button type="primary">
                        預設帳號<arrow-down />
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

              <div class="col-xl-6">
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
            </div></div
        ></v-window-item>
      </v-window>
    </v-card-text>
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
