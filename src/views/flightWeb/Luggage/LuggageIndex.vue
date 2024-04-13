<script lang="ts" setup>

import { ref, computed,onMounted,watchEffect} from 'vue';

import TitleBanner from "@/components/flightWebComponents/titleBanner.vue";
import DiscountMile from "@/components/flightWebComponents/Mileage/DiscountMile.vue"; //引用畫面
import { ElMessage, ElMessageBox } from 'element-plus'//引用動畫1
import type { Action } from 'element-plus'//引用動畫1
import { PriceFormat } from "@/views/flightWeb/AirFlights/components/flightJS/CabinHelper" //小歐價錢格式



//////////////////////////////////////////////////////////////////////////////////////////
//以下為登入區塊

// 實作 靠訂位+名字登入
import { onUpdated, watch } from "vue";
import { useTicketsStore } from "@/stores/ticketsStore";
import { getSessionTokenData } from "@/utils/sessionHelper";//奇哥會員
import Payradio from '@/components/flightWebComponents/Payment/Payradio.vue';
import { usePaymentStore } from "@/stores/payment.js";
import axios from 'axios';

const paymentStore = usePaymentStore();
const options = ref(['PayPal', '綠界科技', 'VISA卡']);
const selectedOption = ref('');

import ticketLogin from '@/components/flightWebComponents/Tickets/ticketLogin.vue';

const memberData = ref(getSessionTokenData("memberToken")); //奇哥取會員

const ticketsStore = useTicketsStore();
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
}
console.log(ticketsTokenData.value);

// 監聽是否登入
watch(
    () => ticketsStore.ticketsInfo,
    (newValue, oldValue) => {
        console.log(ticketsStore.ticketsInfo);
        ticketDetailId.value = ticketsStore.ticketsInfo;
        if (ticketDetailId.value != null || ticketDetailId.value != undefined) {
            TicketinvoicingId.value = ticketsStore.ticketsInfo.TicketInvoicingDetailsId//重新給TicketinvoicingId附值
            loadprice(TicketinvoicingId.value)//重新呼叫 loadprice ,讓luggageIndex頁面載入登入後,就可以抓到值
            isLogin.value = true;
        }
        if (ticketDetailId.value == null || ticketDetailId.value == "") {
            isLogin.value = false;
        }
    });


//以上為登入區塊

//////////////////////////////////////////////////////////////////////////////////////////

///////////////////////實作 靠訂位+名字登入///////////////////////
import { useMemberStore } from "@/stores/members";
import LoginInMile from "@/components/flightWebComponents/LoginInMile.vue";

const memberStore = useMemberStore();
const memberId = ref();
const isLoginMmember = ref(false);

//console.log(memberId.value);

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


let memberid =ref();
if(memberData.value != null && memberData.value != undefined){
  memberid.value = memberData.value.MemberId //奇哥要再改!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}



//------element plus 的框框3
const open3 = () => {

    ElMessage({
        message: '加購成功',
        type: 'success',
        duration: 3000,
        showClose: true,

    })
}
//-----------------------------------

//element plus 的框框1
// const open = () => {
//   ElMessageBox.alert('This is a message', 'Title', {
//     // if you want to disable its autofocus
//     // autofocus: false,
//     confirmButtonText: 'OK',
//     callback: (action: Action) => {
//       ElMessage({
//         type: 'info',
//         message: `action: ${action}`,
//       })
//     },
//   })
// }


const TitleBannerTitle = ref({
    title1: '託運加購',
    title2: '',
});


const amount = ref();
const bookingprice = ref(0);
const btnisVisible = ref(true);
const alert = ref();

const TicketinvoicingId = ref(); //等奇哥!!!!!!!!!!!!
if (ticketsTokenData.value != null || ticketsTokenData.value != undefined) {
    TicketinvoicingId.value = ticketsTokenData.value.TicketInvoicingDetailsId
}
const showmoney = ref();

onUpdated(() => {
    if (ticketsTokenData.value != null || ticketsTokenData.value != undefined) {
        TicketinvoicingId.value = ticketsTokenData.value.TicketInvoicingDetailsId
    }

})

//取得某位的託運 預定價
const loadprice = async (TicketinvoicingId) => {
    const res = await fetch(`http://localhost:8889/api/LuggageOrder/GetLuggageprice/${TicketinvoicingId}`) //先設編號id 4
    const data = await res.json()
    bookingprice.value = data
    console.log(bookingprice.value);
}
loadprice(TicketinvoicingId.value)


//const btn = document.querySelctor("#btn");

//計算數量金錢與按鈕消失
const salary = () => {
    showmoney.value = amount.value * bookingprice.value
    //   bookingprice.value = money
    if (amount.value < 0) {
        btnisVisible.value = false; //隱藏購買按鈕
        alert.value = "不能購買負數!!"
        showmoney.value = 0
        amount.value = 0
    } else if (amount.value > 5) {
        btnisVisible.value = false; //隱藏購買按鈕
        alert.value = "最多加購5件"
        showmoney.value = 0
        amount.value = 0

    } else {
        btnisVisible.value = true; //顯示購買按鈕
        alert.value = ""
    }
}

//監聽 當按input按鈕,價錢可以及時改變
watch(amount, (newValue) => {  //amount 是上面設定的ref()
    //存成session
    showmoney.value = amount.value * bookingprice.value
    console.log(newValue);
});



//呼叫金流 取付款id
const pay = ref()  //裝傳入金流的資料
const transfer = ref() //接收金流傳回的 id

const loadtransfer = async () => {
    const response = await fetch("http://localhost:8889/api/Transfer", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        //別忘了把主體参數轉成字串，否則資料會變成[object Object]，它無法被成功儲存在後台
        body: JSON.stringify(pay.value)
    })
    const data = await response.json()
    transfer.value = data
    console.log(transfer.value); //顯示接收付款id
}
//loadtransfer()


