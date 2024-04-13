<template>
  <div>
    <li>
      <span><b>
      <h3>{{ airports.city }}</h3>
    </b></span>
      <span>
      <h3>　({{ airports.continent }})</h3>
      </span>
    </li>
    <li>
      <span
        ><h3>{{ airports.airPortName }}</h3></span
      ><span
        ><h3>　({{ airports.lata }} )</h3></span
      >
    </li>
    <img :src="airports.img" />
    <li>
      <span><h3>簡介</h3></span>
    </li>
    <div>
      <h4>　　{{ airports.cityIntroduction }}</h4>
    </div>
    <li>
      <span><h3>當地時間(UTC):</h3></span
      ><span
        ><h3>　{{ datepart }}　{{ timepart }}</h3></span
      >
    </li>
  </div>

  <!-- {{detail}}  這裡可以顯示抓到的值-->
</template>

<script setup>
import { GetCurrentPlaceTime } from "@/views/flightWeb/AirFlights/components/flightJS/TimeHelper.js";
import { getByIdAirport } from "@/apis/AIrport.js";
import { onMounted, ref, watch } from "vue";

import { useRoute } from "vue-router";

const airports = ref([]);
const route = useRoute();
const timepart = ref();
const datepart = ref();

const id = ref();
const props = defineProps({
  detail: Object,
  id: String,
});
id.value = props.id;
console.log(id.value);
onMounted(() => {});

const getAirports = async (id) => {
  const res = await getByIdAirport(id);
  airports.value = res;
  timepart.value = GetCurrentPlaceTime(airports.value.timeArea).timePart;
  datepart.value = GetCurrentPlaceTime(airports.value.timeArea).datePart;
};
watch(() => {
  console.log(props.id);
  getAirports(props.id);
});
</script>

<style scoped>
img {
  border-radius: 30px;
  width: 1000px;
  /* 让图片填充整个容器 */
  height: 350px;
  /* 让图片填充整个容器 */
  margin-bottom: 10px;
}

.header {
  background-color: #3991cb; /* 底色米黃 */
  border-radius: 10px 10px 0 0; /* 圓角 */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 輕微陰影 */
  padding: 20px;
  color: #ffffff; /* 白色文本 */
}

.container2 {
  margin-bottom: 200px;
  margin-left: 580px;
}

.image-container {
  /* 如果你希望圖片可以根據容器大小自動調整，可以設置以下屬性 */
  width: 500px; /* 圖片最大寬度 */
  height: 100px; /* 圖片最大高度 */
  margin-left: 40px;
}

h3 {
  font-weight: bold;
}
</style>
