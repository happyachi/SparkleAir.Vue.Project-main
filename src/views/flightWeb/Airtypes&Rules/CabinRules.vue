<template>
    <div>
        <h2>票價產品介紹</h2>
    </div>
    <div class="container">
        <div class="header">
            <h6>頭等艙</h6>
        </div>
        <div class="rules">
            <div class="column">
                <h5 style="font-weight: bold">超值</h5>
                <br />
                <div v-for="rule in cabinrule" :key="rule.id">
                    <div v-if="rule.cabinCode === 'D'">
                        <p>
                            訂位艙等<br />
                            <span style="color: brown; font-weight: bold">{{
                                rule.cabinCode
                            }}</span>
                        </p>
                        <p>
                            可託運行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentCount }}</span
                            >
                        </p>
                        <p>
                            託運行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentWeight }}kg</span
                            >
                        </p>
                        <p>
                            隨身行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagCount }}</span
                            >
                        </p>
                        <p>
                            隨身行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagWeight }}kg</span
                            >
                        </p>
                        <p>
                            免費Wi-Fi<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.freeWifi }}</span
                            >
                        </p>
                        <p>
                            預選座位<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.preSelectedSeat }}</span
                            >
                        </p>
                        <p>
                            里程累積<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.accumulatedMile }}%</span
                            >
                        </p>
                        <p>
                            里程升等<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.mileUpgrade }}</span
                            >
                        </p>
                        <p>
                            機票效期（年）<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.ticketVaildity }}</span
                            >
                        </p>
                        <p>
                            NoShow費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.noShowFee }}</span
                            >
                        </p>
                        <p>
                            退票費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.refundFee }}</span
                            >
                        </p>
                    </div>
                </div>
            </div>

            <div class="column">
                <h5 style="font-weight: bold">基本</h5>
                <br />
                <div v-for="rule in cabinrule" :key="rule.id">
                    <div v-if="rule.cabinCode === 'J'">
                        <p>
                            訂位艙等<br />
                            <span style="color: brown; font-weight: bold">{{
                                rule.cabinCode
                            }}</span>
                        </p>
                        <p>
                            可託運行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentCount }}</span
                            >
                        </p>
                        <p>
                            託運行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentWeight }}kg</span
                            >
                        </p>
                        <p>
                            隨身行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagCount }}</span
                            >
                        </p>
                        <p>
                            隨身行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagWeight }}kg</span
                            >
                        </p>
                        <p>
                            免費Wi-Fi<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.freeWifi }}</span
                            >
                        </p>
                        <p>
                            預選座位<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.preSelectedSeat }}</span
                            >
                        </p>
                        <p>
                            里程累積<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.accumulatedMile }}%</span
                            >
                        </p>
                        <p>
                            里程升等<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.mileUpgrade }}</span
                            >
                        </p>
                        <p>
                            機票效期（年）<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.ticketVaildity }}</span
                            >
                        </p>
                        <p>
                            NoShow費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.noShowFee }}</span
                            >
                        </p>
                        <p>
                            退票費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.refundFee }}</span
                            >
                        </p>
                    </div>
                </div>
            </div>
            <div class="column">
                <h5 style="font-weight: bold">全額</h5>
                <br />
                <div v-for="rule in cabinrule" :key="rule.id">
                    <div v-if="rule.cabinCode === 'C'">
                        <p>
                            訂位艙等<br />
                            <span style="color: brown; font-weight: bold">{{
                                rule.cabinCode
                            }}</span>
                        </p>
                        <p>
                            可託運行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentCount }}</span
                            >
                        </p>
                        <p>
                            託運行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentWeight }}kg</span
                            >
                        </p>
                        <p>
                            隨身行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagCount }}</span
                            >
                        </p>
                        <p>
                            隨身行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagWeight }}kg</span
                            >
                        </p>
                        <p>
                            免費Wi-Fi<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.freeWifi }}</span
                            >
                        </p>
                        <p>
                            預選座位<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.preSelectedSeat }}</span
                            >
                        </p>
                        <p>
                            里程累積<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.accumulatedMile }}%</span
                            >
                        </p>
                        <p>
                            里程升等<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.mileUpgrade }}</span
                            >
                        </p>
                        <p>
                            機票效期（年）<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.ticketVaildity }}</span
                            >
                        </p>
                        <p>
                            NoShow費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.noShowFee }}</span
                            >
                        </p>
                        <p>
                            退票費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.refundFee }}</span
                            >
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="header">
            <h6>商務艙</h6>
        </div>
        <div class="rules">
            <div class="column">
                <h5 style="font-weight: bold">超值</h5>
                <br />
                <div v-for="rule in cabinrule" :key="rule.id">
                    <div v-if="rule.cabinCode === 'K'">
                        <p>
                            訂位艙等<br />
                            <span style="color: brown; font-weight: bold">{{
                                rule.cabinCode
                            }}</span>
                        </p>
                        <p>
                            可託運行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentCount }}</span
                            >
                        </p>
                        <p>
                            託運行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentWeight }}kg</span
                            >
                        </p>
                        <p>
                            隨身行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagCount }}</span
                            >
                        </p>
                        <p>
                            隨身行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagWeight }}kg</span
                            >
                        </p>
                        <p>
                            免費Wi-Fi<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.freeWifi }}</span
                            >
                        </p>
                        <p>
                            預選座位<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.preSelectedSeat }}</span
                            >
                        </p>
                        <p>
                            里程累積<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.accumulatedMile }}%</span
                            >
                        </p>
                        <p>
                            里程升等<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.mileUpgrade }}</span
                            >
                        </p>
                        <p>
                            機票效期（年）<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.ticketVaildity }}</span
                            >
                        </p>
                        <p>
                            NoShow費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.noShowFee }}</span
                            >
                        </p>
                        <p>
                            退票費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.refundFee }}</span
                            >
                        </p>
                    </div>
                </div>
            </div>

            <div class="column">
                <h5 style="font-weight: bold">基本</h5>
                <br />
                <div v-for="rule in cabinrule" :key="rule.id">
                    <div v-if="rule.cabinCode === 'T'">
                        <p>
                            訂位艙等<br />
                            <span style="color: brown; font-weight: bold">{{
                                rule.cabinCode
                            }}</span>
                        </p>
                        <p>
                            可託運行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentCount }}</span
                            >
                        </p>
                        <p>
                            託運行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentWeight }}kg</span
                            >
                        </p>
                        <p>
                            隨身行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagCount }}</span
                            >
                        </p>
                        <p>
                            隨身行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagWeight }}kg</span
                            >
                        </p>
                        <p>
                            免費Wi-Fi<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.freeWifi }}</span
                            >
                        </p>
                        <p>
                            預選座位<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.preSelectedSeat }}</span
                            >
                        </p>
                        <p>
                            里程累積<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.accumulatedMile }}%</span
                            >
                        </p>
                        <p>
                            里程升等<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.mileUpgrade }}</span
                            >
                        </p>
                        <p>
                            機票效期（年）<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.ticketVaildity }}</span
                            >
                        </p>
                        <p>
                            NoShow費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.noShowFee }}</span
                            >
                        </p>
                        <p>
                            退票費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.refundFee }}</span
                            >
                        </p>
                    </div>
                </div>
            </div>
            <div class="column">
                <h5 style="font-weight: bold">全額</h5>
                <br />
                <div v-for="rule in cabinrule" :key="rule.id">
                    <div v-if="rule.cabinCode === 'L'">
                        <p>
                            訂位艙等<br />
                            <span style="color: brown; font-weight: bold">{{
                                rule.cabinCode
                            }}</span>
                        </p>
                        <p>
                            可託運行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentCount }}</span
                            >
                        </p>
                        <p>
                            託運行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentWeight }}kg</span
                            >
                        </p>
                        <p>
                            隨身行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagCount }}</span
                            >
                        </p>
                        <p>
                            隨身行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagWeight }}kg</span
                            >
                        </p>
                        <p>
                            免費Wi-Fi<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.freeWifi }}</span
                            >
                        </p>
                        <p>
                            預選座位<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.preSelectedSeat }}</span
                            >
                        </p>
                        <p>
                            里程累積<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.accumulatedMile }}%</span
                            >
                        </p>
                        <p>
                            里程升等<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.mileUpgrade }}</span
                            >
                        </p>
                        <p>
                            機票效期（年）<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.ticketVaildity }}</span
                            >
                        </p>
                        <p>
                            NoShow費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.noShowFee }}</span
                            >
                        </p>
                        <p>
                            退票費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.refundFee }}</span
                            >
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="header">
            <h6>豪華經濟艙</h6>
        </div>
        <div class="rules">
            <div class="column">
                <h5 style="font-weight: bold">超值</h5>
                <br />
                <div v-for="rule in cabinrule" :key="rule.id">
                    <div v-if="rule.cabinCode === 'B'">
                        <p>
                            訂位艙等<br />
                            <span style="color: brown; font-weight: bold">{{
                                rule.cabinCode
                            }}</span>
                        </p>
                        <p>
                            可託運行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentCount }}</span
                            >
                        </p>
                        <p>
                            託運行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentWeight }}kg</span
                            >
                        </p>
                        <p>
                            隨身行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagCount }}</span
                            >
                        </p>
                        <p>
                            隨身行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagWeight }}kg</span
                            >
                        </p>
                        <p>
                            免費Wi-Fi<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.freeWifi }}</span
                            >
                        </p>
                        <p>
                            預選座位<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.preSelectedSeat }}</span
                            >
                        </p>
                        <p>
                            里程累積<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.accumulatedMile }}%</span
                            >
                        </p>
                        <p>
                            里程升等<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.mileUpgrade }}</span
                            >
                        </p>
                        <p>
                            機票效期（年）<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.ticketVaildity }}</span
                            >
                        </p>
                        <p>
                            NoShow費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.noShowFee }}</span
                            >
                        </p>
                        <p>
                            退票費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.refundFee }}</span
                            >
                        </p>
                    </div>
                </div>
            </div>

            <div class="column">
                <h5 style="font-weight: bold">基本</h5>
                <br />
                <div v-for="rule in cabinrule" :key="rule.id">
                    <div v-if="rule.cabinCode === 'Y'">
                        <p>
                            訂位艙等<br />
                            <span style="color: brown; font-weight: bold">{{
                                rule.cabinCode
                            }}</span>
                        </p>
                        <p>
                            可託運行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentCount }}</span
                            >
                        </p>
                        <p>
                            託運行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentWeight }}kg</span
                            >
                        </p>
                        <p>
                            隨身行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagCount }}</span
                            >
                        </p>
                        <p>
                            隨身行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagWeight }}kg</span
                            >
                        </p>
                        <p>
                            免費Wi-Fi<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.freeWifi }}</span
                            >
                        </p>
                        <p>
                            預選座位<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.preSelectedSeat }}</span
                            >
                        </p>
                        <p>
                            里程累積<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.accumulatedMile }}%</span
                            >
                        </p>
                        <p>
                            里程升等<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.mileUpgrade }}</span
                            >
                        </p>
                        <p>
                            機票效期（年）<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.ticketVaildity }}</span
                            >
                        </p>
                        <p>
                            NoShow費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.noShowFee }}</span
                            >
                        </p>
                        <p>
                            退票費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.refundFee }}</span
                            >
                        </p>
                    </div>
                </div>
            </div>
            <div class="column">
                <h5 style="font-weight: bold">全額</h5>
                <br />
                <div v-for="rule in cabinrule" :key="rule.id">
                    <div v-if="rule.cabinCode === 'V'">
                        <p>
                            訂位艙等<br />
                            <span style="color: brown; font-weight: bold">{{
                                rule.cabinCode
                            }}</span>
                        </p>
                        <p>
                            可託運行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentCount }}</span
                            >
                        </p>
                        <p>
                            託運行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentWeight }}kg</span
                            >
                        </p>
                        <p>
                            隨身行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagCount }}</span
                            >
                        </p>
                        <p>
                            隨身行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagWeight }}kg</span
                            >
                        </p>
                        <p>
                            免費Wi-Fi<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.freeWifi }}</span
                            >
                        </p>
                        <p>
                            預選座位<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.preSelectedSeat }}</span
                            >
                        </p>
                        <p>
                            里程累積<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.accumulatedMile }}%</span
                            >
                        </p>
                        <p>
                            里程升等<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.mileUpgrade }}</span
                            >
                        </p>
                        <p>
                            機票效期（年）<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.ticketVaildity }}</span
                            >
                        </p>
                        <p>
                            NoShow費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.noShowFee }}</span
                            >
                        </p>
                        <p>
                            退票費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.refundFee }}</span
                            >
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="header">
            <h6>經濟艙</h6>
        </div>
        <div class="rules">
            <div class="column">
                <h5 style="font-weight: bold">超值</h5>
                <br />
                <div v-for="rule in cabinrule" :key="rule.id">
                    <div v-if="rule.cabinCode === 'W'">
                        <p>
                            訂位艙等<br />
                            <span style="color: brown; font-weight: bold">{{
                                rule.cabinCode
                            }}</span>
                        </p>
                        <p>
                            可託運行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentCount }}</span
                            >
                        </p>
                        <p>
                            託運行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentWeight }}kg</span
                            >
                        </p>
                        <p>
                            隨身行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagCount }}</span
                            >
                        </p>
                        <p>
                            隨身行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagWeight }}kg</span
                            >
                        </p>
                        <p>
                            免費Wi-Fi<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.freeWifi }}</span
                            >
                        </p>
                        <p>
                            預選座位<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.preSelectedSeat }}</span
                            >
                        </p>
                        <p>
                            里程累積<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.accumulatedMile }}%</span
                            >
                        </p>
                        <p>
                            里程升等<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.mileUpgrade }}</span
                            >
                        </p>
                        <p>
                            機票效期（年）<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.ticketVaildity }}</span
                            >
                        </p>
                        <p>
                            NoShow費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.noShowFee }}</span
                            >
                        </p>
                        <p>
                            退票費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.refundFee }}</span
                            >
                        </p>
                    </div>
                </div>
            </div>

            <div class="column">
                <h5 style="font-weight: bold">基本</h5>
                <br />
                <div v-for="rule in cabinrule" :key="rule.id">
                    <div v-if="rule.cabinCode === 'S'">
                        <p>
                            訂位艙等<br />
                            <span style="color: brown; font-weight: bold">{{
                                rule.cabinCode
                            }}</span>
                        </p>
                        <p>
                            可託運行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentCount }}</span
                            >
                        </p>
                        <p>
                            託運行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentWeight }}kg</span
                            >
                        </p>
                        <p>
                            隨身行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagCount }}</span
                            >
                        </p>
                        <p>
                            隨身行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagWeight }}kg</span
                            >
                        </p>
                        <p>
                            免費Wi-Fi<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.freeWifi }}</span
                            >
                        </p>
                        <p>
                            預選座位<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.preSelectedSeat }}</span
                            >
                        </p>
                        <p>
                            里程累積<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.accumulatedMile }}%</span
                            >
                        </p>
                        <p>
                            里程升等<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.mileUpgrade }}</span
                            >
                        </p>
                        <p>
                            機票效期（年）<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.ticketVaildity }}</span
                            >
                        </p>
                        <p>
                            NoShow費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.noShowFee }}</span
                            >
                        </p>
                        <p>
                            退票費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.refundFee }}</span
                            >
                        </p>
                    </div>
                </div>
            </div>
            <div class="column">
                <h5 style="font-weight: bold">全額</h5>
                <br />
                <div v-for="rule in cabinrule" :key="rule.id">
                    <div v-if="rule.cabinCode === 'A'">
                        <p>
                            訂位艙等<br />
                            <span style="color: brown; font-weight: bold">{{
                                rule.cabinCode
                            }}</span>
                        </p>
                        <p>
                            可託運行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentCount }}</span
                            >
                        </p>
                        <p>
                            託運行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.shipmentWeight }}kg</span
                            >
                        </p>
                        <p>
                            隨身行李件數<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagCount }}</span
                            >
                        </p>
                        <p>
                            隨身行李重量限制(每件)<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.carryBagWeight }}kg</span
                            >
                        </p>
                        <p>
                            免費Wi-Fi<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.freeWifi }}</span
                            >
                        </p>
                        <p>
                            預選座位<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.preSelectedSeat }}</span
                            >
                        </p>
                        <p>
                            里程累積<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.accumulatedMile }}%</span
                            >
                        </p>
                        <p>
                            里程升等<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.mileUpgrade }}</span
                            >
                        </p>
                        <p>
                            機票效期（年）<br /><span
                                style="color: brown; font-weight: bold"
                                >{{ rule.ticketVaildity }}</span
                            >
                        </p>
                        <p>
                            NoShow費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.noShowFee }}</span
                            >
                        </p>
                        <p>
                            退票費用<br /><span
                                style="color: brown; font-weight: bold"
                                >TWD {{ rule.refundFee }}</span
                            >
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const cabinrule = ref([]);

