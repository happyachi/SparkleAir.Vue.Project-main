<script setup>
import { ref, onMounted, watch } from "vue"
import TitleBanner from "@/components/flightWebComponents/titleBanner.vue"
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
const flightMixin = useSessionMixin()
const values = flightMixin.flightData.value.values
const flights = flightMixin.flightData.value.flights
const flight1 = flightMixin.flightData.value.flights[0]
const flight2 = flightMixin.flightData.value.flights[1]
const passenger = flightMixin.flightData.value.passenger[0]
const TitleBannerTitle = ref({
    title1: "機票",
    title2: "明細"
})
const subject = ref("SPARKLE AIR 機票收據")
const title = `<p style="font-size: 20px; color:black">${passenger.lastName}, ${passenger.firstName} 您好:</p>
<p style="font-size: 18px; color:black">本次您訂購的機票如下所示:</p>`
const foot = `<p style="font-size: 18px; color:black">如有需做行李加購或是更改座位請於行程管理中確認。</p>
<p style="font-size: 18px; color:black">如有任何疑問請聯繫我們。</p>
<p style="font-size: 18px; color:black">謝謝</p>`
const template1 = `<div class="email">
    <div
        style="background-color:#6c91c2;border-radius:10px 10px 0 0;display:flex;padding-bottom:20px;height:50px"
        >
            <p
                style="color:white;padding-left:20px;font-weight:bold;font-size:20px"
            >
                ${flight1.departure.airport} - ${flight1.arrival.airport}
            </p>
            <p
                style="color:white;padding-left:20px;font-weight:bold;font-size:20px"
            >
                ${flight1.cabin} - ${CabinCodeChange(flight1.cabinCode)}(${
    flight1.cabinCode
})
            </p>
        </div>
        <div style="margin-left:20px">
            <p style="color: black; font-size: 20px">${flight1.flightCode} - ${
    flight1.flightModel
}</p>
        </div>
        <table style="width: 100%; text-align: center; padding-bottom: 20px">
    <tr>
        <td style="font-size: 18px; color:black">出發日期: ${
            getDateTimeParts(flight1.departure.dateTime).datePart
        }</td>
        <td style="font-size: 18px; color:black"></td>
        <td style="font-size: 18px; color:black">抵達日期: ${
            getDateTimeParts(flight1.arrival.dateTime).datePart
        }</td>
        <td style="font-size: 18px; color:black">訂位代號: <span style="color: rgb(108, 145, 194)">
                            ${flight1.ticketRef}
                        </span></td>
    </tr>
    <tr>
        <td style="font-size: 18px; color:black">出發地: ${
            flight1.departure.airport
        }</td>
        <td style="font-size: 18px; color:black">總飛行時間</td>
        <td style="font-size: 18px; color:black">目的地: ${
            flight1.arrival.airport
        }</td>
        <td style="font-size: 18px; color:black">座位號碼: ${
            flight1.seatNum
        }</td>
    </tr>
    <tr>
        <td style="font-size: 18px; color:black">出發時間: ${
            getDateTimeParts(flight1.departure.dateTime).timePart
        }</td>
        <td style="font-size: 18px; color:black">${calculateHourDifference(
            flight1.arrival.dateTime,
            flight1.arrival.timeZone,
            flight1.departure.dateTime,
            flight1.departure.timeZone
        )}</td>
        <td style="font-size: 18px; color:black">抵達時間: ${
            getDateTimeParts(flight1.arrival.dateTime).timePart
        }</td>
        <td style="font-size: 18px; color:black">累積里程&nbsp;${PriceFormat(
            flight1.fareProduct.mileageAccumulate.amount
        )}</td>
    </tr>
        </table>
        <div style="margin-left:20px;">
            <p style="color: black;">您可以透過QR Code進入行程管理頁面</p>
            <img src="https://lh3.googleusercontent.com/d/${flight1.QRCodeUrl}">
            </div>
    </div>
    <hr />`
