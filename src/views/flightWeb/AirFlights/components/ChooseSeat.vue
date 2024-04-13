<script setup>
import A350_900First from "@/views/flightWeb/AirFlights/components/A350-900First.vue"
import A350_900Economy from "@/views/flightWeb/AirFlights/components/A350-900Economy.vue"
import A350_900Business from "@/views/flightWeb/AirFlights/components/A350-900Business.vue"
import A350_900Premium from "@/views/flightWeb/AirFlights/components/A350-900Premium.vue"
import { updateFlightSeatNum } from "./flightJS/FlightHelper"
import { ref, watch } from "vue"
import useSessionMixin from "@/mixins/sessionMixin.js"
const flightMixin = useSessionMixin()
const values = flightMixin.flightData.value.values
const flights = flightMixin.flightData.value.flights
const passengers = flightMixin.flightData.value.passenger
const currentCabin = ref(flights[0].cabin)
const confirmBtn = () => {
    document.location.href = "/chooseService"
}
</script>
<template>
    <div class="row bg-white br-10 light-shadow p-24 m-0 align-items-center">
        <div class="card">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
                    <li
                        class="nav-item"
                        v-for="flight in flights"
                        :key="flight.cabin"
                    >
                        <a
                            :href="`#${flight.cabin}`"
                            class="cus-btn primary-light primary"
                            :class="{
                                active: flight.cabin == currentCabin
                            }"
                            :aria-current="
                                flight.cabin == currentCabin ? 'true' : 'false'
                            "
                            data-bs-toggle="tab"
                        >
                            {{ flight.departure.airport }} -
                            {{ flight.arrival.airport }}
                            {{ flight.cabin }}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="card-body tab-content">
                <div
                    v-for="flight in flights"
                    :key="flight.cabin"
                    :id="`${flight.cabin}`"
                    class="tab-pane"
                    :class="{
                        active: flight.cabin == currentCabin
                    }"
                >
                    <div class="eachCabin">
                        <div class="cabinDetail br-10 p-24">
                            <div v-if="flight.cabin === '頭等艙'">
                                <A350_900First
                                    :passenger="passengers"
                                    :flight="flight"
                                    :seatNum="flight.seatNum"
                                ></A350_900First>
                            </div>
                            <div v-if="flight.cabin === '商務艙'">
                                <A350_900Business
                                    :passenger="passengers"
                                    :flight="flight"
                                    :seatNum="flight.seatNum"
                                ></A350_900Business>
                            </div>
                            <div v-if="flight.cabin === '豪華經濟艙'">
                                <A350_900Premium
                                    :passenger="passengers"
                                    :flight="flight"
                                    :seatNum="flight.seatNum"
                                ></A350_900Premium>
                            </div>
                            <div v-if="flight.cabin === '經濟艙'">
                                <A350_900Economy
                                    :passenger="passengers"
                                    :flight="flight"
                                    :seatNum="flight.seatNum"
                                ></A350_900Economy>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div
        style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 10px;
        "
    >
        <button
            class="cus-btn"
            @click="confirmBtn"
            style="font-weight: bold; font-size: 30px"
        >
            確認選擇座位
        </button>
    </div>
</template>
<style scoped>
.card {
    border: none;
}
.cus-btn.primary.active {
    background-color: #365386;
    color: white;

    :hover {
        background-color: #dcbf85;
    }
}
.card .card-header {
    background: transparent;
    border: none;
    padding: 0;
    border-radius: 0;
}

.card .card-header .nav-tabs {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1px;
    margin: 0;
    padding: 0px;
    border-radius: 0px;
    background: transparent;
}

.card .card-header .nav-tabs li {
    width: calc(25% - 1px);
}

.card .card-header .nav-tabs li a {
    width: 100%;
}

.card .card-header .nav-tabs li a:hover {
    background: #dcbf85;
}

@media (max-width: 1099px) {
    .card .card-header .nav-tabs li {
        width: calc(50% - 1px);
    }
}

@media (max-width: 420px) {
    .card .card-header .nav-tabs li.flight-sec {
        width: calc(100% - 1px);
    }
}

.card .card-body {
    padding: 0;
    padding-top: 32px;
}
</style>
