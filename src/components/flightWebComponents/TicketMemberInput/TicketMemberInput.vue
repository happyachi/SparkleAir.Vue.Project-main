<script setup>
import PriceDetail from "@/views/flightWeb/AirFlights/components/PriceDetail.vue"
import {
    getDateTimeParts,
    calculateHourDifference
} from "@/views/flightWeb/AirFlights/components/flightJS/TimeHelper.js"
import Detail from "@/views/flightWeb/AirFlights/components/Detail.vue"
import { ref, onMounted, watch } from "vue"
import useSessionMixin from "@/mixins/sessionMixin.js"
const flightMixin = useSessionMixin()
const values = flightMixin.flightData.value.values
const flights = flightMixin.flightData.value.flights
const passenger = flightMixin.flightData.value.passenger[0]
const ruleFormRef = ref(null)
const adult = ref(values.adultCount)
console.log(adult.value)
const child = ref(values.childCount)
const baby = ref(values.babyCount)
const form = ref({
    englishLastName: passenger.lastName,
    englishFirstName: passenger.firstName,
    gender: passenger.gender,
    dateOfBirth: passenger.dateOfBirth,
    phone: passenger.phone,
    email: passenger.email,
    passportNumber: passenger.passportNum,
    passportExpiryDate: passenger.passportExpirationDate
})

const rules = {
    englishLastName: [
        { required: true, message: "英文姓為必填", trigger: "blur" },
        { min: 1, max: 5, message: "長度須介於1～20個字", trigger: "blur" },
        {
            validator: (rule, value, callback) => {
                // 英文字母
                let alphabet = value.match(/([A-Za-z]+)/)

                if (alphabet) {
                    callback()
                } else {
                    callback(new Error("格式錯誤! 必須是英文字母"))
                }
            },
            trigger: "blur"
        }
    ],
    englishFirstName: [
        { required: true, message: "英文名為必填", trigger: "blur" },
        { min: 1, max: 20, message: "長度須介於1～20個字", trigger: "blur" },
        {
            validator: (rule, value, callback) => {
                // 英文字母
                let alphabet = value.match(/([A-Za-z]+)/)

                if (alphabet) {
                    callback()
                } else {
                    callback(new Error("格式錯誤! 必須是英文字母"))
                }
            },
            trigger: "blur"
        }
    ],
    gender: [{ required: true, message: "性別為必填", trigger: "blur" }],
    dateOfBirth: [
        { required: true, message: "出生日期為必填", trigger: "blur" }
    ],
    phone: [
        { required: true, message: "手機號碼為必填", trigger: "blur" },
        {
            pattern: /^09\d{8}$/,
            message: "請輸入正確的手機號碼",
            trigger: "blur"
        }
    ],
    email: [
        { required: true, message: "電子信箱為必填", trigger: "blur" },
        {
            type: "email",
            message: "請輸入正確電子格式",
            trigger: ["blur", "change"]
        }
    ],
    passportNumber: [
        { required: true, message: "護照號碼為必填", trigger: "blur" },
        { min: 10, max: 10, message: "護照號碼為10位數", trigger: "blur" }
    ],
    passportExpiryDate: [
        { required: true, message: "護照效期為必填", trigger: "blur" }
    ]
}
const demoBtn = () => {
    form.value.englishLastName = "Hsu"
    form.value.englishFirstName = "Xiaoxiong"
    form.value.gender = true
    form.value.dateOfBirth = "1989-04-22"
    form.value.phone = "0987654321"
    form.value.passportNumber = "7856325894"
    form.value.passportExpiryDate = "2025-04-01"
    form.value.email = "sparkle.airline@gmail.com"
}
// 按下送出 會觸發的事件
const submitForm = () => {
    ruleFormRef.value.validate(async (valid) => {
        if (valid) {
            document.location.href = "/chooseService"
            console.log("submit!")
        } else {
            console.log("error submit!")
            return false
        }
    })
}
const expandControl = (id) => {
    const element = document.querySelector(`#flightId${id}`)
    if (element.classList.contains("show")) {
        console.log("removeshow")
        element.classList.remove("show")
    } else {
        element.classList.add("show")
        console.log("addshow")
    }
}

