<template>

  <div class="payMethod">
    <div class="wordFontHead">付款方式</div>
    <div v-for="(option, index) in options" :key="index" class="option">
      <input type="radio" :id="'option_' + index" :value="option" v-model="selectedOption" />
      <label :for="'option_' + index" class="wordFont">
        {{ option }}
        <span>
          <span v-if="option === 'PayPal'">
            <!-- 根據選項添加不同的圖標 -->
            <img src="@/components/flightWebComponents/Payment/icon/paypal.png" alt="PayPal" class="icon" />

          </span>
          <span v-else-if="option === '綠界科技'">
            <img src="@/components/flightWebComponents/Payment/icon/Ecpay.png" alt="綠界科技" class="icon" />
          </span>
          <span v-else>
            <img src="@/components/flightWebComponents/Payment/icon/visa.png" alt="VISA卡" class="icon" />
          </span>
        </span>
      </label>
    </div>

    <br>
    <div class="wordFont"> 已選擇:{{ selectedOption }}</div>
    <!-- 這是綠界要用來呼叫綠界API用的 -->
    <!-- <form id="form" name="form" action="https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5" method="POST">
      <input v-for="item in ecpayAxiosData" :key="item.key" type="text" :name="item.key" :value="item.value"
        v-model="item.value" hidden /><br />
    </form> -->
    <!-- <div v-if="paymentStore.ecpayGetData">
      <div v-for="(value, key) in paymentStore.ecpayGetData" :key="key">
        {{ key }}: {{ value }}
      </div>
    </div> -->
    <!-- <form v-on:submit.prevent="validateForm" id="form" name="form"
      :action="'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5'" method="POST">
      <div v-for="item in paymentStore.ecpayGetData">
        <input :key="item.key" :name="item.key" v-model="item.value" /><br />
        {{ item.value }}
      </div>
    </form> -->
    <form id="form" name="form" :action="'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5'" method="POST"
      style="display:none ;">
      <div v-for="item in paymentStore.ecpayGetData">
        <input :key="item.key" :name="item.key" :model="item.data" :value="item.data" type="hidden" />
        <!-- {{ item.data }} -->
        <br />

      </div>
    </form>

  </div>
</template>

<script setup>
import { ref, onUpdated, onMounted, defineExpose } from 'vue';
//import ecPayMethod from '@/components/flightWebComponents/Payment/ecpay.js'
//import { ecpayGetData } from '@/components/flightWebComponents/Payment/ecpay.js'
import { usePaymentStore } from '@/stores/payment.js'
const paymentStore = usePaymentStore();


const options = ref(['PayPal', '綠界科技', 'VISA卡']);
const selectedOption = ref('');

onUpdated(() => {
  sessionStorage.setItem("payMethod", selectedOption.value)

}
)
// const validateForm = (() => {
//   if (this.MerchantID) {
//     console.log(this.MerchantID)
//   } else { console.log('沒值') }

// })

// watch(paymentStore.ecpayGetData, (newValue, oldValue) => {
//   console.log(newValue);
//   console.log(oldValue);

//   if (paymentStore.ecpayGetData != null) {
//     console.log(paymentStore.ecpayGetData)
//   }
// })

//綠界區塊


//ecPayMethod();





// const ecPayMethod = async () => {
//   try {
//     const response = await axios.get('http://127.0.0.1:8889/api/ECPayPayments/Index'); // 发送GET请求到后端获取ECPay数据
//     ecpayAxiosData.value = response.data; // 将后端返回的数据存储到ref中
//   } catch (error) {
//     console.error('Error fetching ECPay data:', error); // 处理错误情况
//   }
// };

// const loadtransfer = async () => {
//   const response = await fetch("http://localhost:8889/api/Transfer", {
//     method: "POST",
//     headers: { 'content-type': 'application/json' },
//     //別忘了把主體参數轉成字串，否則資料會變成[object Object]，它無法被成功儲存在後台
//     body: JSON.stringify(pay.value)
//   })
//   const data = await response.json()
//   transfer.value = data
//   console.log(transfer.value); //顯示接收付款id
// }

