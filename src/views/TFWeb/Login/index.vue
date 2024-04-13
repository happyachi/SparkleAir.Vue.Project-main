<script setup>
import { ref, watch } from "vue";
import loginComponents from "@/components/tfWebComponents/loginComponents.vue";
import ChooseTicketComponent from "@/components/tfWebComponents/chooseTicketComponent.vue";
import { getSessionTokenData, parseJwt } from "@/utils/sessionHelper";
import { useTfLoginStore } from "@/stores/tfLoginStore";
import { addJwtTokenData } from "@/apis/helperApi";
import { useRouter } from 'vue-router';

const router = useRouter();

const tfLoginStore = useTfLoginStore();

//////////////////////////element puls //////////////////////////
const airFlightDialog = ref(false);
const ticketDetailDialog = ref(false);
const noAirFlightDialog = ref(false);

//////////////////////////這是監聽會員登入//////////////////////////
// 事後改變的
const loginData = ref();
watch(
  () => tfLoginStore.TfLoginInfo,
  (newValue, oldValue) => {
    if (
      tfLoginStore.TfLoginInfo != null ||
      tfLoginStore.TfLoginInfo != undefined
    ) {
      loginData.value = getSessionTokenData("TFLoginToken");
      // 登入後每秒確認一次ticket Token是否過期，過期的話就自動登出
      if (loginData.value != null) {
        if (loginData.value.MemberId) {
          if (!loginData.value.TicketDetailId) {
            getFlight(loginData.value.MemberId);
          }

          // airFlightDialog.value = true;
          console.log(true);
        } else {
          console.log(false);
        }
      }
    }
  }
);

//////////////////////////選擇航班區//////////////////////////
import { GetAirFlightListByMemberId } from "@/apis/TicketApi.js";

const airFlightList = ref();
const getFlight = async (memberId) => {
  // airFlightList.value = await GetAirFlightListByMemberId(memberId);
  airFlightList.value = await GetAirFlightListByMemberId(memberId);

  if (airFlightList.value.length == 0) {
    // 如果回傳是空陣列
    noAirFlightDialog.value = true;
    //console.log(airFlightList.value, 123);
  } else {
    // 如果回傳有資料
    airFlightDialog.value = true;
    //console.log(airFlightList.value);
  }
};
//////////////////////////click航班//////////////////////////
const clickAirFlightChoose = (flightId) => {
  ticketDetailDialog.value = true;
  getTicketDetailList(loginData.value.MemberId, flightId);
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
  if (airFlightList.value.length == 0) {
    // 如果回傳是空陣列
    ticketDetailDialog.value = true;
  } else {
    // 如果回傳有資料
    ticketDetailDialog.value = true;
  }
};
//////////////////////////click乘客//////////////////////////
const clickPassengerChoose = async (ticketsDetailId) => {
  let obj = {
    TicketDetailId: ticketsDetailId,
    FlightCode: ticketDetailList.value.filter(
      (x) => x.ticketsDetailId == ticketsDetailId
    )[0].flightCode,
    FirstName: ticketDetailList.value.filter(
      (x) => x.ticketsDetailId == ticketsDetailId
    )[0].firstName,
    LastName: ticketDetailList.value.filter(
      (x) => x.ticketsDetailId == ticketsDetailId
    )[0].lastName,
    TicketNum: ticketDetailList.value.filter(
      (x) => x.ticketsDetailId == ticketsDetailId
    )[0].ticketNum,
    DepartureTime: ticketDetailList.value.filter(
      (x) => x.ticketsDetailId == ticketsDetailId
    )[0].departureTime,
    BookRef: ticketDetailList.value.filter(
      (x) => x.ticketsDetailId == ticketsDetailId
    )[0].bookRef,
  };
  console.log(obj);

  let token = sessionStorage.getItem("TFLoginToken");

  const responseToken = await addJwtTokenData(token, obj);
  console.log(responseToken.token);
  sessionStorage.setItem("TFLoginToken", responseToken.token);
  let parseToken = parseJwt(responseToken.token);
  tfLoginStore.TfLoginInfo = parseToken;
  airFlightDialog.value = false;
  ticketDetailDialog.value = false;
  tfLoginStore.isLoginComponent = false;
  console.log(parseToken);
  //TicketDetailId
  const ticketDetailId = parseToken.TicketDetailId;
  sessionStorage.setItem("TicketDetailId", ticketDetailId);
};



//////////////////////////以會員身分繼續//////////////////////////
const useMember = () => {
  airFlightDialog.value = false;
  tfLoginStore.isLoginComponent = false;
};

//////////////////////////登出//////////////////////////
const logoutMethod = () => {
  console.log(1);
  tfLoginStore.clearLoginInfo();
  console.log(1);
  sessionStorage.removeItem("TFLoginToken");
  console.log(1);
  noAirFlightDialog.value = false;
  airFlightDialog.value = false;
  console.log(1);
};
</script>

<template>
  <loginComponents></loginComponents>

  <!-- <ChooseTicketComponent></ChooseTicketComponent> -->
  <el-dialog v-model="airFlightDialog" title="請選擇要登入的訂票代號紀錄">
    <span>預定免稅品，請選擇航班</span>
    <br />
    <span>或以會員身分(無法預訂商品)，繼續使用</span>
    <br />
    <br />

    <div v-if="airFlightList">
      <el-card style="max-width: 480px" v-for="airFlight in airFlightList" :key="airFlight" class="flightCard mb-2"
        @click="clickAirFlightChoose(airFlight.id)">
        <div class="">
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
              <i class="fa-solid fa-arrow-right m-auto" style="font-size: 20px"></i>
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

    <div class="col"></div>

    <el-dialog v-model="ticketDetailDialog" width="500" title="請選擇本次登入乘客" append-to-body>
      <span>請選擇本次登入乘客</span>
      <el-card style="max-width: 480px" v-for="ticketDetail in ticketDetailList" :key="ticketDetail"
        class="flightCard mb-2 mt-1" @click="clickPassengerChoose(ticketDetail.ticketsDetailId)">
        <div class="">
          <div class="pl-5 pb-2">
            {{ ticketDetail.firstName }} {{ ticketDetail.lastName }}
          </div>
          <!-- <div class="row pt-2">
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
          </div> -->
        </div>
      </el-card>
    </el-dialog>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="useMember">以會員身分繼續</el-button>
        <el-button type="primary" @click="logoutMethod"> 重新登入 </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 您目前無預定航班 -->
  <el-dialog v-model="noAirFlightDialog" title="您目前無預定航班">
    <span>預定免稅品，請以訂票代號登入</span>
    <br />
    <span>或以會員身分，繼續使用</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="logoutMethod"> 重新登入 </el-button>
        <el-button type="primary" @click="noAirFlightDialog = false">以會員身分繼續</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.flightCard {
  cursor: pointer;
}
</style>
