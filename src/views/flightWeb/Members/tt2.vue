<template></template>

<script setup>
// model变量名称可随意取
import { defineModel, onUpdated } from "vue";
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
const model = defineModel();

const rrr = {
  id: 1,
};

setInterval(() => {
  counter.count += 1;
  console.log(counter.count);
}, 1000);

onUpdated(() => {
  console.log(model.value);
});
</script>
