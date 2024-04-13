<script setup>
import { gettfitem, gettfcategory, gettfitemID } from "@/apis/taxfree.js";
import { ref, computed, watchEffect, onUpdated, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { getSessionTokenData } from "@/utils/sessionHelper";

const wishlist = ref([]);
const route = useRouter();

const tokenDataRef = ref();
tokenDataRef.value = getSessionTokenData("TFLoginToken");

tokenDataRef.value = getSessionTokenData("TFLoginToken");

onMounted(() => {
  if (tokenDataRef.value != null && tokenDataRef.value != undefined) {
    console.log(tokenDataRef.value.MemberId);
    const memberId = tokenDataRef.value?.MemberId;
    fetchWishlist(memberId);
  }
});


const fetchWishlist = async (memberId) => {
  try {
    const response = await axios.get(`http://localhost:8889/api/TFWishlist/member${memberId}`);
    wishlist.value = response.data;
    console.log(wishlist.value);
  } catch (error) {
    console.error("NNN:", error);
  }
};

const getitem = async () => {
  try {
    const res = await gettfitem();
    allItems.value = res;
  } catch (error) {
    console.error('Failed to fetch items:', error);
  }
};

const getcategory = async () => {
  try {
    const res = await gettfcategory();

  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
};

onMounted(async () => {
  if (tokenDataRef.value != null && tokenDataRef.value != undefined) {
    const memberId = tokenDataRef.value?.MemberId;
    await fetchWishlist(memberId);
    await getitem();
    await getcategory();
  }
});


//在下拉式選單篩選商品分類
const selectedCategory = ref(0);
const allItems = ref([]); // 存抓到的商品
const filteredItems = computed(() => {
  if (!selectedCategory.value) {
    return wishlist.value;
  } else {
    return wishlist.valuefilter(
      (item) => item.tfCategoriesId === selectedCategory.value
    );
  }
});

const currentPage = ref(1);
const pageSize = ref(9);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
// 假設這是篩選條件

// 取得後端所有商品資訊
onMounted(async () => {
  try {
    const res = await gettfitem();
    allItems.value = res;
  } catch (error) {
    console.error('Failed to fetch items:', error);
  }
});

// 計算分頁後的商品
const totalItems = computed(() => {
  if (!allItems.value) return;
  if (!selectedCategory.value) {
    return allItems.value.length;
  } else {
    return allItems.value.filter(item => item.tfCategoriesId === selectedCategory.value).length;
  }
});
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value);
const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, totalItems.value));
const paginatedItems = computed(() => {
  const filtered = selectedCategory.value ?
    allItems.value.filter(item => item.tfCategoriesId === selectedCategory.value) :
    allItems.value;
  return filtered.slice(startIndex.value, endIndex.value);
});

// 分頁事件處理函式
const handleSizeChange = (val) => {
  console.log(`${val} items per page`);
};

const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
};



//獲取的商品詳細轉到商品詳細頁
const getitemid = ref([]);
const router = useRouter();
const handleClick = (productId) => {
  gettfitemID(productId)
    .then((res) => {
      getitemid.value = res;
      router.push(`/tax-free/TaxFreeProductSingle?id=${productId}`);
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
    });
};

</script>

<template>

  <section class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="content">
            <h1 class="page-name">願望清單</h1>
            <ol class="breadcrumb">
              <li><a href="/tax-free">首頁</a></li>
              <li class="active">會員中心</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="user-dashboard page-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ul class="list-inline dashboard-menu text-center">
            <li><a href="TaxFreeDashBoard">會員資料</a></li>

            <li><a class="active" href="/tax-free/TaxFreeBlogRightSidebar">願望清單</a></li>

          </ul>
          <div class="products section">
            <div class="container">
              <div class="row">
                <div class="col-md-3">
                  <div class="widget">
                    <h4 class="widget-title">產品類型</h4>
                    <div class="m-4">
                      <el-select class="tfform-control" v-model="selectedCategory" placeholder="Select category">
                        <el-option label="All" :value="0" />
                        <el-option v-for="category in getcategory" :key="category.id" :value="category.id"
                          :label="category.category" />
                      </el-select>
                    </div>
                    <div class="widget product-category">
                      <h4 class="widget-title">產品類型</h4>
                      <div class="panel-group commonAccordion" id="accordion" role="tablist"
                        aria-multiselectable="true">
                        <div class="panel panel-default">
                          <div class="panel-heading" role="tab" id="headingOne">
                            <h4 class="panel-title">
                              <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"
                                aria-expanded="true" aria-controls="collapseOne">
                                分類
                              </a>
                            </h4>
                          </div>
                          <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel"
                            aria-labelledby="headingOne">
                            <div class="panel-body">
                              <ul>
                                <li><a href="#!">分類</a></li>
                                <li><a href="#!">分類</a></li>
                                <li><a href="#!">分類</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="panel panel-default">
                          <div class="panel-heading" role="tab" id="headingTwo">
                            <h4 class="panel-title">
                              <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion"
                                href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                分類
                              </a>
                            </h4>
                          </div>
                          <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel"
                            aria-labelledby="headingTwo">
                            <div class="panel-body">
                              <ul>
                                <li><a href="#!">Brand & Twist</a></li>
                                <li><a href="#!">Shoe Color</a></li>
                                <li><a href="#!">Shoe Color</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="panel panel-default">
                          <div class="panel-heading" role="tab" id="headingThree">
                            <h4 class="panel-title">
                              <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion"
                                href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                分類
                              </a>
                            </h4>
                          </div>
                          <div id="collapseThree" class="panel-collapse collapse" role="tabpanel"
                            aria-labelledby="headingThree">
                            <div class="panel-body">
                              <ul>
                                <li><a href="#!">Brand & Twist</a></li>
                                <li><a href="#!">Shoe Color</a></li>
                                <li><a href="#!">Gladian Shoes</a></li>
                                <li><a href="#!">Swis Shoes</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-9">
                  <div class="row">
                    <div class="col-md-4" v-for="item in wishlist" :key="item.id">
                      <div class="product-item">
                        <div class="product-thumb" @click="handleClick(item.tfItemsId)">
                          <span class="bage"> </span>
                          <img :src="item.tfItemsImage" alt="product-img"
                            style="width: 400px; height: 400px; object-fit: cover" />
                          <div class="preview-meta">
                            <ul>
                              <li>
                                <span>
                                  <i class="tf-ion-ios-search-strong"></i>
                                </span>
                              </li>
                              <!-- <li>
                        <a href="#!"><i class="tf-ion-ios-heart" data-toggle="modal" data-target="#product-modal"></i></a> @click="showProductDetail(item)"
                      </li>
                      <li>
                        <a href="#!"><i class="tf-ion-android-cart"></i></a>
                      </li> -->
                            </ul>
                          </div>
                        </div>
                        <div class="product-content">
                          <h4>{{ item.tfItemsName }}</h4>
                          <p class="price">${{ item.tfItemsUnitPrice }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="demo-pagination-container">
                      <div class="demo-pagination-block" style="display: flex; justify-content: center;">
                        <div class="demonstration">
                          <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :small="small"
                            :disabled="disabled" :background="background" layout="prev, pager, next, jumper"
                            :total="filteredItems.length" @size-change="handleSizeChange"
                            @current-change="handleCurrentChange" />

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


</template>

<style scoped></style>
