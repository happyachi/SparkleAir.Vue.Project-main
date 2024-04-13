<script setup>
import LayoutHeader from "./components/layoutHeader.vue";
import LayoutMainMenu from "./components/layoutMainMenu.vue";
import LayoutFooter from "./components/layoutFooter.vue";
import layoutFixed from "./components/layoutFixed.vue";
import { onMounted } from 'vue'

</script>

<template>
  <layoutFixed />
  <LayoutHeader />
  <LayoutMainMenu />
  <!-- 二級路由出口 -->
  <RouterView></RouterView>

  <LayoutFooter />

</template>

<style>
@import url("@/tfWeb/plugins/themefisher-font/style.css");
@import url("@/tfWeb/plugins/bootstrap/css/bootstrap.min.css");
@import url("@/tfWeb/plugins/animate/animate.css");
@import url("@/tfWeb/plugins/slick/slick.css");
@import url("@/tfWeb/plugins/slick/slick-theme.css");
@import url("@/tfWeb/css/style_copy.css");
</style>
