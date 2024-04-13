<script setup>
import { ref, onMounted } from 'vue';
import TaxFreeShop from "@/views/TFWeb/Shop/index.vue";

const menu = ref([
  {
    bigCategory: "主題企劃",
    children: [
      {
        title: "優惠專區",
        href: "/tax-free/TaxFreeShop",
      },
      {
        title: "新品上架",
        href: "/tax-free/TaxFreeShop",
      },
      {
        title: "熱銷商品",
        href: "/tax-free/TaxFreeShop",
      },
    ],

  },
  {
    bigCategory: "商品分類",
    children: [
      {
        title: "電子產品",
        href: "/tax-free/TaxFreeShop",
      },
      {
        title: "時尚與配飾",
        href: "/tax-free/TaxFreeShop",
      },
      {
        title: "美容與保健品",
        href: "/tax-free/TaxFreeShop",
      },
      {
        title: "家居與生活用品",
        href: "/tax-free/TaxFreeShop",
      },
      {
        title: "食品與飲料",
        href: "/tax-free/TaxFreeShop",
      },
      {
        title: "運動與戶外用品",
        href: "/tax-free/TaxFreeShop",
      },
      {
        title: "旅行與行李",
        href: "/tax-free/TaxFreeShop",
      },
    ],
  },

  {
    bigCategory: "會員專區",
    children: [

      {
        title: "會員中心",
        href: "/tax-free/TaxFreeDashBoard",
      },
      {
        title: "購物車",
        href: "/tax-free/TaxFreeCart",
      },
      {
        title: "願望清單",
        href: "/tax-free/TaxFreeBlogRightSidebar",
      },
    ],
  },
]);
</script>

<template>
  <!-- Main Menu Section -->
  <div class="menu">
    <nav class="navbar navigation">
      <div class="container">
        <div class="navbar-header">
          <h2 class="menu-title">Main Menu</h2>
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
            aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <!-- / .navbar-header -->

        <!-- Navbar Links -->
        <div id="navbar" class="navbar-collapse collapse text-center">
          <ul class="nav navbar-nav">
            <!-- Home -->
            <li class="dropdown">
              <a href="/tax-free/">首頁</a>
            </li>
            <!-- / Home -->

            <!-- Elements -->
            <li class="dropdown">
              <a href="/tax-free/TaxFreeShop">全部商品</a>
            </li>

            <li class="dropdown dropdown-slide" v-for="bigCategory in menu" :key="bigCategory.bigCategory">
              <a href="#!" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="350"
                role="button" aria-haspopup="true" aria-expanded="false">{{ bigCategory.bigCategory }}
                <span class=""></span></a>
              <div class="dropdown-menu">
            <li v-for="item in bigCategory.children" :key="item.title">
              <a :href="item.href">{{ item.title }}</a>
            </li>
        </div>
        </li>

        <li class="dropdown">
          <a href="/tax-free/TaxFreeFAQ">常見問題</a>
        </li>
        <!-- / Elements -->
        </ul>
        <!-- / .nav .navbar-nav -->
      </div>
      <!--/.navbar-collapse -->
  </div>
  <!-- / .container -->
  </nav>
  </div>
</template>

<style scoped></style>
