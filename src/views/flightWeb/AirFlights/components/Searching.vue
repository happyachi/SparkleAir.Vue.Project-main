<script setup>
import { ref, onMounted,defineProps,onUpdated,watchEffect, watch,computed } from 'vue'
import {
    getDateTimeParts,
    calculateHourDifference
} from '@/views/flightWeb/AirFlights/components/flightJS/TimeHelper.js'
import {
    GetCheapestPrice,
    GetCabin,
    groupedFlightTicketPrice,
    PriceFormat,
    CabinCodeChange,
    MileCalculater
} from './flightJS/CabinHelper'
import { SearchFlight,GetFlightPrice,GetCabinRule } from '@/apis/FlightApi';
import useSessionMixin from '@/mixins/sessionMixin.js'
import { updateFlight,GetDatas } from './flightJS/FlightHelper'
//#region Const
const loading = ref(false)
const flightMixin = useSessionMixin()
const flightData = flightMixin.flightData.value
const flight = flightMixin.flightData.value.flights.values
const values = flightMixin.flightData.value.values;
const flights = flightMixin.flightData.value.flights
const brandName = ref('SPARKLE AIRLINES')
const schduleFlight = ref([])
const flightTicketPrice = ref([])
//艙等
const flightCabin = ref([])
const groupCabin = ref([])
const currentCabin = ref(values.cabin)

