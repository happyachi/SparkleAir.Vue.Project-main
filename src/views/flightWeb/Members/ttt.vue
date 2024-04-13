<!-- <script setup>
import tt2 from "./tt2.vue";
import { useCounterStore } from "@/stores/counter";
import ticketLogin from "@/components/flightWebComponents/Tickets/ticketLogin.vue";

// 實作 靠訂位+名字登入
import { ref, onUpdated, watch } from "vue";
import { useTicketsStore } from "@/stores/ticketsStore";
import { getSessionTokenData } from "@/utils/sessionHelper";

const ticketsStore = useTicketsStore();
const ticketDetailId = ref();
const isLogin = ref(false);

const componentsInputData = {
  title: "123",
  introduction: "456",
};
console.log(ticketDetailId.value);

const ticketsTokenData = ref(getSessionTokenData("ticketsToken"));
if (
  ticketsTokenData.value != null &&
  ticketsTokenData.value.TicketDetailId != null &&
  ticketsTokenData.value.TicketDetailId != undefined
) {
  isLogin.value = true;
}
console.log(ticketsTokenData.value);

// 監聽是否登入
watch(
  () => ticketsStore.ticketsInfo,
  (newValue, oldValue) => {
    console.log(ticketsStore.ticketsInfo);
    ticketDetailId.value = ticketsStore.ticketsInfo;
    if (ticketDetailId.value != null || ticketDetailId.value != undefined) {
      isLogin.value = true;
    }
    if (ticketDetailId.value == null || ticketDetailId.value == "") {
      isLogin.value = false;
    }
  }
);
</script>

<template>
  <div v-if="isLogin">islogin</div>
  <ticketLogin
    v-else
    :title="componentsInputData.title"
    :introduction="componentsInputData.introduction"
  ></ticketLogin>
</template> -->

<!-- ------------------------------------------------------------------------- -->
<!-- ------------------------------------------------------------------------- -->
<!-- ------------------------------------------------------------------------- -->
<!-- ------------------------------------------------------------------------- -->
<!-- ------------------------------------------------------------------------- -->

<!-- <script setup>
import LoginInOrder from "@/components/flightWebComponents/LoginInOrder.vue";

// 實作 靠訂位+名字登入
import { ref, onUpdated, watch } from "vue";
import { getSessionTokenData } from "@/utils/sessionHelper";
import { useMemberStore } from "@/stores/members";

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

<template>
  <div v-if="isLogin">islogin</div>
  <LoginInOrder v-else></LoginInOrder>
</template> -->

<!-- ------------------------------------------------------------------------- -->
<!-- ------------------------------------------------------------------------- -->
<!-- ------------------------------------------------------------------------- -->
<!-- ------------------------------------------------------------------------- -->
<!-- ------------------------------------------------------------------------- -->

<script setup>
import { ref, onMounted } from "vue";
import TicketMemberInput from "@/components/flightWebComponents/TicketMemberInput/TicketMemberInput.vue";
import { useTicketInputCheck } from "@/stores/ticketInputCheckStore";
const ticketInputCheck = useTicketInputCheck();
ticketInputCheck.createPassenger(6);
console.log(ticketInputCheck.form);

onMounted(() => {
  // ruleFormRef.value = null;
});

const ruleFormRef = ref(null);
console.log(ruleFormRef.value);
// 按下送出 會觸發的事件
const submitForm = () => {
  console.log(ruleFormRef.value);

  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>
<template>
  <div class="col"><TicketMemberInput></TicketMemberInput></div>
</template>
<style scoped></style>
