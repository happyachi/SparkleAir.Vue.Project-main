<template>
  <div class="center-container">
    <el-row class="center-row">
      <el-col :sm="24" :lg="24">
        <el-result icon="success" title="付款成功!" sub-title="頁面跳轉中.....">
          <template #extra>
            <!-- <el-button type="primary"></el-button> -->
          </template>
        </el-result>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useMemberStore } from "@/stores/members";
import LoginInMile from "@/components/flightWebComponents/LoginInMile.vue";
import { getSessionTokenData } from "@/utils/sessionHelper";
import { ref } from "vue"; //彩珊金流
import { useRoute } from "vue-router"; //彩珊金流
import { onUpdated, watch } from "vue";
import { useTicketsStore } from "@/stores/ticketsStore";
import Payradio from "@/components/flightWebComponents/Payment/Payradio.vue";
import { usePaymentStore } from "@/stores/payment.js";
import axios from "axios";
import ticketLogin from "@/components/flightWebComponents/Tickets/ticketLogin.vue";

const TicketinvoicingId = ref(); //等奇哥!!!!!!!!!!!!
const LuggageOrderSession = ref(); //存託運的session
const route = useRoute(); //彩珊金流
const paymentId = route.params.id; //彩珊金流
console.log(paymentId); //顯示金流付款id

const isLoginMmember = ref(false);

const memberStore = useMemberStore();
const memberData = ref(getSessionTokenData("memberToken")); //奇哥取會員
const memberId = ref();
const ticketsStore = useTicketsStore();
const ticketDetailId = ref();
const isLogin = ref(false);

const ticketsTokenData = ref(getSessionTokenData("ticketsToken"));
if (
  ticketsTokenData.value != null &&
  ticketsTokenData.value.TicketDetailId != null &&
  ticketsTokenData.value.TicketDetailId != undefined
) {
  isLogin.value = true;
}
console.log(ticketsTokenData.value);

if (ticketsTokenData.value != null || ticketsTokenData.value != undefined) {
  TicketinvoicingId.value = ticketsTokenData.value.TicketInvoicingDetailsId;
}

onUpdated(() => {
  if (ticketsTokenData.value != null || ticketsTokenData.value != undefined) {
    TicketinvoicingId.value = ticketsTokenData.value.TicketInvoicingDetailsId;
  }
});

const membersTokenData = ref(getSessionTokenData("memberToken"));
if (
  membersTokenData.value != null &&
  membersTokenData.value.MemberId != null &&
  membersTokenData.value.MemberId != undefined
) {
  isLoginMmember.value = true;
}
console.log(membersTokenData.value);

// 監聽是否登入
watch(
  () => memberStore.memberInfo,
  (newValue, oldValue) => {
    console.log(memberStore.memberInfo);
    memberId.value = memberStore.memberInfo;
    if (memberId.value != null || memberId.value != undefined) {
      //getMemberId();
      isLoginMmember.value = true;
    }
    if (memberId.value == null || memberId.value == "") {
      isLoginMmember.value = false;
    }
  }
);

///////////////////////實作 靠訂位+名字登入 結束///////////////////////

