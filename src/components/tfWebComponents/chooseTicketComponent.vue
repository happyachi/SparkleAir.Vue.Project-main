<script setup>
import { ref, watch, onUpdated, onMounted } from "vue";
import { GetAirFlightListByMemberId } from "@/apis/TicketApi.js";

const airFlightList = ref();
// airFlightList.value = await GetAirFlightListByMemberId(1);
console.log(airFlightList.value);

console.log(airFlightList.value);
// watch(airFlightList, (newValue, oldValue) => {
//   console.log(airFlightList.value);
// });

// onUpdated(() => {
//   console.log(airFlightList.value);
//   airFlightList.value.length;
// });
</script>

<template>
  5645684640646584
  <div>1119999</div>

  <!-- <div v-if="airFlightList">
    <div class="col" v-for="airFlight in airFlightList" :key="airFlight">
      {{ airFlight.departureAirport }}{{ airFlight.arrivalAirport }}
    </div>
  </div> -->
</template>

<style scoped></style>
