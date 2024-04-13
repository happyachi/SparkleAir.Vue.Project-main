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
</script>

<template>
  <!-- Testimonials Section Start -->
  <section class="testimonials p-40">
    <div class="container-fluid">
      <div class="testimonials-box bg-white light-shadow br-20">
        <div class="row align-items-center">
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
          <div
            class="col-xl-7 offset-xl-1"
            data-sal="slide-right"
            data-sal-duration="800"
            data-sal-delay="100"
            data-sal-easing="ease-in-out"
          >
            <div class="testimonial-slider">
              <div
                class="review-block bg-lightest-gray pad-32 br-10"
                v-for="item in paginatedItems"
                :key="item.id"
              >
                <div class="user-image d-flex mb-32">
                  <img
                    :src="item.image"
                    alt="product-img"
                    style="width: 200px; height: 200px; object-fit: cover"
                  />
                </div>
                <div class="product-content">
                  <h4>{{ item.name }}</h4>
                  <p class="price">${{ item.unitPrice }}</p>
                </div>
              </div>
              <div class="review-block bg-lightest-gray pad-32 br-10">
                <div class="user-image d-flex mb-32">
                  <img src="../moban7664/static/picture/user-21.png" alt="" />
                  <img src="../moban7664/static/picture/user-1.png" alt="" />
                  <img src="../moban7664/static/picture/user-3.png" alt="" />
                </div>
                <h6 class="light-black mb-32">
                  Lorem ipsum dolor sit amet consectetur. Eget ornare ac
                  eleifend leo mauris suspendisse. Bibendum suspendisse proin
                  aliquet porttitor sed vulputate proin ultrices et. Ut leo
                  integer nunc amet curabitur nulla ipsum. Ultrices proin sit a
                  aliquet lorem. Nisl lobortis amet eu vitae eget hendrerit a.
                  Erat amet facilisi sed nunc consectetur.
                </h6>
                <h5 class="light-black mb-2">Mr John Deo</h5>
                <p class="dark-gray">CEO at FlyNow</p>
              </div>
              <div class="review-block bg-lightest-gray pad-32 br-10">
                <div class="user-image d-flex mb-32">
                  <img src="../moban7664/static/picture/user-3.png" alt="" />
                  <img src="../moban7664/static/picture/user-1.png" alt="" />
                  <img src="../moban7664/static/picture/user-21.png" alt="" />
                </div>
                <h6 class="light-black mb-32">
                  Lorem ipsum dolor sit amet consectetur. Eget ornare ac
                  eleifend leo mauris suspendisse. Bibendum suspendisse proin
                  aliquet porttitor sed vulputate proin ultrices et. Ut leo
                  integer nunc amet curabitur nulla ipsum. Ultrices proin sit a
                  aliquet lorem. Nisl lobortis amet eu vitae eget hendrerit a.
                  Erat amet facilisi sed nunc consectetur.
                </h6>
                <h5 class="light-black mb-2">Mr John Deo</h5>
                <p class="dark-gray">CEO at FlyNow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Testimonials Section End -->
</template>

<style scoped></style>
