<script setup>
import { ref, computed, watch } from 'vue';
import TitleBanner from '@/components/flightWebComponents/titleBanner.vue';
//import DiscountMile from '@/components/flightWebComponents/Mileage/DiscountMile.vue';//引用顯示DiscountMile頁面
import { getSessionTokenData } from "@/utils/sessionHelper"; //奇哥會員
import Payradio from '@/components/flightWebComponents/Payment/Payradio.vue';
import { usePaymentStore } from "@/stores/payment.js";
import { PriceFormat } from "@/views/flightWeb/AirFlights/components/flightJS/CabinHelper" //小歐價錢格式
import axios from 'axios';


const paymentStore = usePaymentStore();


const options = ref(['PayPal', '綠界科技', 'VISA卡']);
const selectedOption = ref('');

const memberData = ref(getSessionTokenData("memberToken"));//奇哥會員

const memberId = ref();

const getMemberId = () => {
    memberData.value = getSessionTokenData("memberToken")
    memberId.value = memberData.value.MemberId; //在這裡
  console.log(memberId.value);
};

if (
  memberData.value != null &&
  memberData.value != undefined &&
  memberData.value.MemberId
) {
  getMemberId();
}


const TitleBannerTitle = ref({
    title1: '里程購買',
    title2: '',
});


const mileage = ref(0);
const price = ref(0);
const price1 = computed(() => price.value ) //變成隨時監聽計算
const btnisVisible = ref(false);
const alert = ref();

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

//計算里程金錢與按鈕消失
const salary = () => {
    var money = mileage.value * 9
    price.value = money
    if (mileage.value <= 0) {
        btnisVisible.value = false; //隱藏購買按鈕
        price.value = 0;
        mileage.value="";
        alert.value = "不能購買負數!!"
    } else {
        btnisVisible.value = true; //顯示購買按鈕
        alert.value = ""
    }
}

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


//呼叫mileagecreate
const mileageorder = ref() //接收里程購買表傳回, 是否購買成功
const mileagebody = ref() //裝傳入里程購買表的資料

const loadmileagecreate = async () => {
    const response = await fetch("http://localhost:8889/api/MileageOrder", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        //別忘了把主體参數轉成字串，否則資料會變成[object Object]，它無法被成功儲存在後台
        body: JSON.stringify(mileagebody.value)
    })
    const miledata = await response.json()
    mileageorder.value = miledata

    console.log(mileageorder.value);  //顯示購買里程訂單表是否產生

}

//loadmileagecreate()


//觸發購買按鈕
const buyclick = async () => {

    console.log(price.value); //顯示購買里程金額
    //丟入金流交易的值
    pay.value = {
        "paymentMethod": "test",
        "paymentAmount": price.value,
    }
    //await loadtransfer() //執行



    //丟入購買里程表的值
    mileagebody.value = {
        "Amount": mileage.value,
        "Price": price.value,
        "TransferPaymentId": transfer.value,
        "MemberId": memberId.value  //取得目前會員
    }

    //mileage.value = ""; //要讓輸入欄位空白 要放這 不然會失敗
    //await loadmileagecreate()//執行

    const passSelect = sessionStorage.getItem("payMethod");
    console.log(passSelect);
    paymentStore.selectedOption = passSelect;

    if (passSelect === 'PayPal') {
        // 渲染 PayPal 按钮


    } else if (passSelect === '綠界科技') {

        paymentStore.ecPayMethod(pay.value.paymentAmount, "里程購買", "GetMileOrder");

    }else if (passSelect === 'VISA卡') {

paymentStore.testMethod(pay.value.paymentAmount, "里程購買", "GetMileOrder");

}

}

////////-----------存session 的部分---------------------
//用於存session 的 Luggage 物件
const Mileageorder = computed(() => ({
    price: price1.value,
    amount: mileage.value,
}));
//監聽 session
watch(Mileageorder, (Value) => {
    //存成session
    sessionStorage.setItem("MileagePurchase", JSON.stringify(Value)); //Luggagepurchase 是session中顯示名字
    //   DiscountmileMileage.value =JSON.parse(DiscountMileSession.value).mileage;

});
////////-----------存session 的部分結束---------------------

const dialog = ref(true)

///////////////////////實作 靠訂位+名字登入///////////////////////
import { useMemberStore } from "@/stores/members";
import LoginInMile from "@/components/flightWebComponents/LoginInMile.vue";