const template2 = `<div class="email">
        <div
        style="background-color:#6c91c2;border-radius:10px 10px 0 0;display:flex;padding-bottom:20px;height:50px"
        >
            <p
                style="color:white;padding-left:20px;font-weight:bold;font-size:20px"
            >
                ${flight2.departure.airport} - ${flight2.arrival.airport}
            </p>
            <p
                style="color:white;padding-left:20px;font-weight:bold;font-size:20px"
            >
                ${flight2.cabin} - ${CabinCodeChange(flight2.cabinCode)}(${
    flight2.cabinCode
})
            </p>
        </div>
        <div style="margin-left:20px;">
            <p style="color: black; font-size: 20px">${flight2.flightCode} - ${
    flight2.flightModel
}</p>
        </div>
        <table style="width: 100%; text-align: center;">
    <tr>
        <td style="font-size: 18px; color:black">出發日期: ${
            getDateTimeParts(flight2.departure.dateTime).datePart
        }</td>
        <td style="font-size: 18px; color:black"></td>
        <td style="font-size: 18px; color:black">抵達日期: ${
            getDateTimeParts(flight2.arrival.dateTime).datePart
        }</td>
        <td style="font-size: 18px; color:black">訂位代號: <span style="color: rgb(108, 145, 194)">
                            ${flight2.ticketRef}
                        </span></td>
    </tr>
    <tr>
        <td style="font-size: 18px; color:black">出發地: ${
            flight2.departure.airport
        }</td>
        <td style="font-size: 18px; color:black">總飛行時間</td>
        <td style="font-size: 18px; color:black">目的地: ${
            flight2.arrival.airport
        }</td>
        <td style="font-size: 18px; color:black">座位號碼: ${
            flight2.seatNum
        }</td>
    </tr>
    <tr>
        <td style="font-size: 18px; color:black">出發時間: ${
            getDateTimeParts(flight2.departure.dateTime).timePart
        }</td>
        <td style="font-size: 18px; color:black">${calculateHourDifference(
            flight2.arrival.dateTime,
            flight2.arrival.timeZone,
            flight2.departure.dateTime,
            flight2.departure.timeZone
        )}</td>
        <td style="font-size: 18px; color:black">抵達時間: ${
            getDateTimeParts(flight2.arrival.dateTime).timePart
        }</td>
        <td style="font-size: 18px; color:black">累積里程&nbsp;${PriceFormat(
            flight2.fareProduct.mileageAccumulate.amount
        )}</td>
    </tr>
        </table>
        <div style="margin-left:20px;">
            <p style="color: black;">您可以透過QR Code進入行程管理頁面</p>
            <img src="https://lh3.googleusercontent.com/d/${flight2.QRCodeUrl}">
            </div>
    </div>
    <hr />`
const templatePrice = `<div
            class="price"
            style="
                padding: 10px 20px 10px 20px;
                margin-top: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #e3efffb6;
                border-radius: 10px;
                color: black;
            "
        >
            <h2 style="font-weight: bold">
                總額 TWD&nbsp;${PriceFormat(values.totalPrice)}
            </h2>
        </div>`
