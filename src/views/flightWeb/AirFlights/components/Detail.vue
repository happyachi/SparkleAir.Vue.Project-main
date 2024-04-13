<script setup>
import {
    getDateTimeParts,
    calculateHourDifference,
} from "@/views/flightWeb/AirFlights/components/flightJS/TimeHelper.js";
import useSessionMixin from "@/mixins/sessionMixin.js";
const flightMixin = useSessionMixin();
const values = flightMixin.flightData.value.values;
const flights = flightMixin.flightData.value.flights;
const passenger = flightMixin.flightData.value.passenger[0];
const expandControl = (id) => {
    const element = document.querySelector(`#flightId${id}`);
    if (element.classList.contains("show")) {
        element.classList.remove("show");
    } else {
        element.classList.add("show");
    }
};
</script>
<template>
    <div class="flight-booking-detail light-shadow mb-32">
        <template v-for="flight in flights">
            <div :id="`flight${flight.id}`">
                <div class="flight-title mb-24">
                    <button
                        class="color-white h3 collapsed"
                        style="font-weight: bold"
                        type="button"
                        @click="expandControl(flight.id)"
                    >
                        您的行程&nbsp;&nbsp;{{
                            flight.departure.airport
                        }}&nbsp;&nbsp;<i class="fa-solid fa-plane-departure"></i
                        >&nbsp;&nbsp;{{ flight.arrival.airport }}&nbsp;&nbsp;<i
                            class="fa-solid fa-chevron-down color-white"
                        ></i>
                    </button>
                </div>
                <div
                    :id="`flightId${flight.id}`"
                    class="box bg-white p-24 collapse show"
                    style="margin-bottom: -10px"
                >
                    <template v-if="passenger.gender === true">
                        <div
                            class="flight-block bg-white"
                            style="margin-top: -40px"
                        >
                            <h3 style="font-weight: bold; color: #365486">
                                Mr.&nbsp;{{ passenger.firstName }}&nbsp;{{
                                    passenger.lastName
                                }}
                            </h3>
                        </div>
                    </template>
                    <template v-else>
                        <div
                            class="flight-block bg-white"
                            style="margin-top: -40px"
                        >
                            <h3 style="font-weight: bold; color: #365486">
                                Ms.&nbsp;{{ passenger.firstName }}&nbsp;{{
                                    passenger.lastName
                                }}
                            </h3>
                        </div>
                    </template>
                    <div class="flight-detail mb-32">
                        <div class="flight-departure">
                            <h3 class="color-black">
                                {{
                                    getDateTimeParts(flight.departure.dateTime)
                                        .timePart
                                }}
                            </h3>
                            <h3 class="dark-gray text-end">
                                {{ flight.departure.airport }}
                            </h3>
                        </div>
                        <div class="d-inline-flex align-items-center gap-8">
                            <div class="from-to text-center">
                                <h3 class="dark-gray">
                                    {{
                                        calculateHourDifference(
                                            flight.arrival.dateTime,
                                            flight.arrival.timeZone,
                                            flight.departure.dateTime,
                                            flight.departure.timeZone
                                        )
                                    }}
                                </h3>
                                <img
                                    src="../src/moban7664/static/picture/route-plan.png"
                                    alt=""
                                />
                                <div
                                    class="color-black"
                                    style="margin-top: -15px"
                                >
                                    <i
                                        class="fa-solid fa-plane"
                                        style="font-size: 20px; color: #365486"
                                    ></i>
                                </div>
                            </div>
                        </div>
                        <div class="flight-departure">
                            <h3 class="color-black">
                                {{
                                    getDateTimeParts(flight.arrival.dateTime)
                                        .timePart
                                }}
                            </h3>
                            <h3 class="dark-gray">
                                {{ flight.arrival.airport }}
                            </h3>
                        </div>
                    </div>
                    <div class="d-flex justify-content-around mb-32">
                        <div class="flight-departure">
                            <h4 class="dark-gray">出發日期</h4>
                            <h3 class="color-black">
                                {{
                                    getDateTimeParts(flight.departure.dateTime)
                                        .datePart
                                }}
                            </h3>
                        </div>
                        <div class="vr-line"></div>
                        <div class="flight-departure">
                            <h4 class="dark-gray">抵達日期</h4>
                            <h3 class="color-black">
                                {{
                                    getDateTimeParts(flight.arrival.dateTime)
                                        .datePart
                                }}
                            </h3>
                        </div>
                    </div>
                    <div class="text">
                        <h6 class="color-medium-gray">
                            {{ flight.operatingAirlineName }}
                        </h6>
                        <h6 class="color-medium-gray">
                            {{ flight.cabin }} | {{ flight.flightCode }} |
                            {{ flight.flightModel }}
                        </h6>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<style scoped></style>
