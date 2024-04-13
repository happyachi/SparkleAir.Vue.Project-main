<script setup>
import { ref, onMounted } from 'vue';
import { GetAirpotLata } from '@/apis/FlightApi';
import {
    getDateTimeParts,
    calculateHourDifference,
} from '@/views/flightWeb/AirFlights/components/flightJS/TimeHelper.js';
const departureAirport = ref([]);
const arrivalAirport = ref([]);
const flightCode = ref('');
const search = ref(false);
const loading = ref(false);
const loadingAll = ref(false);
const flight = ref([]);
GetAirpotLata().then((res) => {
    departureAirport.value = res;
    arrivalAirport.value = res;
});
const selectedDeptAirLata = ref('');
const selectedArriAirLata = ref('');
const codeSearchResult = async () => {
    if (flightCode.value == '') {
        alert('請輸入航班編號');
        return;
    } else {
        loading.value = true;
        search.value = true;
        const searchParams = new URLSearchParams({
            DepartureAirport: '',
            ArrivalAirport: '',
            FlightCode: flightCode.value,
        }).toString();
        try {
            const res = await fetch(
                `http://localhost:8889/api/AirFlights/GetTakeOffStatue?${searchParams}`
            );
            const datas = await res.json();
            flight.value = datas;
        } catch (error) {
            console.error('Error fetching flight data:', error);
        } finally {
            loading.value = false;
        }
    }
};

