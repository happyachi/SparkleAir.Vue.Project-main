<script setup>
import flightDetail from "./components/FlightDetail.vue"
import PriceAndDetail from "./components/PriceAndDetail.vue"
import SearchingVue from "./components/Searching.vue"
import { ref, computed } from "vue"
import TitleBanner from "@/components/flightWebComponents/titleBanner.vue"
import useSessionMixin from "@/mixins/sessionMixin.js"
const flightMixin = useSessionMixin()
const values = flightMixin.flightData.value.values
const flight = flightMixin.flightData.value
const TitleBannerTitle = ref({
    title1: "搜尋票價產品",
    title2: ""
})
values.totalPrice = computed(() => {
    const price1 = flight.flights[0].price
    const price2 = flight.flights[1].price

    return price1 + price2
})
</script>
<template>
    <TitleBanner :title="TitleBannerTitle"></TitleBanner>
    <div class="container">
        <div v-if="values.way == 'round'">
            <p style="font-size: 30px; font-weight: bold">
                去程: {{ values.selectedDeptAirLata }}
                <i
                    class="fa-solid fa-plane-departure"
                    style="color: #365386"
                ></i>
                {{ values.selectedArriAirLata }}
            </p>
            <flightDetail :num="0"></flightDetail>
            <p style="font-size: 30px; font-weight: bold">
                回程: {{ values.selectedArriAirLata }}
                <i
                    class="fa-solid fa-plane-departure"
                    style="color: #365386"
                ></i>
                {{ values.selectedDeptAirLata }}
            </p>
            <flightDetail :num="1"></flightDetail>
        </div>
        <PriceAndDetail></PriceAndDetail>
    </div>
</template>
