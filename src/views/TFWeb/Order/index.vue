<script setup>
import { ref, onMounted, computed } from 'vue';
import { getReceiptticket } from '@/apis/taxfree.js';
import axios from 'axios';

const ticketDetailId = sessionStorage.getItem("TicketDetailId");
const purchases = ref([]);
onMounted(async () => {

  try {
    const response = await axios.get(`http://localhost:8889/api/TFresevelist/${ticketDetailId}`);
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

</script>

<template>
  <section class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="content">
            <h1 class="page-name">Dashboard</h1>
            <ol class="breadcrumb">
              <li><a href="/tax-free/">Home</a></li>
              <li class="active">my account</li>
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
            <li><a href="/tax-free/TaxFreeDashBoard">會員資料</a></li>
            <li><a class="active" href="/tax-free/TaxFreeOrder">訂單詳細</a></li>
            <li><a href="/tax-free/TaxFreeBlogRightSidebar">願望清單</a></li>

          </ul>
          <div class="dashboard-wrapper user-dashboard">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#451231</td>
                    <td>Mar 25, 2016</td>
                    <td>2</td>
                    <td>$99.00</td>
                    <td><span class="label label-primary">Processing</span></td>
                    <td>
                      <a href="/tax-free/TaxFreeOrder" class="btn btn-default">View</a>
                    </td>
                  </tr>
                  <tr>
                    <td>#451231</td>
                    <td>Mar 25, 2016</td>
                    <td>3</td>
                    <td>$150.00</td>
                    <td><span class="label label-success">Completed</span></td>
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
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
