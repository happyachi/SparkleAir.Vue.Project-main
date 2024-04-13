<script setup>
// // import element-puls 欄位確認
import { ref } from "vue";
import { ruleFormRef, form, rules } from "./SingUpMethod/SingUpInputCheck.js";
import { loginApi, RegisterMember } from "@/apis/loginApis.js";

import TitleBanner from "@/components/flightWebComponents/titleBanner.vue";
const TitleBannerTitle = ref({
  title1: "註冊",
  title2: "Sparkle會員",
});

// 按下送出 會觸發的事件
const submitForm = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      // 先呼叫註冊方法;
      // 成功後轉只到會員中心;
      // document.location.href = "/chooseService";

      RegisterMember({
        account: form.value.account,
        password: form.value.password,
        passwordConfirm: form.value.passwordConfirm,
        chineseLastName: form.value.chineseLastName,
        chineseFirstName: form.value.chineseFirstName,
        englishLastName: form.value.englishLastName,
        englishFirstName: form.value.englishFirstName,
        gender: form.value.gender,
        dateOfBirth: `${form.value.dateOfBirth}T00:00:00.000Z`,
        phone: form.value.phone,
        email: form.value.email,
        passportNumber: form.value.passportNumber,
        passportExpiryDate: `${form.value.passportExpiryDate}T00:00:00.000Z`,
      })
        .then((r) => {
          document.location.href = "/RegisterSuccess";
        })

        .catch((e) => console.log(e));
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

// 建立預設帳號
const defaultAccount = [
  {
    name: "不通過帳號",
    account: "user10",
    password: "password1011",
    passwordConfirm: "password101",
    chineseLastName: "莊",
    chineseFirstName: "大華",
    englishLastName: "Chang",
    englishFirstName: "HaWai",
    gender: true,
    dateOfBirth: "2025-01-01",
    phone: "0900123456",
    email: "user10@gmail.com",
    passportNumber: "aaaaaaaaa",
    passportExpiryDate: "2024-01-01",
  },
  {
    name: "正常帳號",
    account: "user1011",
    password: "password1011",
    passwordConfirm: "password1011",
    chineseLastName: "莊",
    chineseFirstName: "大華",
    englishLastName: "Chang",
    englishFirstName: "HaWai",
    gender: true,
    dateOfBirth: "1990-01-01",
    phone: "0900123456",
    email: "sparkle.airline@gmail.com",
    passportNumber: "aaaaaaaaa",
    passportExpiryDate: "2026-01-01",
  },
];

// 點擊後資料會到input框
const setDefaultAccount = (i) => {
  form.value.account = defaultAccount[i].account;
  form.value.password = defaultAccount[i].password;
  form.value.passwordConfirm = defaultAccount[i].passwordConfirm;
  form.value.chineseLastName = defaultAccount[i].chineseLastName;
  form.value.chineseFirstName = defaultAccount[i].chineseFirstName;
  form.value.englishLastName = defaultAccount[i].englishLastName;
  form.value.englishFirstName = defaultAccount[i].englishFirstName;
  form.value.gender = defaultAccount[i].gender;
  form.value.dateOfBirth = defaultAccount[i].dateOfBirth;
  form.value.phone = defaultAccount[i].phone;
  form.value.email = defaultAccount[i].email;
  form.value.passportNumber = defaultAccount[i].passportNumber;
  form.value.passportExpiryDate = defaultAccount[i].passportExpiryDate;
};
</script>
<template>
  <TitleBanner :title="TitleBannerTitle"></TitleBanner>
  <div class="mt-50 mb-50">
    <el-card style="max-width: 800px; margin: auto">
      <div class="form-block">
        <div class="row">
          <div class="col">
            <el-form
              ref="ruleFormRef"
              :model="form"
              status-icon
              :rules="rules"
              label-width="auto"
              class="demo-ruleForm"
            >
              <div class="row">
                <div class="col-6">
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
                  <el-form-item label="確認密碼" prop="passwordConfirm">
                    <el-input
                      v-model="form.passwordConfirm"
                      type="password"
                      autocomplete="off"
                    />
                  </el-form-item>
                  <el-form-item label="中文姓氏" prop="chineseLastName">
                    <el-input
                      v-model="form.chineseLastName"
                      autocomplete="off"
                    />
                  </el-form-item>
                  <el-form-item label="中文名字" prop="chineseFirstName">
                    <el-input
                      v-model="form.chineseFirstName"
                      autocomplete="off"
                    />
                  </el-form-item>
                  <el-form-item label="英文姓氏" prop="englishLastName">
                    <el-input
                      v-model="form.englishLastName"
                      autocomplete="off"
                    />
                  </el-form-item>
                  <el-form-item label="英文名字" prop="englishFirstName">
                    <el-input
                      v-model="form.englishFirstName"
                      autocomplete="off"
                    />
                  </el-form-item>
                </div>
                <div class="col-6">
                  <el-form-item label="性別" prop="gender">
                    <el-radio-group v-model="form.gender">
                      <el-radio-button label="男" value="true" />
                      <el-radio-button label="女" value="false" />
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="出生日期" prop="dateOfBirth">
                    <el-col :span="11">
                      <el-date-picker
                        v-model="form.dateOfBirth"
                        type="date"
                        placeholder="選擇日期"
                        autocomplete="off"
                        value-format="YYYY-MM-DD"
                        size="large"
                      />
                    </el-col>
                  </el-form-item>
                  <el-form-item label="手機號碼" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="電子信箱" prop="email">
                    <el-input v-model="form.email" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="護照號碼" prop="passportNumber">
                    <el-input
                      v-model="form.passportNumber"
                      autocomplete="off"
                    />
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

                    <div class="col-7">
                      <div class="row pt-2">
                        <el-button
                          size="large"
                          type="primary"
                          @click="submitForm()"
                          >註冊</el-button
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped></style>
