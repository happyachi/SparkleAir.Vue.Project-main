<script setup>
import { useRoute } from "vue-router";
import { getSessionTokenData } from "@/utils/sessionHelper";
import { ref, onMounted } from "vue";
import axios from "axios";


const route = useRoute();
const paymentId = route.params.id;
sessionStorage.setItem('paymentId', paymentId);
console.log(paymentId);
const ticketDetailId = sessionStorage.getItem("TicketDetailId");

const tokenDataRef = ref();
tokenDataRef.value = getSessionTokenData("TFLoginToken");
onMounted(() => {
  if (tokenDataRef.value != null && tokenDataRef.value != undefined) {
    console.log(tokenDataRef.value.MemberId);
  }
});

const sendRequest = async () => {
  try {
    // 發送 Checkout 請求
    const checkoutResponse = await axios.post(`http://localhost:8889/api/TForderlist/Checkout`, null, {
      params: {
        transferPaymentId: parseInt(paymentId),
        ticketDetailsId: parseInt(ticketDetailId),
        memberId: parseInt(tokenDataRef.value.MemberId)
      }
    });
    console.log('Checkout 請求成功', checkoutResponse.data);

    // 在 Checkout 成功後，發送 ClearCart 請求
    const clearCartResponse = await axios.get(`http://localhost:8889/api/TForderlist/ClearCart`, {
      params: {
        ticketDetailsId: ticketDetailId
      }
    });
    console.log('ClearCart 請求成功', clearCartResponse.data);

    // 三秒後跳轉到指定頁面
    setTimeout(() => {
      router.push('/tax-free/TaxFreeDashBoard');
    }, 5000);
  } catch (error) {
    console.error('請求失敗', error);
  }
};

onMounted(() => {
  sendRequest();
});

</script>

<template>
  <!-- Page Wrapper -->
  <section class="page-wrapper success-msg">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <div class="block text-center">
            <i class="tf-ion-android-checkmark-circle"></i>
            <h2 class="text-center">謝謝乾爹</h2>
            <p>
              謝謝乾爹的購買，我們已經收到您的訂單，我們將盡快處理您的訂單。
            </p>
            <a href="/tax-free/TaxFreeDashBoard" class="btn btn-main mt-20">查看訂單</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /.page-warpper -->
</template>

<style scoped></style>