const memberStore = useMemberStore();

const isLogin = ref(false);

console.log(memberId.value);

const membersTokenData = ref(getSessionTokenData("memberToken"));
if (
  membersTokenData.value != null &&
  membersTokenData.value.MemberId != null &&
  membersTokenData.value.MemberId != undefined
) {
  isLogin.value = true;
}
console.log(membersTokenData.value);

// 監聽是否登入
watch(
  () => memberStore.memberInfo,
  (newValue, oldValue) => {
    console.log(memberStore.memberInfo)
    //memberId.value = memberStore.memberInfo;
    if (memberStore.memberInfo != null || memberStore.memberInfo != undefined) {
      getMemberId();
      isLogin.value = true;
    }
    if (memberStore.memberInfo == null || memberStore.memberInfo == "") {
      isLogin.value = false;
    }
  }
);
</script>



<template>
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
                                    <ul class="nav list-unstyled form-wizard-steps clearfix">
                                        <li class="nav-item activated">
                                            <button class="nav-link">
                                                <span class="number">1</span><i class="fa-regular fa-circle-check"
                                                    style="font-size: 20px"></i>
                                            </button>
                                            <h5 class="color-black">
                                                Your Selection
                                            </h5>
                                        </li>
                                        <li class="nav-item active">
                                            <button class="nav-link">
                                                <span class="number">2</span><i class="fa-regular fa-circle-check"
                                                    style="font-size: 20px"></i>
                                            </button>
                                            <h5 class="color-black">
                                                Your Details
                                            </h5>
                                        </li>
                                        <li class="nav-item">
                                            <button class="nav-link">
                                                <span class="number">3</span><i class="fa-regular fa-circle-check"
                                                    style="font-size: 20px"></i>
                                            </button>
                                            <h5 class="color-black">
                                                Final Step
                                            </h5>
                                        </li>
                                    </ul>
                                </div>
                                <div class="wizard-content overflow-visible mb-24">
                                    <fieldset id="step-2" class="tab-pane show wizard-fieldset p-0">
                                        <div id="wizardValidator">
                                            <div class="detail-form mb-32">
                                                <h4 class="black p-0 mb-40">
                                                   <b> 購買里程數:　<span class="text-danger">{{ alert }}</span> </b>
                                                </h4>
                                                <div class="row">
                                                    <div class="col-sm-5 mb-40">
                                                        <input v-model="mileage" v-on:keyup="salary" type="text"
                                                            class="form-control wizard-required" id="first-name"
                                                            name="first-name" placeholder="請輸入里程" />
                                                        <div class="wizard-form-error"></div>
                                                    </div>
                                                    <h4>
                                                        <b>
                                                        <div>注意事項</div>
                                                       <span>-------------------------------------------------------------------------------------------------------</span>
                                                        <li>哩程售價：1 哩=TWD 9</li><br>
                                                        <li>同一會員卡號購買哩程及加值哩程每曆年合計最多購買150,000哩。</li><br>
                                                        <li>購買哩程或加值哩程之哩程不得與他人轉讓之哩程合併使用。</li><br>
                                                        <li>購買哩程或加值哩程之哩程禁止出售予他人使用。</li>
                                                        </b>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="margin-bottom:50px ;">
                                            <div class="detail-form">
                                                <Payradio></Payradio>
                                                <div></div>
                                            </div>
                                        </div>
                                        <div class="d-flex gap-24">
                                            <a href="javascript:;" id="btn" v-if="btnisVisible" @click="open3" v-on:click="buyclick"
                                                class="form-wizard-next-btn cus-btn w-100">
                                                購買
                                            </a>
                                        </div>
                                    </fieldset>
                                    <!-- 里程折抵 -->
                                    <!-- <DiscountMile class="mt-2"></DiscountMile> -->
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
                                        <h4 class="color-black">購買里程:</h4>
                                        <p class="dark-gray">
                                        <h4>{{ mileage }}</h4>
                                        </p>
                                    </div>
                                    <h5 class="color-black">${{ PriceFormat(price1) }}</h5>
                                </div>

                                <div class="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 class="color-black">Total</h4>
                                    </div>
                                    <h4 class="color-black">${{ PriceFormat(price1) }}</h4>
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
    <LoginInMile v-show="!isLogin"></LoginInMile>
</template>

<style scoped></style>
