<script setup>
import { PriceFormat } from "./flightJS/CabinHelper"
import useSessionMixin from "@/mixins/sessionMixin.js"
const flightMixin = useSessionMixin()
const values = flightMixin.flightData.value.values
const flights = flightMixin.flightData.value.flights
const passenger = flightMixin.flightData.value.passenger[0]
</script>
<template>
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
                    <h3 class="color-black" style="font-weight: bold">總計</h3>
                </div>
                <h3 class="color-black" style="font-weight: bold">
                    TWD {{ PriceFormat(values.totalPrice) }}
                </h3>
            </div>
        </div>
    </div>
</template>
