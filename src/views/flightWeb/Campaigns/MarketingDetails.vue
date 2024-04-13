<template>
  <div class="total">
    <link
      class="main-image"
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    />

    <!-- Main Content -->
    <div class="container">
      <div class="top-banner section">
        <div class="image-box">
          <img
            :src="`https://lh3.googleusercontent.com/d/${discounts.image}`"
            alt="discount image"
            class="main-image"
          />
        </div>
      </div>

      <!-- 產品輪播 -->
      <h2 class="hot-selling-title">熱銷榜</h2>
      <h3 class="hot-selling-sub">
        {{ campaigns.description }}
      </h3>
      <div class="container">
        <div class="carousel">
          <div
            class="carousel-group"
            v-for="(products, index) in productGroups"
            :key="index"
            :class="{ active: index === activeIndex }"
          >
            <div class="product-row">
              <div class="product" v-for="item in products" :key="item.id">
                <!-- Product Cards Carousel Display -->
                <div class="product-item">
                  <div class="product-thumb">
                    <div class="product-img-container">
                      <img :src="item.image" alt="product-img" class="product-img" />
                    </div>
                    <div class="preview-meta">
                      <ul>
                        <li>
                          <span
                            data-toggle="modal"
                            data-target="#product-modal"
                            @click="showProductDetail(item)"
                          >
                            <i class="tf-ion-ios-search-strong"></i>
                          </span>
                        </li>
                        <li>
                          <a href="#!"><i class="tf-ion-ios-heart"></i></a>
                        </li>
                        <li>
                          <a href="#!"><i class="tf-ion-android-cart"></i></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="product-content">
                    <h4>{{ item.name }}</h4>
                    <p class="price">${{ PriceFormat(item.unitPrice) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="carousel-control left" @click="prevGroup">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="carousel-control right" @click="nextGroup">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <!-- 商品詳情 -->
      <div class="modal product-modal fade" id="product-modal">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <i class="tf-ion-close"></i>
        </button>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-8 col-sm-6 col-xs-12">
                  <div class="modal-image" v-if="selectedProduct">
                    <img
                      class="img-responsive"
                      :src="selectedProduct.image"
                      alt="product"
                    />
                  </div>
                </div>
                <div class="col-md-4 col-sm-6 col-xs-12">
                  <div class="product-short-details" v-if="selectedProduct">
                    <h2 class="product-title">{{ selectedProduct.name }}</h2>
                    <p class="product-price">${{ selectedProduct.unitPrice }}</p>
                    <p class="product-short-description">
                      {{ selectedProduct.description }}
                    </p>

                    <a href="/tax-free/TaxFreeCart" class="btn btn-main">Add To Cart</a>
                    <a href="/tax-free/TaxFreeProductSingle" class="btn btn-transparent"
                      >View Product Details</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Notes -->
      <div class="container mt-5">
        <div class="activity-notes">
          <p>
            【活動注意事項】<br />
            &emsp;&emsp;本活動之優惠僅適用成功訂單(訂單無取消、退貨/退款事宜)，非活動期間內之訂單，無法享有本活動之優惠內容。
            商品價格及資訊以商品實際頁面刊登為準。 優惠/特賣價格商品數量有限，售完為止。
            優惠券數量有限，以實際使用兌換順序為準，先用先贏，請於領取後盡速使用，如兌換完畢，恕不補發。
            若未成功使用優惠券，即無法享有折扣，訂單金額依實際結帳頁面為準。
            每組優惠券同一帳戶/同一人限用一次，可與「優惠券」合併使用。
            若訂單有取消、申請退貨或退款之情形，恕不再另補發優惠券。
          </p>
          <p>
            【注意事項】<br />
            &emsp;&emsp;參加者於本活動結束後主動取消訂單、退貨，或有非因商品瑕疵之換貨，則因該筆交易而得參加本活動之資格者，本公司得取消其參加資格，且得不另行通知；因該筆交易而獲得獎項者，本公司得取消其得獎資格並通知參加者，如參加者已領取獎項，則應確保贈品以全新、未拆封使用之貨態隨同退貨商品一併返還。如隨同商品退回之獎（贈）品已被參加者拆封(或)使用，視同參加者同意以此商品市價購買並同意自商品退款中扣除之。商品價值以本公司公告之市價為準。
            本活動僅限居住在台灣地區(包含金門、馬祖、澎湖)設有住居所之本國人參加。
            <br />
            &emsp;&emsp;本活動注意事項載明於本活動網頁中，活動得獎資格不得遞補或以任何方式轉讓予第三人，亦不得折換現金。如遇不可抗力之事由或因故導致獎品內容變更，本公司得自行決定改由其他等值商品取代，中獎者不得要求將獎品折換現金或指定更換其他商品，獎品價值應以本公司公告之市價為準。
            參加者如因參加本活動或因本活動之獎項而遭受任何損失，本公司及其關係企業均不負任何責任。一旦中獎者領取獎品後，若有任何獎品遺失、被竊、毀損、瑕疵或其他任何不能正常使用之情形等，本公司不負任何責任，且無義務發給任何證明或補償。<br />
            &emsp;&emsp;參加者已充分知悉且同意所提供之個人資料，本公司得於本活動範圍內基於活動稽核、核實得獎人身分及獎項派發事宜蒐集、處理、利用其個人資料。參加者依法得向主辦單位請求查詢、複製、補充更正、停止蒐集處理利用或刪除其個人資料。參加者亦得選擇不提供個人資料，但參加者之活動資格將因程序未完成而視為放棄。請參閱本公司隱私權政策
            本公司保留隨時變更、終止或取消一部或全部本活動之權利及本活動注意事項之最終解釋權，詳細活動辦法以本活動網頁公告為準。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { getDiscount } from "@/apis/discountApi";
import { gettfitem, gettfcategory } from "@/apis/taxfree.js";
import { PriceFormat } from "@/views/flightWeb/AirFlights/components/flightJS/CabinHelper";
import { onMounted, ref, computed, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const discounts = ref([]);
const route = useRoute();
const getitem = ref([]);
const activeIndex = ref(0);
const getcategory = ref([]);
const products = ref([]);
const campaignId = route.params.id; // 假設路由參數名稱是 id
const campaigns = ref([]);

onMounted(async () => {
  await Promise.all([
    getDiscount(route.params.id).then((data) => (discounts.value = data)),
    gettfitem().then((data) => (getitem.value = data)),
    gettfcategory().then((data) => (getcategory.value = data)),
  ]);
});

const loadProducts = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8889/api/CampaignsDiscount/SearchForProducts/${campaignId}`
    );
    const datas = response.data;
    products.value = datas;
    // console.log(datas);
  } catch (error) {
    console.error("An error occurred while fetching products:", error);
  }
};

const loadCampaigns = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8889/api/CampaignsDiscount/Discount/${campaignId}`
    );
    campaigns.value = response.data; // 注意，這裡使用 response.data
    console.log(campaigns.value);
  } catch (error) {
    console.error("An error occurred while fetching campaigns:", error);
  }
};

