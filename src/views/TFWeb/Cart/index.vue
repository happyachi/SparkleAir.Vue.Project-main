<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { getticketcartID, removefromcart } from "@/apis/taxfree.js";
import { PriceFormat } from "@/views/flightWeb/AirFlights/components/flightJS/CabinHelper";
import { ElMessageBox } from "element-plus";
import loginComponent from "@/views/TFWeb/Login/index.vue";
import { useRoute } from 'vue-router';


const route = useRoute();
const ticketDetailId = sessionStorage.getItem("TicketDetailId");


//商品相關接收ticketdetail
const purchases = ref([]); // 存放使用者購買的商品

onMounted(async () => {

  try {
    const response = await axios.get(`/TForderlist/getbyticketid/${ticketDetailId}`);
    purchases.value = response.data;
    getticketcartID(ticketDetailId).then((res) => {
      purchases.value = res;
      console.log(purchases.value);
    });
  } catch (error) {
    console.error("無法獲取使用者購買的商品:", error);
  }
});

// 更新商品數量
const decreaseQuantity = (purchases) => {
  if (purchases.quantity > 0) {
    purchases.quantity--;
    updateQuantity(purchases.id, purchases.quantity);
  }
};
const increaseQuantity = (purchases) => {
  purchases.quantity++;
  updateQuantity(purchases.id, purchases.quantity);
};
const updateQuantity = async (id, quantity) => {
  try {
    await axios.put(`http://localhost:8889/api/TForderlist/update?id=${id}&newQuantity=${quantity}`);
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
};

//刪除購物車項目
const removeItem = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8889/api/TForderlist/${id}`
    );
    console.log("訂單已成功從購物車中刪除:", response.data);
    return true;
  } catch (error) {
    console.error("刪除訂單時發生錯誤：", error);
    return false;
  }
};

const dialogVisible = ref(false);
let currentItemID = null;

const handleClose = (done) => {
  ElMessageBox.confirm("關閉對話框")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

const handleRemoveItemClick = (id) => {
  currentItemID = id;
  console.log("currentItemID:", currentItemID);
  dialogVisible.value = true;
};

const confirmRemoveItem = async () => {
  if (currentItemID !== null) {
    const removed = await removeItem(currentItemID);
    if (removed) {
      dialogVisible.value = false;
      location.reload();
    } else {
      console.error("無法刪除商品");
    }
  }
};

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



const selectedOrderListIds = ref([]);
const cartItems = ref([]);

const getCartItemsFromSession = () => {
  const cartItemsJSON = sessionStorage.getItem('cartItems');
  if (cartItemsJSON) {
    cartItems.value = JSON.parse(cartItemsJSON);
    console.log('Cart items from session:', cartItems.value);
  }
};

const saveCartItemsToSession = () => {
  sessionStorage.setItem('cartItems', JSON.stringify(cartItems.value));
};

onMounted(() => {
  getCartItemsFromSession();
});


//選取計算價格
const selectedItems = ref([]);
const handleSelectionChange = async (selection) => {
  try {
    selectedItems.value = selection;
    //存入session
    const selectedDataToStore = selectedItems.value.map(item => ({
      id: item.id,
      ticketDetailsId: item.ticketDetailsId,
      tfItemsId: item.tfItemsId,
      tfItemsName: item.tfItemsName,
      tfItemsSerialNumber: item.tfItemsSerialNumber,
      tfItemsImage: item.tfItemsImage,
      tfItemsQuantity: item.tfItemsQuantity,
      tfItemsUnitPrice: item.tfItemsUnitPrice,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      tfOrderStatusID: item.tfOrderStatusID,
      paid: item.paid
    }));

    sessionStorage.setItem('cartItems', JSON.stringify(selectedDataToStore));
    console.log('Selected items stored in session:', selectedDataToStore);


    if (selectedItems.value.length > 0) {
      const newStatusId = 1; //paid
      for (const item of selectedItems.value) {
        await updatePaidStatus(item.id, newStatusId);
      }
    } else {
      const newStatusId = 2;
      for (const item of purchases.value) {
        await updatePaidStatus(item.id, newStatusId);
      }
    }
  } catch (error) {
    console.error('Error', error);
  }
}

async function updatePaidStatus(orderId, newStatusId) {
  try {
    const response = await axios.put(`http://localhost:8889/api/TForderlist/updatepaid?id=${orderId}&newstatusid=${newStatusId}`);
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Error', error);
  }
}


