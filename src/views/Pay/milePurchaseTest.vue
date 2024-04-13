<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
//  import paypalCheckout from '@/views/Pay/paypalCheckout.js'
import PayRadioButton from "@/components/flightWebComponents/Payment/Payradio.vue"

// import payJS from '@/views/Pay/pay.js'
// import layoutHeader from "@/views/flightWeb/Layout/components/layoutHeader.vue";
import TitleBanner from "@/components/flightWebComponents/titleBanner.vue";
//import ecPayMethod from '@/components/flightWebComponents/Payment/ecpay.js';
//import { ecpayGetData } from '@/components/flightWebComponents/Payment/ecpay.js';
import { usePaymentStore } from "@/stores/payment.js";
import ecPayMethod from "@/components/flightWebComponents/Payment/ecpay";
import returnPay from "@/views/Pay/returnPay.vue";


const TitleBannerTitle = ref({
    title1: '里程購買',
    title2: '',
});
const options = ref(['PayPal', '綠界科技', 'VISA卡']);
const selectedOption = ref('');



// PayPal Payments SDK 初始化
onMounted(() => {
    // 在組件渲染後加載 PayPal Payments SDK
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=test&currency=TWD";
    //script src = "@/apis/payServer"; // 將路徑替換為實際的檔案路徑
    script.async = true;
    // script.onload = () => {
    //     paypal.HostedButtons({
    //         hostedButtonId: "6YBNSYU9PX6GL",
    //     }).render("#paypal-container-6YBNSYU9PX6GL");
    //     document.body.appendChild(script);


    // }
});

const paymentStore = usePaymentStore();


onMounted(() => {
    // paymentStore.ecPayMethod().then(() => {
    //     // 完成后进行 console.log
    //     const proxyObject = paymentStore.ecpayGetData
    //     for (const key in proxyObject) {
    //         if (Object.hasOwnProperty.call(proxyObject, key)) {
    //             const value = proxyObject[key];
    //             console.log(`${key}: ${value}`);
    //         }
    //     }
    //     //console.log(paymentStore.ecpayGetData); // 直接輸出 Proxy 物件，以檢查是否包含了目標物件的所有值
    // });
});



const isSubmit = ref(false);
const mileage = ref();
const price = ref(0);
const isVisible = ref(true);
const value1 = ref();

//const btn = document.querySelctor("#btn");

//計算里程金錢與按鈕消失
const salary = () => {
    var money = mileage.value * 9
    price.value = money
    if (mileage.value < 0) {
        isVisible.value = false;
        value1.value = "不能購買負數!!"
    } else {
        isVisible.value = true;
        value1.value = ""
    }
}

//呼叫金流 取付款id
const pay = ref()
const transfer = ref()

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
const mileageorder = ref()
const mileagebody = ref()

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

const isValue = ref(false);
//const isECPay = ref(false);

//觸發按鈕
const buyclick = async () => {
    console.log(price.value);

    //丟入金流交易的值
    pay.value = {
        "paymentMethod": "test",
        "paymentAmount": price.value,
    }
    //await loadtransfer()
    //丟入購買里程表的值
    mileagebody.value = {
        "Amount": mileage.value,
        "Price": price.value,
        "TransferPaymentId": transfer.value,
        "MemberId": 1
    }
    // try {
    //     const response = await axios.post("http://localhost:8889/api/PayPal/callback", pay.value, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });

    // } catch (error) {
    //     console.error("Error sending PayPal payment callback:", error);
    //     // 在這裡處理發送請求時出現的錯誤，例如顯示錯誤消息等
    // }


    const passSelect = sessionStorage.getItem("payMethod");
    console.log(passSelect);
    paymentStore.selectedOption = passSelect;

    if (passSelect === 'PayPal') {
        // 渲染 PayPal 按钮
        isValue.value = true;
        // paypal.HostedButtons({
        //     hostedButtonId: "6YBNSYU9PX6GL",
        // }).render("#paypal-container-6YBNSYU9PX6GL");

    } else if (passSelect === '綠界科技') {
        isValue.value = false;
        //isSubmit.value = true;

        // 调用 PayRadioButton 组件中的 processPayment 函数
        //var price = pay.value.paymentAmount;
        paymentStore.ecPayMethod(pay.value.paymentAmount, "里程購買");
        ecPayMethod();

    } else {
        isValue.value = false;
    }

    console.log(mileagebody.value);
    await loadmileagecreate();

}

