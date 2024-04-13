<script setup>
import CouponCart from "@/components/flightWebComponents/Campaigns/CouponCart.vue";
import { onMounted, watchEffect, watch, ref, computed } from "vue";
import { defineStore } from "pinia";
import { useCouponStore } from "@/stores/coupon";
import PriceDetail from "@/views/flightWeb/AirFlights/components/PriceDetail.vue";
import { PriceFormat } from "@/views/flightWeb/AirFlights/components/flightJS/CabinHelper";
import Detail from "@/views/flightWeb/AirFlights/components/Detail.vue";
import ChooseSeat from "@/views/flightWeb/AirFlights/components/ChooseSeat.vue";
import useSessionMixin from "@/mixins/sessionMixin.js";
import Luggagepurchase from "@/views/flightWeb/Luggage/Luggagecomponent.vue"; //引用畫面
import DiscountMile from "@/components/flightWebComponents/Mileage/DiscountMile.vue"; //引用畫面
import Payradio from "@/components/flightWebComponents/Payment/Payradio.vue";
import { usePaymentStore } from "@/stores/payment.js";
import axios from "axios";

const paymentStore = usePaymentStore();

const flightMixin = useSessionMixin();
const values = flightMixin.flightData.value.values;
const flights = flightMixin.flightData.value.flights;
const chooseSeat = ref(false);
const chooseMeal = ref(false);
const chooseLuggage = ref(false);

const mileDiscountPrice = ref(0);
const couponDiscount = useCouponStore();
const couponDiscountAmount = computed(() => {
  return couponDiscount.selectedCoupon
    ? couponDiscount.selectedCoupon.discountAmount
    : 0;
});

const originalTotalPrice = ref(values.totalPrice); // 假设这是你的原始总价

const finalPrice = computed(() => {
  // 检查是否有选中的优惠券并且优惠券有最终价格
  if (
    couponDiscount.selectedCoupon &&
    couponDiscount.selectedCoupon.finalPrice
  ) {
    return couponDiscount.selectedCoupon.finalPrice;
  } else {
    // 如果没有选中的优惠券或优惠券没有最终价格，就返回原始总价
    return originalTotalPrice.value;
  }
});

const TitleBannerTitle = ref({
  title1: "附加",
  title2: "服務",
});