onMounted(() => {
    watch(() => {
        ;(passenger.lastName = form.value.englishLastName),
            (passenger.firstName = form.value.englishFirstName),
            (passenger.gender = form.value.gender === true ? true : false),
            (passenger.dateOfBirth = form.value.dateOfBirth),
            (passenger.phone = form.value.phone),
            (passenger.email = form.value.passportNumber),
            (passenger.passportNum = form.value.passportNumber),
            (passenger.passportExpirationDate = form.value.passportExpiryDate),
            (passenger.email = form.value.email)
        console.log(passenger.gender)
    })
})
</script>
<template>
    <section class="flight-booking">
        <div class="container-fluid" style="margin-bottom: 20px">
            <div class="row" style="margin: 20px">
                <div class="col-xl-8">
                    <div
                        style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-direction: column;
                        "
                    >
                        <h2 style="font-weight: bold">
                            <i
                                class="fa-solid fa-user me-5 ms-2"
                                style="color: #6c91c2"
                            ></i
                            >旅客詳細資料
                        </h2>
                        <div class="notice">
                            <i
                                class="fa-solid fa-circle-exclamation ms-4"
                                style="font-size: 25px; color: #6c91c2"
                            ></i>
                            <h4 class="ms-4" style="line-height: 1.5">
                                含有星號(*)的欄位必須填寫資料<br />
                                請輸入與搭機者護照上相同之英文姓名<br />
                                (請確認您輸入的資料與官方文件相同)
                            </h4>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="cardStyle">
                            <div v-if="adult != 0" class="info">
                                <div class="cube">
                                    <i
                                        class="fa-solid fa-person"
                                        style="font-size: 40px; color: #6c91c2"
                                    ></i>
                                </div>
                                <div style="font-size: 40px; font-weight: bold">
                                    成
                                </div>
                                <div style="font-size: 40px; font-weight: bold">
                                    人
                                </div>
                            </div>
                            <el-card style="width: 100%; height: 100%">
                                <div class="form-block">
                                    <div class="row">
                                        <div class="col">
                                            <el-form
                                                ref="ruleFormRef"
                                                :model="form"
                                                status-icon
                                                :rules="rules"
                                                label-width="auto"
                                                class="demo-ruleForm"
                                            >
                                                <el-form-item
                                                    label="英文姓氏"
                                                    prop="englishLastName"
                                                >
                                                    <el-input
                                                        v-model="
                                                            form.englishLastName
                                                        "
                                                        autocomplete="off"
                                                    />
                                                </el-form-item>
                                                <el-form-item
                                                    label="英文名字"
                                                    prop="englishFirstName"
                                                >
                                                    <el-input
                                                        v-model="
                                                            form.englishFirstName
                                                        "
                                                        autocomplete="off"
                                                    />
                                                </el-form-item>
                                                <el-form-item
                                                    label="性別"
                                                    prop="gender"
                                                >
                                                    <el-radio-group
                                                        v-model="form.gender"
                                                    >
                                                        <el-radio-button
                                                            label="男"
                                                            value="true"
                                                        />
                                                        <el-radio-button
                                                            label="女"
                                                            value="false"
                                                        />
                                                    </el-radio-group>
                                                </el-form-item>
                                                <el-form-item
                                                    label="出生日期"
                                                    prop="dateOfBirth"
                                                >
                                                    <el-col :span="11">
                                                        <el-date-picker
                                                            v-model="
                                                                form.dateOfBirth
                                                            "
                                                            type="date"
                                                            placeholder="選擇日期"
                                                            autocomplete="off"
                                                            value-format="YYYY-MM-DD"
                                                            size="large"
                                                        />
                                                    </el-col>
                                                </el-form-item>
                                                <el-form-item
                                                    label="手機號碼"
                                                    prop="phone"
                                                >
                                                    <el-input
                                                        v-model="form.phone"
                                                        autocomplete="off"
                                                    />
                                                </el-form-item>
                                                <el-form-item
                                                    label="電子信箱"
                                                    prop="email"
                                                >
                                                    <el-input
                                                        v-model="form.email"
                                                        autocomplete="off"
                                                    />
                                                </el-form-item>
                                                <el-form-item
                                                    label="護照號碼"
                                                    prop="passportNumber"
                                                >
                                                    <el-input
                                                        v-model="
                                                            form.passportNumber
                                                        "
                                                        autocomplete="off"
                                                    />
                                                </el-form-item>
                                                <el-form-item
                                                    label="護照效期"
                                                    prop="passportExpiryDate"
                                                >
                                                    <el-col :span="11">
                                                        <el-date-picker
                                                            v-model="
                                                                form.passportExpiryDate
                                                            "
                                                            type="date"
                                                            placeholder="選擇日期"
                                                            autocomplete="off"
                                                            value-format="YYYY-MM-DD"
                                                            size="large"
                                                        />
                                                    </el-col>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 mb-lg-0 mb-32">
                    <div class="flight-booking-detail light-shadow mb-32">
                        <template v-for="flight in flights">
                            <div :id="`flight${flight.id}`">
                                <div class="flight-title mb-24">
                                    <button
                                        class="color-white h3 collapsed"
                                        type="button"
                                        style="font-weight: bold"
                                        @click="expandControl(flight.id)"
                                    >
                                        {{
                                            flight.departure.airport
                                        }}&nbsp;&nbsp;<i
                                            class="fa-solid fa-plane-departure"
                                        ></i
                                        >&nbsp;&nbsp;{{
                                            flight.arrival.airport
                                        }}&nbsp;&nbsp;<i
                                            class="fa-solid fa-chevron-down color-white"
                                        ></i>
                                    </button>
                                </div>
                                <div
                                    :id="`flightId${flight.id}`"
                                    class="box bg-white p-24 collapse"
                                    style="
                                        margin-bottom: -10px;
                                        margin-top: -20px;
                                    "
                                >
                                    <div class="flight-detail mb-32">
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
                                                    style="margin-top: -15px"
                                                >
                                                    <i
                                                        class="fa-solid fa-plane"
                                                        style="
                                                            font-size: 20px;
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
                                        class="d-flex justify-content-around mb-32"
                                    >
                                        <div class="flight-departure">
                                            <h4 class="dark-gray">出發日期</h4>
                                            <h3 class="color-black">
                                                {{
                                                    getDateTimeParts(
                                                        flight.departure
                                                            .dateTime
                                                    ).datePart
                                                }}
                                            </h3>
                                        </div>
                                        <div class="vr-line"></div>
                                        <div class="flight-departure">
                                            <h4 class="dark-gray">抵達日期</h4>
                                            <h3 class="color-black">
                                                {{
                                                    getDateTimeParts(
                                                        flight.arrival.dateTime
                                                    ).datePart
                                                }}
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="text">
                                        <h4 class="color-medium-gray">
                                            {{ flight.operatingAirlineName }}
                                        </h4>
                                        <h4 class="color-medium-gray">
                                            {{ flight.cabin }} |
                                            {{ flight.flightCode }} |
                                            {{ flight.flightModel }}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <PriceDetail></PriceDetail>
                </div>
                <div
                    class="fixed-buttons"
                    style="margin-top: 20px; margin-bottom: 20px"
                >
                    <button
                        class="form-wizard-next-btn cus-btn w-100"
                        @click="demoBtn()"
                        style="margin-bottom: 10px"
                    >
                        DEMO
                    </button>
                    <a
                        class="form-wizard-next-btn cus-btn w-100"
                        @click="submitForm()"
                        >確認
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.cardStyle {
    background-color: rgb(54, 84, 134);
    width: auto;
    height: auto;
    display: flex;
    border-radius: 5px;
}
.info {
    display: flex;
    color: #fff;
    align-items: center;
    flex-direction: column;
}

.cube {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 60px;
    background-color: #fff;
    border: 5px solid rgb(54, 84, 134);
    border-top-left-radius: 5px;
}
.notice {
    border: 5px solid rgba(54, 83, 134, 0.308);
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 5px;
}
</style>
