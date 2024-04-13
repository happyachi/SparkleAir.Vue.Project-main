<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import TaxFreeDashBoard from "@/views/TFWeb/DashBoard/index.vue";
import TaxFreeLogin from "@/views/TFWeb/Login/index.vue";
import TaxFreeCheckout from "@/views/TFWeb/Checkout/index.vue";
import TaxFreeCart from "@/views/TFWeb/Cart/index.vue";
import axios from "axios";
import { getticketcartID } from "@/apis/taxfree.js";
import { useRouter } from "vue-router";

///////////////////////////////登入component///////////////////////////////
import loginComponent from "@/views/TFWeb/Login/index.vue";
import { useTfLoginStore } from "@/stores/tfLoginStore";
import { getSessionTokenData } from "@/utils/sessionHelper";

const tfLoginStore = useTfLoginStore();
const isLoginComponent = ref(false);
const isLoginTicketDetail = ref();

//顯示登入區塊
const showLogin = () => {
  tfLoginStore.isLoginComponent = true;
};

const isLogin = ref();
const tokenDataRef = ref();
tokenDataRef.value = getSessionTokenData("TFLoginToken");
onMounted(() => {
  if (tokenDataRef.value != null && tokenDataRef.value != undefined) {
    if (tokenDataRef.value.MemberId) {
      console.log(123);
      tfLoginStore.isLogin = true;
      tfLoginStore.TfLoginInfo = tokenDataRef.value;
    }
  }
});
//監聽LoginComponent是否開關
watch(
  () => isLoginComponent.value,
  (newValue, oldValue) => {
    tfLoginStore.isLoginComponent = isLoginComponent.value;
  }
);

//監聽是否login
watch(
  () => tfLoginStore.isLogin,
  (newValue, oldValue) => {
    isLogin.value = tfLoginStore.isLogin;
  }
);

watch(
  () => tfLoginStore.isLoginTicketDetail,
  (newValue, oldValue) => {
    isLoginTicketDetail.value = tfLoginStore.isLoginTicketDetail;
    console.log(isLoginTicketDetail.value);
  }
);

// 監聽是否顯示LoginComponent
watch(
  () => tfLoginStore.isLoginComponent,
  (newValue, oldValue) => {
    isLoginComponent.value = tfLoginStore.isLoginComponent;
  }
);

const tokenData = ref();
const timer = ref();
const memberName = ref();
watch(
  () => tfLoginStore.TfLoginInfo,
  (newValue, oldValue) => {
    if (
      tfLoginStore.TfLoginInfo != null ||
      tfLoginStore.TfLoginInfo != undefined
    ) {
      const tokenName = "TFLoginToken";
      tokenData.value = getSessionTokenData(tokenName);
      console.log(tokenData.value.sub);
      memberName.value = tokenData.value.sub;
      if (tfLoginStore.TfLoginInfo.MemberId) {
        tfLoginStore.isLogin = true;
      }
      if (tfLoginStore.TfLoginInfo.TicketDetailId) {
        tfLoginStore.isLoginTicketDetail = true;
        isLoginTicketDetail.value = tfLoginStore.isLoginTicketDetail;
      }

      // 登入後每秒確認一次ticket Token是否過期，過期的話就自動登出
      if (tokenData.value != null) {
        const exp = tokenData.value.exp;

        if (exp != undefined) {
          timer.value = setInterval(() => {
            let nowTime = parseInt(Date.now().toString().substring(0, 10));
            if (exp < nowTime) {
              sessionStorage.clear();
              tokenData.value = getSessionTokenData(tokenName);
              tfLoginStore.TfLoginInfo = null;
              expLogout();
              clearInterval(timer.value);
            }
          }, 1000);
        }
      } else {
        clearInterval(timer.value);
      }
    } else {
      tfLoginStore.isLoginTicketDetail = false;
      isLoginTicketDetail.value = tfLoginStore.isLoginTicketDetail;
    }
  }
);

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

