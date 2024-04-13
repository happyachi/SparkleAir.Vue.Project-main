<script setup>
import { onMounted, ref, onUpdated } from "vue";
import axios from "axios";
import { useCampaignStore } from "@/stores/campaignid";
import { PriceFormat } from "@/views/flightWeb/AirFlights/components/flightJS/CabinHelper";

const campaigns = ref([]);
const campaignStore = useCampaignStore();
const showAlert = ref(false); //for copy popup btn

const slider = () => {
  if ($(".flight-card-slider").length) {
    console.log($(".flight-card-slider").length);
    $(".flight-card-slider").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      autoplaySpeed: 4000,
      arrows: true,
      dots: false,
      autoplay: true,
      centerPadding: "0",
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1599,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 1099,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 675,
          settings: {
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 399,
          settings: {
            arrows: false,
            slidesToShow: 1,
          },
        },
      ],
    });
  }
};

const loadCampaigns = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8889/api/CampaignsDiscount"
    );
    campaigns.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("An error occurred while fetching campaigns:", error);
  }
};

onMounted(() => {
  loadCampaigns();
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-TW");
};

const copyLink = async (campaignId) => {
  const link = `http://localhost:8888/marketing/detail/${campaignId}`;
  try {
    await navigator.clipboard.writeText(link);
    showAlert.value = true; // 顯示提示
    setTimeout(() => {
      showAlert.value = false; // 1.5秒後隱藏提示
    }, 1500);
  } catch (err) {
    console.error("Opps...", err);
  }
};
</script>

<template>
  <!-- Flight Card Slider Start -->
  <section
    class="flight-card p-40"
    data-sal="slide-down"
    data-sal-duration="800"
    data-sal-delay="100"
    data-sal-easing="ease-in-out"
  >
    <div class="container-fluid">
      <h3
        class="lightest-black h-36 bold mb-40"
        style="display: flex; justify-content: center"
      >
        最新活動
      </h3>

      <div class="flight-card-slider">
        <div
          class="col-12 col-md-6 col-lg-4 d-flex align-items-stretch mb-4"
          v-for="campaign in campaigns"
          :key="campaign.id"
        >
          <div class="card campaign-card shadow-sm">
            <img
              :src="`https://lh3.googleusercontent.com/d/${campaign.image}`"
              class="card-img-top"
              alt="Campaign Image"
            />
            <div class="card-body d-flex flex-column px-3">
              <h5 class="card-title mb-3">{{ campaign.name }}</h5>
              <p class="card-text text-muted mb-3">
                有效期限 {{ formatDate(campaign.dateEnd) }} 止
              </p>
              <div class="mt-auto d-flex justify-content-between">
                <button
                  @click="copyLink(campaign.id)"
                  class="btn btn-outline-secondary btn-sm"
                >
                  <i class="bi bi-share"></i> 分享
                </button>
                <a
                  :href="`http://localhost:8888/marketing/detail/${campaign.id}`"
                  class="btn btn-primary btn-sm"
                  >購物去▶</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Flight Card Slider End -->

  <transition name="alert">
    <div class="alert-wrapper" v-if="showAlert" style="width: 300px">
      <el-alert title="活動連結已複製！ " type="success" show-icon />
    </div>
  </transition>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap");

body {
  font-family: "Poppins", sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.campaign-card {
  transition: transform 0.3s ease;
  width: 100%; /* 調整卡片寬度 */
  height: auto; /* 調整卡片高度 */
  max-width: 400px; /* 增加最大寬度 */
  margin: 0 auto; /* 水平置中 */
}

.campaign-card:hover {
  transform: translateY(-5px); /* 卡片懸停效果 */
}

.card-title {
  cursor: pointer;
  color: #007bff; /* 設定有互動性的元素顏色 */
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
}

.card-title:hover {
  text-decoration: underline; /* 標題懸停效果 */
}

.card-text {
  font-size: 17px;
  color: #666;
}

.card-body {
  padding: 20px;
}

/* 進一步確保按鈕和鏈接不會太靠近卡片邊緣 */
.card-body .btn,
.card-body .btn-sm {
  margin-bottom: 0.5rem;
}

/* 進一步改善元素之間的間距和排版 */
.card-body .d-flex {
  gap: 0.5rem;
}

.campaign-card .card-img-top {
  width: 100%; /* 調整圖片寬度以填滿卡片 */
  height: auto; /* 保持圖片比例 */
  object-fit: cover;
}

.btn {
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-outline-secondary {
  border: 2px solid #007bff;
  color: #007bff;
}

.btn-outline-secondary:hover {
  background-color: #007bff;
  color: #fff;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.campaign-title {
  text-align: center;
  font-size: 2.5rem; /* 根据视觉需求调整 */
  font-weight: 600;
  color: #007bff; /* 设计上的主色调 */
  margin-bottom: 2rem; /* 根据布局需求调整 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* 给文字添加轻微的阴影，增加层次感 */
}

/* 響應式設計 */
@media (max-width: 767.98px) {
  .card-body {
    padding: 15px;
  }
  .card-title {
    font-size: 18px;
  }
  .card-text {
    font-size: 14px;
  }

  .btn,
  .btn-sm {
    padding: 12px 24px;
  }

  .campaign-card {
    width: 100%;
    max-width: none;
  }
}

/* copy pop up */
/* 調整 el-alert 內部元素的樣式 */
.el-alert:first-child {
  margin: 0;
}

.alert-wrapper {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  transition: opacity 0.5s ease;
}

.alert-enter-active,
.alert-leave-active {
  transition: opacity 0.5s;
}

.alert-enter,
.alert-leave-to {
  opacity: 0;
}
</style>