onMounted(() => {
  loadCampaigns();
});

const uniqueProducts = computed(() => {
  const unique = new Map();
  // 假設每個商品都有一個唯一標識符，例如id
  for (const product of products.value) {
    if (!unique.has(product.id)) {
      unique.set(product.id, product);
    }
  }
  return Array.from(unique.values());
});

const productGroups = computed(() => {
  const groups = [];
  const groupSize = 3;
  let productsList = uniqueProducts.value;

  for (let i = 0; i < productsList.length; i += groupSize) {
    groups.push(productsList.slice(i, i + groupSize));
  }
  return groups;
});

onMounted(async () => {
  await loadProducts();
});

const selectedCategory = ref(0);
const filteredItems = computed(() => {
  return selectedCategory.value
    ? getitem.value.filter((item) => item.tfCategoriesId === selectedCategory.value)
    : getitem.value;
});

const selectedProduct = ref(null);
const showProductDetail = (product) => {
  selectedProduct.value = product;
  $("#product-modal").modal("show");
};

const nextGroup = () => {
  if (activeIndex.value < productGroups.value.length - 1) {
    activeIndex.value++;
  } else {
    activeIndex.value = 0; // 如果是最後一組，回到第一組
  }
};

// 添加一個方法來切換到前一組產品
const prevGroup = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
  } else {
    activeIndex.value = productGroups.value.length - 1; // 如果是第一組，跳到最後一組
  }
};

// 監聽按鍵事件來控制輪播
const handleKeyPress = (e) => {
  if (e.key === "ArrowLeft") {
    prevGroup();
  } else if (e.key === "ArrowRight") {
    nextGroup();
  }
};

// 當組件掛載時添加事件監聽器，並在卸載時移除
onMounted(() => {
  window.addEventListener("keydown", handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyPress);
});
</script>

<style scoped>
.total {
  background-color: #f0f8ff;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.carousel-group {
  display: none;
}

.carousel-group.active {
  display: block;
}

.price {
  color: gray; /* Use a standout color for the price */
  font-weight: bold; /* Make the price bold */
}

