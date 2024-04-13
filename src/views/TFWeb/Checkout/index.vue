<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { getticketcartID, removefromcart } from "@/apis/taxfree.js";
import { ElMessageBox } from "element-plus";
import { PriceFormat } from "@/views/flightWeb/AirFlights/components/flightJS/CabinHelper";
import Payradio from "@/components/flightWebComponents/Payment/Payradio.vue";
import { usePaymentStore } from "@/stores/payment.js";

const paymentStore = usePaymentStore();
const ticketDetailId = sessionStorage.getItem("TicketDetailId");

const purchases = ref([]); // 存放使用者購買的商品

onMounted(async () => {
  try {
    const response = await axios.get(
      `/TForderlist/getbyticketid/${ticketDetailId}`
    );
    purchases.value = response.data;
    getticketcartID(ticketDetailId).then((res) => {
      purchases.value = res;
      console.log(purchases.value);
    });
  } catch (error) {
    console.error("無法獲取使用者購買的商品:", error);
  }
});

const selectedItems = ref([]);

onMounted(() => {
  const selectedItemsJSON = sessionStorage.getItem("cartItems");
  if (selectedItemsJSON) {
    selectedItems.value = JSON.parse(selectedItemsJSON);
  }
});

// Discount
const discounts = ref([]);
const loadDiscounts = async () => {
  const response = await axios.get(
    `http://localhost:8889/api/CampaignsDiscount/CartDiscount/${ticketDetailId}`
  );
  discounts.value = response.data;
  console.log(discounts.value);
};

onMounted(() => {
  loadDiscounts();
});

//Map Discounts to Products
const productDiscountsMap = computed(() => {
  const obj = {};
  discounts.value.forEach((discount) => {
    discount.products.forEach((product) => {
      if (!(product.id in obj)) {
        obj[product.id] = {
          ruleName: discount.ruleName,
          discountAmount: discount.amount, // or any other relevant discount info
        };
      }
    });
  });
  console.log(obj); // Log the object to see if it's correct
  return obj;
});

//算這人買了多少
const total = computed(() => {
  if (Array.isArray(purchases.value) && purchases.value.length > 0) {
    let totalPrice = 0;
    selectedItems.value.forEach((item) => {
      let itemTotalPrice = item.quantity * item.tfItemsUnitPrice;
      if (item.tfItemsId in productDiscountsMap.value) {
        itemTotalPrice -=
          productDiscountsMap.value[item.tfItemsId].discountAmount;
      }
      totalPrice += itemTotalPrice;
    });
    return totalPrice;
  } else {
    console.warn("purchases.value = null");
    return 0;
  }
});

// 計算折扣後的價格
const calculateDiscountedPrice = (row) => {
  let discountedPrice = row.quantity * row.tfItemsUnitPrice;
  if (row.tfItemsId in productDiscountsMap.value) {
    const discountAmount =
      productDiscountsMap.value[row.tfItemsId].discountAmount;
    discountedPrice -= discountAmount;
  }
  return discountedPrice;
};

// 計算未折扣的總金額
const totalBeforeDiscount = computed(() => {
  if (Array.isArray(selectedItems.value) && selectedItems.value.length > 0) {
    return selectedItems.value.reduce(
      (total, item) => total + item.quantity * item.tfItemsUnitPrice,
      0
    );
  } else {
    return 0;
  }
});

// 計算折扣金額
const totalDiscount = computed(() => {
  if (Array.isArray(selectedItems.value) && selectedItems.value.length > 0) {
    return selectedItems.value.reduce((total, item) => {
      if (item.tfItemsId in productDiscountsMap.value) {
        return total + productDiscountsMap.value[item.tfItemsId].discountAmount;
      }
      return total;
    }, 0);
  } else {
    return 0;
  }
});

// 計算總額
const totalPrice = computed(
  () => totalBeforeDiscount.value - totalDiscount.value
);

//觸發購買按鈕
const buyclick = async () => {
  const passSelect = sessionStorage.getItem("payMethod");
  console.log(passSelect);
  paymentStore.selectedOption = passSelect;

  if (passSelect === "PayPal") {
  } else if (passSelect === "綠界科技") {
    paymentStore.ecPayMethod(
      totalPrice.value,
      "免稅商品購買",
      "GetTaxfreeOrder"
    );
  } else if (passSelect === "VISA卡") {
    paymentStore.testMethod(
      totalPrice.value,
      "免稅商品購買",
      "GetTaxfreeOrder"
    );
  }
};
</script>

