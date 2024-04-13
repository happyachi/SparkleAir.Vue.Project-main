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
    console.error("Failed to fetch items:", error);
  }
});

// 計算分頁後的商品
const totalItems = computed(() => {
  if (!allItems.value) return;
  if (!selectedCategory.value) {
    return allItems.value.length;
  } else {
    return allItems.value.filter(
      (item) => item.tfCategoriesId === selectedCategory.value
    ).length;
  }
});
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value);
const endIndex = computed(() =>
  Math.min(startIndex.value + pageSize.value, totalItems.value)
);
const paginatedItems = computed(() => {
  const filtered = selectedCategory.value
    ? allItems.value.filter(
        (item) => item.tfCategoriesId === selectedCategory.value
      )
    : allItems.value;
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

// 確認轉跳到tax-free
import { ElMessage, ElMessageBox } from "element-plus";
const itemId = ref();
const dialog = ref(false);
const routerCheck = (Id) => {
  itemId.value = Id;
  dialog.value = true;
  // ElMessageBox.confirm("即將前往免稅商城", "Warning", {
  //   confirmButtonText: "確認前往",
  //   cancelButtonText: "取消",
  //   type: "warning",
  // }).then(() => {
  //document.location.href = `/tax-free/TaxFreeProductSingle?id=${itemId}`;
  // });
};
const routerToTF = () => {
  document.location.href = `/tax-free/TaxFreeProductSingle?id=${itemId.value}`;
};
</script>

<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card
      width="400"
      prepend-icon="mdi-update"
      text="即將前往免稅商城"
      title="即將前往免稅商城"
    >
      <template v-slot:actions>
        <v-btn class="ms-auto" text="取消" @click="dialog = false"></v-btn>
        <v-btn class="ms-auto" text="確認" @click="routerToTF"></v-btn>
      </template>
    </v-card>
  </v-dialog>

  <!-- Testimonials Section Start -->
  <section class="testimonials p-40">
    <div class="container-fluid">
      <div class="testimonials-box bg-white light-shadow br-20">
        <div class="row align-items-center">
          <div
            class="col-xl-7 offset-xl-1"
            data-sal="slide-right"
            data-sal-duration="800"
            data-sal-delay="100"
            data-sal-easing="ease-in-out"
            style="margin-left: 0px"
          >
            <el-carousel indicator-position="outside" style="height: 600px">
              <el-carousel-item
                v-for="item in paginatedItems"
                :key="item.id"
                style="height: 600px"
              >
                <a href="" @click.prevent="routerCheck(item.id)">
                  <img
                    :src="item.image"
                    alt="product-img"
                    style="
                      object-fit: cover;
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      display: block;
                      min-width: 100%;
                      min-height: 100%;
                      transform: translate(-50%, -50%);
                    "
                  />
                </a>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div
            class="col-xl-4"
            data-sal="slide-left"
            data-sal-duration="800"
            data-sal-delay="100"
            data-sal-easing="ease-in-out"
          >
            <div class="text-area">
              <h5 class="color-primary mb-16">免稅商城</h5>
              <h3 class="h-61 bold lightest-black">輕鬆預定免稅商品</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Testimonials Section End -->
</template>

<style scoped>
/* .divv {
  width: 105%;
  height: 90%;
} */
.cardstyle {
  height: 500px;
}

.container {
  position: relative;
  /* 设置容器为相对定位 */
  width: 4000px;
  /* 或根据你的需求设置宽度 */
}

.background-image {
  border-radius: 30px;
  width: 900px;
  /* 让图片填充整个容器 */
  height: 350px;
  /* 让图片填充整个容器 */
}

.text-overlay {
  position: absolute;
  /* 绝对定位文字 */
  z-index: 2;
  /* 确保文字在图片之上 */
  top: 50%;
  /* 调整位置让文字在容器中垂直居中 */
  left: 60%;
  /* 调整位置让文字在容器中水平居中 */
  transform: translate(-50%, -50%);
  /* 使用 transform 精确居中文字 */
  color: white;
  /* 根据需要设置文字颜色 */
}

.country {
  position: absolute;
  top: 50%;

  margin-left: 110px;
  left: 70%;
  transform: translate(80%, -50%);
}

.airPortName {
  position: relative;
  padding-top: 190px;
  left: -20%;
  top: 50%;
}
</style>