const placeSearchResult = async () => {
    if (selectedDeptAirLata.value == '' || selectedArriAirLata.value == '') {
        alert('請選擇出發地以及目的地');
        return;
    } else {
        loading.value = true;
        search.value = true;
        const searchParams = new URLSearchParams({
            DepartureAirport: selectedDeptAirLata.value,
            ArrivalAirport: selectedArriAirLata.value,
            FlightCode: '',
        }).toString();
        try {
            const res = await fetch(
                `http://localhost:8889/api/AirFlights/GetTakeOffStatue?${searchParams}`
            );
            const datas = await res.json();
            flight.value = datas;
        } catch (error) {
            console.error('Error fetching flight data:', error);
        } finally {
            loading.value = false;
        }
    }
};
const searchResult = async () => {
    loadingAll.value = true;
    const searchParams = new URLSearchParams({
        DepartureAirport: '',
        ArrivalAirport: '',
        FlightCode: '',
    }).toString();
    try {
        const res = await fetch(
            `http://localhost:8889/api/AirFlights/GetTakeOffStatue?${searchParams}`
        );
        console.log(res);
        const datas = await res.json();
        flight.value = datas;
    } catch (error) {
        console.error('Error fetching flight data:', error);
    } finally {
        loadingAll.value = false;
    }
};
function getDate(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const datePart = dateTime.toISOString().split('T')[0];
    return datePart;
}
function demoBtn() {
    selectedDeptAirLata.value = 'TPE';
    selectedArriAirLata.value = 'LHR';
    flightCode.value = '';
}
function codeDemo() {
    flightCode.value = 'SK001';
    selectedDeptAirLata.value = '';
    selectedArriAirLata.value = '';
}
</script>
<template>
    <div class="booking-bar">
        <ul class="nav nav-tabs" data-bs-tabs="tabs">
            <li class="nav-item">
                <a
                    href="#byRoute"
                    class="nav-link active"
                    aria-current="true"
                    data-bs-toggle="tab"
                >
                    依航線
                </a>
            </li>
            <li class="nav-item">
                <a
                    href="#flightNo"
                    class="nav-link"
                    aria-current="false"
                    data-bs-toggle="tab"
                >
                    依航班號碼
                </a>
            </li>
            <li class="nav-item">
                <a
                    href="#todayFlight"
                    class="nav-link"
                    aria-current="false"
                    data-bs-toggle="tab"
                >
                    <button @click="searchResult">今日所有航班</button>
                </a>
            </li>
        </ul>
    </div>
    <div class="card-body tab-content">
        <div class="tab-pane active" id="byRoute">
            <div class="row align-items-center">
                <div class="col-xl-10 col-lg-10">
                    <div
                        class="booking-info v-2 d-md-flex d-inline-block justify-content-start"
                    >
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
                                <option
                                    v-for="item in departureAirport"
                                    :value="item.lata"
                                >
                                    {{ item.airPortName }}
                                    {{ item.lata }}
                                </option>
                            </select>
                        </div>
                        <div
                            class="arrows d-flex align-items-center justify-content-center mt-32 me-5"
                            style="margin-left: -40px"
                        >
                            <div class="vertical-line d-md-flex d-none"></div>
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
                                <option
                                    v-for="item in arrivalAirport"
                                    :value="item.lata"
                                >
                                    {{ item.airPortName }}
                                    {{ item.lata }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div
                    class="col-xl-2 col-lg-2 d-flex align-items-center mt-lg-0 mt-32"
                >
                    <button class="cus-btn me-5" @click="demoBtn">DEMO</button>
                    <button
                        type="submit"
                        class="cus-btn"
                        style="
                            font-family: 'Times New Roman', Times, serif;
                            font-size: 20px;
                        "
                    >
                        <el-button
                            plain
                            @click="placeSearchResult"
                            link
                            color="white"
                            size="large"
                        >
                            查詢
                        </el-button>
                    </button>
                </div>
            </div>
        </div>
        <div class="tab-pane" id="flightNo">
            <div class="row align-items-center">
                <div class="col-xl-10 col-lg-10">
                    <div
                        class="booking-info d-md-flex d-inline-block justify-content-between"
                    >
                        <div class="custom-sel-input-block m-0">
                            <input
                                type="text"
                                class="sel-input auto-input"
                                id="flightDepat"
                                style="font-size: 35px"
                                placeholder="EX: SK001"
                                v-model="flightCode"
                            />
                        </div>
                    </div>
                </div>
                <div
                    class="col-xl-2 col-lg-2 d-flex align-items-center mt-lg-0 mt-32"
                >
                    <button class="cus-btn me-5" @click="codeDemo">DEMO</button>
                    <button class="cus-btn">
                        <el-button
                            plain
                            @click="codeSearchResult"
                            link
                            color="white"
                            size="large"
                        >
                            查詢
                        </el-button>
                    </button>
                </div>
            </div>
        </div>
        <div class="tab-pane" id="todayFlight">
            <div class="row align-items-center">
                <div v-loading="loadingAll" style="margin-top: 20px">
                    <div style="overflow-x: auto; max-height: 700px">
                        <template v-if="flight.length == 0">
                            <el-empty description="查無資料"></el-empty>
                        </template>
                        <template v-else v-for="item in flight">
                            <section class="flight-listing-page mb-60">
                                <div class="container-fluid">
                                    <div class="">
                                        <div
                                            class="col-xl-12 col-lg-12 flight-block light-shadow br-10 result"
                                        >
                                            <div
                                                class="col-xl-2 col-lg-2 flightInfo"
                                            >
                                                <div>
                                                    <h2
                                                        class=""
                                                        style="
                                                            color: black;
                                                            font-weight: bold;
                                                        "
                                                    >
                                                        {{ item.flightCode }}
                                                    </h2>
                                                </div>
                                                <div class="">
                                                    <h3
                                                        class=""
                                                        style="color: black"
                                                    >
                                                        <i
                                                            class="fa-solid fa-plane"
                                                            style="
                                                                color: #365486;
                                                            "
                                                        ></i>
                                                        {{ item.flightModel }}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div
                                                class="col-xl-4 col-lg-4"
                                                style="
                                                    border-right: 5px double
                                                        #365486;
                                                "
                                            >
                                                <div class="">
                                                    <div class="row">
                                                        <div
                                                            class="flight-detail"
                                                            style="
                                                                display: flex;
                                                                align-items: center;
                                                                justify-content: space-between;
                                                            "
                                                        >
                                                            <div
                                                                class="flight-departure"
                                                            >
                                                                <div
                                                                    class="flight-departure"
                                                                >
                                                                    <h3>
                                                                        表定
                                                                    </h3>
                                                                    <h3
                                                                        class="color-black"
                                                                    >
                                                                        {{
                                                                            getDate(
                                                                                item.originalDepartureTime
                                                                            )
                                                                        }}
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="flight-departure"
                                                            >
                                                                <div
                                                                    class="flight-departure"
                                                                >
                                                                    <h3
                                                                        class="text-end"
                                                                    >
                                                                        表定
                                                                    </h3>
                                                                    <h3
                                                                        class="color-black"
                                                                    >
                                                                        {{
                                                                            getDate(
                                                                                item.originalArrivalTime
                                                                            )
                                                                        }}
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flight-detail"
                                                            style="
                                                                display: flex;
                                                                align-items: center;
                                                                justify-content: space-between;
                                                            "
                                                        >
                                                            <div
                                                                class="flight-departure"
                                                            >
                                                                <h2
                                                                    class="text-start"
                                                                    style="
                                                                        font-weight: bold;
                                                                    "
                                                                >
                                                                    {{
                                                                        getDateTimeParts(
                                                                            item.originalDepartureTime
                                                                        )
                                                                            .timePart
                                                                    }}
                                                                </h2>
                                                                <h3
                                                                    class="theText text-start"
                                                                    style="
                                                                        font-weight: bold;
                                                                    "
                                                                >
                                                                    {{
                                                                        item.departureAirport
                                                                    }}
                                                                </h3>
                                                                <h3
                                                                    class="theText text-start"
                                                                >
                                                                    {{
                                                                        item.departureAirportCity
                                                                    }}
                                                                </h3>
                                                                <h3
                                                                    class="theText text-start"
                                                                >
                                                                    {{
                                                                        item.departureTerminal
                                                                    }}
                                                                </h3>
                                                            </div>
                                                            <div
                                                                class="flight-departure"
                                                            >
                                                                <h2
                                                                    class="text-end"
                                                                    style="
                                                                        font-weight: bold;
                                                                    "
                                                                >
                                                                    {{
                                                                        getDateTimeParts(
                                                                            item.originalArrivalTime
                                                                        )
                                                                            .timePart
                                                                    }}
                                                                </h2>
                                                                <h3
                                                                    class="theText text-end"
                                                                    style="
                                                                        font-weight: bold;
                                                                    "
                                                                >
                                                                    {{
                                                                        item.arrivalAirport
                                                                    }}
                                                                </h3>
                                                                <h3
                                                                    class="theText text-end"
                                                                >
                                                                    {{
                                                                        item.arrivalAirportCity
                                                                    }}
                                                                </h3>
                                                                <h3
                                                                    class="theText text-end"
                                                                >
                                                                    {{
                                                                        item.arrivalTerminal
                                                                    }}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="col-xl-4 col-lg-4"
                                                style="
                                                    border-right: 5px double
                                                        #365486;
                                                "
                                            >
                                                <div class="">
                                                    <div class="row">
                                                        <div
                                                            class="flight-detail"
                                                            style="
                                                                display: flex;
                                                                align-items: center;
                                                                justify-content: space-between;
                                                            "
                                                        >
                                                            <div
                                                                class="flight-departure"
                                                            >
                                                                <div
                                                                    class="flight-departure"
                                                                >
                                                                    <h3>
                                                                        實際
                                                                    </h3>
                                                                    <h3
                                                                        class="color-black"
                                                                    >
                                                                        {{
                                                                            getDate(
                                                                                item.actualDepartureTime
                                                                            )
                                                                        }}
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="flight-departure"
                                                            >
                                                                <div
                                                                    class="flight-departure"
                                                                >
                                                                    <h3
                                                                        class="text-end"
                                                                    >
                                                                        實際
                                                                    </h3>
                                                                    <h3
                                                                        class="color-black"
                                                                    >
                                                                        {{
                                                                            getDate(
                                                                                item.actualArrivalTime
                                                                            )
                                                                        }}
                                                                    </h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flight-detail"
                                                            style="
                                                                display: flex;
                                                                align-items: center;
                                                                justify-content: space-between;
                                                            "
                                                        >
                                                            <div
                                                                class="flight-departure"
                                                            >
                                                                <h2
                                                                    class=""
                                                                    style="
                                                                        font-weight: bold;
                                                                    "
                                                                >
                                                                    {{
                                                                        getDateTimeParts(
                                                                            item.actualDepartureTime
                                                                        )
                                                                            .timePart
                                                                    }}
                                                                </h2>
                                                                <h3
                                                                    class="theText text-start"
                                                                    style="
                                                                        font-weight: bold;
                                                                    "
                                                                >
                                                                    {{
                                                                        item.departureAirport
                                                                    }}
                                                                </h3>
                                                                <h3
                                                                    class="theText text-start"
                                                                >
                                                                    {{
                                                                        item.departureAirportCity
                                                                    }}
                                                                </h3>
                                                                <h3
                                                                    class="theText text-start"
                                                                >
                                                                    {{
                                                                        item.departureTerminal
                                                                    }}
                                                                </h3>
                                                            </div>
                                                            <div
                                                                class="flight-departure"
                                                            >
                                                                <h2
                                                                    class="text-end"
                                                                    style="
                                                                        font-weight: bold;
                                                                    "
                                                                >
                                                                    {{
                                                                        getDateTimeParts(
                                                                            item.actualArrivalTime
                                                                        )
                                                                            .timePart
                                                                    }}
                                                                </h2>
                                                                <h3
                                                                    class="theText text-end"
                                                                    style="
                                                                        font-weight: bold;
                                                                    "
                                                                >
                                                                    {{
                                                                        item.arrivalAirport
                                                                    }}
                                                                </h3>
                                                                <h3
                                                                    class="theText text-end"
                                                                >
                                                                    {{
                                                                        item.arrivalAirportCity
                                                                    }}
                                                                </h3>
                                                                <h3
                                                                    class="theText text-end"
                                                                >
                                                                    {{
                                                                        item.arrivalTerminal
                                                                    }}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="col-xl-2 col-lg-2"
                                                style="
                                                    display: flex;
                                                    align-items: center;
                                                    justify-content: center;
                                                "
                                            >
                                                <template
                                                    v-if="
                                                        item.airFlightStatus ==
                                                        '已抵達'
                                                    "
                                                >
                                                    <h2
                                                        class="status"
                                                        style="
                                                            color: rgb(
                                                                194,
                                                                96,
                                                                96
                                                            );
                                                        "
                                                    >
                                                        {{
                                                            item.airFlightStatus
                                                        }}
                                                    </h2></template
                                                >
                                                <template
                                                    v-else-if="
                                                        item.airFlightStatus ==
                                                        '已出發'
                                                    "
                                                    ><h2
                                                        class="status"
                                                        style="color: #516e41"
                                                    >
                                                        {{
                                                            item.airFlightStatus
                                                        }}
                                                    </h2></template
                                                >
                                                <template v-else
                                                    ><h2
                                                        class="status"
                                                        style="color: #91989f"
                                                    >
                                                        {{
                                                            item.airFlightStatus
                                                        }}
                                                    </h2></template
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <el-dialog
        v-model="search"
        width="70%"
        align-center
        :show-close="false"
        :lock-scroll="false"
    >
        <template #header="{ titleId, titleClass }">
            <div class="my-header">
                <h2 :id="titleId" :class="titleClass">查詢結果</h2>
            </div>
            <div v-loading="loading" style="margin-top: 20px">
                <div style="overflow-x: auto; max-height: 700px">
                    <template v-if="flight.length == 0">
                        <el-empty description="查無資料"></el-empty>
                    </template>
                    <template v-else v-for="item in flight">
                        <section class="flight-listing-page mb-60">
                            <div class="container-fluid">
                                <div class="">
                                    <div
                                        class="col-xl-12 col-lg-12 flight-block light-shadow br-10 result"
                                    >
                                        <div
                                            class="col-xl-2 col-lg-2 flightInfo"
                                        >
                                            <div>
                                                <h2
                                                    class=""
                                                    style="
                                                        color: black;
                                                        font-weight: bold;
                                                    "
                                                >
                                                    {{ item.flightCode }}
                                                </h2>
                                            </div>
                                            <div class="">
                                                <h3
                                                    class=""
                                                    style="color: black"
                                                >
                                                    <i
                                                        class="fa-solid fa-plane"
                                                        style="color: #365486"
                                                    ></i>
                                                    {{ item.flightModel }}
                                                </h3>
                                            </div>
                                        </div>
                                        <div
                                            class="col-xl-4 col-lg-4"
                                            style="
                                                border-right: 5px double #365486;
                                            "
                                        >
                                            <div class="">
                                                <div class="row">
                                                    <div
                                                        class="flight-detail"
                                                        style="
                                                            display: flex;
                                                            align-items: center;
                                                            justify-content: space-between;
                                                        "
                                                    >
                                                        <div
                                                            class="flight-departure"
                                                        >
                                                            <div
                                                                class="flight-departure"
                                                            >
                                                                <h3>表定</h3>
                                                                <h3
                                                                    class="color-black"
                                                                >
                                                                    {{
                                                                        getDate(
                                                                            item.originalDepartureTime
                                                                        )
                                                                    }}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flight-departure"
                                                        >
                                                            <div
                                                                class="flight-departure"
                                                            >
                                                                <h3
                                                                    class="text-end"
                                                                >
                                                                    表定
                                                                </h3>
                                                                <h3
                                                                    class="color-black"
                                                                >
                                                                    {{
                                                                        getDate(
                                                                            item.originalArrivalTime
                                                                        )
                                                                    }}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flight-detail"
                                                        style="
                                                            display: flex;
                                                            align-items: center;
                                                            justify-content: space-between;
                                                        "
                                                    >
                                                        <div
                                                            class="flight-departure"
                                                        >
                                                            <h2
                                                                class="text-start"
                                                                style="
                                                                    font-weight: bold;
                                                                "
                                                            >
                                                                {{
                                                                    getDateTimeParts(
                                                                        item.originalDepartureTime
                                                                    ).timePart
                                                                }}
                                                            </h2>
                                                            <h3
                                                                class="theText text-start"
                                                                style="
                                                                    font-weight: bold;
                                                                "
                                                            >
                                                                {{
                                                                    item.departureAirport
                                                                }}
                                                            </h3>
                                                            <h3
                                                                class="theText text-start"
                                                            >
                                                                {{
                                                                    item.departureAirportCity
                                                                }}
                                                            </h3>
                                                            <h3
                                                                class="theText text-start"
                                                            >
                                                                {{
                                                                    item.departureTerminal
                                                                }}
                                                            </h3>
                                                        </div>
                                                        <div
                                                            class="flight-departure"
                                                        >
                                                            <h2
                                                                class="text-end"
                                                                style="
                                                                    font-weight: bold;
                                                                "
                                                            >
                                                                {{
                                                                    getDateTimeParts(
                                                                        item.originalArrivalTime
                                                                    ).timePart
                                                                }}
                                                            </h2>
                                                            <h3
                                                                class="theText text-end"
                                                                style="
                                                                    font-weight: bold;
                                                                "
                                                            >
                                                                {{
                                                                    item.arrivalAirport
                                                                }}
                                                            </h3>
                                                            <h3
                                                                class="theText text-end"
                                                            >
                                                                {{
                                                                    item.arrivalAirportCity
                                                                }}
                                                            </h3>
                                                            <h3
                                                                class="theText text-end"
                                                            >
                                                                {{
                                                                    item.arrivalTerminal
                                                                }}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="col-xl-4 col-lg-4"
                                            style="
                                                border-right: 5px double #365486;
                                            "
                                        >
                                            <div class="">
                                                <div class="row">
                                                    <div
                                                        class="flight-detail"
                                                        style="
                                                            display: flex;
                                                            align-items: center;
                                                            justify-content: space-between;
                                                        "
                                                    >
                                                        <div
                                                            class="flight-departure"
                                                        >
                                                            <div
                                                                class="flight-departure"
                                                            >
                                                                <h3>實際</h3>
                                                                <h3
                                                                    class="color-black"
                                                                >
                                                                    {{
                                                                        getDate(
                                                                            item.actualDepartureTime
                                                                        )
                                                                    }}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="flight-departure"
                                                        >
                                                            <div
                                                                class="flight-departure"
                                                            >
                                                                <h3
                                                                    class="text-end"
                                                                >
                                                                    實際
                                                                </h3>
                                                                <h3
                                                                    class="color-black"
                                                                >
                                                                    {{
                                                                        getDate(
                                                                            item.actualArrivalTime
                                                                        )
                                                                    }}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flight-detail"
                                                        style="
                                                            display: flex;
                                                            align-items: center;
                                                            justify-content: space-between;
                                                        "
                                                    >
                                                        <div
                                                            class="flight-departure"
                                                        >
                                                            <h2
                                                                class=""
                                                                style="
                                                                    font-weight: bold;
                                                                "
                                                            >
                                                                {{
                                                                    getDateTimeParts(
                                                                        item.actualDepartureTime
                                                                    ).timePart
                                                                }}
                                                            </h2>
                                                            <h3
                                                                class="theText text-start"
                                                                style="
                                                                    font-weight: bold;
                                                                "
                                                            >
                                                                {{
                                                                    item.departureAirport
                                                                }}
                                                            </h3>
                                                            <h3
                                                                class="theText text-start"
                                                            >
                                                                {{
                                                                    item.departureAirportCity
                                                                }}
                                                            </h3>
                                                            <h3
                                                                class="theText text-start"
                                                            >
                                                                {{
                                                                    item.departureTerminal
                                                                }}
                                                            </h3>
                                                        </div>
                                                        <div
                                                            class="flight-departure"
                                                        >
                                                            <h2
                                                                class="text-end"
                                                                style="
                                                                    font-weight: bold;
                                                                "
                                                            >
                                                                {{
                                                                    getDateTimeParts(
                                                                        item.actualArrivalTime
                                                                    ).timePart
                                                                }}
                                                            </h2>
                                                            <h3
                                                                class="theText text-end"
                                                                style="
                                                                    font-weight: bold;
                                                                "
                                                            >
                                                                {{
                                                                    item.arrivalAirport
                                                                }}
                                                            </h3>
                                                            <h3
                                                                class="theText text-end"
                                                            >
                                                                {{
                                                                    item.arrivalAirportCity
                                                                }}
                                                            </h3>
                                                            <h3
                                                                class="theText text-end"
                                                            >
                                                                {{
                                                                    item.arrivalTerminal
                                                                }}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="col-xl-2 col-lg-2"
                                            style="
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                            "
                                        >
                                            <template
                                                v-if="
                                                    item.airFlightStatus ==
                                                    '已抵達'
                                                "
                                            >
                                                <h2
                                                    class="status"
                                                    style="
                                                        color: rgb(194, 96, 96);
                                                    "
                                                >
                                                    {{ item.airFlightStatus }}
                                                </h2></template
                                            >
                                            <template
                                                v-else-if="
                                                    item.airFlightStatus ==
                                                    '已出發'
                                                "
                                                ><h2
                                                    class="status"
                                                    style="color: #516e41"
                                                >
                                                    {{ item.airFlightStatus }}
                                                </h2></template
                                            >
                                            <template v-else
                                                ><h2
                                                    class="status"
                                                    style="color: #91989f"
                                                >
                                                    {{ item.airFlightStatus }}
                                                </h2></template
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </template>
                </div>
            </div>
        </template>
    </el-dialog>
</template>
<style scoped>
.el-button {
    font-weight: bold;
    font-size: 20px;
}
.my-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    h2 {
        font-weight: bold;
        font-size: 30px;
        color: rgb(54, 84, 134);
    }
}
.result {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff6e3;
    /* background-color: #e7f2ff; */
}
.theText {
    color: rgb(54, 84, 134);
}
.status {
    font-weight: bold;
}
.flight-departure h2 {
    color: #d8b267;
}
.flightInfo {
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 5px double #365486;
}
</style>
