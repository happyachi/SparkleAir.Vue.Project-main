<script setup>

import { onMounted, ref } from "vue";


onMounted(() => {
  (function ($) {
    "use strict";

    // Video Lightbox
    $(document).on("click", '[data-toggle="lightbox"]', function (event) {
      event.preventDefault();
      $(this).ekkoLightbox();
    });

    $(".hero-slider").slick({
      // autoplay: true,
      infinite: true,
      arrows: true,
      prevArrow:
        "<button type='button' class='heroSliderArrow prevArrow tf-ion-chevron-left'></button>",
      nextArrow:
        "<button type='button' class='heroSliderArrow nextArrow tf-ion-chevron-right'></button>",
      dots: true,
      autoplaySpeed: 7000,
      pauseOnFocus: false,
      pauseOnHover: false,
    });
    $(".hero-slider").slickAnimation();
  })(jQuery);

});




</script>

<template>
  <!-- Hero Banner start -->
  <section class="hero-banner-1">
    <div class="hero-slider">
      <div class="slider-item th-fullpage hero-area"
        style="object-fit:cover; background-image: url(https://lh3.googleusercontent.com/d/1MIn48Jkqi5Rcb-wXyI5jshrM4Rx3RMbx)">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 text-center">
              <p data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".1">
                Sparkle Air
              </p>
              <h1 data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".5">
                Elevate Your Experience <br />
                With Sky's Sparkle.
              </h1>
              <a data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".8" class="btn" href="#">熱門航點</a>
            </div>
          </div>
        </div>
      </div>
      <div class="slider-item th-fullpage hero-area"
        style="object-fit:cover; background-image: url(https://lh3.googleusercontent.com/d/1feV_mSGzmN5U92DcGsqk8sjHehNZCgM1)">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 text-left">
              <p data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".1">
                Sparkle Air
              </p>
              <h1 data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".5">
                Elevate Your Experience <br />
                With Sky's Sparkle.
              </h1>
              <a data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".8" class="btn" href="#">優惠活動</a>
            </div>
          </div>
        </div>
      </div>
      <div class="slider-item th-fullpage hero-area"
        style=" object-fit:cover; background-image: url(https://lh3.googleusercontent.com/d/1HO8YjwutK9pjVfUeEoLi9hzWfomVq2JR) ">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 text-right">
              <p data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".1">
                Sparkle Air
              </p>
              <h1 data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".5">
                Elevate Your Experience <br />
                With Sky's Sparkle.
              </h1>
              <a data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".8" class="btn"
                href="/tax-free/TaxFreeShop">免稅商店</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Hero Banner End -->
</template>

<style scoped></style>
