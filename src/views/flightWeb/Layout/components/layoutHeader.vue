<script setup>
import { ref, computed, watch } from "vue";
import { useMemberStore } from "@/stores/members";
import { useTicketsStore } from "@/stores/ticketsStore";
import { getSessionTokenData } from "@/utils/sessionHelper";

const tokenName = "memberToken";
const memberStore = useMemberStore();
const memberData = ref(getSessionTokenData(tokenName));
console.log(memberData.value);
console.log(memberStore.memberInfo);

const ticketsStore = useTicketsStore();
const ticketData = ref(getSessionTokenData("ticketsToken"));
console.log(ticketData.value);
const timer2 = ref();
// 一開始就登入的話就監聽是否過期
if (ticketData.value != null) {
  const tokenName = "ticketsToken";
  const exp = ticketData.value.exp;
  timer2.value = setInterval(() => {
    if (exp != undefined) {
      nowTime.value = parseInt(Date.now().toString().substring(0, 10));
      if (exp < nowTime.value) {
        sessionStorage.removeItem(tokenName);
        ticketData.value = getSessionTokenData(tokenName);
        ticketsStore.ticketsInfo = null;
        expLogout();
        clearInterval(timer2.value);
      }
    }
  }, 1000);
}

// 事後改變的
watch(
  () => ticketsStore.ticketsInfo,
  (newValue, oldValue) => {
    if (
      ticketsStore.ticketsInfo != null ||
      ticketsStore.ticketsInfo != undefined
    ) {
      ticketData.value = getSessionTokenData("ticketsToken");
      // 登入後每秒確認一次ticket Token是否過期，過期的話就自動登出
      if (ticketData.value != null) {
        const tokenName = "ticketsToken";
        const exp = ticketData.value.exp;
        timer2.value = setInterval(() => {
          if (exp != undefined) {
            nowTime.value = parseInt(Date.now().toString().substring(0, 10));
            if (exp < nowTime.value) {
              sessionStorage.removeItem(tokenName);
              ticketData.value = getSessionTokenData(tokenName);
              ticketsStore.ticketsInfo = null;
              expLogout();
              clearInterval(timer2.value);
            }
          }
        }, 1000);
      }
    }
  }
);

// 事後改變的
watch(
  () => memberStore.memberInfo,
  (newValue, oldValue) => {
    if (memberStore.memberInfo != null || memberStore.memberInfo != undefined) {
      memberData.value = getSessionTokenData("memberToken");
      // 登入後每秒確認一次ticket Token是否過期，過期的話就自動登出
      if (memberData.value != null) {
        const tokenName = "memberToken";
        const exp = memberData.value.exp;
        timer.value = setInterval(() => {
          if (exp != undefined) {
            nowTime.value = parseInt(Date.now().toString().substring(0, 10));

            if (exp < nowTime.value) {
              sessionStorage.removeItem(tokenName);
              memberData.value = getSessionTokenData(tokenName);
              memberStore.memberInfo = null;
              expLogout();
              clearInterval(timer.value);
            }
          }
        }, 1000);
      }
    }
  }
);
const nowTime = ref();
const expTime = ref();
if (memberData.value != null) {
  expTime.value = memberData.value.exp;
}

// 登入失敗的訊息
const expLogout = () => {
  ElNotification({
    title: "登入逾時",
    message: "已登出，請重新登入",
    type: "error",
    duration: 10000,
    offset: 100,
  });
};

const timer = ref();
// 登入後每秒確認一次會員Token是否過期，過期的話就自動登出
if (memberData.value != null) {
  timer.value = setInterval(() => {
    if (expTime.value != undefined) {
      nowTime.value = parseInt(Date.now().toString().substring(0, 10));
      if (expTime.value < nowTime.value) {
        sessionStorage.removeItem(tokenName);
        memberData.value = getSessionTokenData(tokenName);
        memberStore.memberInfo = null;
        expLogout();
        clearInterval(timer.value);
      }
    }
  }, 1000);
}

