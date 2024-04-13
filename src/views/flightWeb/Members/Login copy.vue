<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import { loginApi } from "@/apis/loginApis.js";

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
import {
  handleLineLoginButtonClick,
  checkLineLoginCallBack,
} from "./LoginMethod/LineMethod.js";

// import element-plus message
import { ElMessage, ElNotification } from "element-plus";
const loginSuccess = () => {
  ElNotification({
    title: "登入成功",
    message: "登入成功",
    type: "success",
  });
};

// 按下登入建 會觸發的事件
const submitForm = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log("submit!");

      const { account, password } = form.value;
      const loginMethod = "Account";

      const res = await memberStore.getMemberInfo({
        account,
        password,
        loginMethod,
      });
      //const res = await loginApi({ account, password, loginMethod });
      console.log(res);

      loginSuccess();
      //router.replace({ path: "/" });
      要導向首頁;
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<template>
  <!-- start 測試登入功能 -->
  <div
    class="btn btn-primary btn-sm box-shadow-primary text-white border-0 mr-3"
    @click.prevent="handleLineLoginButtonClick"
  >
    Line Login
  </div>
  <div>
    <button type="button" @click="handleGoogleAuthTokenLogin">
      使用 Google 進行登入
    </button>
    {{ data }}
  </div>
  <!-- End 測試登入功能 -->

  <div class="o-scroll" id="js-scroll">
    <!-- Back To Top Start -->
    <a href="#main-wrapper" id="backto-top" class="back-to-top"
      ><i class="fas fa-angle-up"></i
    ></a>
    <!-- Main Wrapper Start -->
    <div id="main-wrapper" class="main-wrapper overflow-hidden">
      <!-- Main Content Start -->
      <div class="page-content m-0">
        <!-- Signup Form Start -->
        <section class="signup bg-white">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xl-4 col-lg-6 col-md-7 mb-lg-0 mb-48">
                <div class="form-block">
                  <a href="/" class="color-primary h6 mb-30"
                    ><i class="fa-solid fa-circle-left"></i
                    >&nbsp;&nbsp;回主頁面</a
                  >
                  <h2 class="mb-30 light-black">會員登入</h2>
                  <el-form
                    ref="ruleFormRef"
                    style="max-width: 600px"
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
                      /> </el-form-item
                    ><el-form-item label="密碼" prop="password">
                      <el-input
                        v-model="form.password"
                        type="password"
                        autocomplete="off"
                        style="border: 0 solid white"
                      />
                    </el-form-item>
                    <div class="d-flex justify-content-end">
                      <el-form-item>
                        <el-button
                          type="warning"
                          class="cus-btn small-pad mb-24"
                          @click="submitForm()"
                          >登入</el-button
                        >
                      </el-form-item>
                    </div>
                  </el-form>

                  <h5 class="or mb-8">或</h5>

                  <div class="google mb-24">
                    <h6 class="color-white">
                      <a href="" class="link-btn mb-24 mb-sm-0">
                        使用 Google 登入&nbsp;<img
                          src="../moban7664/static/picture/google-icon.png"
                          alt=""
                      /></a>
                    </h6>
                  </div>
                  <div class="facebook mb-30">
                    <h6 class="color-white">
                      <a href="" class="link-btn">
                        使用 Facebook 登入&nbsp;<img
                          src="../moban7664/static/picture/facebook-icon.png"
                          alt=""
                      /></a>
                    </h6>
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
  </div>
</template>
<style scoped></style>