// // 將 PayPal 按鈕的付款成功回調函數整合到你的 Vue 組件中
// const onApproveCallback = (data, actions) => {
//     return fetch('/demo/checkout/api/paypal/order/' + data.orderID + '/capture/', {
//         method: 'post'
//     }).then(function (res) {
//         return res.json();
//     }).then(function (orderData) {
//         // 在這裡處理付款成功的操作
//         var transaction = orderData.purchase_units[0].payments.captures[0];
//         var paymentAmount = transaction.amount.value;
//         console.log(paymentAmount);
//         // 呼叫 API 將付款金額存儲到資料庫
//         savePaymentToDatabase(paymentAmount);

//         // 其他操作，例如顯示成功消息等
//     });
//     // 定義保存付款金額到資料庫的函數
//     const savePaymentToDatabase = async (paymentAmount) => {
//         try {
//             // 使用 Axios 向後端發送 POST 請求
//             const response = await axios.post('http://localhost:8889/api/Transfer', {
//                 // 在請求主體中包含付款金額
//                 Amount: paymentAmount
//             });
//             console.log(response);
//             // 從後端獲取返回的支付ID
//             const paymentId = response.data;

//             // 返回支付ID以供需要時使用
//             return paymentId;
//         } catch (error) {
//             // 如果發生錯誤，可以在這裡進行適當的處理
//             console.error('Error saving payment to database:', error);
//             throw error; // 可以選擇將錯誤重新拋出，以便在調用 savePaymentToDatabase 的地方處理錯誤
//         }
//     };
// };


</script>

