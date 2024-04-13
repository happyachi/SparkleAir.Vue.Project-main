<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useMemberStore } from "@/stores/members";

const memberStore = useMemberStore();
const discounts = ref([]);

const loadDiscounts = async () => {
  try {
    const response = await axios.get("http://localhost:8889/api/CampaignsDiscount/CartDiscount/4");
    discounts.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("An error occurred while fetching campaigns:", error);
  }
};

onMounted(() => {
  loadDiscounts();
});

</script>

<template>
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
        <div class="col-xl-4 mb-lg-0 mb-32">
          <div class="flight-booking-detail light-shadow">
            <div class="flight-title">
              <!-- 購物車Start -->
              <h4 class="color-white">購物車</h4>
            </div>
            <div class="box bg-white p-24">
              <div class="d-flex align-items-center justify-content-between mb-24">
                <div>
                  <h5 class="color-black">Sub Total</h5>
                  <p class="dark-gray">Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <h5 class="color-black">$640</h5>
              </div>
              <hr class="bg-medium-gray mb-24" />
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <h4 class="color-black">Total</h4>
                </div>
                <h4 class="color-black">$600</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Flight-Booking End -->
</template>

<style scoped></style>
