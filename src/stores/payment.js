import { onUpdated, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { data } from "@/views/flightWeb/Members/LoginMethod/GoogleMethod";

export const usePaymentStore = defineStore({
  id: "payment",
  state: () => ({
    ecpayGetData: ref(null),
    selectedOption: ref(null),
  }),
  actions: {
    async ecPayMethod(TotalAmount, ItemName, Url) {
      console.log(TotalAmount);
      console.log(ItemName);

      //const website = "http://localhost:8888";

      // const generateMerchantTradeNo = () => {
      //     return Math.random().toString(36).substring(2, 12);
      // };

      // try {
      //     const paymentData = {
      //         MerchantID: 'YourMerchantID',
      //         MerchantTradeNo: generateMerchantTradeNo(),
      //         MerchantTradeDate: new Date().toISOString(),
      //         PaymentType: 'YourPaymentType',
      //         TotalAmount: 100,
      //         TradeDesc: 'YourTradeDesc',
      //         ItemName: 'YourItemName',
      //         ExpireDate: '3',
      //         ReturnURL: `${website}/api/ECPayPayment/ECPayCallback`,
      //         OrderResultURL: `http://localhost:8888/ECPayPayment/PayInfo/${generateMerchantTradeNo()}`,
      //         ChoosePayment: 'ALL',
      //         PaymentInfoURL: `${website}/api/ECPayPayment/AddAccountInfo`,
      //         EncryptType: '1',
      //         ClientRedirectURL: `http://localhost:8888/${generateMerchantTradeNo()}`
      //     };
      //const amount = prive.value; // 假設你想傳遞的參數是 100
      const response = await axios.get(
        `http://localhost:8889/api/ECPayPayments/Index?TotalAmount=${TotalAmount}&ItemName=${ItemName}&Url=${Url}`
      );

      // const response = await axios.get('http://localhost:8889/api/ECPayPayments/Index/', {
      //     params: { price: amount }
      // });

      this.ecpayGetData = response.data;
      console.log(this.ecpayGetData);

      if (this.selectedOption === "綠界科技") {
        //setTimeout(console.log(document.getElementById("form")), 1000)
        //console.log(document.getElementById("form"));
        //document.getElementById("form").submit();
        setTimeout(() => document.getElementById("form").submit(), 1000);
      }

      // 不发送 POST 请求到 ECPAY callback，因为这部分逻辑将在 submitForm 方法中处理
      // } catch (error) {
      //     console.error('错误：', error);
      // }
    },
    async testMethod(TotalAmount, Info, Url) {
      let data = {
        PaymentMethod: "test",
        PaymentAmount: TotalAmount,
        Info: Info,
      };

      console.log(data);
      await axios
        .post(`http://localhost:8889/api/Transfer/${Url}`, data)
        .then((r) => {
          console.log(r.data);
          if (r.data.isVerify == true) {
            document.location.href = r.data.url;
          }
        });
    },
    // async submitForm() {
    //     try {
    //         const creditCardTestResult = await this.performCreditCardTest();

    //         // 根据信用卡测试结果来确定是否发送 POST 请求到 ECPAY callback
    //         if (creditCardTestResult && creditCardTestResult.ReturnURL) {
    //             const website = "http://localhost:8889";
    //             const paymentData = {
    //                 // 根据需要设置支付数据
    //             };

    //             const callback = await axios.post(`${website}/api/ECPayPayments/ECPayCallback`, paymentData);
    //             console.log(callback.data);
    //         }
    //     } catch (error) {
    //         console.error('错误：', error);
    //     }
    // },

    // async performCreditCardTest() {
    //     try {
    //         // 在这里执行信用卡测试，并根据测试结果返回相应对象
    //         const testResult = {
    //             ReturnURL: `http://localhost:8888/Pay/milePurchaseTest`
    //             // 其他测试结果字段...
    //         };
    //         return testResult;
    //     } catch (error) {
    //         console.error('信用卡测试失败：', error);
    //         return null;
    //     }
    // }
  },

  // 设置选定的选项
  setSelectedOption(option) {
    this.selectedOption = option;
  },
});
