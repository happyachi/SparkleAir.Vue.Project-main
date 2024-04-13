<script setup>
import { getSessionTokenData } from "@/utils/sessionHelper"; //奇哥會員
import useSessionMixin from "@/mixins/sessionMixin.js";
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
const memberData = ref(getSessionTokenData("memberToken")); //奇哥會員
const memberid = ref();
memberid.value = memberData.value.MemberId;
const flightMixin = useSessionMixin();
const values = flightMixin.flightData.value.values;
const flights = flightMixin.flightData.value.flights;
const passenger = flightMixin.flightData.value.passenger[0];
const route = useRoute();
const paymentId = route.params.id;
const data = ref();
const bookRef = ref();
const qrCodeUrl = ref();
const flightRef1 = ref();
const flightRef2 = ref();
const loadingDone = ref(false);
const uploadQRcode = async (QRcodeUrl) => {
  //   const res = await fetch(
  //     `http://localhost:8889/api/Methods/uploadFileToGoogleDriveFromBase64?base64=${encodeURIComponent(
  //       QRcodeUrl
  //     )}`,
  //     {
  //       method: "post",
  //         headers: { "Content-Type": "text/plain" },
  //       body: "",
  //     }
  //   );
  const res = await fetch(
    `http://localhost:8889/api/Methods/uploadFileToGoogleDriveFromBase64`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base64: QRcodeUrl,
      }),
    }
  ).catch((e) => console.log(e));
  const data = await res.text();
  qrCodeUrl.value = data;
};
const generateFlight1QRCodeValue = () => {
  const obj = {
    bookRef: flights[0].ticketRef,
    englishFirstName: passenger.firstName,
    englishLastName: passenger.lastName,
  };
  var encoded = btoa(JSON.stringify(obj));
  return `BookingManagement/${encoded}`;
};
const generateFlight2QRCodeValue = () => {
  const obj = {
    bookRef: flights[1].ticketRef,
    englishFirstName: passenger.firstName,
    englishLastName: passenger.lastName,
  };
  var encoded = btoa(JSON.stringify(obj));
  return `BookingManagement/${encoded}`;
};
const dowloadflight1QrCode = async () => {
  const url = await flightRef1.value.toDataURL();
  const splitUrl = url.split("data:image/png;base64,")[1];
  await uploadQRcode(splitUrl);
};
const dowloadflight2QrCode = async () => {
  const url = await flightRef2.value.toDataURL();
  const splitUrl = url.split("data:image/png;base64,")[1];
  await uploadQRcode(splitUrl);
};
const createQRCode = async () => {
  for (let i = 0; i < flights.length; i++) {
    const flight = flights[i];
    if (i === 0) {
      await dowloadflight1QrCode(flight);
    } else if (i === 1) {
      await dowloadflight2QrCode(flight);
    }
    flight.QRCodeUrl = qrCodeUrl.value;
    if (i < flights.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  } //延遲3秒回到首頁
  setTimeout(() => {
    document.location.href = "/Email";
  }, 1000);
};
const createTickets = async () => {
  try {
    const promises = flights.map(async (flight) => {
      const today = new Date().toISOString();
      const mile = flight.fareProduct.mileageAccumulate.amount;
      const flightInfo = {
        memberId: parseInt(memberid.value),
        airFlightId: flight.id,
        orderNum: "",
        totalPayableAmount: values.totalPrice,
        actualPaidAmount: values.finalPrice,
        orderTime: today,
        transferPaymentId: parseInt(paymentId),
        isEstablished: true,
        mileRedemption: 0,
        totalGeneratedMile: mile,
        isInvoiced: true,
        airCabinRuleId: flight.cabinCode,
        typeofPassengerId: 4,
        ticketAmount: flight.price,
        accruedMile: mile,
        bookRef: flight.flightCode,
        airFlightSeatId: flight.seatNum,
        lastName: passenger.lastName,
        firstName: passenger.firstName,
        countryId: 1,
        dateofBirth: passenger.dateOfBirth,
        gender: passenger.gender,
        passportNum: passenger.passportNum,
        passportExpirationDate: passenger.passportExpirationDate,
        remark: `Price: ${values.finalPrice}`,
        ticketNum: flight.flightModel,
        airMealId: 4,
        checkInStatus: false,
        CheckInTime: today,
        totalMile: 0,
        originalMile: 0,
        changeMile: mile,
        finalMile: 0,
        mileValidity: today,
        mileReason: `購買機票: ${flight.departure.airport} - ${flight.arrival.airport}`,
        mileDetailOrderNumber: "",
        mileChangeTime: today,
      };
      data.value = {
        MemberId: flightInfo.memberId,
        AirFlightId: flightInfo.airFlightId,
        OrderNum: flightInfo.orderNum,
        TotalPayableAmount: flightInfo.totalPayableAmount,
        ActualPaidAmount: flightInfo.actualPaidAmount,
        OrderTime: flightInfo.orderTime,
        TransferPaymentId: flightInfo.transferPaymentId,
        IsEstablished: flightInfo.isEstablished,
        MileRedemption: flightInfo.mileRedemption,
        TotalGeneratedMile: flightInfo.totalGeneratedMile,
        IsInvoiced: flightInfo.isInvoiced,
        AirCabinRuleId: flightInfo.airCabinRuleId,
        TypeofPassengerId: flightInfo.typeofPassengerId,
        TicketAmount: flightInfo.ticketAmount,
        AccruedMile: flightInfo.accruedMile,
        BookRef: flightInfo.bookRef,
        AirFlightSeatId: flightInfo.airFlightSeatId,
        LastName: flightInfo.lastName,
        FirstName: flightInfo.firstName,
        CountryId: flightInfo.countryId,
        DateofBirth: flightInfo.dateofBirth,
        Gender: flightInfo.gender,
        PassportNum: flightInfo.passportNum,
        PassportExpirationDate: flightInfo.passportExpirationDate,
        Remark: flightInfo.remark,
        TicketNum: flightInfo.ticketNum,
        AirMealId: flightInfo.airMealId,
        CheckInStatus: flightInfo.checkInStatus,
        CheckInTime: flightInfo.CheckInTime,
        TotalMile: flightInfo.totalMile,
        OriginalMile: flightInfo.originalMile,
        ChangeMile: flightInfo.changeMile,
        FinalMile: flightInfo.finalMile,
        MileValidity: flightInfo.mileValidity,
        MileReason: flightInfo.mileReason,
        MileDetailOrderNumber: flightInfo.mileDetailOrderNumber,
        MileChangeTime: flightInfo.mileChangeTime,
      };
      await createTicket(data.value);
      flight.ticketRef = bookRef.value;
      console.log(flight.ticketRef);
    });
    await Promise.all(promises);
  } catch (error) {
    console.error("Error creating tickets:", error);
  }
};
const createTicket = async (flight) => {
  try {
    const response = await fetch(
      "http://localhost:8889/api/Tickets/CreateTicket",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flight),
      }
    );
    if (response.ok) {
      bookRef.value = await response.text();
    }
  } catch (error) {
    console.error("Error creating ticket:", error);
  }
};
const createTicketAndQRCode = async () => {
  await createTickets();
  await createQRCode();
};
createTicketAndQRCode();
</script>
<template>
  <div class="center-container">
    <el-row class="center-row">
      <el-col :sm="24" :lg="24">
        <el-result icon="success" title="付款成功!" sub-title="頁面跳轉中.....">
          <template #extra> </template>
        </el-result>
      </el-col>
    </el-row>
  </div>
  <div style="display: none">
    <a-qrcode ref="flightRef1" :value="generateFlight1QRCodeValue()" />
  </div>
  <div style="display: none">
    <a-qrcode ref="flightRef2" :value="generateFlight2QRCodeValue()" />
  </div>
</template>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  /* 水平置中 */
  align-items: center;
  /* 垂直置中 */
  height: 100vh;
  /* 使容器撐滿整個畫面 */
  max-width: 100%;
  /* 最大寬度100% */
  max-height: 100%;
  /* 最大高度100% */
}

.center-row {
  width: 100%;
  /* 確保內容可以適應父元素的寬度 */
}

.icon-success {
  font-size: 500px !important;
  /* 设置图标的字体大小 */
}

.el-result__title {
  font-size: 50px;
}
</style>
