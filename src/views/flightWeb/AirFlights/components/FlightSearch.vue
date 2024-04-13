<script setup>
import { GetAirpotLata } from "@/apis/FlightApi";
import { createFlight, CreatePassenger } from "./flightJS/FlightHelper";
import { ref, watch, computed, onMounted, watchEffect } from "vue";
import Counter from "./Counter.vue";
import useSessionMixin from "@/mixins/sessionMixin.js";

const flightMixin = useSessionMixin();
const flightData = flightMixin.flightData.value;
const currentFlightData = flightMixin.flightData.value;
const flight = flightMixin.flightData.value.values;
const values = flightMixin.flightData.value.values;
// 機場
const departureAirport = ref([]);
const arrivalAirport = ref([]);
const selectedDeptAirLata = ref(flight.selectedArriAirLata || "");
const selectedArriAirLata = ref(flight.selectedDeptAirLata || "");

// 時間
const departureTime = ref(flight.departureTime || "");
const arrivalTime = ref(flight.arrivalTime || "");

// 乘客
const adultCount = ref(parseInt(flight.adultCount) || 0);
const childCount = ref(parseInt(flight.childCount) || 0);
const babyCount = ref(parseInt(flight.babyCount) || 0);
const passengeTotalCount = computed(() => {
    return adultCount.value + childCount.value + babyCount.value || 0;
});

// 艙等
const cabin = ref(flight.cabin || "");
const price = ref(flight.price || 0);
const totalPrice = computed(() => {
    return price.value;
});
// 單程 來回
const way = ref(flight.way || "");

GetAirpotLata().then((res) => {
    departureAirport.value = res;
    arrivalAirport.value = res;
});

function toggleDatePicker(event) {
    way.value = event.target.value;
}

function updateFlight(departLata, arriLata, date) {
    return {
        departure: {
            dateTime: date,
            airport: departLata,
            terminal: "",
        },
        arrival: {
            dateTime: date,
            airport: arriLata,
            terminal: "",
        },
        flightCode: "",
        flightModel: "",
        registrationNum: "",
        operatingAirlineName: "SPARKLE AIRLINES",
        cabin: cabin.value,
        cabinCode: "",
        mile: "",
        fareProduct: {
            mileageAccumulate: {
                amount: "0",
                percentage: "",
            },
            mileageUpgrade: "",
        },
        isPendingApproval: false,
    };
}

function demoBtn() {
    (selectedDeptAirLata.value = "TPE"),
        (selectedArriAirLata.value = "LHR"),
        (departureTime.value = "2024-04-18"),
        (arrivalTime.value = "2024-05-16"),
        (adultCount.value = 1),
        (childCount.value = 0),
        (babyCount.value = 0),
        (passengeTotalCount.value = 1),
        (totalPrice.value = 0),
        (cabin.value = "商務艙"),
        (way.value = "round");
}
const today = new Date().toISOString().split("T")[0];
function search() {
    if (
        selectedDeptAirLata.value != "" &&
        selectedArriAirLata.value != "" &&
        cabin.value != "" &&
        departureTime.value > today &&
        arrivalTime.value > departureTime.value
    ) {
        document.location.href = "/searchingResult";
    } else {
        alert("輸入資料不完整或不正確");
        return;
    }
}
onMounted(() => {
    if (cabin.value == null) {
        cabin.value = "艙等";
    }
});