let memberid = ref();
if (memberData.value != null && memberData.value != undefined) {
  memberid.value = memberData.value.MemberId; //奇哥要再改!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

// //取得某位的託運 預定價
// const loadprice = async (TicketinvoicingId) => {
//     const res = await fetch(`http://localhost:8889/api/LuggageOrder/GetLuggageprice/${TicketinvoicingId}`) //先設編號id 4
//     const data = await res.json()
//     bookingprice.value = data
//     console.log(bookingprice.value);
// }
// loadprice(TicketinvoicingId.value)

//////---------- 抓 購買託運的session------------
console.log(sessionStorage.getItem("LuggagePurchase")); //抓session中的 MileagePurchase
LuggageOrderSession.value = sessionStorage.getItem("LuggagePurchase");
const parsedValue = JSON.parse(LuggageOrderSession.value); //轉成json
console.log(parsedValue.price); //顯示轉json的session的值
console.log(parsedValue.amount); //顯示轉json的session的值

/////////////////--購買託運的session 結束-------------

const DiscountMileSession = ref();
/////////----------抓折抵里程的session
console.log(sessionStorage.getItem("DiscountMile"));

DiscountMileSession.value = sessionStorage.getItem("DiscountMile"); //放btn 裡面
const dismileValue = JSON.parse(DiscountMileSession.value);
const dismileage = dismileValue[0].mileage;
console.log(dismileage);

/////////////////--折抵里程的session 結束 --------------------

///////--------呼叫LuggageCreate API用-----------------------------------
const LuggageOrder = ref(); //接收託運購買表傳回的 id
//const LuggageBody = ref() //裝傳入託運購買表的資料

const LoadLuggageOrderCreate = async (Luggage) => {
  console.log(Luggage);
  const response = await fetch(
    "http://localhost:8889/api/LuggageOrder/Create",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      //別忘了把主體参數轉成字串，否則資料會變成[object Object]，它無法被成功儲存在後台
      body: JSON.stringify(Luggage),
    }
  );
  const luggagedata = await response.json();
  //LuggageOrder.value = miledata

  console.log(luggagedata); //顯示購買託運訂單表是否產生
};
///////////////////////////呼叫LuggageCreate 結束--------------------------

/////////////////--------呼叫discountmileagecreate API用----------------------
const Discountmileageorder = ref(); //接收託運購買表傳回的 id
//const Discountmileagebody = ref() //裝傳入里程折抵表的資料

//折抵里程表、里程明細的create
const loaddiscountmileagecreate = async (data) => {
  console.log(data);

  const response = await fetch(
    "http://localhost:8889/api/MileageDetail/DiscountMileCreate",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      //別忘了把主體参數轉成字串，否則資料會變成[object Object]，它無法被成功儲存在後台
      body: JSON.stringify(data),
    }
  ).catch((err) => {
    //判斷錯誤訊息
    console.log("ERROR:", err);
  });
  const Discountmiledata = await response.json();
  //Discountmileageorder.value = Discountmiledata
  console.log(Discountmiledata);
};
/////////////////--------呼叫discountmileagecreate API 結束----------------------

//丟入購買託運訂購表的值
const LuggageBody = {
  TicketInvoicingDetailId: TicketinvoicingId.value,
  Amount: parsedValue.amount,
  Price: parsedValue.price,
  TransferPaymentsId: paymentId,
  FlightCode: "",
  LuggageNum: "",
  OrderStatus: "",
  TicketInvoicingDetailName: "",
  //"MemberId":memberid.value  //取得目前會員
};

// amount.value = ""; //要讓輸入欄位空白 要放這 不然會失敗
LoadLuggageOrderCreate(LuggageBody); //執行

const Discountmileagebody = {
  Id: 1,
  TotalMile: 1,
  OriginalMile: 1,
  FinalMile: 1,
  MileValidity: "2022-03-28T10:00:00.000Z",
  MileReason: "里程折抵",
  OrderNumber: "",
  ChangeTime: "2022-03-28T10:00:00.000Z",
  ChangeMile: dismileage * -1, //抓session中的值,並換成負號????????????????????????????????????????
  MermberIsd: memberid.value,
};

loaddiscountmileagecreate(Discountmileagebody); //執行儲存折抵里程表、里程明細的紀錄

setTimeout(() => {
  document.location.href = "/BookingManagement"; //轉跳到行程管理
}, 4000);
//document.location.href = "/"; //轉跳回首頁
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  /* 水平置中 */
  align-items: center;
  /* 垂直置中 */
  height: 100vh;
  /* 使容器撐滿整個畫面 */
  max-width: 100%;
  /* 最大寬度100% */
  max-height: 100%;
  /* 最大高度100% */
}

.center-row {
  width: 100%;
  /* 確保內容可以適應父元素的寬度 */
}

.icon-success {
  font-size: 500px !important;
  /* 设置图标的字体大小 */
}

.el-result__title {
  font-size: 50px;
}
</style>
