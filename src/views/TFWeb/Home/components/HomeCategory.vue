<script setup>
import { gettfcategory } from '@/apis/taxfree.js';
import { ref, onMounted } from 'vue';


const getcategory = ref([])
gettfcategory().then((res) => {
    getcategory.value = res
    console.log(getcategory.value);
})
</script>


<template>
    <div class="product-category section">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="title text-center">
                        <h2>Product Categories</h2>
                    </div>
                </div>
                <div class="col-md-4 ">
                    <div class="category-box " v-for="item in getcategory.slice(1, 2)" :key="item.id">
                        <a href="#!">
                            <img src="https://lh3.googleusercontent.com/d/13HD344UlC7v8AdXls5L2eFtcrjpZXbJr"
                                style="object-fit: cover;" alt="" />
                            <div class="content">
                                <h3>{{ item.category }}</h3>
                                <p>Shop New Season Clothing</p>
                            </div>
                        </a>
                    </div>
                    <div class="category-box " v-for="item in getcategory.slice(3, 4)" :key="item.id">
                        <a href="#!">
                            <img src="https://lh3.googleusercontent.com/d/1vY8t8OlHVtOzqK7Y45PKB3eacRaIVe5b"
                                style="object-fit: cover;" alt="" />
                            <div class="content">
                                <h3>{{ item.category }}</h3>
                                <p>Shop New Season Clothing</p>
                            </div>
                        </a>
                    </div>

                </div>

                <div class="col-md-6">
                    <div class="category-box category-box-2" v-for="item in getcategory.slice(5, 6)" :key="item.id">
                        <a href="#!">
                            <img src="https://lh3.googleusercontent.com/d/1XimNoz6cagicp46SwblqlLZam8_hssHT" alt="" />
                            <div class="content">
                                <h3>{{ item.category }}</h3>
                                <p>Special Design Comes First</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<style></style>
