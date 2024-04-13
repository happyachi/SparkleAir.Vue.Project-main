<template>
  <h2>客機一覽表</h2>


  <div class=" card cardRow1b flip-card ">
    <h2 class="heading-h4 text-medium">787-10</h2>
    <a href="/AirTypeIndex/787-10" target="" class="card-link cardRow1b-link card-iconBlank--white" title="">
      <div class="media cardRow1b-media">
        <img src="https://www.evaair.com/zh-tw/images/010-787-10_tcm27-69751.png" alt="" class="media-img--width">
      </div>
      <div class="cardRow1b-content">
      </div>
    </a>
  </div>


  <div class="card cardRow1b flip-card ">
    <h2 class="heading-h4 text-medium">777-300ER</h2>
    <a href="/AirTypeIndex/777-300ER" target="" class="card-link cardRow1b-link card-iconBlank--white" title="">
      <div class="media cardRow1b-media">
        <img src="https://www.evaair.com/zh-tw/images/020-787-9_tcm27-69783.png" alt="" class="media-img--width">
      </div>
      <div class="cardRow1b-content">
      </div>
    </a>
  </div>
  <div class="card cardRow1b flip-card ">
    <h2 class="heading-h4 text-medium">A321neo</h2>
    <a href="/AirTypeIndex/A321neo" target="" class="card-link cardRow1b-link card-iconBlank--white" title="">
      <div class="media cardRow1b-media">
        <img src="https://www.evaair.com/zh-tw/images/030-777-300er_tcm27-69785.png" alt="" class="media-img--width">
      </div>
      <div class="cardRow1b-content">
      </div>
    </a>
  </div>
  <div class="card cardRow1b flip-card ">
    <h2 class="heading-h4 text-medium">A350-900</h2>
    <a href="/AirTypeIndex/A350-900" target="" class="card-link cardRow1b-link card-iconBlank--white" title="">
      <div class="media cardRow1b-media">
        <img src="https://www.evaair.com/zh-tw/images/040-a333_tcm27-69787.png" alt="" class="media-img--width">
      </div>
      <div class="cardRow1b-content">
      </div>
    </a>
  </div>


</template>

<script setup>
//import animate from "animate.css";
import { onMounted, ref } from 'vue';



//  const isHover = ref(false);
//  const flipCard =()=>{
//   console.log("in");
//   isHover.value = true;
//  }; 
//  const unflipCard = ()=>{
//   console.log("out");
//   isHover.value = false;
//  };
//const flipCard = ()=> {
//   //console.log("Card:", card); // 检查事件是否被触发
//   //card.classList.add('flipped');
//   a.classList.add("animate__animated");
//   a.classList.add("animate__flipInX"); // 添加 flipped 类
// };


// const unflipCard = () => {
//   //console.log("Card:", card); // 检查事件是否被触发
//   //card.classList.remove('flipped');
//   a.classList.remove("animate__animated");
//   a.classList.remove("animate__flipInX"); // 移除 flipped 类
// };


</script>


<style scoped>
h2 {
  margin-left: 50px;
  margin-bottom: 60px;
}

.card {
  width: 90%;
  /* 將圖片寬度設為父元素的一半 */
  display: block;
  /* 讓圖片成為 block 元素，使 margin 屬性有效 */
  margin: 0 auto;
  /* 水平置中 */
  cursor: pointer;
  border: 1px solid #C1D7F4;
}

.card:last-child {
  margin-bottom: 100px;
}

.card:not(:last-child) {
  margin-bottom: 50px;
}

.card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

/* .flip-card {
  perspective: 1000px;
  transition: transform 0.5s ease; 
} */

/* .flipped .flip-card {
  transform: rotateX(180deg);
} */
</style>