// 確認登出框
import { ElMessage, ElMessageBox } from "element-plus";
import { GetMemberInfo } from "@/apis/loginApis";
const logoutCheck = () => {
  ElMessageBox.confirm("請問確認是否登出", "Warning", {
    confirmButtonText: "確認登出",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    // 已確認登出
    // 清除使用者資料
    tfLoginStore.isLogin = false;
    tfLoginStore.clearLoginInfo();
    sessionStorage.clear();
    tokenData.value = "";
    clearInterval(timer.value);
    ElMessage({
      type: "success",
      message: "登出成功",
    });
  });
};

///////////////////////////////確認是否登入並轉址///////////////////////////////
const clickRedirectionMember = (href) => {
  if (tfLoginStore.TfLoginInfo != null && tfLoginStore.TfLoginInfo.MemberId) {
    console.log("in");
    document.location.href = href;
  } else {
    console.log("out");
    tfLoginStore.isLoginComponent = true;
  }
};

///////////////////////////////其他///////////////////////////////
const purchases = ref([]); // 存放使用者購買的商品
const ticketDetailId = sessionStorage.getItem("TicketDetailId");

onMounted(async () => {
  watch(async () => {
    try {
      if (ticketDetailId != null) {
        const response = await axios.get(
          `/TForderlist/getbyticketid/${ticketDetailId}`
        );
        purchases.value = response.data;
        getticketcartID(ticketDetailId).then((res) => {
          purchases.value = res;
          console.log(purchases.value);
        });
      }
    } catch (error) {
      console.error("無法獲取使用者購買的商品:", error);
    }
  });
});

//算這人買了多少
const total = computed(() => {
  if (purchases.value.length === 0) {
    return 0;
  }
  if (purchases.value.length === 1) {
    // 如果只有一樣商品，則直接返回該商品的價格
    const item = purchases.value[0];
    return item.quantity * item.tfItemsUnitPrice;
  } else {
    // 如果有多樣商品，則計算總價格
    return purchases.value.reduce((acc, item) => {
      return acc + item.quantity * item.tfItemsUnitPrice;
    }, 0);
  }
});

const keywordsearch = ref("");

const profile = ref([
  {
    profileCategory: "會員中心",
    children: [
      {
        title: "會員中心",
        href: "tax-free/TaxFreeDashBoard",
      },
      {
        title: "收藏清單",
        href: "tax-free/TaxFreeDashBoard",
      },
      // {
      //   title: "登入",
      //   href: "tax-free/TaxFreeLogin",
      // },
    ],
  },
]);
</script>

