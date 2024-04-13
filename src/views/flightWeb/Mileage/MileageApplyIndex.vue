<template>
  <!-- 這是Title區 -->
  <!-- <TitleBanner :title="TitleBannerTitle"></TitleBanner> -->

  <!-- <div class="container md-5" v-if="isLogin"> -->
  <div class="container md-5">
    <!-- <a href="/mileageindex" class="cus-btn">返回里程明細</a> -->
    <!-- <router-link to="/MemberCenter/mileageindex" class="cus-btn"
      >返回里程明細</router-link
    > -->
    <div class="row">
      <!-- <a href="/totalTravel" class="cus-btn">已折抵里程</a> -->
      <div class="col-md-12">
        <div class="dashboard-wrapper user-dashboard">
          <div class="table-responsive abc">
            <table class="table">
              <thead style="font-weight: bold">
                <tr>
                  <th style="border-bottom: 1px solid black">
                    <h4>折抵項目ID</h4>
                  </th>
                  <th style="border-bottom: 1px solid black">
                    <h4>已折抵里程數</h4>
                  </th>
                  <th style="border-bottom: 1px solid black">
                    <h4>折抵原因</h4>
                  </th>
                  <!-- <th style="border-bottom: 1px solid black;"><h4>更動里程</h4></th> -->
                </tr>
              </thead>
              <tbody v-for="mile in discountmile">
                <tr>
                  <td>
                    <h4>{{ mile.choseId }}</h4>
                  </td>
                  <td>
                    <h4>{{ mile.change }}</h4>
                  </td>
                  <td>
                    <h4>{{ mile.mileReason }}</h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Main Content End -->
  <!-- <LoginInOrder v-else></LoginInOrder> -->
</template>

<script setup>
import { ref } from "vue";
import TitleBanner from "@/components/flightWebComponents/titleBanner.vue";
import { getSessionTokenData } from "@/utils/sessionHelper";

const memberData = ref(getSessionTokenData("memberToken"));

//let id ="1";
let id = ref();
id.value = memberData.value.MemberId; //在這裡!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
console.log(id);
console.log(id.value);
const discountmile = ref([]);
const loadmileagediscount = async (id) => {
  const res = await fetch(
    `http://localhost:8889/api/MileageDetail/Getapplydetail/${id}`
  ); //先設編號id 1
  const data = await res.json();
  discountmile.value = data;
  console.log(discountmile.value);
};

loadmileagediscount(id.value); //呼叫
//loadmileage(id) //呼叫

const TitleBannerTitle = ref({
  title1: "里程明細",
  title2: "",
});

///////////////////////實作 靠訂位+名字登入///////////////////////
import { watch } from "vue";
import { useMemberStore } from "@/stores/members";
import LoginInOrder from "@/components/flightWebComponents/LoginInOrder.vue";

const memberStore = useMemberStore();
const memberId = ref();
const isLogin = ref(false);

console.log(memberId.value);

const membersTokenData = ref(getSessionTokenData("memberToken"));
if (
  membersTokenData.value != null &&
  membersTokenData.value.MemberId != null &&
  membersTokenData.value.MemberId != undefined
) {
  isLogin.value = true;
}
console.log(membersTokenData.value);

// 監聽是否登入
watch(
  () => memberStore.memberInfo,
  (newValue, oldValue) => {
    console.log(memberStore.memberInfo);
    memberId.value = memberStore.memberInfo;
    if (memberId.value != null || memberId.value != undefined) {
      isLogin.value = true;
    }
    if (memberId.value == null || memberId.value == "") {
      isLogin.value = false;
    }
  }
);
</script>
<style scoped>
/* table{
  border: 1px solid black;
  border-radius: 50px;
  text-align:center;
} */

th {
  text-align: center;
}

td {
  /* border-right: 1px solid black; */
  text-align: center;
}
.b {
  font-weight: bold;
}

/* table {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
} */
</style>