//呼叫LuggageCreate用
const LuggageOrder = ref() //接收託運購買表傳回的 id
const LuggageBody = ref() //裝傳入託運購買表的資料

const LoadLuggageOrderCreate = async () => {
    const response = await fetch("http://localhost:8889/api/LuggageOrder/Create", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        //別忘了把主體参數轉成字串，否則資料會變成[object Object]，它無法被成功儲存在後台
        body: JSON.stringify(LuggageBody.value)
    })
    const miledata = await response.json()
    LuggageOrder.value = miledata

    console.log(LuggageOrder.value);  //顯示購買託運訂單表是否產生
}


//discountmileagecreate
const Discountmileageorder = ref() //接收託運購買表傳回的 id
const Discountmileagebody = ref() //裝傳入里程折抵表的資料

//折抵里程表、里程明細的create
const loaddiscountmileagecreate = async () => {
    console.log(Discountmileagebody.value);

    const response = await fetch("http://localhost:8889/api/MileageDetail/DiscountMileCreate", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        //別忘了把主體参數轉成字串，否則資料會變成[object Object]，它無法被成功儲存在後台
        body: JSON.stringify(Discountmileagebody.value)
    }).catch(err => {  //判斷錯誤訊息
        console.log("ERROR:", err);

    })
    const Discountmiledata = await response.json()
    Discountmileageorder.value = Discountmiledata
    console.log(Discountmileageorder.value);
}

const price = ref(parseInt(sessionStorage.getItem("price")) || 0)
const mount = ref(parseInt(sessionStorage.getItem("mount")) || 0)

const LuggagePurchase = ref();
//////-------用於存session 的 Luggage 物件
const Luggage = computed(() => ({
    price: showmoney.value,
    amount: amount.value,
}));

//監聽 session
watch(Luggage, (Value) => {
    //存成session
    sessionStorage.setItem("LuggagePurchase", JSON.stringify(Value)); //Luggagepurchase 是session中顯示名字
    //   DiscountmileMileage.value =JSON.parse(DiscountMileSession.value).mileage;

});
/////////-------用於存session 的 Luggage 物件 結束

const DiscountmileMileage = ref(0); //折抵里程數
const DiscountmilePrice = ref(0);//折抵里程數金額
const TotalPrice = computed(() => {
    console.log(showmoney.value);
    console.log(DiscountmilePrice.value);
    return showmoney.value - DiscountmilePrice.value || 0
})



const DiscountMileSession = ref() //裝里程折抵的session

onMounted(() => {

   
});