const menu = ref([
  {
    title: "計畫與預訂",
    children: [
      //{
      //  title: "班次時刻",
      //  href: "/",
      //},
      {
        title: "航班搜尋",
        href: "/FlightSearchTest",
      },
      {
        title: "熱門航點",
        href: "/globalTravel",
      },
      {
        title: "促銷活動",
        href: "/Marketing",
      },
    ],
  },
  {
    title: "行程管理",
    children: [
      // {
      //   title: "預選座位",
      //   href: "/",
      // },
      // {
      //   title: "預選餐點",
      //   href: "/",
      // },
      {
        title: "管理行程/修改行程",
        href: "/BookingManagement",
      },
      {
        title: "托運加購",
        href: "/LuggageIndex",
      },
      {
        title: "購買里程",
        href: "/mileageorder",
      },
    ],
  },
  {
    title: "免稅商城",
    children: [
      {
        title: "免稅商城",
        href: "/tax-free",
      },
      {
        title: "免稅商城會員中心",
        href: "/",
      },
    ],
  },
  {
    title: "探索Sparkle",
    children: [
      {
        title: "機隊介紹",
        href: "/AirTypeIndex",
      },
      // {
      //   title: "testPay",
      //   href: "/Pay/milePurchaseTest",
      // },
      {
        title: "艙等介紹",
        href: "/CabinRules",
      },
      // {
      //   title: "機上餐點介紹",
      //   href: "/",
      // },
      // {
      //   title: "聯絡我們",
      //   href: "/",
      // },
      {
        title: "線上客服(後台)",
        href: "/BeautifulChatEmployee",
      },
    ],
  },
  {
    title: "會員中心",
    children: [
      // {
      //   title: "會員等級",
      //   href: "/",
      // },
      // {
      //   title: "購買里程",
      //   href: "/mileageorder",
      // },
      {
        title: "會員中心",
        href: "/MemberCenter",
      },
      {
        title: "訂票紀錄",
        href: "/MemberCenter/BookingAndOrderManagement",
      },
      {
        title: "里程明細",
        href: "/MemberCenter/mileageindex",
      },

      {
        title: "我的優惠券",
        href: "/MemberCenter/MyCoupon",
      },
    ],
  },
  // {
  //   title: "公版樣式",
  //   children: [
  //     {
  //       title: "List",
  //       href: "/Event",
  //     },
  //     {
  //       title: "Detail",
  //       href: "/Detail",
  //     },
  //     {
  //       title: "聯絡",
  //       href: "/Contact",
  //     },
  //     {
  //       title: "航班搜尋",
  //       href: "/FlightSearch",
  //     },
  //     {
  //       title: "訂票頁面+付款",
  //       href: "/Booking",
  //     },
  //     {
  //       title: "登入",
  //       href: "/login",
  //     },
  //     {
  //       title: "註冊",
  //       href: "/sign-up",
  //     },
  //   ],
  // },
]);

// 確認登出框
import { ElMessage, ElMessageBox } from "element-plus";
const logoutCheck = () => {
  ElMessageBox.confirm("請問確認是否登出", "Warning", {
    confirmButtonText: "確認登出",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    // 已確認登出
    // 清除使用者資料
    memberStore.clearMemberInfo();
    ticketsStore.clearTicketInfo();
    sessionStorage.clear();
    ticketsStore.ticketsInfo = null;
    memberStore.memberInfo = null;
    memberData.value = "";
    ticketData.value = "";
    clearInterval(timer.value);

    ElMessage({
      type: "success",
      message: "登出成功",
    });
  });
};
</script>