.product-thumb {
  position: relative;
  width: 100%; /* 容器寬度佔據父元素的100% */
  padding-top: 100%; /* 16:9寬高比的垂直版本，(16/9)*100% */
  overflow: hidden; /* 超出部分不顯示 */
  border: 1px solid #eaeaea; /* 邊框（可選） */
  border-radius: 5px; /* 圓角（可選） */
}

.top-banner {
  text-align: center;
  margin-bottom: 20px;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 圖片等比例覆蓋 */
  object-position: center; /* 圖片居中顯示 */
  transition: transform 0.3s ease; /* 過渡效果 */
  transform: scale(1); /* 初始縮小圖片 */
}

.product-img-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.product-thumb:hover .product-img {
  transform: scale(1.1); /* 滑鼠懸停時放大到 1.1 倍 */
}

.product-row {
  display: flex;
  justify-content: center; /* Center the product cards */
  flex-wrap: wrap;
  gap: 20px; /* Ensures there is space between the cards */
}

.product-row {
  display: flex;
  justify-content: center; /* Centers the products within the row */
  flex-wrap: wrap;
  gap: 20px; /* Provides consistent spacing between products */
}

.product {
  color: #003459;
  flex: 0 0 300px;
  margin-bottom: 20px;
  width: 100%;
}

.product-item {
  flex: 1;
  margin: 0 10px;
}

.product-content h4 {
  font-weight: 900; /* Maximum boldness */
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.carousel-control {
  background-color: #5a6268; /* Darker button background for contrast */
  color: white;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
}

.carousel-control:hover {
  background-color: #495057; /* Slightly lighter on hover */
}

.carousel-control i {
  font-size: 20px; /* Icon size */
}

.carousel {
  position: relative;
}

.carousel-control.left,
.carousel-control.right {
  position: absolute;
  z-index: 2; /* Ensure the buttons are above the product cards */
  top: 50%; /* Align vertically at the center of the carousel */
  transform: translateY(
    -50%
  ); /* Offset the button by half its height for perfect center alignment */
}

.carousel-control.left {
  left: 10px; /* Adjust left position to ensure it does not overlap the product cards */
}

.carousel-control.right {
  right: 10px; /* Adjust right position to ensure it does not overlap the product cards */
}

@media (max-width: 768px) {
  .hot-selling-title,
  .hot-selling-sub {
    font-size: 24px; /* 在小屏幕上減小標題字體大小 */
    padding: 10px 0; /* 減少上下內邊距 */
    margin-top: 15px; /* 減少與上一元素的距離 */
  }

  .product {
    flex: 0 0 100%; /* 小屏幕上卡片佔滿整行 */
  }

  .carousel-control {
    width: 30px; /* 減小導航按鈕的尺寸 */
    height: 30px;
    padding: 5px;
  }

  .carousel-control i {
    font-size: 16px; /* 減小導航按鈕圖標的尺寸 */
  }
}


.main-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.hot-selling-title {
  text-align: center;
  color: #ffffff; /* 白色文字 */
  font-size: 32px; /* 增加字体大小 */
  font-weight: bold; /* 加粗字体 */
  background-image: linear-gradient(to right, #003459, #003459); /* 使用渐变背景 */
  border-radius: 8px; /* 圆角 */
  padding: 15px 0; /* 增加填充 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 文字阴影 */
  margin: 20px auto; /* 调整外边距以居中显示 */
  max-width: 80%; /* 最大宽度，确保在大屏幕上也不会过宽 */
  animation: fadeIn 1s ease-out; /* 標題淡入效果 */
}

/* 为副标题设置略有不同的样式 */
.hot-selling-sub {
  text-align: center;
  font-size: 24px; /* 较小的字体大小 */
  background-image: linear-gradient(to right, #6c91c2, #6c91c2); /* 更深的渐变背景 */
  color: #ffffff; /* 白色文字 */
  border-bottom: none; /* 移除底部边框 */
  border-radius: 8px; /* 圆角 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 文字阴影 */
  margin: 20px auto; /* 调整外边距以居中显示 */
  max-width: 80%; /* 最大宽度，确保在大屏幕上也不会过宽 */
  animation: fadeIn 1.5s ease-out; /* 副標題淡入效果 */
  font-family: "Open Sans", sans-serif; /* 使用Google字體 */
  padding: 20px 0; /* 調整內邊距 */
  margin-top: 30px; /* 增加與主標題的距離 */
}

.hot-selling-title,
.hot-selling-sub {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* 添加文字陰影效果 */
  transition: all 0.3s ease; /* 平滑過渡效果 */
}

.hot-selling-title:hover,
.hot-selling-sub:hover {
  transform: scale(1.05); /* 懸浮時輕微放大 */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-short-description {
  text-align: left; /* 將文字對齊設置為左對齊 */
}
</style>