//觸發購買按鈕
const buyclick = async () => {
    console.log(showmoney.value); //顯示購買里程金額
    //丟入金流交易的值
    pay.value = {
        "paymentMethod": "test",
        "paymentAmount": TotalPrice.value,
    }
    //await loadtransfer() //執行

    console.log(TotalPrice.value); //顯示折抵後的總金額



    //丟入購買託運訂購表的值
    LuggageBody.value = {
        "TicketInvoicingDetailId": TicketinvoicingId.value,
        "Amount": amount.value,
        "Price": showmoney.value, //todo要判斷是否有折抵,沒有就是showmoney.value,有就是totalprice.value ??????????????????????????????
        "TransferPaymentsId": transfer.value,
        'FlightCode': '',
        'LuggageNum': '',
        'OrderStatus': '',
        'TicketInvoicingDetailName': ''
        //"MemberId":memberid.value  //取得目前會員
    }

    //amount.value = ""; //要讓輸入欄位空白 要放這 不然會失敗
    // await LoadLuggageOrderCreate()//執行
    console.log(JSON.stringify(LuggageBody.value));
    //showmoney.value = ""


    /////////----------抓折抵里程的session
    console.log(sessionStorage.getItem('DiscountMile'));

    DiscountMileSession.value = sessionStorage.getItem('DiscountMile');//放btn 裡面
    const parsedValue = JSON.parse(DiscountMileSession.value);
    const dismileage = parsedValue[0].mileage;
    console.log(dismileage);

    /////////////////--折抵里程的session 結束 --------------------




    Discountmileagebody.value = {
        "Id": 1,
        "TotalMile": 1,
        "OriginalMile": 1,
        "FinalMile": 1,
        "MileValidity": "2022-03-28T10:00:00.000Z",
        "MileReason": "里程折抵",
        "OrderNumber": "",
        "ChangeTime": "2022-03-28T10:00:00.000Z",
        "ChangeMile": dismileage * (-1),   //抓session中的值,並換成負號????????????????????????????????????????
        "MermberIsd": memberid.value,

    }


    const passSelect = sessionStorage.getItem("payMethod");
    console.log(passSelect);
    paymentStore.selectedOption = passSelect;

    if (passSelect === 'PayPal') {
        // 渲染 PayPal 按钮


    } else if (passSelect === '綠界科技') {

       paymentStore.ecPayMethod(pay.value.paymentAmount, "託運加購", "GetLuggageOrder");

    }else if (passSelect === 'VISA卡') {

        paymentStore.testMethod(pay.value.paymentAmount, "託運加購", "GetLuggageOrder")

}
    
    //await loaddiscountmileagecreate()//執行儲存折抵里程表、里程明細的紀錄
    console.log(TotalPrice.value);
}

const dialog = ref(true)





</script>



