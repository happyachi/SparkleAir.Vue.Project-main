<script setup>
import useSessionMixin from "@/mixins/sessionMixin.js"
import { ElButton, ElDialog } from "element-plus"
import { ref, computed } from "vue"
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
const flightMixin = useSessionMixin()
const values = flightMixin.flightData.value.values
const flights = flightMixin.flightData.value.flights
const passengers = flightMixin.flightData.value.passenger[0]

const centerDialogVisible = ref(false)
values.totalPrice = computed(() => {
    const price1 = flights[0].price
    const price2 = flights[1].price

    return price1 + price2
})
</script>
<template>
    <div class="detail">
        <div class="container" style="flex-direction: row">
            <div class="col-6">
                <button class="cus-btn">
                    <el-button
                        plain
                        @click="centerDialogVisible = true"
                        link
                        color="#fff"
                        size="large"
                    >
                        票價明細
                    </el-button>
                </button>
                <el-dialog
                    v-model="centerDialogVisible"
                    width="50%"
                    align-center
                    :lock-scroll="false"
                >
                    <template #header="{ titleId, titleClass }">
                        <div class="my-header">
                            <h4 :id="titleId" :class="titleClass">票價明細</h4>
                        </div>
                    </template>
                    <div v-for="flight in flights">
                        <section class="flight-listing-page mb-60">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12">
                                        <div>
                                            <div class="flightDes">
                                                {{ flight.departure.airport }}
                                                <i
                                                    class="fa-solid fa-plane-departure"
                                                    style="color: #365386"
                                                ></i>
                                                {{ flight.arrival.airport }}
                                            </div>
                                            <div
                                                class="flight-block bg-white light-shadow br-10"
                                            >
                                                <div
                                                    style="
                                                        background-color: #6c91c2;
                                                        border-radius: 10px 10px
                                                            0 0;
                                                    "
                                                >
                                                    <h3
                                                        class=""
                                                        style="
                                                            color: white;
                                                            padding: 20px;
                                                            font-weight: bold;
                                                        "
                                                    >
                                                        {{ flight.cabin }}
                                                        -
                                                        {{
                                                            CabinCodeChange(
                                                                flight.cabinCode
                                                            )
                                                        }}
                                                    </h3>
                                                </div>
                                                <div
                                                    class="airline-name"
                                                    style="
                                                        display: flex;
                                                        align-items: center;
                                                    "
                                                >
                                                    <img
                                                        src="../../../../sparkle/SparkleLogoicon.png"
                                                        width="30px"
                                                        alt=""
                                                        style="
                                                            margin-left: 20px;
                                                        "
                                                    />&nbsp;&nbsp;
                                                    <h4
                                                        class=""
                                                        style="
                                                            color: black;
                                                            font-size: 25px;
                                                        "
                                                    >
                                                        {{
                                                            flight.flightCode
                                                        }}&nbsp;&nbsp;
                                                        <i
                                                            class="fa-solid fa-plane"
                                                            style="
                                                                color: #365486;
                                                            "
                                                        ></i
                                                        >&nbsp;&nbsp;
                                                        {{ flight.flightModel }}
                                                    </h4>
                                                </div>

                                                <div class="flight-area">
                                                    <div
                                                        class="flight-detail"
                                                        style="
                                                            margin-right: 50px;
                                                        "
                                                    >
                                                        <h3 class="color-black">
                                                            {{
                                                                getDateTimeParts(
                                                                    flight
                                                                        .departure
                                                                        .dateTime
                                                                ).datePart
                                                            }}
                                                        </h3>
                                                        <div
                                                            class="flight-departure"
                                                        >
                                                            <h3
                                                                class="color-black"
                                                            >
                                                                {{
                                                                    getDateTimeParts(
                                                                        flight
                                                                            .departure
                                                                            .dateTime
                                                                    ).timePart
                                                                }}
                                                            </h3>
                                                            <h3
                                                                class="dark-gray text-end"
                                                            >
                                                                {{
                                                                    flight
                                                                        .departure
                                                                        .airport
                                                                }}
                                                            </h3>
                                                        </div>
                                                        <div
                                                            class="d-inline-flex align-items-center gap-8"
                                                        >
                                                            <div
                                                                class="from-to text-center"
                                                            >
                                                                <h3
                                                                    class="dark-gray"
                                                                >
                                                                    {{
                                                                        calculateHourDifference(
                                                                            flight
                                                                                .arrival
                                                                                .dateTime,
                                                                            flight
                                                                                .arrival
                                                                                .timeZone,
                                                                            flight
                                                                                .departure
                                                                                .dateTime,
                                                                            flight
                                                                                .departure
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
                                                                    style="
                                                                        margin-top: -5px;
                                                                    "
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
                                                        <div
                                                            class="flight-departure"
                                                        >
                                                            <h3
                                                                class="color-black"
                                                            >
                                                                {{
                                                                    getDateTimeParts(
                                                                        flight
                                                                            .arrival
                                                                            .dateTime
                                                                    ).timePart
                                                                }}
                                                            </h3>
                                                            <h3
                                                                class="dark-gray"
                                                            >
                                                                {{
                                                                    flight
                                                                        .arrival
                                                                        .airport
                                                                }}
                                                            </h3>
                                                        </div>
                                                        <h3 class="color-black">
                                                            {{
                                                                getDateTimeParts(
                                                                    flight
                                                                        .arrival
                                                                        .dateTime
                                                                ).datePart
                                                            }}
                                                        </h3>
                                                    </div>
                                                </div>
                                                <div
                                                    class="d-flex justify-content-between align-items-center mt-24"
                                                    style="flex-direction: row"
                                                >
                                                    <div
                                                        class="flight-button"
                                                        style="
                                                            margin-right: 50px;
                                                        "
                                                    >
                                                        <div class="amount">
                                                            <h3
                                                                class="color-black"
                                                                style="
                                                                    margin-left: 20px;
                                                                    font-weight: bold;
                                                                "
                                                            >
                                                                TWD&nbsp;
                                                                {{
                                                                    PriceFormat(
                                                                        flight.price
                                                                    )
                                                                }}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <h2
                        class="text-center"
                        style="
                            font-weight: bold;
                            font-size: 30px;
                            color: rgb(54, 84, 134);
                        "
                    >
                        票價總計
                    </h2>
                    <div class="price">
                        <h2 style="font-weight: bold">
                            1&nbsp;成人<br /><span
                                style="font-weight: normal; font-size: 20px"
                                >上述價格僅適用於目前選取的航班及日期，且為所有旅客購買的票價產品總價，包含機票票價、各項附加費與各地機場稅金等</span
                            >
                        </h2>
                        <h2 style="font-weight: bold">
                            TWD&nbsp;{{ PriceFormat(values.totalPrice) }}
                        </h2>
                    </div>
                </el-dialog>
            </div>
            <div class="col-4 d-flex justify-content-end">
                <h3 style="font-size: 35px; font-weight: bold">
                    TWD
                    {{
                        PriceFormat(
                            values.totalPrice * values.passengeTotalCount
                        )
                    }}
                    元
                </h3>
            </div>
            <div class="col-2 d-flex justify-content-end">
                <a href="/PassengerInfo" class="cus-btn next">下一步</a>
                <!-- PassengerInfo -->
                <!-- ChooseService -->
            </div>
        </div>
    </div>
</template>
<style scoped>
.next {
    font-weight: bold;
    font-size: 20px;
}
.detail {
    width: 100%;
    background-color: white;
    height: 100px;
    display: flex;
}
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.el-button {
    font-weight: bold;
    font-size: 20px;
}
.flight-area {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.my-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    h4 {
        font-weight: bold;
        font-size: 30px;
        color: rgb(54, 84, 134);
    }
}
.flightDes {
    font-size: 25px;
    font-weight: bold;
}
.airline-name {
    display: flex;
    align-items: center;
    justify-content: start;
}
.price {
    padding: 10px 50px 10px 50px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #e3efffb6;
    border-radius: 10px;
    color: black;
    height: 150px;
}
</style>