const getSelectedItemsFromSession = () => {
  const selectedItemsJSON = sessionStorage.getItem('cartItems');
  if (selectedItemsJSON) {
    selectedItems.value = JSON.parse(selectedItemsJSON);
  }
};

onMounted(getSelectedItemsFromSession);

const goToCheckout = () => {
  router.push({ name: "TaxFreeCheckout" });
};


// 計算選擇商品的總價格
const total = computed(() => {
  if (Array.isArray(purchases.value) && purchases.value.length > 0) {
    let totalPrice = 0;
    selectedItems.value.forEach(item => {
      let itemTotalPrice = item.quantity * item.tfItemsUnitPrice;
      if (item.tfItemsId in productDiscountsMap.value) {
        itemTotalPrice -= productDiscountsMap.value[item.tfItemsId].discountAmount;
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
    const discountAmount = productDiscountsMap.value[row.tfItemsId].discountAmount;
    discountedPrice -= discountAmount;
  }
  return discountedPrice;
};

// 計算未折扣的總金額
const totalBeforeDiscount = computed(() => {
  if (Array.isArray(selectedItems.value) && selectedItems.value.length > 0) {
    return selectedItems.value.reduce((total, item) => total + (item.quantity * item.tfItemsUnitPrice), 0);
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
const totalPrice = computed(() => totalBeforeDiscount.value - totalDiscount.value);


// 計算表格總結
const getSummaries = (param) => {
  const { columns, data } = param;
  const sums = [];
  columns.forEach((column, index) => {
    if (index === 3) { // 假設第四列需要加總
      sums[index] = '總計';
      return;
    }
    const values = data.map((item) => {
      // 在這裡計算每一列的加總數據
      // 例如，如果第二列需要加總，則計算每一行的第二列數據
      return item[column.property];
    });
    const validValues = values.filter(value => !isNaN(value));
    if (validValues.length > 0) {
      sums[index] = validValues.reduce((prev, curr) => prev + curr, 0);
    } else {
      sums[index] = " ";
    }
  });
  // 計算總和並放在陣列的最後一個位置
  sums.push(sums.slice(1).reduce((prev, curr) => prev + curr, 0));
  return sums;
};

</script>

<template>
  <section class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="content">
            <h1 class="page-name">購物車</h1>
            <ol class="breadcrumb">
              <li><a href="/tax-free/">首頁</a></li>
              <li class="active">購物車</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="page-wrapper">
    <div class="cart shopping">
      <div class="container" style="display: flex; justify-content: center">
        <div class="row">
          <div class="col-md-8 col-md-offset-3">
            <div class="block" style="display: flex; justify-content:center;">
              <div class="product-list">
                <form method="post">
                  <el-table ref="multipleTableRef" :data="purchases" show-summary :summary-method="getSummaries"
                    @selection-change="handleSelectionChange" style="width: 120%; max-width: 950px">
                    <el-table-column type="selection" width="60" label="選取" />
                    <el-table-column label="商品品項" align="center">
                      <template #default="scope">
                        <div class="product-info">
                          <img :src="scope.row.tfItemsImage" alt="" style="
                              height: 90px;
                              width: 200px;
                              object-fit: cover;
                            " />
                          <span>{{ scope.row.tfItemsName }}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="商品單價" align="center">
                      <template #default="scope">NTD${{ PriceFormat(scope.row.tfItemsUnitPrice) }}</template>
                    </el-table-column>
                    <el-table-column label="購買數量" align="center" width="200px">
                      <template #default="scope">
                        <div class="el-input-number" data-v-9109f1f2="">
                          <span role="button" aria-label="decrease number" class="el-input-number__decrease"
                            @click="decreaseQuantity(scope.row)">
                            <i class="el-icon">
                              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z">
                                </path>
                              </svg>
                            </i>
                          </span>
                          <div class="el-input">
                            <div class="el-input__wrapper">
                              <input class="el-input__inner" :value="scope.row.quantity" type="number" min="0"
                                @input="updateQuantity(scope.row, $event)" />
                            </div>
                          </div>
                          <span role="button" aria-label="increase number" class="el-input-number__increase"
                            @click="increaseQuantity(scope.row)">
                            <i class="el-icon">
                              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor"
                                  d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z">
                                </path>
                              </svg>
                            </i>
                          </span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="價格" width="220px" align="center">
                      <!-- <template #default="scope">${{ scope.row.quantity * scope.row.tfItemsUnitPrice }}</template> -->
                      <template #default="scope">
                        <div class="price-container">
                          <span :class="{
                    'original-price':
                      scope.row.tfItemsId in productDiscountsMap,
                  }">
                            NTD${{ PriceFormat(scope.row.quantity * scope.row.tfItemsUnitPrice)

                            }}
                          </span>
                          <span v-if="scope.row.tfItemsId in productDiscountsMap" class="activity-price">
                            NTD${{ PriceFormat(scope.row.quantity * scope.row.tfItemsUnitPrice -
                    productDiscountsMap[scope.row.tfItemsId]
                      .discountAmount)

                            }}
                          </span>
                        </div>
                        <div v-if="scope.row.tfItemsId in productDiscountsMap" class="discount-description">
                          - 符合折扣活動:
                          {{
                    productDiscountsMap[scope.row.tfItemsId].ruleName
                  }}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label=" " align="center">
                      <template #default="scope">
                        <a class="product-remove" href="#!" @click="handleRemoveItemClick(scope.row.id)"
                          style="font-weight: bold">
                          <i class="fa-solid fa-trash hover:fa-bounce" style="color: #a50d42;"></i>
                        </a>
                      </template>

                    </el-table-column>

                  </el-table>

                </form>
                <div class="total-price"
                  style="display: flex; justify-content: center; margin-top: 50px; margin-left:450px">
                  <ul class="summary-prices">
                    <li>
                      <span></span>
                      <span class="price">價格：NTD${{ PriceFormat(totalBeforeDiscount) }}</span>
                    </li>
                    <li>
                      <span>折扣：</span>
                      <span>NTD${{ PriceFormat(totalDiscount) }}</span>
                    </li>
                    <li>
                      <span style="font-size: 18px; font-weight: bold;">總金額:NTD${{ PriceFormat(totalPrice) }}</span>
                      <span></span>
                    </li>
                    <div class="mb-4" style=" margin-top: 50px; margin-left:60px">
                      <a href="/tax-free/TaxFreeCheckout"><el-button type="info" plain
                          @click="goToCheckout">結帳結帳</el-button></a>
                    </div>
                  </ul>

                </div>
              </div>



            </div>
          </div>
        </div>

      </div>

    </div>

  </div>





  <el-dialog v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
    <span>確定要從購物車刪除商品嗎</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRemoveItem">確定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.price-container {
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: baseline;
}

.original-price {
  text-decoration: line-through;
}

.activity-price {
  color: red;
  font-weight: bold;
  margin-left: 10px;
  /*與原價的間格*/
}

.discount-description {
  display: block;
  font-size: smaller;
  color: grey;
  margin-top: 4px;
}

.custom-input-number {
  display: flex;
  align-items: center;
}

.custom-input-number__decrease,
.custom-input-number__increase {
  width: 30px;
  height: 30px;
}

.custom-input-number__input {
  width: 30px;
  /* 设置输入框宽度 */
}
</style>