watchEffect(() => {
    const newFlightData = {
        selectedDeptAirLata: selectedDeptAirLata.value,
        selectedArriAirLata: selectedArriAirLata.value,
        departureTime: departureTime.value,
        arrivalTime: arrivalTime.value,
        adultCount: adultCount.value,
        childCount: childCount.value,
        babyCount: babyCount.value,
        passengeTotalCount: passengeTotalCount.value,
        totalPrice: totalPrice.value,
        finalPrice: 0,
        cabin: cabin.value,
        way: way.value,
    };
    // currentFlightData.values = newFlightData;
    currentFlightData.values = newFlightData;
    if (way.value === "round") {
        currentFlightData.flights = [createFlight(), createFlight()];
    } else {
        currentFlightData.flights = [createFlight()];
    }

    if (currentFlightData.flights.length > 1) {
        currentFlightData.flights = [
            updateFlight(
                selectedDeptAirLata.value,
                selectedArriAirLata.value,
                departureTime.value
            ),
            updateFlight(
                selectedArriAirLata.value,
                selectedDeptAirLata.value,
                arrivalTime.value
            ),
        ];
    } else {
        currentFlightData.flights = [
            updateFlight(
                selectedDeptAirLata.value,
                selectedArriAirLata.value,
                departureTime.value
            ),
        ];
    }

    if (passengeTotalCount.value > 0) {
        for (let i = 0; i < passengeTotalCount.value; i++) {
            currentFlightData.passenger[i] = CreatePassenger();
        }
    }
});
</script>
<template>
    <!-- 單程/來回 -->
    <div class="custom-control mb-32" style="margin-left: 25px">
        <div class="radio-button">
            <input
                type="radio"
                class="custom-control-input"
                id="one"
                value="one"
                v-model="way"
                @change="toggleDatePicker"
            />
            <label
                class="custom-control-label"
                for="one"
                style="font-size: 25px"
                :class="{ checked: way === 'one' }"
                >單程</label
            >
        </div>
        <div class="radio-button">
            <input
                type="radio"
                class="custom-control-input"
                id="round"
                value="round"
                v-model="way"
                @change="toggleDatePicker"
            />
            <label
                class="custom-control-label"
                for="round"
                style="font-size: 25px"
                :class="{ checked: way === 'round' }"
                >來回</label
            >
        </div>
    </div>
    <!-- 目的地出發地時間 -->
    <div
        class="booking-info mb-32"
        data-sal="slide-left"
        data-sal-duration="800"
        data-sal-delay="100"
        data-sal-easing="ease-in-out"
        style="margin-left: 20px; margin-right: 20px; margin-bottom: 5px"
    >
        <div class="d-xl-flex align-items-center d-lg-block d-flex">
            <div class="custom-sel-input-block">
                <label
                    for="depFrom"
                    class="h-16 color-medium-gray"
                    style="font-size: 20px"
                    >出發地</label
                >
                <select
                    style="font-size: 25px"
                    id="departureAirport"
                    v-model="selectedDeptAirLata"
                >
                    <option v-for="item in departureAirport" :value="item.lata">
                        {{ item.airPortName }}
                        {{ item.lata }}
                    </option>
                </select>
            </div>
            <div
                class="arrows d-flex align-items-center justify-content-center mt-32 me-5"
                style="margin-left: -40px"
            >
                <i
                    class="fa-solid fa-arrow-right-arrow-left"
                    style="font-size: 25px; color: #365486"
                ></i>
            </div>
            <div class="custom-sel-input-block">
                <label
                    for="arrivalTo"
                    class="h-16 color-medium-gray"
                    style="font-size: 20px"
                    >目的地</label
                >
                <select
                    style="font-size: 25px"
                    id="arrivalAirport"
                    v-model="selectedArriAirLata"
                >
                    <option v-for="item in arrivalAirport" :value="item.lata">
                        {{ item.airPortName }}
                        {{ item.lata }}
                    </option>
                </select>
            </div>
            <div
                class="vertical-line d-xl-block d-none"
                style="margin-left: -10px"
            ></div>
        </div>
        <div class="d-xl-flex align-items-center d-lg-block">
            <div class="input-date-picker">
                <label
                    for="dep"
                    class="h-16 color-medium-gray"
                    style="font-size: 20px"
                    >出發日期</label
                >
                <input
                    type="date"
                    class="sel-input"
                    id="dep"
                    style="font-size: 25px; color: #365486"
                    v-model="departureTime"
                />
            </div>
            <div class="input-date-picker">
                <label
                    for="arrival"
                    class="h-16 color-medium-gray"
                    style="font-size: 20px"
                    >回程日期</label
                >
                <input
                    type="date"
                    class="sel-input"
                    id="arrivalTime"
                    v-model="arrivalTime"
                    style="font-size: 25px; color: #365486"
                    :disabled="way === 'one'"
                />
            </div>
            <div class="custom-sel-input-block">
                <div
                    class="h-16 color-medium-gray"
                    style="
                        font-size: 20px;
                        margin-top: -5px;
                        margin-bottom: 10px;
                    "
                >
                    旅客人數 / 選擇艙等
                </div>
                <div class="seat-booking color-black" style="font-size: 20px">
                    <span>{{ passengeTotalCount }}</span>
                    旅客 /
                    <span class="pasenger-class">{{ cabin }}</span>
                </div>

                <div
                    class="passenger-area pessenger-box bg-white light-shadow br-5 p-24"
                >
                    <h3 class="color-black mb-32">旅客與艙等</h3>
                    <div class="passenger-box mb-24">
                        <div class="row">
                            <div class="col-md-7 col-sm-6 col-6">
                                <div class="content-box">
                                    <h3 class="lightest-black">成人</h3>
                                    <p
                                        class="color-medium-gray light"
                                        style="font-size: 18px"
                                    >
                                        12歲以上
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-5 col-sm-6 col-6 mt-20">
                                <Counter
                                    v-model="adultCount"
                                    :passengeTotalCount="passengeTotalCount"
                                ></Counter>
                            </div>
                        </div>
                    </div>
                    <div class="passenger-box mb-24">
                        <div class="row">
                            <div class="col-md-7 col-sm-6 col-6">
                                <div class="content-box">
                                    <h3 class="lightest-black">兒童</h3>
                                    <p
                                        class="color-medium-gray light"
                                        style="font-size: 18px"
                                    >
                                        2-11歲
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-5 col-sm-6 col-6 mt-20">
                                <Counter
                                    v-model="childCount"
                                    :passengeTotalCount="passengeTotalCount"
                                ></Counter>
                            </div>
                        </div>
                    </div>
                    <div class="passenger-box mb-32">
                        <div class="row">
                            <div class="col-md-7 col-sm-6 col-6">
                                <div class="content-box">
                                    <h3 class="lightest-black">嬰兒</h3>
                                    <p
                                        class="color-medium-gray light"
                                        style="font-size: 18px"
                                    >
                                        0-1歲 不占座位
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-5 col-sm-6 col-6 mt-20">
                                <Counter
                                    v-model="babyCount"
                                    :passengeTotalCount="passengeTotalCount"
                                ></Counter>
                            </div>
                        </div>
                    </div>
                    <p
                        class="color-medium-gray light mb-32"
                        style="font-size: 15px"
                    >
                        注意: 最多只能購買9張票
                    </p>
                    <h3 class="color-black mb-32">選擇艙等</h3>
                    <div class="radio-tile-group">
                        <div class="input-container">
                            <input
                                id="economy"
                                class="radio-button"
                                type="radio"
                                name="radio"
                                value="經濟艙"
                                v-model="cabin"
                                @click="setCurrentCabin()"
                            />
                            <div class="radio-tile">
                                <label
                                    for="economy"
                                    class="radio-tile-label mt-2"
                                    style="font-size: 18px"
                                    >經濟艙</label
                                >
                            </div>
                        </div>
                        <div class="input-container">
                            <input
                                id="business"
                                class="radio-button"
                                type="radio"
                                name="radio"
                                value="商務艙"
                                v-model="cabin"
                            />
                            <div class="radio-tile">
                                <label
                                    for="business"
                                    class="radio-tile-label mt-2"
                                    style="font-size: 18px"
                                    >商務艙</label
                                >
                            </div>
                        </div>
                        <div class="input-container">
                            <input
                                id="firstClass"
                                class="radio-button"
                                type="radio"
                                name="radio"
                                value="頭等艙"
                                v-model="cabin"
                            />
                            <div class="radio-tile">
                                <label
                                    for="firstClass"
                                    class="radio-tile-label mt-2"
                                    style="font-size: 18px"
                                    >頭等艙</label
                                >
                            </div>
                        </div>
                        <div class="input-container">
                            <input
                                id="pre-eco"
                                class="radio-button"
                                type="radio"
                                name="radio"
                                value="豪華經濟艙"
                                v-model="cabin"
                            />
                            <div class="radio-tile">
                                <label
                                    for="pre-eco"
                                    class="radio-tile-label mt-2"
                                    style="font-size: 18px"
                                    >豪華經濟艙</label
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 查詢 -->
    <div class="row d-flex justify-content-end" style="margin: 15px">
        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-9">
            <div class="row align-items-end">
                <div class="col-sm-12 d-flex justify-content-end">
                    <button
                        href=""
                        style="width: 100px; height: 70px; font-size: 20px"
                        class="cus-btn me-2"
                        @click="demoBtn()"
                    >
                        DEMO
                    </button>
                    <button
                        class="cus-btn"
                        style="width: 200px; height: 70px"
                        @click="search"
                    >
                        <strong style="font-size: 30px"
                            >查詢 <i class="fa-solid fa-magnifying-glass"></i
                        ></strong>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
