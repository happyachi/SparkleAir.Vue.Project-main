<script setup>
// import LayoutNav from "./components/layoutNav.vue";
import LayoutHeader from "./components/layoutHeader.vue";
import LayoutFooter from "./components/layoutFooter.vue";

// JS檔
// import "@/flightWeb/static/js/jquery-3.6.3.min.js";
// // import "@/flightWeb/static/js/popper.min.js";
// // import "@/flightWeb/static/js/bootstrap.min.js";
// import "@/flightWeb/static/js/bootstrap.bundle.min.js";
// import "@/flightWeb/static/js/slick.min.js";
// import "@/flightWeb/static/js/jquery-appear.js";
// import "@/flightWeb/static/js/jquery-validator.js";
// import "@/flightWeb/static/js/aksVideoPlayer.js";
// import "@/flightWeb/static/js/tilt.jquery.js";
// import "@/flightWeb/static/js/picker.js";
// import "@/flightWeb/static/js/picker.date.js";
// import "@/flightWeb/static/js/autoComplete.js";
// import "@/flightWeb/static/js/jquery.timepicker.min.js";
// import "@/flightWeb/static/js/ionrangeslider.js";
// import "@/flightWeb/static/js/sal.js";
// import "@/flightWeb/static/js/date.js";
// import "@/flightWeb/static/js/app.js";
</script>

<template>
  <!-- Preloader-->
  <!-- <div id="preloader">
    <div class="loader">
      <div class="wait">Veuillez patienter svp</div>
      <div class="plane">
        <img
          src="@/flightWeb/static/picture/4820.gif"
          class="plane-img"
          alt=""
        />
      </div>
      <div class="earth-wrapper">
        <div class="earth"></div>
      </div>
    </div>
  </div> -->
  <div class="o-scroll" id="js-scroll">
    <a
      href="#main-wrapper"
      id="backto-top"
      class="back-to-top"
      style="border-radius: 40px; margin-right: 50px"
      ><i class="fa-solid fa-caret-up"></i
    ></a>
    <div id="main-wrapper" class="main-wrapper mr-4">
      <LayoutNav />
      <LayoutHeader />
      <!-- 二級路由出口 -->
      <main class="wrapper">
        <RouterView></RouterView>
      </main>
      <LayoutFooter />
    </div>
  </div>
  <!-- modal-popup area Start  -->
  <!-- <div class="search-popup">
    <div class="search-popup__overlay search-toggler"></div>
    <div class="search-popup__content">
      <form
        role="search"
        method="get"
        class="search-popup__form"
        action="index.html"
      >
        <input type="text" id="search" placeholder="Search Here..." />
        <button type="submit">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  </div> -->
  <!-- search-popup end-->
</template>

<style>
@import url("@/flightWeb/static/css/ionrangeslider.css");
@import url("@/flightWeb/static/css/font-awesome.css");
@import url("@/flightWeb/static/css/style.css");
@import url("@/flightWeb/static/css/bootstrap.min.css");
@import url("@/flightWeb/static/css/slick.css");
@import url("@/flightWeb/static/css/slick-theme.css");
@import url("@/flightWeb/static/css/datetime.css");
@import url("@/flightWeb/static/css/classic.css");
@import url("@/flightWeb/static/css/classic.date.css");
@import url("@/flightWeb/static/css/jquery.timepicker.min.css");
@import url("@/flightWeb/static/css/ui-autocomplete.css");
@import url("@/flightWeb/static/css/sal.css");
@import url("@/flightWeb/static/css/app.css");
</style>
