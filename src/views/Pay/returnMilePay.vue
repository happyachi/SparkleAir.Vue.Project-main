<template>
  <div class="center-container">
    <el-row class="center-row">
      <el-col :sm="24" :lg="24">
        <el-result icon="success" title="付款成功!" sub-title="頁面跳轉中.....">
          <template #extra>
            <!-- <el-button type="primary"></el-button> -->
          </template>
        </el-result>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router"; //彩珊金流
import { getSessionTokenData } from "@/utils/sessionHelper"; //奇哥會員

const route = useRoute(); //彩珊金流
const paymentId = route.params.id; //彩珊金流
console.log(paymentId); //顯示金流付款id
const MileageOrderSession = ref();
const memberData = ref(getSessionTokenData("memberToken")); //奇哥會員
console.log(memberData.value);
let memberId = ref();
memberId.value = memberData.value.MemberId;

//--------------- 抓 購買里程的session
console.log(sessionStorage.getItem("MileagePurchase")); //抓session中的 MileagePurchase
MileageOrderSession.value = sessionStorage.getItem("MileagePurchase");
const parsedValue = JSON.parse(MileageOrderSession.value); //轉成json
console.log(parsedValue.price); //顯示轉json的session的值
console.log(parsedValue.amount); //顯示轉json的session的值

/////////////////--購買里程的session 結束

//呼叫mileagecreate
const mileageorder = ref(); //接收里程購買表傳回, 是否購買成功

const loadmileagecreate = async (data) => {
  console.log(data); //顯示購買里程訂單表是否產生
  const response = await fetch(
    "http://localhost:8889/api/MileageOrder/Create",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      //別忘了把主體参數轉成字串，否則資料會變成[object Object]，它無法被成功儲存在後台
      body: JSON.stringify(data),
    }
  );
  const miledata = await response.json();
  //mileageorder.value = miledata

  console.log(miledata); //顯示購買里程訂單表是否產生
};

const mileagebody = {
  Amount: parsedValue.amount,
  Price: parsedValue.price,
  TransferPaymentId: paymentId,
  memberId: memberId.value, //取得目前會員
};

loadmileagecreate(mileagebody); //執行

setTimeout(() => {
  document.location.href = "/MemberCenter/mileageindex"; //轉跳會員中心
}, 4000);

//document.location.href = "/"; //轉跳回首頁
</script>

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
