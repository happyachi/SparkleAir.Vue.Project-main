<script setup>
import HomeCategory from "./components/HomeCategory.vue";
import HomeBanner from "./components/HomeBanner.vue";
import HomeProduct from "./components/HomeProduct.vue";
import { gettfitem, gettfcategory, gettfitemID } from '@/apis/taxfree.js';
import { ref, computed, watchEffect, onUpdated, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

//抓後端的所有商品資訊
const getitem = ref([])
gettfitem().then((res) => {
  getitem.value = res
  // console.log(getitem.value);
})

//抓後端的所有商品分類
const getcategory = ref([])
gettfcategory().then((res) => {
  getcategory.value = res
  // console.log(getcategory.value);
})




</script>

<template>
  <HomeBanner />

  <HomeCategory />

  <HomeProduct />


  <!--
Start Call To Action
==================================== -->
  <div class="call-to-action bg-gray section">
    <div class="container">
      <div class="row">
        <!-- <div class="col-md-12 text-center">
          <div class="title">
            <h2>SUBSCRIBE TO NEWSLETTER</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat,
              <br />
              facilis numquam impedit ut sequi. Minus facilis vitae excepturi
              sit laboriosam.
            </p>
          </div>
          <div class="col-lg-6 col-md-offset-3">
            <div class="input-group subscription-form">
              <input type="text" class="form-control" placeholder="Enter Your Email Address" />
              <span class="input-group-btn">
                <button class="btn btn-main" type="button">
                  Subscribe Now!
                </button>
              </span>
            </div> -->
        <!-- /input-group -->
      </div>
      <!-- /.col-lg-6 -->
    </div>

    <!-- End row -->

    <!-- End container -->
  </div>
  <!-- End section -->

  <!-- Modal -->
  <div class="modal product-modal fade" id="product-modal">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <i class="tf-ion-close"></i>
    </button>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12">
              <div class="modal-image" v-if="selectedProduct">
                <img class="img-responsive" :src="selectedProduct.image"
                  style="width: 400px; height: 400px; object-fit: cover;" alt="product-img" />
              </div>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
              <div class="product-short-details" v-if="selectedProduct">
                <h2 class="product-title">{{ selectedProduct.name }}</h2>
                <p class="product-price">${{ selectedProduct.unitPrice }}</p>
                <p class="product-short-description">{{ selectedProduct.description }}</p>

                <a href="/tax-free/TaxFreeCart" class="btn btn-main">Add To Cart</a>
                <a href="/tax-free/TaxFreeProductSingle" class="btn btn-transparent">View Product
                  Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /.modal -->

  <div class="section instagram-feed">
    <div class="container">
      <div class="row">
        <div class="title">
          <h2>想想要放甚麼</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="instagram-slider" id="instafeed"
            data-accessToken="IGQVJYeUk4YWNIY1h4OWZANeS1wRHZARdjJ5QmdueXN2RFR6NF9iYUtfcGp1NmpxZA3RTbnU1MXpDNVBHTzZAMOFlxcGlkVHBKdjhqSnUybERhNWdQSE5hVmtXT013MEhOQVJJRGJBRURn">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
