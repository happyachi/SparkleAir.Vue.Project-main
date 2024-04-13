<script setup>
import FlightSearch from "../../AirFlights/components/FlightSearch.vue";
import TakeOffStatus from "../../AirFlights/components/TakeOffStatus.vue";
import { ref } from "vue";
import { useTicketsStore } from "@/stores/ticketsStore";

const ticketsStore = useTicketsStore();
const manageBookingBookRef = ref();
const manageBookingLastName = ref();
const manageBookingFirstName = ref();
const rules = {
  BookRefRules: [(v) => !!v || "訂位代號必填"],
  LastNameRules: [(v) => !!v || "英文姓氏必填"],
  FirstNameRules: [(v) => !!v || "英文名字必填"],
};
const manageBookingBtn = async () => {
  if (
    manageBookingBookRef.value != undefined &&
    manageBookingLastName.value != undefined &&
    manageBookingFirstName.value != undefined
  ) {
    const response = await ticketsStore.getTicketInfo(
      manageBookingBookRef.value,
      manageBookingFirstName.value,
      manageBookingLastName.value
    );
    if (response.isVerify == true) {
      console.log(response);
      // 要導向行程管理;
      document.location.href = "/";
    } else {
      // 登入失敗的訊息
      ElNotification({
        title: "登入失敗",
        message: "查無此訂位資訊",
        type: "error",
        offset: 100,
      })();

      console.log(false);
    }
  }
};
</script>

