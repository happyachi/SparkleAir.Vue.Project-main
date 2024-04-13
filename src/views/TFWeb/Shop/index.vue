<script setup>
import { gettfitem, gettfcategory, gettfitemID } from "@/apis/taxfree.js";
import { ref, computed, watchEffect, onUpdated, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

//抓後端的所有商品資訊
const getitem = ref([]);
gettfitem().then((res) => {
  getitem.value = res;
  // console.log(getitem.value);
});

//抓後端的所有商品分類
const getcategory = ref([]);
gettfcategory().then((res) => {
  getcategory.value = res;
  // console.log(getcategory.value);
});


//在下拉式選單篩選商品分類
const selectedCategory = ref(0);
const allItems = ref([]); // 存抓到的商品
const filteredItems = computed(() => {
  if (!selectedCategory.value) {
    return getitem.value;
  } else {
    return getitem.value.filter(
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

// //抓商品資訊到modal中
// const selectedProduct = ref(null); // 存儲所選商品的資訊
// const showProductDetail = (product) => {
//   selectedProduct.value = product; // 點擊商品時將商品資訊存儲在 selectedProduct 中
//   $("#product-modal").modal("show"); // 打開 modal
// };


// const getitemid = ref([])
// gettfitemID().then((res) => {
//   getitemid.value = res
//   //console.log(getitemid.value);
// })

// //抓商品id到商品詳細頁
// const router = useRouter();
// const handleClick = (productId) => {
//   gettfitemID(productId)
//     .then((res) => {
//       const productDetails = res.data;
//       router.push(`/tax-free/TaxFreeProductSingle?id=${productId}`);
//     })
//     .catch((error) => {
//       console.error('抓不到:', error);
//     });
// }


</script>

<template>
  <div class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="content">
            <h1 class="page-name">全部商品</h1>
            <ol class="breadcrumb">
              <li><a href="/tax-free/">首頁</a></li>
              <li class="active">全部商品</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>

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
              <div class="panel-group commonAccordion" id="accordion" role="tablist" aria-multiselectable="true">
                <div class="panel panel-default">
                  <div class="panel-heading" role="tab" id="headingOne">
                    <h4 class="panel-title">
                      <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                        分類
                      </a>
                    </h4>
                  </div>
                  <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
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
                  <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
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
            <div class="col-md-4" v-for="item in paginatedItems" :key="item.id">
              <div class="product-item">
                <div class="product-thumb" @click="handleClick(item.id)">
                  <span class="bage"> </span>
                  <img :src="item.image" alt="product-img" style="width: 400px; height: 400px; object-fit: cover" />
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
                  <h4>{{ item.name }}</h4>
                  <p class="price">${{ item.unitPrice }}</p>
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
          <!-- Modal -->
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
                        <img class="img-responsive" :src="selectedProduct.image"
                          style="width: 400px; height: 400px; object-fit: cover" alt="product-img" />
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
                        <a href="/tax-free/TaxFreeProductSingle" class="btn btn-transparent">View Product Details</a>
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
    <!-- /.modal -->
  </div>
</template>

<style scoped>
@import url("@/tfWeb/css/style_copy.css");

.demo-pagination-block+.demo-pagination-block {
  margin-top: 10px;

}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;

}
</style>
