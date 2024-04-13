<script setup>
import { ref, onMounted, watch } from "vue";

import router from "@/router";
import { useRoute } from "vue-router";
const route = useRoute();

const routerTo = (name) => {
  router.push({ name: name });
  titleH1.value = titleMenu.filter((x) => x.title == name)[0].titleInfo;
  console.log(route.path);
};

const titleH1 = ref();
const titleMenu = [
  {
    title: "BookingReady",
    titleInfo: "即將出發",
  },
  {
    title: "BookingFinish",
    titleInfo: "已完成",
  },
];

let pathTitle = ref(route.path.split("MemberCenter/BookingManagement/")[1]);
if (pathTitle.value != undefined) {
  routerTo(pathTitle.value);
} else {
  pathTitle.value = "BookingReady";
  router.push({ name: "BookingReady" });
}
console.log(pathTitle.value);
</script>
<template>
  <div class="row pl-2">
    <div class="col-sm-3 col-lg-2 p-0" style="background-color: #ecf2f9">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            :default-active="pathTitle"
            background-color="#ECF2F9"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item
              v-for="item in titleMenu"
              :index="item.title"
              :key="item.title"
              @click="routerTo(item.title)"
            >
              <el-icon><setting /></el-icon>
              <span>{{ item.titleInfo }}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div
      class="col-sm-9 col-lg-10"
      style="min-height: 300px; font-weight: 900 !important"
    >
      <RouterView></RouterView>
    </div>
  </div>
</template>
<style scoped></style>
