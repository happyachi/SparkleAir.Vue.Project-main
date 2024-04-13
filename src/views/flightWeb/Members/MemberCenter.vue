<script setup>
import { ref, onMounted, watch } from "vue";

import TitleBanner from "@/components/flightWebComponents/titleBanner.vue";
import router from "@/router";
import { useRoute } from "vue-router";
const route = useRoute();

const TitleBannerTitle = ref({
  title1: "會員中心",
  title2: "",
});

const routerTo = (name) => {
  router.push({ name: name });
  titleH1.value = titleMenu.filter((x) => x.title == name)[0].titleInfo;
  console.log(route.path);
};

const titleH1 = ref();
const titleMenu = [
  {
    title: "MemberInfo",
    titleInfo: "個人資料",
  },
  {
    title: "BookingAndOrderManagement",
    titleInfo: "行程管理",
  },
  {
    title: "MyCoupon",
    titleInfo: "優惠券票夾",
  },
  {
    title: "mileageindex",
    titleInfo: "里程明細",
  },
  {
    title: "mileageapply",
    titleInfo: "里程折抵明細",
  },
];

let pathTitle = ref(route.path.split("MemberCenter/")[1]);
if (pathTitle.value != undefined && pathTitle.value != "") {
  routerTo(pathTitle.value);
}
console.log(pathTitle.value);

///////////////////////實作 靠訂位+名字登入///////////////////////
import { useMemberStore } from "@/stores/members";
import LoginInMile from "@/components/flightWebComponents/LoginInMile.vue";
import { getSessionTokenData } from "@/utils/sessionHelper"; //奇哥會員

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
    if (
      memberStore.memberInfo != null &&
      memberStore.memberInfo != undefined &&
      memberStore.memberInfo != ""
    ) {
      isLogin.value = true;
    }
    if (
      memberStore.memberInfo == null ||
      memberStore.memberInfo == "" ||
      memberStore.memberInfo == undefined
    ) {
      isLogin.value = false;
    }
  }
);
</script>

<template>
  <TitleBanner :title="TitleBannerTitle"></TitleBanner>

  <div class="row" v-show="isLogin">
    <div class="col-sm-3 col-md-2 pr-0" style="background-color: #dbe9fc">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            :default-active="pathTitle"
            background-color="#DBE9FC"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item
              v-for="item in titleMenu"
              :index="item.title"
              :key="item.title"
              @click="routerTo(item.title)"
            >
              <el-icon><setting /></el-icon>
              <span>{{ item.titleInfo }}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div
      class="col-sm-9 col-md-10"
      style="min-height: 300px; font-weight: 900 !important"
    >
      <!-- <h2>{{ titleH1 }}</h2>
      <hr /> -->
      <RouterView></RouterView>
    </div>
  </div>
  <LoginInMile v-show="!isLogin"></LoginInMile>
</template>

<style scoped></style>
