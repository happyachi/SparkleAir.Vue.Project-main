<template>
  <div class="container">
    <div class="coupons-container">
      <div class="card" v-for="coupon in coupons" :key="coupon.Id">
        <div class="main">
          <div class="co-img">
            <i class="bi bi-airplane-engines"></i>
          </div>
          <div class="vertical"></div>
          <div v-if="coupon.campaignId === 1 || coupon.campaignId === 4" class="content">
            <h2>{{ coupon.name }}</h2>
            <template v-if="coupon.campaignId === 1">
              <h1>折$ {{ coupon.discountValue }}</h1>
            </template>
            <template v-else-if="coupon.campaignId === 4">
              <h1>現折 {{ coupon.discountValue }}%</h1>
            </template>
            <p>最高折抵 ${{ coupon.maximumDiscountAmount }} </p>
            <p>有效期限: {{ formatDate(coupon.dateEnd) }} 止</p>
          </div>
        </div>
        <div class="copy-button">
          <input type="text" readonly :value="coupon.code" ref="couponInput" />
          <button @click="copyCode(coupon.code)" class="copybtn">領取</button>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="showSuccessAlert" class="alert alert-success" role="alert">
        Coupon code copied successfully!
      </div>
    </transition>
  </div>
</template>

<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { onMounted } from "vue";
import { ref } from "vue";

const coupons = ref([]);
const showSuccessAlert = ref(false);

const loadCoupons = async () => {
  const response = await fetch("http://localhost:8889/api/CampaignsCoupon");
  const datas = await response.json();
  coupons.value = datas;
  console.log(datas);
};

onMounted(() => {
  loadCoupons();
});

const copyCode = (code) => {
  const input = document.createElement("input");
  input.setAttribute("value", code);
  document.body.appendChild(input);
  input.select();
  navigator.clipboard.writeText(code);
  document.body.removeChild(input);
  showSuccessAlert.value = true;
  setTimeout(() => {
    showSuccessAlert.value = false;
  }, 1500);
};
// 對於函數，請使用日期格式、年月日格式。
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate;
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.coupons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  width: 300px; 
  margin-right: 20px; 
  margin-bottom: 20px; 
}

.container {
  width: 100%;
  height: 100vh;
  /* justify-content: center; */
  /* align-items: center; */
  display: flex;
  /* background-color: #dc143c; */
}

.card {
  width: 400px;
  height: 200px;
  border-radius: 5px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
  padding: 10px 10px;
  position: relative;
}

.main,
.copy-button {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
}
.card::after {
  position: absolute;
  content: "";
  height: 40px;
  right: -20px;
  border-radius: 40px;
  z-index: 1;
  top: 70px;
  background-color: #ffffff;
  width: 40px;
}

.card::before {
  position: absolute;
  content: "";
  height: 40px;
  left: -20px;
  border-radius: 40px;
  z-index: 1;
  top: 70px;
  background-color: #ffffff;
  width: 40px;
}

.co-img img {
  width: 100px;
  height: 100px;
}
.vertical {
  border-left: 5px dotted black;
  height: 100px;
  position: absolute;
  left: 30%;
}

.content h1 {
  font-size: 35px;
  margin-left: -20px;
  color: #565656;
}

.content h1 span {
  font-size: 18px;
}
.content h2 {
  font-size: 18px;
  margin-left: -20px;
  color: #565656;
  text-transform: uppercase;
}

.content p {
  font-size: 16px;
  color: #696969;
  margin-left: -20px;
}

.copy-button {
  display: flex; /* 设置为 flex 布局 */
  align-items: center; /* 垂直居中对齐 */
  margin: 1px 0 -5px 0;
  height: 40px;
  border-radius: 4px;
  padding: 0 5px;
  border: 1px solid #e1e1e1;
}

.copy-button input {
  flex: 1; /* 填满剩余空间 */
  height: 100%;
  border: none;
  outline: none;
  font-size: 15px;
}

.copy-button button {
  padding: 5px 20px;
  background-color: #dc143c;
  color: #fff;
  border: 1px solid transparent;
}

.buy {
  position: absolute;
  content: "";
  bottom: 20px;
  left: 20px;
  background-color: #dc143c;
}

.bi-airplane-engines {
  font-size: 6em; /* 調整為您想要的尺寸 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
