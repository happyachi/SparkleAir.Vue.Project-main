<script setup>
import { ref } from "vue";
import { getSessionTokenData, parseJwt } from "@/utils/sessionHelper";
import { useTicketsStore } from "@/stores/ticketsStore";

////////////////////////// 變數設定區 //////////////////////////
const isBookingReady = ref(false);
const loginData = ref();
const ticketDetailDialog = ref(false);
const bookingManagement = ref();
const luggageList = ref();
const isLuggageOrder = ref(false);
const bookingDialog = ref(false);
const ticketsStore = useTicketsStore();
const isPassengerList = ref(false);
const isTicketInfo = ref(false);
//////////////////////////選擇航班區//////////////////////////
import { GetAirFlightListByMemberId } from "@/apis/TicketApi.js";

const airFlightList = ref();
const getFlight = async (memberId) => {
  // airFlightList.value = await GetAirFlightListByMemberId(memberId);
  airFlightList.value = await GetAirFlightListByMemberId(memberId);
  if (airFlightList.value.length == 0) {
    // 如果回傳是空陣列
    isBookingReady.value = false;
    //console.log(airFlightList.value, 123);
  } else {
    // 如果回傳有資料
    console.log(airFlightList.value);
    airFlightList.value = airFlightList.value.filter(
      (x) => Date.parse(x.scheduledDeparture) < Date.now()
    );

    if (airFlightList.value.length > 0) {
      const sortRule = (a, b) => {
        return (
          Date.parse(a.scheduledDeparture) - Date.parse(b.scheduledDeparture)
        );
      };
      airFlightList.value.sort(sortRule);

      isBookingReady.value = true;
    } else {
      isBookingReady.value = false;
    }
  }
};

//////////////////////////click航班//////////////////////////
const clickAirFlightChoose = (flightId) => {
  ticketDetailDialog.value = true;
  getTicketDetailList(loginData.value.MemberId, flightId);
  getTicketDetail(loginData.value.MemberId, flightId);
  ticketDetailDialog.value = true;
};
////////////////////////// 訂單明細 //////////////////////////
import { GetTicketByMemberIdAndFlightId } from "@/apis/TicketApi.js";
const ticketDetail = ref();
const getTicketDetail = async (memberId, flightId) => {
  ticketDetail.value = await GetTicketByMemberIdAndFlightId(memberId, flightId);

  console.log(ticketDetail.value);
  if (airFlightList.value) {
    // 如果回傳是空陣列
    isTicketInfo.value = true;
    ticketDetail.value.orderTime = `${ticketDetail.value.orderTime.substring(
      0,
      10
    )} ${ticketDetail.value.orderTime.substring(11, 16)}`;
    if (ticketDetail.value.mileRedemption == null) {
      ticketDetail.value.mileRedemption = 0;
    }
    if (ticketDetail.value.totalGeneratedMile == null) {
      ticketDetail.value.totalGeneratedMile = 0;
    }
  }
};

