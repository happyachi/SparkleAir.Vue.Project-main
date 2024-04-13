<script setup>
import { ActiveRegister } from "@/apis/loginApis.js";
import { useRoute } from "vue-router";
const route = useRoute();
const memberId = route.query.memberId;
const confirmCode = route.query.confirmCode;
console.log(memberId, confirmCode);
ActiveRegister(memberId, confirmCode);
</script>

<template>
  <div
    class="col justify-content-center mt-80 mb-80"
    style="text-align: center; margin-bottom: 100px"
  >
    <div class="col justify-content-center" style="margin: auto">
      <img
        height="100"
        width="100"
        src="https://lh3.googleusercontent.com/d/1wdXckQ7txU33aKkQgiOqpG-8DrOJzZFS"
      />
      <br />
      <br />
      <h2>開通成功</h2>
      可以由此帳號進行登入了
    </div>
  </div>
</template>

<style scoped></style>
