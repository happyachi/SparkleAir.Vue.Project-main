<script setup>
import { getAllAirport, getByIdAirport } from "@/apis/AIrport.js";
// import { rubberBand } from 'animate.css';
// import {bounce} from '@asika32764/vue-animate';
import { ref, onMounted, watch, computed } from "vue";
import AirportDetail from "@/views/flightWeb/Airport/AirportDetail.vue"; //跳AirportDetail用
import "animate.css";

const get = ref([]);
const display = ref(false);
const airportId = ref();

const test = (itemid) => {
  //todo 做一個先清空ref的方式
  centerDialogVisible.value = true; //顯示
  var chose = data2.value.filter((a) => a.id === itemid); //篩選
  get.value = chose[0]; //取第一筆
  airportId.value = get.value.id;
  console.log(airportId.value);

  display.value = true; //展示
};
const centerDialogVisible = ref(false);
const scrollPosition = ref(0); // 紀錄頁面滾動位置
const data2 = ref([]);

onMounted(() => {
  getAllAirport().then((res) => {
    data2.value = res;
    //console.log($('#product-modal'));
    console.log(data2.value);
  });
  // window.addEventListener('scroll', ()=>{
  //   const newY = window.scrollY;
  //   if (!isNaN(newY)) {
  //     scrollPosition.value = newY;
  //   }
  // });
});

const isActive = ref(false);
setInterval(() => {
  isActive.value = !isActive.value;
}, 1000);

const flights = ref([]); // flights 的數據
</script>

<template>
  <section class="global-travel-hotel p-40">
    <div class="container-fluid">
      <div
        class="d-flex justify-content-between mb-40 flex-md-nowrap flex-wrap"
      >
        <h3
          class="fw-700 lightest-black mb-md-0 mb-3"
          :class="{
            animate__animated: isActive,
            animate__rubberBand: isActive,
          }"
        >
          熱門航點
        </h3>
        <a href="/totalTravel" class="cus-btn">Show More</a>
      </div>
      <div class="row">
        <!-- <div 
                        class="col-xxl-6 col-lg-5"
                        data-sal="slide-right"
                        data-sal-duration="800"
                        data-sal-delay="100"
                        data-sal-easing="ease-in-out"
                    >
                        <img src="../moban7664/static/picture/map.png" alt="" />
                    </div> -->
        <div class="container">
          <div class="col-xxl-12 col-lg-12">
            <div class="row">
              <div
                class="col-lg-4 col-md-4 col-sm-4 div"
                v-for="airports in data2"
                :key="airports.id"
              >
                <div class="hotel-block bg-white p-24 mb-14 divv cardstyle">
                  <div class="content-box">
                    <h5 class="black text-overlay">
                      <h2 class="country">{{ airports.country }}</h2>
                      <h5 class="airPortName">{{ airports.airPortName }}</h5>
                    </h5>
                    <div class="d-flex gap-8 mb-24">
                      <div class="icon d-flex align-items-center gap-8">
                        <!--圖片-->
                        <img
                          :src="airports.img"
                          alt=""
                          class="background-image"
                        />
                        <!-- <h6 class="color-medium-gray">
                                                    Sparkle -
                                                </h6> -->
                      </div>
                      <div class="icon d-flex align-items-center gap-8">
                        <!-- <img
                        src="../moban7664/static/picture/hotel.png"
                        alt=""/> -->
                        <!-- <h6 class="color-medium-gray">
                        Travels</h6> -->
                      </div>
                    </div>
                    <div>
                      <!-- :href="`http://localhost:8888/airports/detail/${airports.id}`"  轉跳網址 -->
                      <!-- v-on:click="test(airports.id)" -->
                      <!-- 原本的按鈕 -->
                      <!-- <a :href="`http://localhost:8888/airports/detail/${airports.id}`" class="cus-btn full-width">Discover
                      </a> -->

                      <button
                        class="cus-btn full-width"
                        @click="test(airports.id)"
                      >
                        <el-button
                          plain
                          @click="test(airports.id)"
                          link
                          size="large"
                        >
                          Discover
                        </el-button>
                      </button>
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
  <!-- Gloabl Travel End -->

  <!-- el-dialog START -->
  <el-dialog
    v-model="centerDialogVisible"
    title="航點"
    width="55%"
    :lock-scroll="false"
  >
    <div>
      <AirportDetail
        :detail="get"
        v-if="display"
        :id="`${airportId}`"
      ></AirportDetail>
    </div>
  </el-dialog>
  <!--el-dialog  END -->

  <!-- -------------------------- -->
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