<template>
    <returnPay></returnPay>
    <!-- 這是Title區 -->
    <TitleBanner :title="TitleBannerTitle"></TitleBanner>

    <!-- Main Content Start -->
    <div class="page-content m-0">
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
                                                    購買里程數:　<span class="text-danger">{{ value1 }}</span>
                                                </h4>

                                                <div class="row">
                                                    <div class="col-sm-5 mb-40">
                                                        <input v-model="mileage" v-on:keyup="salary" type="text"
                                                            class="form-control wizard-required" id="first-name"
                                                            name="first-name" placeholder="請輸入里程" />
                                                        <div class="wizard-form-error"></div>

                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        <div>
                                            <div class="detail-form">
                                                <PayRadioButton></PayRadioButton>
                                                <div></div>
                                            </div>
                                        </div>
                                        <div class="d-flex gap-24">
                                            <a href="javascript:;" id="btn" v-if="isVisible" v-on:click="buyclick"
                                                class="form-wizard-next-btn cus-btn w-100">
                                                購買
                                            </a>
                                        </div>

                                        <div>
                                            <!-- PayPal按钮的容器 -->

                                            <div v-if="isValue" id="paypal-button-container"></div>

                                        </div>

                                    </fieldset>
                                    <!--第三步驟-->
                                    <fieldset id="step-3" class="tab-pane wizard-fieldset p-0">
                                        <!-- <form action="flight-booking.html" method="post" class="contact-form"> -->
                                        <div class="detail-form mb-32">
                                            <h4 class="black p-0 mb-24">
                                                When would you like to pay?
                                            </h4>
                                            <div class="custom-control">
                                                <div class="radio-button mb-24">
                                                    <input type="radio" name="payment"
                                                        class="custom-control-input input-control" id="later" />
                                                    <!-- <div class="wizard-form-error"></div> -->
                                                    <label class="custom-control-label paynow color-black"
                                                        for="later">Pay Later</label>
                                                    <p class="dark-gray pl-36">
                                                        Lorem ipsum dolor sit
                                                        amet consectetur. Orci
                                                        elementum egestas
                                                        blandit a. Elementum
                                                        blandit sit egestas
                                                        urna.
                                                    </p>
                                                </div>
                                                <div class="radio-button">
                                                    <input type="radio" name="payment"
                                                        class="custom-control-input input-control" id="now" />
                                                    <!-- <div class="wizard-form-error"></div> -->
                                                    <label class="custom-control-label paynow color-black" for="now">Pay
                                                        Now</label>
                                                    <p class="dark-gray pl-36">
                                                        Lorem ipsum dolor sit
                                                        amet consectetur. Orci
                                                        elementum egestas
                                                        blandit a. Elementum
                                                        blandit sit egestas
                                                        urna.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="detail-form v-2">
                                            <h4 class="black p-0 mb-24">
                                                How would you like to pay?
                                            </h4>
                                            <div class="content-block mb-32">
                                                <div class="radio-tile-group sidebar d-block">
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <div class="input-container">
                                                                <input id="payment" class="radio-button wizard-required"
                                                                    type="radio" name="radio" value="payment" />
                                                                <div class="wizard-form-error"></div>
                                                                <div class="radio-tile wizard-page">
                                                                    <label for="payment"
                                                                        class="radio-tile-label wizard-label"><i
                                                                            class="fal fa-credit-card-front"></i>&nbsp;&nbsp;New
                                                                        Card</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="input-container">
                                                                <input id="g-pay" class="radio-button wizard-required"
                                                                    type="radio" name="radio" value="g-pay" />
                                                                <div class="wizard-form-error"></div>
                                                                <div class="radio-tile wizard-page">
                                                                    <label for="g-pay"
                                                                        class="radio-tile-label wizard-label"><img
                                                                            src="../src/moban7664/static/picture/google.png"
                                                                            alt="" />&nbsp;&nbsp;Google
                                                                        Pay</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <h4 class="black p-0 mb-24">
                                                Account Holder Details
                                            </h4>
                                            <div class="row">
                                                <div class="col-sm-6 mb-24">
                                                    <input type="text" class="form-control wizard-required" name="name"
                                                        id="holder-name" placeholder="Card Holder's Name" />
                                                    <div class="wizard-form-error"></div>
                                                </div>
                                                <div class="col-sm-6 mb-24">
                                                    <input type="text" class="form-control wizard-required"
                                                        name="number" id="card-name" placeholder="Card Number" />
                                                    <div class="wizard-form-error"></div>
                                                </div>
                                                <div class="col-sm-6 mb-24">
                                                    <!-- <input type="text" class="form-control " name="date" id="exp-date" placeholder="Expiry Date"> -->
                                                    <div class="wizard-form-error"></div>
                                                    <div class="input-date-picker">
                                                        <input type="text"
                                                            class="sel-input date_from form-control wizard-required"
                                                            name="date" id="exp-date" placeholder="Expiry Date" />
                                                        <div class="wizard-form-error"></div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-6 mb-24">
                                                    <input type="text" class="form-control wizard-required" name="cvc"
                                                        id="cVc" placeholder="CVC" />
                                                    <div class="wizard-form-error"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- </form> -->
                                        <div class="d-flex gap-24 mt-24">
                                            <a href="javascript:;"
                                                class="form-wizard-previous-btn cus-btn btn-sec w-100">
                                                Back
                                            </a>
                                            <a href="" class="form-wizard-next-btn cus-btn w-100">
                                                Submit
                                            </a>
                                        </div>
                                    </fieldset>
                                </div>
                                <!-- <h6><a href="#step-2" class="cus-btn float-end btn"><span class="icon"><img src="assets/media/icons/orange-cart.png" alt=""></span>Continue</a></h6> -->
                                <!-- <div class="sw-toolbar-elm toolbar toolbar-bottom" role="toolbar">
                                    <button class="btn sw-btn-prev sw-btn" type="button">Continue</button>
                                    <button class="btn sw-btn-next sw-btn" type="button">Continue</button>
                                </div> -->
                            </form>
                        </div>
                    </div>
                    <div class="col-xl-4 mb-lg-0 mb-32">
                        <div class="flight-booking-detail light-shadow">
                            <div class="flight-title">
                                <h4 class="color-white">Price Summary</h4>
                            </div>
                            <!--這裡是price summary-->
                            <div class="box bg-white p-24">
                                <div class="d-flex align-items-center justify-content-between mb-24">
                                    <div>
                                        <h4 class="color-black">購買里程:</h4>
                                        <div class="dark-gray">
                                            <h4>{{ mileage }}</h4>
                                        </div>
                                    </div>
                                    <h5 class="color-black">${{ price }}</h5>
                                </div>

                                <div class="d-flex align-items-center justify-content-between">
                                    <div>
                                        <h4 class="color-black">Total</h4>
                                    </div>
                                    <h4 class="color-black">${{ price }}</h4>
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
</template>

<style scoped>
.detail-form {
    margin-bottom: 50px;
}
</style>