<template>
  <!-- Start Top Header Bar -->
  <section class="top-header">
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-xs-12 col-sm-4">
          <ul class="top-menu text-left list-inline">
            <!-- Search -->
            <li class="dropdown tfsearch dropdown-slide">
              <a
                href="#!"
                class="dropdown-toggle"
                data-toggle="dropdown"
                data-hover="dropdown"
                ><i class="tf-ion-ios-search-strong"></i> Search
              </a>
              <ul class="dropdown-menu search-dropdown">
                <li>
                  <form action="post">
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Search..."
                      v-model="keywordsearch"
                      @input="inputHandler"
                    />
                  </form>
                </li>
              </ul>
            </li>
            <!-- / Search -->
          </ul>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-4">
          <!-- Site Logo -->
          <div class="logo text-center">
            <a href="/tax-free/">
              <!-- replace logo here -->
              <svg
                width="200px"
                height="29px"
                viewBox="0 0 155 29"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                  font-size="40"
                  font-family="AustinBold, Austin"
                  font-weight="bold"
                >
                  <g
                    id="Group"
                    transform="translate(-108.000000, -297.000000)"
                    fill="#000000"
                  >
                    <text id="SPARKLE">
                      <tspan x="98.94" y="325">SPARKLE</tspan>
                    </text>
                  </g>
                </g>
              </svg>
            </a>
          </div>
        </div>
        <div class="col-md-4 col-xs-12 col-sm-4">
          <!-- Cart -->
          <ul class="top-menu text-center list-inline">
            <li>
              <h5 class="menu-title" v-if="isLoginTicketDetail">
                Hi! {{ memberName }} 貴賓
              </h5>
            </li>

            <li
              class="dropdown cart-nav dropdown-slide"
              v-if="isLoginTicketDetail"
            >
              <a
                href="#!"
                class="dropdown-toggle"
                data-toggle="dropdown"
                data-hover="dropdown"
                ><i class="tf-ion-android-cart"></i>購物車</a
              >

              <div
                class="dropdown-menu cart-dropdown"
                v-if="purchases.length >= 1"
              >
                <!-- Cart Item -->
                <div
                  class="media"
                  v-for="item in purchases.slice().reverse().slice(0, 5)"
                  :key="item.id"
                >
                  <a class="pull-left" href="#!">
                    <img
                      class="media-object"
                      :src="item.tfItemsImage"
                      style="width: 70px; height: 70px; object-fit: cover"
                      alt="image"
                    />
                  </a>
                  <div class="media-body">
                    <h4 class="media-heading">
                      <a href="#!">{{ item.tfItemsName }}</a>
                    </h4>
                    <div class="cart-price">
                      <span>{{ item.quantity }} x</span>
                      <span>${{ item.tfItemsUnitPrice }}</span>
                    </div>
                    <h5>
                      <strong
                        >${{ item.quantity * item.tfItemsUnitPrice }}</strong
                      >
                    </h5>
                  </div>
                </div>
                <!-- / Cart Item -->

                <div class="cart-summary">
                  <span>總額</span>
                  <span class="total-price">${{ total }}</span>
                </div>
                <ul class="text-center cart-buttons">
                  <li>
                    <div class="flex flex-wrap items-center mb-6">
                      <el-button size="large"
                        ><a href="/tax-free/TaxFreeCart" @click="viewCart"
                          >購物車</a
                        ></el-button
                      >
                    </div>
                  </li>
                  <li>
                    <div class="flex flex-wrap items-center mb-6">
                      <el-button size="large"
                        ><a href="/tax-free/TaxFreeCheckout">結帳</a></el-button
                      >
                    </div>
                  </li>
                </ul>
              </div>
              <div class="dropdown-menu cart-dropdown" v-else>
                <!-- Cart Item -->
                <div class="media">
                  <h4 class="media-heading">目前購物車內無商品</h4>
                </div>
                <!-- / Cart Item -->

                <div class="cart-summary">
                  <span>總額</span>
                  <span class="total-price">${{ total }}</span>
                </div>
                <ul class="text-center cart-buttons">
                  <li>
                    <div class="flex flex-wrap items-center mb-6">
                      <el-button size="large"
                        ><a href="/tax-free/TaxFreeCart" @click="viewCart"
                          >購物車</a
                        ></el-button
                      >
                    </div>
                  </li>
                  <li>
                    <div class="flex flex-wrap items-center mb-6">
                      <el-button size="large"
                        ><a href="/tax-free/TaxFreeCheckout">結帳</a></el-button
                      >
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <!-- / Cart -->

            <!-- Profile -->
            <li
              class="dropdown dropdown-slide"
              v-for="profileCategory in profile"
              :key="profileCategory.profileCategory"
            >
              <a
                href="#!"
                class="dropdown-toggle"
                data-toggle="dropdown"
                data-hover="dropdown"
                data-delay="350"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                ><i
                  class="fa-regular fa-user fa-flip-horizontal fa-xs"
                  style="color: #000000"
                ></i
                >{{ profileCategory.profileCategory }} <span class=""></span
              ></a>
              <div class="dropdown-menu">
                <li v-for="item in profileCategory.children" :key="item.title">
                  <a href="" @click.prevent="clickRedirection(item.href)">{{
                    item.title
                  }}</a>
                </li>

                <li v-if="!isLogin">
                  <a href="" @click.prevent="showLogin">登入</a>
                </li>
                <li v-else>
                  <a href="" @click.prevent="logoutCheck">登出</a>
                </li>
              </div>
            </li>

            <!-- / Profile -->
          </ul>

          <!-- / .nav .navbar-nav .navbar-right -->
        </div>
      </div>
    </div>
  </section>
  <!-- End Top Header Bar -->
  <el-dialog v-model="isLoginComponent" title="登入">
    <div class="col m-auto text-center">
      <loginComponent></loginComponent>
    </div>
  </el-dialog>
</template>

<style scoped></style>