// const proccessPay = () => {
//   if (selectedOption.value === 'PayPal') { }
//   else if (selectedOption.value === '綠界科技') { }
//   else (selectedOption.value === 'VISA卡')
//   { loadtransfer(); }

// }


// const paymentUrl = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"; // 支付请求的URL
// //const ecpayAxiosData = ref([]); // 存储要发送到后端的数据

// // 生成 MerchantTradeNo
// const generateMerchantTradeNo = () => {
//   return Math.random().toString(36).substring(2, 12);
// };
// const processPayment = async () => {
//   try {
//     // 準備付款相關的資料
//     const paymentData = {
//       MerchantTradeNo: generateMerchantTradeNo(),
//       MerchantTradeDate: new Date().toISOString(),
//       TotalAmount: 100,
//       TradeDesc: '無',
//       ItemName: '測試商品',
//       // 其他付款相關資料...
//     };

//     //發送 POST 請求到後端控制器
//     const response = await axios.post('https://localhost:8889/api/Ecpay/AddOrders', paymentData);
//     console.log('Payment processed successfully:', response.data);
//     // 在這裡處理付款成功後的相應操作，例如顯示成功訊息、重定向等
//   } catch (error) {
//     console.error('Error processing payment:', error);
//     // 在這裡處理付款失敗後的相應操作，例如顯示錯誤訊息等
//   }
// };



// 获取订单数据
// const getOrderData = async () => {
//   try {
//     const response = await axios.get('http://localhost:8889/api/ECPayPayments/Index');
//     ecpayAxiosData.value = response.data; // 将后端返回的数据存储到 ecpayAxiosData 中
//   } catch (error) {
//     console.error('Error fetching order data:', error);
//   }
// };



//綠界區塊(奇哥)
// import { createECPayResponseData } from "@/apis/PayApis";
// const ecpayAxiosData = ref();
// const ecPayMethod = async () => {
//   const responseData = {
//     returnURL: "http://127.0.0.1:8889/api/ECPayPayments/Index",
//     orderResultURL: "http://127.0.0.1:8888/Pay/milePurchaseTest",
//     totalAmount: 10000,
//     tradeDesc: "測試交易",
//     itemName: "機票",
//   };
// }

// const ecPayResponseData = await createECPayResponseData(responseData);
// ecpayAxiosData.value = [
//   { key: "CheckMacValue", value: ecPayResponseData.checkMacValue },
//   { key: "ChoosePayment", value: ecPayResponseData.choosePayment },
//   { key: "EncryptType", value: ecPayResponseData.encryptType },
//   { key: "ItemName", value: ecPayResponseData.itemName },
//   { key: "MerchantID", value: ecPayResponseData.merchantID },
//   { key: "MerchantTradeDate", value: ecPayResponseData.merchantTradeDate },
//   { key: "MerchantTradeNo", value: ecPayResponseData.merchantTradeNo },
//   { key: "OrderResultURL", value: ecPayResponseData.orderResultURL },
//   { key: "PaymentType", value: ecPayResponseData.paymentType },
//   { key: "ReturnURL", value: ecPayResponseData.returnURL },
//   { key: "TotalAmount", value: ecPayResponseData.totalAmount },
//   { key: "TradeDesc", value: ecPayResponseData.tradeDesc },
//   { key: 'TradeInfo', value: ecPayResponseData.tradeinfo },
//   { key: 'TradeSha', value: ecPayResponseData.tradesha },
//   { key: 'Version', value: ecPayResponseData.version },
// ];

// onUpdated(() => {
//   if (ecpayAxiosData.value != null) {
//     document.getElementById("form").submit();
//   }
// });

</script>


<style scoped>
.wordFontFoot {
  font-size: 20px;
  font-weight: bolder;

}

.wordFont {
  font-size: 20px;
}

.wordFontHead {
  font-size: 28px;
  font-weight: bolder;
}

.icon {
  width: 80px;
  /* 指定寬度 */
  height: auto;
  /* 讓高度根據寬度自動調整，保持圖片比例 */
}

.option {
  display: inline-block;
  /* 將選項水平排列 */
  margin-right: 20px;
  /* 選項之間的間距 */
}
</style>
