<template>
    <div class="hero-slider">
        <div class="slider-item th-fullpage hero-area"
            style="background-image: url(https://lh3.googleusercontent.com/d/1up5onW0R4BBNw8nMtEiDFUHqzO5tckFa)">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 text-center">
                        <p data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".1">
                            PRODUCTS
                        </p>
                        <h1 data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".5">
                            Elevate Your Experience <br />
                            With Sky's Sparkle.
                        </h1>
                        <a data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".8" class="btn"
                            href="/tax-free/TaxFreeShop">Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="slider-item th-fullpage hero-area"
            style="background-image: url(https://lh3.googleusercontent.com/d/1hC7FqvRBhNdNOLvGPsz6BwaZ6Eht6ArA)">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 text-left">
                        <p data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".1">
                            PRODUCTS
                        </p>
                        <h1 data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".5">
                            Elevate Your Experience <br />
                            With Sky's Sparkle.
                        </h1>
                        <a data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".8" class="btn"
                            href="/tax-free/TaxFreeShop">Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="slider-item th-fullpage hero-area"
            style="background-image: url(https://lh3.googleusercontent.com/d/1feV_mSGzmN5U92DcGsqk8sjHehNZCgM1)">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 text-right">
                        <p data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".1">
                            PRODUCTS
                        </p>
                        <h1 data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".5">
                            Elevate Your Experience <br />
                            With Sky's Sparkle.
                        </h1>
                        <a data-duration-in=".3" data-animation-in="fadeInUp" data-delay-in=".8" class="btn"
                            href="/tax-free/TaxFreeShop">Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { onMounted } from "vue";
import { gettfitem } from '@/apis/taxfree.js';
import { ref } from 'vue';

onMounted(() => {
    (function ($) {
        "use strict";

        // // Instagram Feed
        // if ($("#instafeed").length !== 0) {
        //     var accessToken = $("#instafeed").attr("data-accessToken");
        //     var userFeed = new Instafeed({
        //         get: "user",
        //         resolution: "low_resolution",
        //         accessToken: accessToken,
        //         template:
        //             '<a href="{{link}}"><img src="{{image}}" alt="instagram-image"></a>',
        //     });
        //     userFeed.run();
        // }

        // setTimeout(function () {
        //     $(".instagram-slider").slick({
        //         dots: false,
        //         speed: 300,
        //         // autoplay: true,
        //         arrows: false,
        //         slidesToShow: 6,
        //         slidesToScroll: 1,
        //         responsive: [
        //             {
        //                 breakpoint: 1024,
        //                 settings: {
        //                     slidesToShow: 4,
        //                 },
        //             },
        //             {
        //                 breakpoint: 600,
        //                 settings: {
        //                     slidesToShow: 3,
        //                 },
        //             },
        //             {
        //                 breakpoint: 480,
        //                 settings: {
        //                     slidesToShow: 2,
        //                 },
        //             },
        //         ],
        //     });
        // }, 1500);

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

<style></style>