<template>
    <!-- 這是Title區 -->
    <TitleBanner :title="TitleBannerTitle"></TitleBanner>
    <section class="booking mb-60">
        <div class="container-fluid">
            <div class="content" style="margin-top: 250px">
                <div class="card" style="padding-bottom: 15px">
                    <div class="card-body">
                        <flight-search></flight-search>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref } from 'vue'
import TitleBanner from '@/components/flightWebComponents/titleBanner.vue'
const TitleBannerTitle = ref({
    title1: '搜尋',
    title2: '航班'
})
import FlightSearch from './components/FlightSearch.vue'
</script>
<style scoped>
.card {
    border: none;
}
</style>
