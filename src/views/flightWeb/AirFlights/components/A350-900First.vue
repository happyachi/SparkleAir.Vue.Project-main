<script setup>
import useSessionMixin from "@/mixins/sessionMixin.js"
const flightMixin = useSessionMixin()
const values = flightMixin.flightData.value.values
const flights = flightMixin.flightData.value.flights
import {
    onMounted,
    ref,
    defineProps,
    defineEmits,
    watch,
    watchEffect
} from "vue"
import { updateFlightSeatNum } from "./flightJS/FlightHelper"
const seatLetter = ref(["A", "D", "G", "K"])
const loading = ref(false)
const props = defineProps({
    passenger: Object,
    flight: Object,
    seatNum: String
})
const selectedSeatId = ref(props.flight.seatNum)
const emits = defineEmits(["update:firstSeat"])
function chooseSeat(id) {
    selectedSeatId.value = id // 更新已選擇座位 ID
    updateFlightSeatNum(props.flight.id, id)
}
const getSeat = async (flightId) => {
    const response = await fetch(
        `http://localhost:8889/api/AirFlights/GetFlightSeat?flightId=${flightId}`
    )
    const datas = await response.json()
    return datas
}

const seats = ref([])
const updateSeat = async () => {
    loading.value = true
    seats.value.forEach((seat) => {
        try {
            if (seat.isSeated === true && seat.airCabinId === 1) {
                const seatElement = document.getElementById(`${seat.seatNum}`)
                seatElement.classList.add("inMiddle")
                seatElement.innerHTML =
                    '<i class="fa-solid fa-xmark exits"style="font-size: 30px"></i>'
                seatElement.classList.remove("theSeat")
                seatElement.removeEventListener("click", chooseSeat)
            }
        } catch (error) {
            console.error("Error fetching seat data:", error)
        } finally {
            loading.value = false
        }
    })
}
onMounted(async () => {
    seats.value = await getSeat(props.flight.id)
    if (selectedSeatId.value) {
        const selectedSeat = document.getElementById(`${selectedSeatId.value}`)
        if (selectedSeat) {
            selectedSeat.classList.add("selected")
        }
    }
})
watchEffect(() => {
    updateSeat()
})
watch(selectedSeatId, (newValue, oldValue) => {
    if (oldValue) {
        const oldSelectedSeat = document.getElementById(`${oldValue}`)
        if (oldSelectedSeat) {
            oldSelectedSeat.classList.remove("selected")
        }
    }
    if (newValue) {
        const newSelectedSeat = document.getElementById(`${newValue}`)
        if (newSelectedSeat) {
            newSelectedSeat.classList.add("selected")
        }
    }
})
</script>
<template>
    <h3>你選擇的座位是:</h3>
    <h3>{{ selectedSeatId }}</h3>
    <div style="overflow-x: auto; max-height: 500px" v-loading="loading">
        <div class="cabinContainer" border="0" cellspacing="0" cellpadding="0">
            <table
                class="cabin inMiddle"
                border="0"
                cellspacing="0"
                cellpadding="0"
            >
                <tbody class="body">
                    <tr class="letters-rows">
                        <td class="Square"></td>
                        <td class="WindowPlaceHolder"></td>
                        <td class="Square"></td>
                        <td class="letters firstRow">
                            <span aria-hidden="true" class="inMiddle">{{
                                seatLetter[0]
                            }}</span>
                        </td>
                        <td class="letters firstRow"></td>
                        <td class="letters firstRow">
                            <span aria-hidden="true" class="inMiddle">{{
                                seatLetter[1]
                            }}</span>
                        </td>
                        <td class="letters firstRow">
                            <span aria-hidden="true" class="inMiddle">{{
                                seatLetter[2]
                            }}</span>
                        </td>
                        <td class="letters firstRow"></td>
                        <td class="letters firstRow">
                            <span aria-hidden="true" class="inMiddle">{{
                                seatLetter[3]
                            }}</span>
                        </td>
                        <td class="Square"></td>
                        <td class="WindowPlaceHolder"></td>
                        <td class="Square"></td>
                    </tr>
                    <template v-for="num in 1">
                        <tr class="seats-row">
                            <td>
                                <div
                                    aria-hidden="true"
                                    aria-label="Left"
                                    class="EmptySquare Square"
                                ></div>
                            </td>
                            <td>
                                <div
                                    aria-hidden="true"
                                    class="leftWindow"
                                ></div>
                            </td>
                            <td class="numbers firstColumn">
                                <div aria-hidden="true" class="inMiddle">
                                    {{ num }}
                                </div>
                            </td>
                            <td :id="`td${num}${seatLetter[0]}`">
                                <div
                                    :id="`${num}${seatLetter[0]}`"
                                    class="Square theSeat"
                                    aria-hidden="true"
                                    @click="
                                        chooseSeat(`${num}${seatLetter[0]}`)
                                    "
                                ></div>
                            </td>
                            <td
                                class="corridor Square"
                                aria-hidden="true"
                                aria-label="走道"
                            ></td>
                            <td :id="`td${num}${seatLetter[1]}`">
                                <div
                                    :id="`${num}${seatLetter[1]}`"
                                    class="Square theSeat"
                                    aria-hidden="true"
                                    @click="
                                        chooseSeat(`${num}${seatLetter[1]}`)
                                    "
                                ></div>
                            </td>
                            <td :id="`td${num}${seatLetter[2]}`">
                                <div
                                    :id="`${num}${seatLetter[2]}`"
                                    class="Square theSeat"
                                    aria-hidden="true"
                                    @click="
                                        chooseSeat(`${num}${seatLetter[2]}`)
                                    "
                                ></div>
                            </td>
                            <td
                                class="corridor Square"
                                aria-hidden="true"
                                aria-label="走道"
                            ></td>
                            <td :id="`td${num}${seatLetter[3]}`">
                                <div
                                    :id="`${num}${seatLetter[3]}`"
                                    class="Square theSeat"
                                    aria-hidden="true"
                                    @click="
                                        chooseSeat(`${num}${seatLetter[3]}`)
                                    "
                                ></div>
                            </td>
                            <td class="numbers lastColumn">
                                <div aria-hidden="true" class="inMiddle">
                                    {{ num }}
                                </div>
                            </td>
                            <td>
                                <div
                                    aria-hidden="true"
                                    class="rightWindow"
                                ></div>
                            </td>
                            <td>
                                <div
                                    aria-hidden="true"
                                    aria-label="Right"
                                    class="EmptySquare Square"
                                ></div>
                            </td>
                        </tr>
                    </template>
                    <tr class="letters-rows">
                        <td class="Square"></td>
                        <td class="WindowPlaceHolder"></td>
                        <td class="Square"></td>
                        <td class="letters firstRow">
                            <span aria-hidden="true" class="inMiddle">{{
                                seatLetter[0]
                            }}</span>
                        </td>
                        <td class="letters firstRow"></td>
                        <td class="letters firstRow">
                            <span aria-hidden="true" class="inMiddle">{{
                                seatLetter[1]
                            }}</span>
                        </td>
                        <td class="letters firstRow">
                            <span aria-hidden="true" class="inMiddle">{{
                                seatLetter[2]
                            }}</span>
                        </td>
                        <td class="letters firstRow"></td>
                        <td class="letters firstRow">
                            <span aria-hidden="true" class="inMiddle">{{
                                seatLetter[3]
                            }}</span>
                        </td>
                        <td class="Square"></td>
                        <td class="WindowPlaceHolder"></td>
                        <td class="Square"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style
    scoped
    src="@/views/flightWeb/AirFlights/components/FlightCSS/FlightCabinSeat.css"
></style>
