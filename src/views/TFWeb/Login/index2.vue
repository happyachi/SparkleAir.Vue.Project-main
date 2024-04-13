<script setup>
import { ref, watch } from "vue";
import loginComponents from "@/components/tfWebComponents/loginComponents.vue";
import ChooseTicketComponent from "@/components/tfWebComponents/chooseTicketComponent.vue";
import { getSessionTokenData } from "@/utils/sessionHelper";
import { useTfLoginStore } from "@/stores/tfLoginStore";
const tfLoginStore = useTfLoginStore();

//////////////////////////element puls //////////////////////////
const airFlightDialog = ref(false);
const ticketDetailDialog = ref(false);

//////////////////////////這是監聽會員登入//////////////////////////
// 事後改變的
const loginData = ref();
watch(
  () => tfLoginStore.TfLoginInfo,
  (newValue, oldValue) => {
    if (
      tfLoginStore.TfLoginInfo != null ||
      tfLoginStore.TfLoginInfo != undefined
    ) {
      loginData.value = getSessionTokenData("TFLoginToken");
      // 登入後每秒確認一次ticket Token是否過期，過期的話就自動登出
      if (loginData.value != null) {
        if (loginData.value.MemberId) {
          outerVisible.value = true;
          airFlightDialog.value = true;
          console.log(true);
        } else {
          console.log(false);
        }
      }
    }
  }
);

//////////////////////////選擇航班區//////////////////////////
import { GetAirFlightListByMemberId } from "@/apis/TicketApi.js";

const airFlightList = ref();
airFlightList.value = await GetAirFlightListByMemberId(1);
console.log(airFlightList.value);
</script>

<template>
  <loginComponents></loginComponents>
  <el-dialog v-model="airFlightDialog" title="Outer Dialog" width="800">
    <span>This is the outer Dialog</span>

    <el-dialog
      v-model="ticketDetailDialog"
      width="500"
      title="Inner Dialog"
      append-to-body
    >
      <span>This is the inner Dialog</span>
    </el-dialog>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="outerVisible = false">Cancel</el-button>
        <el-button type="primary" @click="innerVisible = true">
          Open the inner Dialog
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
