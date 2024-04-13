<script setup>
import SearchingVue from './components/Searching.vue';
import TitleBanner from '@/components/flightWebComponents/titleBanner.vue';
import { onMounted, ref } from 'vue';
import useSessionMixin from '@/mixins/sessionMixin.js';
const flightMixin = useSessionMixin();
const values = flightMixin.flightData.value.values;
const flight = flightMixin.flightData.value;
console.log(flight);
const TitleBannerTitle = ref({
    title1: '搜尋票價產品',
    title2: '',
});
</script>
<template>
    <TitleBanner :title="TitleBannerTitle"></TitleBanner>
    <div class="container">
        <div v-if="values.way == 'one'">
            <p
                style="font-size: large; font-weight: bold"
                v-if="values.way == 'one'"
            >
                單程: {{ values.selectedDeptAirLata }}
                <i
                    class="fa-solid fa-plane-departure"
                    style="color: #365386"
                ></i>
                {{ values.selectedArriAirLata }}
            </p>
            <SearchingVue
                :departureAirport="values.selectedDeptAirLata"
                :arrivalAirport="values.selectedArriAirLata"
                :departureTime="values.departureTime"
                :num="0"
            ></SearchingVue>
        </div>
        <div v-else>
            <p style="font-size: large; font-weight: bold">
                去程: {{ values.selectedDeptAirLata }}
                <i
                    class="fa-solid fa-plane-departure"
                    style="color: #365386"
                ></i>
                {{ values.selectedArriAirLata }}
            </p>
            <SearchingVue
                :departureAirport="values.selectedDeptAirLata"
                :arrivalAirport="values.selectedArriAirLata"
                :departureTime="values.departureTime"
                :num="0"
            ></SearchingVue>
        </div>
    </div>
</template>
