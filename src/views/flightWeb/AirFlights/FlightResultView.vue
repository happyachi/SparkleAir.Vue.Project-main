<script setup>
import flightDetail from "./components/FlightDetail.vue"
import SearchingVue from "./components/Searching.vue"
import PriceAndDetail from "./components/PriceAndDetail.vue"
import { ref } from "vue"
import TitleBanner from "@/components/flightWebComponents/titleBanner.vue"
import useSessionMixin from "@/mixins/sessionMixin.js"
const flightMixin = useSessionMixin()
const values = flightMixin.flightData.value.values
const flight = flightMixin.flightData.value
const TitleBannerTitle = ref({
    title1: "搜尋票價產品",
    title2: ""
})
</script>
<template>
    <TitleBanner :title="TitleBannerTitle"></TitleBanner>
    <div class="container">
        <div v-if="values.way == 'one'">
            <p
                style="font-size: 30px; font-weight: bold"
                v-if="values.way == 'one'"
            >
                單程: {{ values.selectedDeptAirLata }}
                <i
                    class="fa-solid fa-plane-departure"
                    style="color: #365386"
                ></i>
                {{ values.selectedArriAirLata }}
            </p>
            <flightDetail :num="0"></flightDetail>
            <div>
                <PriceAndDetail></PriceAndDetail>
            </div>
        </div>
        <div v-else>
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
            <SearchingVue
                :departureAirport="values.selectedArriAirLata"
                :arrivalAirport="values.selectedDeptAirLata"
                :departureTime="values.arrivalTime"
                :num="1"
            ></SearchingVue>
        </div>
    </div>
</template>
