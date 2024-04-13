<script setup>
import { ref } from "vue";
import { useTicketsStore } from "@/stores/ticketsStore";
import { parseJwt } from "@/utils/sessionHelper";

const props = defineProps({
  title: String,
  introduction: String,
});

const ticketsStore = useTicketsStore();
const manageBookingBookRef = ref();
const manageBookingLastName = ref();
const manageBookingFirstName = ref();

// 欄位驗證
const rules = {
  BookRefRules: [(v) => !!v || "訂位代號必填"],
  LastNameRules: [(v) => !!v || "英文姓氏必填"],
  FirstNameRules: [(v) => !!v || "英文名字必填"],
};

// 按下確認鍵要觸發的事件
const manageBookingBtn = async () => {
  if (
    // 先確認每個欄位都有值
    manageBookingBookRef.value != undefined &&
    manageBookingLastName.value != undefined &&
    manageBookingFirstName.value != undefined
  ) {
    console.log(
      manageBookingBookRef.value,
      manageBookingLastName.value,
      manageBookingFirstName.value
    );

    // 接著透過放在pinia的function，去呼叫API，看能否登入
    const response = await ticketsStore
      .getTicketInfo(
        manageBookingBookRef.value,
        manageBookingFirstName.value,
        manageBookingLastName.value
      )
      .then((response) => {
        console.log(response);
        if (response.isVerify == true) {
          sessionStorage.setItem("ticketsToken", response.token);
          var payload = parseJwt(response.token);
          ticketsStore.ticketsInfo = payload;

          return response;
        } else {
          // 登入失敗的訊息
          ElNotification({
            title: "登入失敗",
            message: "查無此訂位資訊",
            type: "error",
            offset: 100,
          })();
        }
      });
  }
};

const defaultAccountBookRef = [
  {
    bookRef: "aaa",
    englishFirstName: "aaa",
    englishLastName: "aaa",
    name: "已起飛帳號",
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
  manageBookingBookRef.value = defaultAccountBookRef[i].bookRef;
  manageBookingFirstName.value = defaultAccountBookRef[i].englishFirstName;
  manageBookingLastName.value = defaultAccountBookRef[i].englishLastName;

  // formBookRef.value.bookRef = defaultAccountBookRef[i].bookRef;
  // formBookRef.value.englishFirstName =
  //   defaultAccountBookRef[i].englishFirstName;
  // formBookRef.value.englishLastName = defaultAccountBookRef[i].englishLastName;
};
</script>
<template>
  <div class="container justify-content-center text-center">
    <div class="row mt-10">
      <div class="col">
        <h2 class="ml-0 mb-5">{{ title }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col mb-8">
        <h4>{{ introduction }}</h4>
      </div>
    </div>

    <div
      class="row mb-80 p-2 pt-5 pb-10"
      style="
        border: 1px solid #ddd;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 0px 10px;
      "
    >
      <div class="col"><h2 class="ml-0">訂位代號登入</h2></div>
      <v-form @submit.prevent>
        <div class="row">
          <div class="col-md-4">
            <v-text-field
              id="v-input-size"
              v-model="manageBookingBookRef"
              :rules="rules.BookRefRules"
              label="訂位代號"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              v-model="manageBookingLastName"
              :rules="rules.LastNameRules"
              label="英文姓氏"
            ></v-text-field>
          </div>
          <div class="col-md-3">
            <v-text-field
              v-model="manageBookingFirstName"
              :rules="rules.FirstNameRules"
              label="英文名字"
            ></v-text-field>
          </div>
          <div class="col-md-2">
            <button
              type="submit"
              class="cus-btn pl-sm-1 pr-sm-1"
              style="
                color: white;
                font-family: 'Times New Roman', Times, serif;
                font-size: 20px;
                width: 100%;
              "
              @click="manageBookingBtn"
            >
              確認
            </button>
          </div>
        </div>
        <div class="row pl-2 pr-2">
          <el-dropdown style="margin-top: 10px">
            <el-button type="primary"> 預設帳號<arrow-down /> </el-button>
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
      </v-form>
    </div>
  </div>
</template>
<style scoped></style>
