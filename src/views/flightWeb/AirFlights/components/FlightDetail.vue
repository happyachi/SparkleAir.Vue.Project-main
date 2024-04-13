<script setup>
import { GetFlight } from "@/apis/FlightApi"
import { onMounted, ref, computed } from "vue"
import {
    getDateTimeParts,
    calculateHourDifference
} from "@/views/flightWeb/AirFlights/components/flightJS/TimeHelper.js"
import {
    GetCheapestPrice,
    GetCabin,
    groupedFlightTicketPrice,
    PriceFormat,
    CabinCodeChange,
    MileCalculater
} from "./flightJS/CabinHelper"
import useSessionMixin from "@/mixins/sessionMixin.js"
const props = defineProps({
    num: Number
})
const flightMixin = useSessionMixin()
const flightData = flightMixin.flightData.value
const number = props.num
const selectFlight = flightMixin.flightData.value.flights[number]
const values = flightMixin.flightData.value.values
const flightId = flightData.flights[number].id
const flight = flightData.flights[number]

if (values.way == "one") {
    values.totalPrice = computed(() => {
        const price1 = flight.flights[0].price

        return price1
    })
}

onMounted(() => {})
</script>
<template>
    <section class="flight-listing-page mb-60">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12 col-lg-12">
                    <div>
                        <div
                            class="flight-block bg-white light-shadow p-24 br-10 mb-16"
                        >
                            <div class="flight-area">
                                <div class="airline-name">
                                    <img
                                        src="../../../../sparkle/SparkleLogoicon.png"
                                        width="90px"
                                        alt=""
                                    />
                                    <div>
                                        <h3 class="lightest-black mb-8">
                                            {{
                                                selectFlight.operatingAirlineName
                                            }}
                                        </h3>
                                        <h4 class="dark-gray">
                                            {{ selectFlight.flightModel }}
                                        </h4>
                                    </div>
                                </div>
                                <div
                                    class="flight-detail"
                                    style="margin-right: 50px"
                                >
                                    <div class="flight-departure">
                                        <h3 class="color-black">
                                            {{
                                                getDateTimeParts(
                                                    flight.departure.dateTime
                                                ).timePart
                                            }}
                                        </h3>
                                        <h3 class="dark-gray text-end">
                                            {{ flight.departure.airport }}
                                        </h3>
                                    </div>
                                    <div
                                        class="d-inline-flex align-items-center gap-8"
                                    >
                                        <div class="from-to text-center">
                                            <h3 class="dark-gray">
                                                {{
                                                    calculateHourDifference(
                                                        flight.arrival.dateTime,
                                                        flight.arrival.timeZone,
                                                        flight.departure
                                                            .dateTime,
                                                        flight.departure
                                                            .timeZone
                                                    )
                                                }}
                                            </h3>
                                            <img
                                                src="../src/moban7664/static/picture/route-plan.png"
                                                alt=""
                                            />
                                            <div
                                                class="color-black"
                                                style="margin-top: -5px"
                                            >
                                                <i
                                                    class="fa-solid fa-plane"
                                                    style="
                                                        font-size: 25px;
                                                        color: #365486;
                                                    "
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flight-departure">
                                        <h3 class="color-black">
                                            {{
                                                getDateTimeParts(
                                                    flight.arrival.dateTime
                                                ).timePart
                                            }}
                                        </h3>
                                        <h3 class="dark-gray">
                                            {{ flight.arrival.airport }}
                                        </h3>
                                    </div>
                                </div>
                                <div
                                    class="flight-button"
                                    style="margin-right: 50px"
                                >
                                    <div class="amount">
                                        <h3 class="color-black">
                                            TWD {{ PriceFormat(flight.price) }}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="d-flex justify-content-between align-items-center mt-24"
                                style="flex-direction: row"
                            >
                                <h3 class="color-black">
                                    {{
                                        getDateTimeParts(
                                            flight.departure.dateTime
                                        ).datePart
                                    }}
                                </h3>
                                <h3>
                                    {{ flight.cabin }} ({{ flight.cabinCode }})
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
