<script setup>
import { ref, onMounted, watch } from "vue";
import { useCouponStore } from "@/stores/coupon";
import { getSessionTokenData } from "@/utils/sessionHelper";
import useSessionMixin from "@/mixins/sessionMixin.js";
const flightMixin = useSessionMixin();
const values = flightMixin.flightData.value.values;

const tokenName = "memberToken";
const couponStore = useCouponStore();
const emit = defineEmits(["close"]);

const memberData = ref(getSessionTokenData(tokenName));
const coupons = ref([]);
const memberId = ref(memberData.value.MemberId);

onMounted(async () => {
  await loadCoupons();
});

const loadCoupons = async () => {
  if (memberId.value) {
    try {
      const response = await fetch(
        `http://localhost:8889/api/CampaignsCoupon/CouponCart?memberid=${memberId.value}&originalPrice=${values.totalPrice}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // 将所有券的isBestChoice标记为false
      coupons.value = data.map((coupon, index) => ({
        ...coupon,
        isBestChoice: index === 0, // 仅第一张券考虑为最佳选择
      }));
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const selectCouponHandler = (coupon) => {
  couponStore.selectCoupon(coupon);
  console.log(couponStore.selectedCoupon);
  emit("close");
};
</script>

<template>
  <div class="container">
    <div class="coupons-container">
      <div class="card" v-for="coupon in coupons" :key="coupon.id">
        <div v-if="coupon.isBestChoice" class="best-choice-tag">
          <!-- Display a special tag for the best choice -->
          <span>最佳推薦！</span>
        </div>
        <div class="main">
          <!-- Coupon Content -->
          <!-- <div class="co-img">
            <i class="bi bi-airplane-engines"></i>
          </div> -->
          <div class="vertical"></div>
          <div v-if="coupon.campaignId === 1 || coupon.campaignId === 4" class="content">
            <h1>{{ coupon.name }}</h1>
            <template v-if="coupon.campaignId === 1">
              <h1>折$ {{ coupon.discountValue }}</h1>
            </template>
            <template v-else-if="coupon.campaignId === 4">
              <h1>現折 {{ coupon.discountValue }}%</h1>
            </template>
            <p>最高折抵 ${{ coupon.maximumDiscountAmount }}</p>
            <p>有效期限: {{ formatDate(coupon.dateEnd) }} 止</p>
          </div>
          <button class="claim-button" @click="selectCouponHandler(coupon)">
            點擊使用
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

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
  justify-content: 15px; /* 確保元素之間的間隙均勻分布 */
  gap: 10px; /* 如果你想要更多的間隙可以調整這個值 */
}

.container {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}

.card {
  width: calc(
    50% - 10px
  ); /* 計算寬度以適應每行兩個卡片的排列，減去的 10px 是為了彌補間隙 */
  width: 205px;
  background: linear-gradient(145deg, #003459, #003459);
  padding: 10px;
  position: relative;
  transition: transform 0.3s ease;
}

.card::before {
  content: "";
  position: absolute;
  left: -5px; /* 根据需要调整 */
  top: 0;
  bottom: 0;
  width: 7px; /* 控制鋸齒寬度 */
  background: repeating-linear-gradient(
    0deg,
    #ffffff,
    #ffffff 5px,
    /* 控制鋸齒的高度 */ transparent 5px,
    transparent 10px /* 控制鋸齒間距 */
  );
}

.card:hover {
  transform: scale(1.02); /* 滑鼠懸停時輕微放大效果 */
}

.best-choice-tag {
  position: absolute;
  top: -20px;
  right: -7px;
  background-color: #6c91c2;
  color: white;
  padding: 5px 7px;
  border-radius: 15px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.main {
  display: grid;
  gap: 1px;
  position: relative; /* 确保 .main 具有相对定位 */
}

.vertical {
  display: none; /* Hide the vertical line for a cleaner look */
}

.content h1,
.content h2 {
  font-size: 1rem;
  color: #333;
  margin: 5px 0;
}

.content p {
  font-size: 0.8rem;
  color: #666;
  margin: 5px 0;
}

/* .co-img i {
  font-size: 2em;
  color: #ff4d4d;
} */

.claim-button {
  padding: 10px 10px;
  writing-mode: vertical-rl;
  text-align: center;
  position: absolute;
  right: -6px;
  top: 10px; /* 设置按钮从顶部开始 */
  /* 移除 transform 属性，不再需要垂直居中 */
  border: 0.2px solid white; /* 添加白色边框 */
  border-radius: 12px;
  background-color: #003459;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s; /* 加上边框颜色的过渡效果 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.claim-button:hover {
  background-color: #e04343; /* 鼠标悬停时的背景颜色 */
  border-color: #e04343; /* 鼠标悬停时边框的颜色 */
}

@media (max-width: 768px) {
  .card::before {
    left: 0;
    top: -10px;
    bottom: auto;
    width: 100%;
    height: 10px;
    background: repeating-linear-gradient(
      90deg,
      #ffffff,
      #ffffff 10px,
      transparent 10px,
      transparent 20px
    );
  }
}

.content h1 {
  font-size: 1rem; /* 从1rem减小到0.9rem */
  color: #ffffff;
  margin: 5px 0;
}

.content p {
  font-size: 0.7rem; /* 从0.8rem减小到0.7rem */
  color: #ffffff;
  margin: 5px 0;
}
</style>
