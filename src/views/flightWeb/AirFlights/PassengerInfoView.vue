<script setup>
import LoginInOrder from "@/components/flightWebComponents/LoginInOrder.vue";
import TicketMemberInput from "@/components/flightWebComponents/TicketMemberInput/TicketMemberInput.vue";
import TitleBanner from "@/components/flightWebComponents/titleBanner.vue";
// 實作 靠訂位+名字登入
import { ref, onUpdated, watch } from "vue";
import { getSessionTokenData } from "@/utils/sessionHelper";
import { useMemberStore } from "@/stores/members";

const memberStore = useMemberStore();
const memberId = ref();
const isLogin = ref(false);
const TitleBannerTitle = ref({
    title1: "乘客",
    title2: "資訊",
});
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
    <TitleBanner :title="TitleBannerTitle"></TitleBanner>
    <div v-if="isLogin">
        <div class="col"><TicketMemberInput></TicketMemberInput></div>
    </div>
    <LoginInOrder v-else></LoginInOrder>
</template>
