<script lang="ts" setup>
import { ref } from "vue";
import TitleBanner from "@/components/flightWebComponents/titleBanner.vue";
import { getSessionTokenData } from "@/utils/sessionHelper"; //奇哥會員
const memberData = ref(getSessionTokenData("memberToken")); //奇哥會員

//let id ="1";
let id = ref();
const mileage = ref([]);

const loadmileage = async (id) => {
  const res = await fetch(`http://localhost:8889/api/MileageDetail/Get/${id}`); //先設編號id 1
  const data = await res.json();
    if (data.length > 0) {
      console.log(123);
      for (let i = 0; i < data.length; i++) {
        data[i].changeTime = `${data[i].changeTime.substring(0, 10)} `;
        data[i].mileValidity = `${data[i].mileValidity.substring(0, 10)} `;
        console.log(data[i].mileValidity);
        
      }
    }
  
  mileage.value = data;
  console.log(mileage.value);
};

const getMemberId = () => {
  memberData.value = getSessionTokenData("memberToken");
  id.value = memberData.value.MemberId; //在這裡
  console.log(id.value);
  loadmileage(id.value); //呼叫
  //loadmileage(id) //呼叫
};

if (
  memberData.value != null &&
  memberData.value != undefined &&
  memberData.value.MemberId
) {
  getMemberId();
}

const TitleBannerTitle = ref({
  title1: "里程明細",
  title2: "",
});

///////////////////////實作 靠訂位+名字登入///////////////////////
import { watch } from "vue";
import { useMemberStore } from "@/stores/members";
import LoginInMile from "@/components/flightWebComponents/LoginInMile.vue";

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
    //memberId.value = memberStore.memberInfo;
    if (memberStore.memberInfo != null || memberStore.memberInfo != undefined) {
      getMemberId();
      isLogin.value = true;
    }
    if (memberStore.memberInfo == null || memberStore.memberInfo == "") {
      isLogin.value = false;
    }
  }
);

////////////////// 監聽是否登入//////////////////
// import { useMemberStore } from "@/stores/members";
// import { watch } from "vue";
// const memberStore = useMemberStore();
watch(
  () => memberStore.memberInfo,
  (newValue, oldValue) => {
    //memberId.value = memberStore.memberInfo;
    if (
      memberStore.memberInfo != null &&
      memberStore.memberInfo != undefined &&
      memberStore.memberInfo != ""
    ) {
      getMemberId();
    }
  }
);
////////////////////////////////////////////////////////

//////////-----更改時間顯示
const formatDate = (dateTimeString) => {
  // 創建日期對象
  const date = new Date(dateTimeString);
  // 提取日期部分（年月日）
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate;
};
/////////-----更改時間顯示 結束

////////---表格
interface User {
  changeTime: string
  totalMile: string
  originalMile: string
  changeMile: string
  finalMile: string
  mileValidity: string
  mileReason: string

}
const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: User
  rowIndex: number
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}
/////////---------表格 結束
</script>

<style scoped>

/* 表格的警告行和成功行的背景颜色 */
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
/* 表格的警告行和成功行的背景颜色 結束*/

</style>

<template>
  <!-- 這是Title區 -->
  <!-- <TitleBanner :title="TitleBannerTitle"></TitleBanner> -->
  <div class="container md-5" v-show="isLogin">
    <!-- <router-link to="/MemberCenter/mileageapply" class="cus-btn"
      >已折抵里程</router-link > -->

    <!-- <a href="/mileageapply" class="cus-btn">已折抵里程</a> -->
    <div class="row">
      <div class="col-md-12">
        <div class="dashboard-wrapper user-dashboard">
          <div class="table-responsive abc">
            <el-table
    :data="mileage"
    style="width: 100%"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="changeTime" label="更改里程時間" width="145"/> 
    <el-table-column prop="totalMile" label="累積總里程數" width="145" />
    <el-table-column prop="originalMile" label="原始里程數" width="145" />
    <el-table-column prop="changeMile" label="更改里程數" width="145" />
    <el-table-column prop="finalMile" label="最終里程數" width="145" />
    <el-table-column prop="mileValidity" label="里程效期" width="145" />
    <el-table-column prop="mileReason" label="更改里程原因" width="145"/>
  </el-table>

            <!-- <table class="table"> -->
              <!-- <thead style="font-weight: bold">
                <tr>
                  <th style="border-bottom: 1px solid black">
                    <h4>累積總里程數</h4>
                  </th>
                  <th style="border-bottom: 1px solid black">
                    <h4>原始里程數</h4>
                  </th>
                  <th style="border-bottom: 1px solid black">
                    <h4>更改里程數</h4>
                  </th>
                  <th style="border-bottom: 1px solid black">
                    <h4>最終里程數</h4>
                  </th>
                  <th style="border-bottom: 1px solid black">
                    <h4>更改里程時間</h4>
                  </th>
                  <th style="border-bottom: 1px solid black">
                    <h4>里程效期</h4>
                  </th>
                  <th style="border-bottom: 1px solid black">
                    <h4>更改里程原因</h4>
                  </th>
                </tr>
              </thead> -->
              <!-- <tbody v-for="mile in mileage">
                <tr>
                  <td>
                    <h4>{{ mile.totalMile }}</h4>
                  </td>
                  <td>
                    <h4>{{ mile.originalMile }}</h4>
                  </td>
                  <td>
                    <h4>{{ mile.changeMile }}</h4>
                  </td>
                  <td>
                    <h4>{{ mile.finalMile }}</h4>
                  </td>
                  <td>
                    <h4>{{ formatDate(mile.changeTime) }}</h4>
                  </td>
                  <td>
                    <h4>{{ formatDate(mile.mileValidity) }}</h4>
                  </td>
                  <td>
                    <h4>{{ mile.mileReason }}</h4>
                  </td>
                </tr>
              </tbody> -->
            <!-- </table> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Main Content End -->

  <!-- <LoginInMile v-show="!isLogin"></LoginInMile> -->
</template>

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
table {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}
</style>