//艙等規定
const cabinRule = ref([])
const cheapPrice = ref()
const props = defineProps({
    departureAirport: String,
    arrivalAirport: String,
    departureTime: String,
    num:Number
})
const number = props.num;
//#endregion
function setCurrentCabin(cabin) {
    currentCabin.value = cabin
}
function selectPrice(price, cabinCode,mile) {
    // price = PriceFormat(price)
    flights[number].price = parseInt(price)
    flights[number].cabinCode = cabinCode
    flights[number].cabin = currentCabin.value 
    flights[number].fareProduct.mileageAccumulate.amount= parseInt(mile)
    values.totalPrice =computed(()=>{
        return values.timePrice + flights[number].price
    })
}
const firstFlight = ref([]);
const secondFlight= ref([]);
const searchAndRender = async (depAirport, arrAirport, deptTime,num) => {
    loading.value = true
    const searchParams = new URLSearchParams({
    DepartureAirport: depAirport,
    ArrivalAirport: arrAirport,
    DepartureStartTime: deptTime
    }).toString()
    try {
        const response = await fetch(`http://localhost:8889/api/AirFlights/SearchFlight?${searchParams}`);
        const datas = await response.json();
        const searchResult =datas
        schduleFlight.value = searchResult 
        if(num==0){
            firstFlight.value=searchResult[0]
            flightMixin.flightData.value.flights[0]= updateFlight(firstFlight.value); 
        } if(num==1){
            secondFlight.value=searchResult[0]     
            flightMixin.flightData.value.flights[1]= updateFlight(secondFlight.value);
        }
        const flightPrice = await GetFlightPrice(searchResult[0].airFlightManagementId, searchResult[0].flightModel)
        flightTicketPrice.value = flightPrice
        cheapPrice.value = GetCheapestPrice(flightPrice)
        flightCabin.value = GetCabin(flightPrice)
        groupCabin.value = groupedFlightTicketPrice(flightPrice)
        cabinRule.value = await GetCabinRule()
    } catch (error) {
        console.error('Error fetching flight data:', error)
    }finally {
        loading.value = false
    }
}
const expandControl = (id) => {
    const element = document.querySelector(`#flightDetail${id}`)
    if (element.classList.contains("show")) {
        console.log("removeshow")
        element.classList.remove("show")
    } else {
        element.classList.add("show")
        console.log("addshow")
    }
}
onMounted(() => {
    searchAndRender(props.departureAirport, props.arrivalAirport, props.departureTime,props.num);
})
</script>
<template>
    <section class="flight-listing-page mb-60">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12 col-lg-12"v-loading="loading">
                    <div v-for="item in schduleFlight">
                        <template v-if="item.length == 0">
                            <el-empty description="查無資料"></el-empty>
                        </template>
                        <!-- 航線內容 最低價格 -->
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
                                            {{ brandName }}
                                        </h3>
                                        <h4 class="dark-gray">
                                            {{ item.flightModel }}
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
                                                    item.scheduledDeparture
                                                ).timePart
                                            }}
                                        </h3>
                                        <h3 class="dark-gray text-end">
                                            {{ item.departureAirport }}
                                        </h3>
                                    </div>
                                    <div
                                        class="d-inline-flex align-items-center gap-8"
                                    >
                                        <div class="from-to text-center">
                                            <h3 class="dark-gray">
                                                {{
                                                    calculateHourDifference(
                                                        item.scheduledArrival,
                                                        item.arrivalTimeZone,
                                                        item.scheduledDeparture,
                                                        item.departureTimeZone
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
                                                    item.scheduledArrival
                                                ).timePart
                                            }}
                                        </h3>
                                        <h3 class="dark-gray">
                                            {{ item.arrivalAirport }}
                                        </h3>
                                    </div>
                                </div>
                                <div
                                    class="flight-button"
                                    style="margin-right: 50px"
                                >
                                    <div class="amount">
                                        <h3 class="color-black">
                                            TWD {{ cheapPrice }} 起
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="d-flex justify-content-between align-items-center mt-24"
                            >
                                <h3 class="color-black">
                                    {{
                                        getDateTimeParts(
                                            item.scheduledDeparture
                                        ).datePart
                                    }}
                                </h3>
                                <div>
                                    <button
                                        class="color-primary h3 collapsed"
                                        type="button"
                                        @click="expandControl(item.id)"
                                    >
                                        <i
                                            class="fa-solid fa-chevron-down color-primary"
                                        ></i
                                        >&nbsp;選擇艙等</button
                                    >
                                </div>
                            </div>
                        </div>
                        <!-- 艙等價格 -->
                        <div
                            :id="`flightDetail${item.id}`"
                            class="collapse mb-32"
                        >
                            <div
                                class="row bg-white br-10 light-shadow p-24 m-0 align-items-center"
                            >
                                <div class="card">
                                    <div class="card-header">
                                        <ul
                                            class="nav nav-tabs card-header-tabs"
                                            data-bs-tabs="tabs"
                                        >
                                            <li
                                                class="nav-item"
                                                v-for="cabin in flightCabin"
                                                :key="cabin"
                                            >
                                                <a
                                                    :href="`#${cabin}`"
                                                    class="cus-btn primary-light primary"
                                                    :class="{
                                                        active:
                                                            cabin ==
                                                            currentCabin
                                                    }"
                                                    :aria-current="
                                                        cabin == currentCabin
                                                            ? 'true'
                                                            : 'false'
                                                    "
                                                    data-bs-toggle="tab"
                                                    @click="
                                                        setCurrentCabin(cabin)
                                                    "
                                                >
                                                    {{ cabin }}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="card-body tab-content">
                                        <div
                                            v-for="cabin in flightCabin"
                                            :key="cabin"
                                            :id="`${cabin}`"
                                            class="tab-pane"
                                            :class="{
                                                active: cabin == currentCabin
                                            }"
                                        >
                                            <div class="eachCabin">
                                                <template
                                                    v-for="price in flightTicketPrice"
                                                >
                                                    <template
                                                        v-if="
                                                            price.cabinName ==
                                                            cabin
                                                        "
                                                    >
                                                        <div
                                                            class="cabinDetail br-10 p-24"
                                                        >
                                                            <div style="width: 400px;display:flex;flex-direction: column;align-items: center;" class='mybtn'>
                                                                <h3
                                                                    class="br-5 className"
                                                                >
                                                                    {{
                                                                        CabinCodeChange(
                                                                            price.cabinCode
                                                                        )
                                                                    }}
                                                                </h3>
                                                                <p
                                                                    style="
                                                                        font-size: 25px;
                                                                        font-weight: bold;
                                                                    "
                                                                >
                                                                    TWD
                                                                    {{
                                                                        PriceFormat(
                                                                            price.price
                                                                        )
                                                                    }}
                                                                </p>
                                                                
                                                                <template
                                                                    v-for="rule in cabinRule"
                                                                >
                                                                    <template
                                                                        v-if="
                                                                            rule.cabinCode ==
                                                                            price.cabinCode
                                                                        "
                                                                    >
                                                                    <a v-if="props.num === 0" href="/FlightResult" type='button' class="cus-btn"
    style="font-size: 26px; height: 60px; width: 200px;"
    @click="selectPrice(price.price, price.cabinCode,MileCalculater(item.mile,rule.accumulatedMile))">
    選擇
    </a>

    <a v-if="props.num === 1" href="/RoundResult" type='button' class="cus-btn"
    style="font-size: 26px; height: 60px; width: 200px;"
    @click="selectPrice(price.price, price.cabinCode,MileCalculater(item.mile,rule.accumulatedMile))">
    選擇
    </a> 
                                                                        <div class="ruleDetail">
                                                                            <p>
                                                                                訂位艙等<br />
                                                                                <h3
                                                                                
                                                                                    >{{cabin}} ({{
                                                                                        rule.cabinCode
                                                                                    }})</h3
                                                                                >
                                                                            </p>
                                                                            <p>
                                                                                託運行李<br /><h3
                                                                                
                                                                                    >{{
                                                                                        rule.shipmentCount
                                                                                    }}件(每件{{
                                                                                        rule.shipmentWeight
                                                                                    }}公斤)</h3
                                                                                >
                                                                            </p>                                                                            
                                                                            <p>
                                                                                隨身行李<br /><h3
                                                                                
                                                                                    >{{
                                                                                        rule.carryBagCount
                                                                                    }}件(每件{{
                                                                                        rule.carryBagWeight
                                                                                    }}公斤)</h3
                                                                                >
                                                                            </p>
                                                                            <p>
                                                                                免費Wi-Fi<br /><h3 v-if="rule.freeWifi"
                                                                                    >有</h3
                                                                                >
                                                                                <h3 v-else >沒有</h3>
                                                                            </p>
                                                                            <p>
                                                                                預選座位<br /><h3
                                                                                v-if="rule.preSelectedSeat"
                                                                                    >免費選位</h3
                                                                                >
                                                                                <h3 v-else>付費選位</h3>
                                                                            </p>
                                                                            <p>
                                                                                里程累積<br /><h3                                                                                   
                                                                                    >{{
                                                                                        PriceFormat(MileCalculater(item.mile,rule.accumulatedMile))
                                                                                    }}</h3
                                                                                >
                                                                            </p>
                                                                            <p>
                                                                                里程升等<br /><h3                                                                                   
                                                                                    v-if="rule.mileUpgrade"
                                                                                    >適用</h3
                                                                                >
                                                                            <h3 v-else>不適用</h3>
                                                                            </p>                                            
                                                                            <p>
                                                                                退票費用<br /><h3
                                                                                    >TWD
                                                                                    {{
                                                                                        PriceFormat(rule.refundFee)
                                                                                    }}</h3
                                                                                >
                                                                            </p>
                                                                        </div>
                                                                    </template>
                                                                </template>                                                                
                                                            </div>
                                                        </div>
                                                    </template>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
.card {
    border: none;
}
.eachCabin {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}
.cabinDetail {
    display: flex;
    align-items: center;
    justify-content:center;
    background: #ffffff;
    box-shadow: 0px 0px 10px #3653863d;
    border-radius: 10px;
    max-width: 290px;
}
.className {
    background-color: #365386;
    color: white;
    font-size: 25px;
    display: flex;
    justify-content: center;
    width: 100px;
    height: 45px;
    align-items: center;
}
p h3{
    color: #365386;
    font-weight: bold;
    margin-top: 0px;
}
.ruleDetail p{
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
}
.cus-btn.primary.active{
    background-color: #365386;
    color: white;
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
.mybtn .cus-btn{
    color:#f8f8ff
}
.mybtn .cus-btn:hover{
color: #16191a
}
</style>
