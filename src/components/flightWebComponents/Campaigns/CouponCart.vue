<script setup>
import { ref, computed, nextTick } from "vue";
import { ElButton, ElDialog } from "element-plus";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { useCouponStore } from "@/stores/coupon";
import CouponInCart from "./CouponInCart.vue"; // Import CouponInCart component

const originalPrice = 10000;
const visible = ref(false);
const showCoupon = ref(false);
const couponStore = useCouponStore();
const selectedCoupon = computed(() => couponStore.selectedCoupon);
const handleCouponClose = () => {
  console.log(couponStore);
  nextTick(() => {
    visible.value = false;
  });
};

//根據選取的優惠券類型計算最終價格
// const finalPrice = computed(() => {
//   if (selectedCoupon.value) {
//     switch (selectedCoupon.value.campaignId) {
//       case 1: // 直接减去折扣值
//         return Math.max(0, originalPrice - selectedCoupon.value.discountValue);
//       case 4: // 百分比折扣
//         return Math.max(0, originalPrice * (selectedCoupon.value.discountValue / 100));
//       default:
//         return originalPrice;
//     }
//   }
//   return originalPrice;
// });
</script>

<template>
  <h3><strong>優惠券折抵</strong></h3>
  <div class="coupon-action-container">
    <h4
      v-if="couponStore.selectedCoupon"
      :class="{ 'selected-coupon': couponStore.selectedCoupon }"
    >
      {{ couponStore.selectedCoupon.name }}
    </h4>
    <h4 v-else>尚未選擇優惠券</h4>
    <el-button plain @click="visible = true">使用優惠券</el-button>
  </div>
  <el-dialog v-model="visible" :show-close="false" width="500">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">請選取欲使用優惠券</h4>
        <el-button @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </div>
    </template>
    <!-- Integrate CouponInCart component here, controlled by 'visible' -->
    <CouponInCart :selectedCoupon="selectedCoupon" @close="handleCouponClose" />
  </el-dialog>

  <!-- <h4>選擇的優惠券折扣金額: ${{ couponStore.selectedCoupon.discountAmount }}</h4>
  <h4>折扣后的總金額: ${{ couponStore.selectedCoupon.finalPrice }}</h4> -->
  <!-- <h4>折扣后的總金額: ${{ couponStore.selectedCoupon.finalPrice }}</h4>  -->

  <!-- <div>
    <h4>折抵</h4>
  </div> -->
  <!-- <h4 v-if="couponStore.selectedCoupon"> -->
  <!-- 當campaignId為1時，顯示折扣值 -->
  <!-- <template v-if="couponStore.selectedCoupon.campaignId === 1">
      ${{ couponStore.selectedCoupon.discountValue }}
    </template> -->
  <!-- 當campaignId為4時，顯示百分比 -->
  <!-- <template v-else-if="couponStore.selectedCoupon.campaignId === 4">
      {{ couponStore.selectedCoupon.discountValue }}%
    </template> -->
  <!-- 沒有選取的優惠券或campaignId不是1或4的情況 -->
  <!-- <template v-else>
      <h4>尚未選擇優惠券</h4>
    </template> -->
  <!-- </h4>
  <h4>總金額${{ finalPrice }}</h4> -->

  <!-- Flight-Booking End -->
</template>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}

.el-dialog {
  /* Makes sure the dialog box is never bigger than the viewport */
  height: 80vh; /* Adjust as necessary */
  overflow: auto; /* Add scrolling to the dialog itself if content is too big */
}

/* Ensure that any children in the dialog do not overflow */
.el-dialog .my-header,
.el-dialog .content {
  padding: 1rem;
  box-sizing: border-box; /* This ensures padding is included in width/height */
}

.el-button {
  font-size: 20px;
  width: 12rem;
}

.coupon-action-container {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  gap: 1rem; /* 根据需要调整间距 */
}

.selected-coupon {
  color: #6c91c2;
  font-weight: bold;
}
</style>
