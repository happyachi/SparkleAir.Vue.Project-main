<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { gettfitemID, addtocart, getticketcartID } from "@/apis/taxfree.js";
import TaxFreeShop from "@/views/TFWeb/Shop/index.vue";
import axios from "axios";
import { getSessionTokenData } from "@/utils/sessionHelper";
import { ElMessage } from "element-plus";

const tokenDataRef = ref();
tokenDataRef.value = getSessionTokenData("TFLoginToken");
onMounted(() => {
  if (tokenDataRef.value != null && tokenDataRef.value != undefined) {
    console.log(tokenDataRef.value.MemberId);
  }
});

const route = useRoute();
const productId = ref(route.query.id);
const ticketDetailId = sessionStorage.getItem("TicketDetailId");

const productDetails = ref({});
onMounted(async () => {
  const response = await axios.get(`/TFitem/${productId.value}`);
  productDetails.value = response.data;

  gettfitemID(productId.value).then((res) => {
    productDetails.value = res;
    console.log(productDetails.value);
  });
});

const generateURL = (action, productId) => {
  const newProductId = parseInt(productId);

  let updatedProductId;
  if (action === "next") {
    updatedProductId = newProductId + 1;
  } else if (action === "previous") {
    updatedProductId = newProductId - 1;
  }

  // 返回更新後的 URL
  return `/tax-free/TaxFreeProductSingle?id=${updatedProductId}`;
};

