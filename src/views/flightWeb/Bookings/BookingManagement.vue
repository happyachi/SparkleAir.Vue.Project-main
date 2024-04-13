<script setup>
import { ref, onMounted, watch } from "vue";
import TitleBanner from "@/components/flightWebComponents/titleBanner.vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { useTicketsStore } from "@/stores/ticketsStore";
import { parseJwt } from "@/utils/sessionHelper";
import {
  GetTicketInfoByTicketInvoicingDetailsId,
  GetLuggageListByTicketInvoicingDetailsId,
} from "@/apis/TicketApi.js";

//////////////// 變數區 ////////////////
const ticketsStore = useTicketsStore();

const TitleBannerTitle = ref({
  title1: "行程管理",
  title2: "",
});

const bookingManagement = ref();
const luggageList = ref();
const isLuggageOrder = ref(false);

const ticket = {
  bookRef: "aaa",
  englishFirstName: "aaa",
  englishLastName: "aaa",
};
var encoded = btoa(JSON.stringify(ticket));
console.log(encoded);

//////////////// 驗證登入資訊，並登入 ////////////////
const login = (bookRef, englishFirstName, englishLastName) => {
  ticketsStore
    .getTicketInfo(bookRef, englishFirstName, englishLastName)
    .then((response) => {
      if (response.isVerify == true) {
        sessionStorage.setItem("ticketsToken", response.token);
        var payload = parseJwt(response.token);
        ticketsStore.ticketsInfo = payload;

        GetTicketInfoByTicketInvoicingDetailsId(
          payload.TicketInvoicingDetailsId
        ).then((r) => {
          bookingManagement.value = r;
          isLuggageOrder.value = r.airFlightStatuses == "未出發" ? true : false;
        });

        GetLuggageListByTicketInvoicingDetailsId(
          payload.TicketInvoicingDetailsId
        ).then((r) => {
          if (r.length > 0) {
            console.log(123);
            for (let i = 0; i < r.length; i++) {
              r[i].orderTime = `${r[i].orderTime.substring(0, 10)} ${r[
                i
              ].orderTime.substring(11, 16)}`;
            }
          }

          luggageList.value = r;
        });
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
};
//////////////// 抓網址，並解碼 ////////////////
const route = useRoute();
const ticketAndNameBase64 = route.params.ticketAndName;
let ticketAndNameObj;
if (ticketAndNameBase64.length > 0) {
  try {
    ticketAndNameObj = JSON.parse(atob(ticketAndNameBase64));
    console.log(ticketAndNameObj);
    login(
      ticketAndNameObj.bookRef,
      ticketAndNameObj.englishFirstName,
      ticketAndNameObj.englishLastName
    );
  } catch {
    router.push("/BookingManagement");
  }
}

//////////////// 託運加購按鈕 ////////////////
import { ElMessageBox } from "element-plus";

const clickLuggageBtn = () => {
  ElMessageBox.confirm("即將前往託運加購", "提醒", {
    confirmButtonText: "前往託運加購",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    document.location.href = "/LuggageIndex";
  });
};

//////////////////////////////////////////////////////////////////////////////////////////
//以下為登入區塊

// 實作 靠訂位+名字登入
import { getSessionTokenData } from "@/utils/sessionHelper"; //奇哥會員
import ticketLogin from "@/components/flightWebComponents/Tickets/ticketLogin.vue";

const memberData = ref(getSessionTokenData("memberToken")); //奇哥取會員

const ticketDetailId = ref();
const isLogin = ref(false);

const componentsInputData = {
  title: "請先登入",
  introduction: "",
};
//console.log(ticketDetailId.value);

const ticketsTokenData = ref(getSessionTokenData("ticketsToken"));
if (
  ticketsTokenData.value != null &&
  ticketsTokenData.value.TicketDetailId != null &&
  ticketsTokenData.value.TicketDetailId != undefined
) {
  isLogin.value = true;

  GetTicketInfoByTicketInvoicingDetailsId(
    ticketsTokenData.value.TicketInvoicingDetailsId
  ).then((r) => {
    bookingManagement.value = r;
    isLuggageOrder.value = r.airFlightStatuses == "未出發" ? true : false;
    //isLuggageOrder.value = r.airFlightStatuses != "未出發" ? true : false;
  });

  GetLuggageListByTicketInvoicingDetailsId(
    ticketsTokenData.value.TicketInvoicingDetailsId
  ).then((r) => {
    if (r.length > 0) {
      console.log(123);
      for (let i = 0; i < r.length; i++) {
        r[i].orderTime = `${r[i].orderTime.substring(0, 10)} ${r[
          i
        ].orderTime.substring(11, 16)}`;
      }
    }

    luggageList.value = r;
  });
}
console.log(ticketsTokenData.value);

// 監聽是否登入
watch(
  () => ticketsStore.ticketsInfo,
  (newValue, oldValue) => {
    console.log(ticketsStore.ticketsInfo);
    ticketDetailId.value = ticketsStore.ticketsInfo;
    if (ticketDetailId.value != null || ticketDetailId.value != undefined) {
      GetTicketInfoByTicketInvoicingDetailsId(
        ticketsStore.ticketsInfo.TicketInvoicingDetailsId
      ).then((r) => {
        bookingManagement.value = r;
        isLuggageOrder.value = r.airFlightStatuses == "未出發" ? true : false;
        //isLuggageOrder.value = r.airFlightStatuses != "未出發" ? true : false;
      });

      GetLuggageListByTicketInvoicingDetailsId(
        ticketsStore.ticketsInfo.TicketInvoicingDetailsId
      ).then((r) => {
        if (r.length > 0) {
          console.log(123);
          for (let i = 0; i < r.length; i++) {
            r[i].orderTime = `${r[i].orderTime.substring(0, 10)} ${r[
              i
            ].orderTime.substring(11, 16)}`;
          }
        }

        luggageList.value = r;
      });

      isLogin.value = true;
    }
    if (ticketDetailId.value == null || ticketDetailId.value == "") {
      isLogin.value = false;
    }
  }
);

//以上為登入區塊
//////////////////////////////////////////////////////////////////////////////////////////
</script>
<template>
  <TitleBanner :title="TitleBannerTitle"></TitleBanner>
  <div class="mt-50 mb-50" v-show="isLogin">
    <el-card
      style="max-width: 800px; margin: auto; font-size: 20px"
      v-if="bookingManagement"
    >
      <div class="pl-5 pb-2">訂票資訊<br /></div>

      <div class="">
        <div
          class="row pt-2 pb-5"
          style="border-bottom: 1px solid #aaa; font-size: 20px"
        >
          <div class="col-4 text-center">
            旅客 ： {{ bookingManagement.firstName }}
            {{ bookingManagement.lastName }}
          </div>
          <div class="col-4 text-center">
            航班代號 ： {{ bookingManagement.flightCode }}
          </div>
          <div class="col-4 text-center">
            航班狀態 ： {{ bookingManagement.airFlightStatuses }}
          </div>
        </div>
        <div class="row pt-5 pb-5">
          <div class="col-5 text-center">
            {{ bookingManagement.departureAirportCity }}<br />
            {{ bookingManagement.departureAirportName }}
            <br />{{ bookingManagement.scheduledDeparture.substring(0, 10)
            }}<br />{{ bookingManagement.scheduledDeparture.substring(11, 16) }}
          </div>
          <div class="col-2 text-center m-auto">
            <i
              class="fa-solid fa-arrow-right m-auto"
              style="font-size: 20px"
            ></i>
          </div>
          <div class="col-5 text-center">
            {{ bookingManagement.arrivalAirportCity }}<br />
            {{ bookingManagement.arrivalAirportName }}<br />{{
              bookingManagement.scheduledArrival.substring(0, 10)
            }}<br />{{ bookingManagement.scheduledArrival.substring(11, 16) }}
          </div>
        </div>
      </div>
    </el-card>

    <el-card
      style="max-width: 800px; margin: auto; font-size: 20px"
      v-if="bookingManagement"
    >
      <div class="pl-5 pb-2">加購服務<br /></div>
      <div class="col" v-show="isLuggageOrder">
        <el-card
          style="max-width: 350px; height: 280px"
          @click="clickLuggageBtn"
        >
          <el-button
            plain
            link
            color="rgba(54, 84, 134)"
            size="large"
            style="font-size: 20px; width: 100%"
          >
            <el-image
              src="https://plus.unsplash.com/premium_photo-1661301088134-72715e2475be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bHVnZ2FnZXxlbnwwfHwwfHx8MA%3D%3D"
              style="
                object-fit: contain;
                max-width: 100%;
                height: 200px;
                border-radius: 10px;
              "
            />
          </el-button>
          <el-button
            plain
            link
            color="rgba(54, 84, 134)"
            size="large"
            style="font-size: 20px; width: 100%"
          >
            行李加購
          </el-button>
        </el-card>
      </div>
      <div class="col" v-show="!isLuggageOrder">
        <h3>航班 {{ bookingManagement.airFlightStatuses }} 無法加購</h3>
      </div>
    </el-card>

    <el-card style="max-width: 800px; margin: auto; font-size: 20px">
      <div class="pl-5 pb-2">託運加購紀錄<br /></div>
      <div class="col" v-show="!luggageList">
        <h2>無託運加購紀錄</h2>
      </div>
      <div class="col" v-show="luggageList">
        <el-table
          :data="luggageList"
          height="200"
          style="width: 100%; font-size: 16px"
        >
          <el-table-column prop="luggagePrice" label="單價" width="150" />
          <el-table-column prop="amount" label="件數" width="150" />
          <el-table-column prop="price" label="小計" width="150" />
          <el-table-column prop="orderTime" label="訂購時間" />
        </el-table>
      </div>
    </el-card>
  </div>
  <!-- 這是登入區塊開始 -->
  <ticketLogin
    v-show="!isLogin"
    :title="componentsInputData.title"
    :introduction="componentsInputData.introduction"
  >
  </ticketLogin>
  <!-- 這是登入區塊結束 -->
</template>
<style scoped></style>
