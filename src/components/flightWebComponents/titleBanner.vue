<script setup>
const props = defineProps({
  title: Object,
});
</script>

<template>
  <!-- Title-Banner Start -->
  <div class="title-banner mb-3">
    <div class="container-fluid">
      <div class="row">
        <div class="banner-area">
          <img
            src="../../flightWeb/static/picture/vacation.png"
            alt=""
            class="left-image"
          />
          <div class="content-box">
            <h1 class="fw-700 lightest-black">
              {{ title.title1 }} <br class="title-break" />
              {{ title.title2 }}
            </h1>
          </div>
          <img
            src="../../flightWeb/static/picture/plane-2.png"
            alt=""
            class="right-image"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- Title-Banner End -->
</template>

<style scoped></style>
