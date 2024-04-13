<script setup>
import { gettfitem, gettfcategory, gettfitemID } from '@/apis/taxfree.js';
import { ref, computed, watchEffect, onUpdated } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

//抓後端的所有商品資訊
const getitem = ref([])
gettfitem().then((res) => {
    getitem.value = res
    // console.log(getitem.value);
})

//抓後端的所有商品分類
const getcategory = ref([])
gettfcategory().then((res) => {
    getcategory.value = res
    // console.log(getcategory.value);
})

//在下拉式選單篩選商品分類
const selectedCategory = ref(0);
const allItems = ref([]); // 存抓到的商品
const filteredItems = computed(() => {
    if (!selectedCategory.value) {

        return getitem.value;

    } else {

        return getitem.value.filter(item => item.tfCategoriesId === selectedCategory.value);
    }
});

//抓商品資訊到modal中
const selectedProduct = ref(null); // 存儲所選商品的資訊
const showProductDetail = (product) => {
    selectedProduct.value = product; // 點擊商品時將商品資訊存儲在 selectedProduct 中
    $('#product-modal').modal('show'); // 打開 modal
};

//獲取的商品詳細轉到商品詳細頁
const getitemid = ref([]);
const router = useRouter();
const handleClick = (productId) => {
    gettfitemID(productId).then((res) => {
        getitemid.value = res;
        router.push(`/tax-free/TaxFreeProductSingle?id=${productId}`);
    }).catch((error) => {
        console.error('Error fetching product details:', error);
    });
}

</script>

<template>
    <div class="products section bg-gray">
        <div class="container">
            <div class="row">
                <div class="title text-center">
                    <h2>Trendy Products</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-4" v-for="item in getitem.slice(0, 9)" :key="item.id">
                        <div class="product-item">
                            <div class="product-thumb" @click="handleClick(item.id)">
                                <span class="bage"> </span>
                                <img :src="item.image" alt="product-img"
                                    style="width: 400px; height: 400px; object-fit: cover;" />
                                <div class="preview-meta">
                                    <ul>
                                        <li>
                                            <span data-toggle="modal" data-target="#product-modal"
                                                @click="showProductDetail(item)">
                                                <i class="tf-ion-ios-search-strong"></i>
                                            </span>
                                        </li>
                                        <li>
                                            <a href="#!"><i class="tf-ion-ios-heart"></i></a>
                                        </li>
                                        <li>
                                            <a href="#!"><i class="tf-ion-android-cart"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="product-content">
                                <h4>{{ item.name }} </h4>
                                <p class="price">${{ item.unitPrice }}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal product-modal fade" id="product-modal">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <i class="tf-ion-close"></i>
        </button>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-8 col-sm-6 col-xs-12">
                            <div class="modal-image" v-if="selectedProduct">
                                <img class="img-responsive" :src="selectedProduct.image"
                                    style="width: 400px; height: 400px; object-fit: cover;" alt="product-img" />
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 col-xs-12">
                            <div class="product-short-details" v-if="selectedProduct">
                                <h2 class="product-title">{{ selectedProduct.name }}</h2>
                                <p class="product-price">${{ selectedProduct.unitPrice }}</p>
                                <p class="product-short-description">{{ selectedProduct.description }}</p>

                                <a href="/tax-free/TaxFreeCart" class="btn btn-main">Add To Cart</a>
                                <a href="" class="btn btn-transparent" @click="handleClick(item.id)">View Product
                                    Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.modal -->


</template>



<style></style>