//////////////////////////選擇乘客區//////////////////////////
import { GetPassengerByMemberIdAndFlightId } from "@/apis/TicketApi.js";
const ticketDetailList = ref();
const getTicketDetailList = async (memberId, flightId) => {
  ticketDetailList.value = await GetPassengerByMemberIdAndFlightId(
    memberId,
    flightId
  );

  console.log(ticketDetailList.value);
  if (airFlightList.value.length > 0) {
    // 如果回傳是空陣列
    isPassengerList.value = true;
  }
};
//////////////////////////click乘客//////////////////////////
import {
  GetTicketInfoByTicketInvoicingDetailsId,
  GetLuggageListByTicketInvoicingDetailsId,
} from "@/apis/TicketApi.js";
const clickPassengerChoose = async (ticketsDetailId) => {
  bookingDialog.value = true;
  GetTicketInfoByTicketInvoicingDetailsId(ticketsDetailId).then((r) => {
    bookingManagement.value = r;
    console.log(r);
    isLuggageOrder.value = r.airFlightStatuses == "未出發" ? true : false;
  });

  GetLuggageListByTicketInvoicingDetailsId(ticketsDetailId).then((r) => {
    if (r.length > 0) {
      console.log(123);
      for (let i = 0; i < r.length; i++) {
        r[i].orderTime = `${r[i].orderTime.substring(0, 10)} ${r[
          i
        ].orderTime.substring(11, 16)}`;
      }
    }
    luggageList.value = r;
    console.log(r);
  });
};

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
////////////////////////// 取得購買資訊 //////////////////////////
loginData.value = getSessionTokenData("memberToken");
console.log(loginData.value);
getFlight(loginData.value.MemberId);
</script>
<template>
  <div></div>
  <div v-if="isBookingReady">
    <div v-if="airFlightList">
      <el-card
        style="max-width: 480px; font-size: 16px"
        v-for="airFlight in airFlightList"
        :key="airFlight"
        class="flightCard mb-2"
        @click="clickAirFlightChoose(airFlight.id)"
        ><div class="">
          <div class="pl-5 pb-2" style="border-bottom: 1px solid #aaa">
            航班代號 {{ airFlight.flightCode }}
          </div>
          <div class="row pt-2">
            <div class="col-5 text-center">
              {{ airFlight.departureAirport }}<br />{{
                airFlight.scheduledDeparture.substring(0, 10)
              }}<br />{{ airFlight.scheduledDeparture.substring(11, 16) }}
            </div>
            <div class="col-2 text-center m-auto">
              <i
                class="fa-solid fa-arrow-right m-auto"
                style="font-size: 20px"
              ></i>
            </div>
            <div class="col-5 text-center">
              {{ airFlight.arrivalAirport }}<br />{{
                airFlight.scheduledArrival.substring(0, 10)
              }}<br />{{ airFlight.scheduledArrival.substring(11, 16) }}
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog
      v-model="ticketDetailDialog"
      width="70%"
      title="訂單明細"
      append-to-body
      style="max-width: 6500px"
    >
      <div v-if="isTicketInfo">
        <h3 style="max-width: 580px; margin: auto">訂單明細</h3>

        <el-card
          style="max-width: 580px; margin: auto; font-size: 18px"
          class="mb-2 mt-1"
          v-if="ticketDetail"
        >
          <div class="row pb-2">
            <div class="col-3">訂單編號</div>
            <div class="col">{{ ticketDetail.orderNum }}</div>
          </div>
          <div class="row pb-2">
            <div class="col-3">訂購時間</div>
            <div class="col">{{ ticketDetail.orderTime }}</div>
          </div>
          <div class="row pb-2">
            <div class="col">訂單應付金額</div>
            <div class="col" style="text-align: right">
              {{ ticketDetail.totalPayableAmount.toLocaleString() }}元
            </div>
            <div class="col">折抵里程</div>
            <div class="col" style="text-align: right">
              {{ ticketDetail.mileRedemption.toLocaleString() }}里
            </div>
          </div>
          <div class="row pb-2">
            <div class="col">訂單實付金額</div>
            <div class="col" style="text-align: right">
              {{ ticketDetail.actualPaidAmount.toLocaleString() }}元
            </div>

            <div class="col">產生里程</div>
            <div class="col" style="text-align: right">
              {{ ticketDetail.totalGeneratedMile.toLocaleString() }}里
            </div>
          </div>
        </el-card>
      </div>

      <div v-if="isPassengerList">
        <h3 style="max-width: 580px; margin: auto">乘客名單</h3>
        <el-card style="max-width: 580px; margin: auto" class="mb-5 mt-1 row"
          ><div class="row">
            <div
              class="flightCard col-5 m-2 p-2"
              v-for="ticketDetail in ticketDetailList"
              :key="ticketDetail"
              @click="
                clickPassengerChoose(ticketDetail.ticketInvoicingDetailId)
              "
              style="border: 2px solid #ddd"
            >
              <div class="pl-5 pb-2">
                {{ ticketDetail.firstName }} {{ ticketDetail.lastName }}
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </el-dialog>

    <el-dialog
      v-model="bookingDialog"
      title="行程資訊"
      append-to-body
      width="80%"
    >
      <div class="mb-50" v-if="bookingManagement">
        <el-card style="max-width: 800px; margin: auto; font-size: 20px">
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
                }}<br />{{
                  bookingManagement.scheduledDeparture.substring(11, 16)
                }}
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
                }}<br />{{
                  bookingManagement.scheduledArrival.substring(11, 16)
                }}
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
    </el-dialog>
  </div>
  <div v-else>目前無已完成的行程</div>
</template>
<style scoped>
.flightCard {
  cursor: pointer;
}
</style>