//觸發購買按鈕
const buyclick = async () => {
  console.log(finalPrice.value);
  console.log("Selected Coupon:", couponDiscount.selectedCoupon);
  values.finalPrice = parseInt(finalPrice.value);
  const passSelect = sessionStorage.getItem("payMethod");
  console.log(passSelect);
  paymentStore.selectedOption = passSelect;
  if (flights[0].seatNum == "" && flights[1].seatNum == "") {
    alert("請選擇座位");
  }
  if (passSelect === "PayPal") {
    // 渲染 PayPal 按钮
  } else if (
    passSelect === "綠界科技" &&
    flights[0].seatNum != "" &&
    flights[1].seatNum != ""
  ) {
    paymentStore.ecPayMethod(
      parseInt(finalPrice.value),
      "機票購買",
      "GetTicketOrder"
    );
  } else if (passSelect === "VISA卡") {
    paymentStore.testMethod(
      parseInt(finalPrice.value),
      "機票購買",
      "GetTicketOrder"
    );
  } else {
    alert("請選擇付款方式");
  }
};
onMounted(() => {
  values.finalPrice = parseInt(finalPrice.value);
});
watch(() => {
  values.finalPrice = parseInt(finalPrice.value);
});
</script>
<template>
  <TitleBanner :title="TitleBannerTitle"></TitleBanner>
  <div class="page-content m-0">
    <!-- Flight-Booking Start -->
    <section
      class="flight-booking"
      data-sal="slide-up"
      data-sal-duration="800"
      data-sal-delay="100"
      data-sal-easing="ease-in-out"
    >
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-8">
            <div class="booking-form">
              <div class="wizard-content overflow-visible mb-24">
                <fieldset id="step-2" class="tab-pane show wizard-fieldset p-0">
                  <div id="wizardValidator">
                    <div class="detail-form mb-32">
                      <h2 class="black p-0 mb-40" style="font-weight: bold">
                        加購服務
                      </h2>
                      <div class="row service">
                        <el-card style="max-width: 350px; height: 310px">
                          <el-image
                            src="https://images.unsplash.com/photo-1505164294036-5fad98506d20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MzI2fHx8ZW58MHx8fHx8"
                            style="
                              object-fit: contain;
                              max-width: 100%;
                              height: 200px;
                              border-radius: 10px;
                            "
                          />
                          <template #footer>
                            <div>
                              <el-button
                                plain
                                @click="chooseSeat = true"
                                link
                                color="rgba(54, 84, 134)"
                                size="large"
                              >
                                選擇座位
                              </el-button>
                              <el-dialog
                                v-model="chooseSeat"
                                width="70%"
                                align-center
                                :show-close="false"
                                :lock-scroll="false"
                                :close-on-press-escape="false"
                                :close-on-click-modal="false"
                              >
                                <template #header="{ titleId, titleClass }">
                                  <div class="my-header">
                                    <h4 :id="titleId" :class="titleClass">
                                      座位選擇
                                    </h4>
                                  </div>
                                </template>
                                <div class="container">
                                  <ChooseSeat
                                    :finalPrice="finalPrice"
                                  ></ChooseSeat>
                                </div>
                              </el-dialog>
                            </div>
                          </template>
                        </el-card>
                        <el-card style="max-width: 350px; height: 310px">
                          <el-image
                            src="https://plus.unsplash.com/premium_photo-1661301088134-72715e2475be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bHVnZ2FnZXxlbnwwfHwwfHx8MA%3D%3D"
                            style="
                              object-fit: contain;
                              max-width: 100%;
                              height: 200px;
                              border-radius: 10px;
                            "
                          />
                          <template #footer>
                            <div>
                              <el-button
                                plain
                                @click="chooseLuggage = true"
                                link
                                color="rgba(54, 84, 134)"
                                size="large"
                              >
                                行李加購
                              </el-button>
                              <el-dialog
                                v-model="chooseLuggage"
                                width="80%"
                                align-center
                                :show-close="false"
                                :lock-scroll="false"
                              >
                                <template #header="{ titleId, titleClass }">
                                  <div class="my-header">
                                    <h4 :id="titleId" :class="titleClass">
                                      行李加購
                                    </h4>
                                    <!-- <el-button @click="chooseLuggage = false" class="form-wizard-next-btn cus-btn w-20 ">　加購　</el-button> -->
                                  </div>
                                </template>
                                <div class="container">
                                  <Luggagepurchase></Luggagepurchase>
                                </div>
                              </el-dialog>
                            </div>
                          </template>
                        </el-card>
                        <el-card style="max-width: 350px; height: 310px">
                          <el-image
                            src="https://images.unsplash.com/photo-1594998893017-36147cbcae05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fG1lYWx8ZW58MHx8MHx8fDA%3D"
                            style="
                              object-fit: contain;
                              max-width: 100%;
                              height: 200px;
                              border-radius: 10px;
                            "
                          />
                          <template #footer>
                            <div>
                              <el-button
                                plain
                                @click="chooseMeal = true"
                                link
                                color="rgba(54, 84, 134)"
                                size="large"
                              >
                                餐點選擇
                              </el-button>
                              <el-dialog
                                v-model="chooseMeal"
                                width="80%"
                                align-center
                                :show-close="false"
                                :lock-scroll="false"
                              >
                                <template #header="{ titleId, titleClass }">
                                  <div class="my-header">
                                    <h4 :id="titleId" :class="titleClass">
                                      餐點選擇
                                    </h4>
                                  </div>
                                </template>
                              </el-dialog>
                            </div>
                          </template>
                        </el-card>
                      </div>
                    </div>
                    <div class="detail-form term_conditions mb-32">
                      <div class="row" style="margin: 10px">
                        <div style="margin-bottom: 10px">
                          <CouponCart></CouponCart>
                        </div>
                        <DiscountMile
                          v-model:price="mileDiscountPrice"
                        ></DiscountMile>
                      </div>
                    </div>
                    <div class="detail-form extra-item p-24 mb-32">
                      <div class="row">
                        <Payradio></Payradio>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex gap-24">
                    <a
                      href="javascript:;"
                      class="form-wizard-next-btn cus-btn w-100"
                      v-on:click="buyclick"
                    >
                      確認
                    </a>
                  </div>
                </fieldset>
              </div>
              <!-- <h6><a href="#step-2" class="cus-btn float-end btn"><span class="icon"><img src="assets/media/icons/orange-cart.png" alt=""></span>Continue</a></h6> -->
              <!-- <div class="sw-toolbar-elm toolbar toolbar-bottom" role="toolbar">
                                    <button class="btn sw-btn-prev sw-btn" type="button">Continue</button>
                                    <button class="btn sw-btn-next sw-btn" type="button">Continue</button>
                                </div> -->
            </div>
          </div>
          <div class="col-xl-4 mb-lg-0 mb-32">
            <Detail></Detail>
            <div class="flight-booking-detail light-shadow">
              <div class="flight-title">
                <h3 class="color-white" style="font-weight: bold">價格明細</h3>
              </div>
              <div class="box bg-white p-24">
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <h4 class="color-black" v-if="values.adultCount > 0">
                      成人 x {{ values.adultCount }}
                    </h4>
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <h4 class="color-black">票價</h4>
                  </div>
                  <h4 class="color-black">
                    TWD {{ PriceFormat(values.totalPrice) }}
                  </h4>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <h4 class="color-black">里程折抵</h4>
                  </div>
                  <h4 class="color-black">
                    TWD {{ PriceFormat(mileDiscountPrice) }}
                  </h4>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <h4 class="color-black">優惠券折抵</h4>
                  </div>
                  <h4 class="color-black">TWD {{ couponDiscountAmount }}</h4>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <h3 class="color-black" style="font-weight: bold">總計</h3>
                  </div>

                  <h3 class="color-black" style="font-weight: bold">
                    TWD {{ PriceFormat(finalPrice) }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Flight-Booking End -->
  </div>
</template>
<style scoped>
.el-button {
  font-weight: bold;
  font-size: 20px;
}

.my-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  h4 {
    font-weight: bold;
    font-size: 30px;
    color: rgb(54, 84, 134);
  }
}

.service {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
