<script setup>

const data = [
  {
    place: "Switzerland Alps",
    title: "SAINT",
    title2: "ANTONIEN",
    description:
      "多作法之我健一！美案認是什院下構與改發物者低團成地樣消怎現年便不，公決育空組大改風好化聯，臉西修員，維賽是出只。有看為卻亮，然轉黑去不部廠著念的後報日言林終知木手動",
    image: "https://assets.codepen.io/3685267/timed-cards-1.jpg",
  },
  {
    place: "Japan Alps",
    title: "NANGANO",
    title2: "PREFECTURE",
    description:
      "出的品嚴度張中，質山哥常軍，傳分識自：校山人現交旅，一育說後年我地代東下雄靈們果、象在考近異有境轉故，舉變正然無三銀名黃國後我看知市氣會廣！還工動的生劇年童多不師個",
    image: "https://assets.codepen.io/3685267/timed-cards-2.jpg",
  },
  {
    place: "Sahara Desert - Morocco",
    title: "MARRAKECH",
    title2: "MEROUGA",
    description:
      "似新文心作到數如以要：能輕是不問上廠國寶，不能由行增營意不後，到受羅心水洲！現會輪有該不政時我回走跟是拿片不保取行解是王想不面影別遠過緊事自術同法當進近生林又政來口他天後議法代然他新軍長腳集的愛成。",
    image: "https://assets.codepen.io/3685267/timed-cards-3.jpg",
  },
  {
    place: "Sierra Nevada - USA",
    title: "YOSEMITE",
    title2: "NATIONAL PARAK",
    description:
      "香請起由呢向精業父觀的技像留決靜紅眼那詩一，比員己無行日及道風風，平氣備城親了中並就且河力在鄉……女前接力得分商樂開；線代我年港斷人小得：著年製目企無效覺這許需好幾友票",
    image: "https://assets.codepen.io/3685267/timed-cards-4.jpg",
  },
  {
    place: "Tarifa - Spain",
    title: "LOS LANCES",
    title2: "BEACH",
    description:
      "組現所品已果化集。你廣行否處。將建居無不理，有密絕北對味海天盡代流背小華不就夜部每易夫小，的今西一都法下模體從術養，體加了著、光辦現笑東下。流十開，它問美葉總出他景東",
    image: "https://assets.codepen.io/3685267/timed-cards-5.jpg",
  },
  {
    place: "Cappadocia - Turkey",
    title: "Göreme",
    title2: "Valley",
    description:
      "星爭名童車我們，開做沒眼價行山們，定國冷到學沒之；孩美人從加院定高此人我命母她。上真起不；保年這女不統好人過每；了好洋、不費強間有這投，家們天有，是一天會",
    image: "https://assets.codepen.io/3685267/timed-cards-6.jpg",
  },
];



</script>

<template>
  <!-- Travel us sec Start -->


  <h3 class="fw-700 lightest-black mb-md-0 mb-3"> </h3>
  <el-carousel height="400px" direction="vertical" motion-blur :autoplay="true">
    <el-carousel-item v-for="item in data" :key="item">
      <img :src="item.image" alt="carousel-image" style="width: 100%; height: 100%; object-fit: cover; " />
      <h2 style="color: white; position: absolute; top: 80px; left: 50px; ">{{ item.place }}</h2>
      <h5 style="color:white; position: absolute; top:150px; left: 50px;">{{ item.title }}</h5>
      <h5 style="color:white; position: absolute; top:180px; left: 50px;">{{ item.title2 }}</h5>
      <p style="color:white; position: absolute; top:220px; left: 50px;">{{ item.description }}</p>
    </el-carousel-item>
  </el-carousel>
  <!-- Travel us sec End -->
</template>

<style scoped>
h2 {
  color: white;
  position: relative;
  /* 如果需要设置 position，请确保它是相对定位 */
  top: 50px;
  left: 50px;
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.titleone {
  font-weight: 600;
  font-size: 72px;


}
</style>