<template>
  <section class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="content">
            <h1 class="page-name">結帳</h1>
            <ol class="breadcrumb">
              <li><a href="/tax-free/">首頁</a></li>
              <li class="active">結帳</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="page-wrapper">
    <div class="checkout shopping">
      <div class="container">
        <div class="row">
          <div class="col-md-8" style="display: flex; justify-content: center">
            <div class="block billing-details">
              <div class="product-checkout-details">
                <div class="block">
                  <h4 class="widget-title">訂單摘要</h4>
                  <div
                    class="media product-card"
                    v-for="item in selectedItems"
                    :key="item.id"
                  >
                    <a class="pull-left" href="product-single.html">
                      <img
                        class="media-object"
                        :src="item.tfItemsImage"
                        style="height: 80px; width: 8s0px; object-fit: cover"
                        alt="Image"
                      />
                    </a>
                    <div class="media-body">
                      <h4 class="media-heading">
                        <a href="product-single.html">{{ item.tfItemsName }}</a>
                      </h4>
                      <p class="price">
                        {{ item.quantity }} x ${{ item.tfItemsUnitPrice }}
                      </p>
                      <p
                        class="discount-info"
                        v-if="item.tfItemsId in productDiscountsMap"
                      >
                        - 符合折扣活動:
                        {{ productDiscountsMap[item.tfItemsId].ruleName }}
                        (折扣金額: NTD{{
                          productDiscountsMap[item.tfItemsId].discountAmount
                        }})
                      </p>
                    </div>
                  </div>
                  <div class="discount-code">
                    <p>
                      輸入優惠代碼 ?
                      <a
                        data-toggle="modal"
                        data-target="#coupon-modal"
                        href="#!"
                        >點擊輸入</a
                      >
                    </p>
                  </div>
                  <ul class="summary-prices">
                    <li>
                      <span>價格:</span>
                      <span class="price"
                        >NTD${{ PriceFormat(totalBeforeDiscount) }}</span
                      >
                    </li>
                    <li>
                      <span>折扣:</span>
                      <span>NTD${{ PriceFormat(totalDiscount) }}</span>
                    </li>
                  </ul>
                  <div class="summary-total">
                    <span>總計</span>
                    <span>NTD${{ PriceFormat(totalPrice) }}</span>
                  </div>
                  <div class="block">
                    <!-- <h4 class="widget-title">Payment Method</h4>
              <p>Credit Cart Details (Secure payment)</p> -->
                    <div class="checkout-product-details">
                      <div class="payment">
                        <div class="card-details">
                          <form class="checkout-form">
                            <Payradio class="widget-title"></Payradio>
                            <!-- <div class="form-group">
                        <label for="card-number">Card Number <span class="required">*</span></label>
                        <input id="card-number" class="form-control" type="tel" placeholder="•••• •••• •••• ••••" />
                      </div>
                      <div class="form-group half-width padding-right">
                        <label for="card-expiry">Expiry (MM/YY) <span class="required">*</span></label>
                        <input id="card-expiry" class="form-control" type="tel" placeholder="MM / YY" />
                      </div>
                      <div class="form-group half-width padding-left">
                        <label for="card-cvc">Card Code <span class="required">*</span></label>
                        <input id="card-cvc" class="form-control" type="tel" maxlength="4" placeholder="CVC" />
                      </div> -->

                            <el-button type="info" plain v-on:click="buyclick">
                              確認結帳</el-button
                            >
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <h4 class="widget-title">Billing Details</h4>
              <form class="checkout-form">
                <div class="form-group">
                  <label for="full_name">Full Name</label>
                  <input type="text" class="form-control" id="full_name" placeholder="" />
                </div>
                <div class="form-group">
                  <label for="user_address">Address</label>
                  <input type="text" class="form-control" id="user_address" placeholder="" />
                </div>
                <div class="checkout-country-code clearfix">
                  <div class="form-group">
                    <label for="user_post_code">Zip Code</label>
                    <input type="text" class="form-control" id="user_post_code" name="zipcode" value="" />
                  </div>
                  <div class="form-group">
                    <label for="user_city">City</label>
                    <input type="text" class="form-control" id="user_city" name="city" value="" />
                  </div>
                </div>
                <div class="form-group">
                  <label for="user_country">Country</label>
                  <input type="text" class="form-control" id="user_country" placeholder="" />
                </div>
              </form> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="coupon-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <form>
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                placeholder="Enter Coupon Code"
              />
            </div>
            <button type="submit" class="btn btn-main">Apply Coupon</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
    :before-close="handleClose"
  >
    <span>確定要刪除商品嗎</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRemoveItem">確定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