const emailTemp = title + template1 + template2 + templatePrice + foot
const email = ref({
    toEmail: passenger.email,
    subject: subject.value,
    body: emailTemp
})
const sendEmail = async () => {
    try {
        const res = await fetch("http://localhost:8889/api/Methods/SendEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(email.value)
        })
        if (!res.ok) {
            throw new Error("Network response was not ok")
        }
    } catch {
        console.error("Error creating Email:", error)
    }
}
onMounted(async () => {
    await sendEmail()
})
</script>
<template>
    <TitleBanner :title="TitleBannerTitle"></TitleBanner>
    <div class="container">
        <div v-for="flight in flights">
            <section class="flight-listing-page mb-60">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xl-12 col-lg-12">
                            <div>
                                <div
                                    class="flight-block bg-white light-shadow br-10"
                                >
                                    <div
                                        style="
                                            background-color: #6c91c2;
                                            border-radius: 10px 10px 0 0;
                                            display: flex;
                                            align-items: center;
                                            justify-content: space-between;
                                            padding-bottom: 10px;
                                        "
                                    >
                                        <h3
                                            class=""
                                            style="
                                                color: white;
                                                padding-left: 20px;
                                                font-weight: bold;
                                            "
                                        >
                                            {{
                                                flight.departure.airport
                                            }}&nbsp;&nbsp;
                                            <i
                                                class="fa-solid fa-plane-departure"
                                            ></i
                                            >&nbsp;&nbsp;
                                            {{ flight.arrival.airport }}
                                        </h3>
                                        <h3
                                            class=""
                                            style="
                                                color: white;
                                                padding-right: 20px;
                                                font-weight: bold;
                                            "
                                        >
                                            {{ flight.cabin }}
                                            -
                                            {{
                                                CabinCodeChange(
                                                    flight.cabinCode
                                                )
                                            }}({{ flight.cabinCode }})
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
                                            style="margin-left: 20px"
                                        />&nbsp;&nbsp;
                                        <h4
                                            class=""
                                            style="
                                                color: black;
                                                font-size: 25px;
                                            "
                                        >
                                            {{ flight.flightCode }}&nbsp;&nbsp;
                                            <i
                                                class="fa-solid fa-plane"
                                                style="color: #365486"
                                            ></i
                                            >&nbsp;&nbsp;
                                            {{ flight.flightModel }}
                                        </h4>
                                    </div>

                                    <div
                                        class="flight-area"
                                        style="
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            flex-direction: column;
                                        "
                                    >
                                        <div
                                            class="flight-detail"
                                            style="margin-right: 50px"
                                        >
                                            <h3 class="color-black">
                                                {{
                                                    getDateTimeParts(
                                                        flight.departure
                                                            .dateTime
                                                    ).datePart
                                                }}
                                            </h3>
                                            <div class="flight-departure">
                                                <h3 class="color-black">
                                                    {{
                                                        getDateTimeParts(
                                                            flight.departure
                                                                .dateTime
                                                        ).timePart
                                                    }}
                                                </h3>
                                                <h3 class="dark-gray text-end">
                                                    {{
                                                        flight.departure.airport
                                                    }}
                                                </h3>
                                            </div>
                                            <div
                                                class="d-inline-flex align-items-center gap-8"
                                            >
                                                <div
                                                    class="from-to text-center"
                                                >
                                                    <h3 class="dark-gray">
                                                        {{
                                                            calculateHourDifference(
                                                                flight.arrival
                                                                    .dateTime,
                                                                flight.arrival
                                                                    .timeZone,
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
                                                            flight.arrival
                                                                .dateTime
                                                        ).timePart
                                                    }}
                                                </h3>
                                                <h3 class="dark-gray">
                                                    {{ flight.arrival.airport }}
                                                </h3>
                                            </div>
                                            <h3 class="color-black">
                                                {{
                                                    getDateTimeParts(
                                                        flight.arrival.dateTime
                                                    ).datePart
                                                }}
                                            </h3>
                                        </div>
                                    </div>
                                    <div
                                        class="mt-24"
                                        style="
                                            flex-direction: row;
                                            padding-bottom: 10px;
                                        "
                                    >
                                        <div
                                            class="flight-button"
                                            style="margin-right: 20px"
                                        >
                                            <div
                                                class="amount"
                                                style="
                                                    display: flex;
                                                    align-items: center;
                                                    justify-content: space-between;
                                                "
                                            >
                                                <h3
                                                    class="color-black"
                                                    style="margin-left: 20px"
                                                >
                                                    座位號碼:
                                                    {{ flight.seatNum }}
                                                </h3>
                                                <h3 class="color-black">
                                                    累積里程&nbsp;{{
                                                        PriceFormat(
                                                            flight.fareProduct
                                                                .mileageAccumulate
                                                                .amount
                                                        )
                                                    }}
                                                </h3>
                                                <h2
                                                    class="ticketRef"
                                                    style="
                                                        margin-left: 20px;
                                                        font-weight: bold;
                                                    "
                                                >
                                                    訂位代號&nbsp;&nbsp;&nbsp;<span
                                                        style="
                                                            color: rgb(
                                                                108,
                                                                145,
                                                                194
                                                            );
                                                        "
                                                        >{{
                                                            flight.ticketRef
                                                        }}</span
                                                    >
                                                </h2>
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
        <div
            class="price"
            style="
                padding: 10px 50px 10px 50px;
                margin-top: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #e3efffb6;
                border-radius: 10px;
                color: black;
                height: 150px;
                margin-bottom: 20px;
            "
        >
            <h2 style="font-weight: bold">付款方式: 信用卡</h2>
            <h2 style="font-weight: bold">
                總額 TWD&nbsp;{{ PriceFormat(values.totalPrice) }}
            </h2>
        </div>
    </div>
</template>