const dialogVisible = ref(false);
const handleClose = (done) => {
  ElMessageBox.confirm("關閉對話框")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
//Cart
const addToCartbtn = async () => {
  const productInfo = new URLSearchParams({
    ticketDetailsId: ticketDetailId,
    tfItemsId: productId.value,
    tfItemsName: productDetails.value.name,
    tfItemsSerialNumber: productDetails.value.serialNumber,
    tfItemsImage: productDetails.value.image,
    tfItemsQuantity: productDetails.value.quantity,
    tfItemsUnitPrice: productDetails.value.unitPrice,
    quantity: quantity.value,
    unitPrice: productDetails.value.unitPrice * quantity.value,
  }).toString();
  //console.log("productInfo", productInfo);

  try {
    const response = await addtocart(productInfo);
    console.log("商品已成功加入購物車", response);
  } catch (error) {
    console.error("加入購物車時發生錯誤：", error);
  }
  ElMessage({
    message: "商品已成功加入購物車",
    type: "success",
  });
};

const updateCartInfo = async (ticketDetailId) => {
  const purchases = ref([]);
  const response = await axios.get(`/TForderlist/getbyticketid/${ticketDetailId}`);
  purchases.value = response.data;
  getticketcartID(ticketDetailId).then((res) => {
    purchases.value = res;
  });
};
onMounted(async () => {
  await updateCartInfo(ticketDetailId);
});

//加加減減框框
const quantity = ref(1);
const updateQuantity = (event) => {
  const newValue = parseInt(event.target.value);
  if (!isNaN(newValue) && newValue >= 0) {
    quantity.value = newValue;
  }
};
const increaseQuantity = () => {
  quantity.value++;
};
const decreaseQuantity = () => {
  if (quantity.value > 0) {
    quantity.value--;
  }
};

// Discount
const discounts = ref([]);
const loadDiscounts = async () => {
  const response = await axios.get(
    `http://localhost:8889/api/CampaignsDiscount/DiscountProduct/${productId.value}`
  );
  discounts.value = response.data;
  console.log(discounts.value);
};
//篩選進行中的折扣活動
const activeDiscounts = computed(() => {
  return discounts.value.filter((discount) => discount.status === "進行中");
});

onMounted(() => {
  loadDiscounts();
});

//加入我的最愛

const toggleWishlist = async () => {
  try {
    await axios.post(
      `http://localhost:8889/api/TFWishlist/ToggleWishlistItem?memberId=${tokenDataRef.value.MemberId}&itemId=${productId.value}`
    );
  } catch (error) {
    console.error("Error toggling wishlist:", error);
  }
  ElMessage({
    message: "成功加入願望清單",
    type: "success",
  });
};
</script>

<template>
  <section class="single-product">
    <div class="container" v-if="productDetails">
      <div class="row">
        <div class="col-md-6">
          <ol class="breadcrumb">
            <li><a href="/tax-free/">首頁</a></li>
            <li><a href="/tax-free/TaxFreeShop">全部商品</a></li>
            <li class="active">{{ productDetails.name }}</li>
          </ol>
        </div>
        <div class="col-md-6">
          <ol class="product-pagination text-right">
            <li>
              <a :href="generateURL('next', productId)"
                ><i class="tf-ion-ios-arrow-left"></i> 上一
              </a>
            </li>
            <li>
              <a :href="generateURL('previous', productId)"
                >下一 <i class="tf-ion-ios-arrow-right"></i
              ></a>
            </li>
          </ol>
        </div>
      </div>
      <div class="row mt-20">
        <div class="col-md-5">
          <div class="single-product-slider">
            <div id="carousel-custom" class="carousel slide" data-ride="carousel">
              <div class="carousel-outer">
                <!-- me art lab slider -->
                <div class="carousel-inner">
                  <div class="item active">
                    <img
                      :src="productDetails.image"
                      alt=""
                      style="height: 500px; width: 400px; object-fit: cover"
                    />
                  </div>
                  <div class="item">
                    <img
                      :src="productDetails.image"
                      alt=""
                      style="height: 500px; width: 400px; object-fit: cover"
                    />
                  </div>
                  <div class="item">
                    <img
                      :src="productDetails.image"
                      alt=""
                      style="height: 500px; width: 400px; object-fit: cover"
                    />
                  </div>
                </div>

                <!-- sag sol -->
                <a
                  class="left carousel-control"
                  href="#carousel-custom"
                  data-slide="prev"
                >
                  <i class="tf-ion-ios-arrow-left"></i>
                </a>
                <a
                  class="right carousel-control"
                  href="#carousel-custom"
                  data-slide="next"
                >
                  <i class="tf-ion-ios-arrow-right"></i>
                </a>
              </div>

              <!-- thumb -->
              <ol class="carousel-indicators mCustomScrollbar meartlab">
                <li data-target="#carousel-custom" data-slide-to="0" class="active">
                  <img src="../tfWeb/images/shop/single-products/product-1.jpg" alt="" />
                </li>
                <li data-target="#carousel-custom" data-slide-to="1">
                  <img src="../tfWeb/images/shop/single-products/product-2.jpg" alt="" />
                </li>
                <li data-target="#carousel-custom" data-slide-to="2">
                  <img src="../tfWeb/images/shop/single-products/product-3.jpg" alt="" />
                </li>
                <li data-target="#carousel-custom" data-slide-to="3">
                  <img src="../tfWeb/images/shop/single-products/product-4.jpg" alt="" />
                </li>
                <li data-target="#carousel-custom" data-slide-to="4">
                  <img src="../tfWeb/images/shop/single-products/product-5.jpg" alt="" />
                </li>
                <li data-target="#carousel-custom" data-slide-to="5">
                  <img src="../tfWeb/images/shop/single-products/product-6.jpg" alt="" />
                </li>
                <li data-target="#carousel-custom" data-slide-to="6">
                  <img src="../tfWeb/images/shop/single-products/product-7.jpg" alt="" />
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="single-product-details">
            <h2>
              {{ productDetails.name }}
              <el-popover
                placement="top-start"
                title="💖"
                :width="150"
                trigger="hover"
                content="加入我的最愛"
              >
                <template #reference>
                  <el-button @click="toggleWishlist" :plain="true" circle>💖</el-button>
                </template>
              </el-popover>
            </h2>

            <p class="product-price">${{ productDetails.unitPrice }}</p>

            <p class="product-description mt-20">
              {{ productDetails.description }}
            </p>
            <p>
              {{ productDetails.description }}
            </p>
            <!-- <div class="color-swatches">
              <span>color:</span>
              <ul>
                <li>
                  <a href="#!" class="swatch-violet"></a>
                </li>
                <li>
                  <a href="#!" class="swatch-black"></a>
                </li>
                <li>
                  <a href="#!" class="swatch-cream"></a>
                </li>
              </ul>
            </div>
            <div class="product-size">
              <span>Size:</span>
              <select class="form-control">
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div> -->
            <div class="product-quantity">
              <span>Quantity</span>
              <div class="product-quantity-slider">
                <!-- 加加減減 -->
                <div class="el-input-number" data-v-9109f1f2="">
                  <span
                    role="button"
                    aria-label="decrease number"
                    class="el-input-number__decrease"
                    @click="decreaseQuantity"
                  >
                    <i class="el-icon">
                      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill="currentColor"
                          d="M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
                        ></path>
                      </svg>
                    </i>
                  </span>
                  <div class="el-input">
                    <!-- input --><!-- prepend slot --><!--v-if-->
                    <div class="el-input__wrapper">
                      <!-- prefix slot --><!--v-if-->
                      <input
                        class="el-input__inner"
                        :value="quantity"
                        type="number"
                        min="0"
                        @input="updateQuantity"
                      />
                      <!-- suffix slot --><!--v-if-->
                    </div>
                    <!-- append slot --><!--v-if-->
                  </div>
                  <span
                    role="button"
                    aria-label="increase number"
                    class="el-input-number__increase"
                    @click="increaseQuantity"
                  >
                    <i class="el-icon">
                      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill="currentColor"
                          d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
                        ></path>
                      </svg>
                    </i>
                  </span>
                </div>
                <!-- 加加減減結束 -->
              </div>
            </div>
            <div class="product-quantity">
              <span>Discount</span>
              <div class="product-quantity-slider">
                <input id="product-discount" type="text" name="product-discount" />
                <div class="discounts-container">
                  <div class="discounts-container">
                    <a
                      v-for="discount in activeDiscounts"
                      :key="discount.id"
                      class="discount-name"
                      :href="`http://localhost:8888/marketing/detail/${discount.id}`"
                      target="_blank"
                    >
                      {{ discount.name }}-{{ discount.description }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="product-category">
              <span>Categories</span>
              <ul>
                <li><a href="/tax-free/TaxFreeProductSingle">Products</a></li>
                <li><a href="/tax-free/TaxFreeProductSingle">Soap</a></li>
              </ul>
            </div>
            <div style="margin-top: 40px"></div>
            <div class="mb-4">
              <el-button size="large" color="#00000" :plain="true" @click="addToCartbtn"
                >加入購物車</el-button
              >
            </div>
            <!-- <a href="/tax-free/TaxFreeCart" class="btn btn-main mt-20" @click="addToCart">Add To Cart</a> -->
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div class="tabCommon mt-20">
            <ul class="nav nav-tabs">
              <li class="active">
                <a data-toggle="tab" href="#details" aria-expanded="true">商品詳情</a>
              </li>
              <li class="">
                <a data-toggle="tab" href="#reviews" aria-expanded="false"
                  >顧客回饋 (3)</a
                >
              </li>
            </ul>
            <div class="tab-content patternbg">
              <div id="details" class="tab-pane fade active in">
                <h4>商品詳情</h4>
                <p>
                  裝說因飯世少大，們魚超同標場心目入行的流這業高就得指化布觀紀園能部興，有及半讀海乎：省點利飛出車；決開超一要人構場小語如師界子品人圖來通去營以然因內，於府緊建同答錢量團下一之到。
                  來燈夜開我性爭先基看媽多月論以品裡親感難！
                </p>
                <p>
                  士運痛現教深各的庭見中像集家銀苦電到道深實飛花家外過的健真克友華汽心裡父開也氣動傳當學。發起那上自、處一必備，一覺的馬在把特管說是長界說友算況事流提民相市股個？看後制物境……有痛局！天定反，隨得話……全班不學大所且起細，風策狀車知由得大自西會文可國準地單影般。
                </p>
              </div>
              <div id="reviews" class="tab-pane fade">
                <div class="post-comments">
                  <ul class="media-list comments-list m-bot-50 clearlist">
                    <!-- Comment Item start-->
                    <li class="media">
                      <a class="pull-left" href="#!">
                        <img
                          class="media-object comment-avatar"
                          src="../tfWeb/images/blog/avater-1.jpg"
                          alt=""
                          width="50"
                          height="50"
                        />
                      </a>

                      <div class="media-body">
                        <div class="comment-info">
                          <h4 class="comment-author">
                            <a href="#!">Jonathon Andrew</a>
                          </h4>
                          <time datetime="2013-04-06T13:53">July 02, 2015, at 11:34</time>
                          <a class="comment-button" href="#!"
                            ><i class="tf-ion-chatbubbles"></i>Reply</a
                          >
                        </div>

                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                          at magna ut ante eleifend eleifend.Lorem ipsum dolor sit amet,
                          consectetur adipisicing elit. Quod laborum minima, reprehenderit
                          laboriosam officiis praesentium? Impedit minus provident
                          assumenda quae.
                        </p>
                      </div>
                    </li>
                    <!-- End Comment Item -->

                    <!-- Comment Item start-->
                    <li class="media">
                      <a class="pull-left" href="#!">
                        <img
                          class="media-object comment-avatar"
                          src="../tfWeb/images/blog/avater-4.jpg"
                          alt=""
                          width="50"
                          height="50"
                        />
                      </a>

                      <div class="media-body">
                        <div class="comment-info">
                          <div class="comment-author">
                            <a href="#!">Jonathon Andrew</a>
                          </div>
                          <time datetime="2013-04-06T13:53">July 02, 2015, at 11:34</time>
                          <a class="comment-button" href="#!"
                            ><i class="tf-ion-chatbubbles"></i>Reply</a
                          >
                        </div>

                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                          at magna ut ante eleifend eleifend. Lorem ipsum dolor sit amet,
                          consectetur adipisicing elit. Magni natus, nostrum iste non
                          delectus atque ab a accusantium optio, dolor!
                        </p>
                      </div>
                    </li>
                    <!-- End Comment Item -->

                    <!-- Comment Item start-->
                    <li class="media">
                      <a class="pull-left" href="#!">
                        <img
                          class="media-object comment-avatar"
                          src="../tfWeb/images/blog/avater-1.jpg"
                          alt=""
                          width="50"
                          height="50"
                        />
                      </a>

                      <div class="media-body">
                        <div class="comment-info">
                          <div class="comment-author">
                            <a href="#!">Jonathon Andrew</a>
                          </div>
                          <time datetime="2013-04-06T13:53">July 02, 2015, at 11:34</time>
                          <a class="comment-button" href="#!"
                            ><i class="tf-ion-chatbubbles"></i>Reply</a
                          >
                        </div>

                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                          at magna ut ante eleifend eleifend.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <section class="products related-products section">
    <div class="container">
      <div class="row">
        <div class="title text-center">
          <h2>Related Products</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="product-item">
            <div class="product-thumb">
              <span class="bage">Sale</span>
              <img class="img-responsive" src="../tfWeb/images/shop/products/product-5.jpg" alt="product-img" />
              <div class="preview-meta">
                <ul>
                  <li>
                    <span data-toggle="modal" data-target="#product-modal">
                      <i class="tf-ion-ios-search"></i>
                    </span>
                  </li>
                  <li>
                    <a href="#"><i class="tf-ion-ios-heart"></i></a>
                  </li>
                  <li>
                    <a href="#!"><i class="tf-ion-android-cart"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="product-content">
              <h4><a href="/tax-free/TaxFreeProductSingle">Reef Boardsport</a></h4>
              <p class="price">$200</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="product-item">
            <div class="product-thumb">
              <img class="img-responsive" src="../tfWeb/images/shop/products/product-1.jpg" alt="product-img" />
              <div class="preview-meta">
                <ul>
                  <li>
                    <span data-toggle="modal" data-target="#product-modal">
                      <i class="tf-ion-ios-search-strong"></i>
                    </span>
                  </li>
                  <li>
                    <a href="#"><i class="tf-ion-ios-heart"></i></a>
                  </li>
                  <li>
                    <a href="#!"><i class="tf-ion-android-cart"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="product-content">
              <h4><a href="/tax-free/TaxFreeProductSingle">Rainbow Shoes</a></h4>
              <p class="price">$200</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="product-item">
            <div class="product-thumb">
              <img class="img-responsive" src="../tfWeb/images/shop/products/product-2.jpg" alt="product-img" />
              <div class="preview-meta">
                <ul>
                  <li>
                    <span data-toggle="modal" data-target="#product-modal">
                      <i class="tf-ion-ios-search"></i>
                    </span>
                  </li>
                  <li>
                    <a href="#"><i class="tf-ion-ios-heart"></i></a>
                  </li>
                  <li>
                    <a href="#!"><i class="tf-ion-android-cart"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="product-content">
              <h4><a href="/tax-free/TaxFreeProductSingle">Strayhorn SP</a></h4>
              <p class="price">$230</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="product-item">
            <div class="product-thumb">
              <img class="img-responsive" src="../tfWeb/images/shop/products/product-3.jpg" alt="product-img" />
              <div class="preview-meta">
                <ul>
                  <li>
                    <span data-toggle="modal" data-target="#product-modal">
                      <i class="tf-ion-ios-search"></i>
                    </span>
                  </li>
                  <li>
                    <a href="#"><i class="tf-ion-ios-heart"></i></a>
                  </li>
                  <li>
                    <a href="#!"><i class="tf-ion-android-cart"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="product-content">
              <h4><a href="/tax-free/TaxFreeProductSingle">Bradley Mid</a></h4>
              <p class="price">$200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> -->

  <!-- Modal -->
  <div class="modal product-modal fade" id="product-modal">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <i class="tf-ion-close"></i>
    </button>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row">
            <div class="col-md-8">
              <div class="modal-image">
                <img
                  class="img-responsive"
                  src="../tfWeb/images/shop/products/modal-product.jpg"
                />
              </div>
            </div>
            <div class="col-md-3">
              <div class="product-short-details">
                <h2 class="product-title">GM Pendant, Basalt Grey</h2>
                <p class="product-price">$200</p>
                <p class="product-short-description">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem iusto
                  nihil cum. Illo laborum numquam rem aut officia dicta cumque.
                </p>
                <a href="#!" class="btn btn-main">Add To Cart</a>
                <a href="#!" class="btn btn-transparent">View Product Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
    <span>商品加入購物車</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">關閉</el-button>
        <el-button type="primary" @click="confirmRemoveItem">確定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.discounts-container {
  display: flex;
  /* 将父容器设为Flex容器 */
  flex-wrap: wrap;
  /* 防止子元素换行 */
  gap: 3px;
}

.discount-name {
  display: flex;
  /* 启用Flexbox */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  white-space: nowrap;
  background-color: #6c91c2;
  color: white;
  padding: 5px 10px;
  /* 调整内边距 */
  margin-right: 5px;
  /* 每个元素之间的间隔 */
}
</style>
