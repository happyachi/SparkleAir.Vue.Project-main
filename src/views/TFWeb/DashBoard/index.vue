<script setup>
import { ref, onMounted, computed, reactive, watch, defineProps } from 'vue';
import { getReceiptticket } from '@/apis/taxfree.js';
import axios from 'axios';
import { getSessionTokenData, parseJwt } from "@/utils/sessionHelper";
import { ElMessageBox } from "element-plus";
import { PriceFormat } from '@/views/flightWeb/AirFlights/components/flightJS/CabinHelper';


const reserved = ref([]);
onMounted(async () => {
  let token = sessionStorage.getItem("TFLoginToken");
  let parseToken = parseJwt(token);
  const ticketId = parseToken.TicketDetailId;
  try {
    const response = await axios.get(`http://localhost:8889/api/TFReseve/${ticketId}`);
    reserved.value = response.data;
    console.log(reserved.value);
    const summarizedReserved = new Map();


    reserved.value.forEach(item => {
      if (summarizedReserved.has(item.transferPaymentId)) {

        const existingItem = summarizedReserved.get(item.transferPaymentId);
        existingItem.quantity += item.quantity;
        existingItem.totalPrice += item.totalPrice;
      } else {

        summarizedReserved.set(item.transferPaymentId, { ...item });
      }
    });

    reserved.value = Array.from(summarizedReserved.values());
  } catch (error) {
    console.error('無法獲取購買資料:', error);
  }
});


const purchases = ref([]);
onMounted(async () => {
  let token = sessionStorage.getItem("TFLoginToken");
  let parseToken = parseJwt(token);
  console.log(parseToken.TicketDetailId)
  const ticketId = parseToken.TicketDetailId;


  try {
    const response = await axios.get(`http://localhost:8889/api/TFresevelist/${ticketId}`);
    purchases.value = response.data;
    console.log(purchases.value);
  } catch (error) {
    console.error('無法獲取購買資料:', error);
  }

});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}


const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const gridData = ref([]);
watch(purchases, (newPurchases) => {
  gridData.value = newPurchases.map((purchase) => {
    return {
      date: purchase.paymentDate,
      name: purchase.tfItemsName,
      quantity: purchase.quantity,
      total: purchase.totalPrice,

    };
  });
});


</script>

<template>
  <section class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="content">
            <h1 class="page-name">訂單詳細</h1>
            <ol class="breadcrumb">
              <li><a href="/tax-free">首頁</a></li>
              <li class="active">會員中心</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="user-dashboard page-wrapper">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ul class="list-inline dashboard-menu text-center">
            <li><a class="active" href="tax-free/TaxFreeDashBoard">訂單詳細</a></li>

            <li><a href="/tax-free/TaxFreeBlogRightSidebar">願望清單</a></li>

          </ul>
          <div class="dashboard-wrapper user-dashboard">
            <div class="media">
              <div class="pull-left">
                <img class="media-object user-img"
                  src="https://www.ikea.com.tw/dairyfarm/tw/images/771/0877178_PE662336_S4.webp" alt="Image" />
              </div>
              <div class="media-body" v-if="purchases.length > 0">
                <h2 class="media-heading">Welcome {{ purchases[0].memberEnglishFirstName }} {{
                purchases[0].memberEnglishLastName }} {{ purchases[0].memberChineseLastName }}{{
                purchases[0].memberChineseFirstName }} </h2>

                <p>
                <ul class="user-info">
                  <li><span>貴賓姓名&nbsp;:&nbsp;</span>{{ purchases[0].memberEnglishFirstName }} {{
                purchases[0].memberEnglishLastName }}</li>
                  <li><span>護照號碼&nbsp;:&nbsp;</span>{{ purchases[0].memberPassportNumber }}</li>
                  <li><span>班機代號&nbsp;:&nbsp;</span>{{ purchases[0].ticketDetailFlightCode }}</li>
                  <li><span>班機日期&nbsp;:&nbsp;</span>{{ purchases[0].ticketDetailScheduledDepartureTime }}
                  </li>
                </ul>
                </p>
              </div>
            </div>
            <div class="dashboard-wrapper user-dashboard">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>訂單編號</th>
                      <th>訂單成立日期</th>
                      <th>訂單總額</th>
                      <th>訂單狀態</th>
                      <th>訂單詳細</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in reserved" :key="item.id" :value="item.id">
                      <td>#{{ item.id }}</td>
                      <td>{{ formatDate(item.paymentDate) }}</td>
                      <td>NTD${{ PriceFormat(item.totalPrice) }}</td>
                      <td><span class="label label-success">已付款</span></td>
                      <td>
                        <el-button plain @click="dialogTableVisible = true">
                          詳細🛍️
                        </el-button>
                      </td>
                    </tr>
                    <!-- <tr>留著找標籤class
                      <td>#451231</td>
                      <td>Mar 25, 2016</td>
                      <td>3</td>
                      <td>$150.00</td>
                      <td><span class="label label-success" class="label label-primary"></span>>Completed</span></td>
                      <td>
                        <a href="/tax-free/TaxFreeOrder" class="btn btn-default">View</a>
                      </td>
                    </tr>
                    <tr>
                      <td>#451231</td>
                      <td>Mar 25, 2016</td>
                      <td>3</td>
                      <td>$150.00</td>
                      <td><span class="label label-danger">Canceled</span></td>
                      <td>
                        <a href="/tax-free/TaxFreeOrder" class="btn btn-default">View</a>
                      </td>
                    </tr>
                    <tr>
                      <td>#451231</td>
                      <td>Mar 25, 2016</td>
                      <td>2</td>
                      <td>$99.00</td>
                      <td><span class="label label-info">On Hold</span></td>
                      <td>
                        <a href="/tax-free/TaxFreeOrder" class="btn btn-default">View</a>
                      </td>
                    </tr>
                    <tr>
                      <td>#451231</td>
                      <td>Mar 25, 2016</td>
                      <td>3</td>
                      <td>$150.00</td>
                      <td><span class="label label-warning">Pending</span></td>
                      <td>
                        <a href="/tax-free/TaxFreeOrder" class="btn btn-default">View</a>
                      </td>
                    </tr> -->
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="dialogTableVisible" title="Shipping address" width="800">
      <el-table :data="gridData">
        <el-table-column property="date" label="付款日期" width="150" />
        <el-table-column property="name" label="品項名稱" width="200" />
        <el-table-column property="quantity" label="購買數量" width="200" />
        <el-table-column property="total" label="總金額" />
      </el-table>
      <template #footer>
        <div class="dialog-footer">

          <el-button type="info" @click="dialogFormVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </section>
</template>








<style scoped></style>
