<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useCouponStore } from "@/stores/coupon";
import { getSessionTokenData } from "@/utils/sessionHelper";
import TitleBanner from "@/components/flightWebComponents/titleBanner.vue";

const TitleBannerTitle = ref({
  title1: "我的優惠券",
});
const tokenName = "memberToken";
const couponStore = useCouponStore();
const emit = defineEmits(["close"]);

const memberData = ref(getSessionTokenData(tokenName));
const coupons = ref([]);
const memberId = ref();
if (memberData.value != null) {
  memberId.value = memberData.value.MemberId;
}

onMounted(async () => {
  await loadCoupons();
});

const loadCoupons = async () => {
  if (memberId.value) {
    try {
      const response = await fetch(
        `http://localhost:8889/api/CampaignsCoupon/CouponCart?memberid=${memberId.value}`
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

//NEW夾角生成
const maxCouponId = computed(() => {
  return Math.max(...coupons.value.map((coupon) => coupon.id), 0);
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const selectCouponHandler = (coupon) => {
  couponStore.selectCoupon(coupon);
  emit("close");
};

////////////////// 監聽是否登入//////////////////
import { useMemberStore } from "@/stores/members";
const memberStore = useMemberStore();
watch(
  () => memberStore.memberInfo,
  (newValue, oldValue) => {
    //memberId.value = memberStore.memberInfo;
    if (
      memberStore.memberInfo != null &&
      memberStore.memberInfo != undefined &&
      memberStore.memberInfo != ""
    ) {
      memberData.value = getSessionTokenData("memberToken");
      console.log(memberData.value);
      loadCoupons();
    }
  }
);

const isCoupons = computed(() => {
  if (coupons.value.length == 0) {
    return false;
  } else {
    return true;
  }
});
</script>

<template>
  <!-- <TitleBanner :title="TitleBannerTitle"></TitleBanner> -->
  <div class="container">
    <div class="coupons-container">
      <div v-if="!isCoupons">未持有優惠券</div>
      <div class="card" v-for="coupon in coupons" :key="coupon.id">
        <div class="main">
          <!-- Coupon Content -->
          <div v-if="coupon.id === maxCouponId" class="new-banner"></div>
          <div class="vertical"></div>
          <div
            v-if="coupon.campaignId === 1 || coupon.campaignId === 4"
            class="content"
          >
            <h1>{{ coupon.name }}</h1>
            <template v-if="coupon.campaignId === 1">
              <h2>折$ {{ coupon.discountValue }}</h2>
            </template>
            <template v-else-if="coupon.campaignId === 4">
              <h2>現折 {{ coupon.discountValue }}%</h2>
            </template>
            <p>最高折抵 ${{ coupon.maximumDiscountAmount }}</p>
            <p>有效期限: {{ formatDate(coupon.dateEnd) }} 止</p>
          </div>
          <button class="claim-button" @click="selectCouponHandler(coupon)">
            即刻出發
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
  gap: 20px;
  padding: 20px;
  justify-content: center; /* 使卡片在容器中居中 */
  margin-bottom: 40px;
  position: relative;
  background: #f0f2f5;
}

.card {
  width: 300px; /* 确保所有卡片宽度一致 */
  background: linear-gradient(145deg, #6c91c2, #003459);
  padding: 10px;
  position: relative;
  margin: 0 10px; /* 调整间距 */
  transition: transform 0.3s ease-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: none;
}

.card::before {
  content: "";
  position: absolute;
  left: -5px; /* Adjust as needed */
  top: 0;
  bottom: 0;
  width: 7px; /* Control sawtooth width */
  background: repeating-linear-gradient(
    0deg,
    #f0f2f5,
    #f0f2f5 5px,
    /* Match the background color for consistency */ transparent 5px,
    transparent 10px
  );
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Enhanced hover shadow */
}

.main {
  display: grid;
  gap: 1px;
  position: relative; /* 确保 .main 具有相对定位 */
}

.title-banner {
  background-color: #003459; /* 更亮或更有主題性的顏色 */
  color: #ffffff;
  padding: 15px 0;
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.vertical {
  display: none; /* Hide the vertical line for a cleaner look */
}

.claim-button {
  padding: 10px 10px;
  writing-mode: vertical-rl;
  text-align: center;
  position: absolute;
  right: 0px;
  top: 20px; /* 设置按钮从顶部开始 */
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

.content h1 {
  font-size: 1.2rem; /* 从1rem减小到0.9rem */
  color: #ffffff;
  margin: 5px 0;
}

.content h2 {
  font-size: 2rem; /* 从1rem减小到0.9rem */
  color: #ffffff;
  margin: 5px 0;
}

.content p {
  font-size: -0.9rem; /* 从0.8rem减小到0.7rem */
  color: #ffffff;
  margin: 5px 0;
}
.new-banner {
  position: absolute;
  right: 0;
  top: 0;
  width: 45px;
  height: 45px;
  background-color: #e04343;
  clip-path: polygon(100% 0, 0 0, 100% 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  transform: translateX(23%) translateY(-23%);
  z-index: 1000;
}

.new-banner::after {
  content: "NEW";
  transform: translateX(35%) translateY(-60%) rotate(40deg);
  display: block;
  font-size: 0.6rem;
  z-index: 1;
}

@media (max-width: 768px) {
  .card {
    width: 100%; /* 在小屏幕设备上卡片宽度调整为100% */
  }
}
</style>
