import axios from "axios";
import { ref } from "vue";
// const options = ref(['PayPal', '綠界科技', 'VISA卡']);
// const selectedOption = ref('');

// onUpdated(() => sessionStorage.setItem("payMethod", selectedOption.value)
// )

export const ecpayGetData = ref();
export default function ecPayMethod() {
  const website = "https://localhost:8889";

  const generateMerchantTradeNo = () => {
    return Math.random().toString(36).substring(2, 12);
  };

  try {
    const paymentData = {
      MerchantID: "YourMerchantID",
      MerchantTradeNo: generateMerchantTradeNo(),
      MerchantTradeDate: new Date().toISOString(),
      PaymentType: "YourPaymentType",
      TotalAmount: 100,
      TradeDesc: "YourTradeDesc",
      ItemName: "YourItemName",
      ExpireDate: "3",
      ReturnURL: `${website}/api/ECPay/AddPayInfo`,
      OrderResultURL: `${website}/Home/PayInfo/${generateMerchantTradeNo()}`,
      ChoosePayment: "ALL",
      PaymentInfoURL: `${website}/api/ECPay/AddAccountInfo`,
      EncryptType: "1",
      ClientRedirectURL: `${website}/api/MileageOrder${generateMerchantTradeNo()}`,
    };

    // const response =  axios.get('http://localhost:8889/api/ECPayPayments/Index');
    // console.log(response.data);
    axios
      .get("http://localhost:8889/api/ECPayPayments/Index")
      .then((response) => {
        //console.log(response.data); // 這裡訪問了 response 的 data 屬性的值
        ecpayGetData.value = response.data;
      })
      .catch((error) => {
        console.error(error);
      });

    if (selectedOption.value === "綠界科技") {
      document.getElementById("form").submit();
    }
  } catch (error) {
    console.error(error);
  }
}