<template>
    <!-- <abc></abc> -->
    <!-- 這是Title區 -->
    <TitleBanner :title="TitleBannerTitle"></TitleBanner>
    <!-- Main Content Start -->
    <div class="page-content m-0" v-show="isLogin">
        <!-- Flight-Booking Start -->
        <section class="flight-booking" data-sal="slide-up" data-sal-duration="800" data-sal-delay="100"
            data-sal-easing="ease-in-out">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-8">
                        <div class="booking-form">
                            <form action="flight-booking.html" id="flight-form" method="post" role="form"
                                class="contact-form form-wizard">
                                <div class="form-wizard-header">
                                    <!--第二個 title -->
                                    <ul class="nav list-unstyled form-wizard-steps clearfix ul">
                                        <li class="nav-item activated">
                                            <button class="nav-link">
                                                <span class="number">1</span><i class="fa-regular fa-circle-check"
                                                    style="font-size: 20px"></i>
                                            </button>
                                            <h4 class="color-black">
                                                最大託運件數:　5
                                            </h4>
                                        </li>

                                        <li class="nav-item activated">
                                            <button class="nav-link">
                                                <span class="number">4</span><i class="fa-regular fa-circle-check"
                                                    style="font-size: 20px"></i>
                                            </button>
                                            <h4 class="color-black">
                                                預定價:　{{PriceFormat(parseInt(bookingprice))  }}
                                            </h4>
                                        </li>
                                        <li class="nav-item activated">
                                            <button class="nav-link">
                                                <span class="number">5</span><i class="fa-regular fa-circle-check"
                                                    style="font-size: 20px"></i>
                                            </button>
                                            <h4 class="color-black">
                                                原價:　1,500
                                            </h4>
                                        </li>
                                        <li class="nav-item activated">
                                            <button class="nav-link">
                                                <span class="number">5</span><i class="fa-regular fa-circle-check"
                                                    style="font-size: 20px"></i>
                                            </button>
                                            <h4 class="color-black">
                                                航班代號:　SK001
                                            </h4>
                                        </li>

                                    </ul>
                                </div>
                                <div class="wizard-content overflow-visible mb-24">
                                    <fieldset id="step-2" class="tab-pane show wizard-fieldset p-0">
                                        <div id="wizardValidator" class="inputcontainer">
                                            <div class="detail-form mb-32">
                                                <h4 class="black p-0 mb-40">
                                                <b>
                                                    購買託運件數:　<span class="text-danger">{{ alert }}</span>
                                                </b>
                                                </h4>

                                                <div class="row">
                                                    <div class="col-sm-5 mb-40">
                                                        <input v-model="amount" v-on:keyup="salary" type="number"
                                                            max="5" min="0" class="form-control wizard-required"
                                                            id="first-name" name="first-name" placeholder="請輸入託運件數" />
                                                        <div class="wizard-form-error"></div>
                                                    </div>
                                                    <h4>
                                                    <b>
                                                        <div>注意事項</div>
                                                        <span>---------------------------------------------------------------------------------------------------------------------</span>
                                                        
                                                        <li>每位旅客於每一航段可預購一次額外行李額度。</li><br>
                                                        <li>預購基數為1件 (每件預購行李的公斤數以訂位艙等之額度為準)，預購額外行李上限為每位旅客5件。</li><br>
                                                        <li>預購額外行李額度限本人使用，不可轉讓或分享他人使用。</li>
                                                    </b>
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="d-flex gap-24">
                                            <!-- <a
                                                href="javascript:;"
                                                id="btn"
                                                v-if="btnisVisible"
                                                v-on:click="buyclick"
                                                class="form-wizard-next-btn cus-btn w-100 "
                                            >
                                                購買
                                            </a> -->
                                            <!--  -->
                                            <!-- <el-button :plain="true" @click="open3" v-if="btnisVisible"
                                                v-on:click="buyclick" class="form-wizard-next-btn cuss-btn w-100 " :style="{  height: '50px' }">加購</el-button> -->
                                        </div>
                                    </fieldset>
                                    <!-- 里程折抵 --> <!-- 有接收子傳來的東西 -->
                                    <DiscountMile  v-if="isLoginMmember" v-model:mileage="DiscountmileMileage"
                                        v-model:price="DiscountmilePrice" class="mt-10"></DiscountMile>
                                        
                                        <!-- 里程折抵 先確認是否登入 -->
                                    <fieldset v-else id="step-2" class="tab-pane show wizard-fieldset p-0">
                                        <div id="wizardValidator">
                                        <div class="detail-form mb-32">
                                            <h3><strong>里程折抵</strong></h3>
                                            <h4 class="black p-0 mb-40">
                                            使用里程折抵請先登入
                                            </h4>
                                            <LoginInMile ></LoginInMile>
                                        </div>
                                        </div>
                                    </fieldset>

                                    <div style="margin-bottom: 50px;">
                                        <div class="detail-form">
                                            <Payradio></Payradio>
                                            <div></div>
                                        </div>
                                    </div>
                                    
                                    <el-button :plain="true" @click="open3" v-if="btnisVisible" v-on:click="buyclick"
                                        class="form-wizard-next-btn cuss-btn w-100 "
                                        :style="{ height: '50px' }">加購</el-button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!--這裡是price summary-->
                    <div class="col-xl-4 mb-lg-0 mb-32">
                        <div class="flight-booking-detail light-shadow">
                            <div class="flight-title">
                                <h4 class="color-white">Price Summary</h4>
                            </div>
                            <div class="box bg-white p-24">
                                <div class="d-flex align-items-center justify-content-between mb-24">
                                    <div>
                                        <h4 class="color-black">託運件數:</h4>
                                        <p class="dark-gray">
                                        <h4>{{ amount }}</h4>
                                        </p>
                                    </div>
                                    <h5 class="color-black">${{PriceFormat(parseInt(showmoney))  }}</h5>
                                </div>

                                <div class="d-flex align-items-center justify-content-between mb-24">
                                    <div>
                                        <h4 class="color-black">折抵里程:</h4>
                                        <p class="dark-gray">
                                        <h4>{{ DiscountmileMileage }}</h4>
                                        </p>
                                    </div>
                                    <h5 class="color-black">${{PriceFormat(parseInt(DiscountmilePrice))}}</h5>
                                </div>

                                <div class="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 class="color-black">Total</h4>
                                    </div>
                                    <h4 class="color-black">${{PriceFormat(parseInt(TotalPrice)) }}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Flight-Booking End -->
    </div>
    <!-- Main Content End -->

    <!-- 這是登入區塊開始 -->
    <ticketLogin v-show="!isLogin" :title="componentsInputData.title" :introduction="componentsInputData.introduction">
    </ticketLogin>
    <!-- 這是登入區塊結束 -->

</template>

<style scoped>
/* 刪除title 的線條 */
.flight-booking .booking-form .form-wizard-header .nav .nav-item::after {
    content: "";
    background: #c6cbd2;
    position: absolute;
    top: 34px;
    left: 106%;
    width: 0px;
    height: 2px;
    z-index: 99;
}

/* 按鈕樣式 */
.cuss-btn {
    font-family: "AustinBold", "Austin";
    font-size: 16px;
    font-weight: 600;
    line-height: 160%;
    letter-spacing: 0.32px;
    padding: 14px 22px;
    display: flex;
    justify-content: center;
    width: fit-content;
    align-items: center;
    gap: 8px;
    transition: all 0.5s ease-in-out;
    border-radius: 10px;
    border: none;
    background: #dcbf85;
    box-shadow: 4px 4px 10px 0px rgba(77, 115, 252, 0.3);
    color: #f8f8ff;
}
</style>