<template>
  <!-- Booking Area Start -->
  <div class="page-content m-0">
    <section class="booking mb-20">
      <div class="container-fluid">
        <div class="content">
          <div class="br-10">
            <div class="card-body tab-content">
              <div class="tab-pane active" id="flight">
                <div class="card">
                  <div class="card-header">
                    <ul class="nav nav-tabs" data-bs-tabs="tabs">
                      <li class="nav-item">
                        <a href="#stopover" class="cus-btn primary-light primary active" aria-current="true"
                          data-bs-toggle="tab">
                          購票
                        </a>
                      </li>
                      <li class="nav-item">
                        <a href="#manage" class="cus-btn primary-light primary" aria-current="false"
                          data-bs-toggle="tab">
                          行程管理 / 網路報到
                        </a>
                      </li>
                      <li class="nav-item">
                        <a href="#status" class="cus-btn primary-light primary" aria-current="false"
                          data-bs-toggle="tab">
                          當日班機動態
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body tab-content">
                    <!-- StopOver tab Start -->
                    <div class="tab-pane active" id="stopover">
                      <FlightSearch></FlightSearch>
                    </div>
                    <!-- StopOver tab End -->

                    <!-- Manage tab Start -->
                    <div class="tab-pane" id="manage">
                      <div class="booking-bar">
                        <ul class="nav nav-tabs" data-bs-tabs="tabs">
                          <li class="nav-item">
                            <a href="#manageBooking" class="nav-link active" aria-current="true" data-bs-toggle="tab">
                              行程管理
                            </a>
                          </li>
                          <li class="nav-item">
                            <a href="#checkIn" class="nav-link" aria-current="false" data-bs-toggle="tab">
                              網路報到
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="card-body tab-content">
                        <div class="tab-pane active" id="manageBooking">
                          <v-form @submit.prevent>
                            <div class="row">
                              <div class="col-4">
                                <v-text-field id="v-input-size" v-model="manageBookingBookRef"
                                  :rules="rules.BookRefRules" label="訂位代號"></v-text-field>
                              </div>
                              <div class="col-3">
                                <v-text-field v-model="manageBookingLastName" :rules="rules.LastNameRules"
                                  label="英文姓氏"></v-text-field>
                              </div>
                              <div class="col-3">
                                <v-text-field v-model="manageBookingFirstName" :rules="rules.FirstNameRules"
                                  label="英文名字"></v-text-field>
                              </div>
                              <div class="col-2">
                                <button type="submit" class="cus-btn" style="
                                    color: white;
                                    font-family: 'Times New Roman', Times, serif;
                                    font-size: 20px;
                                  " @click="manageBookingBtn">
                                  確認
                                </button>
                              </div>
                            </div>
                          </v-form>

                          <!-- <div class="row align-items-center">
                            <div class="col-xl-10 col-lg-10 col-md-10">
                              <div class="booking-info d-block">
                                <div class="row">
                                  <div class="col-lg-4 col-md-4 col-sm-4">
                                    <div class="custom-sel-input-block v-2">
                                      <input
                                        type="text"
                                        class="sel-input"
                                        name="reference"
                                        id="ref-name"
                                        placeholder="機票號碼"
                                        :model="manageBookingBookRef"
                                      />
                                    </div>
                                  </div>
                                  <div class="col-lg-4 col-md-4 col-sm-4">
                                    <div class="custom-sel-input-block m-0">
                                      <input
                                        type="text"
                                        class="sel-input"
                                        name="name"
                                        id="last-name"
                                        placeholder="姓氏"
                                        :model="manageBookingLastName"
                                      />
                                    </div>
                                  </div>
                                  <div class="col-lg-4 col-md-4 col-sm-4">
                                    <div class="custom-sel-input-block m-0">
                                      <input
                                        type="text"
                                        class="sel-input"
                                        name="name"
                                        id="first-name"
                                        placeholder="名字"
                                        :model="manageBookingFirstName"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="col-xl-2 col-lg-2 col-md-2 mt-md-0 mt-32"
                            >
                              <button
                                class="cus-btn"
                                style="
                                  font-family: 'Times New Roman', Times, serif;
                                  font-size: 20px;
                                "
                                @click="manageBookingBtn"
                              >
                                確認
                              </button>
                            </div>
                          </div> -->
                        </div>
                        <div class="tab-pane" id="checkIn">
                          <form action="flight-booking.html" method="post">
                            <div class="row align-items-center">
                              <div class="col-xl-10 col-lg-10 col-md-10">
                                <div class="booking-info d-block">
                                  <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                      <div class="custom-sel-input-block v-2 m-0">
                                        <input type="text" class="sel-input" name="reference" id="refNname"
                                          placeholder="機票號碼" />
                                      </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                      <div class="custom-sel-input-block m-0">
                                        <input type="text" class="sel-input" name="name" id="lasName"
                                          placeholder="姓氏" />
                                      </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-4">
                                      <div class="custom-sel-input-block m-0">
                                        <input type="text" class="sel-input" name="name" id="firstName"
                                          placeholder="名字" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-xl-2 col-lg-2 col-md-2 mt-md-0 mt-32">
                                <button type="submit" class="cus-btn" style="
                                    font-family: 'Times New Roman', Times, serif;
                                    font-size: 20px;
                                  ">
                                  確認
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <!-- Manage tab End -->

                    <!-- Flight Status tab Start -->
                    <div class="tab-pane" id="status">
                      <TakeOffStatus></TakeOffStatus>
                      <!-- <div class="booking-bar">
                                                <ul
                                                    class="nav nav-tabs"
                                                    data-bs-tabs="tabs"
                                                >
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
                                                </ul>
                                            </div>
                                            <div class="card-body tab-content">
                                                <div
                                                    class="tab-pane active"
                                                    id="byRoute"
                                                >
                                                    <form
                                                        action="flight-listing.html"
                                                        method="post"
                                                    >
                                                        <div
                                                            class="row align-items-center"
                                                        >
                                                            <div
                                                                class="col-xl-10 col-lg-10"
                                                            >
                                                                <div
                                                                    class="booking-info v-2 d-md-flex d-inline-block justify-content-between"
                                                                >
                                                                    <div
                                                                        class="custom-sel-input-block m-0"
                                                                    >
                                                                        <input
                                                                            type="text"
                                                                            class="sel-input auto-input"
                                                                            id="flightDepart"
                                                                            placeholder="出發地"
                                                                        />
                                                                        <div
                                                                            class="slector-wrapper"
                                                                        ></div>
                                                                    </div>
                                                                    <div
                                                                        class="custom-sel-input-block m-0 d-flex flex-row align-items-center"
                                                                    >
                                                                        <div
                                                                            class="vertical-line d-md-flex d-none"
                                                                        ></div>
                                                                        <input
                                                                            type="text"
                                                                            class="sel-input auto-input"
                                                                            id="flightArrive"
                                                                            placeholder="目的地"
                                                                        />
                                                                        <div
                                                                            class="slector-wrapper"
                                                                        ></div>
                                                                    </div>

                                                                    <div>
                                                                        <div
                                                                            class="input-date-picker date-time m-0"
                                                                        >
                                                                            <input
                                                                                type="text"
                                                                                class="sel-input date_from"
                                                                                id="flightTimeDate"
                                                                                placeholder="Aug 20, 2023"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-xl-2 col-lg-2 d-flex align-items-center mt-lg-0 mt-32"
                                                            >
                                                                <button
                                                                    type="submit"
                                                                    class="cus-btn"
                                                                    style="
                                                                        font-family: 'Times New Roman',
                                                                            Times,
                                                                            serif;
                                                                        font-size: 20px;
                                                                    "
                                                                >
                                                                    查詢
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="24"
                                                                        height="24"
                                                                        viewbox="0 0 32 32"
                                                                        fill="none"
                                                                    >
                                                                        <g
                                                                            clip-path="url(#clip0_502_1331)"
                                                                        >
                                                                            <path
                                                                                d="M31.6933 0.544584C30.6572 -0.491824 27.1402 1.34503 26.1041 2.38143L21.9545 6.53127H3.07887C2.63024 6.53127 2.24462 6.85011 2.16055 7.29104C2.07669 7.73189 2.31798 8.16995 2.73524 8.3348L15.2174 13.2677L7.5633 20.9216H0.323909C0.168651 20.9221 0.0346723 21.0323 0.00576263 21.1852C-0.023357 21.3385 0.060152 21.4901 0.20498 21.5471L6.29687 23.9548C6.33201 24.1078 6.38108 24.2574 6.44394 24.4038L6.17745 24.6709C5.79778 25.0503 5.79778 25.6651 6.17745 26.045C6.55664 26.4247 7.17263 26.4247 7.55182 26.045L7.81194 25.785C7.95935 25.8501 8.11132 25.9014 8.26623 25.9382L10.6144 31.9561C10.6709 32.1013 10.8229 32.1851 10.976 32.1568C11.0419 32.145 11.1002 32.1123 11.1451 32.0673C11.2044 32.0087 11.2399 31.9274 11.2399 31.8382V24.7512L19.0155 16.976L23.9019 29.4993C24.0654 29.9177 24.5037 30.1608 24.9452 30.0781C25.136 30.0421 25.3038 29.9498 25.4333 29.8212C25.6038 29.6499 25.7071 29.4151 25.7077 29.1591V10.284L29.8573 6.13423C30.893 5.09789 32.7293 1.58085 31.6933 0.544584Z"
                                                                                fill="white"
                                                                            ></path>
                                                                        </g>
                                                                        <defs>
                                                                            <rect
                                                                                width="32"
                                                                                height="32"
                                                                                fill="black"
                                                                            ></rect>
                                                                        </defs>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div
                                                    class="tab-pane"
                                                    id="flightNo"
                                                >
                                                    <form
                                                        action="flight-listing.html"
                                                        method="post"
                                                    >
                                                        <div
                                                            class="row align-items-center"
                                                        >
                                                            <div
                                                                class="col-xl-10 col-lg-10"
                                                            >
                                                                <div
                                                                    class="booking-info v-2 d-md-flex d-inline-block justify-content-between"
                                                                >
                                                                    <div
                                                                        class="custom-sel-input-block m-0"
                                                                    >
                                                                        <input
                                                                            type="text"
                                                                            class="sel-input auto-input"
                                                                            id="flightDepat"
                                                                            placeholder="From"
                                                                        />
                                                                        <div
                                                                            class="slector-wrapper"
                                                                        ></div>
                                                                    </div>
                                                                    <div
                                                                        class="custom-sel-input-block m-0 d-flex flex-row align-items-center"
                                                                    >
                                                                        <div
                                                                            class="vertical-line d-md-flex d-none"
                                                                        ></div>
                                                                        <input
                                                                            type="text"
                                                                            class="sel-input auto-input"
                                                                            id="flightArive"
                                                                            placeholder="To"
                                                                        />
                                                                        <div
                                                                            class="slector-wrapper"
                                                                        ></div>
                                                                    </div>

                                                                    <div>
                                                                        <div
                                                                            class="input-date-picker date-time m-0"
                                                                        >
                                                                            <input
                                                                                type="text"
                                                                                class="sel-input date_from"
                                                                                id="flightTieDate"
                                                                                placeholder="Aug 20, 2023"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="col-xl-2 col-lg-2 d-flex align-items-center mt-lg-0 mt-32"
                                                            >
                                                                <button
                                                                    type="submit"
                                                                    class="cus-btn"
                                                                >
                                                                    Show Flight
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="24"
                                                                        height="24"
                                                                        viewbox="0 0 32 32"
                                                                        fill="none"
                                                                    >
                                                                        <g
                                                                            clip-path="url(#clip0_502_1331)"
                                                                        >
                                                                            <path
                                                                                d="M31.6933 0.544584C30.6572 -0.491824 27.1402 1.34503 26.1041 2.38143L21.9545 6.53127H3.07887C2.63024 6.53127 2.24462 6.85011 2.16055 7.29104C2.07669 7.73189 2.31798 8.16995 2.73524 8.3348L15.2174 13.2677L7.5633 20.9216H0.323909C0.168651 20.9221 0.0346723 21.0323 0.00576263 21.1852C-0.023357 21.3385 0.060152 21.4901 0.20498 21.5471L6.29687 23.9548C6.33201 24.1078 6.38108 24.2574 6.44394 24.4038L6.17745 24.6709C5.79778 25.0503 5.79778 25.6651 6.17745 26.045C6.55664 26.4247 7.17263 26.4247 7.55182 26.045L7.81194 25.785C7.95935 25.8501 8.11132 25.9014 8.26623 25.9382L10.6144 31.9561C10.6709 32.1013 10.8229 32.1851 10.976 32.1568C11.0419 32.145 11.1002 32.1123 11.1451 32.0673C11.2044 32.0087 11.2399 31.9274 11.2399 31.8382V24.7512L19.0155 16.976L23.9019 29.4993C24.0654 29.9177 24.5037 30.1608 24.9452 30.0781C25.136 30.0421 25.3038 29.9498 25.4333 29.8212C25.6038 29.6499 25.7071 29.4151 25.7077 29.1591V10.284L29.8573 6.13423C30.893 5.09789 32.7293 1.58085 31.6933 0.544584Z"
                                                                                fill="white"
                                                                            ></path>
                                                                        </g>
                                                                        <defs>
                                                                            <rect
                                                                                width="32"
                                                                                height="32"
                                                                                fill="black"
                                                                            ></rect>
                                                                        </defs>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div> -->
                    </div>
                    <!-- Flight Status tab End -->
                  </div>
                </div>
              </div>
              <!-- Hotel tab Start -->
              <div class="tab-pane" id="hotel">
                <form action="hotel-listing.html" method="post">
                  <div class="row align-items-center">
                    <div class="col-xxl-10 col-xl-12">
                      <div class="booking-info">
                        <div>
                          <div class="custom-sel-input-block">
                            <input type="text" class="sel-input auto-input-hotel" id="flight_Destination"
                              placeholder="Destination" />
                          </div>
                        </div>
                        <div class="vertical-line d-xl-flex d-none"></div>
                        <div class="d-md-flex justify-content-between d-sm-block">
                          <div class="input-date-picker">
                            <label for="checkIn_19" class="h-16 color-medium-gray">Check In</label>
                            <input type="text" class="sel-input date_from" id="checkIn_19" placeholder="Aug 18, 2023" />
                          </div>
                          <div class="vertical-line d-xl-flex d-none"></div>
                          <div class="input-date-picker">
                            <label for="checkOut_20" class="h-16 color-medium-gray">Check Out</label>
                            <input type="text" class="sel-input date_to" id="checkOut_20" placeholder="Aug 20, 2023" />
                          </div>
                        </div>
                        <div class="vertical-line d-xl-flex d-none"></div>
                        <div>
                          <div class="custom-sel-input-block">
                            <div class="h-16 color-medium-gray">
                              Guests and Room
                            </div>
                            <div class="room-booking color-black">
                              <span class="total-guest">2</span>
                              Guests /
                              <span class="guest-class">Room</span>
                            </div>
                            <div class="passenger-area room-box bg-white light-shadow br-5 p-24">
                              <h4 class="color-black mb-32">Room</h4>
                              <div class="passenger-box mb-24">
                                <div class="row">
                                  <div class="col-md-7 col-sm-6">
                                    <div class="content-box">
                                      <h5 class="lightest-black">Adult</h5>
                                      <p class="color-medium-gray light">
                                        Above 12 years.
                                      </p>
                                    </div>
                                  </div>
                                  <div class="col-md-5 col-sm-6">
                                    <div class="quantity quantity-wrap">
                                      <input class="decrement" type="button" value="-" />
                                      <input type="text" name="quantity" value="0" maxlength="2" size="1" id="adult_2"
                                        class="number" />
                                      <input class="increment" type="button" value="+" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="passenger-box mb-24">
                                <div class="row">
                                  <div class="col-md-7 col-sm-6">
                                    <div class="content-box">
                                      <h5 class="lightest-black">Child</h5>
                                      <p class="color-medium-gray light">
                                        2-11 years on travel date.
                                      </p>
                                    </div>
                                  </div>
                                  <div class="col-md-5 col-sm-6">
                                    <div class="quantity quantity-wrap">
                                      <input class="decrement" type="button" value="-" />
                                      <input type="text" name="quantity" value="0" maxlength="2" size="1" id="child_2"
                                        class="number" />
                                      <input class="increment" type="button" value="+" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="passenger-box mb-32">
                                <div class="row">
                                  <div class="col-md-7 col-sm-6">
                                    <div class="content-box">
                                      <h5 class="lightest-black">Infant</h5>
                                      <p class="color-medium-gray light">
                                        Below 2 years.
                                      </p>
                                    </div>
                                  </div>
                                  <div class="col-md-5 col-sm-6">
                                    <div class="quantity quantity-wrap">
                                      <input class="decrement" type="button" value="-" />
                                      <input type="text" name="quantity" value="0" maxlength="2" size="1" id="infant_2"
                                        class="number" />
                                      <input class="increment" type="button" value="+" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="d-flex justify-content-between align-items-center">
                                <a href="#addroom" class="color-primary"><i
                                    class="fal fa-plus color-primary"></i>&nbsp;Add Rooms</a>
                                <a href="#done" class="cus-btn done">Done</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xxl-2 mt-xxl-0 mt-32">
                      <button type="submit" class="cus-btn extra-width">
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <!-- Hotel tab End -->

              <!-- Car Rental tab Start -->
              <div class="tab-pane" id="rental">
                <div class="card">
                  <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
                      <li class="nav-item v-2">
                        <a href="#carRental" class="cus-btn primary-light primary active" aria-current="true"
                          data-bs-toggle="tab">
                          Car Rental
                        </a>
                      </li>
                      <li class="nav-item v-2">
                        <a href="#airPort" class="cus-btn primary-light primary" aria-current="false"
                          data-bs-toggle="tab">
                          Airport Transfer
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body tab-content">
                    <div class="tab-pane active" id="carRental">
                      <form action="car-listing.html" method="post">
                        <div class="row align-items-center mb-32">
                          <div class="col-xl-10 col-lg-10 col-md-12">
                            <div class="booking-info d-block">
                              <div class="row align-items-center">
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                  <div class="custom-sel-input-block location-select">
                                    <label for="pick_Up" class="h-16 color-medium-gray">Pick-up Location</label>
                                    <i class="fal fa-map-marker-alt"></i>
                                    <input type="text" class="sel-input location-input auto-input-location" id="pick_Up"
                                      placeholder="Pick-up Location" />
                                    <div class="slector-wrapper"></div>
                                  </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 d-flex gap-8">
                                  <div class="vertical-line"></div>
                                  <div class="custom-sel-input-block location-select">
                                    <label for="drop_Off" class="h-16 color-medium-gray">Drop-off Location</label>
                                    <i class="fal fa-map-marker-alt"></i>
                                    <input type="text" class="sel-input location-input auto-input-location"
                                      id="drop_Off" placeholder="Drop-off Location" />
                                    <div class="slector-wrapper"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-xl-2 col-lg-2 mt-lg-0 mt-32">
                            <div class="filter-checkbox">
                              <input type="checkbox" id="out" />
                              <label for="out" class="">Return to a different location</label>
                            </div>
                          </div>
                        </div>
                        <div class="row align-items-center mb-32">
                          <div class="col-xl-5 col-lg-6 mb-lg-0 mb-24">
                            <div class="booking-info d-block">
                              <div class="row align-items-center">
                                <div class="col-md-6 col-sm-6 mb-sm-0 mb-16">
                                  <div class="custom-sel-input-block m-0">
                                    <label for="pickUpDate" class="h-16 color-medium-gray">Pick-up Date</label>
                                    <div class="d-flex align-items-center gap-8">
                                      <i class="fal fa-calendar-alt"></i>
                                      <input type="text" class="sel-input date_from" id="pickUpDate"
                                        placeholder="Start Date" />
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-1 col-sm-1 d-sm-block d-none p-0">
                                  <div class="vertical-line"></div>
                                </div>
                                <div class="col-md-5 col-sm-5">
                                  <div class="input-date-picker">
                                    <div class="d-flex align-items-center gap-8">
                                      <i class="fal fa-clock"></i>
                                      <input type="text" class="sel-input location-input timepicker p-0"
                                        id="time_Date" />
                                      >>>>>>> origin/main
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-xl-5 col-lg-6 mb-lg-0 mb-24">
                            <div class="booking-info d-block">
                              <div class="row align-items-center">
                                <div class="col-md-6 col-sm-6 mb-sm-0 mb-16">
                                  <div class="custom-sel-input-block m-0">
                                    <label for="date_return" class="h-16 color-medium-gray">Return Date</label>
                                    <div class="d-flex align-items-center gap-8">
                                      <i class="fal fa-calendar-alt"></i>
                                      <input type="text" class="sel-input date_to" id="date_return"
                                        placeholder="End Date" />
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-1 col-sm-1 d-sm-block d-none p-0">
                                  <div class="vertical-line"></div>
                                </div>
                                <div class="col-md-5 col-sm-5">
                                  <div class="input-date-picker">
                                    <div class="d-flex align-items-center gap-8">
                                      <i class="fal fa-clock"></i>
                                      <input type="text" class="sel-input location-input timepicker p-0"
                                        id="flightTimePick" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-xl-2 mt-xl-0 mt-16">
                            <button type="submit" class="cus-btn extra-width">
                              Search
                            </button>
                          </div>
                        </div>
                        <h5 class="dark-gray mb-16">Driver's age</h5>
                        <div class="custom-control">
                          <div class="radio-button">
                            <input type="radio" name="age" class="custom-control-input" id="age-18" />
                            <label class="custom-control-label" for="age-18">18-29</label>
                          </div>
                          <div class="radio-button">
                            <input type="radio" name="age" class="custom-control-input" id="age-30" />
                            <label class="custom-control-label" for="age-30">30-49</label>
                          </div>
                          <div class="radio-button">
                            <input type="radio" name="age" class="custom-control-input" id="age-50" />
                            <label class="custom-control-label" for="age-50">50-70</label>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div class="tab-pane" id="airPort">
                      <form action="car-listing.html" method="post">
                        <div class="row align-items-center mb-32">
                          <div class="col-xl-12 mb-xl-0 mb-16">
                            <div class="booking-info d-block">
                              <div class="row align-items-center">
                                <div class="col-lg-6">
                                  <div class="custom-sel-input-block location-select">
                                    <label for="flight_locationInput" class="h-16 color-medium-gray">Pick-up
                                      Location</label>
                                    <i class="fal fa-map-marker-alt"></i>
                                    <input type="text" class="sel-input location-input auto-input-location"
                                      id="flight_locationInput" placeholder="Pick-up Location" />
                                    <div class="slector-wrapper"></div>
                                  </div>
                                </div>
                                <div class="col-lg-6 d-flex gap-8">
                                  <div class="vertical-line d-lg-flex- d-none"></div>
                                  <div class="custom-sel-input-block location-select">
                                    <label for="flight_dropOff" class="h-16 color-medium-gray">Drop-off Location</label>
                                    <i class="fal fa-map-marker-alt"></i>
                                    <input type="text" class="sel-input location-input auto-input-location"
                                      id="flight_dropOff" placeholder="Drop-off Location" />
                                    <div class="slector-wrapper"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row align-items-center mb-32">
                          <div class="col-xxl-4 col-xl-6 col-lg-6 mb-xxl-0 mb-24">
                            <div class="booking-info d-block">
                              <div class="row align-items-center">
                                <div class="col-md-6 col-sm-6 mb-sm-0 mb-16">
                                  <div class="custom-sel-input-block m-0">
                                    <label for="flight_ArrivalDate" class="h-16 color-medium-gray">Pick-up Date</label>
                                    <div class="d-flex align-items-center gap-8">
                                      <i class="fal fa-calendar-alt"></i>
                                      <input type="text" class="sel-input date_from" id="flight_ArrivalDate"
                                        placeholder="Pick-up Date" />
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-1 col-sm-1 d-sm-block d-none p-0">
                                  <div class="vertical-line"></div>
                                </div>
                                <div class="col-md-5 col-sm-5">
                                  <div class="input-date-picker">
                                    <div class="d-flex align-items-center gap-8">
                                      <i class="fal fa-clock"></i>
                                      <input type="text" class="sel-input location-input timepicker p-0"
                                        id="time_location" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-xxl-4 col-xl-6 col-lg-6 mb-xxl-0 mb-24">
                            <div class="booking-info d-block">
                              <div class="row align-items-center">
                                <div class="col-md-6 col-sm-6 mb-sm-0 mb-16">
                                  <div class="custom-sel-input-block m-0">
                                    <label for="flight_returnDate" class="h-16 color-medium-gray">Return Date</label>
                                    <div class="d-flex align-items-center gap-8">
                                      <i class="fal fa-calendar-alt"></i>
                                      <input type="text" class="sel-input date_to" id="flight_returnDate"
                                        placeholder="Return Date" />
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-1 col-sm-1 d-sm-block d-none p-0">
                                  <div class="vertical-line"></div>
                                </div>
                                <div class="col-md-5 col-sm-5">
                                  <div class="input-date-picker">
                                    <div class="d-flex align-items-center gap-8">
                                      <i class="fal fa-clock"></i>
                                      <input type="text" class="sel-input location-input timepicker p-0"
                                        id="flight_timeNow" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-xxl-4">
                            <div class="booking-info">
                              <div class="custom-sel-input-block location-select">
                                <label for="passenger_Popup" class="h-16 color-medium-gray mb-1">Passenger</label>
                                <i class="fal fa-user"></i>
                                <input type="text" class="sel-input location-input" id="passenger_Popup"
                                  placeholder="Number of Passenger" />
                              </div>
                            </div>
                          </div>
                          <div class="offset-xl-10 col-xl-2 mt-32">
                            <button type="submit" class="cus-btn extra-width">
                              Search
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Car Rental tab End -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <!-- Booking Area End -->
</template>

<style scoped>
.card-header .active {
  background-color: #365386;
}

.card {
  border: none;
  background: transparent;
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
  background: #5b93d3;
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