<template>
  <header>
    <nav class="main-menu">
      <div class="container-fluid">
        <div class="main-menu__block">
          <div class="main-menu__left">
            <div class="main-menu__logo">
              <a href="/">
                <img
                  src="../../../../sparkle/SparkleLogoHorizontal.png"
                  alt="Sparkle Airline"
                  style="width: 200px"
                />
              </a>
            </div>
            <div class="main-menu__nav">
              <ul class="main-menu__list">
                <!-- <li>
                  <a href="/" class="active">SparkleAir</a>
                </li> -->
                <li class="dropdown" v-for="item in menu" :key="item.title">
                  <a href="javascript:void(0);">{{ item.title }}</a>
                  <ul>
                    <li v-for="child in item.children" :key="child.title">
                      <a :href="child.href">{{ child.title }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="main-menu__right">
            <!-- <a
              href="#"
              class="main-menu__search search-toggler d-xl-flex d-none"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </a> -->
            <div v-if="memberData" class="main-menu-signup__login d-xl-flex">
              <a class="main-menu__login" href="/MemberCenter"
                >Hi! {{ memberData.EnglishFirstName }}會員中心</a
              >
              <div class="center_slach d-xl-flex">/</div>

              <a class="main-menu__login" @click="logoutCheck">登出</a>

              <!-- <a class="main-menu__login" to="/sign-up">登出</a> -->
            </div>
            <div
              v-else-if="ticketData"
              class="main-menu-signup__login d-xl-flex"
            >
              <a class="main-menu__login" href="/BookingManagement"
                >Hi! {{ ticketData.FirstName }}行程管理</a
              >
              <div class="center_slach d-xl-flex">/</div>

              <a class="main-menu__login" @click="logoutCheck">登出</a>

              <!-- <a class="main-menu__login" to="/sign-up">登出</a> -->
            </div>

            <div v-else class="main-menu-signup__login d-xl-flex">
              <a class="main-menu__login" href="/login">會員登入</a>
              <div class="center_slach d-xl-flex">/</div>
              <a class="main-menu__login" href="/sign-up">註冊</a>
            </div>
            <a href="#" class="main-menu__toggler mobile-nav__toggler">
              <i class="fa-solid fa-bars"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <!-- Header Area end -->
  </header>
  <!-- Mobile Menu Start -->
  <div class="mobile-nav__wrapper">
    <div class="mobile-nav__overlay mobile-nav__toggler"></div>
    <div class="mobile-nav__content">
      <span class="mobile-nav__close mobile-nav__toggler"></span>
      <div class="logo-box">
        <a href="" aria-label="logo image"
          ><img
            src="../../../../sparkle/SparkleLogoHorizontal.png"
            alt="Sparkle Airline"
            class="invisible"
        /></a>
      </div>
      <div class="mobile-nav__container"></div>

      <ul v-if="memberData" class="mobile-nav__contact list-unstyled">
        <li>
          <i class="fas fa-envelope"></i>
          <a href="/login">會員中心</a>
        </li>
        <li>
          <i class="fa fa-phone-alt"></i>
          <a @click="logoutCheck">登出</a>
        </li>
      </ul>

      <ul v-else-if="ticketData" class="mobile-nav__contact list-unstyled">
        <li>
          <i class="fas fa-envelope"></i>
          <a href="/login">行程管理</a>
        </li>
        <li>
          <i class="fa fa-phone-alt"></i>
          <a @click="logoutCheck">登出</a>
        </li>
      </ul>

      <ul v-else class="mobile-nav__contact list-unstyled">
        <li>
          <i class="fas fa-envelope"></i>
          <a href="/login">會員登入</a>
        </li>
        <li>
          <i class="fa fa-phone-alt"></i>
          <a href="/sign-up">註冊</a>
        </li>
      </ul>
      <!-- <div class="mobile-nav__social">
    <a href="#"><i class="fab fa-twitter"></i></a>
    <a href="#"><i class="fab fa-facebook"></i></a>
    <a href="#"><i class="fab fa-instagram"></i></a>
  </div> -->
    </div>
  </div>
</template>

<style scoped></style>