const loadCabinRule = async () => {
    const response = await fetch('http://localhost:8889/api/CabinRules/GetAll');
    const data = await response.json();
    //console.log(data);
    data.forEach((rule) => {
        let mileage = parseFloat(rule.accumulatedMile);

        rule.accumulatedMile = Math.round(mileage * 100);
    });

    // 將true改成'有'
    data.forEach((rule) => {
        if (rule.freeWifi === true) {
            rule.freeWifi = '有';
        } else {
            rule.freeWifi = '沒有';
        }
    });
    data.forEach((rule) => {
        if (rule.preSelectedSeat === true) {
            rule.preSelectedSeat = '有';
        } else {
            rule.preSelectedSeat = '沒有';
        }
    });
    data.forEach((rule) => {
        if (rule.mileUpgrade === true) {
            rule.mileUpgrade = '有';
        } else {
            rule.mileUpgrade = '沒有';
        }
    });

    cabinrule.value = data;
    console.log(cabinrule.value);
};

loadCabinRule();
</script>

<style scoped>
h6 {
    color: #ffffff;
}
.header {
    background-color: #b77042;
    /* 底色米黃 */
    border-radius: 10px 10px 0 0;
    /* 圓角 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    /* 輕微陰影 */
    padding: 20px;
    color: #ffffff;
    /* 白色文本 */
}

.container {
    margin-bottom: 50px;
}

.column {
    padding: 2px;
    /* 添加一些内边距，使内容与边框之间有一些空间 */
}

.column:not(:last-child) {
    border-right: 1px solid #ccc;
}

.rules {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* 三个等宽的列 */
    gap: 10px;
    /* 列之间的间距 */
    background-color: #faf4e2;
    /* 底色米黃 */
    border-radius: 0 0 10px 10px;
    /* 圓角 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    /* 輕微陰影 */
    padding: 20px;
    color: black;
}

h2 {
    margin-left: 50px !important;
    margin-bottom: 60px !important;
}
</style>
